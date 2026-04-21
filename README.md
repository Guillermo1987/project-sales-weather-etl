# Sales & Weather ETL — Analytics Dashboard

> **Data Engineering Portfolio Project** · Python ETL Pipeline + React Dashboard
> **Status:** Finished · Deployed to production (2026-04)

[![Live Demo](https://img.shields.io/badge/Live%20Demo-%E2%86%92%20Open%20Dashboard-60a5fa?style=for-the-badge&logo=firebase&logoColor=white)](https://proyectos-personales.web.app)
[![Portfolio](https://img.shields.io/badge/Portfolio-proyectos--personales.web.app-8b5cf6?style=for-the-badge&logo=firebase&logoColor=white)](https://proyectos-personales.web.app)
[![Executive Dashboard](https://img.shields.io/badge/Also%20See-Executive%20Dashboard%20360°-34d399?style=for-the-badge)](https://proyectos-personales.web.app/executive)

---

## Project Status

| Phase | Status |
|---|---|
| Data sourcing (Kaggle) | Done |
| ETL pipeline (Python) | Done |
| Feature engineering | Done |
| React dashboard | Done |
| Firebase deployment | Done |
| Node.js fallback generator | Done |

**Current phase:** maintenance — live and serving portfolio visits.

---

## What This Project Does

A production-ready ETL pipeline that joins two independent data sources — Superstore Sales transactions and US City daily temperatures — into a single analytical dataset. The output is served as a live React dashboard on Firebase Hosting.

**Live dashboard → [proyectos-personales.web.app](https://proyectos-personales.web.app)**

---

## Architecture

```
data/raw/sales/train.csv ──────┐
                                ├──► Extract ──► Transform ──► Load ──► React Dashboard
data/raw/weather/               │
city_temperature.csv ──────────┘
```

| Layer | What it does |
|-------|-------------|
| **Extract** | Reads CSVs from two independent sources |
| **Transform** | Cleans, joins on city + date, engineers features |
| **Load** | Saves CSV warehouse + 6 pre-aggregated JSON files |
| **Visualize** | React + Recharts dashboard deployed on Firebase |

---

## Skills Demonstrated

- **Data Engineering (ETL):** Modular Extract → Transform → Load architecture
- **Python / Pandas:** Data cleaning, joins, feature engineering
- **Data Integration:** Merging two heterogeneous datasets on city + date key
- **Feature Engineering:** Temperature buckets, sales tiers, weekend flags
- **Web Deployment:** React dashboard served as static site on Firebase Hosting

---

## Charts & KPIs

| Chart | Insight |
|-------|---------|
| 5 KPI Summary Cards | Total revenue, orders, avg order, top category, peak month |
| Revenue by Category | Furniture vs Office Supplies vs Technology |
| Revenue by Region | US geographic distribution |
| Monthly Revenue Trend | 4-year trend with seasonality |
| Sales by Temperature | Weather impact on order volume |
| Weekend vs Weekday | Order patterns by day type |
| Temperature × Sales Scatter | Correlation analysis by category |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| ETL | Python 3.12, Pandas 2.2, NumPy |
| Web | React 19, Vite, Recharts |
| Hosting | Firebase Hosting (Spark plan) |
| Data | Kaggle — Superstore Sales × Daily Temperature of Major Cities |

---

## How to Run

```bash
# Clone
git clone https://github.com/mindset-code/project-sales-weather-etl.git
cd project-sales-weather-etl

# Run ETL (Python)
pip install -r requirements.txt
python etl_pipeline.py

# Start dashboard
cd web && npm install && npm run dev
```

> **No Python available?** Use the Node.js fallback: `node generate_json.mjs`

---

## Data Sources

| Dataset | Source | Rows |
|---------|--------|------|
| [Superstore Sales](https://www.kaggle.com/datasets/rohitsahoo/sales-forecasting) | Kaggle | 9,800 |
| [Daily Temperature of Major Cities](https://www.kaggle.com/datasets/sudalairajkumar/daily-temperature-of-major-cities) | Kaggle | ~2.9M |

---

## Also in This Repo

This project also hosts the **[Executive Dashboard 360°](https://proyectos-personales.web.app/executive)** — a BI portfolio project with 24 executive KPIs across Finance, RevOps and Marketing.

---

## Links

- **Portfolio:** [proyectos-personales.web.app](https://proyectos-personales.web.app)
- **LinkedIn:** [Mindset & Code](https://www.linkedin.com/company/mindset-code)
- **Email:** contacto@mindset-code.com

---

*Built by [Mindset & Code](https://github.com/mindset-code) · Data & BI Analyst · MBA · ISC2 CC*
