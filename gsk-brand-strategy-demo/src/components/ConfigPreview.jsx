import { useState } from 'react';
import { MOCK_DATA } from '../data/mockData';

const ConfigPreview = ({ isOpen, onClose, onDeploy, configData }) => {
  const [activeSection, setActiveSection] = useState('overview');
  const [deploymentStep, setDeploymentStep] = useState('preview');

  if (!isOpen) return null;

  const handleDeploy = () => {
    setDeploymentStep('deploying');
    setTimeout(() => {
      onDeploy(configData);
    }, 3000);
  };

  if (deploymentStep === 'deploying') {
    return (
      <div className="modal-overlay">
        <div className="modal deployment-modal">
          <div className="modal-content text-center">
            <div className="deployment-icon">
              <div className="spinner large"></div>
            </div>
            <h2>Deploying Configuration</h2>
            <p>Setting up your BOB campaign configuration...</p>
            <div className="deployment-steps">
              <div className="deploy-step active">Creating campaign templates</div>
              <div className="deploy-step active">Configuring audience segments</div>
              <div className="deploy-step active">Setting up automation rules</div>
              <div className="deploy-step">Finalizing deployment</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const bobConfig = MOCK_DATA.bobConfiguration;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal config-preview-modal large-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="header-content">
            <h2>BOB Configuration Preview</h2>
            <div className="config-status">
              <div className="status-indicator ready">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20,6 9,17 4,12"></polyline>
                </svg>
              </div>
              <span>Ready for Deployment</span>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="modal-content">
          {/* Configuration Overview */}
          <div className="config-overview">
            <div className="overview-grid">
              <div className="overview-item">
                <span className="overview-label">Campaign Name:</span>
                <span className="overview-value">{bobConfig.campaignName}</span>
              </div>
              <div className="overview-item">
                <span className="overview-label">Duration:</span>
                <span className="overview-value">{bobConfig.duration}</span>
              </div>
              <div className="overview-item">
                <span className="overview-label">Total Touchpoints:</span>
                <span className="overview-value">{bobConfig.totalTouchpoints.toLocaleString()}</span>
              </div>
              <div className="overview-item">
                <span className="overview-label">Predicted ROI:</span>
                <span className="overview-value text-success">{bobConfig.expectedOutcomes.roi}</span>
              </div>
            </div>
          </div>

          {/* Section Navigation */}
          <div className="config-sections">
            <button 
              className={`section-button ${activeSection === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveSection('overview')}
            >
              Channel Mix
            </button>
            <button 
              className={`section-button ${activeSection === 'segments' ? 'active' : ''}`}
              onClick={() => setActiveSection('segments')}
            >
              Audience Segments
            </button>
            <button 
              className={`section-button ${activeSection === 'outcomes' ? 'active' : ''}`}
              onClick={() => setActiveSection('outcomes')}
            >
              Expected Outcomes
            </button>
            <button 
              className={`section-button ${activeSection === 'timeline' ? 'active' : ''}`}
              onClick={() => setActiveSection('timeline')}
            >
              Deployment Timeline
            </button>
          </div>

          {/* Section Content */}
          <div className="section-content">
            {activeSection === 'overview' && (
              <div className="channels-overview">
                <h3>Channel Configuration</h3>
                <p>Optimized channel mix based on your strategic objectives and target segments:</p>
                
                <div className="channels-grid">
                  {bobConfig.channels.map((channel, index) => (
                    <div key={index} className="channel-card">
                      <div className="channel-header">
                        <h4>{channel.name}</h4>
                        <div className="channel-percentage">{channel.percentage}%</div>
                      </div>
                      
                      <div className="channel-bar">
                        <div 
                          className="channel-fill" 
                          style={{ width: `${channel.percentage}%` }}
                        ></div>
                      </div>
                      
                      <div className="channel-details">
                        <div className="channel-frequency">
                          <span className="detail-label">Frequency:</span>
                          <span className="detail-value">{channel.frequency}</span>
                        </div>
                        
                        <div className="channel-content">
                          <span className="detail-label">Content Types:</span>
                          <div className="content-tags">
                            {channel.content.map((content, idx) => (
                              <span key={idx} className="content-tag">{content}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'segments' && (
              <div className="segments-overview">
                <h3>Audience Segment Mapping</h3>
                <p>Your target segments have been mapped to specific engagement strategies:</p>
                
                <div className="segment-mapping">
                  {MOCK_DATA.segments.map((segment) => (
                    <div key={segment.id} className="segment-mapping-card">
                      <div className="segment-mapping-header">
                        <h4>{segment.name}</h4>
                        <div className="segment-stats">
                          <span className="segment-reach">{segment.estimatedReach}</span>
                          <span className="segment-frequency">{segment.frequency}</span>
                        </div>
                      </div>
                      
                      <div className="segment-strategy">
                        <h5>Engagement Strategy:</h5>
                        <ul>
                          {segment.targetActions.map((action, index) => (
                            <li key={index}>{action}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="segment-channels">
                        <h5>Primary Channels:</h5>
                        <div className="channel-distribution">
                          {bobConfig.channels.map((channel, index) => (
                            <div key={index} className="mini-channel">
                              <span className="mini-channel-name">{channel.name}</span>
                              <span className="mini-channel-weight">{Math.round(channel.percentage * (segment.percentage / 100))}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'outcomes' && (
              <div className="outcomes-overview">
                <h3>Predicted Campaign Outcomes</h3>
                <p>AI-powered predictions based on similar campaigns and market analysis:</p>
                
                <div className="outcomes-grid">
                  <div className="outcome-card primary">
                    <div className="outcome-icon">📈</div>
                    <h4>Engagement Lift</h4>
                    <div className="outcome-value">{bobConfig.expectedOutcomes.engagementLift}</div>
                    <p>Increase in HCP engagement rates</p>
                  </div>
                  
                  <div className="outcome-card primary">
                    <div className="outcome-icon">💊</div>
                    <h4>Prescription Growth</h4>
                    <div className="outcome-value">{bobConfig.expectedOutcomes.prescriptionGrowth}</div>
                    <p>Expected prescription volume increase</p>
                  </div>
                  
                  <div className="outcome-card secondary">
                    <div className="outcome-icon">🎯</div>
                    <h4>Reach Expansion</h4>
                    <div className="outcome-value">{bobConfig.expectedOutcomes.reachExpansion}</div>
                    <p>Additional HCPs reached</p>
                  </div>
                  
                  <div className="outcome-card secondary">
                    <div className="outcome-icon">💰</div>
                    <h4>Return on Investment</h4>
                    <div className="outcome-value">{bobConfig.expectedOutcomes.roi}</div>
                    <p>Predicted campaign ROI</p>
                  </div>
                </div>

                <div className="confidence-score">
                  <h4>Prediction Confidence</h4>
                  <div className="confidence-bar">
                    <div className="confidence-fill" style={{ width: '87%' }}></div>
                  </div>
                  <span className="confidence-text">87% confidence based on 150+ similar campaigns</span>
                </div>
              </div>
            )}

            {activeSection === 'timeline' && (
              <div className="timeline-overview">
                <h3>Deployment Timeline</h3>
                <p>Estimated timeline for full campaign deployment:</p>
                
                <div className="timeline">
                  <div className="timeline-item completed">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <h4>Configuration Generated</h4>
                      <p>AI agent completed BOB configuration</p>
                      <span className="timeline-time">Completed</span>
                    </div>
                  </div>
                  
                  <div className="timeline-item active">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <h4>Review & Approval</h4>
                      <p>Stakeholder review and final approval</p>
                      <span className="timeline-time">Current Step</span>
                    </div>
                  </div>
                  
                  <div className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <h4>System Configuration</h4>
                      <p>BOB platform setup and testing</p>
                      <span className="timeline-time">2-3 days</span>
                    </div>
                  </div>
                  
                  <div className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <h4>Content Creation</h4>
                      <p>Campaign materials and content development</p>
                      <span className="timeline-time">1 week</span>
                    </div>
                  </div>
                  
                  <div className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <h4>Campaign Launch</h4>
                      <p>Full campaign deployment and monitoring</p>
                      <span className="timeline-time">2 weeks</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Deployment Actions */}
          <div className="deployment-actions">
            <div className="savings-highlight">
              <div className="savings-item">
                <span className="savings-label">Time Saved:</span>
                <span className="savings-value">5.3 weeks</span>
              </div>
              <div className="savings-item">
                <span className="savings-label">Cost Saved:</span>
                <span className="savings-value">$52,000</span>
              </div>
              <div className="savings-item">
                <span className="savings-label">Accuracy:</span>
                <span className="savings-value">91%</span>
              </div>
            </div>
            
            <div className="action-buttons">
              <button className="btn btn-secondary" onClick={onClose}>
                Export Configuration
              </button>
              <button className="btn btn-primary" onClick={handleDeploy}>
                Deploy to BOB Platform
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigPreview;