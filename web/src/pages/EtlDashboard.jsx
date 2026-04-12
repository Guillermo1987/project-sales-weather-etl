import HeroSection      from '../components/HeroSection'
import PortfolioFooter  from '../components/PortfolioFooter'
import KpiCards         from '../components/KpiCards'
import SalesByCategory  from '../components/SalesByCategory'
import MonthlyRevenue   from '../components/MonthlyRevenue'
import SalesByTemp      from '../components/SalesByTemp'
import SalesByRegion    from '../components/SalesByRegion'
import WeekendVsWeekday from '../components/WeekendVsWeekday'
import TempSalesScatter from '../components/TempSalesScatter'
import { useLang }      from '../contexts/LangContext'

const T = {
  es: {
    badge: 'Ingeniería de Datos',
    title: 'Pipeline ETL Ventas & Clima',
    description: 'Pipeline ETL end-to-end que integra transacciones de ventas de Superstore con temperaturas diarias de ciudades de EE.UU. Arquitectura modular Extract → Transform → Load con feature engineering y exportación automática a JSON.',
    stats: ['Pedidos procesados', 'Registros climáticos', 'Coincidencia de ciudades', 'Datos históricos'],
    footerData: 'Datos:',
    footerAnd: 'y',
  },
  en: {
    badge: 'Data Engineering',
    title: 'Sales & Weather ETL Pipeline',
    description: 'End-to-end ETL pipeline integrating Superstore Sales transactions with US City daily temperatures. Modular Extract → Transform → Load architecture with feature engineering and automated JSON exports.',
    stats: ['Orders processed', 'Weather records', 'City match rate', 'Historical data'],
    footerData: 'Data:',
    footerAnd: '&',
  },
}

export default function EtlDashboard({ data }) {
  const { lang } = useLang()
  const t = T[lang]
  const totalOrders = data.sales_by_category?.reduce((s, d) => s + d.num_orders, 0)

  const context = (
    <>
      {t.footerData}{' '}
      <a href="https://www.kaggle.com/datasets/rohitsahoo/sales-forecasting" target="_blank" rel="noreferrer">Superstore Sales</a>
      {' '}{t.footerAnd}{' '}
      <a href="https://www.kaggle.com/datasets/sudalairajkumar/daily-temperature-of-major-cities" target="_blank" rel="noreferrer">Daily Temperature of Major Cities</a>
      {' '}· Kaggle
    </>
  )

  return (
    <div className="dashboard">
      <HeroSection
        badge={t.badge}
        badgeColor="#60a5fa"
        title={t.title}
        description={t.description}
        stats={[
          { value: totalOrders ? totalOrders.toLocaleString() : '9,800', label: t.stats[0] },
          { value: '2.9M',  label: t.stats[1] },
          { value: '63%',   label: t.stats[2] },
          { value: '4 yrs', label: t.stats[3] },
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

      <PortfolioFooter context={context} />
    </div>
  )
}
