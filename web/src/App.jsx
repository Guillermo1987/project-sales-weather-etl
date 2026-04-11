import { useState, useEffect } from 'react'
import SalesByCategory from './components/SalesByCategory'
import MonthlyRevenue from './components/MonthlyRevenue'
import SalesByTemp from './components/SalesByTemp'
import SalesByRegion from './components/SalesByRegion'
import WeekendVsWeekday from './components/WeekendVsWeekday'
import './App.css'

function App() {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const files = [
      'sales_by_category',
      'monthly_revenue',
      'sales_by_temp',
      'sales_by_region',
      'sales_weekend_vs_weekday',
    ]

    Promise.all(
      files.map((f) =>
        fetch(`/data/${f}.json`)
          .then((r) => r.json())
          .then((d) => [f, d])
      )
    )
      .then((results) => {
        setData(Object.fromEntries(results))
        setLoading(false)
      })
      .catch((e) => {
        setError(e.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="loading">Loading pipeline data...</div>
  if (error) return <div className="error">Error: {error}</div>

  return (
    <div className="dashboard">
      <header>
        <h1>Sales &amp; Weather ETL — Analytics Dashboard</h1>
        <p className="subtitle">
          Superstore Sales × US City Temperatures · Pipeline output · Guillermo Ubeda
        </p>
      </header>

      <main>
        <div className="grid grid-2">
          <SalesByCategory data={data.sales_by_category} />
          <SalesByRegion data={data.sales_by_region} />
        </div>

        <div className="grid grid-1">
          <MonthlyRevenue data={data.monthly_revenue} />
        </div>

        <div className="grid grid-2">
          <SalesByTemp data={data.sales_by_temp} />
          <WeekendVsWeekday data={data.sales_weekend_vs_weekday} />
        </div>
      </main>

      <footer>
        <p>
          Data sources: <a href="https://www.kaggle.com/datasets/rohitsahoo/sales-forecasting" target="_blank" rel="noreferrer">Superstore Sales</a> &amp;{' '}
          <a href="https://www.kaggle.com/datasets/sudalairajkumar/daily-temperature-of-major-cities" target="_blank" rel="noreferrer">Daily Temperature of Major Cities</a> · Kaggle
        </p>
      </footer>
    </div>
  )
}

export default App
