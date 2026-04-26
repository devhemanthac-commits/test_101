# Deployment Guide

## GitHub Pages (Frontend Only)

The frontend React app is deployed to GitHub Pages at:
**https://devhemanthac-commits.github.io/test_101/**

### Setup

1. **Enable GitHub Pages in repository settings:**
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` / `/ (root)`
   - Click Save

2. **Automatic Deployment (via GitHub Actions):**
   - Push changes to `main` branch
   - GitHub Actions will automatically build and deploy

3. **Manual Deployment:**
   ```bash
   # Build the frontend
   cd frontend
   npm run build
   
   # Deploy using git subtree
   cd ..
   git subtree push --prefix frontend/dist origin gh-pages
   ```

### Important Notes

⚠️ **Backend API Not Included**: GitHub Pages only hosts static files. The backend API is not deployed.

- Frontend will show but cannot classify images without a running backend
- For full functionality, deploy backend separately to:
  - Heroku (deprecated)
  - Railway.app
  - Render.com
  - DigitalOcean
  - AWS Lambda + API Gateway
  - Vercel (with serverless functions)

## Deploy Backend to Render.com (Free)

1. **Create account at render.com**

2. **Deploy FastAPI backend:**
   ```bash
   # Push code to GitHub
   git push origin main
   ```

3. **In Render dashboard:**
   - New → Web Service
   - Connect GitHub repo
   - Settings:
     - Root Directory: `backend`
     - Build Command: `pip install -r requirements.txt`
     - Start Command: `uvicorn main:app --host 0.0.0.0 --port 10000`
   - Create Web Service

4. **Update frontend API URL:**
   - Edit `frontend/src/App.jsx`
   - Change `API_URL = 'http://localhost:8000'` to your Render URL
   - Rebuild and redeploy

## Full-Stack Deployment (Alternative)

For a complete deployment on one platform:

- **Vercel**: Deploy both frontend and backend
- **Railway**: Full-stack template support
- **Heroku**: (limited free tier)

## Local Development

```bash
# Terminal 1: Backend
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python main.py

# Terminal 2: Frontend
cd frontend
npm install
npm run dev
```

Access at http://localhost:5173

## Build for Production

```bash
# Frontend
cd frontend
npm run build
# Creates dist/ folder

# Backend runs with:
python main.py
```
