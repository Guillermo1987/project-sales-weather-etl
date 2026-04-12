import { useState } from 'react'
import { Link } from 'react-router-dom'

/* ── Translations ──────────────────────────────────────────────────────────── */
const T = {
  es: {
    badge:   'Disponible para nuevas oportunidades',
    role:    'Data & BI Analyst · Revenue Operations · AI Automation',
    tagline: '+10 años convirtiendo datos complejos en estrategias de negocio accionables. Especialista en Revenue Analytics, pipelines ETL, dashboards ejecutivos y automatización con IA. Trabajo 100% remoto con equipos en EMEA y Américas.',
    cta1: 'LinkedIn →', cta2: 'GitHub',
    stats: [
      { num: '+10',  lbl: 'Años de experiencia' },
      { num: '5',    lbl: 'Proyectos portafolio' },
      { num: '100%', lbl: 'Trabajo remoto' },
      { num: 'MBA',  lbl: '+ Business Analytics' },
      { num: 'ISC2', lbl: 'CC Certified' },
    ],
    projectsTitle: 'Proyectos de portafolio',
    projectsDesc:  'Cinco proyectos end-to-end desplegados en producción, cada uno demostrando una especialidad diferente con datos reales o sintéticos y dashboards interactivos.',
    viewBtn:     'Ver →',
    skillsTitle: 'Stack técnico',
    aboutTitle:  'Sobre mí',
    aboutP1: 'Soy un profesional de datos con más de 10 años combinando análisis cuantitativo con visión estratégica de negocio. Mi background en Revenue Operations y Sales Operations me permite no solo construir modelos, sino traducirlos en decisiones accionables para equipos directivos.',
    aboutP2: 'Manejo el ciclo completo del dato: desde pipelines ETL hasta dashboards ejecutivos y modelos predictivos de churn, LTV y CAC. Actualmente también construyo',
    aboutP2b: ', una empresa de consultoría de IA autónoma con agentes Claude, n8n y Paperclip.',
    availTitle: 'Disponibilidad',
    availItems: [
      '✓  Trabajo 100% remoto (4+ años de experiencia)',
      '✓  Disponible para equipos en EMEA y Américas',
      '✓  Tiempo completo o consultoría',
      '✓  Inglés profesional (documentación y reuniones)',
    ],
    eduTitle:  'Formación',
    certTitle: 'Licencias y Certificaciones',
    currentProjectTitle: 'Proyecto en desarrollo',
    iaDigoxDesc: 'Empresa de consultoría IA operada de forma autónoma: 5 agentes Claude especializados gestionan ventas, desarrollo, marketing y operaciones. Orquestación con n8n y Paperclip como sistema nervioso central.',
    iaDigoxBadge: 'AI Automation · En marcha',
    iaDigoxStats: [
      { num: '5',    lbl: 'Agentes IA' },
      { num: '4',    lbl: 'Workflows n8n' },
      { num: '24/7', lbl: 'Operación autónoma' },
    ],
    skillCats: [
      'Lenguajes & Datos',
      'Business Intelligence',
      'Data Engineering',
      'Revenue & Growth Analytics',
      'Web & Cloud',
      'IA & Automatización',
      'Ciberseguridad',
    ],
    projectDescs: [
      'Pipeline ETL que integra 9.800 transacciones de ventas con datos climáticos de ciudades US. Feature engineering y visualización en producción.',
      '24 KPIs ejecutivos en 36 meses: ARR, CAC, LTV, NRR, pipeline de ventas y funnel de marketing para liderazgo financiero.',
      'Modelo de Regresión Logística con 81.4% accuracy y AUC 0.881. Identifica los drivers clave de abandono de clientes.',
      'Motor algorítmico de Revenue Management: optimiza ADR y RevPAR usando estacionalidad, eventos locales y presión de ocupación.',
      'Empresa de consultoría IA autónoma: 5 agentes Claude especializados, 4 workflows n8n y orquestación con Paperclip.',
    ],
  },
  en: {
    badge:   'Open to new opportunities',
    role:    'Data & BI Analyst · Revenue Operations · AI Automation',
    tagline: '+10 years turning complex data into actionable business strategies. Specialized in Revenue Analytics, ETL pipelines, executive dashboards and AI automation. 100% remote work with EMEA and Americas teams.',
    cta1: 'LinkedIn →', cta2: 'GitHub',
    stats: [
      { num: '+10',  lbl: 'Years of experience' },
      { num: '5',    lbl: 'Portfolio projects' },
      { num: '100%', lbl: 'Remote work' },
      { num: 'MBA',  lbl: '+ Business Analytics' },
      { num: 'ISC2', lbl: 'CC Certified' },
    ],
    projectsTitle: 'Portfolio Projects',
    projectsDesc:  'Five end-to-end projects deployed in production, each demonstrating a different speciality with real or synthetic data and interactive dashboards.',
    viewBtn:     'View →',
    skillsTitle: 'Tech Stack',
    aboutTitle:  'About me',
    aboutP1: 'I am a data professional with more than 10 years combining quantitative analysis with strategic business vision. My background in Revenue Operations and Sales Operations allows me not only to build models, but to translate them into actionable decisions for executive teams.',
    aboutP2: 'I manage the full data lifecycle: from ETL pipelines to executive dashboards and predictive models for churn, LTV and CAC. I am also building',
    aboutP2b: ', an autonomous AI consulting company powered by Claude agents, n8n and Paperclip.',
    availTitle: 'Availability',
    availItems: [
      '✓  100% remote work (4+ years experience)',
      '✓  Available for EMEA and Americas teams',
      '✓  Full-time or consulting',
      '✓  Professional English (docs and meetings)',
    ],
    eduTitle:  'Education',
    certTitle: 'Licenses & Certifications',
    currentProjectTitle: 'Current project',
    iaDigoxDesc: 'Autonomous AI consulting company: 5 specialized Claude agents manage sales, development, marketing and operations. Orchestrated with n8n and Paperclip as the central nervous system.',
    iaDigoxBadge: 'AI Automation · In progress',
    iaDigoxStats: [
      { num: '5',    lbl: 'AI Agents' },
      { num: '4',    lbl: 'n8n Workflows' },
      { num: '24/7', lbl: 'Autonomous op.' },
    ],
    skillCats: [
      'Languages & Data',
      'Business Intelligence',
      'Data Engineering',
      'Revenue & Growth Analytics',
      'Web & Cloud',
      'AI & Automation',
      'Cybersecurity',
    ],
    projectDescs: [
      'ETL pipeline integrating 9,800 sales transactions with daily temperature data from US cities. Feature engineering and production-ready visualization.',
      '24 executive KPIs over 36 months: ARR, CAC, LTV, NRR, sales pipeline and marketing funnel for financial leadership.',
      'Logistic Regression model with 81.4% accuracy and AUC 0.881. Identifies key drivers of customer churn.',
      'Algorithmic Revenue Management engine: optimizes ADR and RevPAR using seasonality, local events and occupancy pressure.',
      'Autonomous AI consulting company: 5 specialized Claude agents, 4 n8n workflows and Paperclip orchestration.',
    ],
  },
}

/* ── Skills ────────────────────────────────────────────────────────────────── */
const SKILL_ITEMS  = [
  ['Python', 'SQL', 'Pandas', 'NumPy', 'Scikit-learn', 'HTML / CSS / JS'],
  ['Power BI', 'Tableau', 'Excel Avanzado', 'Dashboards Ejecutivos', 'KPIs & OKRs'],
  ['Pipelines ETL', 'Data Modeling', 'JSON APIs', 'Node.js', 'Git / GitHub'],
  ['ARR / MRR', 'CAC & LTV', 'NRR & Churn', 'RevPAR / ADR', 'Pipeline & Funnel'],
  ['React', 'Vite', 'Firebase', 'Google Cloud', 'REST APIs'],
  ['Claude (Anthropic)', 'n8n', 'Paperclip', 'Agentes IA', 'Apify'],
  ['ISC2 CC', 'SIEM', 'OWASP Top 10', 'Palo Alto Networks', 'Google Cybersecurity'],
]
const SKILL_COLORS = ['#60a5fa','#34d399','#60a5fa','#fbbf24','#34d399','#f472b6','#a78bfa']

/* ── Projects ──────────────────────────────────────────────────────────────── */
const PROJECTS = [
  { to:'/etl',       icon:'⚙️', color:'#60a5fa', title:'Sales & Weather ETL',      category:'Data Engineering',   techs:['Python','Pandas','React','Firebase'] },
  { to:'/executive', icon:'📊', color:'#34d399', title:'Executive Dashboard 360°', category:'BI & RevOps',         techs:['Python','Pandas','React','Recharts'] },
  { to:'/churn',     icon:'🔬', color:'#a78bfa', title:'Predictive Churn Analysis',category:'Data Science',        techs:['Scikit-learn','Python','Pandas','React'] },
  { to:'/hotel',     icon:'🏨', color:'#fb923c', title:'Hotel Pricing Engine',      category:'Revenue Management', techs:['Python','NumPy','React','Recharts'] },
  { to:'/ia-digox',  icon:'🤖', color:'#f472b6', title:'IA Digox Services',         category:'AI Automation',      techs:['Claude','n8n','Paperclip','Firebase'] },
]

/* ── Education ─────────────────────────────────────────────────────────────── */
const EDU = [
  { icon:'🎓', title:'MBA', sub:{ es:'Master in Business Administration', en:'Master in Business Administration' } },
  { icon:'📊', title:'Graduate Certificate in Business Analytics', sub:{ es:'Análisis de datos orientado a decisiones de negocio', en:'Data-driven business decision making' } },
]

/* ── Certifications ────────────────────────────────────────────────────────── */
const CERTS = [
  { org:'ISC2',                             color:'#a78bfa', icon:'🔐', name:'Certified in Cybersecurity (CC)',              date:'Sep 2024',  id:'f83ec23e' },
  { org:'IBM',                              color:'#60a5fa', icon:'💻', name:'Full Stack Software Developer',                date:'Aug 2024',  id:'c845625d' },
  { org:'IBM',                              color:'#60a5fa', icon:'⚙️', name:'DevOps and Software Engineering',              date:null,        id:'7Z2FU9C6' },
  { org:'Palo Alto Networks',               color:'#fb923c', icon:'🛡️', name:'Palo Alto Networks Cybersecurity',             date:'Aug 2024',  id:'B8GMFKRW' },
  { org:'Google',                           color:'#34d399', icon:'🔒', name:'Google Cybersecurity',                         date:'Aug 2024',  id:'M0JCAKMI' },
  { org:'Google',                           color:'#34d399', icon:'🖥️', name:'Google IT Support',                            date:'Sep 2024',  id:'XYFRQ9AI' },
  { org:'ESSEC Business School',            color:'#fbbf24', icon:'🏨', name:'Hotel Management: Revenue & Demand Management',date:'Aug 2025',  id:'TDEGVC60' },
  { org:'Univ. of Illinois Urbana-Champaign',color:'#f472b6', icon:'📣', name:'Digital Marketing',                          date:'Sep 2020',  id:'CQ2UHRF2' },
]

/* ── Component ──────────────────────────────────────────────────────────────── */
export default function HomePage() {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('portfolio_lang') || 'es' } catch { return 'es' }
  })

  function toggleLang() {
    const next = lang === 'es' ? 'en' : 'es'
    setLang(next)
    try { localStorage.setItem('portfolio_lang', next) } catch {}
  }

  const t = T[lang]

  return (
    <div className="home-page">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="home-hero">
        <div className="home-avatar">GU</div>
        <div className="home-hero-body">
          <div className="home-hero-top">
            <span className="home-hero-badge">{t.badge}</span>
            <button className="lang-toggle" onClick={toggleLang}>
              {lang === 'es' ? '🇬🇧 EN' : '🇪🇸 ES'}
            </button>
          </div>
          <h1 className="home-name">Guillermo Ubeda Garay</h1>
          <p className="home-hero-role">{t.role}</p>
          <p className="home-hero-tagline">{t.tagline}</p>
          <div className="home-ctas">
            <a href="https://linkedin.com/in/guillermo-ubeda-garay" target="_blank" rel="noreferrer" className="home-cta-primary">{t.cta1}</a>
            <a href="https://github.com/Guillermo1987" target="_blank" rel="noreferrer" className="home-cta-secondary">{t.cta2}</a>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────────── */}
      <section className="home-stats-row">
        {t.stats.map(({ num, lbl }) => (
          <div key={lbl} className="home-stat-box">
            <span className="home-stat-num">{num}</span>
            <span className="home-stat-lbl">{lbl}</span>
          </div>
        ))}
      </section>

      {/* ── Projects ─────────────────────────────────────────────────────── */}
      <section className="home-section">
        <h2 className="home-section-title">{t.projectsTitle}</h2>
        <p className="home-section-desc">{t.projectsDesc}</p>
        <div className="home-projects-grid">
          {PROJECTS.map(({ to, icon, color, title, category, techs }, i) => (
            <Link key={to} to={to} className="home-project-card" style={{ '--card-color': color }}>
              <div className="home-project-top">
                <span className="home-project-icon">{icon}</span>
                <span className="home-project-badge" style={{ color, background: color+'18', border:`1px solid ${color}40` }}>{category}</span>
              </div>
              <h3 className="home-project-title">{title}</h3>
              <p className="home-project-desc">{t.projectDescs[i]}</p>
              <div className="home-project-footer">
                <div className="home-project-techs">{techs.map(tech => <span key={tech} className="home-project-tech">{tech}</span>)}</div>
                <span className="home-project-link">{t.viewBtn}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Skills ───────────────────────────────────────────────────────── */}
      <section className="home-section">
        <h2 className="home-section-title">{t.skillsTitle}</h2>
        <div className="home-skills-grid">
          {SKILL_ITEMS.map((items, i) => (
            <div key={i} className="home-skill-group">
              <h3 className="home-skill-cat" style={{ color: SKILL_COLORS[i] }}>{t.skillCats[i]}</h3>
              <div className="home-skill-pills">
                {items.map(s => <span key={s} className="home-skill-pill" style={{ borderColor: SKILL_COLORS[i]+'30' }}>{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── About + Education + Certs ────────────────────────────────────── */}
      <section className="home-section home-about-grid">

        {/* About + Availability */}
        <div className="home-about-col">
          <h2 className="home-section-title">{t.aboutTitle}</h2>
          <p className="home-about-p">{t.aboutP1}</p>
          <p className="home-about-p">
            {t.aboutP2}{' '}
            <Link to="/ia-digox" className="home-inline-link">IA Digox Services</Link>
            {t.aboutP2b}
          </p>
          <div className="home-avail-box">
            <p className="home-avail-title">{t.availTitle}</p>
            {t.availItems.map(item => <p key={item} className="home-avail-item">{item}</p>)}
          </div>

          {/* IA Digox project card */}
          <div className="home-iadigox-card">
            <div className="home-iadigox-header">
              <span className="home-iadigox-icon">🤖</span>
              <div>
                <Link to="/ia-digox" className="home-iadigox-link">IA Digox Services</Link>
                <span className="home-iadigox-badge">{t.iaDigoxBadge}</span>
              </div>
            </div>
            <p className="home-iadigox-desc">{t.iaDigoxDesc}</p>
            <div className="home-iadigox-stats">
              {t.iaDigoxStats.map(({ num, lbl }) => (
                <div key={lbl} className="home-iadigox-stat">
                  <span className="home-iadigox-stat-num">{num}</span>
                  <span className="home-iadigox-stat-lbl">{lbl}</span>
                </div>
              ))}
            </div>
            <div className="home-iadigox-techs">
              {['Claude', 'n8n', 'Paperclip', 'Firebase', 'React'].map(tech => (
                <span key={tech} className="home-iadigox-tech">{tech}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Education + Certifications */}
        <div className="home-about-col">
          <h2 className="home-section-title">{t.eduTitle}</h2>
          {EDU.map(({ icon, title, sub }) => (
            <div key={title} className="home-edu-item">
              <span className="home-edu-icon">{icon}</span>
              <div>
                <p className="home-edu-title">{title}</p>
                <p className="home-edu-sub">{sub[lang]}</p>
              </div>
            </div>
          ))}

          <h2 className="home-section-title" style={{ marginTop: '1.75rem' }}>{t.certTitle}</h2>
          <div className="home-certs-grid">
            {CERTS.map(({ org, color, icon, name, date, id }) => (
              <div key={id} className="home-cert-card">
                <div className="home-cert-header">
                  <span className="home-cert-icon">{icon}</span>
                  <span className="home-cert-org" style={{ color }}>{org}</span>
                </div>
                <p className="home-cert-name">{name}</p>
                {date && <p className="home-cert-date">{date}</p>}
              </div>
            ))}
          </div>
        </div>

      </section>

      <footer>
        <p>
          <a href="https://linkedin.com/in/guillermo-ubeda-garay" target="_blank" rel="noreferrer">linkedin.com/in/guillermo-ubeda-garay</a>
          {' '}&middot;{' '}
          <a href="https://github.com/Guillermo1987" target="_blank" rel="noreferrer">github.com/Guillermo1987</a>
          {' '}&middot;{' '}
          <a href="https://proyectos-personales.web.app" target="_blank" rel="noreferrer">proyectos-personales.web.app</a>
        </p>
      </footer>
    </div>
  )
}
