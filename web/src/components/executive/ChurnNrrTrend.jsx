import {
  ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine,
} from 'recharts'

const fmtPct = (v) => `${(v * 100).toFixed(1)}%`

export default function ChurnNrrTrend({ data }) {
  if (!data) return null
  const display = data.filter((_, i) => i % 2 === 0 || i === data.length - 1)

  return (
    <div className="card">
      <h2>Churn &amp; NRR</h2>
      <p className="card-desc">Churn rate vs Net Revenue Retention — target NRR &gt; 100%</p>
      <ResponsiveContainer width="100%" height={260}>
        <ComposedChart data={display} margin={{ top: 8, right: 24, bottom: 8, left: 16 }}>
          <defs>
            <linearGradient id="nrrGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#34d399" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 10 }} angle={-30} textAnchor="end" height={38} />
          <YAxis yAxisId="nrr"   tickFormatter={fmtPct} domain={[0.85, 1.15]} tick={{ fill: '#94a3b8', fontSize: 11 }} />
          <YAxis yAxisId="churn" orientation="right" tickFormatter={fmtPct} domain={[0, 0.12]} tick={{ fill: '#94a3b8', fontSize: 11 }} />
          <ReferenceLine yAxisId="nrr" y={1} stroke="#475569" strokeDasharray="4 4" />
          <Tooltip
            formatter={(v, name) => [fmtPct(v), name]}
            contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8 }}
            labelStyle={{ color: '#cbd5e1' }}
          />
          <Legend formatter={(v) => <span style={{ color: '#94a3b8', fontSize: 12 }}>{v}</span>} />
          <Area   yAxisId="nrr"   type="monotone" dataKey="nrr"        name="NRR"        stroke="#34d399" strokeWidth={2} fill="url(#nrrGrad)" />
          <Line   yAxisId="churn" type="monotone" dataKey="churn_rate" name="Churn Rate" stroke="#f87171" strokeWidth={1.5} dot={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
