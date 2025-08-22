import React, { useState } from 'react';

const WorkflowStepIndicator = ({ currentStep, userRole = 'BA', variant = 'horizontal', approvalStates = {} }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const steps = [
    { 
      number: 1, 
      title: 'Upload & Extract', 
      description: 'Upload Brand Strategy Content',
      accessible: true,
      isCheckpoint: false
    },
    { 
      number: 2, 
      title: 'Review & Validate', 
      description: 'Review Brand Strategy Summary',
      accessible: true,
      isCheckpoint: true,
      checkpointLabel: 'Client Approval Required'
    },
    { 
      number: 3, 
      title: 'Configure Strategy', 
      description: 'Map to Simulation Project Template',
      accessible: true,
      isCheckpoint: false
    },
    { 
      number: 4, 
      title: 'Run Simulations', 
      description: 'Execute Brand Strategy Agent',
      accessible: true,
      isCheckpoint: false
    },
    { 
      number: 5, 
      title: 'Validate Results', 
      description: 'Review simulation reports',
      accessible: true,
      isCheckpoint: true,
      checkpointLabel: 'Client Approval Required'
    },
    { 
      number: 6, 
      title: 'Deploy Template', 
      description: 'Deploy Simulation Project Template',
      accessible: true,
      isCheckpoint: false
    },
    { 
      number: 7, 
      title: 'Monitor Performance', 
      description: 'Track deployment metrics',
      accessible: true,
      isCheckpoint: false
    }
  ];

  const visibleSteps = steps.filter(step => step.accessible);
  const totalSteps = visibleSteps.length;
  const currentStepData = visibleSteps.find(s => s.number === currentStep);
  const completedPercentage = ((currentStep - 1) / totalSteps) * 100;

  if (isCollapsed) {
    return (
      <div 
        className="workflow-step-indicator collapsed"
        onClick={() => setIsCollapsed(false)}
      >
        <div className="step-header">
          <div className="progress-badge">
            Step {currentStep} of {totalSteps}
          </div>
          <h3 className="step-title-collapsed">{currentStepData?.title}</h3>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="collapse-icon">
            <path d="M7 10l5 5 5-5z"/>
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className={`workflow-step-indicator ${variant}`}>
      {variant === 'horizontal' ? (
        <>
          <div className="step-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.0625rem', fontWeight: '600', color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>Brand Strategy Workflow</h3>
              <div style={{
                background: 'linear-gradient(135deg, var(--primary-blue), #357ABD)',
                color: 'white',
                padding: '0.3125rem 0.875rem',
                borderRadius: '18px',
                fontSize: '0.8125rem',
                fontWeight: '600',
                boxShadow: '0 2px 6px rgba(74, 144, 226, 0.25)'
              }}>
                {Math.round(completedPercentage)}% Complete
              </div>
            </div>
            <button
              onClick={() => setIsCollapsed(true)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                padding: '0.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '4px',
                transition: 'all 200ms ease',
                opacity: 0.6
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.opacity = '0.6';
              }}
              title="Minimize"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 14l5-5 5 5z"/>
              </svg>
            </button>
          </div>
          
          <div style={{ width: '100%' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              justifyContent: 'space-between',
              width: '100%',
              position: 'relative'
            }}>
              {visibleSteps.map((step, index) => {
                const isActive = step.number === currentStep;
                const isCompleted = step.number < currentStep;
                const isUpcoming = step.number > currentStep;
                
                return (
                  <React.Fragment key={step.number}>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      flex: '1',
                      position: 'relative'
                    }}>
                      {/* Connector line - positioned absolutely */}
                      {index < visibleSteps.length - 1 && (
                        <div style={{
                          position: 'absolute',
                          top: '18px',
                          left: '50%',
                          width: '100%',
                          height: '2px',
                          background: isCompleted ? 'linear-gradient(90deg, #10B981, #4A90E2)' : 'rgba(55, 65, 81, 0.6)',
                          zIndex: 0,
                          opacity: 1
                        }}></div>
                      )}
                      
                      {/* Step circle and content */}
                      <div className={`step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''} ${isUpcoming ? 'upcoming' : ''} ${step.isCheckpoint ? 'checkpoint' : ''}`}
                           style={{ zIndex: 1, background: 'transparent', padding: 0 }}>
                        <div className="step-indicator" style={{ position: 'relative' }}>
                          {/* Checkpoint badge */}
                          {step.isCheckpoint && (
                            <div style={{
                              position: 'absolute',
                              top: '-8px',
                              right: '-8px',
                              width: '20px',
                              height: '20px',
                              background: isCompleted && approvalStates?.[`step${step.number}`]?.status === 'approved'
                                ? 'linear-gradient(135deg, #10B981, #059669)'
                                : 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              border: '2px solid var(--card-bg)',
                              zIndex: 2
                            }}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                                {isCompleted && approvalStates?.[`step${step.number}`]?.status === 'approved' ? (
                                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                                ) : (
                                  <path d="M12 1l3.09 7.26L23 9l-7.91.74L12 17l-3.09-7.26L1 9l7.91-.74z"/>
                                )}
                              </svg>
                            </div>
                          )}
                          <div className="step-number" style={{ 
                            background: 'var(--card-bg)',
                            border: step.isCheckpoint 
                              ? isActive 
                                ? '2px solid #8B5CF6'
                                : isCompleted 
                                  ? '2px solid #10B981'
                                  : '2px solid rgba(139, 92, 246, 0.3)'
                              : undefined
                          }}>
                            {isCompleted ? (
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                              </svg>
                            ) : isActive ? (
                              <div style={{
                                width: '6px',
                                height: '6px',
                                background: 'white',
                                borderRadius: '50%',
                                boxShadow: '0 0 0 3px rgba(255, 255, 255, 0.25)'
                              }}></div>
                            ) : (
                              <span>{step.number}</span>
                            )}
                          </div>
                        </div>
                        <div className="step-content" style={{ marginTop: '0.625rem' }}>
                          <div className="step-title" style={{ 
                            fontSize: '0.8125rem',
                            lineHeight: '1.3',
                            whiteSpace: 'normal',
                            wordBreak: 'break-word',
                            maxWidth: '100px',
                            color: step.isCheckpoint && isActive 
                              ? '#8B5CF6'
                              : isActive 
                                ? 'var(--primary-blue)' 
                                : isCompleted 
                                  ? 'var(--text-primary)' 
                                  : 'var(--text-secondary)',
                            fontWeight: isActive ? '600' : '500',
                            opacity: isUpcoming ? 0.6 : 1
                          }}>{step.title}</div>
                          {step.isCheckpoint && (
                            <div style={{
                              fontSize: '0.625rem',
                              color: '#8B5CF6',
                              marginTop: '0.125rem',
                              fontWeight: '600',
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em',
                              opacity: isUpcoming ? 0.5 : 0.8
                            }}>
                              Client Gate
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
          
          {currentStep === 1 && (
            <div className="workflow-note" style={{
              marginTop: '1rem',
              background: 'linear-gradient(135deg, rgba(74, 144, 226, 0.03), rgba(74, 144, 226, 0.01))',
              border: '1px solid rgba(74, 144, 226, 0.15)',
              borderRadius: '8px',
              padding: '0.875rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <div className="note-icon" style={{ color: 'var(--primary-blue)', flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                </svg>
              </div>
              <div className="note-text" style={{ color: 'var(--text-secondary)', fontSize: '0.8125rem', lineHeight: '1.4' }}>
                Processing typically takes 45 seconds. Our Brand Strategy Agent will extract and validate all strategic components.
              </div>
            </div>
          )}
        </>
      ) : (
        <>
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

        </>
      )}
    </div>
  );
};

export default WorkflowStepIndicator;