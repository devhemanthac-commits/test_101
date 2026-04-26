import './Results.css'

export default function Results({ results }) {
  const { gender, confidence, details, timestamp, image_path } = results

  const getGenderEmoji = (g) => g === 'male' ? '🧬♂️' : '🧬♀️'
  const getGenderLabel = (g) => g === 'male' ? 'Male' : 'Female'

  const confidencePercentage = Math.round(confidence * 100)
  const confidenceColor =
    confidencePercentage >= 80 ? '#10b981' :
    confidencePercentage >= 60 ? '#f59e0b' :
    '#ef4444'

  return (
    <div className="results-container">
      <div className="results-header">
        <h2>🔬 Classification Result</h2>
        <p className="timestamp">Time: {timestamp}</p>
      </div>

      <div className="result-card">
        <div className="gender-display">
          <div className="gender-emoji">{getGenderEmoji(gender)}</div>
          <div className="gender-info">
            <h3>Classification</h3>
            <p className="gender-label">{getGenderLabel(gender)}</p>
          </div>
        </div>

        <div className="confidence-section">
          <div className="confidence-header">
            <span>Confidence Score</span>
            <span style={{ color: confidenceColor }}>
              {confidencePercentage}%
            </span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${confidencePercentage}%`,
                backgroundColor: confidenceColor
              }}
            ></div>
          </div>
          <p className="confidence-text">
            {confidencePercentage >= 80 && '✅ High confidence classification'}
            {confidencePercentage >= 60 && confidencePercentage < 80 && '⚠️ Moderate confidence'}
            {confidencePercentage < 60 && '❌ Low confidence - consider capturing another image'}
          </p>
        </div>

        {details && (
          <div className="details-section">
            <h4>Analysis Details</h4>
            <ul>
              {Object.entries(details).map(([key, value]) => (
                <li key={key}>
                  <span className="detail-key">{key}:</span>
                  <span className="detail-value">
                    {typeof value === 'number' ? value.toFixed(3) : value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
