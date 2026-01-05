import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random

# --- 1. Extraction (Simulated) ---

def extract_weather_data(date):
    """Simulates extracting weather data for a given date."""
    # Simulate a few key weather metrics
    return {
        'date': date.strftime('%Y-%m-%d'),
        'temperature_c': round(random.uniform(10, 35), 1),
        'precipitation_mm': round(random.uniform(0, 10), 1),
        'is_weekend': date.weekday() >= 5
    }

def extract_sales_data(date):
    """Simulates extracting sales data for a given date."""
    # Base sales volume is higher on weekends and lower with high precipitation
    base_sales = 10000
    if date.weekday() >= 5: # Weekend boost
        base_sales *= 1.5
    
    weather = extract_weather_data(date)
    if weather['precipitation_mm'] > 5: # Rain penalty
        base_sales *= 0.7
        
    return {
        'date': date.strftime('%Y-%m-%d'),
        'sales_revenue': round(base_sales * random.uniform(0.9, 1.1), 2),
        'units_sold': random.randint(500, 1500)
    }

# --- 2. Transformation ---

def transform_data(weather_df, sales_df):
    """Joins and transforms the extracted data."""
    
    # Rename columns for clarity before merge
    sales_df.rename(columns={'date': 'Date'}, inplace=True)
    weather_df.rename(columns={'date': 'Date'}, inplace=True)
    
    # Merge the two datasets on the 'Date' column (T in ETL)
    merged_df = pd.merge(sales_df, weather_df, on='Date', how='inner')
    
    # Feature Engineering: Create a 'Sales_Per_Unit' metric
    merged_df['Sales_Per_Unit'] = merged_df['sales_revenue'] / merged_df['units_sold']
    
    # Categorize Temperature (T in ETL)
    def categorize_temp(temp):
        if temp < 15:
            return 'Cold'
        elif temp < 25:
            return 'Mild'
        else:
            return 'Hot'
            
    merged_df['Temperature_Category'] = merged_df['temperature_c'].apply(categorize_temp)
    
    return merged_df

# --- 3. Load ---

def load_data(df, filename):
    """Simulates loading the transformed data into a data warehouse (CSV/SQL)."""
    df.to_csv(filename, index=False)
    print(f"Data loaded successfully to {filename}")

# --- Main Pipeline Execution ---

if __name__ == "__main__":
    # Define date range for simulation (30 days)
    end_date = datetime.now()
    start_date = end_date - timedelta(days=30)
    date_range = [start_date + timedelta(days=i) for i in range(31)]
    
    # E: Extract
    weather_records = [extract_weather_data(d) for d in date_range]
    sales_records = [extract_sales_data(d) for d in date_range]
    
    weather_df = pd.DataFrame(weather_records)
    sales_df = pd.DataFrame(sales_records)
    
    # T: Transform
    transformed_df = transform_data(weather_df, sales_df)
    
    # L: Load
    load_data(transformed_df, 'sales_weather_data_warehouse.csv')
    
    # Save the final dataframe for inspection
    transformed_df.head().to_markdown('pipeline_output_sample.md')
    print("Pipeline execution complete. Sample output saved to pipeline_output_sample.md")
