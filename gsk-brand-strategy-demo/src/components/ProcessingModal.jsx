import React, { useState, useEffect } from 'react';

const ProcessingModal = ({ isOpen, onClose, projectData }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const processingSteps = [
    { text: "Document analysis complete", duration: 8000 },
    { text: "Extracting strategy components...", duration: 8000 },
    { text: "Mapping to system configuration", duration: 6000 },
    { text: "Generating template", duration: 3000 }
  ];

  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      setCurrentStep(0);
      setTimeElapsed(0);
      return;
    }

    let progressInterval;
    let stepTimeout;
    let timeInterval;

    // Start time counter
    timeInterval = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    // Handle step progression
    const processStep = (stepIndex) => {
      if (stepIndex >= processingSteps.length) {
        setProgress(100);
        return;
      }

      setCurrentStep(stepIndex);
      const step = processingSteps[stepIndex];
      
      // Calculate progress for this step
      const stepStartProgress = (stepIndex / processingSteps.length) * 100;
      const stepEndProgress = ((stepIndex + 1) / processingSteps.length) * 100;
      
      let stepProgress = 0;
      progressInterval = setInterval(() => {
        stepProgress += 100 / (step.duration / 100); // Update every 100ms
        const totalProgress = stepStartProgress + (stepProgress / 100) * (stepEndProgress - stepStartProgress);
        setProgress(Math.min(totalProgress, stepEndProgress));
        
        if (stepProgress >= 100) {
          clearInterval(progressInterval);
          // Move to next step after a brief pause
          stepTimeout = setTimeout(() => {
            processStep(stepIndex + 1);
          }, 500);
        }
      }, 100);
    };

    // Start processing
    processStep(0);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(stepTimeout);
      clearInterval(timeInterval);
    };
  }, [isOpen]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content processing-modal">
        <div className="modal-body">
          <div className="processing-content">
            <div className="processing-spinner">
              <div className="spinner"></div>
            </div>
            
            <div className="processing-status">
              <h3>Processing Brand Strategy Document</h3>
              <p className="field-description">
                Analyzing document and extracting pharmaceutical strategy components...
              </p>
              
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              
              <div className="processing-details">
                <div className="current-step">
                  <strong>Current Step:</strong> {processingSteps[currentStep]?.text || "Processing complete"}
                </div>
                <div className="time-elapsed">
                  <strong>Time Elapsed:</strong> {formatTime(timeElapsed)}
                </div>
                <div className="progress-percent">
                  <strong>Progress:</strong> {Math.round(progress)}%
                </div>
              </div>

              <div className="demo-highlight mt-4">
                <p><strong>Demo Note:</strong> This processing simulation showcases the pharmaceutical brand strategy analysis workflow. In a real implementation, this would involve:</p>
                <ul style={{ textAlign: 'left', marginTop: '1rem' }}>
                  <li>AI-powered document parsing and analysis</li>
                  <li>Extraction of key strategy components</li>
                  <li>Mapping to pharmaceutical compliance frameworks</li>
                  <li>Generation of field-ready configurations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingModal;