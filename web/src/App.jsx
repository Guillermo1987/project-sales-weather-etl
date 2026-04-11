import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar             from './components/Navbar'
import EtlDashboard       from './pages/EtlDashboard'
import ExecutiveDashboard from './pages/ExecutiveDashboard'
import ChurnDashboard     from './pages/ChurnDashboard'
import './App.css'

const ETL_FILES = [
  'sales_by_category', 'monthly_revenue', 'sales_by_temp',
  'sales_by_region', 'sales_weekend_vs_weekday', 'temp_vs_sales_scatter',
]

function EtlLoader() {
  const [data,    setData]    = useState({})
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    Promise.all(
      ETL_FILES.map(f =>
        fetch(`/data/${f}.json`).then(r => r.json()).then(d => [f, d])
      )
    )
      .then(results => { setData(Object.fromEntries(results)); setLoading(false) })
      .catch(e      => { setError(e.message);                  setLoading(false) })
  }, [])

  if (loading) return <div className="loading">Loading pipeline data...</div>
  if (error)   return <div className="error">Error loading data: {error}</div>
  return <EtlDashboard data={data} />
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"          element={<EtlLoader />} />
        <Route path="/executive" element={<ExecutiveDashboard />} />
        <Route path="/churn"     element={<ChurnDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}
