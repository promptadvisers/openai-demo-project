import React, { useState } from 'react';
import WorkflowStepIndicator from './WorkflowStepIndicator';
import AIFeedbackModal from './AIFeedbackModal';
import ClientApprovalModal from './ClientApprovalModal';
import { USER_ROLES, hasPermission } from '../utils/permissions';

const Step2ReviewValidate = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  setupData, 
  userRole = 'BA',
  approvalStates,
  onApprovalRequest,
  onApprovalUpdate
}) => {
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
  const [aiModel, setAiModel] = useState('advanced');
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [approvalRequested, setApprovalRequested] = useState(false);

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
    
    // If user is BA and approval not yet requested, request it
    if (userRole === USER_ROLES.BA && !approvalRequested && approvalStates?.step2?.status !== 'approved') {
      setApprovalRequested(true);
      setShowApprovalModal(true);
      if (onApprovalRequest) {
        onApprovalRequest(2, formData);
      }
      return;
    }
    
    // If client or already approved, proceed
    if (userRole === USER_ROLES.CLIENT || approvalStates?.step2?.status === 'approved') {
      onSubmit({
        ...formData,
        setupData,
        aiModel: aiModel
      });
    }
  };
  
  const handleApprovalComplete = (approval) => {
    setShowApprovalModal(false);
    if (onApprovalUpdate) {
      onApprovalUpdate('step2', { status: 'approved', ...approval });
    }
    // Auto-proceed after approval
    onSubmit({
      ...formData,
      setupData,
      aiModel: aiModel
    });
  };
  
  const handleChangesRequested = (changeRequest) => {
    setShowApprovalModal(false);
    setApprovalRequested(false);
    if (onApprovalUpdate) {
      onApprovalUpdate('step2', { status: 'changes_requested', ...changeRequest });
    }
    alert(`Changes requested: ${changeRequest.feedback}`);
  };

  const handleCancel = () => {
    onClose();
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

  const handleRedoWithAI = async () => {
    setIsRegenerating(true);
    
    // Simulate AI regeneration process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Apply all optimized data
    setFormData({
      ...optimizedData
    });
    
    setIsRegenerating(false);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="modal-content workflow-modal step2-review" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Step 2: Review & Validate</h2>
          <button className="modal-close" onClick={handleCancel}>×</button>
        </div>

        <div className="modal-body">
          {/* Workflow Step Indicator - Horizontal Timeline */}
          <WorkflowStepIndicator currentStep={2} userRole={userRole} variant="horizontal" />

          <div className="step-content">
            <div className="step-description">
              <h3>Review Brand Strategy Summary</h3>
              <p>
                Our Brand Strategy Agent has extracted key components from your document. Review and validate the extracted information below.
              </p>
              
              {/* Approval Status Indicator */}
              {approvalStates?.step2?.status === 'approved' && (
                <div style={{
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.05))',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '12px',
                  padding: '1rem 1.25rem',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#10B981">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  <div>
                    <div style={{ fontWeight: '600', color: '#10B981', marginBottom: '0.125rem' }}>Client Approval Granted</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      Approved by {approvalStates.step2.approvedBy || 'Client'} at {approvalStates.step2.approvedAt ? new Date(approvalStates.step2.approvedAt).toLocaleString() : 'recently'}
                    </div>
                  </div>
                </div>
              )}
              
              {approvalStates?.step2?.status === 'changes_requested' && (
                <div style={{
                  background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.05))',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '12px',
                  padding: '1rem 1.25rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#EF4444">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                    </svg>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '600', color: '#EF4444', marginBottom: '0.125rem' }}>Changes Requested</div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                        {approvalStates.step2.feedback || 'Client has requested changes to the extracted information.'}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* AI Extraction Success Banner */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '12px',
                padding: '1.5rem',
                marginBottom: '2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '2rem'
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
                  <h4 style={{ 
                    margin: '0 0 0.25rem 0', 
                    color: 'var(--text-primary)',
                    fontSize: '1rem'
                  }}>
                    Brand Strategy Agent Extraction Complete
                  </h4>
                  <p style={{ 
                    margin: 0, 
                    color: 'var(--text-secondary)',
                    fontSize: '0.875rem'
                  }}>
                    Successfully extracted 14 strategic components from your Brand Strategy Content. Use AI to optimize individual fields if needed.
                  </p>
                </div>
                <div style={{ marginLeft: 'auto', flexShrink: 0 }}>
                  <button
                    type="button"
                    onClick={handleRedoWithAI}
                    disabled={isRegenerating}
                    style={{
                      background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
                      border: 'none',
                      color: 'white',
                      padding: '0.875rem 2rem',
                      minWidth: '160px',
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      cursor: isRegenerating ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      opacity: isRegenerating ? 0.7 : 1,
                      transition: 'all 300ms ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!isRegenerating) {
                        e.target.style.transform = 'translateY(-1px)';
                        e.target.style.boxShadow = '0 6px 20px rgba(139, 92, 246, 0.4)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isRegenerating) {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = 'none';
                      }
                    }}
                  >
                    {isRegenerating ? (
                      <>
                        <div style={{
                          width: '16px',
                          height: '16px',
                          border: '2px solid rgba(255, 255, 255, 0.3)',
                          borderTop: '2px solid white',
                          borderRadius: '50%',
                          animation: 'spin 1s linear infinite'
                        }}></div>
                        Regenerating...
                      </>
                    ) : (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                        </svg>
                        Redo with AI
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* AI Model Selection for Internal Users */}
              {userType === 'internal' && (
                <div className="ai-model-section" style={{ marginBottom: '2rem' }}>
                  <h4>AI Model Configuration</h4>
                  <div className="form-group">
                    <label className="form-label">Processing Model</label>
                    <select 
                      className="form-select" 
                      value={aiModel} 
                      onChange={(e) => setAiModel(e.target.value)}
                      style={{ maxWidth: '300px' }}
                    >
                      <option value="advanced">Advanced</option>
                      <option value="standard">Standard</option>
                      <option value="fast">Fast</option>
                    </select>
                    <p className="field-help">Current extraction used Advanced model. Change if reprocessing is needed.</p>
                  </div>
                </div>
              )}
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

              {/* Key Messages and Segments */}
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

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={handleCancel}>
            Back to Upload
          </button>
          <button 
            className="btn btn-primary" 
            onClick={handleSubmit}
          >
            {(() => {
              if (userRole === USER_ROLES.CLIENT) {
                return 'Proceed to Next Step';
              }
              if (approvalRequested && approvalStates?.step2?.status !== 'approved') {
                return 'Awaiting Client Approval...';
              }
              if (approvalStates?.step2?.status === 'approved') {
                return 'Continue to Configure Strategy';
              }
              return 'Request Client Approval';
            })()
          </button>
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
        
        <ClientApprovalModal
          isOpen={showApprovalModal}
          onClose={() => setShowApprovalModal(false)}
          step={2}
          data={formData}
          onApprove={handleApprovalComplete}
          onRequestChanges={handleChangesRequested}
          isReadOnly={userRole === USER_ROLES.BA}
        />
      </div>
    </div>
  );
};

export default Step2ReviewValidate;