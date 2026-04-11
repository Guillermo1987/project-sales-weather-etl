const fmt  = (v) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)
const fmtD = (v) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(v)
const fmtP = (v) => `${(v * 100).toFixed(1)}%`

function KpiCard({ label, value, sub, color }) {
  return (
    <div className="kpi-card">
      <div className="kpi-label">{label}</div>
      <div className="kpi-value" style={{ color }}>{value}</div>
      {sub && <div className="kpi-sub">{sub}</div>}
    </div>
  )
}

export default function HotelKpiCards({ kpis }) {
  if (!kpis) return null
  return (
    <div className="kpi-grid kpi-grid-6">
      <KpiCard label="Avg ADR (30d)"    value={fmtD(kpis.avg_adr)}              sub="Average Daily Rate"       color="#60a5fa" />
      <KpiCard label="Avg RevPAR (30d)" value={fmtD(kpis.avg_revpar)}           sub="Revenue per avail. room"  color="#34d399" />
      <KpiCard label="Avg Occupancy"    value={fmtP(kpis.avg_occupancy)}        sub="Last 30 days"             color="#fbbf24" />
      <KpiCard label="Total Revenue"    value={fmt(kpis.total_revenue)}         sub="Last 90 days (all types)" color="#f472b6" />
      <KpiCard label="Total Rooms"      value={kpis.total_rooms.toLocaleString()} sub="property capacity"      color="#94a3b8" />
      <KpiCard label="Forecast"         value={`${kpis.forecast_days}d`}        sub="pricing horizon"          color="#a78bfa" />
    </div>
  )
}
