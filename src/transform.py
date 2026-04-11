"""
Transform layer: cleans, enriches and joins sales + weather DataFrames.
Produces a single analytical dataset ready for BI/visualization.
"""

import pandas as pd
import numpy as np
import logging

logger = logging.getLogger(__name__)


# --- Cleaning ---

def clean_sales(df: pd.DataFrame) -> pd.DataFrame:
    """Standardise column names and derive useful date fields."""
    df = df.copy()
    df.columns = [c.lower().replace(" ", "_") for c in df.columns]
    df["order_date"] = pd.to_datetime(df["order_date"])
    df["year"] = df["order_date"].dt.year
    df["month"] = df["order_date"].dt.month
    df["day_of_week"] = df["order_date"].dt.day_name()
    df["is_weekend"] = df["order_date"].dt.weekday >= 5
    df["quarter"] = df["order_date"].dt.quarter
    logger.info(f"Sales cleaned: {len(df):,} rows")
    return df


def clean_weather(df: pd.DataFrame) -> pd.DataFrame:
    """Aggregate weather to city-day level (some cities have multiple stations)."""
    df = df.copy()
    df["date"] = pd.to_datetime(df["date"])

    # Average across stations for the same city-day
    agg = (
        df.groupby(["City", "date"], as_index=False)
        .agg(avg_temp_f=("AvgTemperature", "mean"))
    )
    agg["avg_temp_c"] = ((agg["avg_temp_f"] - 32) * 5 / 9).round(1)
    agg.rename(columns={"City": "city"}, inplace=True)
    logger.info(f"Weather cleaned: {len(agg):,} city-day records")
    return agg


# --- Join ---

def join_sales_weather(sales: pd.DataFrame, weather: pd.DataFrame) -> pd.DataFrame:
    """
    Left-join sales to weather on city + order_date.
    Cities not matched keep sales data with NaN weather cols.
    """
    sales["_city_key"] = sales["city"].str.title()
    weather["_city_key"] = weather["city"].str.title()

    merged = sales.merge(
        weather[["_city_key", "date", "avg_temp_f", "avg_temp_c"]],
        left_on=["_city_key", "order_date"],
        right_on=["_city_key", "date"],
        how="left",
    ).drop(columns=["_city_key", "date"], errors="ignore")

    match_pct = merged["avg_temp_c"].notna().mean() * 100
    logger.info(f"Join complete: {len(merged):,} rows, {match_pct:.1f}% matched with weather")
    return merged


# --- Feature Engineering ---

def engineer_features(df: pd.DataFrame) -> pd.DataFrame:
    """Derive analytical KPIs and categorical buckets."""
    df = df.copy()

    # Revenue metrics
    df["revenue_per_unit"] = (df["sales"] / df.get("quantity", 1)).round(2)

    # Temperature buckets (only for matched rows)
    def temp_bucket(t):
        if pd.isna(t):
            return "Unknown"
        elif t < 10:
            return "Cold (<10°C)"
        elif t < 20:
            return "Mild (10-20°C)"
        elif t < 30:
            return "Warm (20-30°C)"
        else:
            return "Hot (>30°C)"

    df["temp_category"] = df["avg_temp_c"].apply(temp_bucket)

    # Sales velocity flag: above median → High, below → Low
    median_sales = df["sales"].median()
    df["sales_tier"] = np.where(df["sales"] >= median_sales, "High", "Low")

    logger.info("Feature engineering complete")
    return df


# --- Orchestrator ---

def transform(raw_sales: pd.DataFrame, raw_weather: pd.DataFrame) -> pd.DataFrame:
    sales = clean_sales(raw_sales)
    weather = clean_weather(raw_weather)
    merged = join_sales_weather(sales, weather)
    final = engineer_features(merged)
    return final
