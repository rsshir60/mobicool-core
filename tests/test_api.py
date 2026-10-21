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
