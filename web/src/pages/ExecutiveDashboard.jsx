import { useState, useEffect } from 'react'
import HeroSection      from '../components/HeroSection'
import ExecKpiCards     from '../components/executive/ExecKpiCards'
import RevenueTrend     from '../components/executive/RevenueTrend'
import RevenueBySegment from '../components/executive/RevenueBySegment'
import RevenueByChannel from '../components/executive/RevenueByChannel'
import CacLtvTrend      from '../components/executive/CacLtvTrend'
import MarketingFunnel  from '../components/executive/MarketingFunnel'
import PipelineFunnel   from '../components/executive/PipelineFunnel'
import ChurnNrrTrend    from '../components/executive/ChurnNrrTrend'

const EXEC_FILES = [
  'executive_summary', 'revenue_by_segment',
  'revenue_by_channel', 'marketing_funnel', 'pipeline_stages',
]

export default function ExecutiveDashboard() {
  const [data,    setData]    = useState({})
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    Promise.all(
      EXEC_FILES.map(f =>
        fetch(`/data/executive/${f}.json`).then(r => r.json()).then(d => [f, d])
      )
    )
      .then(results => { setData(Object.fromEntries(results)); setLoading(false) })
      .catch(e      => { setError(e.message);                  setLoading(false) })
  }, [])

  if (loading) return <div className="loading">Loading executive data...</div>
  if (error)   return <div className="error">Error loading data: {error}</div>

  const last = data.executive_summary?.at(-1)

  return (
    <div className="dashboard">
      <HeroSection
        badge="BI & RevOps"
        badgeColor="#34d399"
        title="Executive Dashboard 360°"
        description="Single source of truth for Finance, RevOps and Marketing leadership. 24 interconnected KPIs covering ARR, CAC, LTV, NRR, pipeline health and marketing funnel efficiency across 36 months."
        stats={[
          { value: '24',    label: 'KPIs tracked' },
          { value: '36mo',  label: 'Historical data' },
          { value: '3',     label: 'Segments' },
          { value: '4',     label: 'Channels' },
        ]}
        techs={['Python', 'Pandas', 'NumPy', 'React', 'Recharts', 'Firebase']}
        githubUrl="https://github.com/Guillermo1987/project-executive-dashboard-data"
      />

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
          <CacLtvTrend   data={data.executive_summary} />
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
          Synthetic data · Python / Node.js · React + Recharts &middot;{' '}
          <a href="https://github.com/Guillermo1987/project-executive-dashboard-data" target="_blank" rel="noreferrer">
            project-executive-dashboard-data
          </a>
        </p>
      </footer>
    </div>
  )
}
