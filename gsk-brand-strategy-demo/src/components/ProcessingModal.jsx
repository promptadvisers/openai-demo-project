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
    <div className="modal-overlay flex items-center justify-center">
      <div className="modal-content processing-modal" style={{ maxWidth: '600px' }}>
        <div className="modal-body">
          <div className="processing-content">
            {/* Centered spinner */}
            <div className="flex justify-center" style={{ marginTop: '1.5rem', marginBottom: '2rem' }}>
              <div className="processing-spinner">
                <div className="spinner"></div>
              </div>
            </div>

            <div className="processing-status">
              <h3 className="text-center mb-2">
                Processing Brand Strategy Document
              </h3>
              <p className="text-center font-size-sm mb-8">
                AI is analyzing your document and extracting key strategic elements
              </p>
              
              {/* Current step display */}
              <div className="text-center mb-6 font-weight-500" style={{
                color: 'var(--primary-blue)',
                fontSize: '0.95rem',
                minHeight: '24px'
              }}>
                {steps[currentStep]?.text || "Initializing..."}
              </div>
              
              {/* Progress bar */}
              <div className="progress-bar mb-3">
                <div 
                  className="progress-fill" 
                  style={{ width: `${progress}%` }}
                />
              </div>
              
              {/* Progress percentage */}
              <div className="text-center font-size-sm mb-8">
                {Math.round(progress)}% Complete
              </div>

              {/* Processing steps list */}
              <div className="padding-6 border-radius-lg" style={{
                background: 'var(--primary-bg)',
                border: '1px solid var(--border-color)',
                paddingBottom: '1.5rem'
              }}>
                <h4 className="font-size-sm font-weight-600 mb-4" style={{
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Processing Steps
                </h4>
                <div className="processing-steps">
                  {steps.map((step, index) => (
                    <div 
                      key={index} 
                      className="flex items-center mb-3 transition"
                      style={{
                        opacity: index <= currentStep ? 1 : 0.4,
                        gap: '0.75rem'
                      }}
                    >
                      <div className="flex items-center justify-center flex-shrink-0 font-weight-600" style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: index < currentStep ? 'var(--success)' : 
                                   index === currentStep ? 'var(--primary-blue)' : 
                                   'var(--border-color)',
                        color: 'white',
                        fontSize: '0.75rem'
                      }}>
                        {index < currentStep ? (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                          </svg>
                        ) : (
                          <span>{index + 1}</span>
                        )}
                      </div>
                      <span className="font-size-sm" style={{
                        color: index <= currentStep ? 'var(--text-primary)' : 'var(--text-secondary)'
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