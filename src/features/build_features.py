from typing import Optional, List
import pandas as pd
import numpy as np
from sklearn.base import BaseEstimator, TransformerMixin


class OutlierClipper(BaseEstimator, TransformerMixin):
    """Clips numerical columns to [lower_quantile, upper_quantile] range.

    Parameters
    ----------
    lower_quantile : float, default 0.01
    upper_quantile : float, default 0.99
    """

    def __init__(self, lower_quantile: float = 0.01, upper_quantile: float = 0.99):
        self.lower_quantile = lower_quantile
        self.upper_quantile = upper_quantile
        self.bounds_: dict = {}

    def fit(self, X: pd.DataFrame, y=None) -> "OutlierClipper":
        for col in X.select_dtypes(include=[np.number]).columns:
            self.bounds_[col] = (
                X[col].quantile(self.lower_quantile),
                X[col].quantile(self.upper_quantile),
            )
        return self

    def transform(self, X: pd.DataFrame) -> pd.DataFrame:
        X_out = X.copy()
        for col, (lo, hi) in self.bounds_.items():
            if col in X_out.columns:
                X_out[col] = X_out[col].clip(lower=lo, upper=hi)
        return X_out


class LagFeatureGenerator(BaseEstimator, TransformerMixin):
    """Appends lag features for specified numeric columns over given windows."""

    def __init__(self, columns: List[str], lags: List[int] = [1, 3, 7]):
        self.columns = columns
        self.lags = lags

    def fit(self, X: pd.DataFrame, y=None) -> "LagFeatureGenerator":
        return self

    def transform(self, X: pd.DataFrame) -> pd.DataFrame:
        X_out = X.copy()
        for col in self.columns:
            if col in X_out.columns:
                for lag in self.lags:
                    X_out[f"{col}_lag{lag}"] = X_out[col].shift(lag)
        return X_out.fillna(0)


def compute_engagement_ratio(df: pd.DataFrame) -> pd.DataFrame:
    """Derives behavioural telemetry features from raw user interaction data."""
    df = df.copy()
    duration_safe = df["session_duration_sec"].replace(0, 1)
    df["event_density"] = df["events_per_session"] / duration_safe
    df["risk_score"] = (df["inactivity_days"] * 1.5) / (df["total_spend"] + 10.0)
    df["spend_per_session"] = df["total_spend"] / (df["events_per_session"] + 1)
    return df


def compute_recency_frequency_features(df: pd.DataFrame) -> pd.DataFrame:
    """Computes RFM-style features for churn prediction tasks."""
    df = df.copy()
    df["recency_score"] = 1 / (df["inactivity_days"] + 1)
    df["frequency_score"] = np.log1p(df["events_per_session"])
    df["monetary_score"] = np.log1p(df["total_spend"])
    return df


def apply_all_features(df: 'pd.DataFrame') -> 'pd.DataFrame':
    """Applies all feature transformations in a reproducible order."""
    df = compute_engagement_ratio(df)
    df = compute_recency_frequency_features(df)
    df = add_tier_flags(df)
    return df


def safe_recency(df: 'pd.DataFrame') -> 'pd.DataFrame':
    """Returns recency_score with NaN-safe fallback of 0."""
    df = df.copy()
    df['recency_score'] = 1 / (df['inactivity_days'].fillna(30) + 1)
    return df


def churn_risk_index(df: 'pd.DataFrame') -> 'pd.DataFrame':
    """Combines recency, frequency and monetary scores into a single risk index."""
    df = df.copy()
    df['rfm_index'] = (
        0.4 * df.get('recency_score', 0)
        - 0.3 * df.get('frequency_score', 0)
        - 0.3 * df.get('monetary_score', 0)
    )
    return df


def add_tier_flags(df: 'pd.DataFrame') -> 'pd.DataFrame':
    df = df.copy()
    df['is_premium'] = (df['subscription_tier'] == 'premium').astype(int)
    df['is_free']    = (df['subscription_tier'] == 'free').astype(int)
    return df
