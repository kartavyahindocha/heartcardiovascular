from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"

def test_generate_assessment():
    payload = {
        "age": 55,
        "gender": 2,
        "height": 175,
        "weight": 85,
        "ap_hi": 140,
        "ap_lo": 90,
        "cholesterol": 2,
        "gluc": 1,
        "smoke": 1,
        "alco": 0,
        "active": 1
    }
    response = client.post("/api/generate", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    assert "risk_score" in data
    assert "risk_level" in data

def test_invalid_input():
    payload = {
        "age": 10,
        "gender": 1
    }
    response = client.post("/api/generate", json=payload)
    assert response.status_code == 422
