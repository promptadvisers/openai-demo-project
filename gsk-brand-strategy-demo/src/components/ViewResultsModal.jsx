import React from 'react';

const ViewResultsModal = ({ isOpen, onClose, uploadData }) => {
  if (!isOpen) return null;

  const extractedData = {
    projectName: uploadData?.name?.replace('.pdf', '').replace('.docx', '').replace('.pptx', '') || 'Shingrix Brand Strategy',
    indication: 'Herpes Zoster (Shingles) Prevention',
    primaryObjective: 'Double the number of Canadians protected against Shingles',
    targetGrowth: '3% CAGR by 2026',
    currentCoverage: '2.9M Canadians (23.5%)',
    opportunity: '12M eligible Canadians',
    segments: [
      { name: 'HZ Champions', percentage: 40, description: 'High-volume prescribers focused on prevention' },
      { name: 'Rising Stars', percentage: 30, description: 'Growing practices with vaccination focus' },
      { name: 'Primary Care', percentage: 20, description: 'Broad reach general practitioners' },
      { name: 'Specialists', percentage: 10, description: 'Targeted specialist engagement' }
    ],
    channels: ['Email', 'Face-to-Face', 'Virtual', 'Digital'],
    keyMetrics: {
      'AI Accuracy': '91%',
      'Time Saved': '5-6 weeks',
      'Cost Savings': '$45,000-60,000',
      'Efficiency Gain': '240x faster'
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '900px', width: '90%' }}>
        <div className="modal-header">
          <h2>Extracted Brand Strategy Data</h2>
          <button 
            className="modal-close" 
            onClick={onClose}
            style={{ fontSize: '24px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            ×
          </button>
        </div>

        <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          {/* Document Info */}
          <div style={{ 
            background: 'linear-gradient(135deg, rgba(74, 144, 226, 0.1), rgba(16, 185, 129, 0.1))',
            border: '1px solid var(--primary-blue)',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '1.5rem'
          }}>
            <h3 style={{ fontSize: '16px', marginBottom: '0.75rem' }}>Document: {uploadData?.name || 'Shingrix_Brand_Strategy_Q4_2024.pdf'}</h3>
            <div style={{ display: 'flex', gap: '2rem', fontSize: '14px', color: 'var(--text-secondary)' }}>
              <span>Processed: {uploadData?.date || '2 hours ago'}</span>
              <span>Size: {uploadData?.size || '2.4 MB'}</span>
              <span style={{ color: 'var(--success)' }}>✓ Successfully Extracted</span>
            </div>
          </div>

          {/* Extracted Strategy Overview */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '16px', marginBottom: '1rem', color: 'var(--primary-blue)' }}>Strategy Overview</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Product Name</label>
                <div style={{ padding: '0.75rem', background: 'var(--primary-bg)', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                  {extractedData.projectName}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Indication</label>
                <div style={{ padding: '0.75rem', background: 'var(--primary-bg)', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                  {extractedData.indication}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Primary Objective</label>
                <div style={{ padding: '0.75rem', background: 'var(--primary-bg)', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                  {extractedData.primaryObjective}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Target Growth</label>
                <div style={{ padding: '0.75rem', background: 'var(--primary-bg)', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                  {extractedData.targetGrowth}
                </div>
              </div>
            </div>
          </div>

          {/* Market Segments */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '16px', marginBottom: '1rem', color: 'var(--primary-blue)' }}>Market Segments</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              {extractedData.segments.map((segment, index) => (
                <div key={index} style={{ 
                  background: 'var(--card-bg)', 
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '1rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: '600' }}>{segment.name}</h4>
                    <span style={{ 
                      background: 'var(--primary-blue)',
                      color: 'white',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '12px',
                      fontSize: '13px',
                      fontWeight: '600'
                    }}>
                      {segment.percentage}%
                    </span>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>
                    {segment.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Metrics */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '16px', marginBottom: '1rem', color: 'var(--primary-blue)' }}>Performance Metrics</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
              {Object.entries(extractedData.keyMetrics).map(([key, value]) => (
                <div key={key} style={{ 
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '1rem',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--primary-blue)', marginBottom: '0.25rem' }}>
                    {value}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    {key}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Channels */}
          <div>
            <h3 style={{ fontSize: '16px', marginBottom: '1rem', color: 'var(--primary-blue)' }}>Distribution Channels</h3>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {extractedData.channels.map((channel, index) => (
                <span key={index} style={{
                  background: 'var(--primary-bg)',
                  border: '1px solid var(--border-color)',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  fontSize: '13px'
                }}>
                  {channel}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          <button className="btn btn-primary">
            Create Configuration
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewResultsModal;