import { NavLink } from 'react-router-dom'

const PROJECTS = [
  {
    to: '/',
    label: 'Sales & Weather ETL',
    badge: 'Data Engineering',
    icon: '⚙️',
  },
  {
    to: '/executive',
    label: 'Executive Dashboard 360°',
    badge: 'BI & RevOps',
    icon: '📊',
  },
  {
    to: '/churn',
    label: 'Churn Analysis',
    badge: 'Data Science',
    icon: '🔬',
  },
]

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-name">Guillermo Ubeda</span>
        <span className="navbar-role">Data & BI Analyst</span>
      </div>
      <div className="navbar-tabs">
        {PROJECTS.map(({ to, label, badge, icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `navbar-tab ${isActive ? 'navbar-tab--active' : ''}`
            }
          >
            <span className="tab-icon">{icon}</span>
            <span className="tab-label">{label}</span>
            <span className="tab-badge">{badge}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
