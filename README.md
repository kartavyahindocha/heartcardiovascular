# ❤️ CardioHealth AI (HeartCardiovascular) — React + FastAPI Platform

CardioHealth AI is a modern, responsive, and interactive clinical assessment and analytics platform powered by a **React 19 + Vite** frontend, **Tailwind CSS v4**, **Three.js** 3D WebGL visualizations, **Recharts** interactive clinical analytics, and a **FastAPI** machine learning inference backend trained on 70,000+ patient records.

---

## 🚀 Architecture Overview

```text
               ┌──────────────────────────────────────────────┐
               │    React 19 + Vite Frontend (Port 3000)      │
               │  - Interactive 3D WebGL Heart (Three.js)      │
               │  - Speedometer Risk Gauge Canvas             │
               │  - Recharts Clinical Analytics Dashboard     │
               │  - Dark / Light Theme Support & Tailwind v4  │
               └──────────────────────┬───────────────────────┘
                                      │  REST API Calls (/api/*)
                                      ▼
               ┌──────────────────────────────────────────────┐
               │         FastAPI Backend (Port 8000)          │
               │  - /api/generate (ML Inference Engine)       │
               │  - /api/send-report-email (SMTP Dispatch)   │
               │  - /health (System Liveness)                 │
               └──────────────────────┬───────────────────────┘
                                      │
                                      ▼
               ┌──────────────────────────────────────────────┐
               │     HeartCardioVvascular.pkl ML Model        │
               │     (Trained on 70,000 Patient Records)       │
               └──────────────────────────────────────────────┘
```

---

## ⚡ Quick Start

### 1️⃣ Run Everything with Master Launcher (Windows)
Double-click `run_app.bat` or run:
```cmd
run_app.bat
```
This automatically:
- Starts the FastAPI backend service on `http://127.0.0.1:8000`
- Verifies backend health check at `/health`
- Starts the Vite React dev server on `http://localhost:3000`
- Opens `http://localhost:3000` in your default browser

### 2️⃣ Manual Setup

#### Backend (FastAPI):
```bash
python -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8000
```

#### Frontend (React + Vite):
```bash
cd react-frontend
npm install
npm run dev
```

---

## ✨ Features & Highlights

- **Interactive 3D Heart Model**: Built with Three.js featuring drag-to-rotate interaction, real-time lighting, and beating pulse animation.
- **Speedometer Risk Gauge**: HTML5 Canvas speedometer sweeping animated arc displaying calculated risk percentage and tier badges.
- **Biomarker Health Breakdown**: Dynamic BMI calculator, Blood Pressure classification, and progress bar breakdown.
- **Email Report Dispatch**: Send personalized HTML reports to patients or doctors via backend SMTP endpoint.
- **Clinical Analytics Dashboard**: Recharts visualization for Age Group Risk, Blood Pressure Impact curve, Lifestyle Multipliers, and BMI Spectrum.
- **Responsive & Accessible**: Fully optimized for mobile, tablet, and desktop screens with dark and light theme toggle support.
>>>>>>> 1b9515b (Initial commit: HeartCardiovascular ML platform with React frontend and FastAPI backend)
