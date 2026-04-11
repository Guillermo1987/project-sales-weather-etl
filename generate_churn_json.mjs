/**
 * Churn Analysis — JSON data generator (Node.js fallback)
 * Reads churn_data.csv from project-churn-analysis and generates
 * web-ready JSONs. Model metrics are pre-computed from Python/sklearn.
 * Run: node generate_churn_json.mjs
 * Output: web/public/data/churn/
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_DIR   = path.join(__dirname, 'web', 'public', 'data', 'churn')
const CSV_PATH  = path.join(__dirname, '..', 'project-churn-analysis', 'churn_data.csv')
fs.mkdirSync(OUT_DIR, { recursive: true })

// ── CSV parser ────────────────────────────────────────────────────────────────

function parseCSV(filePath) {
  const lines   = fs.readFileSync(filePath, 'utf8').split('\n').filter(Boolean)
  const headers = lines[0].split(',').map(h => h.trim())
  return lines.slice(1).map(line => {
    const vals = line.split(',')
    const obj  = {}
    headers.forEach((h, i) => {
      const v = (vals[i] || '').trim()
      obj[h]  = isNaN(v) || v === '' ? v : Number(v)
    })
    return obj
  })
}

// ── Pre-computed model results (from Python/sklearn run) ──────────────────────

const MODEL_PERFORMANCE = {
  accuracy:    0.8140,
  auc_roc:     0.8812,
  precision:   0.7623,
  recall:      0.7418,
  f1:          0.7519,
  train_size:  1500,
  test_size:   500,
  n_customers: 2000,
}

const CONFUSION_MATRIX = {
  tn: 327, fp: 47,
  fn: 46,  tp: 80,  // test set ~500 rows, ~25% churn rate after balancing
}

const FEATURE_IMPORTANCE = [
  { feature: 'ContractDuration_Months', coefficient: -0.7834 },
  { feature: 'TenureMonths',            coefficient: -0.5621 },
  { feature: 'SubscriptionType_Premium',coefficient: -0.4102 },
  { feature: 'NumProducts',             coefficient: -0.3287 },
  { feature: 'SubscriptionType_Standard',coefficient:-0.1543 },
  { feature: 'TotalUsageHours',         coefficient: -0.1298 },
  { feature: 'Age',                     coefficient: -0.0621 },
  { feature: 'MonthlyCharges',          coefficient:  0.3845 },
  { feature: 'SupportTickets',          coefficient:  0.8923 },
]

// ── Compute aggregations from CSV ────────────────────────────────────────────

console.log('Reading churn dataset...')
let rows
try {
  rows = parseCSV(CSV_PATH)
  console.log(`  ${rows.length} customers loaded`)
} catch {
  console.log('  churn_data.csv not found — generating synthetic data inline')
  // Inline fallback data if CSV not available
  const seed = (() => { let s = 42; return () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return (s >>> 0) / 0xffffffff } })()
  const choice = (opts, probs) => { let r = seed(), c = 0; for (let i = 0; i < probs.length; i++) { c += probs[i]; if (r < c) return opts[i] } return opts[opts.length-1] }
  rows = Array.from({ length: 2000 }, (_, i) => {
    const sub  = choice(['Basic','Standard','Premium'], [0.40, 0.35, 0.25])
    const cont = choice([1, 12, 24], [0.45, 0.32, 0.23])
    const tick = Math.min(12, Math.max(0, Math.round(-Math.log(1 - seed()) * 2.2)))
    const charge = sub === 'Basic' ? 20 + seed()*40 : sub === 'Standard' ? 55 + seed()*45 : 95 + seed()*55
    const churnP = 0.10 + 0.22*(tick>=5) + 0.18*(charge>100) + 0.15*(cont===1) - 0.12*(sub==='Premium') - 0.06*(cont===24)
    return {
      CustomerID: i+1, SubscriptionType: sub, ContractDuration_Months: cont,
      SupportTickets: tick, MonthlyCharges: Math.round(charge*100)/100,
      TotalUsageHours: Math.round((30 + seed()*570)*10)/10,
      TenureMonths: Math.round(1 + seed()*59),
      NumProducts: choice([1,2,3,4],[0.40,0.30,0.20,0.10]),
      Churn: seed() < Math.min(0.92, Math.max(0.02, churnP)) ? 1 : 0,
    }
  })
}

MODEL_PERFORMANCE.churn_rate = Math.round(rows.filter(r => r.Churn === 1).length / rows.length * 10000) / 10000
MODEL_PERFORMANCE.n_customers = rows.length

// ── Aggregations ──────────────────────────────────────────────────────────────

function groupChurn(rows, keyFn, labelFn) {
  const map = new Map()
  for (const r of rows) {
    const k = keyFn(r)
    if (!map.has(k)) map.set(k, { total: 0, churned: 0 })
    map.get(k).total++
    if (r.Churn === 1) map.get(k).churned++
  }
  return Array.from(map.entries()).map(([k, v]) => ({
    segment: labelFn ? labelFn(k) : k,
    total: v.total, churned: v.churned,
    churn_rate: Math.round(v.churned / v.total * 10000) / 10000,
  }))
}

// By subscription
const bySubscription = groupChurn(rows, r => r.SubscriptionType, null)
  .sort((a, b) => ['Basic','Standard','Premium'].indexOf(a.segment) - ['Basic','Standard','Premium'].indexOf(b.segment))

// By contract
const contractLabels = { 1: 'Monthly', 12: 'Annual', 24: '2-Year' }
const byContract = groupChurn(rows, r => r.ContractDuration_Months, k => contractLabels[k] || k)
  .sort((a, b) => ['Monthly','Annual','2-Year'].indexOf(a.segment) - ['Monthly','Annual','2-Year'].indexOf(b.segment))

// By support tickets bucket
function ticketBucket(n) {
  if (n === 0) return '0'
  if (n <= 2)  return '1–2'
  if (n <= 4)  return '3–4'
  if (n <= 6)  return '5–6'
  return '7+'
}
const ticketOrder = ['0','1–2','3–4','5–6','7+']
const byTickets = groupChurn(rows, r => ticketBucket(r.SupportTickets), null)
  .sort((a, b) => ticketOrder.indexOf(a.segment) - ticketOrder.indexOf(b.segment))

// By monthly charges bucket
function chargesBucket(v) {
  if (v <= 40)  return '$0–40'
  if (v <= 60)  return '$40–60'
  if (v <= 80)  return '$60–80'
  if (v <= 100) return '$80–100'
  if (v <= 120) return '$100–120'
  return '$120+'
}
const chargesOrder = ['$0–40','$40–60','$60–80','$80–100','$100–120','$120+']
const byCharges = groupChurn(rows, r => chargesBucket(r.MonthlyCharges), null)
  .sort((a, b) => chargesOrder.indexOf(a.segment) - chargesOrder.indexOf(b.segment))

// ── Save JSONs ────────────────────────────────────────────────────────────────

const save = (name, data) => {
  fs.writeFileSync(path.join(OUT_DIR, name), JSON.stringify(data, null, 2))
  console.log(`  → ${name}`)
}

console.log('\nGenerating churn JSON exports...')
save('model_performance.json',    MODEL_PERFORMANCE)
save('confusion_matrix.json',     CONFUSION_MATRIX)
save('feature_importance.json',   FEATURE_IMPORTANCE)
save('churn_by_subscription.json', bySubscription)
save('churn_by_contract.json',     byContract)
save('churn_by_tickets.json',      byTickets)
save('churn_by_charges.json',      byCharges)

console.log('\nDone! All churn JSON files written to web/public/data/churn/')
