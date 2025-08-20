import React, { useState } from 'react';

const AIFeedbackModal = ({ isOpen, onClose, onSubmit, fieldName, currentValue }) => {
  const [feedback, setFeedback] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const fieldLabels = {
    projectName: 'Project Name',
    productName: 'Product Name',
    indication: 'Indication',
    businessGoal: 'Business Goal',
    targetAudience: 'Target Audience',
    currentCoverage: 'Current Coverage',
    targetGrowth: 'Target Growth',
    keyMessages: 'Key Messages',
    segments: 'Market Segments',
    competitiveLandscape: 'Competitive Landscape',
    marketOpportunity: 'Market Opportunity'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;
    
    setIsProcessing(true);
    await onSubmit(feedback);
    setIsProcessing(false);
    setFeedback('');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(4px)'
    }}>
      <div className="modal-content" style={{ 
        maxWidth: '500px',
        background: 'var(--card-bg)',
        border: '1px solid rgba(139, 92, 246, 0.3)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5), 0 0 60px rgba(139, 92, 246, 0.1)'
      }}>
        <div className="modal-header" style={{
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)',
          borderBottom: '1px solid rgba(139, 92, 246, 0.2)',
          padding: '1.25rem 1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
              </svg>
            </div>
            <h2 style={{ margin: 0, fontSize: '1.125rem' }}>AI Field Optimization</h2>
          </div>
          <button 
            className="modal-close" 
            onClick={onClose} 
            style={{ 
              fontSize: '24px', 
              width: '32px', 
              height: '32px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'var(--text-secondary)',
              transition: 'color 300ms'
            }}
            onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
            onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ padding: '1.5rem' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem',
                color: 'var(--text-secondary)',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}>
                Optimizing Field
              </label>
              <div style={{
                background: 'var(--primary-bg)',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                padding: '0.75rem',
                color: 'var(--text-primary)',
                fontSize: '0.875rem'
              }}>
                {fieldLabels[fieldName] || fieldName}
              </div>
            </div>

            {currentValue && (
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem',
                  color: 'var(--text-secondary)',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}>
                  Current Value
                </label>
                <div style={{
                  background: 'var(--primary-bg)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  padding: '0.75rem',
                  color: 'var(--text-primary)',
                  fontSize: '0.875rem',
                  maxHeight: '100px',
                  overflowY: 'auto'
                }}>
                  {typeof currentValue === 'object' ? JSON.stringify(currentValue) : currentValue}
                </div>
              </div>
            )}

            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem',
                color: 'var(--text-secondary)',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}>
                How should AI improve this field?
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="E.g., Make it more specific, add measurable targets, align with Canadian market..."
                style={{
                  width: '100%',
                  minHeight: '120px',
                  padding: '0.75rem',
                  background: 'var(--primary-bg)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  color: 'var(--text-primary)',
                  fontSize: '0.875rem',
                  resize: 'vertical',
                  outline: 'none',
                  transition: 'border-color 300ms'
                }}
                onFocus={(e) => e.target.style.borderColor = 'rgba(139, 92, 246, 0.5)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                required
              />
            </div>

            <div style={{
              marginTop: '1rem',
              padding: '0.75rem',
              background: 'rgba(139, 92, 246, 0.05)',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              borderRadius: '6px'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                marginBottom: '0.25rem'
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#8B5CF6">
                  <path d="M13 17h-2v-6h2m0-4h-2v2h2m-1-4A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2z"/>
                </svg>
                <span style={{ 
                  color: '#8B5CF6', 
                  fontSize: '0.75rem',
                  fontWeight: '600'
                }}>
                  AI Optimization Tips
                </span>
              </div>
              <ul style={{ 
                margin: 0, 
                paddingLeft: '1.25rem',
                fontSize: '0.75rem',
                color: 'var(--text-secondary)',
                lineHeight: '1.5'
              }}>
                <li>Be specific about desired improvements</li>
                <li>Mention regulatory or compliance needs</li>
                <li>Reference market-specific requirements</li>
              </ul>
            </div>
          </div>

          <div className="modal-footer" style={{
            background: 'var(--primary-bg)',
            borderTop: '1px solid var(--border-color)'
          }}>
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onClose}
              disabled={isProcessing}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn"
              disabled={isProcessing || !feedback.trim()}
              style={{
                background: isProcessing ? 'var(--border-color)' : 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
                color: 'white',
                border: 'none',
                padding: '0.625rem 1.25rem',
                borderRadius: '6px',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: isProcessing ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 300ms'
              }}
            >
              {isProcessing ? (
                <>
                  <div className="spinner-small" style={{
                    width: '14px',
                    height: '14px',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    borderTopColor: 'white',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite'
                  }} />
                  Processing...
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                  </svg>
                  Optimize Field
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AIFeedbackModal;