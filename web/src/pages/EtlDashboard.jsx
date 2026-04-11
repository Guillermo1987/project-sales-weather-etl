import { Link } from 'react-router-dom'
import KpiCards        from '../components/KpiCards'
import SalesByCategory from '../components/SalesByCategory'
import MonthlyRevenue  from '../components/MonthlyRevenue'
import SalesByTemp     from '../components/SalesByTemp'
import SalesByRegion   from '../components/SalesByRegion'
import WeekendVsWeekday from '../components/WeekendVsWeekday'
import TempSalesScatter from '../components/TempSalesScatter'

export default function EtlDashboard({ data }) {
  return (
    <div className="dashboard">
      <header>
        <div className="header-top">
          <span className="badge">Data Engineering Portfolio</span>
          <Link to="/executive" className="nav-link">Executive Dashboard 360° →</Link>
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
          <SalesByRegion   data={data.sales_by_region} />
        </div>

        <div className="grid grid-1">
          <MonthlyRevenue data={data.monthly_revenue} />
        </div>

        <div className="grid grid-2">
          <SalesByTemp      data={data.sales_by_temp} />
          <WeekendVsWeekday data={data.sales_weekend_vs_weekday} />
        </div>

        <div className="grid grid-1">
          <TempSalesScatter data={data.temp_vs_sales_scatter} />
        </div>
      </main>

      <footer>
        <p>
          Data sources:{' '}
          <a href="https://www.kaggle.com/datasets/rohitsahoo/sales-forecasting" target="_blank" rel="noreferrer">Superstore Sales</a>
          {' '}&amp;{' '}
          <a href="https://www.kaggle.com/datasets/sudalairajkumar/daily-temperature-of-major-cities" target="_blank" rel="noreferrer">Daily Temperature of Major Cities</a>
          {' '}&middot; Kaggle &middot; Pipeline built with Python / Pandas
        </p>
      </footer>
    </div>
  )
}
