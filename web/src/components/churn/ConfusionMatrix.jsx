export default function ConfusionMatrix({ data }) {
  if (!data) return null
  const { tn, fp, fn, tp } = data
  const total    = tn + fp + fn + tp
  const accuracy = ((tn + tp) / total * 100).toFixed(1)

  const cells = [
    { label: 'True Negative',  value: tn, sub: 'Correctly predicted No Churn', color: '#1e3a5f', text: '#60a5fa' },
    { label: 'False Positive', value: fp, sub: 'Predicted Churn — actually not', color: '#2d1b1b', text: '#f87171' },
    { label: 'False Negative', value: fn, sub: 'Missed churners',               color: '#2d1b1b', text: '#f87171' },
    { label: 'True Positive',  value: tp, sub: 'Correctly predicted Churn',     color: '#1a3a2a', text: '#34d399' },
  ]

  return (
    <div className="card">
      <h2>Confusion Matrix</h2>
      <p className="card-desc">Model predictions vs actual outcomes on test set — {total} samples · {accuracy}% accuracy</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '0.5rem' }}>
        {cells.map(({ label, value, sub, color, text }) => (
          <div key={label} style={{
            background: color, border: `1px solid ${text}33`,
            borderRadius: 10, padding: '1.25rem', textAlign: 'center',
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: text }}>{value}</div>
            <div style={{ fontSize: '0.82rem', fontWeight: 600, color: text, marginTop: 4 }}>{label}</div>
            <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: 2 }}>{sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '1rem' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.7rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em' }}>← Predicted</div>
        </div>
      </div>
    </div>
  )
}
