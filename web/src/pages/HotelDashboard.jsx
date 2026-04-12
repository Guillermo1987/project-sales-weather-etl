import { useState, useEffect } from 'react'
import HeroSection       from '../components/HeroSection'
import PortfolioFooter   from '../components/PortfolioFooter'
import HotelKpiCards     from '../components/hotel/HotelKpiCards'
import RevParTrend       from '../components/hotel/RevParTrend'
import OccupancyByDow    from '../components/hotel/OccupancyByDow'
import RevenueByRoomType from '../components/hotel/RevenueByRoomType'
import PriceForecast     from '../components/hotel/PriceForecast'
import PricingFactors    from '../components/hotel/PricingFactors'
import { useLang }       from '../contexts/LangContext'

const T = {
  es: {
    badge: 'Revenue Management',
    title: 'Motor de Precios Dinámicos — Hotel',
    description: 'Modelo algorítmico de gestión de ingresos que ajusta las tarifas en tiempo real según estacionalidad, demanda por día de la semana, eventos locales, presión de ocupación y antelación. Genera 2 años de datos históricos y una previsión de precios a 60 días en 3 tipos de habitación.',
    stats: ['ADR Promedio', 'Ocupación', 'Factores de precio', 'Horizonte de previsión'],
    loading: 'Cargando motor de precios…',
    footerCtx: 'Datos sintéticos · Motor de precios basado en reglas · Python / Node.js · React + Recharts ·',
  },
  en: {
    badge: 'Revenue Management',
    title: 'Hotel Dynamic Pricing Engine',
    description: 'Algorithmic revenue management model that adjusts room rates in real time based on seasonality, day-of-week demand, local events, occupancy pressure and lead time. Generates 2 years of historical data and a 60-day forward price forecast across 3 room types.',
    stats: ['Avg ADR', 'Occupancy', 'Pricing factors', 'Forecast horizon'],
    loading: 'Loading pricing engine data…',
    footerCtx: 'Synthetic data · Rule-based pricing engine · Python / Node.js · React + Recharts ·',
  },
}

const HOTEL_FILES = [
  'kpis', 'monthly_trend', 'revenue_by_room',
  'occupancy_by_dow', 'forecast', 'pricing_factors',
]

export default function HotelDashboard() {
  const [data,    setData]    = useState({})
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)
  const { lang } = useLang()
  const t = T[lang]

  useEffect(() => {
    Promise.all(
      HOTEL_FILES.map(f =>
        fetch(`/data/hotel/${f}.json`).then(r => r.json()).then(d => [f, d])
      )
    )
      .then(results => { setData(Object.fromEntries(results)); setLoading(false) })
      .catch(e      => { setError(e.message);                  setLoading(false) })
  }, [])

  if (loading) return <div className="loading">{t.loading}</div>
  if (error)   return <div className="error">Error: {error}</div>

  const k = data.kpis

  const context = (
    <>
      {t.footerCtx}{' '}
      <a href="https://github.com/Guillermo1987/project-hotel-pricing-engine" target="_blank" rel="noreferrer">
        project-hotel-pricing-engine
      </a>
    </>
  )

  return (
    <div className="dashboard">
      <HeroSection
        badge={t.badge}
        badgeColor="#fb923c"
        title={t.title}
        description={t.description}
        stats={[
          { value: k ? `$${k.avg_adr.toFixed(0)}`                  : '—', label: t.stats[0] },
          { value: k ? `${(k.avg_occupancy * 100).toFixed(0)}%`     : '—', label: t.stats[1] },
          { value: '6',                                                     label: t.stats[2] },
          { value: k ? `${k.forecast_days}d`                        : '—', label: t.stats[3] },
        ]}
        techs={['Python', 'Pandas', 'NumPy', 'React', 'Recharts', 'Revenue Management']}
        githubUrl="https://github.com/Guillermo1987/project-hotel-pricing-engine"
      />

      <HotelKpiCards kpis={data.kpis} />

      <main>
        <div className="grid grid-1">
          <RevParTrend data={data.monthly_trend} />
        </div>
        <div className="grid grid-1">
          <PriceForecast data={data.forecast} />
        </div>
        <div className="grid grid-2">
          <OccupancyByDow    data={data.occupancy_by_dow} />
          <RevenueByRoomType data={data.revenue_by_room} />
        </div>
        <div className="grid grid-1">
          <PricingFactors data={data.pricing_factors} />
        </div>
      </main>

      <PortfolioFooter context={context} />
    </div>
  )
}
