from pydantic import BaseModel, Field, EmailStr
from typing import Optional, Dict, Any

class CardiovascularAssessmentRequest(BaseModel):
    age: int = Field(..., ge=18, le=120, description="Age in years")
    gender: int = Field(..., ge=1, le=2, description="1: Female, 2: Male")
    height: float = Field(..., ge=50, le=250, description="Height in cm")
    weight: float = Field(..., ge=20, le=300, description="Height in kg")
    ap_hi: int = Field(..., ge=60, le=260, description="Systolic blood pressure (mmHg)")
    ap_lo: int = Field(..., ge=40, le=180, description="Diastolic blood pressure (mmHg)")
    cholesterol: int = Field(..., ge=1, le=3, description="1: Normal, 2: Above Normal, 3: Well Above Normal")
    gluc: int = Field(..., ge=1, le=3, description="1: Normal, 2: Above Normal, 3: Well Above Normal")
    smoke: int = Field(..., ge=0, le=1, description="0: No, 1: Yes")
    alco: int = Field(..., ge=0, le=1, description="0: No, 1: Yes")
    active: int = Field(..., ge=0, le=1, description="0: No, 1: Yes")

class EmailReportRequest(BaseModel):
    recipient_email: str = Field(..., description="Target recipient email address")
    risk_score: float = Field(..., description="Probability percentage of risk")
    risk_level: str = Field(..., description="Risk classification tier")
    bmi: float = Field(..., description="Calculated BMI")
    bp_category: str = Field(..., description="Blood Pressure Classification")

class CardiovascularAssessmentResponse(BaseModel):
    status: str
    risk_score: float = Field(..., description="Probability percentage of risk (0-100)")
    risk_level: str = Field(..., description="Low, Moderate, High, Critical")
    message: str
    details: Optional[Dict[str, Any]] = None
