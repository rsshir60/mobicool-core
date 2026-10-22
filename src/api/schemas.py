from typing import List
from pydantic import BaseModel, Field

class TelemetryPayload(BaseModel):
    session_duration_sec: float = Field(..., description="Total session duration in seconds")
    events_per_session: int = Field(..., description="Count of discrete user interactions")
    inactivity_days: int = Field(..., description="Days elapsed since prior session")
    total_spend: float = Field(..., description="Cumulative lifetime monetary spend")
    subscription_tier: str = Field("standard", description="Subscription tier: free, standard, premium")
    device_os: str = Field("ios", description="Client operating system: ios, android, web")

    model_config = {
        "json_schema_extra": {
            "example": {
                "session_duration_sec": 342.5,
                "events_per_session": 18,
                "inactivity_days": 3,
                "total_spend": 49.99,
                "subscription_tier": "standard",
                "device_os": "ios",
            }
        }
    }

class PredictionResponse(BaseModel):
    churn_prediction: int
    churn_probability: float
    confidence_level: str

class BatchPredictionResponse(BaseModel):
    count: int
    results: List[PredictionResponse]
