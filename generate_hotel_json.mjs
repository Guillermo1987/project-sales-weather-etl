/**
 * Hotel Dynamic Pricing Engine — Node.js JSON generator
 * Replicates dynamic_pricing_engine.py without Python/pandas dependency
 * Output: web/public/data/hotel/*.json
 */

import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR   = join(__dirname, 'web/public/data/hotel')
mkdirSync(OUT_DIR, { recursive: true })

// ── Config ────────────────────────────────────────────────────────────────────

const TOTAL_ROOMS   = 120
const BASE_PRICES   = { Standard: 120, Deluxe: 185, Suite: 320 }
const ROOM_SHARE    = { Standard: 0.55, Deluxe: 0.32, Suite: 0.13 }
const DAYS_HISTORY  = 730
const DAYS_FORECAST = 60

const SEASONALITY = {
  1: 0.72, 2: 0.78, 3: 0.88, 4: 0.95,
  5: 1.05, 6: 1.22, 7: 1.35, 8: 1.30,
  9: 1.10, 10: 1.00, 11: 0.82, 12: 1.15,
}

// 0=Mon … 6=Sun
const DOW_FACTOR = { 0: 0.92, 1: 0.90, 2: 0.93, 3: 0.97, 4: 1.12, 5: 1.25, 6: 1.18 }

const EVENTS = {
  '1-1':  1.40, '2-14': 1.20, '3-15':  1.15, '4-20':  1.10,
  '5-25': 1.18, '6-21': 1.25, '7-4':   1.45, '8-15':  1.30,
  '9-22': 1.12, '10-31':1.20, '11-28': 1.35, '12-24': 1.50,
  '12-31':1.55,
}

const DOW_NAMES = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

// ── Seeded pseudo-random (matches np.random.seed(42) close enough for demo) ──

let seed = 42
function lcg() {
  seed = (seed * 1664525 + 1013904223) & 0xffffffff
  return (seed >>> 0) / 0xffffffff
}
function randNormal(mean = 0, std = 1) {
  // Box-Muller
  const u = Math.max(lcg(), 1e-10)
  const v = lcg()
  return mean + std * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
}
function clip(v, lo, hi) { return Math.min(Math.max(v, lo), hi) }
function round2(v) { return Math.round(v * 100) / 100 }
function round4(v) { return Math.round(v * 10000) / 10000 }
function round3(v) { return Math.round(v * 1000) / 1000 }

// ── Date helpers ──────────────────────────────────────────────────────────────

function addDays(d, n) {
  const r = new Date(d)
  r.setDate(r.getDate() + n)
  return r
}
function fmtDate(d)  { return d.toISOString().slice(0, 10) }
function fmtMonth(d) { return d.toISOString().slice(0, 7) }
function eventKey(d) { return `${d.getMonth() + 1}-${d.getDate()}` }

// ── Build historical ──────────────────────────────────────────────────────────

const START_DATE = addDays(new Date(), -DAYS_HISTORY)

const hist = []
for (let i = 0; i < DAYS_HISTORY; i++) {
  const dt      = addDays(START_DATE, i)
  const seas    = SEASONALITY[dt.getMonth() + 1]
  const dow     = DOW_FACTOR[dt.getDay() === 0 ? 6 : dt.getDay() - 1] // JS: 0=Sun → 6
  const event   = EVENTS[eventKey(dt)] ?? 1.0
  const noiseOcc = randNormal(1, 0.05)
  const noiseAdr = randNormal(1, 0.04)

  const occupancy  = round4(clip(0.68 * seas * dow * noiseOcc, 0.25, 0.98))
  const rooms_sold = Math.floor(TOTAL_ROOMS * occupancy)

  for (const [rtype, base] of Object.entries(BASE_PRICES)) {
    const adr    = round2(base * seas * dow * event * noiseAdr)
    const revpar = round2(adr * occupancy)
    const rev    = round2(adr * rooms_sold * ROOM_SHARE[rtype])
    hist.push({
      date:         fmtDate(dt),
      month:        fmtMonth(dt),
      day_of_week:  DOW_NAMES[dt.getDay() === 0 ? 6 : dt.getDay() - 1],
      room_type:    rtype,
      occupancy,
      rooms_sold,
      adr,
      revpar,
      revenue:      rev,
      event_factor: event,
      season_index: seas,
    })
  }
}

// ── Build forecast ────────────────────────────────────────────────────────────

const stdHist    = hist.filter(r => r.room_type === 'Standard')
const last14     = stdHist.slice(-14)
const recentOcc  = last14.reduce((s, r) => s + r.occupancy, 0) / last14.length
const occ_f      = recentOcc > 0.85 ? 1.10 : recentOcc < 0.60 ? 0.92 : 1.0

const forecast = []
for (let i = 1; i <= DAYS_FORECAST; i++) {
  const dt    = addDays(new Date(), i)
  const seas  = SEASONALITY[dt.getMonth() + 1]
  const dow   = DOW_FACTOR[dt.getDay() === 0 ? 6 : dt.getDay() - 1]
  const event = EVENTS[eventKey(dt)] ?? 1.0
  const lead  = i
  const lead_f = 1.0 + Math.max(0, (30 - lead) / 100)

  for (const [rtype, base] of Object.entries(BASE_PRICES)) {
    const price   = round2(clip(base * seas * dow * event * lead_f * occ_f, base * 0.7, base * 2.2))
    const exp_occ = round4(clip(0.68 * seas * dow * occ_f, 0.20, 0.97))
    forecast.push({
      date:              fmtDate(dt),
      day_of_week:       DOW_NAMES[dt.getDay() === 0 ? 6 : dt.getDay() - 1],
      lead_days:         lead,
      room_type:         rtype,
      base_price:        base,
      suggested_adr:     price,
      expected_occupancy: exp_occ,
      expected_revpar:   round2(price * exp_occ),
      season_factor:     round3(seas),
      dow_factor:        round3(dow),
      event_factor:      round3(event),
      lead_factor:       round3(lead_f),
      occupancy_factor:  round3(occ_f),
      has_event:         event > 1.0,
    })
  }
}

// ── JSON exports ──────────────────────────────────────────────────────────────

function save(name, data) {
  writeFileSync(join(OUT_DIR, name), JSON.stringify(data, null, 2))
  console.log(`  ✓ ${name} (${Array.isArray(data) ? data.length : Object.keys(data).length} records)`)
}

console.log('Generating hotel JSON data...')

// 1. KPIs (last 30 days Standard)
const last30std = stdHist.slice(-30)
const allLast30 = hist.slice(-(30 * 3))
const kpis = {
  avg_adr:       round2(last30std.reduce((s,r) => s + r.adr, 0) / last30std.length),
  avg_revpar:    round2(last30std.reduce((s,r) => s + r.revpar, 0) / last30std.length),
  avg_occupancy: round4(last30std.reduce((s,r) => s + r.occupancy, 0) / last30std.length),
  total_revenue: round2(allLast30.reduce((s,r) => s + r.revenue, 0)),
  total_rooms:   TOTAL_ROOMS,
  forecast_days: DAYS_FORECAST,
}
save('kpis.json', kpis)

// 2. Monthly trend (last 24 months, all room types)
const monthMap = {}
for (const r of hist) {
  if (!monthMap[r.month]) monthMap[r.month] = { month: r.month, adr: [], revpar: [], occ: [], rev: 0 }
  monthMap[r.month].adr.push(r.adr)
  monthMap[r.month].revpar.push(r.revpar)
  monthMap[r.month].occ.push(r.occupancy)
  monthMap[r.month].rev += r.revenue
}
const monthly = Object.values(monthMap)
  .sort((a, b) => a.month.localeCompare(b.month))
  .slice(-24)
  .map(m => ({
    month:         m.month,
    avg_adr:       round2(m.adr.reduce((s,v) => s+v,0) / m.adr.length),
    avg_revpar:    round2(m.revpar.reduce((s,v) => s+v,0) / m.revpar.length),
    avg_occupancy: round4(m.occ.reduce((s,v) => s+v,0) / m.occ.length),
    total_revenue: round2(m.rev),
  }))
save('monthly_trend.json', monthly)

// 3. Revenue by room type (last 12 months)
const cutDate = fmtDate(addDays(new Date(), -365))
const roomMap = {}
for (const r of hist) {
  if (r.date < cutDate) continue
  if (!roomMap[r.room_type]) roomMap[r.room_type] = { room_type: r.room_type, rev: 0, adr: [], occ: [] }
  roomMap[r.room_type].rev += r.revenue
  roomMap[r.room_type].adr.push(r.adr)
  roomMap[r.room_type].occ.push(r.occupancy)
}
const byRoom = Object.values(roomMap).map(m => ({
  room_type:       m.room_type,
  total_revenue:   round2(m.rev),
  avg_adr:         round2(m.adr.reduce((s,v) => s+v,0) / m.adr.length),
  avg_occupancy:   round4(m.occ.reduce((s,v) => s+v,0) / m.occ.length),
}))
save('revenue_by_room.json', byRoom)

// 4. Occupancy by day of week (Standard only)
const dowMap = {}
for (const r of stdHist) {
  if (!dowMap[r.day_of_week]) dowMap[r.day_of_week] = { day_of_week: r.day_of_week, occ: [], adr: [] }
  dowMap[r.day_of_week].occ.push(r.occupancy)
  dowMap[r.day_of_week].adr.push(r.adr)
}
const byDow = DOW_NAMES
  .filter(d => dowMap[d])
  .map(d => ({
    day_of_week:  d,
    avg_occupancy: round4(dowMap[d].occ.reduce((s,v) => s+v,0) / dowMap[d].occ.length),
    avg_adr:       round2(dowMap[d].adr.reduce((s,v) => s+v,0) / dowMap[d].adr.length),
  }))
save('occupancy_by_dow.json', byDow)

// 5. 60-day forecast (Standard only)
const fcStd = forecast
  .filter(r => r.room_type === 'Standard')
  .map(({ date, day_of_week, lead_days, suggested_adr, expected_occupancy,
          expected_revpar, season_factor, dow_factor, event_factor, has_event }) =>
    ({ date, day_of_week, lead_days, suggested_adr, expected_occupancy,
       expected_revpar, season_factor, dow_factor, event_factor, has_event }))
save('forecast.json', fcStd)

// 6. Pricing factors
const stdSeasonMean = round3(stdHist.reduce((s,r) => s + r.season_index, 0) / stdHist.length)
const dowValMap = Object.fromEntries(DOW_NAMES.map((d,i) => [d, DOW_FACTOR[i]]))
const stdDowMean = round3(stdHist.reduce((s,r) => s + (dowValMap[r.day_of_week] ?? 1), 0) / stdHist.length)
const stdEventMean = round3(stdHist.reduce((s,r) => s + r.event_factor, 0) / stdHist.length)

const factors = [
  { factor: 'Base Price',         avg_value: BASE_PRICES.Standard, description: 'Starting point' },
  { factor: 'Seasonality',        avg_value: stdSeasonMean,        description: 'Monthly demand index' },
  { factor: 'Day of Week',        avg_value: stdDowMean,           description: 'Weekend premium' },
  { factor: 'Local Events',       avg_value: stdEventMean,         description: 'Conferences & holidays' },
  { factor: 'Occupancy Pressure', avg_value: 1.05,                 description: 'Supply/demand balance' },
  { factor: 'Lead Time',          avg_value: 1.08,                 description: 'Last-minute premium' },
]
save('pricing_factors.json', factors)

console.log('Done.')
