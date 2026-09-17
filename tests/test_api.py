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

def test_risk_score_differentiation():
    # Healthy young profile
    healthy_payload = {
        "age": 25, "gender": 1, "height": 165.0, "weight": 50.0,
        "ap_hi": 110, "ap_lo": 70, "cholesterol": 1, "gluc": 1,
        "smoke": 0, "alco": 0, "active": 1
    }
    # High risk profile
    high_risk_payload = {
        "age": 65, "gender": 2, "height": 175.0, "weight": 110.0,
        "ap_hi": 160, "ap_lo": 100, "cholesterol": 3, "gluc": 3,
        "smoke": 1, "alco": 1, "active": 0
    }

    r_healthy = client.post("/api/generate", json=healthy_payload)
    r_high_risk = client.post("/api/generate", json=high_risk_payload)

    assert r_healthy.status_code == 200
    assert r_high_risk.status_code == 200

    score_healthy = r_healthy.json()["risk_score"]
    score_high = r_high_risk.json()["risk_score"]

    # Scores must significantly differ and reflect risk profiles
    assert score_healthy < 40.0
    assert score_high > 60.0
    assert abs(score_high - score_healthy) > 20.0
    assert r_healthy.json()["risk_level"] != r_high_risk.json()["risk_level"]

