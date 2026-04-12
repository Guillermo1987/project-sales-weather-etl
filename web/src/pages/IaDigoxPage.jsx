import { Link } from 'react-router-dom'
import PortfolioFooter from '../components/PortfolioFooter'
import { useLang } from '../contexts/LangContext'

/* ── Translations ── */
const T = {
  es: {
    heroBadge: 'AI Automation',
    heroDesc: 'Empresa de consultoría de IA, desarrollo full stack y automatización operada de forma 100% autónoma por agentes de Claude (Anthropic). El objetivo: una empresa que funciona 24/7 sin intervención humana constante, orquestada por Paperclip como sistema nervioso central y n8n como motor de automatización.',
    heroStats: ['Agentes IA', 'Workflows n8n', 'Servicios', 'Operación autónoma'],
    heroTechs: ['Claude (Anthropic)', 'n8n', 'Paperclip', 'GitHub', 'Firebase', 'Google Cloud', 'React'],
    servicesTitle: 'Servicios ofrecidos',
    servicesDesc:  'Tres líneas de negocio gestionadas de forma autónoma por los agentes',
    archTitle: 'Arquitectura del sistema',
    archDesc:  'Flujo de trabajo desde la solicitud hasta el output',
    archFlow: [
      { label: 'Cliente / GitHub', sub: 'Solicitud o push de código' },
      { label: 'n8n',              sub: 'Trigger & routing automático' },
      { label: 'Paperclip',        sub: 'Company OS central' },
    ],
    archOutputs: [['💻','Código & PRs'],['📊','Reportes & KPIs'],['📧','Outreach & Leads'],['📋','Issues & Tasks']],
    agentsTitle: 'Agentes de IA',
    agentsDesc:  'Cinco agentes especializados, cada uno con rol y responsabilidades definidas',
    workflowsTitle: 'Workflows de automatización (n8n)',
    workflowsDesc:  'Flujos que conectan GitHub, Paperclip, Claude y servicios externos',
    stackTitle: 'Stack tecnológico',
    stackDesc:  'Herramientas que componen el sistema de IA Digox',
    active: '● Activo',
    dev:    '◌ En desarrollo',
    footerCtx: 'Empresa operada por agentes Claude (Anthropic) · n8n · Paperclip',
  },
  en: {
    heroBadge: 'AI Automation',
    heroDesc: 'AI consulting, full stack development and automation company operated 100% autonomously by Claude (Anthropic) agents. The goal: a company that runs 24/7 without constant human intervention, orchestrated by Paperclip as the central nervous system and n8n as the automation engine.',
    heroStats: ['AI Agents', 'n8n Workflows', 'Services', 'Autonomous operation'],
    heroTechs: ['Claude (Anthropic)', 'n8n', 'Paperclip', 'GitHub', 'Firebase', 'Google Cloud', 'React'],
    servicesTitle: 'Services offered',
    servicesDesc:  'Three business lines managed autonomously by the agents',
    archTitle: 'System architecture',
    archDesc:  'Workflow from request to output',
    archFlow: [
      { label: 'Client / GitHub', sub: 'Request or code push' },
      { label: 'n8n',             sub: 'Automatic trigger & routing' },
      { label: 'Paperclip',       sub: 'Central Company OS' },
    ],
    archOutputs: [['💻','Code & PRs'],['📊','Reports & KPIs'],['📧','Outreach & Leads'],['📋','Issues & Tasks']],
    agentsTitle: 'AI Agents',
    agentsDesc:  'Five specialized agents, each with a defined role and responsibilities',
    workflowsTitle: 'Automation Workflows (n8n)',
    workflowsDesc:  'Flows connecting GitHub, Paperclip, Claude and external services',
    stackTitle: 'Tech stack',
    stackDesc:  'Tools that make up the IA Digox system',
    active: '● Active',
    dev:    '◌ In development',
    footerCtx: 'Company operated by Claude (Anthropic) agents · n8n · Paperclip',
  },
}

/* ── Data arrays (bilingual) ── */
const SERVICES = {
  es: [
    { icon:'🧠', color:'#f472b6', title:'Consultoría de IA',         desc:'Diseño e implementación de estrategias de IA para empresas: automatización de procesos, agentes autónomos y modelos de decisión.' },
    { icon:'💻', color:'#60a5fa', title:'Desarrollo Full Stack',      desc:'Aplicaciones web completas con React, Node.js y Firebase. Desde landing pages hasta plataformas SaaS con autenticación y base de datos.' },
    { icon:'⚡', color:'#fbbf24', title:'Automatización de Procesos', desc:'Flujos de trabajo automáticos con n8n: integración de APIs, webhooks, notificaciones y pipelines de datos sin intervención humana.' },
  ],
  en: [
    { icon:'🧠', color:'#f472b6', title:'AI Consulting',         desc:'Design and implementation of AI strategies for businesses: process automation, autonomous agents and decision models.' },
    { icon:'💻', color:'#60a5fa', title:'Full Stack Development', desc:'Complete web applications with React, Node.js and Firebase. From landing pages to SaaS platforms with authentication and database.' },
    { icon:'⚡', color:'#fbbf24', title:'Process Automation',    desc:'Automated workflows with n8n: API integration, webhooks, notifications and data pipelines without human intervention.' },
  ],
}

const AGENTS = {
  es: [
    { icon:'👔', color:'#34d399', role:'CEO', name:'Agente Estratégico',    desc:'Visión de negocio, toma de decisiones estratégicas y coordinación general de la empresa.' },
    { icon:'⚙️', color:'#60a5fa', role:'CTO', name:'Agente Técnico',        desc:'Arquitectura de sistemas, code reviews automáticos vía GitHub y decisiones de stack tecnológico.' },
    { icon:'📣', color:'#f472b6', role:'CMO', name:'Agente de Marketing',   desc:'Estrategia de contenido, prospección de clientes y gestión del mensaje de marca.' },
    { icon:'🔧', color:'#fbbf24', role:'Ops', name:'Agente de Operaciones', desc:'Gestión de proyectos activos, seguimiento de tareas e issues y coordinación de entregas.' },
    { icon:'📋', color:'#a78bfa', role:'PM',  name:'Agente de Proyectos',   desc:'Planning de sprints, priorización del backlog y comunicación entre agentes y clientes.' },
  ],
  en: [
    { icon:'👔', color:'#34d399', role:'CEO', name:'Strategic Agent',    desc:'Business vision, strategic decision-making and general coordination of the company.' },
    { icon:'⚙️', color:'#60a5fa', role:'CTO', name:'Technical Agent',    desc:'Systems architecture, automatic code reviews via GitHub and tech stack decisions.' },
    { icon:'📣', color:'#f472b6', role:'CMO', name:'Marketing Agent',    desc:'Content strategy, customer prospecting and brand message management.' },
    { icon:'🔧', color:'#fbbf24', role:'Ops', name:'Operations Agent',   desc:'Active project management, task and issue tracking and delivery coordination.' },
    { icon:'📋', color:'#a78bfa', role:'PM',  name:'Projects Agent',     desc:'Sprint planning, backlog prioritization and communication between agents and clients.' },
  ],
}

const WORKFLOWS = {
  es: [
    { icon:'🔍', color:'#60a5fa', status:'development', name:'Prospecting Semanal',       desc:'Apify extrae leads → filtro ICP con IA → agente SDR genera outreach personalizado.',                              tech:'Apify · Claude · n8n' },
    { icon:'🔬', color:'#34d399', status:'active',      name:'GitHub Push → Code Review', desc:'Cada push activa un code review automático por el agente CTO con análisis de seguridad y calidad.',             tech:'GitHub Webhooks · Claude · n8n' },
    { icon:'📌', color:'#fbbf24', status:'active',      name:'GitHub → Paperclip Issues', desc:'Los commits se convierten automáticamente en issues de Paperclip para trazabilidad completa.',                   tech:'GitHub · Paperclip · n8n' },
    { icon:'🔄', color:'#a78bfa', status:'development', name:'GitHub → IA Digox Board',   desc:'Sincronización bidireccional entre GitHub y el tablero principal de IA Digox en Paperclip.',                    tech:'GitHub · Paperclip API · n8n' },
  ],
  en: [
    { icon:'🔍', color:'#60a5fa', status:'development', name:'Weekly Prospecting',        desc:'Apify extracts leads → AI ICP filter → SDR agent generates personalized outreach.',                              tech:'Apify · Claude · n8n' },
    { icon:'🔬', color:'#34d399', status:'active',      name:'GitHub Push → Code Review', desc:'Every push triggers an automatic code review by the CTO agent with security and quality analysis.',             tech:'GitHub Webhooks · Claude · n8n' },
    { icon:'📌', color:'#fbbf24', status:'active',      name:'GitHub → Paperclip Issues', desc:'Commits are automatically converted into Paperclip issues for full traceability.',                              tech:'GitHub · Paperclip · n8n' },
    { icon:'🔄', color:'#a78bfa', status:'development', name:'GitHub → IA Digox Board',   desc:'Bidirectional sync between GitHub and the main IA Digox board in Paperclip.',                                   tech:'GitHub · Paperclip API · n8n' },
  ],
}

const TECHS = [
  { name:'Claude (Anthropic)', color:'#f472b6', desc:{ es:'LLM base de todos los agentes',       en:'Base LLM for all agents' } },
  { name:'n8n',                color:'#fbbf24', desc:{ es:'Orquestación de workflows',            en:'Workflow orchestration' } },
  { name:'Paperclip',          color:'#60a5fa', desc:{ es:'Company OS / tablero central',         en:'Company OS / central board' } },
  { name:'GitHub',             color:'#94a3b8', desc:{ es:'Control de versiones + webhooks',      en:'Version control + webhooks' } },
  { name:'Firebase',           color:'#fb923c', desc:{ es:'Hosting + Firestore',                  en:'Hosting + Firestore' } },
  { name:'Google Cloud',       color:'#34d399', desc:{ es:'Infraestructura cloud',                en:'Cloud infrastructure' } },
  { name:'Cloudflare Tunnel',  color:'#a78bfa', desc:{ es:'Exposición segura de servicios',       en:'Secure service exposure' } },
  { name:'React + Vite',       color:'#60a5fa', desc:{ es:'Frontend de dashboards y clientes',    en:'Dashboard and client frontend' } },
]

function StatusBadge({ status, t }) {
  return status === 'active'
    ? <span className="iad-status iad-status--active">{t.active}</span>
    : <span className="iad-status iad-status--dev">{t.dev}</span>
}

export default function IaDigoxPage() {
  const { lang } = useLang()
  const t = T[lang]
  const services  = SERVICES[lang]
  const agents    = AGENTS[lang]
  const workflows = WORKFLOWS[lang]

  return (
    <div>
      {/* ── Hero ── */}
      <div className="iad-hero">
        <div className="iad-hero-inner">
          <div className="iad-hero-top">
            <span className="iad-hero-badge">{t.heroBadge}</span>
            <a href="https://github.com/Guillermo1987/ia-digox-services" target="_blank" rel="noreferrer" className="iad-hero-gh">
              GitHub →
            </a>
          </div>

          <h1 className="iad-hero-title">IA Digox Services</h1>

          <p className="iad-hero-desc">{t.heroDesc}</p>

          <div className="iad-hero-stats">
            {[
              { num: '5',    lbl: t.heroStats[0] },
              { num: '4',    lbl: t.heroStats[1] },
              { num: '3',    lbl: t.heroStats[2] },
              { num: '24/7', lbl: t.heroStats[3] },
            ].map(({ num, lbl }) => (
              <div key={lbl} className="iad-hero-stat">
                <span className="iad-hero-stat-num">{num}</span>
                <span className="iad-hero-stat-lbl">{lbl}</span>
              </div>
            ))}
          </div>

          <div className="iad-hero-techs">
            {t.heroTechs.map(tech => (
              <span key={tech} className="hero-tech">{tech}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="dashboard">
        <main>

          {/* Servicios */}
          <div className="grid grid-1">
            <div className="card">
              <h2>{t.servicesTitle}</h2>
              <p className="card-desc">{t.servicesDesc}</p>
              <div className="iad-services-grid">
                {services.map(({ icon, color, title, desc }) => (
                  <div key={title} className="iad-service-card" style={{ '--svc-color': color }}>
                    <span className="iad-service-icon">{icon}</span>
                    <h3 className="iad-service-title">{title}</h3>
                    <p className="iad-service-desc">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Arquitectura */}
          <div className="grid grid-1">
            <div className="card">
              <h2>{t.archTitle}</h2>
              <p className="card-desc">{t.archDesc}</p>

              <div className="iad-arch">
                <div className="iad-arch-row">
                  {t.archFlow.map(({ label, sub }, i) => {
                    const bgs = ['#1a2744','#2a1f0a','#1a1a3a']
                    const borders = ['#60a5fa','#fbbf24','#a78bfa']
                    const icons = ['📥','⚡','🧠']
                    return (
                      <div key={label} style={{ display:'flex', alignItems:'center', gap:'0.5rem' }}>
                        <div className="iad-arch-box" style={{ background: bgs[i], borderColor: borders[i] }}>
                          <span>{icons[i]}</span>
                          <strong>{label}</strong>
                          <small>{sub}</small>
                        </div>
                        {i < t.archFlow.length - 1 && <span className="iad-arch-arrow">→</span>}
                      </div>
                    )
                  })}
                </div>

                <div className="iad-arch-down">↓</div>

                <div className="iad-arch-row">
                  {agents.map(({ icon, role, color }) => (
                    <div key={role} className="iad-arch-box iad-arch-agent" style={{ borderColor: color+'60' }}>
                      <span>{icon}</span>
                      <strong style={{ color }}>{lang === 'es' ? `Agente ${role}` : `${role} Agent`}</strong>
                      <small>Claude-powered</small>
                    </div>
                  ))}
                </div>

                <div className="iad-arch-down">↓</div>

                <div className="iad-arch-row">
                  {t.archOutputs.map(([icon, label]) => (
                    <div key={label} className="iad-arch-box iad-arch-output">
                      <span>{icon}</span>
                      <small>{label}</small>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Agentes */}
          <div className="grid grid-1">
            <div className="card">
              <h2>{t.agentsTitle}</h2>
              <p className="card-desc">{t.agentsDesc}</p>
              <div className="iad-agents-grid">
                {agents.map(({ icon, color, role, name, desc }) => (
                  <div key={role} className="iad-agent-card">
                    <div className="iad-agent-header">
                      <span className="iad-agent-icon">{icon}</span>
                      <div>
                        <span className="iad-agent-role" style={{ color }}>{role}</span>
                        <p className="iad-agent-name">{name}</p>
                      </div>
                    </div>
                    <p className="iad-agent-desc">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Workflows */}
          <div className="grid grid-1">
            <div className="card">
              <h2>{t.workflowsTitle}</h2>
              <p className="card-desc">{t.workflowsDesc}</p>
              <div className="iad-workflows-grid">
                {workflows.map(({ icon, color, status, name, desc, tech }) => (
                  <div key={name} className="iad-workflow-card" style={{ borderColor: color+'40' }}>
                    <div className="iad-workflow-header">
                      <span className="iad-workflow-icon" style={{ background: color+'20', color }}>{icon}</span>
                      <StatusBadge status={status} t={t} />
                    </div>
                    <h3 className="iad-workflow-name">{name}</h3>
                    <p className="iad-workflow-desc">{desc}</p>
                    <p className="iad-workflow-tech">{tech}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stack */}
          <div className="grid grid-1">
            <div className="card">
              <h2>{t.stackTitle}</h2>
              <p className="card-desc">{t.stackDesc}</p>
              <div className="iad-tech-grid">
                {TECHS.map(({ name, color, desc }) => (
                  <div key={name} className="iad-tech-card">
                    <span className="iad-tech-name" style={{ color }}>{name}</span>
                    <span className="iad-tech-desc">{desc[lang]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </main>

        <PortfolioFooter context={t.footerCtx} />
      </div>
    </div>
  )
}
