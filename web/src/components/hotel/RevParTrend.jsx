import {
  ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts'

const fmtD = (v) => `$${v.toFixed(0)}`

export default function RevParTrend({ data }) {
  if (!data) return null
  // Show every other month label to avoid clutter
  const display = data.filter((_, i) => i % 2 === 0 || i === data.length - 1)

  return (
    <div className="card">
      <h2>ADR & RevPAR Monthly Trend</h2>
      <p className="card-desc">24-month historical view — Average Daily Rate and Revenue per Available Room</p>
      <ResponsiveContainer width="100%" height={280}>
        <ComposedChart data={data} margin={{ top: 8, right: 24, bottom: 8, left: 16 }}>
          <defs>
            <linearGradient id="adrGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#60a5fa" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="revparGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#34d399" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 10 }} interval={3} angle={-30} textAnchor="end" height={38} />
          <YAxis tickFormatter={fmtD} tick={{ fill: '#94a3b8', fontSize: 11 }} />
          <Tooltip
            formatter={(v, name) => [`$${v.toFixed(2)}`, name]}
            contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8 }}
            labelStyle={{ color: '#cbd5e1' }}
          />
          <Legend formatter={(v) => <span style={{ color: '#94a3b8', fontSize: 12 }}>{v}</span>} />
          <Area type="monotone" dataKey="avg_adr"    name="ADR"    stroke="#60a5fa" strokeWidth={2} fill="url(#adrGrad)" />
          <Area type="monotone" dataKey="avg_revpar" name="RevPAR" stroke="#34d399" strokeWidth={2} fill="url(#revparGrad)" />
          <Line type="monotone" dataKey="avg_occupancy" name="Occupancy %" yAxisId="right"
            stroke="#fbbf24" strokeWidth={1.5} dot={false}
            hide
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
