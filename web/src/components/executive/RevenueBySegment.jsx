import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts'

const fmt = (v) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

const COLORS = { SMB: '#60a5fa', 'Mid-Market': '#34d399', Enterprise: '#f472b6' }
const SEGMENTS = ['SMB', 'Mid-Market', 'Enterprise']

export default function RevenueBySegment({ data }) {
  if (!data) return null

  // pivot: month → { SMB, Mid-Market, Enterprise }
  const byMonth = {}
  data.forEach(({ month, segment, revenue }) => {
    if (!byMonth[month]) byMonth[month] = { month }
    byMonth[month][segment] = revenue
  })
  const rows = Object.values(byMonth).sort((a, b) => a.month.localeCompare(b.month))
  const display = rows.filter((_, i) => i % 3 === 0 || i === rows.length - 1)

  return (
    <div className="card">
      <h2>Revenue by Segment</h2>
      <p className="card-desc">SMB · Mid-Market · Enterprise — stacked monthly</p>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={display} margin={{ top: 8, right: 16, bottom: 8, left: 16 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 10 }} angle={-30} textAnchor="end" height={38} />
          <YAxis tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} tick={{ fill: '#94a3b8', fontSize: 11 }} />
          <Tooltip
            formatter={(v, name) => [fmt(v), name]}
            contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8 }}
            labelStyle={{ color: '#cbd5e1' }}
          />
          <Legend formatter={(v) => <span style={{ color: '#94a3b8', fontSize: 12 }}>{v}</span>} />
          {SEGMENTS.map(seg => (
            <Bar key={seg} dataKey={seg} stackId="a" fill={COLORS[seg]} radius={seg === 'Enterprise' ? [4,4,0,0] : [0,0,0,0]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
