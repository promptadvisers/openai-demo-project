import { useState } from 'react';
import { MOCK_DATA } from '../data/mockData';

const ReviewModal = ({ isOpen, onClose, onConfirm, extractedData }) => {
  const [activeTab, setActiveTab] = useState('objectives');
  const [validationStep, setValidationStep] = useState('review');

  if (!isOpen) return null;

  const handleConfirm = () => {
    setValidationStep('generating');
    setTimeout(() => {
      onConfirm(extractedData);
    }, 2000);
  };

  const PowerScoreBadge = ({ score }) => {
    const getScoreClass = (score) => {
      if (score >= 8) return 'high';
      if (score >= 6) return 'medium';
      return 'low';
    };

    return (
      <div className={`power-score ${getScoreClass(score)}`}>
        {score}
      </div>
    );
  };

  if (validationStep === 'generating') {
    return (
      <div className="modal-overlay">
        <div className="modal generating-modal">
          <div className="modal-content text-center">
            <div className="generating-icon">
              <div className="spinner large"></div>
            </div>
            <h2>Generating BOB Configuration</h2>
            <p>Creating your field-ready template based on extracted insights...</p>
            <div className="generating-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal review-modal large-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="header-content">
            <h2>Review Extracted Insights</h2>
            <div className="extraction-status">
              <div className="status-indicator success">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20,6 9,17 4,12"></polyline>
                </svg>
              </div>
              <span>Extraction Complete</span>
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
          {/* Document Info Summary */}
          <div className="document-summary">
            <div className="summary-item">
              <span className="summary-label">Product:</span>
              <span className="summary-value">{MOCK_DATA.product}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Company:</span>
              <span className="summary-value">{MOCK_DATA.company}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Primary Goal:</span>
              <span className="summary-value">{MOCK_DATA.primaryGoal}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Extraction Accuracy:</span>
              <span className="summary-value text-success">91%</span>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="review-tabs">
            <button 
              className={`tab-button ${activeTab === 'objectives' ? 'active' : ''}`}
              onClick={() => setActiveTab('objectives')}
            >
              Strategic Objectives
            </button>
            <button 
              className={`tab-button ${activeTab === 'segments' ? 'active' : ''}`}
              onClick={() => setActiveTab('segments')}
            >
              Target Segments
            </button>
            <button 
              className={`tab-button ${activeTab === 'market' ? 'active' : ''}`}
              onClick={() => setActiveTab('market')}
            >
              Market Data
            </button>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === 'objectives' && (
              <div className="objectives-content">
                <h3>Extracted Strategic Objectives</h3>
                <p>Our AI agent identified {MOCK_DATA.objectives.length} key strategic objectives from your brand strategy document:</p>
                
                <div className="objectives-grid">
                  {MOCK_DATA.objectives.map((objective) => (
                    <div key={objective.id} className="objective-card">
                      <div className="objective-header">
                        <h4>{objective.title}</h4>
                        <div className="objective-meta">
                          <PowerScoreBadge score={objective.powerScore} />
                          <span className={`priority-badge ${objective.priority.toLowerCase()}`}>
                            {objective.priority} Priority
                          </span>
                        </div>
                      </div>
                      <p>{objective.description}</p>
                      <div className="objective-confidence">
                        <span>Extraction Confidence: 94%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'segments' && (
              <div className="segments-content">
                <h3>Target Audience Segments</h3>
                <p>Identified {MOCK_DATA.segments.length} distinct healthcare professional segments:</p>
                
                <div className="segments-list">
                  {MOCK_DATA.segments.map((segment) => (
                    <div key={segment.id} className="segment-card">
                      <div className="segment-header">
                        <div className="segment-info">
                          <h4>{segment.name}</h4>
                          <p>{segment.description}</p>
                        </div>
                        <div className="segment-metrics">
                          <PowerScoreBadge score={segment.powerScore} />
                          <span className="segment-percentage">{segment.percentage}%</span>
                        </div>
                      </div>
                      
                      <div className="segment-details">
                        <div className="detail-row">
                          <span className="detail-label">Contact Frequency:</span>
                          <span className="detail-value">{segment.frequency}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Estimated Reach:</span>
                          <span className="detail-value">{segment.estimatedReach}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Key Actions:</span>
                          <div className="action-tags">
                            {segment.targetActions.map((action, index) => (
                              <span key={index} className="action-tag">{action}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'market' && (
              <div className="market-content">
                <h3>Market Opportunity Analysis</h3>
                <p>Key market insights extracted from your strategy document:</p>
                
                <div className="market-grid">
                  <div className="market-card">
                    <h4>Market Size</h4>
                    <div className="market-stat">
                      <span className="stat-number">{MOCK_DATA.marketData.totalEligibleCanadians}</span>
                      <span className="stat-label">Eligible Canadians</span>
                    </div>
                  </div>
                  
                  <div className="market-card">
                    <h4>Current Penetration</h4>
                    <div className="market-stat">
                      <span className="stat-number">{MOCK_DATA.marketData.currentVaccinationRate}</span>
                      <span className="stat-label">Vaccination Rate</span>
                    </div>
                  </div>
                  
                  <div className="market-card">
                    <h4>Target Penetration</h4>
                    <div className="market-stat">
                      <span className="stat-number">{MOCK_DATA.marketData.targetVaccinationRate}</span>
                      <span className="stat-label">Target Rate</span>
                    </div>
                  </div>
                  
                  <div className="market-card">
                    <h4>Market Potential</h4>
                    <div className="market-stat">
                      <span className="stat-number">{MOCK_DATA.marketData.marketPotential}</span>
                      <span className="stat-label">Revenue Opportunity</span>
                    </div>
                  </div>
                </div>

                <div className="competitor-analysis">
                  <h4>Competitive Landscape</h4>
                  <div className="competitor-chart">
                    <div className="competitor-item">
                      <span className="competitor-name">Shingrix</span>
                      <div className="competitor-bar">
                        <div className="competitor-fill" style={{ width: `${MOCK_DATA.marketData.competitorShare.shingrix}%` }}></div>
                      </div>
                      <span className="competitor-percentage">{MOCK_DATA.marketData.competitorShare.shingrix}%</span>
                    </div>
                    <div className="competitor-item">
                      <span className="competitor-name">Zostavax</span>
                      <div className="competitor-bar">
                        <div className="competitor-fill" style={{ width: `${MOCK_DATA.marketData.competitorShare.zostavax}%` }}></div>
                      </div>
                      <span className="competitor-percentage">{MOCK_DATA.marketData.competitorShare.zostavax}%</span>
                    </div>
                    <div className="competitor-item">
                      <span className="competitor-name">Other</span>
                      <div className="competitor-bar">
                        <div className="competitor-fill" style={{ width: `${MOCK_DATA.marketData.competitorShare.other}%` }}></div>
                      </div>
                      <span className="competitor-percentage">{MOCK_DATA.marketData.competitorShare.other}%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Validation Actions */}
          <div className="validation-actions">
            <div className="validation-info">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9,12l2,2 4,-4"></path>
              </svg>
              <span>All extracted data has been validated for accuracy and completeness.</span>
            </div>
            
            <div className="action-buttons">
              <button className="btn btn-secondary" onClick={onClose}>
                Make Edits
              </button>
              <button className="btn btn-primary" onClick={handleConfirm}>
                Generate BOB Configuration
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;