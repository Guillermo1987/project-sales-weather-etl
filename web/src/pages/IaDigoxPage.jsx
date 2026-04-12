import { Link } from 'react-router-dom'

const SERVICES = [
  {
    icon: '🧠',
    color: '#f472b6',
    title: 'Consultoría de IA',
    desc: 'Diseño e implementación de estrategias de IA para empresas: automatización de procesos, agentes autónomos y modelos de decisión.',
  },
  {
    icon: '💻',
    color: '#60a5fa',
    title: 'Desarrollo Full Stack',
    desc: 'Aplicaciones web completas con React, Node.js y Firebase. Desde landing pages hasta plataformas SaaS con autenticación y base de datos.',
  },
  {
    icon: '⚡',
    color: '#fbbf24',
    title: 'Automatización de Procesos',
    desc: 'Flujos de trabajo automáticos con n8n: integración de APIs, webhooks, notificaciones y pipelines de datos sin intervención humana.',
  },
]

const AGENTS = [
  {
    icon: '👔',
    color: '#34d399',
    role: 'CEO',
    name: 'Agente Estratégico',
    desc: 'Visión de negocio, toma de decisiones estratégicas y coordinación general de la empresa.',
  },
  {
    icon: '⚙️',
    color: '#60a5fa',
    role: 'CTO',
    name: 'Agente Técnico',
    desc: 'Arquitectura de sistemas, code reviews automáticos vía GitHub y decisiones de stack tecnológico.',
  },
  {
    icon: '📣',
    color: '#f472b6',
    role: 'CMO',
    name: 'Agente de Marketing',
    desc: 'Estrategia de contenido, prospección de clientes y gestión del mensaje de marca.',
  },
  {
    icon: '🔧',
    color: '#fbbf24',
    role: 'Ops',
    name: 'Agente de Operaciones',
    desc: 'Gestión de proyectos activos, seguimiento de tareas e issues y coordinación de entregas.',
  },
  {
    icon: '📋',
    color: '#a78bfa',
    role: 'PM',
    name: 'Agente de Proyectos',
    desc: 'Planning de sprints, priorización del backlog y comunicación entre agentes y clientes.',
  },
]

const WORKFLOWS = [
  {
    icon: '🔍',
    color: '#60a5fa',
    status: 'development',
    name: 'Prospecting Semanal',
    desc: 'Apify extrae leads → filtro ICP con IA → agente SDR genera outreach personalizado.',
    tech: 'Apify · Claude · n8n',
  },
  {
    icon: '🔬',
    color: '#34d399',
    status: 'active',
    name: 'GitHub Push → Code Review',
    desc: 'Cada push al repo activa un code review automático por el agente CTO con análisis de seguridad y calidad.',
    tech: 'GitHub Webhooks · Claude · n8n',
  },
  {
    icon: '📌',
    color: '#fbbf24',
    status: 'active',
    name: 'GitHub → Paperclip Issues',
    desc: 'Los commits del repo se convierten automáticamente en issues de Paperclip para trazabilidad completa.',
    tech: 'GitHub · Paperclip · n8n',
  },
  {
    icon: '🔄',
    color: '#a78bfa',
    status: 'development',
    name: 'GitHub → IA Digox Board',
    desc: 'Sincronización bidireccional entre GitHub y el tablero principal de IA Digox en Paperclip.',
    tech: 'GitHub · Paperclip API · n8n',
  },
]

const TECHS = [
  { name: 'Claude (Anthropic)',  color: '#f472b6', desc: 'LLM base de todos los agentes' },
  { name: 'n8n',                color: '#fbbf24', desc: 'Orquestación de workflows' },
  { name: 'Paperclip',          color: '#60a5fa', desc: 'Company OS / tablero central' },
  { name: 'GitHub',             color: '#94a3b8', desc: 'Control de versiones + webhooks' },
  { name: 'Firebase',           color: '#fb923c', desc: 'Hosting + Firestore' },
  { name: 'Google Cloud',       color: '#34d399', desc: 'Infraestructura cloud' },
  { name: 'Cloudflare Tunnel',  color: '#a78bfa', desc: 'Exposición segura de servicios locales' },
  { name: 'React + Vite',       color: '#60a5fa', desc: 'Frontend de clientes y dashboards' },
]

function StatusBadge({ status }) {
  return status === 'active'
    ? <span className="iad-status iad-status--active">● Activo</span>
    : <span className="iad-status iad-status--dev">◌ En desarrollo</span>
}

export default function IaDigoxPage() {
  return (
    <div className="dashboard">

      {/* ── Hero ── */}
      <div className="hero">
        <div className="hero-top">
          <span className="hero-badge" style={{ '--badge-color': '#f472b6' }}>AI Automation</span>
          <a
            href="https://github.com/Guillermo1987/ia-digox-services"
            target="_blank" rel="noreferrer"
            className="hero-github"
          >
            GitHub →
          </a>
        </div>
        <h1 className="hero-title">IA Digox Services</h1>
        <p className="hero-desc">
          Empresa de consultoría de IA, desarrollo full stack y automatización operada de forma{' '}
          <strong style={{ color: '#f1f5f9' }}>100% autónoma</strong> por agentes de Claude (Anthropic).
          El objetivo: una empresa que funciona 24/7 sin intervención humana constante,
          orquestada por Paperclip como sistema nervioso central y n8n como motor de automatización.
        </p>
        <div className="hero-stats">
          <div className="hero-stat"><span className="hero-stat-value">5</span><span className="hero-stat-label">Agentes IA</span></div>
          <div className="hero-stat"><span className="hero-stat-value">4</span><span className="hero-stat-label">Workflows n8n</span></div>
          <div className="hero-stat"><span className="hero-stat-value">3</span><span className="hero-stat-label">Servicios</span></div>
          <div className="hero-stat"><span className="hero-stat-value">24/7</span><span className="hero-stat-label">Operación autónoma</span></div>
        </div>
        <div className="hero-techs">
          {['Claude (Anthropic)', 'n8n', 'Paperclip', 'GitHub', 'Firebase', 'Google Cloud', 'React'].map(t => (
            <span key={t} className="hero-tech">{t}</span>
          ))}
        </div>
      </div>

      <main>

        {/* ── Servicios ── */}
        <div className="grid grid-1">
          <div className="card">
            <h2>Servicios ofrecidos</h2>
            <p className="card-desc">Tres líneas de negocio gestionadas de forma autónoma por los agentes</p>
            <div className="iad-services-grid">
              {SERVICES.map(({ icon, color, title, desc }) => (
                <div key={title} className="iad-service-card" style={{ '--svc-color': color }}>
                  <span className="iad-service-icon">{icon}</span>
                  <h3 className="iad-service-title">{title}</h3>
                  <p className="iad-service-desc">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Arquitectura ── */}
        <div className="grid grid-1">
          <div className="card">
            <h2>Arquitectura del sistema</h2>
            <p className="card-desc">Cómo interactúan los componentes entre sí</p>
            <div className="iad-arch">
              <div className="iad-arch-row">
                <div className="iad-arch-box iad-arch-input">
                  <span>📥</span>
                  <strong>Cliente / GitHub</strong>
                  <small>Solicitud o push de código</small>
                </div>
                <div className="iad-arch-arrow">→</div>
                <div className="iad-arch-box iad-arch-n8n">
                  <span>⚡</span>
                  <strong>n8n</strong>
                  <small>Trigger & routing</small>
                </div>
                <div className="iad-arch-arrow">→</div>
                <div className="iad-arch-box iad-arch-paperclip">
                  <span>🧠</span>
                  <strong>Paperclip</strong>
                  <small>Company OS central</small>
                </div>
              </div>
              <div className="iad-arch-down">↓</div>
              <div className="iad-arch-row iad-arch-agents-row">
                {['CEO', 'CTO', 'CMO', 'Ops', 'PM'].map(r => (
                  <div key={r} className="iad-arch-box iad-arch-agent">
                    <span>🤖</span>
                    <strong>Agente {r}</strong>
                    <small>Claude-powered</small>
                  </div>
                ))}
              </div>
              <div className="iad-arch-down">↓</div>
              <div className="iad-arch-row">
                {[
                  { icon: '💻', label: 'Código & PRs' },
                  { icon: '📊', label: 'Reportes & KPIs' },
                  { icon: '📧', label: 'Outreach & Leads' },
                  { icon: '📋', label: 'Issues & Tasks' },
                ].map(({ icon, label }) => (
                  <div key={label} className="iad-arch-box iad-arch-output">
                    <span>{icon}</span>
                    <small>{label}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Agentes ── */}
        <div className="grid grid-1">
          <div className="card">
            <h2>Agentes de IA</h2>
            <p className="card-desc">Cinco agentes especializados, cada uno con rol y responsabilidades definidas</p>
            <div className="iad-agents-grid">
              {AGENTS.map(({ icon, color, role, name, desc }) => (
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

        {/* ── Workflows ── */}
        <div className="grid grid-1">
          <div className="card">
            <h2>Workflows de automatización (n8n)</h2>
            <p className="card-desc">Flujos que conectan GitHub, Paperclip, Claude y servicios externos</p>
            <div className="iad-workflows-grid">
              {WORKFLOWS.map(({ icon, color, status, name, desc, tech }) => (
                <div key={name} className="iad-workflow-card" style={{ borderColor: color + '40' }}>
                  <div className="iad-workflow-header">
                    <span className="iad-workflow-icon" style={{ background: color + '20', color }}>{icon}</span>
                    <StatusBadge status={status} />
                  </div>
                  <h3 className="iad-workflow-name">{name}</h3>
                  <p className="iad-workflow-desc">{desc}</p>
                  <p className="iad-workflow-tech">{tech}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Stack tecnológico ── */}
        <div className="grid grid-1">
          <div className="card">
            <h2>Stack tecnológico</h2>
            <p className="card-desc">Herramientas que componen el sistema de IA Digox</p>
            <div className="iad-tech-grid">
              {TECHS.map(({ name, color, desc }) => (
                <div key={name} className="iad-tech-card">
                  <span className="iad-tech-name" style={{ color }}>{name}</span>
                  <span className="iad-tech-desc">{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </main>

      <footer>
        <p>
          Empresa operada por agentes Claude (Anthropic) · n8n · Paperclip &middot;{' '}
          <a href="https://github.com/Guillermo1987/ia-digox-services" target="_blank" rel="noreferrer">
            ia-digox-services
          </a>
          {' '}&middot; Construido por{' '}
          <Link to="/">Guillermo Ubeda Garay</Link>
        </p>
      </footer>
    </div>
  )
}
