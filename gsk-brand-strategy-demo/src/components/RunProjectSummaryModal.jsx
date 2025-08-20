import React, { useState, useEffect, useRef, useCallback } from 'react';

const RunProjectSummaryModal = ({ isOpen, onClose, onSubmit, setupData }) => {
  const [formData, setFormData] = useState({
    projectName: '',
    projectDescription: '',
    businessGoal: '',
    targetDate: '',
    uploadedFile: null
  });
  const [dragActive, setDragActive] = useState(false);
  const modalRef = useRef(null);
  const fileInputRef = useRef(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (file) => {
    if (file && file.type === 'application/pdf') {
      setFormData(prev => ({ ...prev, uploadedFile: file }));
    } else {
      alert('Please select a PDF file');
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }, []);

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      onSubmit({
        ...formData,
        setupData
      });
    }
  };

  const isFormValid = formData.projectName && formData.businessGoal && formData.uploadedFile;

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div ref={modalRef} className="modal-content">
        <div className="modal-header">
          <h2>Run Project Setup</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Project Name *</label>
              <input
                type="text"
                name="projectName"
                className="form-input"
                value={formData.projectName}
                onChange={handleInputChange}
                placeholder="Enter project name"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Project Description</label>
              <textarea
                name="projectDescription"
                className="form-textarea"
                value={formData.projectDescription}
                onChange={handleInputChange}
                placeholder="Describe your project (optional)"
                rows={3}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Business Goal *</label>
              <textarea
                name="businessGoal"
                className="form-textarea"
                value={formData.businessGoal}
                onChange={handleInputChange}
                placeholder="What business objective does this project aim to achieve?"
                rows={3}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Target Completion Date</label>
              <input
                type="date"
                name="targetDate"
                className="form-input"
                value={formData.targetDate}
                onChange={handleInputChange}
              />
            </div>

            <div className="upload-section">
              <label className="form-label">Brand Strategy Document *</label>
              <p className="field-description">
                Upload your brand strategy document (PDF format only)
              </p>
              
              <div 
                className={`file-upload-area ${dragActive ? 'drag-active' : ''}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={openFileDialog}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  className="file-input"
                  accept=".pdf"
                  onChange={handleFileInputChange}
                />
                
                <div className="file-upload-label">
                  <div className="upload-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                    </svg>
                  </div>
                  
                  <div className="upload-text">
                    {formData.uploadedFile ? (
                      <>
                        <div className="file-name">{formData.uploadedFile.name}</div>
                        <div className="file-size">{formatFileSize(formData.uploadedFile.size)}</div>
                      </>
                    ) : (
                      <>
                        <div className="file-name">
                          {dragActive ? 'Drop file here' : 'Click to upload or drag and drop'}
                        </div>
                        <div className="file-types">PDF files only (max 10MB)</div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={!isFormValid}
            >
              Start Processing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RunProjectSummaryModal;