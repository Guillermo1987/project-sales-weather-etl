"""
Extract layer: reads raw CSV files from data/raw/ and returns DataFrames.
Simulates pulling from two independent source systems.
"""

import pandas as pd
import logging
from pathlib import Path

logger = logging.getLogger(__name__)

RAW_DIR = Path(__file__).parent.parent / "data" / "raw"


def extract_sales(path: Path = RAW_DIR / "sales" / "train.csv") -> pd.DataFrame:
    """Extract sales transactions from the Superstore dataset."""
    logger.info(f"Extracting sales data from {path}")
    df = pd.read_csv(path, parse_dates=["Order Date", "Ship Date"],
                     dayfirst=False, infer_datetime_format=True)
    logger.info(f"Sales extracted: {len(df):,} rows, {df['Order Date'].min()} → {df['Order Date'].max()}")
    return df


def extract_weather(path: Path = RAW_DIR / "weather" / "city_temperature.csv") -> pd.DataFrame:
    """Extract daily temperature records; filters to US only to match sales scope."""
    logger.info(f"Extracting weather data from {path}")
    df = pd.read_csv(path, encoding="latin1")

    # Filter US and drop invalid temperature readings (Kaggle dataset uses -99 as null)
    df = df[df["Country"] == "US"].copy()
    df = df[df["AvgTemperature"] > -50].copy()

    # Build a proper date column
    df["date"] = pd.to_datetime(
        df[["Year", "Month", "Day"]].rename(columns={"Year": "year", "Month": "month", "Day": "day"})
    )

    logger.info(f"Weather extracted (US): {len(df):,} rows, {df['date'].min()} → {df['date'].max()}")
    return df
