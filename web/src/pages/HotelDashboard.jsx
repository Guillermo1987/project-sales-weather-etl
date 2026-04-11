import { useState, useEffect } from 'react'
import HeroSection       from '../components/HeroSection'
import HotelKpiCards     from '../components/hotel/HotelKpiCards'
import RevParTrend       from '../components/hotel/RevParTrend'
import OccupancyByDow    from '../components/hotel/OccupancyByDow'
import RevenueByRoomType from '../components/hotel/RevenueByRoomType'
import PriceForecast     from '../components/hotel/PriceForecast'
import PricingFactors    from '../components/hotel/PricingFactors'

const HOTEL_FILES = [
  'kpis', 'monthly_trend', 'revenue_by_room',
  'occupancy_by_dow', 'forecast', 'pricing_factors',
]

export default function HotelDashboard() {
  const [data,    setData]    = useState({})
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    Promise.all(
      HOTEL_FILES.map(f =>
        fetch(`/data/hotel/${f}.json`).then(r => r.json()).then(d => [f, d])
      )
    )
      .then(results => { setData(Object.fromEntries(results)); setLoading(false) })
      .catch(e      => { setError(e.message);                  setLoading(false) })
  }, [])

  if (loading) return <div className="loading">Loading pricing engine data...</div>
  if (error)   return <div className="error">Error loading data: {error}</div>

  const k = data.kpis

  return (
    <div className="dashboard">
      <HeroSection
        badge="Revenue Management"
        badgeColor="#fb923c"
        title="Hotel Dynamic Pricing Engine"
        description="Algorithmic revenue management model that adjusts room rates in real time based on seasonality, day-of-week demand, local events, occupancy pressure and lead time. Generates 2 years of historical data and a 60-day forward price forecast across 3 room types."
        stats={[
          { value: k ? `$${k.avg_adr.toFixed(0)}`                    : '—', label: 'Avg ADR' },
          { value: k ? `${(k.avg_occupancy * 100).toFixed(0)}%`       : '—', label: 'Occupancy' },
          { value: '6',                                                       label: 'Pricing factors' },
          { value: k ? `${k.forecast_days}d`                          : '—', label: 'Forecast horizon' },
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

      <footer>
        <p>
          Synthetic data · Rule-based pricing engine · Python / Node.js · React + Recharts &middot;{' '}
          <a href="https://github.com/Guillermo1987/project-hotel-pricing-engine" target="_blank" rel="noreferrer">
            project-hotel-pricing-engine
          </a>
        </p>
      </footer>
    </div>
  )
}
