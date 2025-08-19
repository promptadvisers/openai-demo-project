import { useState, useEffect } from 'react';

const ProcessingModal = ({ isOpen, onClose }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [processingStarted, setProcessingStarted] = useState(false);

  const steps = [
    'Document analysis complete',
    'Extracting strategy components...',
    'Mapping to system configuration',
    'Generating template'
  ];

  useEffect(() => {
    if (isOpen && !processingStarted) {
      setProcessingStarted(true);
      startProcessing();
    }
  }, [isOpen, processingStarted]);

  const startProcessing = async () => {
    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      
      // Simulate progress for each step
      const stepProgress = 25 * (i + 1);
      const startProgress = i * 25;
      
      for (let p = startProgress; p <= stepProgress; p += 2) {
        setProgress(Math.min(p, stepProgress));
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    setProgress(100);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content processing-modal">
        <div className="modal-header">
          <h2>Project Creation in Progress</h2>
        </div>

        <div className="modal-body">
          <div className="processing-content">
            <div className="processing-spinner">
              <div className="spinner"></div>
            </div>
            
            <div className="processing-status">
              <h3>{steps[currentStep]}</h3>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p>{progress}% Complete</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingModal;