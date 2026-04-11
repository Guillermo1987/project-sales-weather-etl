const fmtPct = (v) => `${(v * 100).toFixed(1)}%`

function KpiCard({ label, value, sub, color }) {
  return (
    <div className="kpi-card">
      <div className="kpi-label">{label}</div>
      <div className="kpi-value" style={{ color }}>{value}</div>
      {sub && <div className="kpi-sub">{sub}</div>}
    </div>
  )
}

export default function ChurnKpiCards({ perf }) {
  if (!perf) return null
  return (
    <div className="kpi-grid kpi-grid-6">
      <KpiCard label="Dataset"        value={perf.n_customers.toLocaleString()} sub="synthetic customers"      color="#60a5fa" />
      <KpiCard label="Churn Rate"     value={fmtPct(perf.churn_rate)}           sub="overall in dataset"       color="#f87171" />
      <KpiCard label="Accuracy"       value={fmtPct(perf.accuracy)}             sub="model overall"            color="#34d399" />
      <KpiCard label="AUC-ROC"        value={perf.auc_roc.toFixed(3)}           sub="discrimination ability"   color="#fbbf24" />
      <KpiCard label="Precision"      value={fmtPct(perf.precision)}            sub="of predicted churners"    color="#f472b6" />
      <KpiCard label="Recall"         value={fmtPct(perf.recall)}               sub="churners correctly found" color="#a78bfa" />
    </div>
  )
}
