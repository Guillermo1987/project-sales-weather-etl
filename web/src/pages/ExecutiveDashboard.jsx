import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ExecKpiCards     from '../components/executive/ExecKpiCards'
import RevenueTrend     from '../components/executive/RevenueTrend'
import RevenueBySegment from '../components/executive/RevenueBySegment'
import RevenueByChannel from '../components/executive/RevenueByChannel'
import CacLtvTrend      from '../components/executive/CacLtvTrend'
import MarketingFunnel  from '../components/executive/MarketingFunnel'
import PipelineFunnel   from '../components/executive/PipelineFunnel'
import ChurnNrrTrend    from '../components/executive/ChurnNrrTrend'

const EXEC_FILES = [
  'executive_summary',
  'revenue_by_segment',
  'revenue_by_channel',
  'marketing_funnel',
  'pipeline_stages',
]

export default function ExecutiveDashboard() {
  const [data,    setData]    = useState({})
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    Promise.all(
      EXEC_FILES.map((f) =>
        fetch(`/data/executive/${f}.json`)
          .then((r) => r.json())
          .then((d) => [f, d])
      )
    )
      .then((results) => { setData(Object.fromEntries(results)); setLoading(false) })
      .catch((e)      => { setError(e.message);                  setLoading(false) })
  }, [])

  if (loading) return <div className="loading">Loading executive data...</div>
  if (error)   return <div className="error">Error loading data: {error}</div>

  return (
    <div className="dashboard">
      <header>
        <div className="header-top">
          <span className="badge">BI Portfolio</span>
          <Link to="/" className="nav-back">← Sales &amp; Weather ETL</Link>
        </div>
        <h1>Executive Dashboard 360°</h1>
        <p className="subtitle">
          Finance · RevOps · Marketing · Pipeline &middot; 36-month synthetic dataset &middot;{' '}
          <a href="https://github.com/Guillermo1987/project-executive-dashboard-data" target="_blank" rel="noreferrer">
            GitHub
          </a>{' '}
          &middot; Guillermo Ubeda
        </p>
      </header>

      <ExecKpiCards data={data.executive_summary} />

      <main>
        <div className="grid grid-1">
          <RevenueTrend data={data.executive_summary} />
        </div>

        <div className="grid grid-2">
          <RevenueBySegment data={data.revenue_by_segment} />
          <RevenueByChannel data={data.revenue_by_channel} />
        </div>

        <div className="grid grid-2">
          <CacLtvTrend  data={data.executive_summary} />
          <ChurnNrrTrend data={data.executive_summary} />
        </div>

        <div className="grid grid-1">
          <MarketingFunnel data={data.marketing_funnel} />
        </div>

        <div className="grid grid-1">
          <PipelineFunnel data={data.pipeline_stages} />
        </div>
      </main>

      <footer>
        <p>
          Synthetic data generated with Python / Node.js &middot; Visualized with React + Recharts &middot;{' '}
          <a href="https://github.com/Guillermo1987/project-executive-dashboard-data" target="_blank" rel="noreferrer">
            project-executive-dashboard-data
          </a>
        </p>
      </footer>
    </div>
  )
}
