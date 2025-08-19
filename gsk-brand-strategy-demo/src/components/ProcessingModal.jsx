import { useState, useEffect } from 'react';
import { MOCK_DATA, sleep } from '../data/mockData';

const ProcessingModal = ({ isOpen, onClose, onProcessingComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [processingStarted, setProcessingStarted] = useState(false);

  useEffect(() => {
    if (isOpen && !processingStarted) {
      setProcessingStarted(true);
      startProcessing();
    }
  }, [isOpen, processingStarted]);

  const startProcessing = async () => {
    const steps = MOCK_DATA.processingSteps;
    
    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      const step = steps[i];
      
      // Animate progress for current step
      const startProgress = i === 0 ? 0 : steps[i - 1].progress;
      const endProgress = step.progress;
      const progressIncrement = (endProgress - startProgress) / 20;
      
      for (let p = startProgress; p <= endProgress; p += progressIncrement) {
        setProgress(Math.min(p, endProgress));
        await sleep(step.duration / 20);
      }
      
      setProgress(endProgress);
      
      // Small pause between steps
      if (i < steps.length - 1) {
        await sleep(500);
      }
    }

    // Complete processing
    await sleep(1000);
    onProcessingComplete(MOCK_DATA);
  };

  if (!isOpen) return null;

  const currentStepData = MOCK_DATA.processingSteps[currentStep];

  return (
    <div className="modal-overlay">
      <div className="modal processing-modal">
        <div className="modal-header">
          <h2>Processing Brand Strategy Document</h2>
          <div className="processing-status">
            <div className="status-indicator processing">
              <div className="spinner"></div>
            </div>
            <span>AI Agent Working...</span>
          </div>
        </div>

        <div className="modal-content">
          {/* Main Progress Section */}
          <div className="processing-main">
            <div className="processing-visual">
              <div className="processing-circle">
                <svg className="progress-ring" width="120" height="120">
                  <circle
                    className="progress-ring-background"
                    cx="60"
                    cy="60"
                    r="54"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    className="progress-ring-progress"
                    cx="60"
                    cy="60"
                    r="54"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 54}`}
                    strokeDashoffset={`${2 * Math.PI * 54 * (1 - progress / 100)}`}
                  />
                </svg>
                <div className="progress-percentage">
                  {Math.round(progress)}%
                </div>
              </div>
            </div>

            <div className="processing-details">
              <h3>{currentStepData?.text}</h3>
              <p>Our AI agent is analyzing your brand strategy document and extracting key insights.</p>
              
              <div className="processing-stats">
                <div className="processing-stat">
                  <span className="stat-label">Document Pages</span>
                  <span className="stat-value">47</span>
                </div>
                <div className="processing-stat">
                  <span className="stat-label">Sections Analyzed</span>
                  <span className="stat-value">{Math.min(12, Math.round(progress / 8))}</span>
                </div>
                <div className="processing-stat">
                  <span className="stat-label">Insights Extracted</span>
                  <span className="stat-value">{Math.min(38, Math.round(progress / 3))}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="processing-steps">
            <h4>Processing Steps</h4>
            <div className="steps-list">
              {MOCK_DATA.processingSteps.map((step, index) => (
                <div 
                  key={step.id}
                  className={`step-item ${
                    index < currentStep ? 'completed' : 
                    index === currentStep ? 'active' : 'pending'
                  }`}
                >
                  <div className="step-indicator">
                    {index < currentStep ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20,6 9,17 4,12"></polyline>
                      </svg>
                    ) : index === currentStep ? (
                      <div className="step-spinner"></div>
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  <span className="step-text">{step.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* What's Happening Behind the Scenes */}
          <div className="processing-insights">
            <h4>AI Agent Capabilities</h4>
            <div className="insights-grid">
              <div className="insight-item">
                <div className="insight-icon">🧠</div>
                <div className="insight-content">
                  <h5>Document Understanding</h5>
                  <p>Natural language processing to extract strategic objectives</p>
                </div>
              </div>
              <div className="insight-item">
                <div className="insight-icon">🎯</div>
                <div className="insight-content">
                  <h5>Audience Mapping</h5>
                  <p>Intelligent segmentation of target healthcare professionals</p>
                </div>
              </div>
              <div className="insight-item">
                <div className="insight-icon">⚙️</div>
                <div className="insight-content">
                  <h5>Configuration Generation</h5>
                  <p>Automated BOB template creation with optimal parameters</p>
                </div>
              </div>
              <div className="insight-item">
                <div className="insight-icon">📊</div>
                <div className="insight-content">
                  <h5>Performance Prediction</h5>
                  <p>AI-powered forecasting of campaign effectiveness</p>
                </div>
              </div>
            </div>
          </div>

          {/* Time Savings Highlight */}
          <div className="time-savings">
            <div className="savings-comparison">
              <div className="traditional-time">
                <span className="time-label">Traditional Process</span>
                <span className="time-value">5-6 weeks</span>
              </div>
              <div className="vs-indicator">VS</div>
              <div className="ai-time">
                <span className="time-label">AI Agent Process</span>
                <span className="time-value">15 minutes</span>
              </div>
            </div>
            <p className="savings-note">You're saving approximately <strong>$52,000</strong> in consulting and operational costs.</p>
          </div>
        </div>

        <div className="modal-footer">
          <div className="processing-note">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 6v6l4 2"></path>
            </svg>
            <span>Estimated completion time: {Math.max(0, 45 - Math.round(progress * 0.45))} seconds</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingModal;