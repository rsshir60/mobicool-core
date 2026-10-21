import os
import joblib
import pandas as pd
from typing import Dict, Any, List

from src.features.build_features import compute_engagement_ratio, compute_recency_frequency_features
from src.utils.logger import setup_logger

logger = setup_logger("predictor")


class ModelPredictor:
    """Cached model loader with single and batch inference support.

    Attributes
    ----------
    model_path : Path to the serialised joblib pipeline artifact.
    pipeline   : Loaded sklearn Pipeline object.
    """

    def __init__(self, model_path: str = "src/models/artifacts/model.joblib"):
        self.model_path = model_path
        self.pipeline = None
        self._load()

    def _load(self) -> None:
        if os.path.exists(self.model_path):
            self.pipeline = joblib.load(self.model_path)
            logger.info(f"Model loaded from {self.model_path}")
        else:
            logger.warning(f"No model artifact found at {self.model_path}")

    def _preprocess(self, df: pd.DataFrame) -> pd.DataFrame:
        df = compute_engagement_ratio(df)
        df = compute_recency_frequency_features(df)
        return df

    def predict(self, df: pd.DataFrame) -> Dict[str, Any]:
        if self.pipeline is None:
            raise RuntimeError("No model loaded. Run training pipeline first.")
        df = self._preprocess(df)
        return {
            "predictions":   self.pipeline.predict(df).tolist(),
            "probabilities": self.pipeline.predict_proba(df)[:, 1].tolist(),
        }
