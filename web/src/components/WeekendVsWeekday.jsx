import {
  RadialBarChart, RadialBar, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'

const fmt = (v) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

export default function WeekendVsWeekday({ data }) {
  if (!data) return null

  const enriched = data.map((d, i) => ({
    ...d,
    fill: i === 0 ? '#34d399' : '#60a5fa',
  }))

  return (
    <div className="card">
      <h2>Weekend vs Weekday</h2>
      <p className="card-desc">Average order value and volume by day type</p>

      <ResponsiveContainer width="100%" height={200}>
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="30%"
          outerRadius="90%"
          data={enriched}
          startAngle={180}
          endAngle={0}
        >
          <RadialBar dataKey="avg_sales" background={{ fill: '#1e293b' }} cornerRadius={4} />
          <Tooltip
            formatter={(v) => [fmt(v), 'Avg Order Value']}
            contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8 }}
            labelStyle={{ color: '#cbd5e1' }}
          />
          <Legend
            formatter={(value) => <span style={{ color: '#94a3b8', fontSize: 12 }}>{value}</span>}
          />
        </RadialBarChart>
      </ResponsiveContainer>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
        {enriched.map((d) => (
          <div key={d.day_type} style={{ flex: 1, background: '#0f172a', borderRadius: 8, padding: '0.75rem' }}>
            <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: 4 }}>{d.day_type}</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 600, color: d.fill }}>{fmt(d.avg_sales)}</div>
            <div style={{ fontSize: '0.75rem', color: '#475569' }}>{d.num_orders} orders</div>
          </div>
        ))}
      </div>
    </div>
  )
}
