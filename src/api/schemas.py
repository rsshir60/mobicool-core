from typing import List
from pydantic import BaseModel, Field

class TelemetryPayload(BaseModel):
    session_duration_sec: float = Field(..., example=342.5, description="Total session duration in seconds")
    events_per_session: int = Field(..., example=18, description="Count of discrete user interactions")
    inactivity_days: int = Field(..., example=3, description="Days elapsed since prior session")
    total_spend: float = Field(..., example=49.99, description="Cumulative lifetime monetary spend")
    subscription_tier: str = Field("standard", example="standard", description="Subscription tier: free, standard, premium")
    device_os: str = Field("ios", example="ios", description="Client operating system: ios, android, web")

class PredictionResponse(BaseModel):
    churn_prediction: int
    churn_probability: float
    confidence_level: str

class BatchPredictionResponse(BaseModel):
    count: int
    results: List[PredictionResponse]

# Confidence rating schema

# Confidence rating schema

# Confidence rating schema

# Confidence rating schema

# Confidence rating schema
