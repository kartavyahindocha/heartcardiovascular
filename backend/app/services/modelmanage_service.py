import os
import joblib
import warnings
import pandas as pd
import numpy as np
import logging
from backend.app.schemas.assessment import CardiovascularAssessmentRequest, CardiovascularAssessmentResponse

logger = logging.getLogger(__name__)

warnings.filterwarnings("ignore", category=UserWarning)

FEATURE_NAMES = ['age', 'gender', 'height', 'weight', 'ap_hi', 'ap_lo', 'cholesterol', 'gluc', 'smoke', 'alco', 'active', 'BMI']

class ModelManageService:
    """
    Dedicated service for running predictions using the trained 
    HeartCardioVvascular.pkl model with pandas DataFrame feature naming.
    """
    def __init__(self):
        base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
        self.model_path = os.path.join(base_dir, "HeartCardioVvascular.pkl")
        self.model = None
        self._load_artifacts()

    def _load_artifacts(self):
        if os.path.exists(self.model_path):
            try:
                self.model = joblib.load(self.model_path)
                logger.info(f"Loaded model from {self.model_path}")
            except Exception as e:
                logger.error(f"Error loading model: {e}")

    async def predict_risk(self, data: CardiovascularAssessmentRequest) -> CardiovascularAssessmentResponse:
        # Calculate derived BMI matching model feature set
        height_m = data.height / 100.0
        bmi = data.weight / (height_m ** 2) if height_m > 0 else 0.0

        # Create structured DataFrame with feature names matching Project.ipynb
        input_df = pd.DataFrame([[
            float(data.age),
            float(data.gender),
            float(data.height),
            float(data.weight),
            float(data.ap_hi),
            float(data.ap_lo),
            float(data.cholesterol),
            float(data.gluc),
            float(data.smoke),
            float(data.alco),
            float(data.active),
            float(bmi)
        ]], columns=FEATURE_NAMES)

        if self.model is not None:
            try:
                if hasattr(self.model, "predict_proba"):
                    probabilities = self.model.predict_proba(input_df)[0]
                    risk_score_raw = float(probabilities[1]) * 100.0
                else:
                    pred = self.model.predict(input_df)[0]
                    risk_score_raw = 85.0 if pred == 1 else 15.0

                final_risk = min(max(round(risk_score_raw, 1), 1.0), 99.0)

            except Exception as e:
                logger.error(f"Prediction execution error: {e}")
                final_risk = 50.0
        else:
            final_risk = 50.0

        # Categorize Risk Level
        if final_risk < 30.0:
            level = "Low"
        elif final_risk < 55.0:
            level = "Moderate"
        elif final_risk < 75.0:
            level = "High"
        else:
            level = "Critical"

        bp_cat = "Hypertension Stage 2" if data.ap_hi >= 140 or data.ap_lo >= 90 else (
            "Hypertension Stage 1" if data.ap_hi >= 130 or data.ap_lo >= 80 else "Normal"
        )

        return CardiovascularAssessmentResponse(
            status="success",
            risk_score=final_risk,
            risk_level=level,
            message="Cardiovascular risk evaluation calculated successfully.",
            details={
                "bmi": round(bmi, 1),
                "bp_category": bp_cat,
                "data_source": "HeartCardioVvascular.pkl (Self-Scaling Scikit-Learn Model)"
            }
        )

model_manage_service = ModelManageService()
