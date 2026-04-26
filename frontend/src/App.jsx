import { useState, useRef, useEffect } from 'react'
import CameraFeed from './components/CameraFeed'
import Results from './components/Results'
import './App.css'

export default function App() {
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('camera')
  const fileInputRef = useRef(null)

  const API_URL = 'http://localhost:8000'

  const processImage = async (imageData) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`${API_URL}/classify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image_data: imageData })
      })

      if (!response.ok) throw new Error('Classification failed')

      const data = await response.json()
      setResults({
        ...data,
        timestamp: new Date().toLocaleTimeString()
      })
    } catch (err) {
      setError(err.message || 'Failed to process image')
    } finally {
      setLoading(false)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      processImage(event.target.result)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1>🧬 Silkworm Gender Classifier</h1>
          <p>Real-time classification using live camera or image upload</p>
        </div>
      </header>

      <main className="main-container">
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'camera' ? 'active' : ''}`}
            onClick={() => setActiveTab('camera')}
          >
            📷 Live Camera
          </button>
          <button
            className={`tab ${activeTab === 'upload' ? 'active' : ''}`}
            onClick={() => setActiveTab('upload')}
          >
            📁 Upload Image
          </button>
        </div>

        <div className="content-area">
          {activeTab === 'camera' && (
            <CameraFeed onCapture={processImage} loading={loading} />
          )}

          {activeTab === 'upload' && (
            <div className="upload-section">
              <div className="upload-box">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <button
                  className="upload-btn"
                  onClick={handleUploadClick}
                  disabled={loading}
                >
                  {loading ? '⏳ Processing...' : '📤 Choose Image'}
                </button>
                <p className="upload-hint">
                  Click to select an image file (JPG, PNG, etc.)
                </p>
              </div>
            </div>
          )}

          {error && <div className="error-box">{error}</div>}

          {results && <Results results={results} />}

          {loading && !results && (
            <div className="loading">
              <div className="spinner"></div>
              <p>Analyzing silkworm gender...</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
