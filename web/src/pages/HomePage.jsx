import { Link } from 'react-router-dom'
import { useLang } from '../contexts/LangContext'
import PortfolioFooter from '../components/PortfolioFooter'

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
  { org:'Indiana Tech', title:'MBA', sub:{ es:'Master in Business Administration', en:'Master in Business Administration' } },
  { org:'Indiana Tech', title:'Graduate Certificate in Business Analytics', sub:{ es:'Análisis de datos orientado a decisiones de negocio', en:'Data-driven business decision making' } },
]

/* ── Certifications ────────────────────────────────────────────────────────── */
const CERTS = [
  { org:'ISC2',                             color:'#a78bfa', name:'Certified in Cybersecurity (CC)',              date:'Sep 2024',  id:'f83ec23e' },
  { org:'IBM',                              color:'#60a5fa', name:'Full Stack Software Developer',                date:'Aug 2024',  id:'c845625d' },
  { org:'IBM',                              color:'#60a5fa', name:'DevOps and Software Engineering',              date:null,        id:'7Z2FU9C6' },
  { org:'Palo Alto Networks',               color:'#fb923c', name:'Palo Alto Networks Cybersecurity',             date:'Aug 2024',  id:'B8GMFKRW' },
  { org:'Google',                           color:'#34d399', name:'Google Cybersecurity',                         date:'Aug 2024',  id:'M0JCAKMI' },
  { org:'Google',                           color:'#34d399', name:'Google IT Support',                            date:'Sep 2024',  id:'XYFRQ9AI' },
  { org:'ESSEC Business School',            color:'#fbbf24', name:'Hotel Management: Revenue & Demand Management',date:'Aug 2025',  id:'TDEGVC60' },
  { org:'Univ. of Illinois',                color:'#f472b6', name:'Digital Marketing',                            date:'Sep 2020',  id:'CQ2UHRF2' },
]

/* ── Org Logo SVGs ─────────────────────────────────────────────────────────── */
function OrgLogo({ org }) {
  const ff = "system-ui,-apple-system,'Segoe UI',sans-serif"
  if (org === 'Google') return (
    <svg viewBox="0 0 24 24" width="26" height="26" aria-label="Google">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
  if (org === 'IBM') return (
    <svg viewBox="0 0 50 21" width="46" height="20" aria-label="IBM">
      {/* IBM classic 8-stripe logo — I, B, M in #1F70C1 */}
      {/* Stripe Y positions: 0, 2.7, 5.4, 8.1, 10.8, 13.5, 16.2, 18.9 */}
      {/* --- I (x:0, w:7) --- */}
      {[0,2.7,5.4,8.1,10.8,13.5,16.2,18.9].map((y,i)=><rect key={`i${i}`} x="0"  y={y} width="7"  height="1.5" fill="#1F70C1"/>)}
      {/* --- B full rows 0,1,3,4,6,7 (x:9, w:16); short rows 2,5 (w:12) --- */}
      {[0,2.7,8.1,10.8,16.2,18.9].map((y,i)=><rect key={`bf${i}`} x="9"  y={y} width="16" height="1.5" fill="#1F70C1"/>)}
      {[5.4,13.5].map((y,i)=>                 <rect key={`bs${i}`} x="9"  y={y} width="12" height="1.5" fill="#1F70C1"/>)}
      {/* --- M left leg (x:27, w:6) all rows --- */}
      {[0,2.7,5.4,8.1,10.8,13.5,16.2,18.9].map((y,i)=><rect key={`ml${i}`} x="27" y={y} width="6"  height="1.5" fill="#1F70C1"/>)}
      {/* --- M top connector (x:33, w:11) rows 0,1 only --- */}
      {[0,2.7].map((y,i)=>                             <rect key={`mc${i}`} x="33" y={y} width="11" height="1.5" fill="#1F70C1"/>)}
      {/* --- M right leg (x:44, w:6) all rows --- */}
      {[0,2.7,5.4,8.1,10.8,13.5,16.2,18.9].map((y,i)=><rect key={`mr${i}`} x="44" y={y} width="6"  height="1.5" fill="#1F70C1"/>)}
    </svg>
  )
  if (org === 'ISC2') return (
    <svg viewBox="0 0 32 36" width="26" height="30" aria-label="ISC2">
      <path d="M16 1L3 7v12c0 7.5 5.5 14.5 13 16 7.5-1.5 13-8.5 13-16V7L16 1z" fill="#6d28d9"/>
      <text x="16" y="22.5" textAnchor="middle" fill="white" fontSize="9.5" fontWeight="800" fontFamily={ff}>ISC²</text>
    </svg>
  )
  if (org === 'Palo Alto Networks') return (
    <svg viewBox="0 0 32 32" width="28" height="28" aria-label="Palo Alto Networks">
      <circle cx="16" cy="16" r="15" fill="#FF6720"/>
      <text x="16" y="20" textAnchor="middle" fill="white" fontSize="10" fontWeight="800" fontFamily={ff}>PAN</text>
    </svg>
  )
  if (org === 'ESSEC Business School') return (
    <svg viewBox="0 0 32 32" width="28" height="28" aria-label="ESSEC Business School">
      <rect width="32" height="32" rx="6" fill="#002855"/>
      <text x="16" y="15" textAnchor="middle" fill="#C9A84C" fontSize="9" fontWeight="800" fontFamily={ff}>ESSEC</text>
      <text x="16" y="26" textAnchor="middle" fill="white" fontSize="6" fontFamily={ff}>Business School</text>
    </svg>
  )
  if (org === 'Univ. of Illinois') return (
    <svg viewBox="0 0 32 32" width="28" height="28" aria-label="University of Illinois">
      <rect width="32" height="32" rx="6" fill="#13294B"/>
      <text x="16" y="22" textAnchor="middle" fill="#E84A27" fontSize="22" fontWeight="900" fontFamily={ff}>I</text>
    </svg>
  )
  if (org === 'Indiana Tech') return (
    <svg viewBox="0 0 32 32" width="30" height="30" aria-label="Indiana Institute of Technology">
      {/* LinkedIn logo: dark crimson bg, INDIANA white thin, TECH orange bold */}
      <rect width="32" height="32" rx="5" fill="#111111"/>
      <text x="16" y="14" textAnchor="middle" fontFamily={ff} fontSize="6.5" fontWeight="300" fill="#ffffff" letterSpacing="0.6">INDIANA</text>
      <text x="16" y="24" textAnchor="middle" fontFamily={ff} fontSize="9"   fontWeight="800" fill="#F07820">TECH</text>
    </svg>
  )
  return <span style={{ fontSize: '1.1rem' }}>{org[0]}</span>
}

/* ── Component ──────────────────────────────────────────────────────────────── */
export default function HomePage() {
  const { lang } = useLang()
  const t = T[lang]

  return (
    <div className="home-page">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="home-hero">
        <div className="home-avatar">GU</div>
        <div className="home-hero-body">
          <div className="home-hero-top">
            <span className="home-hero-badge">{t.badge}</span>
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
          {EDU.map(({ org, title, sub }) => (
            <div key={title} className="home-edu-item">
              <span className="home-edu-icon"><OrgLogo org={org} /></span>
              <div>
                <p className="home-edu-title">{title}</p>
                <p className="home-edu-sub">{sub[lang]}</p>
              </div>
            </div>
          ))}

          <h2 className="home-section-title" style={{ marginTop: '1.75rem' }}>{t.certTitle}</h2>
          <div className="home-certs-grid">
            {CERTS.map(({ org, color, name, date, id }) => (
              <div key={id} className="home-cert-card">
                <div className="home-cert-header">
                  <span className="home-cert-icon"><OrgLogo org={org} /></span>
                  <span className="home-cert-org" style={{ color }}>{org}</span>
                </div>
                <p className="home-cert-name">{name}</p>
                {date && <p className="home-cert-date">{date}</p>}
              </div>
            ))}
          </div>
        </div>

      </section>

      <PortfolioFooter />
    </div>
  )
}
