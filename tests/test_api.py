from fastapi.testclient import TestClient
from src.api.routes import app

client = TestClient(app)

def test_health_endpoint():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["service"] == "mobicool-core"

# Integration test fixture

# Integration test fixture

# Integration test fixture

# Integration test fixture

# Integration test fixture

# Integration test fixture

# Integration test fixture

# Integration test fixture
