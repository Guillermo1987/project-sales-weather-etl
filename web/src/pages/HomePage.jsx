import { Link } from 'react-router-dom'

const SKILLS = [
  {
    cat: 'Lenguajes & Datos',
    color: '#60a5fa',
    items: ['Python', 'SQL', 'Pandas', 'NumPy', 'Scikit-learn', 'HTML / CSS / JS'],
  },
  {
    cat: 'Business Intelligence',
    color: '#34d399',
    items: ['Power BI', 'Tableau', 'Excel Avanzado', 'Dashboards Ejecutivos', 'KPIs & OKRs'],
  },
  {
    cat: 'Data Engineering',
    color: '#60a5fa',
    items: ['Pipelines ETL', 'Data Modeling', 'JSON APIs', 'Node.js', 'Git / GitHub'],
  },
  {
    cat: 'Revenue & Growth Analytics',
    color: '#fbbf24',
    items: ['ARR / MRR', 'CAC & LTV', 'NRR & Churn', 'RevPAR / ADR', 'Pipeline & Funnel'],
  },
  {
    cat: 'Web & Cloud',
    color: '#34d399',
    items: ['React', 'Vite', 'Firebase', 'Google Cloud', 'REST APIs'],
  },
  {
    cat: 'IA & Automatización',
    color: '#f472b6',
    items: ['Claude (Anthropic)', 'n8n', 'Paperclip', 'Agentes IA', 'Apify'],
  },
  {
    cat: 'Ciberseguridad',
    color: '#a78bfa',
    items: ['ISC2 CC Certified', 'SIEM', 'OWASP Top 10', 'Gestión de Vulnerabilidades'],
  },
]

const PROJECTS = [
  {
    to: '/etl',
    icon: '⚙️',
    color: '#60a5fa',
    title: 'Sales & Weather ETL',
    category: 'Data Engineering',
    desc: 'Pipeline ETL que integra 9.800 transacciones de ventas con datos climáticos de ciudades US. Feature engineering y visualización en producción.',
    techs: ['Python', 'Pandas', 'React', 'Firebase'],
  },
  {
    to: '/executive',
    icon: '📊',
    color: '#34d399',
    title: 'Executive Dashboard 360°',
    category: 'BI & RevOps',
    desc: '24 KPIs ejecutivos en 36 meses: ARR, CAC, LTV, NRR, pipeline de ventas y funnel de marketing para liderazgo financiero.',
    techs: ['Python', 'Pandas', 'React', 'Recharts'],
  },
  {
    to: '/churn',
    icon: '🔬',
    color: '#a78bfa',
    title: 'Predictive Churn Analysis',
    category: 'Data Science',
    desc: 'Modelo de Regresión Logística con 81.4% accuracy y AUC 0.881. Identifica los drivers clave de abandono de clientes.',
    techs: ['Scikit-learn', 'Python', 'Pandas', 'React'],
  },
  {
    to: '/hotel',
    icon: '🏨',
    color: '#fb923c',
    title: 'Hotel Pricing Engine',
    category: 'Revenue Management',
    desc: 'Motor algorítmico de Revenue Management: optimiza ADR y RevPAR usando estacionalidad, eventos locales y presión de ocupación.',
    techs: ['Python', 'NumPy', 'React', 'Recharts'],
  },
  {
    to: '/ia-digox',
    icon: '🤖',
    color: '#f472b6',
    title: 'IA Digox Services',
    category: 'AI Automation',
    desc: 'Empresa de consultoría IA autónoma: 5 agentes Claude especializados, 4 workflows n8n y orquestación con Paperclip.',
    techs: ['Claude', 'n8n', 'Paperclip', 'Firebase'],
  },
]

const EDU = [
  { icon: '🎓', title: 'MBA', sub: 'Master in Business Administration' },
  { icon: '📊', title: 'Graduate Certificate in Business Analytics', sub: 'Data-driven decision making' },
  { icon: '🔐', title: 'ISC2 Certified in Cybersecurity (CC)', sub: 'SIEM · OWASP · Gestión de vulnerabilidades' },
]

export default function HomePage() {
  return (
    <div className="home-page">

      {/* ── Hero ── */}
      <section className="home-hero">
        <div className="home-avatar">GU</div>
        <div className="home-hero-body">
          <div className="home-hero-top">
            <span className="home-hero-badge">Disponible para nuevas oportunidades</span>
          </div>
          <h1 className="home-name">Guillermo Ubeda Garay</h1>
          <p className="home-hero-role">Data &amp; BI Analyst · Revenue Operations · AI Automation</p>
          <p className="home-hero-tagline">
            +10 años convirtiendo datos complejos en estrategias de negocio accionables.
            Especialista en Revenue Analytics, pipelines ETL, dashboards ejecutivos y automatización con IA.
            Trabajo 100% remoto con equipos en EMEA y Américas.
          </p>
          <div className="home-ctas">
            <a
              href="https://linkedin.com/in/guillermo-ubeda-garay"
              target="_blank" rel="noreferrer"
              className="home-cta-primary"
            >
              LinkedIn →
            </a>
            <a
              href="https://github.com/Guillermo1987"
              target="_blank" rel="noreferrer"
              className="home-cta-secondary"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* ── Stats rápidas ── */}
      <section className="home-stats-row">
        {[
          { num: '+10',   lbl: 'Años de experiencia' },
          { num: '5',     lbl: 'Proyectos en portafolio' },
          { num: '100%',  lbl: 'Trabajo remoto' },
          { num: 'MBA',   lbl: '+ Business Analytics' },
          { num: 'ISC2',  lbl: 'CC Certified' },
        ].map(({ num, lbl }) => (
          <div key={lbl} className="home-stat-box">
            <span className="home-stat-num">{num}</span>
            <span className="home-stat-lbl">{lbl}</span>
          </div>
        ))}
      </section>

      {/* ── Proyectos ── */}
      <section className="home-section">
        <h2 className="home-section-title">Proyectos de portafolio</h2>
        <p className="home-section-desc">
          Cinco proyectos end-to-end desplegados en producción, cada uno demostrando
          una especialidad diferente con datos reales o sintéticos y dashboards interactivos.
        </p>
        <div className="home-projects-grid">
          {PROJECTS.map(({ to, icon, color, title, category, desc, techs }) => (
            <Link key={to} to={to} className="home-project-card" style={{ '--card-color': color }}>
              <div className="home-project-top">
                <span className="home-project-icon">{icon}</span>
                <span
                  className="home-project-badge"
                  style={{ color, background: color + '18', border: `1px solid ${color}40` }}
                >
                  {category}
                </span>
              </div>
              <h3 className="home-project-title">{title}</h3>
              <p className="home-project-desc">{desc}</p>
              <div className="home-project-footer">
                <div className="home-project-techs">
                  {techs.map(t => <span key={t} className="home-project-tech">{t}</span>)}
                </div>
                <span className="home-project-link">Ver →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Skills ── */}
      <section className="home-section">
        <h2 className="home-section-title">Stack técnico</h2>
        <div className="home-skills-grid">
          {SKILLS.map(({ cat, color, items }) => (
            <div key={cat} className="home-skill-group">
              <h3 className="home-skill-cat" style={{ color }}>{cat}</h3>
              <div className="home-skill-pills">
                {items.map(s => (
                  <span key={s} className="home-skill-pill" style={{ borderColor: color + '30' }}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Sobre mí + Educación ── */}
      <section className="home-section home-about-grid">
        <div className="home-about-col">
          <h2 className="home-section-title">Sobre mí</h2>
          <p className="home-about-p">
            Soy un profesional de datos con más de 10 años combinando análisis cuantitativo
            con visión estratégica de negocio. Mi background en <strong>Revenue Operations</strong> y{' '}
            <strong>Sales Operations</strong> me permite no solo construir modelos, sino traducirlos
            en decisiones accionables para equipos directivos.
          </p>
          <p className="home-about-p">
            Manejo el ciclo completo del dato: desde pipelines ETL hasta dashboards ejecutivos y
            modelos predictivos de churn, LTV y CAC. Actualmente también construyo{' '}
            <Link to="/ia-digox" className="home-inline-link">IA Digox Services</Link>,
            una empresa de consultoría de IA que opera de forma autónoma usando agentes Claude,
            n8n y Paperclip.
          </p>
          <div className="home-avail-box">
            <p className="home-avail-title">Disponibilidad</p>
            {[
              '✓  Trabajo 100% remoto (4+ años de experiencia)',
              '✓  Equipos en EMEA y Américas',
              '✓  Tiempo completo o consultoría',
              '✓  Inglés profesional (documentación y reuniones)',
            ].map(t => <p key={t} className="home-avail-item">{t}</p>)}
          </div>
        </div>

        <div className="home-about-col">
          <h2 className="home-section-title">Formación &amp; Certificaciones</h2>
          {EDU.map(({ icon, title, sub }) => (
            <div key={title} className="home-edu-item">
              <span className="home-edu-icon">{icon}</span>
              <div>
                <p className="home-edu-title">{title}</p>
                <p className="home-edu-sub">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer>
        <p>
          <a href="https://linkedin.com/in/guillermo-ubeda-garay" target="_blank" rel="noreferrer">
            linkedin.com/in/guillermo-ubeda-garay
          </a>
          {' '}&middot;{' '}
          <a href="https://github.com/Guillermo1987" target="_blank" rel="noreferrer">
            github.com/Guillermo1987
          </a>
          {' '}&middot;{' '}
          <a href="https://proyectos-personales.web.app" target="_blank" rel="noreferrer">
            proyectos-personales.web.app
          </a>
        </p>
      </footer>

    </div>
  )
}
