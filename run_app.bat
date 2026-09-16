@echo off
TITLE CardioHealth AI Master Launcher (React + FastAPI)
echo =========================================================
echo       CardioHealth AI Application Suite Launcher
echo =========================================================
echo.

cd /d "%~dp0"

:: -----------------------------------------------------------
:: 📧 GMAIL SMTP SETUP (OPTIONAL FOR LIVE EMAIL DISPATCH)
:: -----------------------------------------------------------
set SMTP_SERVER=smtp.gmail.com
set SMTP_PORT=587
set SENDER_EMAIL=ENTER_YOUR_GMAIL_HERE@gmail.com
set SENDER_PASSWORD=ENTER_YOUR_16_DIGIT_APP_PASSWORD_HERE

echo [1/3] Starting FastAPI Backend Server on http://127.0.0.1:8000 ...
start "CardioHealth AI - FastAPI Backend" /MIN cmd /c "python -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8000"

echo [2/3] Verifying FastAPI Backend health...

:WAIT_BACKEND
powershell -Command "try { $r = [System.Net.WebRequest]::Create('http://127.0.0.1:8000/health').GetResponse(); if ($r.StatusCode -eq 'OK') { exit 0 } else { exit 1 } } catch { exit 1 }"
if %ERRORLEVEL% NEQ 0 (
    echo       Backend initializing, retrying in 1 second...
    powershell -Command "Start-Sleep -s 1"
    goto WAIT_BACKEND
)

echo.
echo [✓] FastAPI Backend is UP and Healthy!
echo [3/3] Preparing CardioHealth AI React Application...
echo.

cd react-frontend
if not exist "node_modules" (
    echo [INFO] node_modules not found. Running npm install...
    call npm install
) else (
    echo [✓] node_modules folder already exists. Skipping npm install.
)

start http://localhost:3000
npm run dev

pause
