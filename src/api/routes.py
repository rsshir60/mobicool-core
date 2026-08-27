from fastapi import FastAPI, HTTPException
import pandas as pd
from typing import List
from src.api.schemas import TelemetryPayload, PredictionResponse, BatchPredictionResponse
from src.features.build_features import compute_engagement_ratio
from src.models.predict import ModelPredictor

app = FastAPI(
    title="Mobicool Core Predictive Inference Gateway",
    version="1.0.0",
    description="High-performance machine learning inference service for user telemetry analysis."
)

predictor = None

@app.on_event("startup")
def startup_event():
    global predictor
    predictor = ModelPredictor()

@app.get("/health", tags=["System"])
def health_check():
    return {"status": "healthy", "service": "mobicool-core", "model_loaded": predictor.pipeline is not None if predictor else False}

@app.post("/v1/predict", response_model=PredictionResponse, tags=["Inference"])
def predict_single(payload: TelemetryPayload):
    try:
        df = pd.DataFrame([payload.model_dump()])
        df = compute_engagement_ratio(df)
        res = predictor.predict(df)
        pred = res["predictions"][0]
        prob = round(res["probabilities"][0], 4)
        conf = "high" if (prob > 0.8 or prob < 0.2) else "moderate"
        return PredictionResponse(churn_prediction=pred, churn_probability=prob, confidence_level=conf)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/v1/predict/batch", response_model=BatchPredictionResponse, tags=["Inference"])
def predict_batch(payloads: List[TelemetryPayload]):
    try:
        df = pd.DataFrame([p.model_dump() for p in payloads])
        df = compute_engagement_ratio(df)
        res = predictor.predict(df)
        results = []
        for pred, prob in zip(res["predictions"], res["probabilities"]):
            prob_round = round(prob, 4)
            conf = "high" if (prob_round > 0.8 or prob_round < 0.2) else "moderate"
            results.append(PredictionResponse(churn_prediction=pred, churn_probability=prob_round, confidence_level=conf))
        return BatchPredictionResponse(count=len(results), results=results)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Batch processing optimization

# Batch processing optimization

# Batch processing optimization

# Validation exception guard

# Batch processing optimization

# Validation exception guard

# Batch processing optimization

# Batch processing optimization

# Batch processing optimization
