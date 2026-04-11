import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const fmt = (v) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

const COLORS = { Inbound: '#60a5fa', Outbound: '#f472b6', Partners: '#34d399', Direct: '#fbbf24' }

export default function RevenueByChannel({ data }) {
  if (!data) return null

  // Last 3 months aggregate
  const months = [...new Set(data.map(d => d.month))].sort().slice(-3)
  const totals  = {}
  data.filter(d => months.includes(d.month)).forEach(({ channel, revenue }) => {
    totals[channel] = (totals[channel] || 0) + revenue
  })
  const rows = Object.entries(totals).map(([channel, revenue]) => ({ channel, revenue }))

  return (
    <div className="card">
      <h2>Revenue by Channel</h2>
      <p className="card-desc">Last 3 months — Inbound · Outbound · Partners · Direct</p>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie data={rows} dataKey="revenue" nameKey="channel" cx="50%" cy="50%"
            outerRadius={95} innerRadius={48} paddingAngle={3}>
            {rows.map(({ channel }) => <Cell key={channel} fill={COLORS[channel] || '#94a3b8'} />)}
          </Pie>
          <Tooltip
            formatter={(v) => [fmt(v), 'Revenue']}
            contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8 }}
            labelStyle={{ color: '#cbd5e1' }}
          />
          <Legend formatter={(v) => <span style={{ color: '#94a3b8', fontSize: 12 }}>{v}</span>} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
