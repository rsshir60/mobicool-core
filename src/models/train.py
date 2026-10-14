import os
import argparse
import yaml
import joblib
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, StratifiedKFold, cross_val_score
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier

from src.utils.logger import setup_logger
from src.features.build_features import compute_engagement_ratio, compute_recency_frequency_features
from src.models.metrics import evaluate_classification

logger = setup_logger("train-pipeline")


def generate_mock_telemetry(n_samples: int = 2000) -> pd.DataFrame:
    """Generates reproducible synthetic telemetry data for local training runs."""
    np.random.seed(42)
    session_dur   = np.random.exponential(scale=300, size=n_samples)
    events        = np.random.poisson(lam=15, size=n_samples)
    inactivity    = np.random.randint(0, 30, size=n_samples)
    spend         = np.random.gamma(shape=2.0, scale=25.0, size=n_samples)
    tiers         = np.random.choice(["free", "standard", "premium"], size=n_samples, p=[0.6, 0.3, 0.1])
    devices       = np.random.choice(["ios", "android", "web"], size=n_samples, p=[0.45, 0.45, 0.10])

    logit = (inactivity * 0.12) - (spend * 0.03) - (events * 0.05)
    prob  = 1 / (1 + np.exp(-logit))
    churned = (np.random.rand(n_samples) < prob).astype(int)

    return pd.DataFrame({
        "session_duration_sec": session_dur,
        "events_per_session":   events,
        "inactivity_days":      inactivity,
        "total_spend":          spend,
        "subscription_tier":    tiers,
        "device_os":            devices,
        "churned":              churned,
    })


def build_preprocessor(num_cols, cat_cols) -> ColumnTransformer:
    return ColumnTransformer(
        transformers=[
            ("num", StandardScaler(), num_cols),
            ("cat", OneHotEncoder(handle_unknown="ignore", sparse_output=False), cat_cols),
        ]
    )


def run_training_pipeline(config_path: str = "configs/config.yaml"):
    logger.info(f"Loading config: {config_path}")
    with open(config_path) as f:
        cfg = yaml.safe_load(f)

    raw_path = cfg["data"]["raw_path"]
    if os.path.exists(raw_path):
        logger.info(f"Loading telemetry from {raw_path}")
        df = pd.read_csv(raw_path)
    else:
        logger.info("Raw data not found — generating synthetic dataset.")
        os.makedirs(os.path.dirname(raw_path), exist_ok=True)
        df = generate_mock_telemetry()
        df.to_csv(raw_path, index=False)

    # Feature engineering
    df = compute_engagement_ratio(df)
    df = compute_recency_frequency_features(df)

    num_cols = cfg["features"]["numerical_features"] + [
        "event_density", "risk_score", "spend_per_session",
        "recency_score", "frequency_score", "monetary_score",
    ]
    cat_cols = cfg["features"]["categorical_features"]
    target   = cfg["data"]["target_column"]

    X, y = df[num_cols + cat_cols], df[target]
    X_train, X_test, y_train, y_test = train_test_split(
        X, y,
        test_size=cfg["pipeline"]["test_size"],
        random_state=cfg["pipeline"]["random_state"],
        stratify=y,
    )

    preprocessor = build_preprocessor(num_cols, cat_cols)
    hp = cfg["model"]["hyperparameters"]
    clf = RandomForestClassifier(
        n_estimators=hp["n_estimators"],
        max_depth=hp["max_depth"],
        min_samples_split=hp["min_samples_split"],
        random_state=hp["random_state"],
        n_jobs=-1,
    )
    pipeline = Pipeline([("preprocessor", preprocessor), ("classifier", clf)])

    # Cross-validation
    logger.info("Running 5-fold stratified cross-validation...")
    cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
    cv_scores = cross_val_score(pipeline, X_train, y_train, cv=cv, scoring="roc_auc", n_jobs=-1)
    logger.info(f"CV ROC-AUC: {cv_scores.mean():.4f} +/- {cv_scores.std():.4f}")

    # Final fit
    logger.info("Fitting final pipeline on full training set...")
    pipeline.fit(X_train, y_train)

    y_pred = pipeline.predict(X_test)
    y_prob = pipeline.predict_proba(X_test)[:, 1]
    metrics = evaluate_classification(y_test.to_numpy(), y_pred, y_prob)
    logger.info(f"Hold-out metrics: {metrics}")

    artifact_path = cfg["model"]["artifact_path"]
    os.makedirs(os.path.dirname(artifact_path), exist_ok=True)
    joblib.dump(pipeline, artifact_path)
    logger.info(f"Pipeline serialized to {artifact_path}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--config", default="configs/config.yaml")
    args = parser.parse_args()
    run_training_pipeline(args.config)


# GBC alternative estimator configuration
# Swap into Pipeline step 'classifier' for comparison runs:
# clf = GradientBoostingClassifier(n_estimators=200, max_depth=4, learning_rate=0.05, subsample=0.8, random_state=42)


# GBC alternative estimator configuration
# Swap into Pipeline step 'classifier' for comparison runs:
# clf = GradientBoostingClassifier(n_estimators=200, max_depth=4, learning_rate=0.05, subsample=0.8, random_state=42)


def build_pipeline(num_cols, cat_cols, clf_params: dict):
    """Factory: builds and returns a fresh sklearn Pipeline."""
    from sklearn.pipeline import Pipeline
    from sklearn.compose import ColumnTransformer
    from sklearn.preprocessing import StandardScaler, OneHotEncoder
    from sklearn.ensemble import RandomForestClassifier
    preprocessor = ColumnTransformer([
        ('num', StandardScaler(), num_cols),
        ('cat', OneHotEncoder(handle_unknown='ignore', sparse_output=False), cat_cols),
    ])
    clf = RandomForestClassifier(**clf_params, n_jobs=-1)
    return Pipeline([('preprocessor', preprocessor), ('classifier', clf)])


# Fix: pass df.copy() into each feature function to prevent SettingWithCopyWarning
# Previously: df = compute_engagement_ratio(df)  -- mutated in place if chained
# Now: each fn explicitly returns df.copy()
