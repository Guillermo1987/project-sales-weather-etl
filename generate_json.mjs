/**
 * Node.js script to replicate the Python ETL output as JSON files.
 * Run: node generate_json.mjs
 * Outputs to web/public/data/ — same files the React app expects.
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_DIR = path.join(__dirname, 'web', 'public', 'data')
fs.mkdirSync(OUT_DIR, { recursive: true })

// ── CSV parser ─────────────────────────────────────────────────────────────

function parseCSV(filePath, encoding = 'utf8') {
  const text = fs.readFileSync(filePath, encoding)
  const lines = text.split('\n').filter(Boolean)
  const headers = splitCSVLine(lines[0])
  return lines.slice(1).map(line => {
    const vals = splitCSVLine(line)
    const obj = {}
    headers.forEach((h, i) => { obj[h.trim()] = (vals[i] ?? '').trim() })
    return obj
  })
}

function splitCSVLine(line) {
  const result = []
  let cur = '', inQuote = false
  for (const ch of line) {
    if (ch === '"') { inQuote = !inQuote }
    else if (ch === ',' && !inQuote) { result.push(cur); cur = '' }
    else { cur += ch }
  }
  result.push(cur)
  return result
}

// ── Extract ────────────────────────────────────────────────────────────────

console.log('Extracting sales...')
const rawSales = parseCSV(path.join(__dirname, 'data/raw/sales/train.csv'))
console.log(`  ${rawSales.length} sales rows`)

console.log('Extracting weather (US only)...')
const rawWeather = parseCSV(path.join(__dirname, 'data/raw/weather/city_temperature.csv'), 'latin1')
const usWeather = rawWeather.filter(r => r.Country === 'US' && parseFloat(r.AvgTemperature) > -50)
console.log(`  ${usWeather.length} US weather rows`)

// ── Transform sales ────────────────────────────────────────────────────────

function parseDate(str) {
  // Format: MM/DD/YYYY
  const [m, d, y] = str.split('/')
  return new Date(+y, +m - 1, +d)
}

const sales = rawSales.map(r => {
  const dt = parseDate(r['Order Date'])
  const isWeekend = dt.getDay() === 0 || dt.getDay() === 6
  return {
    order_date: dt,
    city: r.City,
    region: r.Region,
    category: r.Category,
    sales: parseFloat(r.Sales) || 0,
    year: dt.getFullYear(),
    month: dt.getMonth() + 1,
    is_weekend: isWeekend,
  }
})

// ── Transform weather ──────────────────────────────────────────────────────

// Aggregate to city-day
const weatherMap = new Map()
for (const r of usWeather) {
  const key = `${r.City}__${r.Year}-${String(r.Month).padStart(2,'0')}-${String(r.Day).padStart(2,'0')}`
  if (!weatherMap.has(key)) weatherMap.set(key, { city: r.City, temps: [], date: new Date(+r.Year, +r.Month-1, +r.Day) })
  weatherMap.get(key).temps.push(parseFloat(r.AvgTemperature))
}
const weather = Array.from(weatherMap.values()).map(w => ({
  city: w.city,
  date: w.date,
  avg_temp_f: w.temps.reduce((a,b) => a+b, 0) / w.temps.length,
}))

// ── Join ───────────────────────────────────────────────────────────────────

const weatherIndex = new Map()
for (const w of weather) {
  const key = `${w.city.toLowerCase()}__${w.date.getFullYear()}-${w.date.getMonth()}-${w.date.getDate()}`
  weatherIndex.set(key, w)
}

let matchCount = 0
const merged = sales.map(s => {
  const key = `${s.city.toLowerCase()}__${s.order_date.getFullYear()}-${s.order_date.getMonth()}-${s.order_date.getDate()}`
  const w = weatherIndex.get(key)
  if (w) matchCount++
  const avg_temp_f = w ? w.avg_temp_f : null
  const avg_temp_c = avg_temp_f !== null ? Math.round(((avg_temp_f - 32) * 5/9) * 10) / 10 : null

  let temp_category = 'Unknown'
  if (avg_temp_c !== null) {
    if (avg_temp_c < 10) temp_category = 'Cold (<10°C)'
    else if (avg_temp_c < 20) temp_category = 'Mild (10-20°C)'
    else if (avg_temp_c < 30) temp_category = 'Warm (20-30°C)'
    else temp_category = 'Hot (>30°C)'
  }

  return { ...s, avg_temp_f, avg_temp_c, temp_category }
})

console.log(`  Join: ${matchCount} of ${merged.length} matched with weather (${(matchCount/merged.length*100).toFixed(1)}%)`)

// ── Aggregate helpers ──────────────────────────────────────────────────────

function groupBy(arr, keyFn) {
  const map = new Map()
  for (const item of arr) {
    const k = keyFn(item)
    if (!map.has(k)) map.set(k, [])
    map.get(k).push(item)
  }
  return map
}

function sumSales(arr) { return arr.reduce((s, r) => s + r.sales, 0) }
function round2(v) { return Math.round(v * 100) / 100 }

// ── Load — generate JSON files ─────────────────────────────────────────────

function saveJSON(filename, data) {
  fs.writeFileSync(path.join(OUT_DIR, filename), JSON.stringify(data, null, 2))
  console.log(`  → ${filename} (${data.length} records)`)
}

console.log('\nGenerating JSON exports...')

// 1. Sales by Category
const byCat = groupBy(merged, r => r.category)
saveJSON('sales_by_category.json', Array.from(byCat.entries()).map(([category, rows]) => ({
  category,
  total_sales: round2(sumSales(rows)),
  avg_sales: round2(sumSales(rows) / rows.length),
  num_orders: rows.length,
})))

// 2. Monthly Revenue
const byMonth = groupBy(merged, r => `${r.year}-${String(r.month).padStart(2,'0')}`)
const monthlyArr = Array.from(byMonth.entries())
  .map(([period, rows]) => ({ period, total_sales: round2(sumSales(rows)) }))
  .sort((a, b) => a.period.localeCompare(b.period))
saveJSON('monthly_revenue.json', monthlyArr)

// 3. Sales by Temperature
const byTemp = groupBy(
  merged.filter(r => r.temp_category !== 'Unknown'),
  r => r.temp_category
)
const TEMP_ORDER = ['Cold (<10°C)', 'Mild (10-20°C)', 'Warm (20-30°C)', 'Hot (>30°C)']
saveJSON('sales_by_temp.json', TEMP_ORDER.filter(t => byTemp.has(t)).map(temp_category => {
  const rows = byTemp.get(temp_category)
  return {
    temp_category,
    total_sales: round2(sumSales(rows)),
    avg_sales: round2(sumSales(rows) / rows.length),
    num_orders: rows.length,
  }
}))

// 4. Sales by Region
const byRegion = groupBy(merged, r => r.region)
saveJSON('sales_by_region.json', Array.from(byRegion.entries()).map(([region, rows]) => ({
  region,
  total_sales: round2(sumSales(rows)),
  avg_sales: round2(sumSales(rows) / rows.length),
})))

// 5. Weekend vs Weekday
const byDayType = groupBy(merged, r => r.is_weekend)
saveJSON('sales_weekend_vs_weekday.json', [
  { is_weekend: false, day_type: 'Weekday' },
  { is_weekend: true,  day_type: 'Weekend' },
].map(({ is_weekend, day_type }) => {
  const rows = byDayType.get(is_weekend) || []
  return {
    day_type,
    total_sales: round2(sumSales(rows)),
    avg_sales: round2(sumSales(rows) / (rows.length || 1)),
    num_orders: rows.length,
  }
}))

// 6. Scatter: temp vs sales (sample 500)
const withTemp = merged.filter(r => r.avg_temp_c !== null)
const step = Math.max(1, Math.floor(withTemp.length / 500))
const scatter = withTemp.filter((_, i) => i % step === 0).slice(0, 500).map(r => ({
  avg_temp_c: r.avg_temp_c,
  sales: round2(r.sales),
  category: r.category,
}))
saveJSON('temp_vs_sales_scatter.json', scatter)

console.log('\nDone! All JSON files written to web/public/data/')
