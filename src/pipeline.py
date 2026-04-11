"""
Pipeline orchestrator: wires Extract → Transform → Load.
Run directly: python -m src.pipeline
"""

import logging
import time
from src.extract import extract_sales, extract_weather
from src.transform import transform
from src.load import load_warehouse, load_web_json

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s — %(message)s",
    datefmt="%H:%M:%S",
)
logger = logging.getLogger(__name__)


def run():
    start = time.time()
    logger.info("=== ETL Pipeline START ===")

    # Extract
    raw_sales = extract_sales()
    raw_weather = extract_weather()

    # Transform
    df = transform(raw_sales, raw_weather)

    # Load
    warehouse_path = load_warehouse(df)
    load_web_json(df)

    elapsed = time.time() - start
    logger.info(f"=== ETL Pipeline COMPLETE in {elapsed:.1f}s ===")
    logger.info(f"Warehouse: {warehouse_path}")
    logger.info(f"Rows processed: {len(df):,} | Columns: {len(df.columns)}")

    return df


if __name__ == "__main__":
    run()
