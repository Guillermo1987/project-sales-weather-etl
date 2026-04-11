import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ZAxis,
} from 'recharts'

const COLORS = { 'Furniture': '#60a5fa', 'Office Supplies': '#34d399', 'Technology': '#f472b6' }

const fmt = (v) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

export default function TempSalesScatter({ data }) {
  if (!data) return null

  const categories = [...new Set(data.map((d) => d.category))]

  return (
    <div className="card">
      <h2>Temperature vs Sales</h2>
      <p className="card-desc">Correlation between daily temperature (°C) and order value — city-matched orders</p>
      <ResponsiveContainer width="100%" height={280}>
        <ScatterChart margin={{ top: 8, right: 24, bottom: 8, left: 16 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis
            dataKey="avg_temp_c"
            type="number"
            name="Temp (°C)"
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            label={{ value: 'Temperature (°C)', position: 'insideBottom', offset: -2, fill: '#475569', fontSize: 11 }}
            height={36}
          />
          <YAxis
            dataKey="sales"
            type="number"
            name="Sales"
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            tick={{ fill: '#94a3b8', fontSize: 11 }}
          />
          <ZAxis range={[20, 20]} />
          <Tooltip
            cursor={{ strokeDasharray: '3 3', stroke: '#475569' }}
            formatter={(v, name) => [name === 'Sales' ? fmt(v) : `${v}°C`, name]}
            contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8 }}
            labelStyle={{ color: '#cbd5e1' }}
          />
          {categories.map((cat) => (
            <Scatter
              key={cat}
              name={cat}
              data={data.filter((d) => d.category === cat)}
              fill={COLORS[cat] || '#94a3b8'}
              opacity={0.7}
            />
          ))}
        </ScatterChart>
      </ResponsiveContainer>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
        {categories.map((cat) => (
          <div key={cat} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: COLORS[cat] || '#94a3b8' }} />
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{cat}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
