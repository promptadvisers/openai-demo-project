import React from 'react';

const WorkflowStepIndicator = ({ currentStep, userType = 'pharma' }) => {
  const steps = [
    { 
      number: 1, 
      title: 'Upload & Extract', 
      description: 'Upload Brand Strategy Content',
      accessible: true 
    },
    { 
      number: 2, 
      title: 'Review & Validate', 
      description: 'Review Brand Strategy Summary',
      accessible: true 
    },
    { 
      number: 3, 
      title: 'Configure Strategy', 
      description: 'Map to Simulation Project Template',
      accessible: userType === 'internal' 
    },
    { 
      number: 4, 
      title: 'Run Simulations', 
      description: 'Execute Brand Strategy Agent',
      accessible: userType === 'internal' 
    },
    { 
      number: 5, 
      title: 'Validate Results', 
      description: 'Review simulation reports',
      accessible: userType === 'internal' 
    },
    { 
      number: 6, 
      title: 'Deploy Template', 
      description: 'Deploy Simulation Project Template',
      accessible: userType === 'internal' 
    },
    { 
      number: 7, 
      title: 'Monitor Performance', 
      description: 'Track deployment metrics',
      accessible: userType === 'internal' 
    }
  ];

  const visibleSteps = steps.filter(step => step.accessible);
  const totalSteps = visibleSteps.length;

  return (
    <div className="workflow-step-indicator">
      <div className="step-header">
        <h3>Brand Strategy Workflow</h3>
        <div className="step-progress">
          Step {currentStep} of {totalSteps}
        </div>
      </div>
      
      <div className="step-timeline">
        {visibleSteps.map((step, index) => {
          const isActive = step.number === currentStep;
          const isCompleted = step.number < currentStep;
          const isUpcoming = step.number > currentStep;
          
          return (
            <div 
              key={step.number} 
              className={`step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''} ${isUpcoming ? 'upcoming' : ''}`}
            >
              <div className="step-indicator">
                <div className="step-number">
                  {isCompleted ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  ) : (
                    step.number
                  )}
                </div>
                {index < visibleSteps.length - 1 && (
                  <div className={`step-connector ${isCompleted ? 'completed' : ''}`}></div>
                )}
              </div>
              
              <div className="step-content">
                <div className="step-title">{step.title}</div>
                <div className="step-description">{step.description}</div>
              </div>
            </div>
          );
        })}
      </div>

      {userType === 'pharma' && (
        <div className="workflow-note">
          <div className="note-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <div className="note-text">
            Simplified workflow for pharmaceutical users. Steps 3-7 are handled by our Brand Strategy Agent.
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkflowStepIndicator;