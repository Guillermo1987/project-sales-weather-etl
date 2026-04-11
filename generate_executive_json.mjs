/**
 * Executive Dashboard 360° — JSON data generator (Node.js)
 * Replicates generate_data.py without requiring pandas.
 * Run: node generate_executive_json.mjs
 * Outputs to web/public/data/executive/
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_DIR = path.join(__dirname, 'web', 'public', 'data', 'executive')
fs.mkdirSync(OUT_DIR, { recursive: true })

// ── helpers ──────────────────────────────────────────────────────────────────

const N = 36
const seed = (() => { let s = 42; return () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return (s >>> 0) / 0xffffffff } })()
const rnd  = () => seed()
const norm = (mu = 0, sd = 1) => { const u = 1 - rnd(); const v = rnd(); return mu + sd * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v) }
const r2   = v => Math.round(v * 100) / 100
const r0   = v => Math.round(v)
const r4   = v => Math.round(v * 10000) / 10000
const clip = (v, lo, hi) => Math.max(lo, Math.min(hi, v))

function linspace(start, end, n) {
  return Array.from({ length: n }, (_, i) => start + (end - start) * (i / (n - 1)))
}

function months() {
  const out = []
  let y = 2022, m = 1
  for (let i = 0; i < N; i++) {
    out.push(`${y}-${String(m).padStart(2,'0')}`)
    m++; if (m > 12) { m = 1; y++ }
  }
  return out
}

const MONTHS = months()
const T = Array.from({ length: N }, (_, i) => i)
const seasonal = (amp) => T.map(t => amp * Math.sin(2 * Math.PI * t / 12 - Math.PI / 2))

// ── 1. Executive Summary ─────────────────────────────────────────────────────

console.log('Generating executive summary...')

const revBase   = linspace(480000, 920000, N)
const revSeas   = seasonal(45000)
const revenue   = T.map(i => r0(clip(revBase[i] + revSeas[i] + norm(0, 18000), 300000, Infinity)))

const cogsPct   = linspace(0.48, 0.41, N).map(v => v + norm(0, 0.01))
const grossProfit = revenue.map((r,i) => r0(r * (1 - cogsPct[i])))
const grossMargin = revenue.map((r,i) => r4(grossProfit[i] / r))

const opexPct   = linspace(0.28, 0.22, N).map(v => v + norm(0, 0.008))
const ebitda    = revenue.map((r,i) => r0(grossProfit[i] - r * opexPct[i]))
const ebitdaMargin = revenue.map((r,i) => r4(ebitda[i] / r))

const newCust   = T.map(i => Math.max(40, Math.round(linspace(120,260,N)[i] + seasonal(18)[i] + norm(0,12))))
const cumCust   = newCust.reduce((acc,v,i) => { acc.push((acc[i-1]||0)+v); return acc }, [])
const churnRate = T.map(i => r4(clip(0.08 - (grossMargin[i]) * 0.05 + norm(0,0.004), 0.01, 0.10)))
const churned   = T.map(i => Math.max(1, Math.round(newCust[i] * churnRate[i])))

const expansionRev    = revenue.map((r,i) => r0(r * (linspace(0.06,0.13,N)[i] + norm(0,0.008))))
const contractionRev  = revenue.map((r,i) => r0(r * (linspace(0.03,0.015,N)[i] + norm(0,0.004))))
const nrr = T.map(i => r4(clip((revenue[i] + expansionRev[i] - contractionRev[i]) / revenue[i], 0.7, 1.4)))

const mktSpend  = revenue.map((r,i) => r0(r * (linspace(0.10,0.07,N)[i] + norm(0,0.006))))
const mqls      = mktSpend.map((s,i) => Math.max(1, Math.round(s / (linspace(180,110,N)[i] + norm(0,12)))))
const sqls      = mqls.map((q,i) => Math.max(1, Math.round(q * (linspace(0.28,0.38,N)[i] + norm(0,0.02)))))
const cac       = mktSpend.map((s,i) => r2(s / Math.max(1, newCust[i])))
const ltv       = T.map(i => r2(clip((revenue[i] / Math.max(1, cumCust[i])) / Math.max(0.01, churnRate[i]), 100, 999999)))
const ltvCac    = T.map(i => r2(ltv[i] / Math.max(1, cac[i])))
const payback   = T.map(i => r2(cac[i] / Math.max(1, revenue[i] / Math.max(1, cumCust[i]))))

const winRate   = linspace(0.22,0.31,N).map((v,i) => r4(clip(v + norm(0,0.015), 0.05, 0.6)))
const salesCycle = T.map(i => r2(clip(linspace(52,38,N)[i] + seasonal(4)[i] + norm(0,3), 20, 90)))
const pipelineVal = revenue.map((r,i) => r0(r * (linspace(3.2,4.8,N)[i] + norm(0,0.2))))
const pipeCoverage = pipelineVal.map((p,i) => r2(p / Math.max(1, revenue[i])))

const summary = MONTHS.map((month,i) => ({
  month, revenue: revenue[i], gross_profit: grossProfit[i],
  gross_margin_pct: grossMargin[i], ebitda: ebitda[i], ebitda_margin_pct: ebitdaMargin[i],
  mrr: revenue[i], arr: revenue[i] * 12,
  new_customers: newCust[i], churned_customers: churned[i], churn_rate: churnRate[i],
  nrr: nrr[i], expansion_revenue: expansionRev[i],
  marketing_spend: mktSpend[i], mqls: mqls[i], sqls: sqls[i],
  cac: cac[i], ltv: ltv[i], ltv_cac_ratio: ltvCac[i], payback_months: payback[i],
  win_rate: winRate[i], sales_cycle_days: salesCycle[i],
  pipeline_value: pipelineVal[i], pipeline_coverage: pipeCoverage[i],
}))

fs.writeFileSync(path.join(OUT_DIR,'executive_summary.json'), JSON.stringify(summary, null, 2))
console.log(`  → executive_summary.json (${summary.length} rows, ${Object.keys(summary[0]).length} KPIs)`)

// ── 2. Revenue by Segment ────────────────────────────────────────────────────

console.log('Generating revenue by segment...')

const segSplits = {
  SMB:        linspace(0.45, 0.32, N),
  'Mid-Market': linspace(0.35, 0.40, N),
  Enterprise: linspace(0.20, 0.28, N),
}
const segChurn = {
  SMB: linspace(0.07, 0.04, N),
  'Mid-Market': linspace(0.05, 0.03, N),
  Enterprise: linspace(0.03, 0.015, N),
}

const bySegment = []
for (const [seg, splits] of Object.entries(segSplits)) {
  MONTHS.forEach((month, i) => {
    const share = splits[i]
    const rev   = r0(revenue[i] * share)
    const cust  = Math.max(1, Math.round(newCust[i] * share * (0.9 + rnd() * 0.2)))
    bySegment.push({
      month, segment: seg,
      revenue: rev, new_customers: cust,
      churn_rate: r4(clip(segChurn[seg][i] + norm(0,0.003), 0.005, 0.12)),
      avg_deal_size: r2(rev / cust),
    })
  })
}

fs.writeFileSync(path.join(OUT_DIR,'revenue_by_segment.json'), JSON.stringify(bySegment, null, 2))
console.log(`  → revenue_by_segment.json (${bySegment.length} rows)`)

// ── 3. Revenue by Channel ────────────────────────────────────────────────────

console.log('Generating revenue by channel...')

const chSplits = {
  Inbound:  linspace(0.38, 0.44, N),
  Outbound: linspace(0.30, 0.22, N),
  Partners: linspace(0.18, 0.24, N),
  Direct:   linspace(0.14, 0.10, N),
}
const chCacMult = { Inbound: 0.7, Outbound: 1.4, Partners: 0.9, Direct: 0.5 }

const byChannel = []
for (const [ch, splits] of Object.entries(chSplits)) {
  MONTHS.forEach((month, i) => {
    const share = splits[i]
    const rev   = r0(revenue[i] * share)
    const cust  = Math.max(1, Math.round(newCust[i] * share * (0.85 + rnd() * 0.3)))
    byChannel.push({
      month, channel: ch,
      revenue: rev, new_customers: cust,
      cac: r2(cac[i] * chCacMult[ch] * (0.9 + rnd() * 0.2)),
    })
  })
}

fs.writeFileSync(path.join(OUT_DIR,'revenue_by_channel.json'), JSON.stringify(byChannel, null, 2))
console.log(`  → revenue_by_channel.json (${byChannel.length} rows)`)

// ── 4. Marketing Funnel ──────────────────────────────────────────────────────

console.log('Generating marketing funnel...')

const marketingFunnel = MONTHS.map((month, i) => ({
  month,
  marketing_spend: mktSpend[i],
  mqls: mqls[i], sqls: sqls[i],
  new_customers: newCust[i],
  cac: cac[i],
  mql_to_sql_rate: r4(sqls[i] / Math.max(1, mqls[i])),
  sql_to_won_rate: r4(newCust[i] / Math.max(1, sqls[i])),
  cpl: r2(mktSpend[i] / Math.max(1, mqls[i])),
  roas: r2(revenue[i] / Math.max(1, mktSpend[i])),
}))

fs.writeFileSync(path.join(OUT_DIR,'marketing_funnel.json'), JSON.stringify(marketingFunnel, null, 2))
console.log(`  → marketing_funnel.json (${marketingFunnel.length} rows)`)

// ── 5. Pipeline Stages ───────────────────────────────────────────────────────

console.log('Generating pipeline stages...')

const stages  = ['Prospecting','Qualified','Proposal','Negotiation','Closed Won']
const weights = [0.40, 0.25, 0.18, 0.12, 0.05]

const pipelineStages = []
MONTHS.forEach((month, i) => {
  stages.forEach((stage, si) => {
    const noise = 0.85 + rnd() * 0.3
    pipelineStages.push({
      month, stage,
      deals: Math.max(1, Math.round(newCust[i] * weights[si] * 4 * noise)),
      value: r0(pipelineVal[i] * weights[si] * noise),
    })
  })
})

fs.writeFileSync(path.join(OUT_DIR,'pipeline_stages.json'), JSON.stringify(pipelineStages, null, 2))
console.log(`  → pipeline_stages.json (${pipelineStages.length} rows)`)

console.log('\nAll executive JSON files written to web/public/data/executive/')
