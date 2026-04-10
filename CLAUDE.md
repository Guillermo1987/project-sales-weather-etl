# Sales & Weather ETL Pipeline — Data Engineering

## Qué es este proyecto
Pipeline de **ETL (Extract, Transform, Load)** en Python que integra datos de ventas y datos climáticos en un único dataset limpio y enriquecido, listo para análisis de BI. Permite investigar la correlación entre condiciones meteorológicas y rendimiento de ventas.

Proyecto de portafolio LinkedIn — demuestra competencias de Data Engineering e integración de datos.

## Stack técnico
- **Python:** Pandas, NumPy
- **Patrón:** ETL en 3 etapas (Extract → Transform → Load)
- **Output:** CSV para análisis BI downstream

## Archivos clave
- `etl_pipeline.py` — pipeline completo: extracción simulada, transformación y carga
- `sales_weather_data_warehouse.csv` — dataset final limpio y listo para BI
- `README.md` — documentación del pipeline y hallazgos clave

## Etapas del pipeline

### 1. Extract
- `extract_weather_data()` — simula extracción de datos climáticos (temperatura, precipitación, fin de semana)
- `extract_sales_data()` — simula extracción de ventas con lógica de negocio (boost fines de semana, penalización lluvia)

### 2. Transform
- Join de ambos datasets por fecha (`pd.merge`)
- Feature Engineering: `Sales_Per_Unit`, `Temperature_Category`
- Limpieza y normalización de columnas

### 3. Load
- Exportación a CSV (`sales_weather_data_warehouse.csv`)

## Cómo ejecutar
```bash
pip install pandas numpy
python etl_pipeline.py
# Genera: sales_weather_data_warehouse.csv
```

## Extensiones posibles
- Conectar a API meteorológica real (Open-Meteo, gratuita)
- Conectar a datos de ventas reales desde CRM o base de datos
- Añadir capa de validación de datos (Great Expectations)
- Orquestar con n8n para ejecución periódica automatizada
- Cargar a BigQuery o PostgreSQL en lugar de CSV

## Relevancia para el portafolio
Demuestra: ETL design, Pandas, integración de fuentes, feature engineering, data warehousing.
Roles objetivo: Data Engineer, Analytics Engineer, BI Developer.
