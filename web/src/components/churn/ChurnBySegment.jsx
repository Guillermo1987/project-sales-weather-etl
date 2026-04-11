import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts'

const fmtPct = (v) => `${(v * 100).toFixed(1)}%`

const SUB_COLORS   = { Basic: '#60a5fa', Standard: '#fbbf24', Premium: '#34d399' }
const CONT_COLORS  = { Monthly: '#f87171', Annual: '#fbbf24', '2-Year': '#34d399' }

function SegmentBar({ data, colorMap, title, desc }) {
  if (!data) return null
  return (
    <div className="card">
      <h2>{title}</h2>
      <p className="card-desc">{desc}</p>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} margin={{ top: 16, right: 24, bottom: 8, left: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="segment" tick={{ fill: '#94a3b8', fontSize: 12 }} />
          <YAxis tickFormatter={fmtPct} domain={[0, 0.6]} tick={{ fill: '#94a3b8', fontSize: 11 }} />
          <Tooltip
            formatter={(v, name) => [fmtPct(v), 'Churn Rate']}
            contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8 }}
            labelStyle={{ color: '#cbd5e1' }}
          />
          <Bar dataKey="churn_rate" radius={[6, 6, 0, 0]}>
            <LabelList dataKey="churn_rate" position="top" formatter={fmtPct}
              style={{ fill: '#94a3b8', fontSize: 11 }} />
            {data.map(({ segment }) => (
              <Cell key={segment} fill={colorMap[segment] || '#94a3b8'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function ChurnBySubscription({ data }) {
  return (
    <SegmentBar
      data={data}
      colorMap={SUB_COLORS}
      title="Churn by Plan Type"
      desc="Basic customers churn most — Premium retention is significantly higher"
    />
  )
}

export function ChurnByContract({ data }) {
  const display = data?.map(d => ({ ...d, segment: d.label || d.segment }))
  return (
    <SegmentBar
      data={display}
      colorMap={CONT_COLORS}
      title="Churn by Contract Length"
      desc="Month-to-month contracts show 3–4× higher churn than annual or 2-year"
    />
  )
}
