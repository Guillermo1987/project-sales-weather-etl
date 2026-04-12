import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

/* ── Paperclip agents (hardcoded — Paperclip offline during build) ── */
const AGENTS = [
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
    model: 'claude-sonnet-4',
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
    model: 'claude-sonnet-4',
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
    model: 'claude-sonnet-4',
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
    model: 'claude-sonnet-4',
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
    model: 'claude-sonnet-4',
  },
]

/* ── Node type descriptions ── */
const NODE_DESC = {
  webhook:         'Recibe llamadas HTTP externas y dispara el workflow',
  scheduleTrigger: 'Ejecuta el workflow automáticamente según un horario',
  if:              'Evalúa una condición y bifurca el flujo en dos ramas',
  code:            'Ejecuta lógica JavaScript personalizada para procesar datos',
  httpRequest:     'Realiza llamadas a APIs externas (REST)',
  wait:            'Pausa la ejecución durante un tiempo definido',
}

/* ── StatusBadge ── */
function StatusBadge({ active, status }) {
  if (active) return <span className="auto-badge auto-badge--active">● Activo</span>
  if (status === 'development') return <span className="auto-badge auto-badge--dev">◌ En desarrollo</span>
  return <span className="auto-badge auto-badge--inactive">○ Inactivo</span>
}

/* ── Workflow flow diagram ── */
function WorkflowFlow({ nodes, connections, selectedNode, onSelectNode }) {
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

/* ── Node detail panel ── */
function NodeDetail({ node, onClose }) {
  if (!node) return null
  const desc = NODE_DESC[node.type] || 'Nodo de n8n'
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
          <p className="auto-node-params-title">Parámetros</p>
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

/* ── Workflow card ── */
function WorkflowCard({ workflow, expanded, onToggle }) {
  const [selectedNode, setSelectedNode] = useState(null)

  // Reset selected node when collapsed
  useEffect(() => {
    if (!expanded) setSelectedNode(null)
  }, [expanded])

  return (
    <div className={`auto-workflow-card ${expanded ? 'auto-workflow-card--expanded' : ''}`}
         style={{ '--wf-color': workflow.color }}>
      <button className="auto-workflow-header" onClick={onToggle}>
        <div className="auto-workflow-header-left">
          <StatusBadge active={workflow.active} status={workflow.status} />
          <h3 className="auto-workflow-name">{workflow.name}</h3>
        </div>
        <div className="auto-workflow-header-right">
          <span className="auto-workflow-node-count">{workflow.nodes.length} nodos</span>
          <span className="auto-workflow-chevron">{expanded ? '▲' : '▼'}</span>
        </div>
      </button>

      {expanded && (
        <div className="auto-workflow-body">
          <p className="auto-workflow-hint">Haz clic en un nodo para ver sus detalles</p>
          <WorkflowFlow
            nodes={workflow.nodes}
            connections={workflow.connections}
            selectedNode={selectedNode}
            onSelectNode={setSelectedNode}
          />
          {selectedNode && (
            <NodeDetail node={selectedNode} onClose={() => setSelectedNode(null)} />
          )}
        </div>
      )}
    </div>
  )
}

/* ── Main component ── */
export default function AutomationsPage() {
  const [tab, setTab] = useState('workflows')
  const [workflows, setWorkflows] = useState([])
  const [expandedId, setExpandedId] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data/automations.json')
      .then(r => r.json())
      .then(d => { setWorkflows(d.workflows); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  function toggleWorkflow(id) {
    setExpandedId(prev => prev === id ? null : id)
  }

  return (
    <div>
      {/* ── Hero ── */}
      <div className="auto-hero">
        <div className="auto-hero-inner">
          <div className="auto-hero-top">
            <span className="auto-hero-badge">Read-only · View only</span>
            <Link to="/ia-digox" className="auto-hero-link">IA Digox →</Link>
          </div>
          <h1 className="auto-hero-title">Automatizaciones & Agentes IA</h1>
          <p className="auto-hero-desc">
            Vista de solo lectura de los workflows de <strong>n8n</strong> y los agentes de{' '}
            <strong>Paperclip</strong> que operan <strong>IA Digox Services</strong>.
            Haz clic en los nodos para explorar la configuración de cada paso.
          </p>
          <div className="auto-hero-stats">
            {[
              { num: '4', lbl: 'Workflows n8n' },
              { num: '2', lbl: 'Activos 24/7' },
              { num: '5', lbl: 'Agentes Claude' },
              { num: '18', lbl: 'Nodos totales' },
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
          <button
            className={`auto-tab ${tab === 'workflows' ? 'auto-tab--active' : ''}`}
            onClick={() => setTab('workflows')}
          >
            <span>⚡</span> Workflows n8n
          </button>
          <button
            className={`auto-tab ${tab === 'agents' ? 'auto-tab--active' : ''}`}
            onClick={() => setTab('agents')}
          >
            <span>🤖</span> Agentes Paperclip
          </button>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="auto-content">

        {/* Workflows tab */}
        {tab === 'workflows' && (
          <div>
            <p className="auto-section-desc">
              Workflows reales extraídos de n8n vía API. Haz clic en una tarjeta para ver el flujo completo y la configuración de cada nodo.
            </p>
            {loading ? (
              <div className="loading">Cargando workflows…</div>
            ) : (
              <div className="auto-workflows-list">
                {workflows.map(wf => (
                  <WorkflowCard
                    key={wf.id}
                    workflow={wf}
                    expanded={expandedId === wf.id}
                    onToggle={() => toggleWorkflow(wf.id)}
                  />
                ))}
              </div>
            )}
            <div className="auto-notice">
              <span>🔒</span>
              <p>Vista de solo lectura. Los workflows se ejecutan en n8n self-hosted. No es posible modificar, activar ni ejecutar nada desde esta página.</p>
            </div>
          </div>
        )}

        {/* Agents tab */}
        {tab === 'agents' && (
          <div>
            <p className="auto-section-desc">
              Cinco agentes especializados operados por Claude (Anthropic) y orquestados desde Paperclip, el sistema nervioso central de IA Digox.
            </p>
            <div className="auto-agents-grid">
              {AGENTS.map(agent => (
                <div key={agent.role} className="auto-agent-card" style={{ '--agent-color': agent.color }}>
                  <div className="auto-agent-header">
                    <span className="auto-agent-icon">{agent.icon}</span>
                    <div>
                      <span className="auto-agent-role" style={{ color: agent.color }}>{agent.role}</span>
                      <p className="auto-agent-name">{agent.name}</p>
                    </div>
                    <span className="auto-agent-model">{agent.model}</span>
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
              <p>Vista de solo lectura. Los agentes operan de forma autónoma en Paperclip. No es posible interactuar con ellos desde esta página.</p>
            </div>
          </div>
        )}

      </div>

      <footer>
        <p>
          Sistema operado por agentes Claude (Anthropic) · n8n · Paperclip &middot;{' '}
          <Link to="/ia-digox">IA Digox Services</Link>
          {' '}&middot; Construido por <Link to="/">Guillermo Ubeda Garay</Link>
        </p>
      </footer>
    </div>
  )
}
