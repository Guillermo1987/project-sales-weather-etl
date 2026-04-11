import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, LineChart, Line,
} from 'recharts'

const fmtUSD = (v) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)
const fmtPct = (v) => `${(v * 100).toFixed(1)}%`

export default function MarketingFunnel({ data }) {
  if (!data) return null
  const display = data.filter((_, i) => i % 2 === 0 || i === data.length - 1)

  return (
    <div className="card">
      <h2>Marketing Funnel</h2>
      <p className="card-desc">MQLs → SQLs → Won — conversion rates & ROAS</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={display} margin={{ top: 8, right: 8, bottom: 8, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 9 }} angle={-30} textAnchor="end" height={38} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} />
            <Tooltip
              formatter={(v, name) => [v, name]}
              contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8 }}
              labelStyle={{ color: '#cbd5e1' }}
            />
            <Legend formatter={(v) => <span style={{ color: '#94a3b8', fontSize: 11 }}>{v}</span>} />
            <Bar dataKey="mqls"          name="MQLs"     fill="#60a5fa" radius={[3,3,0,0]} />
            <Bar dataKey="sqls"          name="SQLs"     fill="#34d399" radius={[3,3,0,0]} />
            <Bar dataKey="new_customers" name="Won"      fill="#f472b6" radius={[3,3,0,0]} />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={display} margin={{ top: 8, right: 8, bottom: 8, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 9 }} angle={-30} textAnchor="end" height={38} />
            <YAxis yAxisId="left"  tickFormatter={(v) => `${v.toFixed(1)}x`} tick={{ fill: '#94a3b8', fontSize: 10 }} />
            <YAxis yAxisId="right" orientation="right" tickFormatter={(v) => `$${v}`} tick={{ fill: '#94a3b8', fontSize: 10 }} />
            <Tooltip
              formatter={(v, name) => [name === 'ROAS' ? `${v.toFixed(1)}x` : `$${v.toFixed(0)}`, name]}
              contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8 }}
              labelStyle={{ color: '#cbd5e1' }}
            />
            <Legend formatter={(v) => <span style={{ color: '#94a3b8', fontSize: 11 }}>{v}</span>} />
            <Line yAxisId="left"  dataKey="roas" name="ROAS" stroke="#fbbf24" strokeWidth={2} dot={false} />
            <Line yAxisId="right" dataKey="cpl"  name="CPL"  stroke="#a78bfa" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
