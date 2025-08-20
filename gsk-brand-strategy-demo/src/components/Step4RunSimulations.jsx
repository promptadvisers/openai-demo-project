import React, { useState, useEffect } from 'react';
import WorkflowStepIndicator from './WorkflowStepIndicator';
import { MOCK_DATA } from '../data/mockData';

const Step4RunSimulations = ({ 
  projectData, 
  onReturnToUpload,
  onBackToStep3,
  onContinueToStep5,
  userType = 'internal' 
}) => {
  const [simulationState, setSimulationState] = useState('ready'); // ready, running, completed
  const [currentProgress, setCurrentProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  const simulationSteps = [
    { 
      name: "Initialization", 
      description: "Setting up simulation environment and parameters",
      duration: 8000,
      progress: 15
    },
    { 
      name: "HCP Mapping", 
      description: "Mapping healthcare providers to strategy segments",
      duration: 12000,
      progress: 35
    },
    { 
      name: "Touchpoint Analysis", 
      description: "Analyzing optimal touchpoint frequencies and channels",
      duration: 10000,
      progress: 60
    },
    { 
      name: "Overlap Detection", 
      description: "Identifying potential audience overlaps and conflicts",
      duration: 8000,
      progress: 80
    },
    { 
      name: "Results Generation", 
      description: "Compiling simulation results and performance metrics",
      duration: 7000,
      progress: 100
    }
  ];

  const advancedParameters = [
    { name: "Simulation Iterations", value: "10,000", editable: true },
    { name: "Confidence Interval", value: "95%", editable: true },
    { name: "Market Dynamics", value: "Enabled", editable: false },
    { name: "Competitor Response", value: "Moderate", editable: true },
    { name: "Seasonal Adjustments", value: "Q4 Focus", editable: true }
  ];

  // Start simulation
  const handleStartSimulation = () => {
    setSimulationState('running');
    setCurrentProgress(0);
    setCurrentStep(0);
    setElapsedTime(0);
    
    runSimulationSteps();
  };

  const runSimulationSteps = () => {
    let totalElapsed = 0;
    
    simulationSteps.forEach((step, index) => {
      setTimeout(() => {
        setCurrentStep(index);
        setCurrentProgress(step.progress);
        
        if (index === simulationSteps.length - 1) {
          setTimeout(() => {
            setSimulationState('completed');
          }, 2000);
        }
      }, totalElapsed);
      
      totalElapsed += step.duration;
    });
  };

  // Timer effect
  useEffect(() => {
    let interval;
    if (simulationState === 'running') {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [simulationState]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="step4-run-simulations">
      <div className="step-header">
        <div className="workflow-header">
          <WorkflowStepIndicator currentStep={4} userType={userType} />
          <div className="header-actions">
            <button className="btn btn-secondary" onClick={onReturnToUpload}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Return to Upload
            </button>
          </div>
        </div>
        
        <div className="step-content-header">
          <h2>Run Simulations</h2>
          <p className="step-description">Execute Brand Strategy Agent simulations to analyze optimal HCP targeting and engagement strategies</p>
        </div>
      </div>

      <div className="simulation-content">
        <div className="simulation-main">
          {/* Simulation Status Card */}
          <div className="document-card simulation-status-card">
            <div className="simulation-header">
              <div className="simulation-info">
                <h3>Brand Strategy Simulation</h3>
                <div className="simulation-meta">
                  <span className="meta-item">
                    <strong>Project:</strong> {MOCK_DATA.product} Strategy Configuration
                  </span>
                  <span className="meta-item">
                    <strong>Target Segments:</strong> {MOCK_DATA.segments.length} HCP segments
                  </span>
                  <span className="meta-item">
                    <strong>Total HCPs:</strong> 6,000 healthcare providers
                  </span>
                </div>
              </div>
              
              {simulationState !== 'ready' && (
                <div className="simulation-timer">
                  <div className="timer-display">{formatTime(elapsedTime)}</div>
                  <div className="timer-label">Elapsed Time</div>
                </div>
              )}
            </div>

            {simulationState === 'ready' && (
              <div className="simulation-ready">
                <div className="ready-message">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ready-icon">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                    <line x1="9" y1="9" x2="9.01" y2="9"/>
                    <line x1="15" y1="9" x2="15.01" y2="9"/>
                  </svg>
                  <h4>Simulation Ready to Execute</h4>
                  <p>All parameters configured. Click "Start Simulation" to begin analysis.</p>
                </div>
                
                <button className="btn btn-primary btn-large" onClick={handleStartSimulation}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="5,3 19,12 5,21"/>
                  </svg>
                  Start Simulation
                </button>
              </div>
            )}

            {simulationState === 'running' && (
              <div className="simulation-running">
                <div className="progress-section">
                  <div className="progress-header">
                    <h4>Processing Step {currentStep + 1} of {simulationSteps.length}</h4>
                    <span className="progress-percentage">{currentProgress}%</span>
                  </div>
                  
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${currentProgress}%` }}
                    ></div>
                  </div>
                  
                  <div className="current-step-info">
                    <div className="step-name">{simulationSteps[currentStep]?.name}</div>
                    <div className="step-description">{simulationSteps[currentStep]?.description}</div>
                  </div>
                </div>

                <div className="simulation-steps">
                  {simulationSteps.map((step, index) => (
                    <div 
                      key={index} 
                      className={`simulation-step ${index < currentStep ? 'completed' : index === currentStep ? 'active' : 'pending'}`}
                    >
                      <div className="step-indicator">
                        {index < currentStep ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                          </svg>
                        ) : index === currentStep ? (
                          <div className="step-spinner"></div>
                        ) : (
                          <span>{index + 1}</span>
                        )}
                      </div>
                      <div className="step-content">
                        <div className="step-title">{step.name}</div>
                        <div className="step-desc">{step.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {simulationState === 'completed' && (
              <div className="simulation-completed">
                <div className="completion-message">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="success-icon">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22,4 12,14.01 9,11.01"/>
                  </svg>
                  <h4>Simulation Completed Successfully</h4>
                  <p>Brand Strategy Agent has analyzed all segments and generated optimization recommendations.</p>
                </div>

                <div className="completion-stats">
                  <div className="stat-item">
                    <div className="stat-value">10,000</div>
                    <div className="stat-label">Iterations</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">95%</div>
                    <div className="stat-label">Confidence</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">{formatTime(elapsedTime)}</div>
                    <div className="stat-label">Duration</div>
                  </div>
                </div>

                <div className="completion-actions">
                  <button className="btn btn-secondary" onClick={onBackToStep3}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                    Back to Configuration
                  </button>
                  <button className="btn btn-primary" onClick={onContinueToStep5}>
                    View Results
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Stats Preview */}
          <div className="document-card quick-stats">
            <h3>Expected Simulation Outcomes</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <div className="stat-content">
                  <div className="stat-value">+2,100</div>
                  <div className="stat-label">Additional HCP Reach</div>
                </div>
              </div>
              
              <div className="stat-item">
                <div className="stat-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 3h18l-2 13H5L3 3z"/>
                    <path d="M3 3L2.27.15A.5.5 0 0 0 1.81 0H.5a.5.5 0 0 0 0 1h1.1L3.2 8.85A2 2 0 0 0 5 10h8a2 2 0 0 0 1.75-1.03L17.5 3H3z"/>
                  </svg>
                </div>
                <div className="stat-content">
                  <div className="stat-value">+34%</div>
                  <div className="stat-label">Engagement Lift</div>
                </div>
              </div>
              
              <div className="stat-item">
                <div className="stat-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="1" x2="12" y2="23"/>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                </div>
                <div className="stat-content">
                  <div className="stat-value">4.2x</div>
                  <div className="stat-label">ROI Projection</div>
                </div>
              </div>
              
              <div className="stat-item">
                <div className="stat-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l3 9a5.002 5.002 0 01-6.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16l-3-9"/>
                  </svg>
                </div>
                <div className="stat-content">
                  <div className="stat-value">+18%</div>
                  <div className="stat-label">Prescription Growth</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Parameters Sidebar */}
        <div className="simulation-sidebar">
          <div className="document-card parameters-card">
            <h3>Advanced Parameters</h3>
            <div className="parameters-list">
              {advancedParameters.map((param, index) => (
                <div key={index} className="parameter-item">
                  <label className="parameter-label">{param.name}</label>
                  {param.editable ? (
                    <input 
                      type="text" 
                      className="form-input parameter-input" 
                      defaultValue={param.value}
                      disabled={simulationState === 'running'}
                    />
                  ) : (
                    <span className="parameter-value">{param.value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="document-card segment-preview">
            <h3>Target Segments</h3>
            <div className="segments-list">
              {MOCK_DATA.segments.map((segment) => (
                <div key={segment.id} className="segment-item">
                  <div className="segment-header">
                    <span className="segment-name">{segment.name}</span>
                    <span className="segment-percentage">{segment.percentage}%</span>
                  </div>
                  <div className="segment-meta">
                    <span className="segment-frequency">{segment.frequency}</span>
                    <span className="segment-reach">{segment.estimatedReach}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4RunSimulations;