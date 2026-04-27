import { Link } from 'react-router-dom'
import { projects } from '../data/projects'

export default function PortfolioIndexPage() {
  const getStackColor = (tech) => {
    if (tech.includes('Python') || tech.includes('SQL') || tech.includes('Pandas') || tech.includes('NumPy')) return '#3b82f6'
    if (tech.includes('React') || tech.includes('HTML5') || tech.includes('CSS3') || tech.includes('JavaScript')) return '#f97316'
    if (tech.includes('Power BI') || tech.includes('Tableau') || tech.includes('Recharts') || tech.includes('Canvas')) return '#10b981'
    if (tech.includes('ISC2') || tech.includes('Security') || tech.includes('Cybersecurity')) return '#ef4444'
    if (tech.includes('Firebase') || tech.includes('Cloud')) return '#fbbf24'
    return '#64748b'
  }

  return (
    <div className="portfolio-index-page">
      <div className="portfolio-index-hero">
        <h1 className="portfolio-index-title">Portafolio de Proyectos</h1>
        <p className="portfolio-index-desc">
          7 proyectos de Data & BI que demuestran expertise en pipeline ETL, ML, revenue management y seguridad defensiva.
        </p>
      </div>

      <div className="portfolio-index-grid">
        {projects.map(project => (
          <Link
            key={project.id}
            to={`/portfolio/${project.id}`}
            className="portfolio-index-card"
            style={{ '--card-accent': project.accentColor }}
          >
            <div className="portfolio-index-card-header">
              <div className="portfolio-index-card-icon">{project.icon}</div>
              <h3 className="portfolio-index-card-title">{project.title}</h3>
            </div>

            <p className="portfolio-index-card-category">{project.category}</p>

            <div className="portfolio-index-card-metrics">
              <div className="portfolio-index-metric">
                <span className="portfolio-index-metric-label">{project.metrics[0].label}</span>
                <span className="portfolio-index-metric-value">{project.metrics[0].value}</span>
              </div>
              <div className="portfolio-index-metric">
                <span className="portfolio-index-metric-label">{project.metrics[1].label}</span>
                <span className="portfolio-index-metric-value">{project.metrics[1].value}</span>
              </div>
            </div>

            <div className="portfolio-index-card-techs">
              {project.stack.slice(0, 3).map((tech, idx) => (
                <span
                  key={idx}
                  className="portfolio-index-card-tech"
                  style={{ '--tech-color': getStackColor(tech) }}
                >
                  {tech}
                </span>
              ))}
              {project.stack.length > 3 && (
                <span className="portfolio-index-card-tech-more">+{project.stack.length - 3}</span>
              )}
            </div>

            <div className="portfolio-index-card-footer">
              <span className="portfolio-index-card-link">Ver Portfolio →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
