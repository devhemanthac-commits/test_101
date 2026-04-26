import { useState, useRef, useEffect } from 'react'
import './CameraFeed.css'

export default function CameraFeed({ onCapture, loading }) {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [isCameraOn, setIsCameraOn] = useState(false)
  const [cameraError, setCameraError] = useState(null)
  const streamRef = useRef(null)

  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  const startCamera = async () => {
    try {
      setCameraError(null)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setIsCameraOn(true)
      }
    } catch (err) {
      setCameraError('Camera access denied or not available')
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      setIsCameraOn(false)
    }
  }

  const captureFrame = () => {
    if (!videoRef.current || !canvasRef.current) return

    const context = canvasRef.current.getContext('2d')
    canvasRef.current.width = videoRef.current.videoWidth
    canvasRef.current.height = videoRef.current.videoHeight

    context.drawImage(videoRef.current, 0, 0)
    const imageData = canvasRef.current.toDataURL('image/jpeg')

    onCapture(imageData)
  }

  return (
    <div className="camera-feed">
      {!isCameraOn ? (
        <div className="camera-inactive">
          <div className="camera-icon">📷</div>
          <h3>Start Live Camera</h3>
          <button
            className="start-camera-btn"
            onClick={startCamera}
            disabled={loading}
          >
            {loading ? '⏳ Processing...' : '🎥 Start Camera'}
          </button>
          {cameraError && <p className="error-text">{cameraError}</p>}
        </div>
      ) : (
        <div className="camera-active">
          <div className="video-container">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
            ></video>
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
          </div>

          <div className="camera-controls">
            <button
              className="capture-btn"
              onClick={captureFrame}
              disabled={loading}
            >
              {loading ? '⏳ Analyzing...' : '📸 Capture & Analyze'}
            </button>
            <button
              className="stop-camera-btn"
              onClick={stopCamera}
              disabled={loading}
            >
              🛑 Stop
            </button>
          </div>

          <div className="camera-info">
            <p>🟢 Camera Active - Click "Capture & Analyze" to classify</p>
          </div>
        </div>
      )}
    </div>
  )
}
