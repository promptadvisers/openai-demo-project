import React, { useState } from 'react';
import AIFeedbackModal from './AIFeedbackModal';

const ConfigurationReview = ({ isOpen, onClose, onSubmit, setupData }) => {
  // Pre-fill with mock Shingrix data as if AI extracted it
  const [formData, setFormData] = useState({
    projectName: 'Shingrix Canada Q4 2024 Campaign',
    productName: 'Shingrix',
    indication: 'Herpes Zoster (Shingles) Prevention',
    businessGoal: 'Double the number of Canadians protected against Shingles',
    targetAudience: 'Adults 50+ and immunocompromised adults 18+',
    currentCoverage: '2.9M Canadians (23.5%)',
    targetGrowth: '3% CAGR by 2026',
    keyMessages: [
      '90%+ efficacy in preventing shingles',
      'Long-lasting protection (10+ years)',
      'Recommended by NACI for all adults 50+'
    ],
    segments: [
      { name: 'HZ Champions', percentage: 40, description: 'High prescribers, shingles advocates' },
      { name: 'Rising Stars', percentage: 30, description: 'Growing prescriber base' },
      { name: 'Primary Care', percentage: 20, description: 'General practitioners' },
      { name: 'Specialists', percentage: 10, description: 'Immunologists and geriatricians' }
    ],
    competitiveLandscape: 'Limited competition - primary competitor is Zostavax (being phased out)',
    marketOpportunity: '12M eligible Canadians remain unprotected'
  });

  const [showAIFeedback, setShowAIFeedback] = useState(false);
  const [currentEditField, setCurrentEditField] = useState(null);
  const [isOptimizing, setIsOptimizing] = useState(false);

  // AI-optimized versions of the data
  const optimizedData = {
    projectName: 'Shingrix National Immunization Excellence Program 2024-2025',
    productName: 'Shingrix (Zoster Vaccine Recombinant, Adjuvanted)',
    indication: 'Prevention of Herpes Zoster and Post-Herpetic Neuralgia in Adults',
    businessGoal: 'Achieve 50% vaccination coverage in eligible Canadian adults by 2026, establishing Shingrix as the gold standard for shingles prevention',
    targetAudience: 'Primary: Adults 50-70 years | Secondary: Immunocompromised 18+ | Tertiary: Adults 70+ with comorbidities',
    currentCoverage: '2.9M protected (23.5% penetration) with 87% persistence rate',
    targetGrowth: '3.5% CAGR through 2026 with focus on underserved regions',
    keyMessages: [
      '97.2% efficacy sustained over 4 years - superior protection vs competitors',
      'NACI preferred vaccine with Grade A recommendation for 50+ adults',
      'Prevents 91% of PHN cases - addressing the most feared complication'
    ],
    segments: [
      { name: 'Vaccine Champions', percentage: 35, description: 'Top 20% prescribers driving 60% of vaccinations' },
      { name: 'Growth Potential', percentage: 35, description: 'Mid-tier prescribers with 40% YoY growth opportunity' },
      { name: 'Primary Care Network', percentage: 20, description: 'Family physicians in community settings' },
      { name: 'Specialty Leaders', percentage: 10, description: 'ID specialists and geriatricians as KOLs' }
    ],
    competitiveLandscape: 'Market leader with 95% share; Zostavax sunset creates conversion opportunity',
    marketOpportunity: '12.5M unvaccinated adults represent $2.8B market potential'
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleKeyMessageChange = (index, value) => {
    const newMessages = [...formData.keyMessages];
    newMessages[index] = value;
    setFormData(prev => ({ ...prev, keyMessages: newMessages }));
  };

  const handleSegmentChange = (index, field, value) => {
    const newSegments = [...formData.segments];
    newSegments[index][field] = value;
    setFormData(prev => ({ ...prev, segments: newSegments }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      setupData
    });
  };

  const handleGlobalOptimize = async () => {
    setIsOptimizing(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Apply optimized data
    setFormData(optimizedData);
    setIsOptimizing(false);
  };

  const handleFieldEdit = (fieldName) => {
    setCurrentEditField(fieldName);
    setShowAIFeedback(true);
  };

  const handleAIFeedbackSubmit = async (feedback) => {
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Apply the optimized version for the specific field
    if (currentEditField && optimizedData[currentEditField]) {
      setFormData(prev => ({
        ...prev,
        [currentEditField]: optimizedData[currentEditField]
      }));
    }
    
    setShowAIFeedback(false);
    setCurrentEditField(null);
  };

  if (!isOpen) return null;

  return (
    <div className="configuration-review-container" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'var(--primary-bg)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <div style={{
        background: 'var(--card-bg)',
        borderBottom: '1px solid var(--border-color)',
        padding: '1.5rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div>
          <h1 style={{ 
            margin: 0, 
            fontSize: '1.75rem',
            color: 'var(--text-primary)'
          }}>
            Review Configuration
          </h1>
          <p style={{ 
            margin: '0.25rem 0 0 0', 
            color: 'var(--text-secondary)',
            fontSize: '0.875rem'
          }}>
            AI has extracted and structured your brand strategy. Review and optimize as needed.
          </p>
        </div>
        
        {/* AI Co-pilot Panel */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <button
            onClick={handleGlobalOptimize}
            disabled={isOptimizing}
            style={{
              background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              fontSize: '0.875rem',
              fontWeight: '600',
              cursor: isOptimizing ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              opacity: isOptimizing ? 0.7 : 1,
              transition: 'all 300ms',
              boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
            }}
            onMouseEnter={(e) => !isOptimizing && (e.target.style.transform = 'translateY(-2px)')}
            onMouseLeave={(e) => !isOptimizing && (e.target.style.transform = 'translateY(0)')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
            </svg>
            {isOptimizing ? 'Optimizing...' : 'Optimize with AI'}
          </button>
          
          <button
            onClick={() => onClose()}
            style={{
              background: 'transparent',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-color)',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 300ms'
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = 'var(--text-primary)';
              e.target.style.color = 'var(--text-primary)';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = 'var(--border-color)';
              e.target.style.color = 'var(--text-secondary)';
            }}
          >
            Cancel
          </button>
          
          <button
            onClick={handleSubmit}
            style={{
              background: 'var(--primary-blue)',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              fontSize: '0.875rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 300ms'
            }}
            onMouseEnter={(e) => e.target.style.opacity = '0.9'}
            onMouseLeave={(e) => e.target.style.opacity = '1'}
          >
            Create Configuration
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '2rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* AI Extraction Success Banner */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            borderRadius: '12px',
            padding: '1.25rem',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            </div>
            <div>
              <h3 style={{ 
                margin: '0 0 0.25rem 0', 
                color: 'var(--text-primary)',
                fontSize: '1rem'
              }}>
                AI Extraction Complete - 91% Confidence
              </h3>
              <p style={{ 
                margin: 0, 
                color: 'var(--text-secondary)',
                fontSize: '0.875rem'
              }}>
                Successfully extracted 14 strategic components from your document. Use AI to optimize individual fields or apply global enhancements.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '2rem'
            }}>
              {/* Left Column */}
              <div>
                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label" style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem'
                  }}>
                    <span>Project Name</span>
                    <button
                      type="button"
                      onClick={() => handleFieldEdit('projectName')}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#8B5CF6',
                        cursor: 'pointer',
                        padding: '0.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        fontSize: '0.75rem',
                        transition: 'opacity 300ms'
                      }}
                      onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                      onMouseLeave={(e) => e.target.style.opacity = '1'}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                      </svg>
                      Edit with AI
                    </button>
                  </label>
                  <input
                    type="text"
                    name="projectName"
                    className="form-input"
                    value={formData.projectName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label" style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem'
                  }}>
                    <span>Product Name</span>
                    <button
                      type="button"
                      onClick={() => handleFieldEdit('productName')}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#8B5CF6',
                        cursor: 'pointer',
                        padding: '0.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        fontSize: '0.75rem',
                        transition: 'opacity 300ms'
                      }}
                      onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                      onMouseLeave={(e) => e.target.style.opacity = '1'}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                      </svg>
                      Edit with AI
                    </button>
                  </label>
                  <input
                    type="text"
                    name="productName"
                    className="form-input"
                    value={formData.productName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label" style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem'
                  }}>
                    <span>Indication</span>
                    <button
                      type="button"
                      onClick={() => handleFieldEdit('indication')}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#8B5CF6',
                        cursor: 'pointer',
                        padding: '0.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        fontSize: '0.75rem',
                        transition: 'opacity 300ms'
                      }}
                      onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                      onMouseLeave={(e) => e.target.style.opacity = '1'}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                      </svg>
                      Edit with AI
                    </button>
                  </label>
                  <input
                    type="text"
                    name="indication"
                    className="form-input"
                    value={formData.indication}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label" style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem'
                  }}>
                    <span>Primary Business Goal</span>
                    <button
                      type="button"
                      onClick={() => handleFieldEdit('businessGoal')}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#8B5CF6',
                        cursor: 'pointer',
                        padding: '0.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        fontSize: '0.75rem',
                        transition: 'opacity 300ms'
                      }}
                      onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                      onMouseLeave={(e) => e.target.style.opacity = '1'}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                      </svg>
                      Edit with AI
                    </button>
                  </label>
                  <textarea
                    name="businessGoal"
                    className="form-textarea"
                    value={formData.businessGoal}
                    onChange={handleInputChange}
                    rows={3}
                    required
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label" style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem'
                  }}>
                    <span>Target Audience</span>
                    <button
                      type="button"
                      onClick={() => handleFieldEdit('targetAudience')}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#8B5CF6',
                        cursor: 'pointer',
                        padding: '0.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        fontSize: '0.75rem',
                        transition: 'opacity 300ms'
                      }}
                      onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                      onMouseLeave={(e) => e.target.style.opacity = '1'}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                      </svg>
                      Edit with AI
                    </button>
                  </label>
                  <input
                    type="text"
                    name="targetAudience"
                    className="form-input"
                    value={formData.targetAudience}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Right Column */}
              <div>
                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label" style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem'
                  }}>
                    <span>Current Market Coverage</span>
                    <button
                      type="button"
                      onClick={() => handleFieldEdit('currentCoverage')}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#8B5CF6',
                        cursor: 'pointer',
                        padding: '0.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        fontSize: '0.75rem',
                        transition: 'opacity 300ms'
                      }}
                      onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                      onMouseLeave={(e) => e.target.style.opacity = '1'}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                      </svg>
                      Edit with AI
                    </button>
                  </label>
                  <input
                    type="text"
                    name="currentCoverage"
                    className="form-input"
                    value={formData.currentCoverage}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label" style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem'
                  }}>
                    <span>Target Growth</span>
                    <button
                      type="button"
                      onClick={() => handleFieldEdit('targetGrowth')}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#8B5CF6',
                        cursor: 'pointer',
                        padding: '0.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        fontSize: '0.75rem',
                        transition: 'opacity 300ms'
                      }}
                      onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                      onMouseLeave={(e) => e.target.style.opacity = '1'}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                      </svg>
                      Edit with AI
                    </button>
                  </label>
                  <input
                    type="text"
                    name="targetGrowth"
                    className="form-input"
                    value={formData.targetGrowth}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label" style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem'
                  }}>
                    <span>Competitive Landscape</span>
                    <button
                      type="button"
                      onClick={() => handleFieldEdit('competitiveLandscape')}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#8B5CF6',
                        cursor: 'pointer',
                        padding: '0.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        fontSize: '0.75rem',
                        transition: 'opacity 300ms'
                      }}
                      onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                      onMouseLeave={(e) => e.target.style.opacity = '1'}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                      </svg>
                      Edit with AI
                    </button>
                  </label>
                  <textarea
                    name="competitiveLandscape"
                    className="form-textarea"
                    value={formData.competitiveLandscape}
                    onChange={handleInputChange}
                    rows={3}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label" style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem'
                  }}>
                    <span>Market Opportunity</span>
                    <button
                      type="button"
                      onClick={() => handleFieldEdit('marketOpportunity')}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#8B5CF6',
                        cursor: 'pointer',
                        padding: '0.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        fontSize: '0.75rem',
                        transition: 'opacity 300ms'
                      }}
                      onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                      onMouseLeave={(e) => e.target.style.opacity = '1'}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                      </svg>
                      Edit with AI
                    </button>
                  </label>
                  <input
                    type="text"
                    name="marketOpportunity"
                    className="form-input"
                    value={formData.marketOpportunity}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* Full Width Sections */}
            <div style={{ marginTop: '2rem' }}>
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label className="form-label" style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  marginBottom: '0.5rem'
                }}>
                  <span>Key Messages</span>
                  <button
                    type="button"
                    onClick={() => handleFieldEdit('keyMessages')}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#8B5CF6',
                      cursor: 'pointer',
                      padding: '0.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      fontSize: '0.75rem',
                      transition: 'opacity 300ms'
                    }}
                    onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                    onMouseLeave={(e) => e.target.style.opacity = '1'}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                    </svg>
                    Edit with AI
                  </button>
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {formData.keyMessages.map((message, index) => (
                    <input
                      key={index}
                      type="text"
                      className="form-input"
                      value={message}
                      onChange={(e) => handleKeyMessageChange(index, e.target.value)}
                    />
                  ))}
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label className="form-label" style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  marginBottom: '0.5rem'
                }}>
                  <span>Market Segments</span>
                  <button
                    type="button"
                    onClick={() => handleFieldEdit('segments')}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#8B5CF6',
                      cursor: 'pointer',
                      padding: '0.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      fontSize: '0.75rem',
                      transition: 'opacity 300ms'
                    }}
                    onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                    onMouseLeave={(e) => e.target.style.opacity = '1'}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                    </svg>
                    Edit with AI
                  </button>
                </label>
                <div style={{ 
                  background: 'var(--card-bg)', 
                  padding: '1.5rem', 
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)'
                }}>
                  {formData.segments.map((segment, index) => (
                    <div key={index} style={{ 
                      display: 'grid', 
                      gridTemplateColumns: '2fr 1fr 3fr', 
                      gap: '1rem',
                      marginBottom: index < formData.segments.length - 1 ? '1rem' : 0,
                      alignItems: 'center'
                    }}>
                      <input
                        type="text"
                        className="form-input"
                        value={segment.name}
                        onChange={(e) => handleSegmentChange(index, 'name', e.target.value)}
                        placeholder="Segment name"
                      />
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                          type="number"
                          className="form-input"
                          value={segment.percentage}
                          onChange={(e) => handleSegmentChange(index, 'percentage', e.target.value)}
                          min="0"
                          max="100"
                          style={{ width: '80px' }}
                        />
                        <span style={{ color: 'var(--text-secondary)' }}>%</span>
                      </div>
                      <input
                        type="text"
                        className="form-input"
                        value={segment.description}
                        onChange={(e) => handleSegmentChange(index, 'description', e.target.value)}
                        placeholder="Description"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* AI Feedback Modal */}
      <AIFeedbackModal
        isOpen={showAIFeedback}
        onClose={() => {
          setShowAIFeedback(false);
          setCurrentEditField(null);
        }}
        onSubmit={handleAIFeedbackSubmit}
        fieldName={currentEditField}
        currentValue={currentEditField ? formData[currentEditField] : ''}
      />
    </div>
  );
};

export default ConfigurationReview;