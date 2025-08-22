import React, { useState } from 'react';

const ClientApprovalModal = ({ 
  isOpen, 
  onClose, 
  step, 
  data, 
  onApprove, 
  onRequestChanges,
  isReadOnly = false 
}) => {
  const [feedback, setFeedback] = useState('');
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  
  if (!isOpen) return null;
  
  const stepTitle = step === 2 ? 'Brand Strategy Summary' : 'Simulation Results';
  const stepDescription = step === 2 
    ? 'Review the extracted brand strategy components'
    : 'Review the simulation outcomes and performance projections';
  
  const handleApprove = () => {
    onApprove({
      approvedAt: new Date().toISOString(),
      approvedBy: 'Client Representative',
      step
    });
  };
  
  const handleRequestChanges = () => {
    if (!showFeedbackForm) {
      setShowFeedbackForm(true);
      return;
    }
    
    if (!feedback.trim()) {
      alert('Please provide feedback for the requested changes');
      return;
    }
    
    onRequestChanges({
      feedback,
      requestedAt: new Date().toISOString(),
      requestedBy: 'Client Representative',
      step
    });
    
    setFeedback('');
    setShowFeedbackForm(false);
  };
  
  const renderStep2Content = () => (
    <div className="approval-content">
      <div className="document-card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--primary-blue)' }}>Extracted Strategy Information</h3>
        
        <div className="form-section">
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Project Name</label>
              <div className="read-only-field">{data?.projectName || 'Shingrix Canada Q4 2024 Campaign'}</div>
            </div>
            
            <div className="form-group">
              <label className="form-label">Product</label>
              <div className="read-only-field">{data?.productName || 'Shingrix'}</div>
            </div>
            
            <div className="form-group">
              <label className="form-label">Indication</label>
              <div className="read-only-field">{data?.indication || 'Herpes Zoster (Shingles) Prevention'}</div>
            </div>
            
            <div className="form-group">
              <label className="form-label">Business Goal</label>
              <div className="read-only-field">{data?.businessGoal || 'Double the number of Canadians protected against Shingles'}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="document-card" style={{ marginBottom: '1.5rem' }}>
        <h4 style={{ marginBottom: '0.75rem' }}>Key Messages</h4>
        <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
          {(data?.keyMessages || [
            '90%+ efficacy in preventing shingles',
            'Long-lasting protection (10+ years)',
            'Recommended by NACI for all adults 50+'
          ]).map((message, idx) => (
            <li key={idx} style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
              {message}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="document-card">
        <h4 style={{ marginBottom: '0.75rem' }}>Market Segments</h4>
        <div className="segments-list">
          {(data?.segments || []).map((segment, idx) => (
            <div key={idx} style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '0.75rem',
              background: 'var(--primary-bg)',
              borderRadius: '8px',
              marginBottom: '0.5rem'
            }}>
              <div>
                <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{segment.name}</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{segment.description}</div>
              </div>
              <div style={{
                background: 'linear-gradient(135deg, var(--primary-blue), #357ABD)',
                color: 'white',
                padding: '0.25rem 0.75rem',
                borderRadius: '4px',
                fontWeight: '600'
              }}>
                {segment.percentage}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
  const renderStep5Content = () => (
    <div className="approval-content">
      <div className="document-card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--primary-blue)' }}>Simulation Results Summary</h3>
        
        <div className="kpi-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
          <div className="kpi-item" style={{ padding: '1rem', background: 'var(--primary-bg)', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>HCP Reach</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-blue)' }}>6,350</div>
            <div style={{ fontSize: '0.75rem', color: '#10B981' }}>+49% vs current</div>
          </div>
          
          <div className="kpi-item" style={{ padding: '1rem', background: 'var(--primary-bg)', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Engagement Rate</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-blue)' }}>31.7%</div>
            <div style={{ fontSize: '0.75rem', color: '#10B981' }}>+34% improvement</div>
          </div>
          
          <div className="kpi-item" style={{ padding: '1rem', background: 'var(--primary-bg)', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Monthly Prescriptions</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-blue)' }}>14,632</div>
            <div style={{ fontSize: '0.75rem', color: '#10B981' }}>+18% growth</div>
          </div>
          
          <div className="kpi-item" style={{ padding: '1rem', background: 'var(--primary-bg)', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Projected ROI</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-blue)' }}>4.2x</div>
            <div style={{ fontSize: '0.75rem', color: '#10B981' }}>+50% vs baseline</div>
          </div>
        </div>
      </div>
      
      <div className="document-card">
        <h4 style={{ marginBottom: '0.75rem' }}>Confidence Metrics</h4>
        <div style={{ padding: '1rem', background: 'var(--primary-bg)', borderRadius: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span>Simulation Confidence</span>
            <span style={{ fontWeight: '600', color: '#10B981' }}>95.2%</span>
          </div>
          <div className="progress-bar" style={{ height: '8px', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '4px' }}>
            <div style={{ width: '95.2%', height: '100%', background: '#10B981', borderRadius: '4px' }}></div>
          </div>
          <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Based on 10,000 Monte Carlo simulations
          </div>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="modal-overlay" onClick={onClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="modal-content approval-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '800px', maxHeight: '90vh', overflow: 'auto' }}>
        <div className="modal-header">
          <h2>
            <span style={{ color: 'var(--primary-blue)' }}>Client Approval Required</span>
            {' - '}
            {stepTitle}
          </h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          {/* Approval Status Banner */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(124, 58, 237, 0.05))',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            borderRadius: '12px',
            padding: '1.25rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                {stepDescription}
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Your approval is required before the Brand Analyst can proceed to the next step.
              </div>
            </div>
          </div>
          
          {/* Content based on step */}
          {step === 2 ? renderStep2Content() : renderStep5Content()}
          
          {/* Feedback Form (if requesting changes) */}
          {showFeedbackForm && (
            <div className="document-card" style={{
              marginTop: '1.5rem',
              border: '2px solid rgba(239, 68, 68, 0.3)',
              background: 'rgba(239, 68, 68, 0.05)'
            }}>
              <h4 style={{ marginBottom: '0.75rem', color: '#EF4444' }}>Request Changes</h4>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Please describe the changes needed..."
                style={{
                  width: '100%',
                  minHeight: '100px',
                  padding: '0.75rem',
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  color: 'var(--text-primary)',
                  fontSize: '0.875rem',
                  resize: 'vertical'
                }}
              />
            </div>
          )}
        </div>
        
        <div className="modal-footer" style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Approving will allow the Brand Analyst to continue the workflow
          </div>
          
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {!isReadOnly && (
              <>
                <button 
                  className="btn btn-secondary"
                  onClick={handleRequestChanges}
                  style={{
                    background: showFeedbackForm ? '#EF4444' : 'transparent',
                    borderColor: showFeedbackForm ? '#EF4444' : 'var(--border-color)',
                    color: showFeedbackForm ? 'white' : 'var(--text-primary)'
                  }}
                >
                  {showFeedbackForm ? 'Submit Feedback' : 'Request Changes'}
                </button>
                
                <button 
                  className="btn btn-primary"
                  onClick={handleApprove}
                  style={{
                    background: 'linear-gradient(135deg, #10B981, #059669)',
                    border: 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    Approve {stepTitle}
                  </div>
                </button>
              </>
            )}
            
            {isReadOnly && (
              <button className="btn btn-secondary" onClick={onClose}>
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientApprovalModal;