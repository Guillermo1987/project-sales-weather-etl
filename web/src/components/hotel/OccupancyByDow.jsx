import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from 'recharts'

const COLORS = {
  Monday:    '#475569',
  Tuesday:   '#475569',
  Wednesday: '#475569',
  Thursday:  '#60a5fa',
  Friday:    '#34d399',
  Saturday:  '#fbbf24',
  Sunday:    '#f472b6',
}

const SHORT = { Monday:'Mon', Tuesday:'Tue', Wednesday:'Wed', Thursday:'Thu', Friday:'Fri', Saturday:'Sat', Sunday:'Sun' }

export default function OccupancyByDow({ data }) {
  if (!data) return null
  return (
    <div className="card">
      <h2>Occupancy by Day of Week</h2>
      <p className="card-desc">Average occupancy rate — weekend premium clearly visible</p>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} margin={{ top: 8, right: 16, bottom: 4, left: 0 }} barCategoryGap="30%">
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          <XAxis
            dataKey="day_of_week"
            tickFormatter={(v) => SHORT[v] ?? v}
            tick={{ fill: '#94a3b8', fontSize: 11 }}
          />
          <YAxis
            tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            domain={[0.4, 1]}
          />
          <Tooltip
            formatter={(v) => [`${(v * 100).toFixed(1)}%`, 'Avg Occupancy']}
            contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8 }}
            labelStyle={{ color: '#cbd5e1' }}
          />
          <Bar dataKey="avg_occupancy" radius={[4, 4, 0, 0]}>
            {data.map((entry) => (
              <Cell key={entry.day_of_week} fill={COLORS[entry.day_of_week] ?? '#60a5fa'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
