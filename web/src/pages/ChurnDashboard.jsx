import { useState, useEffect } from 'react'
import HeroSection    from '../components/HeroSection'
import ChurnKpiCards  from '../components/churn/ChurnKpiCards'
import ConfusionMatrix from '../components/churn/ConfusionMatrix'
import FeatureImportance from '../components/churn/FeatureImportance'
import { ChurnBySubscription, ChurnByContract } from '../components/churn/ChurnBySegment'
import { ChurnByTickets, ChurnByCharges } from '../components/churn/ChurnDrivers'

const CHURN_FILES = [
  'model_performance', 'confusion_matrix', 'feature_importance',
  'churn_by_subscription', 'churn_by_contract',
  'churn_by_tickets', 'churn_by_charges',
]

export default function ChurnDashboard() {
  const [data,    setData]    = useState({})
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    Promise.all(
      CHURN_FILES.map(f =>
        fetch(`/data/churn/${f}.json`).then(r => r.json()).then(d => [f, d])
      )
    )
      .then(results => { setData(Object.fromEntries(results)); setLoading(false) })
      .catch(e      => { setError(e.message);                  setLoading(false) })
  }, [])

  if (loading) return <div className="loading">Loading churn model data...</div>
  if (error)   return <div className="error">Error loading data: {error}</div>

  const perf = data.model_performance

  return (
    <div className="dashboard">
      <HeroSection
        badge="Data Science"
        badgeColor="#a78bfa"
        title="Predictive Customer Churn Analysis"
        description="Logistic Regression model trained on 2,000 synthetic customers to predict churn risk. Identifies key drivers: support tickets, contract length and monthly charges."
        stats={[
          { value: perf ? `${(perf.churn_rate * 100).toFixed(0)}%` : '—', label: 'Churn Rate' },
          { value: perf ? `${(perf.accuracy * 100).toFixed(0)}%`   : '—', label: 'Accuracy' },
          { value: perf ? perf.auc_roc.toFixed(2) : '—',                  label: 'AUC-ROC' },
          { value: '9', label: 'Features' },
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

      <footer>
        <p>
          Model: Logistic Regression with StandardScaler &middot; Stratified train/test split &middot;{' '}
          <a href="https://github.com/Guillermo1987/project-churn-analysis" target="_blank" rel="noreferrer">
            project-churn-analysis
          </a>
        </p>
      </footer>
    </div>
  )
}
