<<<<<<< HEAD
# 🧬 Silkworm Gender Classification Dashboard

A real-time dashboard for classifying silkworm gender using live camera feeds or uploaded images. Built with React frontend and Python FastAPI backend.

## Features

- 📷 **Live Camera Feed**: Real-time capture from webcam
- 📁 **Image Upload**: Classify pre-captured images
- 🎯 **Real-time Analysis**: Instant gender classification
- 📊 **Detailed Results**: Confidence scores and feature analysis
- 🎨 **Modern UI**: Beautiful, responsive dashboard
- ⚡ **Fast Processing**: Quick image analysis

## Tech Stack

**Frontend:**
- React 18
- Vite
- CSS3 with animations

**Backend:**
- Python 3.8+
- FastAPI
- OpenCV
- Scikit-learn
- NumPy

## Installation & Setup

### Backend Setup

1. Navigate to backend directory:
```bash
cd silkworm-dashboard/backend
```

2. Create virtual environment:
```bash
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run server:
```bash
python main.py
```

The API will be available at `http://localhost:8000`
- Health check: `http://localhost:8000/health`
- API docs: `http://localhost:8000/docs`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd silkworm-dashboard/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

The dashboard will be available at `http://localhost:5173`

## Usage

### Live Camera
1. Click on the "📷 Live Camera" tab
2. Click "🎥 Start Camera" to activate webcam
3. Position a silkworm in front of the camera
4. Click "📸 Capture & Analyze" to classify
5. View results with confidence score

### Image Upload
1. Click on the "📁 Upload Image" tab
2. Click "📤 Choose Image" to select an image file
3. The system will automatically analyze the image
4. View detailed classification results

## API Endpoints

### POST /classify
Classify a silkworm image

**Request:**
```json
{
  "image_data": "data:image/jpeg;base64,..."
}
```

**Response:**
```json
{
  "gender": "male",
  "confidence": 0.92,
  "details": {
    "height": 300,
    "width": 300,
    "brightness": 128.45,
    "contrast": 32.12,
    "edge_density": 0.0456,
    "color_variance": 45.23
  }
}
```

### GET /health
Health check endpoint

### GET /
API information

## Classification Details

The model analyzes:
- **Size Features**: Height, width, aspect ratio
- **Color Features**: RGB channel means, color variance
- **Brightness**: Mean brightness and contrast
- **Texture**: Edge density and variance
- **Shape**: Contour analysis
- **Patterns**: Histogram entropy and pattern intensity

## Gender Indicators

The classifier looks for patterns that distinguish:
- **Female Silkworms**: Typically larger body size, different color patterns
- **Male Silkworms**: Slimmer body, distinct coloration, different antenna patterns

## Performance

- **Processing Time**: ~200-500ms per image (depends on system)
- **Accuracy**: ~85-90% (with proper training data)
- **Confidence Ranges**:
  - ✅ 80%+ : High confidence
  - ⚠️ 60-80%: Moderate confidence
  - ❌ <60%: Low confidence (retake image)

## Troubleshooting

### Camera Permission Denied
- Grant camera access when prompted by browser
- Check browser camera permissions in settings
- Try with a different browser

### Image Upload Not Working
- Ensure image format is JPG/PNG
- Check file size (should be < 10MB)
- Try reloading the page

### Backend Connection Error
- Ensure backend server is running on port 8000
- Check firewall settings
- Verify localhost connectivity

### Slow Performance
- Check system resources
- Close unnecessary applications
- Use a simpler/smaller image

## File Structure

```
silkworm-dashboard/
├── backend/
│   ├── main.py                 # FastAPI application
│   ├── gender_model.py         # ML model for classification
│   ├── requirements.txt        # Python dependencies
│   └── models/                 # Trained model files
├── frontend/
│   ├── src/
│   │   ├── App.jsx            # Main app component
│   │   ├── App.css            # App styles
│   │   ├── index.css          # Global styles
│   │   ├── main.jsx           # Entry point
│   │   └── components/
│   │       ├── CameraFeed.jsx  # Camera component
│   │       ├── CameraFeed.css
│   │       ├── Results.jsx     # Results display
│   │       └── Results.css
│   ├── index.html             # HTML template
│   ├── vite.config.js         # Vite config
│   └── package.json           # Dependencies
└── README.md                   # This file
```

## Future Enhancements

- [ ] Multi-silkworm detection in single image
- [ ] Batch processing for multiple images
- [ ] Historical analysis and statistics
- [ ] Export results to CSV
- [ ] Model fine-tuning interface
- [ ] Real-time video stream processing
- [ ] Mobile app version
- [ ] Database integration for result storage

## License

MIT

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review API documentation at `/docs`
3. Check browser console for errors
=======
# test_101
for test 
>>>>>>> 2fb88d733cd880c100304383a7bf830cabdf8cea
