import { useParams } from 'react-router-dom'
import { projectById } from '../data/projects'

export default function PortfolioProjectPage() {
  const { projectId } = useParams()
  const project = projectById(projectId)

  if (!project) {
    return (
      <div className="portfolio-error">
        <h1>Proyecto no encontrado</h1>
        <p>Lo sentimos, no pudimos encontrar el proyecto "{projectId}".</p>
      </div>
    )
  }

  const getStackColor = (tech) => {
    if (tech.includes('Python') || tech.includes('SQL') || tech.includes('Pandas') || tech.includes('NumPy')) return '#3b82f6'
    if (tech.includes('React') || tech.includes('HTML5') || tech.includes('CSS3') || tech.includes('JavaScript')) return '#f97316'
    if (tech.includes('Power BI') || tech.includes('Tableau') || tech.includes('Recharts') || tech.includes('Canvas')) return '#10b981'
    if (tech.includes('ISC2') || tech.includes('Security') || tech.includes('Cybersecurity')) return '#ef4444'
    if (tech.includes('Firebase') || tech.includes('Cloud')) return '#fbbf24'
    return '#64748b'
  }

  return (
    <div className="portfolio-page">
      <div className="portfolio-hero">
        <div className="portfolio-hero-top">
          <span className="portfolio-status-badge">Portfolio</span>
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="portfolio-demo-link">
              Ver Demo Live
            </a>
          )}
        </div>

        <div className="portfolio-hero-main">
          <h1 className="portfolio-title">{project.title}</h1>
          <p className="portfolio-category">{project.category}</p>
          <p className="portfolio-description">{project.description}</p>

          <div className="portfolio-metrics-grid">
            {project.metrics.map((metric, idx) => (
              <div key={idx} className="portfolio-metric-card">
                <div className="portfolio-metric-value">{metric.value}</div>
                <div className="portfolio-metric-label">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="portfolio-content">
        <div className="portfolio-2col">
          <div className="portfolio-left">
            <section className="portfolio-section">
              <h2>Problema</h2>
              <p>{project.problem}</p>
            </section>

            <section className="portfolio-section">
              <h2>Solución</h2>
              <p>{project.solution}</p>
            </section>

            <section className="portfolio-section">
              <h2>Hallazgos Clave</h2>
              <ul className="portfolio-findings-list">
                {project.keyFindings.map((finding, idx) => (
                  <li key={idx}>{finding}</li>
                ))}
              </ul>
            </section>

            <section className="portfolio-section">
              <h2>Stack Técnico</h2>
              <div className="portfolio-tech-pills">
                {project.stack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="portfolio-tech-pill"
                    style={{ '--tech-color': getStackColor(tech) }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            <div className="portfolio-cta-bar">
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="portfolio-cta github">
                → Ver en GitHub
              </a>
              <button className="portfolio-cta export" onClick={() => window.print()}>
                ⬇ Exportar PDF
              </button>
            </div>
          </div>

          <div className="portfolio-right">
            {project.screenshotPath ? (
              <div className="portfolio-screenshot">
                <img src={project.screenshotPath} alt={project.title} />
              </div>
            ) : (
              <div className="portfolio-screenshot-placeholder" style={{ '--accent': project.accentColor }}>
                <div className="portfolio-placeholder-icon">{project.icon}</div>
                <p>{project.title}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="portfolio-footer">
        <p>Mindset & Code · Data & BI Analyst · MBA · ISC2 CC · proyectos-personales.web.app</p>
      </footer>
    </div>
  )
}
