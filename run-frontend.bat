@echo off
REM Silkworm Gender Classifier - Frontend Startup Script

echo.
echo 🧬 Silkworm Gender Classifier - Frontend Dashboard
echo ==================================================
echo.

cd frontend

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)

REM Start dev server
echo.
echo ✅ Starting Vite dev server...
echo 📍 Dashboard: http://localhost:5173
echo.
echo Press Ctrl+C to stop
echo.

call npm run dev

pause
