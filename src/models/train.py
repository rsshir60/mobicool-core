import os
import argparse
import yaml
import joblib
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.ensemble import RandomForestClassifier

from src.utils.logger import setup_logger
from src.features.build_features import compute_engagement_ratio
from src.models.metrics import evaluate_classification

logger = setup_logger("train-pipeline")

def generate_mock_telemetry_data(n_samples: int = 1000) -> pd.DataFrame:
    """Generates synthetic user telemetry data for training if raw file is missing."""
    np.random.seed(42)
    session_durations = np.random.exponential(scale=300, size=n_samples)
    events_count = np.random.poisson(lam=15, size=n_samples)
    inactivity = np.random.randint(0, 30, size=n_samples)
    spend = np.random.gamma(shape=2.0, scale=25.0, size=n_samples)
    tiers = np.random.choice(["free", "standard", "premium"], size=n_samples, p=[0.6, 0.3, 0.1])
    devices = np.random.choice(["ios", "android", "web"], size=n_samples, p=[0.45, 0.45, 0.10])
    
    # Churn probability correlates with high inactivity and low spend
    logit = (inactivity * 0.12) - (spend * 0.03) - (events_count * 0.05)
    prob = 1 / (1 + np.exp(-logit))
    churned = (np.random.rand(n_samples) < prob).astype(int)

    df = pd.DataFrame({
        "session_duration_sec": session_durations,
        "events_per_session": events_count,
        "inactivity_days": inactivity,
        "total_spend": spend,
        "subscription_tier": tiers,
        "device_os": devices,
        "churned": churned
    })
    return df

def run_training_pipeline(config_path: str = "configs/config.yaml"):
    logger.info(f"Loading pipeline configuration from {config_path}")
    with open(config_path, "r") as f:
        cfg = yaml.safe_load(f)

    # 1. Ingest Data
    raw_path = cfg["data"]["raw_path"]
    if os.path.exists(raw_path):
        logger.info(f"Ingesting raw telemetry from {raw_path}")
        df = pd.read_csv(raw_path)
    else:
        logger.info("Raw telemetry file not detected. Generating reproducible mock dataset.")
        os.makedirs(os.path.dirname(raw_path), exist_ok=True)
        df = generate_mock_telemetry_data()
        df.to_csv(raw_path, index=False)
        logger.info(f"Mock telemetry persisted to {raw_path}")

    # 2. Feature Preprocessing
    logger.info("Computing derived behavioral features...")
    df = compute_engagement_ratio(df)

    num_cols = cfg["features"]["numerical_features"] + ["event_density", "risk_score"]
    cat_cols = cfg["features"]["categorical_features"]
    target = cfg["data"]["target_column"]

    X = df[num_cols + cat_cols]
    y = df[target]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=cfg["pipeline"]["test_size"], random_state=cfg["pipeline"]["random_state"], stratify=y
    )

    # 3. Model Pipeline Definition
    preprocessor = ColumnTransformer(
        transformers=[
            ("num", StandardScaler(), num_cols),
            ("cat", OneHotEncoder(handle_unknown="ignore"), cat_cols)
        ]
    )

    hp = cfg["model"]["hyperparameters"]
    clf = RandomForestClassifier(
        n_estimators=hp["n_estimators"],
        max_depth=hp["max_depth"],
        min_samples_split=hp["min_samples_split"],
        random_state=hp["random_state"]
    )

    pipeline = Pipeline(steps=[
        ("preprocessor", preprocessor),
        ("classifier", clf)
    ])

    logger.info("Fitting model pipeline on training partition...")
    pipeline.fit(X_train, y_train)

    # 4. Evaluation
    logger.info("Evaluating model against validation partition...")
    y_pred = pipeline.predict(X_test)
    y_prob = pipeline.predict_proba(X_test)[:, 1]
    metrics = evaluate_classification(y_test.to_numpy(), y_pred, y_prob)
    logger.info(f"Evaluation Metrics: {metrics}")

    # 5. Serialization
    artifact_path = cfg["model"]["artifact_path"]
    os.makedirs(os.path.dirname(artifact_path), exist_ok=True)
    joblib.dump(pipeline, artifact_path)
    logger.info(f"Model artifact successfully serialized to {artifact_path}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Mobicool Core Training Runner")
    parser.add_argument("--config", default="configs/config.yaml", help="Path to config file")
    args = parser.parse_args()
    run_training_pipeline(args.config)

# Standardized joblib dump

# Standardized joblib dump

# Stratified split validation

# Standardized joblib dump

# Stratified split validation

# Standardized joblib dump

# Standardized joblib dump

# Standardized joblib dump

# Stratified split validation

# Standardized joblib dump

# Stratified split validation

# Stratified split validation

# Stratified split validation

# Standardized joblib dump

# Standardized joblib dump

# Standardized joblib dump

# Standardized joblib dump
