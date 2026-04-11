const fmtUSD = (v) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)
const fmtPct = (v) => `${(v * 100).toFixed(1)}%`
const fmtNum = (v) => new Intl.NumberFormat('en-US').format(v)
const fmtX   = (v) => `${v.toFixed(1)}x`

function KpiCard({ label, value, sub, color, trend }) {
  return (
    <div className="kpi-card">
      <div className="kpi-label">{label}</div>
      <div className="kpi-value" style={{ color }}>{value}</div>
      {sub && <div className="kpi-sub">{sub}</div>}
      {trend !== undefined && (
        <div className="kpi-sub" style={{ color: trend >= 0 ? '#34d399' : '#f87171' }}>
          {trend >= 0 ? '▲' : '▼'} vs prev month
        </div>
      )}
    </div>
  )
}

export default function ExecKpiCards({ data }) {
  if (!data || data.length === 0) return null

  const last  = data[data.length - 1]
  const prev  = data[data.length - 2] || last
  const arr   = last.arr

  return (
    <div className="kpi-grid kpi-grid-6">
      <KpiCard label="ARR"             value={fmtUSD(arr)}              sub={`MRR ${fmtUSD(last.mrr)}`}            color="#60a5fa" trend={last.revenue - prev.revenue} />
      <KpiCard label="Gross Margin"    value={fmtPct(last.gross_margin_pct)} sub={`EBITDA ${fmtPct(last.ebitda_margin_pct)}`} color="#34d399" trend={last.gross_margin_pct - prev.gross_margin_pct} />
      <KpiCard label="NRR"             value={fmtPct(last.nrr)}         sub="Net Revenue Retention"                color={last.nrr >= 1 ? '#34d399' : '#f87171'} />
      <KpiCard label="CAC"             value={fmtUSD(last.cac)}         sub={`Payback ${last.payback_months.toFixed(0)}mo`} color="#f472b6" trend={-(last.cac - prev.cac)} />
      <KpiCard label="LTV : CAC"       value={fmtX(last.ltv_cac_ratio)} sub={`LTV ${fmtUSD(last.ltv)}`}            color="#fbbf24" />
      <KpiCard label="Churn Rate"      value={fmtPct(last.churn_rate)}  sub={`${last.churned_customers} churned`}  color={last.churn_rate < 0.05 ? '#34d399' : '#f87171'} trend={-(last.churn_rate - prev.churn_rate)} />
    </div>
  )
}
