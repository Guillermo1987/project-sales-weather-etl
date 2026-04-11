import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell, LabelList,
} from 'recharts'

const COLORS = ['#60a5fa', '#34d399', '#fbbf24', '#f472b6', '#a78bfa', '#fb923c']

export default function PricingFactors({ data }) {
  if (!data) return null

  return (
    <div className="card">
      <h2>Pricing Factor Contributions</h2>
      <p className="card-desc">Average value of each factor applied to the base price</p>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 4, right: 60, bottom: 4, left: 130 }}
          barCategoryGap="28%"
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
          <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 11 }} domain={[0, 'auto']} />
          <YAxis
            type="category"
            dataKey="factor"
            width={125}
            tick={{ fill: '#94a3b8', fontSize: 11 }}
          />
          <Tooltip
            formatter={(v, name, props) => {
              const isBase = props.payload.factor === 'Base Price'
              return [isBase ? `$${v}` : `×${v.toFixed(3)}`, props.payload.description]
            }}
            contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8 }}
            labelStyle={{ color: '#cbd5e1' }}
          />
          <Bar dataKey="avg_value" radius={[0, 4, 4, 0]}>
            {data.map((entry, i) => (
              <Cell key={entry.factor} fill={COLORS[i % COLORS.length]} />
            ))}
            <LabelList
              dataKey="avg_value"
              position="right"
              formatter={(v) => (v >= 10 ? `$${v}` : `×${v.toFixed(2)}`)}
              style={{ fill: '#94a3b8', fontSize: 11 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
