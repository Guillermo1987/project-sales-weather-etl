import {
  ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts'

const fmt = (v) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

export default function RevenueTrend({ data }) {
  if (!data) return null
  const display = data.filter((_, i) => i % 2 === 0 || i === data.length - 1)

  return (
    <div className="card">
      <h2>Revenue & Gross Profit Trend</h2>
      <p className="card-desc">36-month view — MRR, Gross Profit and EBITDA</p>
      <ResponsiveContainer width="100%" height={280}>
        <ComposedChart data={data} margin={{ top: 8, right: 24, bottom: 8, left: 16 }}>
          <defs>
            <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#60a5fa" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gpGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#34d399" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 10 }} interval={5} angle={-30} textAnchor="end" height={38} />
          <YAxis tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} tick={{ fill: '#94a3b8', fontSize: 11 }} />
          <Tooltip
            formatter={(v, name) => [fmt(v), name]}
            contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8 }}
            labelStyle={{ color: '#cbd5e1' }}
          />
          <Legend formatter={(v) => <span style={{ color: '#94a3b8', fontSize: 12 }}>{v}</span>} />
          <Area type="monotone" dataKey="revenue"      name="Revenue"      stroke="#60a5fa" strokeWidth={2} fill="url(#revGrad)" />
          <Area type="monotone" dataKey="gross_profit" name="Gross Profit"  stroke="#34d399" strokeWidth={2} fill="url(#gpGrad)" />
          <Line type="monotone" dataKey="ebitda"       name="EBITDA"        stroke="#f472b6" strokeWidth={1.5} dot={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
