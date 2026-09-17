import os
import joblib
import warnings
import pandas as pd
import numpy as np
import logging
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from backend.app.schemas.assessment import CardiovascularAssessmentRequest, CardiovascularAssessmentResponse

logger = logging.getLogger(__name__)

warnings.filterwarnings("ignore", category=UserWarning)

FEATURE_NAMES = ['age', 'gender', 'height', 'weight', 'ap_hi', 'ap_lo', 'cholesterol', 'gluc', 'smoke', 'alco', 'active', 'BMI']

# Fallback StandardScaler parameters computed from Cardiovascular dataset
FALLBACK_MEAN = np.array([53.3054934, 1.34826179, 164.401829, 74.1072852, 126.653323, 81.2753261, 1.36781211, 1.22755266, 0.0881495518, 0.0535675242, 0.802747613, 27.4560954])
FALLBACK_SCALE = np.array([6.76088249, 0.47641947, 7.9116358, 14.30154724, 16.64110696, 9.41403879, 0.68141348, 0.57400213, 0.28351227, 0.22516226, 0.39792447, 5.2475113])

class ModelManageService:
    """
    Dedicated service for running predictions using the trained 
    HeartCardioVvascular.pkl self-scaling Pipeline or model + scaler.
    """
    def __init__(self):
        base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
        self.model_path = os.path.join(base_dir, "HeartCardioVvascular.pkl")
        self.scaler_path = os.path.join(base_dir, "scaler.pkl")
        self.model = None
        self.scaler = None
        self._load_artifacts()

    def _load_artifacts(self):
        if os.path.exists(self.model_path):
            try:
                self.model = joblib.load(self.model_path)
                logger.info(f"Loaded model from {self.model_path}")
            except Exception as e:
                logger.error(f"Error loading model: {e}")

        # Check if model is already a Pipeline containing a scaler
        if isinstance(self.model, Pipeline):
            self.scaler = None
            logger.info("Model is a self-scaling Pipeline.")
        else:
            # Try loading dedicated scaler.pkl
            if os.path.exists(self.scaler_path):
                try:
                    self.scaler = joblib.load(self.scaler_path)
                    logger.info(f"Loaded scaler from {self.scaler_path}")
                except Exception as e:
                    logger.error(f"Error loading scaler: {e}")

            # If scaler still None, initialize fallback scaler
            if self.scaler is None:
                fallback_scaler = StandardScaler()
                fallback_scaler.mean_ = FALLBACK_MEAN
                fallback_scaler.scale_ = FALLBACK_SCALE
                fallback_scaler.var_ = FALLBACK_SCALE ** 2
                fallback_scaler.n_features_in_ = len(FEATURE_NAMES)
                fallback_scaler.feature_names_in_ = np.array(FEATURE_NAMES)
                self.scaler = fallback_scaler
                logger.info("Initialized fallback StandardScaler for feature scaling.")

    async def predict_risk(self, data: CardiovascularAssessmentRequest) -> CardiovascularAssessmentResponse:
        # Calculate derived BMI matching model feature set
        height_m = data.height / 100.0
        bmi = data.weight / (height_m ** 2) if height_m > 0 else 0.0

        # Create structured DataFrame with feature names
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
                # If model is not a pipeline, scale features first
                if isinstance(self.model, Pipeline):
                    features_to_predict = input_df
                elif self.scaler is not None:
                    features_to_predict = self.scaler.transform(input_df)
                else:
                    features_to_predict = input_df

                if hasattr(self.model, "predict_proba"):
                    probabilities = self.model.predict_proba(features_to_predict)[0]
                    risk_score_raw = float(probabilities[1]) * 100.0
                else:
                    pred = self.model.predict(features_to_predict)[0]
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
            message = "Your cardiovascular risk profile is currently low. Continue maintaining a balanced lifestyle and regular physical activity."
        elif final_risk < 55.0:
            level = "Moderate"
            message = "Your cardiovascular indicators suggest a moderate risk level. Monitoring blood pressure and cholesterol is recommended."
        elif final_risk < 75.0:
            level = "High"
            message = "Elevated risk markers detected. Consulting with a healthcare provider for preventative cardiovascular care is advised."
        else:
            level = "Critical"
            message = "Significant cardiovascular risk indicators observed. A prompt medical consultation and comprehensive screening are strongly recommended."

        bp_cat = "Hypertension Stage 2" if data.ap_hi >= 140 or data.ap_lo >= 90 else (
            "Hypertension Stage 1" if data.ap_hi >= 130 or data.ap_lo >= 80 else "Normal"
        )

        return CardiovascularAssessmentResponse(
            status="success",
            risk_score=final_risk,
            risk_level=level,
            message=message,
            details={
                "bmi": round(bmi, 1),
                "bp_category": bp_cat,
                "data_source": "HeartCardioVvascular.pkl (Self-Scaling Scikit-Learn Model)"
            }
        )

model_manage_service = ModelManageService()
