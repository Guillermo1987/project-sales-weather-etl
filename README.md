# ⚙️ Proyecto 5: Pipeline ETL de Clima y Ventas (Data Engineering)

## Resumen del Proyecto
Este proyecto demuestra mi competencia como **Ingeniero de Datos** al construir un *pipeline* de **ETL (Extract, Transform, Load)** que integra datos de dos fuentes dispares: **datos de ventas** y **datos de clima**. El objetivo es crear un conjunto de datos unificado y limpio, listo para el análisis de Business Intelligence, que permita a los analistas investigar la correlación entre las condiciones climáticas y el rendimiento de las ventas.

Este proyecto es fundamental para roles de Ingeniería de Datos y BI, ya que demuestra el manejo de la infraestructura de datos.

## Habilidades Demostradas
*   **Ingeniería de Datos (ETL):** Diseño e implementación de un proceso de tres etapas (Extracción, Transformación y Carga).
*   **Programación:** Uso de Python (Pandas) para manipulación y transformación de datos.
*   **Integración de Datos:** Uso de `pd.merge` para unir *datasets* basados en una clave común (fecha).
*   **Feature Engineering:** Creación de nuevas métricas (`Sales_Per_Unit`) y categorización de datos (`Temperature_Category`).
*   **Data Warehousing:** Simulación de la carga de datos limpios en un destino final (CSV).

## Estructura del Repositorio
*   `etl_pipeline.py`: Script principal de Python que ejecuta todo el proceso ETL.
*   `sales_weather_data_warehouse.csv`: El *dataset* final, limpio y listo para el análisis de BI.
*   `pipeline_output_sample.md`: Muestra de las primeras filas del *dataset* final.
*   `README.md`: Este archivo.

## Hallazgos Clave (Potenciales)
El *pipeline* permite a los analistas responder preguntas como:
*   ¿Cómo afecta la precipitación a los ingresos por ventas?
*   ¿Las ventas son significativamente más altas en días calurosos o en fines de semana?
*   ¿Qué categoría de temperatura genera el mayor ingreso promedio?

## Cómo Ejecutar
1.  Clonar el repositorio.
2.  Instalar las dependencias: `pip install pandas numpy`
3.  Ejecutar el *pipeline*: `python etl_pipeline.py`
4.  El archivo `sales_weather_data_warehouse.csv` se generará en el directorio.
