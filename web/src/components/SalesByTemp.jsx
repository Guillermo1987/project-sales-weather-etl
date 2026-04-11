import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts'

const TEMP_COLORS = {
  'Cold (<10°C)':  '#93c5fd',
  'Mild (10-20°C)': '#34d399',
  'Warm (20-30°C)': '#fbbf24',
  'Hot (>30°C)':   '#f87171',
}

const fmt = (v) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

export default function SalesByTemp({ data }) {
  if (!data) return null

  const ORDER = ['Cold (<10°C)', 'Mild (10-20°C)', 'Warm (20-30°C)', 'Hot (>30°C)']
  const sorted = [...data].sort(
    (a, b) => ORDER.indexOf(a.temp_category) - ORDER.indexOf(b.temp_category)
  )

  return (
    <div className="card">
      <h2>Sales by Temperature</h2>
      <p className="card-desc">Weather impact on total revenue — city-matched orders only</p>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={sorted} margin={{ top: 8, right: 16, bottom: 0, left: 16 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="temp_category" tick={{ fill: '#94a3b8', fontSize: 11 }} />
          <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tick={{ fill: '#94a3b8', fontSize: 11 }} />
          <Tooltip
            formatter={(v, name) => [fmt(v), name === 'total_sales' ? 'Total Revenue' : 'Avg Order']}
            contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8 }}
            labelStyle={{ color: '#cbd5e1' }}
          />
          <Bar dataKey="total_sales" radius={[4, 4, 0, 0]}>
            {sorted.map((entry) => (
              <Cell key={entry.temp_category} fill={TEMP_COLORS[entry.temp_category] || '#94a3b8'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
