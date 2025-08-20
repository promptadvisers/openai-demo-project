import React, { useState, useEffect } from 'react';

const RunProjectSummaryModal = ({ isOpen, onClose, onSubmit, setupData }) => {
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

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="modal-content" style={{ maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto' }}>
        <div className="modal-header">
          <h2>Review Extracted Strategy</h2>
          <button className="modal-close" onClick={onClose} style={{ fontSize: '24px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
        </div>

        <div className="extraction-notice" style={{
          background: 'rgba(74, 144, 226, 0.1)',
          border: '1px solid var(--primary-blue)',
          borderRadius: '8px',
          padding: '1rem',
          margin: '0 2rem 1rem 2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--primary-blue)">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            <strong style={{ color: 'var(--primary-blue)' }}>AI Extraction Complete</strong>
          </div>
          <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            We've analyzed your brand strategy document and extracted the key components below. 
            Please review and modify as needed before proceeding.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Project Name</label>
              <input
                type="text"
                name="projectName"
                className="form-input"
                value={formData.projectName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Product Name</label>
              <input
                type="text"
                name="productName"
                className="form-input"
                value={formData.productName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Indication</label>
              <input
                type="text"
                name="indication"
                className="form-input"
                value={formData.indication}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Primary Business Goal</label>
              <textarea
                name="businessGoal"
                className="form-textarea"
                value={formData.businessGoal}
                onChange={handleInputChange}
                rows={2}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Target Audience</label>
              <input
                type="text"
                name="targetAudience"
                className="form-input"
                value={formData.targetAudience}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Current Market Coverage</label>
              <input
                type="text"
                name="currentCoverage"
                className="form-input"
                value={formData.currentCoverage}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Target Growth</label>
              <input
                type="text"
                name="targetGrowth"
                className="form-input"
                value={formData.targetGrowth}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Key Messages</label>
              {formData.keyMessages.map((message, index) => (
                <input
                  key={index}
                  type="text"
                  className="form-input"
                  value={message}
                  onChange={(e) => handleKeyMessageChange(index, e.target.value)}
                  style={{ marginBottom: '0.5rem' }}
                />
              ))}
            </div>

            <div className="form-group">
              <label className="form-label">Market Segments</label>
              <div style={{ 
                background: 'var(--primary-bg)', 
                padding: '1rem', 
                borderRadius: '8px',
                border: '1px solid var(--border-color)'
              }}>
                {formData.segments.map((segment, index) => (
                  <div key={index} style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '2fr 1fr 3fr', 
                    gap: '1rem',
                    marginBottom: '1rem',
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

            <div className="form-group">
              <label className="form-label">Competitive Landscape</label>
              <textarea
                name="competitiveLandscape"
                className="form-textarea"
                value={formData.competitiveLandscape}
                onChange={handleInputChange}
                rows={2}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Market Opportunity</label>
              <input
                type="text"
                name="marketOpportunity"
                className="form-input"
                value={formData.marketOpportunity}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RunProjectSummaryModal;