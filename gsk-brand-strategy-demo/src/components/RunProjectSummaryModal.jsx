import React, { useState } from 'react';

const RunProjectSummaryModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    templateName: 'New Template July 15',
    projectName: '',
    projectDueDate: '',
    changelog: '',
    customerMarket: 'GRED Asthma'
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content run-project-summary">
        <div className="modal-header">
          <h2>Run Project Summary</h2>
          <button className="modal-close" onClick={onClose}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="modal-body">
          <div className="form-section">
            <div className="form-group">
              <label className="form-label">Template Name</label>
              <input
                type="text"
                value={formData.templateName}
                onChange={(e) => handleInputChange('templateName', e.target.value)}
                className="form-input"
                readOnly
              />
            </div>

            <div className="form-group">
              <label className="form-label">Project Name</label>
              <input
                type="text"
                placeholder="Enter Project Name"
                value={formData.projectName}
                onChange={(e) => handleInputChange('projectName', e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Project Due Date</label>
              <p className="field-description">Select date to deploy project by in order to meet customer SLA</p>
              <div className="date-input-wrapper">
                <input
                  type="date"
                  value={formData.projectDueDate}
                  onChange={(e) => handleInputChange('projectDueDate', e.target.value)}
                  className="form-input date-input"
                  placeholder="Select Due Date"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Changelog</label>
              <p className="field-description">Summarize the changes included in the project</p>
              <textarea
                placeholder="Type Changelog"
                value={formData.changelog}
                onChange={(e) => handleInputChange('changelog', e.target.value)}
                className="form-textarea"
                rows={3}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Customer Market</label>
              <input
                type="text"
                value={formData.customerMarket}
                onChange={(e) => handleInputChange('customerMarket', e.target.value)}
                className="form-input"
                readOnly
              />
            </div>

            <div className="form-group">
              <label className="form-label">Migrated Assets</label>
              <p className="field-description">Assets will be migrated from Project ABC</p>
            </div>

            <div className="form-group">
              <label className="form-label">Objectives</label>
              <p className="field-description">Please review your selected objectives</p>
              
              <div className="objectives-list">
                <div className="objective-item">
                  <h4>Objective 1</h4>
                  <p className="objective-title">Market Share Objective</p>
                  <div className="objective-details">
                    <div className="objective-field">
                      <span className="field-label">Portfolio:</span>
                      <span className="field-value">Intro and Trelegy Immune System disease, SEA, EGPA, GP ENT</span>
                    </div>
                    <div className="objective-field">
                      <span className="field-label">Competitive:</span>
                      <span className="field-value">Rinud, Immune System disease, SEA, EGPA, NP, ENT</span>
                    </div>
                  </div>
                </div>

                <div className="objective-item">
                  <h4>Objective 1</h4>
                  <p className="objective-title">Market Share Objective</p>
                  <div className="objective-details">
                    <div className="objective-field">
                      <span className="field-label">Portfolio:</span>
                      <span className="field-value">Intro and Trelegy Immune System disease, SEA, EGPA, GP ENT</span>
                    </div>
                    <div className="objective-field">
                      <span className="field-label">Competitive:</span>
                      <span className="field-value">Rinud, Immune System disease, SEA, EGPA, NP, ENT</span>
                    </div>
                    <div className="objective-field">
                      <span className="field-label">Underlying:</span>
                      <span className="field-value">Lorem Ipsum, dolor sit, amet</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button 
            className="btn btn-primary" 
            onClick={handleSubmit}
            disabled={!formData.projectName}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RunProjectSummaryModal;