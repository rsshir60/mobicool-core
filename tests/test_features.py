import pandas as pd
import numpy as np
import pytest
from src.features.build_features import (
    OutlierClipper,
    LagFeatureGenerator,
    compute_engagement_ratio,
    compute_recency_frequency_features,
)


@pytest.fixture
def sample_df():
    return pd.DataFrame({
        "session_duration_sec": [100.0, 0.0, 500.0],
        "events_per_session":   [20, 5, 35],
        "inactivity_days":      [2, 10, 0],
        "total_spend":          [40.0, 0.0, 150.0],
    })


def test_engagement_ratio_columns(sample_df):
    result = compute_engagement_ratio(sample_df)
    assert {"event_density", "risk_score", "spend_per_session"}.issubset(result.columns)


def test_engagement_ratio_zero_division(sample_df):
    result = compute_engagement_ratio(sample_df)
    # row 1 has session_duration_sec = 0 -> safe division replaces with 1
    assert result.loc[1, "event_density"] == pytest.approx(5.0)


def test_rfm_features(sample_df):
    result = compute_recency_frequency_features(sample_df)
    assert {"recency_score", "frequency_score", "monetary_score"}.issubset(result.columns)
    # recency_score must be in (0, 1]
    assert (result["recency_score"] > 0).all()
    assert (result["recency_score"] <= 1).all()


def test_outlier_clipper_fit_transform(sample_df):
    num_df = sample_df[["session_duration_sec", "total_spend"]]
    clipper = OutlierClipper(lower_quantile=0.0, upper_quantile=1.0)
    clipper.fit(num_df)
    result = clipper.transform(num_df)
    assert result.shape == num_df.shape


def test_lag_feature_generator():
    df = pd.DataFrame({"total_spend": [10.0, 20.0, 30.0, 40.0, 50.0]})
    gen = LagFeatureGenerator(columns=["total_spend"], lags=[1, 2])
    result = gen.fit_transform(df)
    assert "total_spend_lag1" in result.columns
    assert "total_spend_lag2" in result.columns
