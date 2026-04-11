import { NavLink } from 'react-router-dom'

const PROJECTS = [
  { to: '/',          label: 'Sales & Weather ETL',      badge: 'Data Engineering',   icon: '⚙️', color: '#60a5fa' },
  { to: '/executive', label: 'Executive Dashboard 360°', badge: 'BI & RevOps',         icon: '📊', color: '#34d399' },
  { to: '/churn',     label: 'Churn Analysis',           badge: 'Data Science',        icon: '🔬', color: '#a78bfa' },
  { to: '/hotel',     label: 'Hotel Pricing Engine',     badge: 'Revenue Management',  icon: '🏨', color: '#fb923c' },
]

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-name">Guillermo Ubeda</span>
        <span className="navbar-role">Data &amp; BI Analyst</span>
      </div>

      <div className="navbar-divider" />

      <div className="navbar-tabs">
        {PROJECTS.map(({ to, label, badge, icon, color }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `navbar-tab ${isActive ? 'navbar-tab--active' : ''}`
            }
            style={({ isActive }) => isActive ? { '--tab-color': color } : {}}
          >
            <span className="tab-icon">{icon}</span>
            <div className="tab-text">
              <span className="tab-label">{label}</span>
              <span className="tab-badge" style={{ '--badge-color': color }}>{badge}</span>
            </div>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
