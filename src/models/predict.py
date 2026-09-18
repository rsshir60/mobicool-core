import os
import joblib
import pandas as pd
from typing import Dict, Any

class ModelPredictor:
    """Wrapper class providing cached model loading and batched inference capabilities."""
    def __init__(self, model_path: str = "src/models/artifacts/model.joblib"):
        self.model_path = model_path
        self.pipeline = None
        self._load()

    def _load(self):
        if os.path.exists(self.model_path):
            self.pipeline = joblib.load(self.model_path)

    def predict(self, df: pd.DataFrame) -> Dict[str, Any]:
        if self.pipeline is None:
            raise RuntimeError("Model pipeline artifact is not loaded. Train the model first.")
        predictions = self.pipeline.predict(df)
        probabilities = self.pipeline.predict_proba(df)[:, 1]
        return {
            "predictions": predictions.tolist(),
            "probabilities": probabilities.tolist()
        }
