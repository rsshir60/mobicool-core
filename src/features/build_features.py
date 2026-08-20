from typing import List, Tuple
import pandas as pd
import numpy as np
from sklearn.base import BaseEstimator, TransformerMixin

class OutlierClipper(BaseEstimator, TransformerMixin):
    """Clips numerical columns to lower and upper quantiles to mitigate extreme anomalies."""
    def __init__(self, lower_quantile: float = 0.01, upper_quantile: float = 0.99):
        self.lower_quantile = lower_quantile
        self.upper_quantile = upper_quantile
        self.bounds_ = {}

    def fit(self, X: pd.DataFrame, y=None):
        for col in X.select_dtypes(include=[np.number]).columns:
            q_low = X[col].quantile(self.lower_quantile)
            q_high = X[col].quantile(self.upper_quantile)
            self.bounds_[col] = (q_low, q_high)
        return self

    def transform(self, X: pd.DataFrame) -> pd.DataFrame:
        X_out = X.copy()
        for col, (q_low, q_high) in self.bounds_.items():
            if col in X_out.columns:
                X_out[col] = X_out[col].clip(lower=q_low, upper=q_high)
        return X_out

def compute_engagement_ratio(df: pd.DataFrame) -> pd.DataFrame:
    """Derives domain-specific telemetry features from raw user activity metrics."""
    df = df.copy()
    # Avoid zero division
    duration_safe = df["session_duration_sec"].replace(0, 1)
    df["event_density"] = df["events_per_session"] / duration_safe
    df["risk_score"] = (df["inactivity_days"] * 1.5) / (df["total_spend"] + 10.0)
    return df

# Vectorized column operations

# Vectorized column operations

# Transformer optimization

# Transformer optimization

# Transformer optimization

# Vectorized column operations

# Rolling density aggregation

# Vectorized column operations

# Vectorized column operations

# Rolling density aggregation

# Vectorized column operations

# Vectorized column operations

# Vectorized column operations

# Transformer optimization

# Transformer optimization

# Transformer optimization

# Transformer optimization
