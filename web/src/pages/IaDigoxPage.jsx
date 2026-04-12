import { Link } from 'react-router-dom'

const SERVICES = [
  { icon:'🧠', color:'#f472b6', title:'Consultoría de IA',         desc:'Diseño e implementación de estrategias de IA para empresas: automatización de procesos, agentes autónomos y modelos de decisión.' },
  { icon:'💻', color:'#60a5fa', title:'Desarrollo Full Stack',      desc:'Aplicaciones web completas con React, Node.js y Firebase. Desde landing pages hasta plataformas SaaS con autenticación y base de datos.' },
  { icon:'⚡', color:'#fbbf24', title:'Automatización de Procesos', desc:'Flujos de trabajo automáticos con n8n: integración de APIs, webhooks, notificaciones y pipelines de datos sin intervención humana.' },
]

const AGENTS = [
  { icon:'👔', color:'#34d399', role:'CEO', name:'Agente Estratégico', desc:'Visión de negocio, toma de decisiones estratégicas y coordinación general de la empresa.' },
  { icon:'⚙️', color:'#60a5fa', role:'CTO', name:'Agente Técnico',     desc:'Arquitectura de sistemas, code reviews automáticos vía GitHub y decisiones de stack tecnológico.' },
  { icon:'📣', color:'#f472b6', role:'CMO', name:'Agente de Marketing',desc:'Estrategia de contenido, prospección de clientes y gestión del mensaje de marca.' },
  { icon:'🔧', color:'#fbbf24', role:'Ops', name:'Agente de Operaciones',desc:'Gestión de proyectos activos, seguimiento de tareas e issues y coordinación de entregas.' },
  { icon:'📋', color:'#a78bfa', role:'PM',  name:'Agente de Proyectos', desc:'Planning de sprints, priorización del backlog y comunicación entre agentes y clientes.' },
]

const WORKFLOWS = [
  { icon:'🔍', color:'#60a5fa', status:'development', name:'Prospecting Semanal',       desc:'Apify extrae leads → filtro ICP con IA → agente SDR genera outreach personalizado.',                              tech:'Apify · Claude · n8n' },
  { icon:'🔬', color:'#34d399', status:'active',      name:'GitHub Push → Code Review', desc:'Cada push activa un code review automático por el agente CTO con análisis de seguridad y calidad.',             tech:'GitHub Webhooks · Claude · n8n' },
  { icon:'📌', color:'#fbbf24', status:'active',      name:'GitHub → Paperclip Issues', desc:'Los commits se convierten automáticamente en issues de Paperclip para trazabilidad completa.',                   tech:'GitHub · Paperclip · n8n' },
  { icon:'🔄', color:'#a78bfa', status:'development', name:'GitHub → IA Digox Board',   desc:'Sincronización bidireccional entre GitHub y el tablero principal de IA Digox en Paperclip.',                    tech:'GitHub · Paperclip API · n8n' },
]

const TECHS = [
  { name:'Claude (Anthropic)', color:'#f472b6', desc:'LLM base de todos los agentes' },
  { name:'n8n',                color:'#fbbf24', desc:'Orquestación de workflows' },
  { name:'Paperclip',          color:'#60a5fa', desc:'Company OS / tablero central' },
  { name:'GitHub',             color:'#94a3b8', desc:'Control de versiones + webhooks' },
  { name:'Firebase',           color:'#fb923c', desc:'Hosting + Firestore' },
  { name:'Google Cloud',       color:'#34d399', desc:'Infraestructura cloud' },
  { name:'Cloudflare Tunnel',  color:'#a78bfa', desc:'Exposición segura de servicios' },
  { name:'React + Vite',       color:'#60a5fa', desc:'Frontend de dashboards y clientes' },
]

const ARCH_FLOW = [
  { icon:'📥', label:'Cliente / GitHub', sub:'Solicitud o push de código', bg:'#1a2744', border:'#60a5fa' },
  { icon:'⚡', label:'n8n',             sub:'Trigger & routing automático', bg:'#2a1f0a', border:'#fbbf24' },
  { icon:'🧠', label:'Paperclip',        sub:'Company OS central',          bg:'#1a1a3a', border:'#a78bfa' },
]

function StatusBadge({ status }) {
  return status === 'active'
    ? <span className="iad-status iad-status--active">● Activo</span>
    : <span className="iad-status iad-status--dev">◌ En desarrollo</span>
}

export default function IaDigoxPage() {
  return (
    <div>

      {/* ── Hero centrado ──────────────────────────────────────────────── */}
      <div className="iad-hero">
        <div className="iad-hero-inner">
          <div className="iad-hero-top">
            <span className="iad-hero-badge">AI Automation</span>
            <a href="https://github.com/Guillermo1987/ia-digox-services" target="_blank" rel="noreferrer" className="iad-hero-gh">
              GitHub →
            </a>
          </div>

          <h1 className="iad-hero-title">IA Digox Services</h1>

          <p className="iad-hero-desc">
            Empresa de consultoría de IA, desarrollo full stack y automatización operada de forma{' '}
            <strong>100% autónoma</strong> por agentes de Claude (Anthropic).
            El objetivo: una empresa que funciona 24/7 sin intervención humana constante,
            orquestada por <strong>Paperclip</strong> como sistema nervioso central
            y <strong>n8n</strong> como motor de automatización.
          </p>

          <div className="iad-hero-stats">
            {[
              { num: '5',    lbl: 'Agentes IA' },
              { num: '4',    lbl: 'Workflows n8n' },
              { num: '3',    lbl: 'Servicios' },
              { num: '24/7', lbl: 'Operación autónoma' },
            ].map(({ num, lbl }) => (
              <div key={lbl} className="iad-hero-stat">
                <span className="iad-hero-stat-num">{num}</span>
                <span className="iad-hero-stat-lbl">{lbl}</span>
              </div>
            ))}
          </div>

          <div className="iad-hero-techs">
            {['Claude (Anthropic)', 'n8n', 'Paperclip', 'GitHub', 'Firebase', 'Google Cloud', 'React'].map(t => (
              <span key={t} className="hero-tech">{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ────────────────────────────────────────────────────── */}
      <div className="dashboard">
        <main>

          {/* Servicios */}
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

          {/* Arquitectura */}
          <div className="grid grid-1">
            <div className="card">
              <h2>Arquitectura del sistema</h2>
              <p className="card-desc">Flujo de trabajo desde la solicitud hasta el output</p>

              <div className="iad-arch">
                {/* Fila 1: entrada → n8n → Paperclip */}
                <div className="iad-arch-row">
                  {ARCH_FLOW.map(({ icon, label, sub, bg, border }, i) => (
                    <div key={label} style={{ display:'flex', alignItems:'center', gap:'0.5rem' }}>
                      <div className="iad-arch-box" style={{ background: bg, borderColor: border }}>
                        <span>{icon}</span>
                        <strong>{label}</strong>
                        <small>{sub}</small>
                      </div>
                      {i < ARCH_FLOW.length - 1 && <span className="iad-arch-arrow">→</span>}
                    </div>
                  ))}
                </div>

                <div className="iad-arch-down">↓</div>

                {/* Fila 2: agentes */}
                <div className="iad-arch-row">
                  {AGENTS.map(({ icon, role, color }) => (
                    <div key={role} className="iad-arch-box iad-arch-agent" style={{ borderColor: color+'60' }}>
                      <span>{icon}</span>
                      <strong style={{ color }}>Agente {role}</strong>
                      <small>Claude-powered</small>
                    </div>
                  ))}
                </div>

                <div className="iad-arch-down">↓</div>

                {/* Fila 3: outputs */}
                <div className="iad-arch-row">
                  {[['💻','Código & PRs'],['📊','Reportes & KPIs'],['📧','Outreach & Leads'],['📋','Issues & Tasks']].map(([icon, label]) => (
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

          {/* Workflows */}
          <div className="grid grid-1">
            <div className="card">
              <h2>Workflows de automatización (n8n)</h2>
              <p className="card-desc">Flujos que conectan GitHub, Paperclip, Claude y servicios externos</p>
              <div className="iad-workflows-grid">
                {WORKFLOWS.map(({ icon, color, status, name, desc, tech }) => (
                  <div key={name} className="iad-workflow-card" style={{ borderColor: color+'40' }}>
                    <div className="iad-workflow-header">
                      <span className="iad-workflow-icon" style={{ background: color+'20', color }}>{icon}</span>
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

          {/* Stack */}
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
            <a href="https://github.com/Guillermo1987/ia-digox-services" target="_blank" rel="noreferrer">ia-digox-services</a>
            {' '}&middot; Construido por <Link to="/">Guillermo Ubeda Garay</Link>
          </p>
        </footer>
      </div>

    </div>
  )
}
