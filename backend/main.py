from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import logging
from gender_model import classifier

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Silkworm Gender Classifier API",
    description="Real-time silkworm gender classification using image analysis",
    version="1.0.0"
)

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ImageRequest(BaseModel):
    image_data: str

class ClassificationResponse(BaseModel):
    gender: str
    confidence: float
    details: dict
    image_path: str = None

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "model_trained": classifier.is_trained
    }

@app.post("/classify", response_model=ClassificationResponse)
async def classify_image(request: ImageRequest):
    """
    Classify silkworm gender from image
    """
    try:
        if not request.image_data:
            raise HTTPException(status_code=400, detail="No image data provided")

        result = classifier.predict(request.image_data)

        return ClassificationResponse(
            gender=result['gender'],
            confidence=result['confidence'],
            details=result['details']
        )

    except Exception as e:
        logger.error(f"Classification error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Classification failed: {str(e)}")

@app.get("/")
async def root():
    """API information"""
    return {
        "name": "Silkworm Gender Classifier",
        "version": "1.0.0",
        "endpoints": {
            "health": "/health",
            "classify": "/classify (POST)",
            "docs": "/docs"
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
