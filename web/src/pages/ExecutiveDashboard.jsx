import { useState, useEffect } from 'react'
import HeroSection      from '../components/HeroSection'
import PortfolioFooter  from '../components/PortfolioFooter'
import ExecKpiCards     from '../components/executive/ExecKpiCards'
import RevenueTrend     from '../components/executive/RevenueTrend'
import RevenueBySegment from '../components/executive/RevenueBySegment'
import RevenueByChannel from '../components/executive/RevenueByChannel'
import CacLtvTrend      from '../components/executive/CacLtvTrend'
import MarketingFunnel  from '../components/executive/MarketingFunnel'
import PipelineFunnel   from '../components/executive/PipelineFunnel'
import ChurnNrrTrend    from '../components/executive/ChurnNrrTrend'
import { useLang }      from '../contexts/LangContext'

const T = {
  es: {
    badge: 'BI & RevOps',
    title: 'Executive Dashboard 360°',
    description: 'Fuente única de verdad para liderazgo en Finanzas, RevOps y Marketing. 24 KPIs interconectados que cubren ARR, CAC, LTV, NRR, salud del pipeline y eficiencia del funnel de marketing en 36 meses.',
    stats: ['KPIs monitorizados', 'Datos históricos', 'Segmentos', 'Canales'],
    loading: 'Cargando datos ejecutivos…',
    footerCtx: 'Datos sintéticos · Python / Node.js · React + Recharts ·',
  },
  en: {
    badge: 'BI & RevOps',
    title: 'Executive Dashboard 360°',
    description: 'Single source of truth for Finance, RevOps and Marketing leadership. 24 interconnected KPIs covering ARR, CAC, LTV, NRR, pipeline health and marketing funnel efficiency across 36 months.',
    stats: ['KPIs tracked', 'Historical data', 'Segments', 'Channels'],
    loading: 'Loading executive data…',
    footerCtx: 'Synthetic data · Python / Node.js · React + Recharts ·',
  },
}

const EXEC_FILES = [
  'executive_summary', 'revenue_by_segment',
  'revenue_by_channel', 'marketing_funnel', 'pipeline_stages',
]

export default function ExecutiveDashboard() {
  const [data,    setData]    = useState({})
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)
  const { lang } = useLang()
  const t = T[lang]

  useEffect(() => {
    Promise.all(
      EXEC_FILES.map(f =>
        fetch(`/data/executive/${f}.json`).then(r => r.json()).then(d => [f, d])
      )
    )
      .then(results => { setData(Object.fromEntries(results)); setLoading(false) })
      .catch(e      => { setError(e.message);                  setLoading(false) })
  }, [])

  if (loading) return <div className="loading">{t.loading}</div>
  if (error)   return <div className="error">Error: {error}</div>

  const context = (
    <>
      {t.footerCtx}{' '}
      <a href="https://github.com/Guillermo1987/project-executive-dashboard-data" target="_blank" rel="noreferrer">
        project-executive-dashboard-data
      </a>
    </>
  )

  return (
    <div className="dashboard">
      <HeroSection
        badge={t.badge}
        badgeColor="#34d399"
        title={t.title}
        description={t.description}
        stats={[
          { value: '24',   label: t.stats[0] },
          { value: '36mo', label: t.stats[1] },
          { value: '3',    label: t.stats[2] },
          { value: '4',    label: t.stats[3] },
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

      <PortfolioFooter context={context} />
    </div>
  )
}
