@echo off
REM Silkworm Gender Classifier - Backend Startup Script

echo.
echo 🧬 Silkworm Gender Classifier - Backend Server
echo =============================================
echo.

cd backend

REM Check if venv exists
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Install requirements
echo Installing dependencies...
pip install -r requirements.txt > nul 2>&1

REM Start server
echo.
echo ✅ Starting FastAPI server...
echo 📍 API URL: http://localhost:8000
echo 📖 Docs: http://localhost:8000/docs
echo 🏥 Health: http://localhost:8000/health
echo.
echo Press Ctrl+C to stop
echo.

python main.py

pause
