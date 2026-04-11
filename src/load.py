"""
Load layer: persists the transformed dataset and generates web-ready JSON exports.
"""

import pandas as pd
import json
import logging
from pathlib import Path

logger = logging.getLogger(__name__)

PROCESSED_DIR = Path(__file__).parent.parent / "data" / "processed"
WEB_DATA_DIR = Path(__file__).parent.parent / "web" / "public" / "data"


def load_warehouse(df: pd.DataFrame, filename: str = "sales_weather_warehouse.csv") -> Path:
    """Save the full analytical dataset as CSV (simulates a data warehouse load)."""
    PROCESSED_DIR.mkdir(parents=True, exist_ok=True)
    out = PROCESSED_DIR / filename
    df.to_csv(out, index=False)
    logger.info(f"Warehouse saved: {out} ({len(df):,} rows)")
    return out


def _serialize(obj):
    """JSON serializer for numpy/pandas types."""
    import numpy as np
    if isinstance(obj, (np.integer,)):
        return int(obj)
    if isinstance(obj, (np.floating,)):
        return round(float(obj), 2)
    if isinstance(obj, (np.ndarray,)):
        return obj.tolist()
    raise TypeError(f"Not serializable: {type(obj)}")


def load_web_json(df: pd.DataFrame) -> None:
    """
    Export pre-aggregated JSON files consumed by the visualization web app.
    Keeps the web layer stateless — no API needed.
    """
    WEB_DATA_DIR.mkdir(parents=True, exist_ok=True)

    # 1. Sales by Category
    by_cat = (
        df.groupby("category")["sales"]
        .agg(total_sales="sum", avg_sales="mean", num_orders="count")
        .reset_index()
    )
    _save_json(by_cat, "sales_by_category.json")

    # 2. Monthly revenue trend
    monthly = (
        df.groupby(["year", "month"])["sales"]
        .sum()
        .reset_index()
        .rename(columns={"sales": "total_sales"})
    )
    monthly["period"] = monthly["year"].astype(str) + "-" + monthly["month"].astype(str).str.zfill(2)
    _save_json(monthly[["period", "total_sales"]], "monthly_revenue.json")

    # 3. Sales by temperature category (weather impact)
    by_temp = (
        df[df["temp_category"] != "Unknown"]
        .groupby("temp_category")["sales"]
        .agg(total_sales="sum", avg_sales="mean", num_orders="count")
        .reset_index()
    )
    _save_json(by_temp, "sales_by_temp.json")

    # 4. Sales by region
    by_region = (
        df.groupby("region")["sales"]
        .agg(total_sales="sum", avg_sales="mean")
        .reset_index()
    )
    _save_json(by_region, "sales_by_region.json")

    # 5. Weekend vs weekday
    by_weekend = (
        df.groupby("is_weekend")["sales"]
        .agg(total_sales="sum", avg_sales="mean", num_orders="count")
        .reset_index()
    )
    by_weekend["day_type"] = by_weekend["is_weekend"].map({True: "Weekend", False: "Weekday"})
    _save_json(by_weekend[["day_type", "total_sales", "avg_sales", "num_orders"]], "sales_weekend_vs_weekday.json")

    # 6. Scatter: avg_temp_c vs sales (sampled for web performance)
    scatter = df[["avg_temp_c", "sales", "category"]].dropna().sample(
        min(500, len(df.dropna(subset=["avg_temp_c"]))), random_state=42
    )
    _save_json(scatter, "temp_vs_sales_scatter.json")

    logger.info(f"Web JSON exports saved to {WEB_DATA_DIR}")


def _save_json(df: pd.DataFrame, filename: str) -> None:
    path = WEB_DATA_DIR / filename
    records = df.to_dict(orient="records")
    with open(path, "w") as f:
        json.dump(records, f, default=_serialize)
    logger.info(f"  → {filename} ({len(records)} records)")
