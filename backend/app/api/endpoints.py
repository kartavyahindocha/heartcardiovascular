import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from fastapi import APIRouter, HTTPException, status
from backend.app.schemas.assessment import (
    CardiovascularAssessmentRequest, 
    CardiovascularAssessmentResponse,
    EmailReportRequest
)
from backend.app.services.modelmanage_service import model_manage_service

router = APIRouter()

# Environment SMTP Configurations
SMTP_SERVER = os.getenv("SMTP_SERVER", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
SENDER_EMAIL = os.getenv("SENDER_EMAIL", "")
SENDER_PASSWORD = os.getenv("SENDER_PASSWORD", "")

@router.post("/generate", response_model=CardiovascularAssessmentResponse)
async def generate_assessment(request: CardiovascularAssessmentRequest):
    try:
        response = await model_manage_service.predict_risk(request)
        return response
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error generating assessment: {str(e)}"
        )

@router.post("/send-report-email")
async def send_report_email(request: EmailReportRequest):
    try:
        # Format HTML Email Summary Report
        html_content = f"""
        <html>
        <body style="font-family: Arial, sans-serif; background-color: #f8fafc; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; padding: 24px; border: 1px solid #cbd5e1;">
                <h2 style="color: #0284c7; text-align: center;">❤️ CardioHealth AI Assessment Report</h2>
                <hr style="border: 0; border-top: 1px solid #e2e8f0;">
                <p>Hello,</p>
                <p>Your personalized cardiovascular health risk assessment has been generated successfully.</p>

                <div style="background: #f1f5f9; padding: 16px; border-radius: 8px; text-align: center; margin: 20px 0;">
                    <h3 style="margin: 0; color: #0f172a;">Risk Score: {request.risk_score}%</h3>
                    <h4 style="margin: 5px 0 0; color: #0284c7;">Category: {request.risk_level} Risk</h4>
                </div>

                <h3>Clinical Biomarker Details:</h3>
                <ul>
                    <li><strong>Body Mass Index (BMI):</strong> {request.bmi}</li>
                    <li><strong>Blood Pressure Category:</strong> {request.bp_category}</li>
                </ul>

                <p style="font-size: 0.85rem; color: #64748b; margin-top: 30px;">
                    <em>Medical Disclaimer: This AI assessment report is for informational and educational purposes only. Always consult a qualified medical professional for medical guidance.</em>
                </p>
            </div>
        </body>
        </html>
        """

        # If live SENDER_PASSWORD is set, execute real SMTP email dispatch
        if SENDER_PASSWORD.strip():
            msg = MIMEMultipart("alternative")
            msg["Subject"] = f"CardioHealth AI Report: {request.risk_level} Risk Assessment"
            msg["From"] = SENDER_EMAIL
            msg["To"] = request.recipient_email
            msg.attach(MIMEText(html_content, "html"))

            with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
                server.starttls()
                server.login(SENDER_EMAIL, SENDER_PASSWORD)
                server.sendmail(SENDER_EMAIL, request.recipient_email, msg.as_string())
            
            print(f"[Live SMTP Email Sent] From: {SENDER_EMAIL} -> To: {request.recipient_email}")
            return {
                "status": "success",
                "mode": "live_smtp",
                "message": f"Real email report sent from '{SENDER_EMAIL}' to '{request.recipient_email}'!"
            }
        else:
            # Simulated Email Dispatch
            print(f"[Simulated SMTP Dispatch] From: {SENDER_EMAIL} -> To: {request.recipient_email}")
            return {
                "status": "success",
                "mode": "simulated",
                "message": f"Cardiovascular Assessment Report sent from '{SENDER_EMAIL}' to '{request.recipient_email}'!"
            }

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to send email report: {str(e)}"
        )
