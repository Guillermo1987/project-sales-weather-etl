"""
Pruebas del ETL de ventas y meteorologia.

El defecto que persiguen la mitad de estas pruebas es el clasico de cualquier
ETL con un join: si la tabla de la derecha tiene la clave repetida, el LEFT JOIN
no falla -- DUPLICA las filas de la izquierda. Nadie ve un error; simplemente el
panel publica el doble de facturacion. Por eso hay dos invariantes fijadas aqui
que no se pueden relajar:

  1. clean_weather devuelve como mucho una fila por (ciudad, dia).
  2. join_sales_weather nunca devuelve mas filas de las que recibio en ventas,
     y la suma de 'sales' antes y despues del join es identica.

La segunda es la que de verdad protege el numero publicado, porque se cumple
aunque alguien salte clean_weather y meta la tabla cruda.
"""

import numpy as np
import pandas as pd
import pytest

from src.transform import (
    clean_sales,
    clean_weather,
    engineer_features,
    join_sales_weather,
    transform,
)


# --- Material de trabajo --------------------------------------------------


def ventas(filas=None):
    """Ventas en crudo, con los nombres de columna del Superstore original."""
    if filas is None:
        filas = [
            ("2023-01-02", "New York City", "East", "Furniture", 100.0, 2),
            ("2023-01-07", "Los Angeles", "West", "Technology", 250.0, 1),
            ("2023-06-15", "Chicago", "Central", "Office Supplies", 40.0, 4),
        ]
    return pd.DataFrame(
        filas,
        columns=["Order Date", "City", "Region", "Category", "Sales", "Quantity"],
    )


def meteo(filas=None):
    """Temperaturas en crudo: una fila por estacion y dia, en Fahrenheit."""
    if filas is None:
        filas = [
            ("New York City", "2023-01-02", 41.0),
            ("Los Angeles", "2023-01-07", 68.0),
            ("Chicago", "2023-06-15", 86.0),
        ]
    return pd.DataFrame(filas, columns=["City", "date", "AvgTemperature"])


# --- Limpieza de ventas ---------------------------------------------------


class TestLimpiezaDeVentas:
    def test_los_nombres_de_columna_quedan_en_minuscula_y_con_guion_bajo(self):
        salida = clean_sales(ventas())
        assert "order_date" in salida.columns
        assert "city" in salida.columns
        assert not [c for c in salida.columns if c != c.lower() or " " in c]

    def test_no_toca_el_dataframe_que_recibe(self):
        entrada = ventas()
        columnas_antes = list(entrada.columns)
        clean_sales(entrada)
        assert list(entrada.columns) == columnas_antes

    def test_la_fecha_queda_como_fecha_y_no_como_texto(self):
        salida = clean_sales(ventas())
        assert pd.api.types.is_datetime64_any_dtype(salida["order_date"])

    @pytest.mark.parametrize(
        "fecha, anio, mes, trimestre, dia_semana, fin_de_semana",
        [
            ("2023-01-02", 2023, 1, 1, "Monday", False),
            ("2023-06-15", 2023, 6, 2, "Thursday", False),
            ("2023-07-01", 2023, 7, 3, "Saturday", True),
            ("2023-10-01", 2023, 10, 4, "Sunday", True),
        ],
    )
    def test_los_campos_derivados_de_la_fecha_son_los_del_calendario(
        self, fecha, anio, mes, trimestre, dia_semana, fin_de_semana
    ):
        fila = [(fecha, "Chicago", "Central", "Furniture", 10.0, 1)]
        salida = clean_sales(ventas(fila)).iloc[0]
        assert salida["year"] == anio
        assert salida["month"] == mes
        assert salida["quarter"] == trimestre
        assert salida["day_of_week"] == dia_semana
        assert bool(salida["is_weekend"]) is fin_de_semana

    def test_no_pierde_ni_inventa_filas(self):
        entrada = ventas()
        assert len(clean_sales(entrada)) == len(entrada)

    def test_aguanta_una_tabla_vacia(self):
        vacia = ventas().iloc[0:0]
        salida = clean_sales(vacia)
        assert len(salida) == 0
        assert "is_weekend" in salida.columns


# --- Limpieza de meteorologia ---------------------------------------------


class TestLimpiezaDeMeteorologia:
    def test_una_ciudad_con_dos_estaciones_deja_una_sola_fila_con_la_media(self):
        crudo = meteo(
            [
                ("Chicago", "2023-06-15", 80.0),
                ("Chicago", "2023-06-15", 90.0),
            ]
        )
        salida = clean_weather(crudo)
        assert len(salida) == 1
        assert salida.iloc[0]["avg_temp_f"] == pytest.approx(85.0)

    def test_la_clave_ciudad_dia_es_unica(self):
        """Si esto se rompe, el join de mas abajo duplica facturacion."""
        crudo = meteo(
            [
                ("Chicago", "2023-06-15", 80.0),
                ("Chicago", "2023-06-15", 90.0),
                ("Chicago", "2023-06-16", 70.0),
                ("Denver", "2023-06-15", 60.0),
            ]
        )
        salida = clean_weather(crudo)
        assert not salida.duplicated(subset=["city", "date"]).any()
        assert len(salida) == 3

    @pytest.mark.parametrize(
        "fahrenheit, celsius",
        [(32.0, 0.0), (212.0, 100.0), (68.0, 20.0), (-40.0, -40.0), (98.6, 37.0)],
    )
    def test_la_conversion_a_celsius_es_la_formula_oficial(self, fahrenheit, celsius):
        salida = clean_weather(meteo([("Chicago", "2023-06-15", fahrenheit)]))
        assert salida.iloc[0]["avg_temp_c"] == pytest.approx(celsius, abs=0.05)

    def test_renombra_la_columna_de_ciudad_a_minuscula(self):
        salida = clean_weather(meteo())
        assert "city" in salida.columns
        assert "City" not in salida.columns

    def test_no_toca_el_dataframe_que_recibe(self):
        entrada = meteo()
        columnas_antes = list(entrada.columns)
        clean_weather(entrada)
        assert list(entrada.columns) == columnas_antes


# --- El join --------------------------------------------------------------


class TestJoin:
    def test_conserva_exactamente_las_filas_de_ventas(self):
        v = clean_sales(ventas())
        m = clean_weather(meteo())
        assert len(join_sales_weather(v, m)) == len(v)

    def test_una_ciudad_sin_parte_meteorologico_conserva_la_venta(self):
        v = clean_sales(
            ventas([("2023-01-02", "Seattle", "West", "Furniture", 100.0, 1)])
        )
        m = clean_weather(meteo())
        salida = join_sales_weather(v, m)
        assert len(salida) == 1
        assert salida.iloc[0]["sales"] == 100.0
        assert pd.isna(salida.iloc[0]["avg_temp_c"])

    def test_la_facturacion_total_no_cambia_al_cruzar(self):
        v = clean_sales(ventas())
        m = clean_weather(meteo())
        assert join_sales_weather(v, m)["sales"].sum() == pytest.approx(
            v["sales"].sum()
        )

    def test_una_meteorologia_con_la_clave_repetida_no_duplica_ventas(self):
        """
        El fallo caro del ETL: si alguien se salta clean_weather y mete la tabla
        cruda -- dos estaciones en la misma ciudad y dia -- el LEFT JOIN duplica
        cada venta de esa ciudad y la facturacion sale al doble sin un solo aviso.
        """
        v = clean_sales(
            ventas([("2023-06-15", "Chicago", "Central", "Furniture", 100.0, 1)])
        )
        duplicada = pd.DataFrame(
            [
                ("Chicago", pd.Timestamp("2023-06-15"), 80.0, 26.7),
                ("Chicago", pd.Timestamp("2023-06-15"), 90.0, 32.2),
            ],
            columns=["city", "date", "avg_temp_f", "avg_temp_c"],
        )
        salida = join_sales_weather(v, duplicada)
        assert len(salida) == 1, "el join duplico una venta"
        assert salida["sales"].sum() == pytest.approx(100.0)

    def test_cruza_aunque_la_ciudad_venga_con_otras_mayusculas(self):
        v = clean_sales(
            ventas([("2023-06-15", "chicago", "Central", "Furniture", 10.0, 1)])
        )
        m = clean_weather(meteo([("CHICAGO", "2023-06-15", 86.0)]))
        salida = join_sales_weather(v, m)
        assert salida.iloc[0]["avg_temp_c"] == pytest.approx(30.0, abs=0.1)

    def test_no_deja_columnas_de_trabajo_en_la_salida(self):
        salida = join_sales_weather(clean_sales(ventas()), clean_weather(meteo()))
        assert "_city_key" not in salida.columns
        assert "date" not in salida.columns

    def test_no_ensucia_los_dataframes_que_recibe(self):
        """
        join_sales_weather escribia _city_key sobre las tablas del llamante.
        La columna sobrevivia al join y acababa en el CSV del almacen.
        """
        v = clean_sales(ventas())
        m = clean_weather(meteo())
        join_sales_weather(v, m)
        assert "_city_key" not in v.columns
        assert "_city_key" not in m.columns

    def test_una_venta_del_dia_siguiente_no_hereda_la_temperatura(self):
        v = clean_sales(
            ventas([("2023-06-16", "Chicago", "Central", "Furniture", 10.0, 1)])
        )
        m = clean_weather(meteo([("Chicago", "2023-06-15", 86.0)]))
        assert pd.isna(join_sales_weather(v, m).iloc[0]["avg_temp_c"])


# --- Variables derivadas --------------------------------------------------


class TestVariablesDerivadas:
    def cruzado(self, filas_ventas=None, filas_meteo=None):
        v = clean_sales(ventas(filas_ventas))
        m = clean_weather(meteo(filas_meteo))
        return join_sales_weather(v, m)

    @pytest.mark.parametrize(
        "celsius, etiqueta",
        [
            (-5.0, "Cold (<10°C)"),
            (9.9, "Cold (<10°C)"),
            (10.0, "Mild (10-20°C)"),
            (19.9, "Mild (10-20°C)"),
            (20.0, "Warm (20-30°C)"),
            (29.9, "Warm (20-30°C)"),
            (30.0, "Hot (>30°C)"),
            (45.0, "Hot (>30°C)"),
        ],
    )
    def test_los_tramos_de_temperatura_cierran_por_arriba(self, celsius, etiqueta):
        df = pd.DataFrame({"sales": [10.0], "avg_temp_c": [celsius]})
        assert engineer_features(df).iloc[0]["temp_category"] == etiqueta

    def test_una_venta_sin_temperatura_se_etiqueta_Unknown_y_no_se_pierde(self):
        df = pd.DataFrame({"sales": [10.0], "avg_temp_c": [np.nan]})
        salida = engineer_features(df)
        assert len(salida) == 1
        assert salida.iloc[0]["temp_category"] == "Unknown"

    def test_el_ingreso_por_unidad_es_la_division(self):
        df = pd.DataFrame({"sales": [100.0], "quantity": [4], "avg_temp_c": [20.0]})
        assert engineer_features(df).iloc[0]["revenue_per_unit"] == pytest.approx(25.0)

    def test_la_mediana_parte_las_ventas_en_alta_y_baja(self):
        df = pd.DataFrame(
            {"sales": [10.0, 20.0, 30.0, 40.0, 50.0], "avg_temp_c": [20.0] * 5}
        )
        tiers = list(engineer_features(df)["sales_tier"])
        assert tiers == ["Low", "Low", "High", "High", "High"]

    def test_no_toca_el_dataframe_que_recibe(self):
        df = pd.DataFrame({"sales": [10.0], "avg_temp_c": [20.0]})
        columnas_antes = list(df.columns)
        engineer_features(df)
        assert list(df.columns) == columnas_antes


# --- El pipeline entero ---------------------------------------------------


class TestPipelineCompleto:
    def test_de_extremo_a_extremo_no_pierde_facturacion(self):
        crudo = ventas()
        salida = transform(crudo, meteo())
        assert len(salida) == len(crudo)
        assert salida["sales"].sum() == pytest.approx(crudo["Sales"].sum())

    def test_deja_todas_las_columnas_que_consume_la_capa_de_carga(self):
        """
        load_web_json agrupa por estas columnas. Si transform deja de producir
        una, el ETL revienta al final, despues de haber procesado todo.
        """
        salida = transform(ventas(), meteo())
        for columna in (
            "category",
            "region",
            "sales",
            "year",
            "month",
            "is_weekend",
            "temp_category",
            "avg_temp_c",
        ):
            assert columna in salida.columns, f"falta {columna}"

    def test_cada_venta_cruzada_tiene_temperatura_y_tramo_coherentes(self):
        salida = transform(ventas(), meteo())
        cruzadas = salida[salida["avg_temp_c"].notna()]
        assert len(cruzadas) == 3
        assert not (cruzadas["temp_category"] == "Unknown").any()
