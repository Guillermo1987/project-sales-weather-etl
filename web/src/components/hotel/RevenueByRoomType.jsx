import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from 'recharts'

const COLORS = ['#60a5fa', '#34d399', '#fbbf24']
const fmt = (v) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

export default function RevenueByRoomType({ data }) {
  if (!data) return null
  const total = data.reduce((s, r) => s + r.total_revenue, 0)

  return (
    <div className="card">
      <h2>Revenue by Room Type</h2>
      <p className="card-desc">Last 12 months — revenue contribution per room category</p>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            dataKey="total_revenue"
            nameKey="room_type"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={3}
          >
            {data.map((entry, i) => (
              <Cell key={entry.room_type} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(v) => [fmt(v), 'Revenue']}
            contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8 }}
          />
          <Legend
            formatter={(v) => <span style={{ color: '#94a3b8', fontSize: 12 }}>{v}</span>}
          />
        </PieChart>
      </ResponsiveContainer>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.5rem' }}>
        {data.map((r, i) => (
          <div key={r.room_type} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
            <span style={{ color: COLORS[i], fontWeight: 600 }}>{r.room_type}</span>
            <span style={{ color: '#94a3b8' }}>
              {fmt(r.total_revenue)} · ADR {fmt(r.avg_adr)} · {(r.avg_occupancy * 100).toFixed(1)}% occ
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
