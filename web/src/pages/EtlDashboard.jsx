import HeroSection      from '../components/HeroSection'
import KpiCards         from '../components/KpiCards'
import SalesByCategory  from '../components/SalesByCategory'
import MonthlyRevenue   from '../components/MonthlyRevenue'
import SalesByTemp      from '../components/SalesByTemp'
import SalesByRegion    from '../components/SalesByRegion'
import WeekendVsWeekday from '../components/WeekendVsWeekday'
import TempSalesScatter from '../components/TempSalesScatter'

export default function EtlDashboard({ data }) {
  const totalRevenue = data.sales_by_category?.reduce((s, d) => s + d.total_sales, 0)
  const totalOrders  = data.sales_by_category?.reduce((s, d) => s + d.num_orders, 0)
  const matchPct     = data.temp_vs_sales_scatter?.length

  return (
    <div className="dashboard">
      <HeroSection
        badge="Data Engineering"
        badgeColor="#60a5fa"
        title="Sales & Weather ETL Pipeline"
        description="End-to-end ETL pipeline integrating Superstore Sales transactions with US City daily temperatures. Modular Extract → Transform → Load architecture with feature engineering and automated JSON exports."
        stats={[
          { value: totalOrders ? totalOrders.toLocaleString() : '9,800',  label: 'Orders processed' },
          { value: '2.9M',                                                  label: 'Weather records' },
          { value: '63%',                                                   label: 'City match rate' },
          { value: '4 yrs',                                                 label: 'Historical data' },
        ]}
        techs={['Python', 'Pandas', 'NumPy', 'React', 'Recharts', 'Firebase']}
        githubUrl="https://github.com/Guillermo1987/project-sales-weather-etl"
      />

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
          Data: <a href="https://www.kaggle.com/datasets/rohitsahoo/sales-forecasting" target="_blank" rel="noreferrer">Superstore Sales</a>
          {' '}&amp; <a href="https://www.kaggle.com/datasets/sudalairajkumar/daily-temperature-of-major-cities" target="_blank" rel="noreferrer">Daily Temperature of Major Cities</a>
          {' '}· Kaggle
        </p>
      </footer>
    </div>
  )
}
