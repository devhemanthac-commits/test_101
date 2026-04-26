#!/bin/bash

# Silkworm Gender Classifier - Backend Startup Script

echo "🧬 Silkworm Gender Classifier - Backend Server"
echo "=============================================="

cd backend

# Check if venv exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python -m venv venv
fi

# Activate virtual environment
if [ -d "venv/bin" ]; then
    source venv/bin/activate
else
    source venv/Scripts/activate
fi

# Install requirements
echo "Installing dependencies..."
pip install -r requirements.txt > /dev/null 2>&1

# Start server
echo ""
echo "✅ Starting FastAPI server..."
echo "📍 API URL: http://localhost:8000"
echo "📖 Docs: http://localhost:8000/docs"
echo "🏥 Health: http://localhost:8000/health"
echo ""
echo "Press Ctrl+C to stop"
echo ""

python main.py
