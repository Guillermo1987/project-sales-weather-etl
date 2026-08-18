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

// ── Model results — copied, never invented ───────────────────────────────────
//
// These three files describe a fitted model, and nothing in this script fits
// one. They used to be hardcoded literals under a comment claiming they came
// "from a Python/sklearn run", and they did not: the AUC-ROC of 0.8812 that
// reached the dashboard, the README and the organisation profile could not be
// reproduced from any code or data in either repository. The real value is
// 0.703.
//
// They are now read from what churn_analysis.py actually wrote. If that output
// is missing, this script writes the four aggregations it CAN compute from the
// CSV and skips the other three, rather than publishing a number it made up.
// Run `python churn_analysis.py` in project-churn-analysis first.

const MODEL_DIR = path.join(__dirname, '..', 'project-churn-analysis', 'data')

function leerDelModelo(nombre) {
  try {
    return JSON.parse(fs.readFileSync(path.join(MODEL_DIR, nombre), 'utf8'))
  } catch {
    console.log(`  aviso: falta ${nombre} en ${MODEL_DIR} — no se genera`)
    return null
  }
}

const MODEL_PERFORMANCE  = leerDelModelo('model_performance.json')
const CONFUSION_MATRIX   = leerDelModelo('confusion_matrix.json')
const FEATURE_IMPORTANCE = leerDelModelo('feature_importance.json')

// ── Compute aggregations from CSV ────────────────────────────────────────────

console.log('Reading churn dataset...')
let rows
try {
  rows = parseCSV(CSV_PATH)
  console.log(`  ${rows.length} customers loaded`)
} catch {
  // There used to be an inline generator here that invented 2.000 customers
  // when the CSV was missing, and the aggregations it produced then shipped to
  // the dashboard indistinguishable from real ones. Stopping is the only
  // honest option: these files describe a dataset, and without the dataset
  // there is nothing to describe.
  console.error(`\nNo se pudo leer ${CSV_PATH}`)
  console.error('Este script agrega el dataset de project-churn-analysis; no lo genera.')
  console.error('Clona los dos repositorios uno al lado del otro y ejecuta antes:')
  console.error('    cd ../project-churn-analysis && python generate_data.py && python churn_analysis.py\n')
  process.exit(1)
}

// The Python already reports churn_rate and n_customers from the same CSV, so
// overwriting them here is what produced a model_performance.json that said
// 1500 train + 500 test and n_customers 1000 in the same breath. Left alone.

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
if (MODEL_PERFORMANCE)  save('model_performance.json',  MODEL_PERFORMANCE)
if (CONFUSION_MATRIX)   save('confusion_matrix.json',   CONFUSION_MATRIX)
if (FEATURE_IMPORTANCE) save('feature_importance.json', FEATURE_IMPORTANCE)
save('churn_by_subscription.json', bySubscription)
save('churn_by_contract.json',     byContract)
save('churn_by_tickets.json',      byTickets)
save('churn_by_charges.json',      byCharges)

console.log('\nDone! All churn JSON files written to web/public/data/churn/')
