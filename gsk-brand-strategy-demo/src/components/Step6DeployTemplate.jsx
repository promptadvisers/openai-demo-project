import React, { useState, useEffect } from 'react';
import WorkflowStepIndicator from './WorkflowStepIndicator';
import { MOCK_DATA } from '../data/mockData';

const Step6DeployTemplate = ({ 
  isOpen,
  onClose,
  projectData, 
  onReturnToUpload,
  onBackToStep5,
  onContinueToStep7,
  userType = 'internal' 
}) => {
  const [deploymentState, setDeploymentState] = useState('ready'); // ready, deploying, completed
  const [deploymentProgress, setDeploymentProgress] = useState(0);
  const [currentDeploymentStep, setCurrentDeploymentStep] = useState(0);
  const [selectedEnvironment, setSelectedEnvironment] = useState('staging');
  const [deploymentOptions, setDeploymentOptions] = useState({
    enableNotifications: true,
    autoActivate: false,
    scheduleDeployment: false,
    scheduledDate: '',
    backupExisting: true,
    rollbackEnabled: true
  });
  const [showTemplateViewer, setShowTemplateViewer] = useState(false);

  const deploymentSteps = [
    { 
      name: "Template Preparation", 
      description: "Preparing brand strategy template for deployment",
      duration: 3000
    },
    { 
      name: "Configuration Validation", 
      description: "Validating HCP segment mappings and frequency settings",
      duration: 4000
    },
    { 
      name: "Environment Setup", 
      description: "Setting up deployment environment and resources",
      duration: 3000
    },
    { 
      name: "Content Integration", 
      description: "Integrating campaign content and touchpoint configurations",
      duration: 5000
    },
    { 
      name: "System Integration", 
      description: "Connecting with CRM and marketing automation platforms",
      duration: 4000
    },
    { 
      name: "Deployment Complete", 
      description: "Template successfully deployed and ready for activation",
      duration: 2000
    }
  ];

  const templateSummary = {
    name: `${MOCK_DATA.product} Strategy Template`,
    version: "v2.1.3",
    segments: MOCK_DATA.segments.length,
    touchpoints: 847,
    channels: 4,
    estimatedReach: "6,350 HCPs",
    projectedROI: "4.2x",
    deploymentSize: "2.4 MB",
    dependencies: ["CRM Integration", "Email Platform", "Analytics SDK"],
    lastUpdated: new Date().toLocaleDateString()
  };

  const handleStartDeployment = () => {
    setDeploymentState('deploying');
    setDeploymentProgress(0);
    setCurrentDeploymentStep(0);
    
    runDeploymentSteps();
  };

  const runDeploymentSteps = () => {
    let totalElapsed = 0;
    
    deploymentSteps.forEach((step, index) => {
      setTimeout(() => {
        setCurrentDeploymentStep(index);
        setDeploymentProgress(Math.round(((index + 1) / deploymentSteps.length) * 100));
        
        if (index === deploymentSteps.length - 1) {
          setTimeout(() => {
            setDeploymentState('completed');
          }, 1000);
        }
      }, totalElapsed);
      
      totalElapsed += step.duration;
    });
  };

  const handleOptionChange = (option, value) => {
    setDeploymentOptions(prev => ({
      ...prev,
      [option]: value
    }));
  };

  const handleViewTemplate = () => {
    setShowTemplateViewer(true);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="modal-content workflow-modal step6-deploy" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Step 6: Deploy Template</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          {/* Workflow Step Indicator - Horizontal Timeline */}
          <WorkflowStepIndicator currentStep={6} userType={userType} variant="horizontal" />
          
          <div className="step-content">
            <div className="step-description">
              <h3>Deploy Template</h3>
              <p>Deploy validated brand strategy template to production environment for field activation</p>
            </div>

            <div className="deployment-content">
              <div className="deployment-main">
                {/* Template Summary */}
                <div className="document-card template-summary">
            <h3>Template Summary</h3>
            <div className="summary-grid">
              <div className="summary-section">
                <h4>Template Information</h4>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Name:</span>
                    <span className="info-value">{templateSummary.name}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Version:</span>
                    <span className="info-value">{templateSummary.version}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Last Updated:</span>
                    <span className="info-value">{templateSummary.lastUpdated}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Size:</span>
                    <span className="info-value">{templateSummary.deploymentSize}</span>
                  </div>
                </div>
              </div>

              <div className="summary-section">
                <h4>Configuration Details</h4>
                <div className="config-stats">
                  <div className="stat-item">
                    <div className="stat-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                      </svg>
                    </div>
                    <div>
                      <div className="stat-value">{templateSummary.segments}</div>
                      <div className="stat-label">HCP Segments</div>
                    </div>
                  </div>

                  <div className="stat-item">
                    <div className="stat-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 3h18l-2 13H5L3 3z"/>
                        <path d="M9 9h6v6H9z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="stat-value">{templateSummary.touchpoints}</div>
                      <div className="stat-label">Total Touchpoints</div>
                    </div>
                  </div>

                  <div className="stat-item">
                    <div className="stat-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 19c-5 0-8-4-8-8s3-8 8-8 8 4 8 8-3 8-8 8z"/>
                        <path d="M9 9h.01"/>
                        <path d="M9 13v-3"/>
                      </svg>
                    </div>
                    <div>
                      <div className="stat-value">{templateSummary.channels}</div>
                      <div className="stat-label">Communication Channels</div>
                    </div>
                  </div>

                  <div className="stat-item">
                    <div className="stat-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="1" x2="12" y2="23"/>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                      </svg>
                    </div>
                    <div>
                      <div className="stat-value">{templateSummary.projectedROI}</div>
                      <div className="stat-label">Projected ROI</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="dependencies-section">
              <h4>System Dependencies</h4>
              <div className="dependencies-list">
                {templateSummary.dependencies.map((dep, index) => (
                  <div key={index} className="dependency-item">
                    <div className="dependency-status success">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                    </div>
                    <span className="dependency-name">{dep}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Deployment Status */}
          <div className="document-card deployment-status">
            {deploymentState === 'ready' && (
              <div className="deployment-ready">
                <div className="deployment-header">
                  <h3>Ready for Deployment</h3>
                  <div className="environment-selector">
                    <label>Target Environment:</label>
                    <select 
                      value={selectedEnvironment} 
                      onChange={(e) => setSelectedEnvironment(e.target.value)}
                      className="form-select"
                    >
                      <option value="staging">Staging</option>
                      <option value="production">Production</option>
                      <option value="sandbox">Sandbox</option>
                    </select>
                  </div>
                </div>

                <div className="pre-deployment-checks">
                  <h4>Pre-deployment Validation</h4>
                  <div className="checks-list">
                    <div className="check-item success">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                      <span>Template configuration validated</span>
                    </div>
                    <div className="check-item success">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                      <span>System dependencies verified</span>
                    </div>
                    <div className="check-item success">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                      <span>Environment resources available</span>
                    </div>
                    <div className="check-item success">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                      <span>Backup and rollback configured</span>
                    </div>
                  </div>
                </div>

                <div className="deployment-actions">
                  <button className="btn btn-primary btn-large" onClick={handleStartDeployment}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                      <line x1="9" y1="9" x2="9.01" y2="9"/>
                      <line x1="15" y1="9" x2="15.01" y2="9"/>
                    </svg>
                    Start Deployment
                  </button>
                </div>
              </div>
            )}

            {deploymentState === 'deploying' && (
              <div className="deployment-progress">
                <div className="progress-header">
                  <h3>Deployment in Progress</h3>
                  <div className="progress-percentage">{deploymentProgress}%</div>
                </div>

                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${deploymentProgress}%` }}
                  ></div>
                </div>

                <div className="current-step">
                  <div className="step-name">{deploymentSteps[currentDeploymentStep]?.name}</div>
                  <div className="step-description">{deploymentSteps[currentDeploymentStep]?.description}</div>
                </div>

                <div className="deployment-steps">
                  {deploymentSteps.map((step, index) => (
                    <div 
                      key={index} 
                      className={`deployment-step ${index < currentDeploymentStep ? 'completed' : index === currentDeploymentStep ? 'active' : 'pending'}`}
                    >
                      <div className="step-indicator">
                        {index < currentDeploymentStep ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                          </svg>
                        ) : index === currentDeploymentStep ? (
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

            {deploymentState === 'completed' && (
              <div className="deployment-completed">
                <div className="completion-header">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="success-icon">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22,4 12,14.01 9,11.01"/>
                  </svg>
                  <h3>Deployment Completed Successfully</h3>
                  <p>Brand strategy template has been deployed to {selectedEnvironment} environment and is ready for activation.</p>
                </div>

                <div className="deployment-details">
                  <div className="detail-item">
                    <span className="detail-label">Environment:</span>
                    <span className="detail-value">{selectedEnvironment}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Template URL:</span>
                    <span className="detail-value">https://gsk-brandstrategy.com/templates/{templateSummary.name.replace(/\s+/g, '-').toLowerCase()}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Deployment ID:</span>
                    <span className="detail-value">BST-{Date.now().toString().slice(-6)}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Status:</span>
                    <span className="detail-value status-active">Active</span>
                  </div>
                </div>

                <div className="next-steps">
                  <h4>Next Steps</h4>
                  <ul>
                    <li>Template is now available for field team activation</li>
                    <li>Performance monitoring dashboard is automatically configured</li>
                    <li>Email notifications will be sent to stakeholders</li>
                    <li>Rollback available within 24 hours if needed</li>
                  </ul>
                </div>

                <div className="completion-actions">
                  <button className="btn btn-secondary" onClick={handleViewTemplate}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
                    </svg>
                    View Template
                  </button>
                </div>
              </div>
            )}
                </div>
              </div>

              {/* Deployment Options Sidebar */}
              <div className="deployment-sidebar">
                <div className="card options-card">
                  <h3>Deployment Options</h3>
                  <div className="options-list">
                    <div className="option-item">
                      <label className="option-label">
                        <input
                          type="checkbox"
                          checked={deploymentOptions.enableNotifications}
                          onChange={(e) => handleOptionChange('enableNotifications', e.target.checked)}
                          disabled={deploymentState !== 'ready'}
                        />
                        <span>Enable email notifications</span>
                      </label>
                      <p className="option-description">Send deployment updates to stakeholders</p>
                    </div>

                    <div className="option-item">
                      <label className="option-label">
                        <input
                          type="checkbox"
                          checked={deploymentOptions.autoActivate}
                          onChange={(e) => handleOptionChange('autoActivate', e.target.checked)}
                          disabled={deploymentState !== 'ready'}
                        />
                        <span>Auto-activate after deployment</span>
                      </label>
                      <p className="option-description">Automatically activate template for field use</p>
                    </div>

                    <div className="option-item">
                      <label className="option-label">
                        <input
                          type="checkbox"
                          checked={deploymentOptions.backupExisting}
                          onChange={(e) => handleOptionChange('backupExisting', e.target.checked)}
                          disabled={deploymentState !== 'ready'}
                        />
                        <span>Backup existing templates</span>
                      </label>
                      <p className="option-description">Create backup before deployment</p>
                    </div>

                    <div className="option-item">
                      <label className="option-label">
                        <input
                          type="checkbox"
                          checked={deploymentOptions.rollbackEnabled}
                          onChange={(e) => handleOptionChange('rollbackEnabled', e.target.checked)}
                          disabled={deploymentState !== 'ready'}
                        />
                        <span>Enable rollback option</span>
                      </label>
                      <p className="option-description">Allow template rollback within 24 hours</p>
                    </div>
                  </div>
                </div>

                {/* Environment Info */}
                <div className="card environment-info">
                  <h3>Environment Information</h3>
                  <div className="env-details">
                    <div className="env-item">
                      <span className="env-label">Current Environment:</span>
                      <span className="env-value">{selectedEnvironment}</span>
                    </div>
                    <div className="env-item">
                      <span className="env-label">Status:</span>
                      <span className="env-value status-healthy">Healthy</span>
                    </div>
                    <div className="env-item">
                      <span className="env-label">Last Deployment:</span>
                      <span className="env-value">3 days ago</span>
                    </div>
                    <div className="env-item">
                      <span className="env-label">Available Resources:</span>
                      <span className="env-value">87% capacity</span>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>

        <div className="modal-footer">
          <div className="footer-actions">
            <button className="btn btn-secondary" onClick={onReturnToUpload}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Return to Upload
            </button>
            <div className="footer-actions-right">
              {deploymentState === 'ready' && (
                <button className="btn btn-secondary" onClick={onBackToStep5}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                  </svg>
                  Back to Results
                </button>
              )}
              {deploymentState === 'completed' && (
                <button className="btn btn-primary" onClick={onContinueToStep7}>
                  Monitor Performance
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Template Viewer Modal */}
        {showTemplateViewer && (
          <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1001 }}>
            <div className="modal-content" style={{ background: 'var(--card-bg)', padding: '2rem', borderRadius: '12px', maxWidth: '800px', width: '90%', border: '1px solid var(--border-color)', maxHeight: '80vh', overflow: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ color: 'var(--text-primary)', margin: 0 }}>Template Configuration</h3>
                <button onClick={() => setShowTemplateViewer(false)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                <div>
                  <h4 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Campaign Segments</h4>
                  {MOCK_DATA.segments.map((segment, index) => (
                    <div key={index} style={{ background: 'var(--primary-bg)', padding: '1rem', borderRadius: '8px', marginBottom: '0.5rem', border: '1px solid var(--border-color)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <strong style={{ color: 'var(--text-primary)' }}>{segment.name}</strong>
                        <span style={{ color: 'var(--primary-blue)' }}>{segment.percentage}%</span>
                      </div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        <div>Frequency: {segment.frequency}</div>
                        <div>Estimated Reach: {segment.estimatedReach}</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div>
                  <h4 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Template Configuration</h4>
                  <div style={{ background: 'var(--primary-bg)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Product</div>
                      <div style={{ color: 'var(--text-primary)' }}>{MOCK_DATA.product}</div>
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Primary Goal</div>
                      <div style={{ color: 'var(--text-primary)' }}>{MOCK_DATA.primaryGoal}</div>
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Target Growth</div>
                      <div style={{ color: 'var(--text-primary)' }}>{MOCK_DATA.targetGrowth}</div>
                    </div>
                    <div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Market Opportunity</div>
                      <div style={{ color: 'var(--text-primary)' }}>{MOCK_DATA.marketOpportunity}</div>
                    </div>
                  </div>
                  
                  <h4 style={{ color: 'var(--text-primary)', marginTop: '1.5rem', marginBottom: '1rem' }}>Deployment Details</h4>
                  <div style={{ background: 'var(--primary-bg)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Environment:</span>
                      <span style={{ color: 'var(--text-primary)' }}>{selectedEnvironment}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Version:</span>
                      <span style={{ color: 'var(--text-primary)' }}>{templateSummary.version}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Status:</span>
                      <span style={{ color: 'var(--success)' }}>Active</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
                <button className="btn btn-primary" onClick={() => setShowTemplateViewer(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Step6DeployTemplate;