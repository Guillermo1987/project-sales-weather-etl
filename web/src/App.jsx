import { useState, useEffect } from 'react'
import KpiCards from './components/KpiCards'
import SalesByCategory from './components/SalesByCategory'
import MonthlyRevenue from './components/MonthlyRevenue'
import SalesByTemp from './components/SalesByTemp'
import SalesByRegion from './components/SalesByRegion'
import WeekendVsWeekday from './components/WeekendVsWeekday'
import TempSalesScatter from './components/TempSalesScatter'
import './App.css'

const DATA_FILES = [
  'sales_by_category',
  'monthly_revenue',
  'sales_by_temp',
  'sales_by_region',
  'sales_weekend_vs_weekday',
  'temp_vs_sales_scatter',
]

function App() {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    Promise.all(
      DATA_FILES.map((f) =>
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
  if (error) return <div className="error">Error loading data: {error}</div>

  return (
    <div className="dashboard">
      <header>
        <div className="header-top">
          <span className="badge">Data Engineering Portfolio</span>
        </div>
        <h1>Sales &amp; Weather ETL — Analytics Dashboard</h1>
        <p className="subtitle">
          Superstore Sales × US City Temperatures &middot; Python ETL Pipeline &middot;{' '}
          <a href="https://github.com/Guillermo1987/project-sales-weather-etl" target="_blank" rel="noreferrer">
            GitHub
          </a>{' '}
          &middot; Guillermo Ubeda
        </p>
      </header>

      <KpiCards
        category={data.sales_by_category}
        monthly={data.monthly_revenue}
        weekend={data.sales_weekend_vs_weekday}
      />

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

        <div className="grid grid-1">
          <TempSalesScatter data={data.temp_vs_sales_scatter} />
        </div>
      </main>

      <footer>
        <p>
          Data sources:{' '}
          <a href="https://www.kaggle.com/datasets/rohitsahoo/sales-forecasting" target="_blank" rel="noreferrer">
            Superstore Sales
          </a>{' '}
          &amp;{' '}
          <a href="https://www.kaggle.com/datasets/sudalairajkumar/daily-temperature-of-major-cities" target="_blank" rel="noreferrer">
            Daily Temperature of Major Cities
          </a>{' '}
          &middot; Kaggle &middot; Pipeline built with Python / Pandas
        </p>
      </footer>
    </div>
  )
}

export default App
