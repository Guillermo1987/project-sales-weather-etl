import { useState } from 'react'
import { useLang } from '../contexts/LangContext'
import PortfolioFooter from '../components/PortfolioFooter'

const SITE = 'https://proyectos-personales.web.app'

const DASHBOARDS = [
  {
    id: 'finance',
    icon: '💰',
    color: '#10b981',
    title: { es: 'Finance Dashboard', en: 'Finance Dashboard' },
    subtitle: { es: 'P&L ejecutivo · ARR · EBITDA · LTV:CAC · 36 meses', en: 'Executive P&L · ARR · EBITDA · LTV:CAC · 36 months' },
    kpis: ['ARR', 'Revenue', 'Gross Margin', 'EBITDA Margin', 'NRR', 'LTV:CAC'],
    desc: {
      es: 'Dashboard financiero ejecutivo con los 6 KPIs críticos para dirección. Tendencia mensual de revenue y EBITDA, distribución por canal y segmento, y márgenes de rentabilidad operativa sobre 36 meses de datos sintéticos.',
      en: 'Executive finance dashboard with 6 critical leadership KPIs. Monthly revenue and EBITDA trend, channel and segment distribution, and operating profitability margins over 36 months of synthetic data.',
    },
  },
  {
    id: 'marketing',
    icon: '📣',
    color: '#a78bfa',
    title: { es: 'Marketing Dashboard', en: 'Marketing Dashboard' },
    subtitle: { es: 'Performance Marketing · CPL · CAC · ROAS · Funnel', en: 'Performance Marketing · CPL · CAC · ROAS · Funnel' },
    kpis: ['Spend', 'MQLs', 'SQLs', 'Nuevos clientes', 'CPL', 'ROAS'],
    desc: {
      es: 'Dashboard de performance marketing con funnel de conversión MQL → SQL → cliente, eficiencia del gasto publicitario y evolución mensual de CAC y ROAS. Útil para RevOps y Growth.',
      en: 'Performance marketing dashboard with MQL → SQL → customer conversion funnel, ad-spend efficiency, and monthly CAC and ROAS evolution. Useful for RevOps and Growth.',
    },
  },
  {
    id: 'analytics',
    icon: '📈',
    color: '#60a5fa',
    title: { es: 'Data Analytics Dashboard', en: 'Data Analytics Dashboard' },
    subtitle: { es: 'Retail Analytics · 9.800 transacciones · Clima · Categoría · Región', en: 'Retail Analytics · 9,800 transactions · Weather · Category · Region' },
    kpis: ['Sales', 'Orders', 'AOV', 'Top category', 'Top region'],
    desc: {
      es: 'Dashboard de analítica retail con 9.800 transacciones Superstore cruzadas con datos de temperatura. Revenue mensual, distribución por región, feature engineering clima→ventas y patrón weekday vs weekend.',
      en: 'Retail analytics dashboard with 9,800 Superstore transactions joined with temperature data. Monthly revenue, region distribution, weather→sales feature engineering and weekday vs weekend pattern.',
    },
  },
]

const T = {
  es: {
    heroBadge: 'Dashboards listos para integrar',
    heroTitle: 'Dashboards Power BI & Tableau',
    heroTag:   'Tres dashboards HTML profesionales listos para embeber en Power BI (vía HTML Viewer custom visual) y en Tableau (vía Web Page object). Datos propios del portafolio, sin Kaggle externo.',
    previewBtn: 'Abrir en ventana completa',
    copyBtn:   'Copiar URL',
    copied:    '¡Copiado!',
    kpisLbl:   'KPIs incluidos',
    howTitle:  'Cómo embeber',
    pbiTitle:  'En Power BI Desktop',
    pbiSteps: [
      'Descarga el custom visual gratuito "HTML Viewer" (alias "HTML Content") desde AppSource.',
      'Añade un visual "HTML Viewer" al canvas.',
      'En la ficha "Format visual" → "HTML Content", pega la URL del dashboard (copia abajo).',
      'Publica al Power BI Service o exporta como .pbix.',
    ],
    tabTitle:  'En Tableau Desktop',
    tabSteps: [
      'En tu dashboard, arrastra un objeto "Web Page" desde el panel Objects.',
      'Pega la URL del dashboard en el campo URL.',
      'Ajusta el tamaño del contenedor (recomendado: 1200×700 px).',
      'Publica a Tableau Public o guarda como .twbx.',
    ],
    noteLbl:   'Nota',
    noteTxt:   'Los dashboards son self-contained (Chart.js desde CDN, datos inline). Funcionan sin CORS y sin backend. Datos sintéticos salvo Analytics, que usa Superstore (Kaggle) ya integrado en el ETL del portafolio.',
  },
  en: {
    heroBadge: 'Ready to embed',
    heroTitle: 'Power BI & Tableau Dashboards',
    heroTag:   'Three professional HTML dashboards ready to embed in Power BI (via HTML Viewer custom visual) and Tableau (via Web Page object). Portfolio-native data, no external Kaggle required.',
    previewBtn: 'Open full-screen',
    copyBtn:   'Copy URL',
    copied:    'Copied!',
    kpisLbl:   'Included KPIs',
    howTitle:  'How to embed',
    pbiTitle:  'In Power BI Desktop',
    pbiSteps: [
      'Download the free "HTML Viewer" (a.k.a. "HTML Content") custom visual from AppSource.',
      'Add an "HTML Viewer" visual to the canvas.',
      'On "Format visual" → "HTML Content", paste the dashboard URL (copy below).',
      'Publish to Power BI Service or export as .pbix.',
    ],
    tabTitle:  'In Tableau Desktop',
    tabSteps: [
      'On your dashboard, drag a "Web Page" object from the Objects panel.',
      'Paste the dashboard URL into the URL field.',
      'Adjust container size (recommended: 1200×700 px).',
      'Publish to Tableau Public or save as .twbx.',
    ],
    noteLbl:   'Note',
    noteTxt:   'Dashboards are self-contained (Chart.js via CDN, inline data). They work without CORS or backend. Synthetic data except Analytics, which uses Superstore (Kaggle) already integrated in the portfolio ETL.',
  },
}

function CopyBtn({ url, label, copiedLabel }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }}
      className="dash-copy-btn"
      style={{ background: copied ? '#10b981' : '#1e293b' }}
    >
      {copied ? copiedLabel : `${label} ↗`}
    </button>
  )
}

export default function DashboardsPage() {
  const { lang } = useLang()
  const t = T[lang]

  return (
    <div className="dashboards-page">
      <section className="dash-hero">
        <span className="dash-hero-badge">{t.heroBadge}</span>
        <h1 className="dash-hero-title">{t.heroTitle}</h1>
        <p className="dash-hero-tag">{t.heroTag}</p>
      </section>

      {DASHBOARDS.map((d) => {
        const url = `${SITE}/dashboards/${d.id}.html`
        return (
          <section key={d.id} className="dash-section" style={{ '--accent': d.color }}>
            <div className="dash-section-head">
              <div>
                <h2 className="dash-section-title">
                  <span className="dash-section-icon">{d.icon}</span>
                  {d.title[lang]}
                </h2>
                <p className="dash-section-sub">{d.subtitle[lang]}</p>
              </div>
              <div className="dash-section-actions">
                <a href={`/dashboards/${d.id}.html`} target="_blank" rel="noreferrer" className="dash-open-btn" style={{ background: d.color }}>
                  {t.previewBtn} ↗
                </a>
                <CopyBtn url={url} label={t.copyBtn} copiedLabel={t.copied} />
              </div>
            </div>

            <p className="dash-section-desc">{d.desc[lang]}</p>

            <div className="dash-preview">
              <iframe
                src={`/dashboards/${d.id}.html`}
                title={d.title[lang]}
                loading="lazy"
                className="dash-iframe"
              />
            </div>

            <div className="dash-kpi-pills">
              <span className="dash-kpi-lbl">{t.kpisLbl}:</span>
              {d.kpis.map((k) => (
                <span key={k} className="dash-kpi-pill" style={{ borderColor: d.color + '55', color: d.color }}>{k}</span>
              ))}
            </div>

            <div className="dash-url-box">
              <code>{url}</code>
              <CopyBtn url={url} label={t.copyBtn} copiedLabel={t.copied} />
            </div>
          </section>
        )
      })}

      <section className="dash-how">
        <h2 className="dash-how-title">{t.howTitle}</h2>
        <div className="dash-how-grid">
          <div className="dash-how-col">
            <h3>{t.pbiTitle}</h3>
            <ol>
              {t.pbiSteps.map((s, i) => <li key={i}>{s}</li>)}
            </ol>
          </div>
          <div className="dash-how-col">
            <h3>{t.tabTitle}</h3>
            <ol>
              {t.tabSteps.map((s, i) => <li key={i}>{s}</li>)}
            </ol>
          </div>
        </div>
        <p className="dash-how-note"><strong>{t.noteLbl}:</strong> {t.noteTxt}</p>
      </section>

      <PortfolioFooter />
    </div>
  )
}
