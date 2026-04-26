# Quick Start Guide

## One-Command Setup (Recommended)

### Windows PowerShell

```powershell
# Terminal 1 - Backend
cd silkworm-dashboard\backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

```powershell
# Terminal 2 - Frontend
cd silkworm-dashboard\frontend
npm install
npm run dev
```

### macOS/Linux

```bash
# Terminal 1 - Backend
cd silkworm-dashboard/backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python main.py
```

```bash
# Terminal 2 - Frontend
cd silkworm-dashboard/frontend
npm install
npm run dev
```

## Access the Application

After both servers are running:
- **Dashboard**: Open http://localhost:5173 in your browser
- **API Docs**: Open http://localhost:8000/docs

## First Steps

1. **Test Backend API**
   - Visit http://localhost:8000/health
   - Should show `{"status":"healthy","model_trained":true}`

2. **Access Dashboard**
   - Open http://localhost:5173
   - Click "📷 Live Camera" tab
   - Click "🎥 Start Camera"
   - Allow camera access when prompted
   - Capture an image and analyze

3. **Test Image Upload**
   - Click "📁 Upload Image" tab
   - Select an image from your computer
   - View classification results

## Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| `ModuleNotFoundError: No module named 'cv2'` | Run `pip install -r requirements.txt` in correct venv |
| Camera permission denied | Check browser camera settings or use incognito mode |
| Backend connection error | Ensure backend is running on http://localhost:8000 |
| Port already in use | Change port in frontend/vite.config.js and update API_URL in App.jsx |
| npm not found | Install Node.js from https://nodejs.org |
| pip not found | Ensure Python is in PATH or use `python -m pip` |

## System Requirements

- **Python**: 3.8 or higher
- **Node.js**: 16 or higher
- **RAM**: 2GB minimum
- **Camera**: For live feed feature

## Next Steps

- Review detailed documentation in [README.md](README.md)
- Check API endpoints at http://localhost:8000/docs (Swagger UI)
- Explore the code structure in each component
- Customize the ML model for better accuracy with real training data
