import React, { useState, useEffect } from 'react';

const ProcessingModal = ({ isOpen, onClose, projectData }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    { text: "Analyzing document structure...", duration: 10 },
    { text: "Extracting brand strategy components...", duration: 15 },
    { text: "Identifying key objectives and goals...", duration: 10 },
    { text: "Mapping market segments...", duration: 10 },
    { text: "Processing competitive insights...", duration: 10 },
    { text: "Generating field configuration...", duration: 10 },
    { text: "Optimizing targeting parameters...", duration: 10 },
    { text: "Finalizing strategy template...", duration: 10 }
  ];

  useEffect(() => {
    if (isOpen) {
      const totalDuration = 45000; // 45 seconds
      const progressInterval = 100; // Update every 100ms
      const progressIncrement = 100 / (totalDuration / progressInterval);
      
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + progressIncrement;
          return newProgress >= 100 ? 100 : newProgress;
        });
      }, progressInterval);

      // Update steps
      let stepTimeouts = [];
      let accumulatedTime = 0;
      
      steps.forEach((step, index) => {
        const timeout = setTimeout(() => {
          setCurrentStep(index);
        }, accumulatedTime);
        stepTimeouts.push(timeout);
        accumulatedTime += (step.duration / 85) * totalDuration; // Scale to 45 seconds
      });

      return () => {
        clearInterval(interval);
        stepTimeouts.forEach(timeout => clearTimeout(timeout));
        setProgress(0);
        setCurrentStep(0);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="modal-content processing-modal" style={{ maxWidth: '600px' }}>
        <div className="modal-body">
          <div className="processing-content">
            {/* Centered spinner */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              marginTop: '1rem',
              marginBottom: '2rem' 
            }}>
              <div className="processing-spinner">
                <div className="spinner"></div>
              </div>
            </div>

            <div className="processing-status">
              <h3 style={{ 
                textAlign: 'center', 
                color: 'var(--text-primary)',
                marginBottom: '0.5rem'
              }}>
                Processing Brand Strategy Document
              </h3>
              <p style={{ 
                textAlign: 'center', 
                color: 'var(--text-secondary)',
                fontSize: '0.875rem',
                marginBottom: '2rem'
              }}>
                AI is analyzing your document and extracting key strategic elements
              </p>
              
              {/* Current step display */}
              <div style={{
                textAlign: 'center',
                color: 'var(--primary-blue)',
                fontSize: '0.95rem',
                fontWeight: '500',
                marginBottom: '1.5rem',
                minHeight: '24px'
              }}>
                {steps[currentStep]?.text || "Initializing..."}
              </div>
              
              {/* Progress bar */}
              <div className="progress-bar" style={{ marginBottom: '0.75rem' }}>
                <div 
                  className="progress-fill" 
                  style={{ width: `${progress}%` }}
                />
              </div>
              
              {/* Progress percentage */}
              <div style={{
                textAlign: 'center',
                color: 'var(--text-secondary)',
                fontSize: '0.875rem',
                marginBottom: '2rem'
              }}>
                {Math.round(progress)}% Complete
              </div>

              {/* Processing steps list */}
              <div style={{
                background: 'var(--primary-bg)',
                borderRadius: '8px',
                padding: '1.5rem',
                border: '1px solid var(--border-color)'
              }}>
                <h4 style={{
                  color: 'var(--text-primary)',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Processing Steps
                </h4>
                <div className="processing-steps">
                  {steps.map((step, index) => (
                    <div 
                      key={index} 
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        marginBottom: '0.75rem',
                        opacity: index <= currentStep ? 1 : 0.4,
                        transition: 'opacity 300ms'
                      }}
                    >
                      <div style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: index < currentStep ? 'var(--success)' : 
                                   index === currentStep ? 'var(--primary-blue)' : 
                                   'var(--border-color)',
                        color: 'white',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        flexShrink: 0
                      }}>
                        {index < currentStep ? (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                          </svg>
                        ) : (
                          <span>{index + 1}</span>
                        )}
                      </div>
                      <span style={{
                        color: index <= currentStep ? 'var(--text-primary)' : 'var(--text-secondary)',
                        fontSize: '0.875rem'
                      }}>
                        {step.text.replace('...', '')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingModal;