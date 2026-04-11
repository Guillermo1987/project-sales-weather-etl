export default function HeroSection({ badge, badgeColor, title, description, stats, techs, githubUrl }) {
  return (
    <div className="hero">
      <div className="hero-top">
        <span className="hero-badge" style={{ '--badge-color': badgeColor }}>
          {badge}
        </span>
        {githubUrl && (
          <a href={githubUrl} target="_blank" rel="noreferrer" className="hero-github">
            GitHub →
          </a>
        )}
      </div>

      <h1 className="hero-title">{title}</h1>
      <p className="hero-desc">{description}</p>

      {stats && (
        <div className="hero-stats">
          {stats.map(({ label, value }) => (
            <div key={label} className="hero-stat">
              <span className="hero-stat-value">{value}</span>
              <span className="hero-stat-label">{label}</span>
            </div>
          ))}
        </div>
      )}

      {techs && (
        <div className="hero-techs">
          {techs.map(t => (
            <span key={t} className="hero-tech">{t}</span>
          ))}
        </div>
      )}
    </div>
  )
}
