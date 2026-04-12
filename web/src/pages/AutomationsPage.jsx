import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PortfolioFooter from '../components/PortfolioFooter'
import { useLang } from '../contexts/LangContext'

/* ── Translations ── */
const T = {
  es: {
    badge: 'Solo lectura · View only',
    title: 'Automatizaciones & Agentes IA',
    desc: 'Vista de solo lectura de los workflows de n8n y los agentes de Paperclip que operan IA Digox Services. Haz clic en los nodos para explorar la configuración de cada paso.',
    heroStats: ['Workflows n8n', 'Activos 24/7', 'Agentes Claude', 'Nodos totales'],
    tabWorkflows: '⚡ Workflows n8n',
    tabAgents:    '🤖 Agentes Paperclip',
    workflowsDesc: 'Workflows reales extraídos de n8n vía API. Haz clic en una tarjeta para ver el flujo completo y la configuración de cada nodo.',
    agentsDesc: 'Cinco agentes especializados operados por Claude (Anthropic) y orquestados desde Paperclip, el sistema nervioso central de IA Digox.',
    loading: 'Cargando workflows…',
    hint: 'Haz clic en un nodo para ver sus detalles',
    noticeWorkflows: 'Vista de solo lectura. Los workflows se ejecutan en n8n self-hosted. No es posible modificar, activar ni ejecutar nada desde esta página.',
    noticeAgents: 'Vista de solo lectura. Los agentes operan de forma autónoma en Paperclip. No es posible interactuar con ellos desde esta página.',
    active: '● Activo',
    dev:    '◌ En desarrollo',
    inactive: '○ Inactivo',
    nodes: 'nodos',
    footerCtx: 'Sistema operado por agentes Claude (Anthropic) · n8n · Paperclip',
  },
  en: {
    badge: 'Read-only · View only',
    title: 'Automations & AI Agents',
    desc: 'Read-only view of the n8n workflows and Paperclip agents that operate IA Digox Services. Click on nodes to explore the configuration of each step.',
    heroStats: ['n8n Workflows', 'Active 24/7', 'Claude Agents', 'Total nodes'],
    tabWorkflows: '⚡ n8n Workflows',
    tabAgents:    '🤖 Paperclip Agents',
    workflowsDesc: 'Real workflows fetched from n8n via API. Click a card to see the full flow and each node\'s configuration.',
    agentsDesc: 'Five specialized agents operated by Claude (Anthropic) and orchestrated from Paperclip, the central nervous system of IA Digox.',
    loading: 'Loading workflows…',
    hint: 'Click a node to see its details',
    noticeWorkflows: 'Read-only view. Workflows run on a self-hosted n8n instance. It is not possible to modify, activate or execute anything from this page.',
    noticeAgents: 'Read-only view. Agents operate autonomously in Paperclip. It is not possible to interact with them from this page.',
    active: '● Active',
    dev:    '◌ In development',
    inactive: '○ Inactive',
    nodes: 'nodes',
    footerCtx: 'System operated by Claude (Anthropic) agents · n8n · Paperclip',
  },
}

/* ── Paperclip agents (bilingual) ── */
const AGENTS = {
  es: [
    {
      icon: '👔', color: '#34d399', role: 'CEO',
      name: 'Agente Estratégico',
      desc: 'Visión de negocio, toma de decisiones estratégicas y coordinación general de la empresa.',
      responsibilities: [
        'Define la visión y dirección de la empresa',
        'Aprueba o rechaza propuestas de los demás agentes',
        'Evalúa oportunidades de negocio entrantes',
        'Coordina la comunicación entre agentes',
      ],
    },
    {
      icon: '⚙️', color: '#60a5fa', role: 'CTO',
      name: 'Agente Técnico',
      desc: 'Arquitectura de sistemas, code reviews automáticos vía GitHub y decisiones de stack tecnológico.',
      responsibilities: [
        'Revisa cada push a GitHub automáticamente',
        'Detecta vulnerabilidades de seguridad en el código',
        'Propone mejoras de arquitectura',
        'Gestiona issues técnicos en Paperclip',
      ],
    },
    {
      icon: '📣', color: '#f472b6', role: 'CMO',
      name: 'Agente de Marketing',
      desc: 'Estrategia de contenido, prospección de clientes y gestión del mensaje de marca.',
      responsibilities: [
        'Genera outreach personalizado para leads',
        'Calcula ICP Score de prospectos',
        'Diseña la estrategia de contenido semanal',
        'Monitorea el posicionamiento de marca',
      ],
    },
    {
      icon: '🔧', color: '#fbbf24', role: 'Ops',
      name: 'Agente de Operaciones',
      desc: 'Gestión de proyectos activos, seguimiento de tareas e issues y coordinación de entregas.',
      responsibilities: [
        'Monitorea el estado de proyectos en curso',
        'Escala issues críticos al agente correcto',
        'Genera reportes de estado semanales',
        'Coordina los SLAs de entrega',
      ],
    },
    {
      icon: '📋', color: '#a78bfa', role: 'PM',
      name: 'Agente de Proyectos',
      desc: 'Planning de sprints, priorización del backlog y comunicación entre agentes y clientes.',
      responsibilities: [
        'Planifica sprints y prioriza el backlog',
        'Traduce requerimientos de clientes a tareas',
        'Comunica el progreso a stakeholders',
        'Mantiene actualizado el tablero en Paperclip',
      ],
    },
  ],
  en: [
    {
      icon: '👔', color: '#34d399', role: 'CEO',
      name: 'Strategic Agent',
      desc: 'Business vision, strategic decision-making and general coordination of the company.',
      responsibilities: [
        'Defines the vision and direction of the company',
        'Approves or rejects proposals from other agents',
        'Evaluates incoming business opportunities',
        'Coordinates communication between agents',
      ],
    },
    {
      icon: '⚙️', color: '#60a5fa', role: 'CTO',
      name: 'Technical Agent',
      desc: 'Systems architecture, automatic code reviews via GitHub and tech stack decisions.',
      responsibilities: [
        'Reviews every GitHub push automatically',
        'Detects security vulnerabilities in code',
        'Proposes architecture improvements',
        'Manages technical issues in Paperclip',
      ],
    },
    {
      icon: '📣', color: '#f472b6', role: 'CMO',
      name: 'Marketing Agent',
      desc: 'Content strategy, customer prospecting and brand message management.',
      responsibilities: [
        'Generates personalized outreach for leads',
        'Calculates ICP Score for prospects',
        'Designs the weekly content strategy',
        'Monitors brand positioning',
      ],
    },
    {
      icon: '🔧', color: '#fbbf24', role: 'Ops',
      name: 'Operations Agent',
      desc: 'Active project management, task and issue tracking and delivery coordination.',
      responsibilities: [
        'Monitors the status of ongoing projects',
        'Escalates critical issues to the right agent',
        'Generates weekly status reports',
        'Coordinates delivery SLAs',
      ],
    },
    {
      icon: '📋', color: '#a78bfa', role: 'PM',
      name: 'Projects Agent',
      desc: 'Sprint planning, backlog prioritization and communication between agents and clients.',
      responsibilities: [
        'Plans sprints and prioritizes the backlog',
        'Translates client requirements into tasks',
        'Communicates progress to stakeholders',
        'Keeps the Paperclip board up to date',
      ],
    },
  ],
}

/* ── Node type descriptions (bilingual) ── */
const NODE_DESC = {
  webhook:         { es: 'Recibe llamadas HTTP externas y dispara el workflow', en: 'Receives external HTTP calls and triggers the workflow' },
  scheduleTrigger: { es: 'Ejecuta el workflow automáticamente según un horario', en: 'Executes the workflow automatically on a schedule' },
  if:              { es: 'Evalúa una condición y bifurca el flujo en dos ramas', en: 'Evaluates a condition and splits the flow into two branches' },
  code:            { es: 'Ejecuta lógica JavaScript personalizada para procesar datos', en: 'Executes custom JavaScript logic to process data' },
  httpRequest:     { es: 'Realiza llamadas a APIs externas (REST)', en: 'Makes calls to external APIs (REST)' },
  wait:            { es: 'Pausa la ejecución durante un tiempo definido', en: 'Pauses execution for a defined period of time' },
}

/* ── StatusBadge ── */
function StatusBadge({ active, status, t }) {
  if (active) return <span className="auto-badge auto-badge--active">{t.active}</span>
  if (status === 'development') return <span className="auto-badge auto-badge--dev">{t.dev}</span>
  return <span className="auto-badge auto-badge--inactive">{t.inactive}</span>
}

/* ── WorkflowFlow ── */
function WorkflowFlow({ nodes, selectedNode, onSelectNode }) {
  return (
    <div className="auto-flow">
      {nodes.map((node, i) => (
        <div key={node.id} className="auto-flow-step">
          <button
            className={`auto-flow-node ${selectedNode?.id === node.id ? 'auto-flow-node--selected' : ''}`}
            style={{ '--node-color': node.typeColor }}
            onClick={() => onSelectNode(selectedNode?.id === node.id ? null : node)}
          >
            <span className="auto-node-icon">{node.icon}</span>
            <div className="auto-node-body">
              <span className="auto-node-type" style={{ color: node.typeColor }}>{node.typeLabel}</span>
              <span className="auto-node-name">{node.name}</span>
            </div>
          </button>
          {i < nodes.length - 1 && <span className="auto-flow-arrow">→</span>}
        </div>
      ))}
    </div>
  )
}

/* ── NodeDetail ── */
function NodeDetail({ node, lang, onClose }) {
  if (!node) return null
  const desc = NODE_DESC[node.type]?.[lang] || node.typeLabel
  const hasParams = Object.keys(node.params || {}).length > 0
  return (
    <div className="auto-node-detail" style={{ '--node-color': node.typeColor }}>
      <div className="auto-node-detail-header">
        <span className="auto-node-detail-icon">{node.icon}</span>
        <div>
          <span className="auto-node-detail-type" style={{ color: node.typeColor }}>{node.typeLabel}</span>
          <p className="auto-node-detail-name">{node.name}</p>
        </div>
        <button className="auto-node-detail-close" onClick={onClose}>✕</button>
      </div>
      <p className="auto-node-detail-desc">{desc}</p>
      {hasParams && (
        <div className="auto-node-params">
          <p className="auto-node-params-title">{lang === 'es' ? 'Parámetros' : 'Parameters'}</p>
          {Object.entries(node.params).map(([k, v]) => (
            <div key={k} className="auto-node-param">
              <span className="auto-node-param-key">{k}</span>
              <span className="auto-node-param-val">{v}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── WorkflowCard ── */
function WorkflowCard({ workflow, expanded, onToggle, t, lang }) {
  const [selectedNode, setSelectedNode] = useState(null)
  useEffect(() => { if (!expanded) setSelectedNode(null) }, [expanded])

  return (
    <div className={`auto-workflow-card ${expanded ? 'auto-workflow-card--expanded' : ''}`}
         style={{ '--wf-color': workflow.color }}>
      <button className="auto-workflow-header" onClick={onToggle}>
        <div className="auto-workflow-header-left">
          <StatusBadge active={workflow.active} status={workflow.status} t={t} />
          <h3 className="auto-workflow-name">{workflow.name}</h3>
        </div>
        <div className="auto-workflow-header-right">
          <span className="auto-workflow-node-count">{workflow.nodes.length} {t.nodes}</span>
          <span className="auto-workflow-chevron">{expanded ? '▲' : '▼'}</span>
        </div>
      </button>
      {expanded && (
        <div className="auto-workflow-body">
          <p className="auto-workflow-hint">{t.hint}</p>
          <WorkflowFlow nodes={workflow.nodes} selectedNode={selectedNode} onSelectNode={setSelectedNode} />
          {selectedNode && (
            <NodeDetail node={selectedNode} lang={lang} onClose={() => setSelectedNode(null)} />
          )}
        </div>
      )}
    </div>
  )
}

/* ── Main component ── */
export default function AutomationsPage() {
  const { lang } = useLang()
  const t = T[lang]
  const agents = AGENTS[lang]
  const [tab, setTab]           = useState('workflows')
  const [workflows, setWorkflows] = useState([])
  const [expandedId, setExpandedId] = useState(null)
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    fetch('/data/automations.json')
      .then(r => r.json())
      .then(d => { setWorkflows(d.workflows); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div>
      {/* ── Hero ── */}
      <div className="auto-hero">
        <div className="auto-hero-inner">
          <div className="auto-hero-top">
            <span className="auto-hero-badge">{t.badge}</span>
            <Link to="/ia-digox" className="auto-hero-link">IA Digox →</Link>
          </div>
          <h1 className="auto-hero-title">{t.title}</h1>
          <p className="auto-hero-desc">{t.desc}</p>
          <div className="auto-hero-stats">
            {[
              { num: '4',  lbl: t.heroStats[0] },
              { num: '2',  lbl: t.heroStats[1] },
              { num: '5',  lbl: t.heroStats[2] },
              { num: '18', lbl: t.heroStats[3] },
            ].map(({ num, lbl }) => (
              <div key={lbl} className="auto-hero-stat">
                <span className="auto-hero-stat-num">{num}</span>
                <span className="auto-hero-stat-lbl">{lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="auto-tabs-bar">
        <div className="auto-tabs">
          <button className={`auto-tab ${tab === 'workflows' ? 'auto-tab--active' : ''}`} onClick={() => setTab('workflows')}>
            {t.tabWorkflows}
          </button>
          <button className={`auto-tab ${tab === 'agents' ? 'auto-tab--active' : ''}`} onClick={() => setTab('agents')}>
            {t.tabAgents}
          </button>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="auto-content">

        {tab === 'workflows' && (
          <div>
            <p className="auto-section-desc">{t.workflowsDesc}</p>
            {loading ? (
              <div className="loading">{t.loading}</div>
            ) : (
              <div className="auto-workflows-list">
                {workflows.map(wf => (
                  <WorkflowCard
                    key={wf.id}
                    workflow={wf}
                    expanded={expandedId === wf.id}
                    onToggle={() => setExpandedId(prev => prev === wf.id ? null : wf.id)}
                    t={t}
                    lang={lang}
                  />
                ))}
              </div>
            )}
            <div className="auto-notice">
              <span>🔒</span>
              <p>{t.noticeWorkflows}</p>
            </div>
          </div>
        )}

        {tab === 'agents' && (
          <div>
            <p className="auto-section-desc">{t.agentsDesc}</p>
            <div className="auto-agents-grid">
              {agents.map(agent => (
                <div key={agent.role} className="auto-agent-card" style={{ '--agent-color': agent.color }}>
                  <div className="auto-agent-header">
                    <span className="auto-agent-icon">{agent.icon}</span>
                    <div>
                      <span className="auto-agent-role" style={{ color: agent.color }}>{agent.role}</span>
                      <p className="auto-agent-name">{agent.name}</p>
                    </div>
                    <span className="auto-agent-model">claude-sonnet-4</span>
                  </div>
                  <p className="auto-agent-desc">{agent.desc}</p>
                  <ul className="auto-agent-list">
                    {agent.responsibilities.map(r => (
                      <li key={r} className="auto-agent-item">
                        <span style={{ color: agent.color }}>▸</span> {r}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="auto-notice">
              <span>🔒</span>
              <p>{t.noticeAgents}</p>
            </div>
          </div>
        )}

      </div>

      <PortfolioFooter context={t.footerCtx} />
    </div>
  )
}
