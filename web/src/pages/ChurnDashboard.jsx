import { useState, useEffect } from 'react'
import HeroSection    from '../components/HeroSection'
import PortfolioFooter from '../components/PortfolioFooter'
import ChurnKpiCards  from '../components/churn/ChurnKpiCards'
import ConfusionMatrix from '../components/churn/ConfusionMatrix'
import FeatureImportance from '../components/churn/FeatureImportance'
import { ChurnBySubscription, ChurnByContract } from '../components/churn/ChurnBySegment'
import { ChurnByTickets, ChurnByCharges } from '../components/churn/ChurnDrivers'
import { useLang } from '../contexts/LangContext'

const T = {
  es: {
    badge: 'Ciencia de Datos',
    title: 'Análisis Predictivo de Churn',
    description: 'Modelo de Regresión Logística entrenado con 2.000 clientes sintéticos para predecir el riesgo de abandono. Identifica los drivers clave: tickets de soporte, duración del contrato y cargos mensuales.',
    stats: ['Tasa de Churn', 'Precisión', 'AUC-ROC', 'Variables'],
    loading: 'Cargando modelo de churn…',
    footerCtx: 'Modelo: Logistic Regression with StandardScaler · Stratified train/test split ·',
  },
  en: {
    badge: 'Data Science',
    title: 'Predictive Customer Churn Analysis',
    description: 'Logistic Regression model trained on 2,000 synthetic customers to predict churn risk. Identifies key drivers: support tickets, contract length and monthly charges.',
    stats: ['Churn Rate', 'Accuracy', 'AUC-ROC', 'Features'],
    loading: 'Loading churn model data…',
    footerCtx: 'Model: Logistic Regression with StandardScaler · Stratified train/test split ·',
  },
}

const CHURN_FILES = [
  'model_performance', 'confusion_matrix', 'feature_importance',
  'churn_by_subscription', 'churn_by_contract',
  'churn_by_tickets', 'churn_by_charges',
]

export default function ChurnDashboard() {
  const [data,    setData]    = useState({})
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)
  const { lang } = useLang()
  const t = T[lang]

  useEffect(() => {
    Promise.all(
      CHURN_FILES.map(f =>
        fetch(`/data/churn/${f}.json`).then(r => r.json()).then(d => [f, d])
      )
    )
      .then(results => { setData(Object.fromEntries(results)); setLoading(false) })
      .catch(e      => { setError(e.message);                  setLoading(false) })
  }, [])

  if (loading) return <div className="loading">{t.loading}</div>
  if (error)   return <div className="error">Error: {error}</div>

  const perf = data.model_performance

  const context = (
    <>
      {t.footerCtx}{' '}
      <a href="https://github.com/Guillermo1987/project-churn-analysis" target="_blank" rel="noreferrer">
        project-churn-analysis
      </a>
    </>
  )

  return (
    <div className="dashboard">
      <HeroSection
        badge={t.badge}
        badgeColor="#a78bfa"
        title={t.title}
        description={t.description}
        stats={[
          { value: perf ? `${(perf.churn_rate * 100).toFixed(0)}%` : '—', label: t.stats[0] },
          { value: perf ? `${(perf.accuracy * 100).toFixed(0)}%`   : '—', label: t.stats[1] },
          { value: perf ? perf.auc_roc.toFixed(2) : '—',                  label: t.stats[2] },
          { value: '9', label: t.stats[3] },
        ]}
        techs={['Python', 'Scikit-learn', 'Logistic Regression', 'Pandas', 'NumPy']}
        githubUrl="https://github.com/Guillermo1987/project-churn-analysis"
      />

      <ChurnKpiCards perf={perf} />

      <main>
        <div className="grid grid-2">
          <FeatureImportance data={data.feature_importance} />
          <ConfusionMatrix   data={data.confusion_matrix} />
        </div>
        <div className="grid grid-2">
          <ChurnBySubscription data={data.churn_by_subscription} />
          <ChurnByContract     data={data.churn_by_contract} />
        </div>
        <div className="grid grid-2">
          <ChurnByTickets data={data.churn_by_tickets} />
          <ChurnByCharges data={data.churn_by_charges} />
        </div>
      </main>

      <PortfolioFooter context={context} />
    </div>
  )
}
