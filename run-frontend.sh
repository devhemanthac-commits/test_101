#!/bin/bash

# Silkworm Gender Classifier - Frontend Startup Script

echo "🧬 Silkworm Gender Classifier - Frontend Dashboard"
echo "=================================================="

cd frontend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Start dev server
echo ""
echo "✅ Starting Vite dev server..."
echo "📍 Dashboard: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop"
echo ""

npm run dev
