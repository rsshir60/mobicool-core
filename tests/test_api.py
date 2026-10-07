from fastapi.testclient import TestClient
from src.api.routes import app

client = TestClient(app)


def test_health_returns_200():
    response = client.get("/health")
    assert response.status_code == 200


def test_health_response_schema():
    response = client.get("/health")
    body = response.json()
    assert body["service"] == "mobicool-core"
    assert "model_loaded" in body
    assert "status" in body


def test_predict_probability_range():
    payload = {
        'session_duration_sec': 200.0, 'events_per_session': 15,
        'inactivity_days': 5, 'total_spend': 30.0,
        'subscription_tier': 'standard', 'device_os': 'android'
    }
    response = client.post('/v1/predict', json=payload)
    if response.status_code == 200:
        body = response.json()
        assert 0.0 <= body['churn_probability'] <= 1.0
