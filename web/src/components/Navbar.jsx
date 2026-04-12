import { useState, useRef, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useLang } from '../contexts/LangContext'

const PROJECTS = [
  { to: '/',          label: 'Sobre mí',               badge: 'Portada',             icon: '👤', color: '#94a3b8' },
  { to: '/etl',       label: 'Sales & Weather ETL',     badge: 'Data Engineering',   icon: '⚙️', color: '#60a5fa' },
  { to: '/executive', label: 'Executive Dashboard 360°',badge: 'BI & RevOps',         icon: '📊', color: '#34d399' },
  { to: '/churn',     label: 'Churn Analysis',          badge: 'Data Science',        icon: '🔬', color: '#a78bfa' },
  { to: '/hotel',     label: 'Hotel Pricing Engine',    badge: 'Revenue Management',  icon: '🏨', color: '#fb923c' },
  { to: '/ia-digox',     label: 'IA Digox Services',    badge: 'AI Automation',    icon: '🤖', color: '#f472b6' },
  { to: '/automations',  label: 'Automatizaciones',     badge: 'n8n · Paperclip',  icon: '⚡', color: '#a78bfa' },
]

export default function Navbar() {
  const [open, setOpen]   = useState(false)
  const location          = useLocation()
  const ref               = useRef(null)
  const { lang, toggleLang } = useLang()

  const active = PROJECTS.find(p =>
    p.to === '/' ? location.pathname === '/' : location.pathname.startsWith(p.to)
  ) ?? PROJECTS[0]

  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => { setOpen(false) }, [location.pathname])

  return (
    <nav className="navbar" ref={ref}>
      <div className="navbar-brand">
        <span className="navbar-name">Guillermo Ubeda</span>
        <span className="navbar-role">Data &amp; BI Analyst</span>
      </div>

      <button className="lang-toggle nav-lang-toggle" onClick={toggleLang}>
        {lang === 'es' ? '🇬🇧 EN' : '🇪🇸 ES'}
      </button>

      <button
        className={`nav-trigger ${open ? 'nav-trigger--open' : ''}`}
        onClick={() => setOpen(o => !o)}
        style={{ '--trigger-color': active.color }}
      >
        <span className="nav-trigger-icon">{active.icon}</span>
        <div className="nav-trigger-text">
          <span className="nav-trigger-label">{active.label}</span>
          <span className="nav-trigger-badge" style={{ color: active.color }}>{active.badge}</span>
        </div>
        <svg className="nav-trigger-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {open && (
        <div className="nav-dropdown">
          {PROJECTS.map(({ to, label, badge, icon, color }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `nav-dropdown-item ${isActive ? 'nav-dropdown-item--active' : ''}`
              }
              style={({ isActive }) => isActive ? { '--item-color': color } : {}}
            >
              <span className="nav-item-icon">{icon}</span>
              <div className="nav-item-text">
                <span className="nav-item-label">{label}</span>
                <span className="nav-item-badge" style={{ color }}>{badge}</span>
              </div>
              <svg className="nav-item-check" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 7l3.5 3.5 5.5-6" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  )
}
