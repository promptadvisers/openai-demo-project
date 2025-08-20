import React, { useState } from 'react';

const GlobalOptimizationModal = ({ isOpen, onClose, onSubmit }) => {
  const [feedback, setFeedback] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

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
        maxWidth: '600px',
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
            <h2 style={{ margin: 0, fontSize: '1.125rem' }}>AI Global Configuration Optimization</h2>
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
              <p style={{ 
                color: 'var(--text-secondary)',
                fontSize: '0.875rem',
                marginBottom: '1rem'
              }}>
                AI will optimize all configuration fields based on your instructions. This includes product details, 
                business goals, target segments, and strategic messaging.
              </p>
            </div>

            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem',
                color: 'var(--text-secondary)',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}>
                Describe how AI should optimize your configuration
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="E.g., Make it more aggressive for market expansion, focus on digital channels, emphasize clinical superiority, target younger demographics, align with Q4 2024 objectives..."
                style={{
                  width: '100%',
                  minHeight: '150px',
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
              padding: '1rem',
              background: 'rgba(139, 92, 246, 0.05)',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              borderRadius: '6px'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                marginBottom: '0.5rem'
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#8B5CF6">
                  <path d="M13 17h-2v-6h2m0-4h-2v2h2m-1-4A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2z"/>
                </svg>
                <span style={{ 
                  color: '#8B5CF6', 
                  fontSize: '0.75rem',
                  fontWeight: '600'
                }}>
                  AI Optimization Examples
                </span>
              </div>
              <ul style={{ 
                margin: 0, 
                paddingLeft: '1.25rem',
                fontSize: '0.75rem',
                color: 'var(--text-secondary)',
                lineHeight: '1.6'
              }}>
                <li>"Make all messaging more clinical and evidence-based"</li>
                <li>"Optimize for rapid market penetration in Ontario and Quebec"</li>
                <li>"Emphasize cost-effectiveness and ROI for payers"</li>
                <li>"Align with new CADTH guidelines and provincial formularies"</li>
                <li>"Focus on digital engagement and virtual HCP interactions"</li>
              </ul>
            </div>

            <div style={{
              marginTop: '1rem',
              padding: '0.75rem',
              background: 'rgba(74, 144, 226, 0.05)',
              border: '1px solid rgba(74, 144, 226, 0.2)',
              borderRadius: '6px'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: '0.5rem'
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--primary-blue)" style={{ marginTop: '2px', flexShrink: 0 }}>
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <p style={{ 
                  margin: 0,
                  fontSize: '0.75rem',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.4'
                }}>
                  <strong style={{ color: 'var(--primary-blue)' }}>What will be optimized:</strong> Product positioning, 
                  business goals with measurable KPIs, refined target segments, enhanced key messages, competitive 
                  differentiation, and market opportunity quantification.
                </p>
              </div>
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
                  Optimizing All Fields...
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                  </svg>
                  Optimize Configuration
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GlobalOptimizationModal;