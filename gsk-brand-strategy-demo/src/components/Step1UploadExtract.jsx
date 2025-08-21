import React, { useState } from 'react';
import WorkflowStepIndicator from './WorkflowStepIndicator';

const Step1UploadExtract = ({ isOpen, onClose, onContinue, userType = 'pharma' }) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setUploadedFile(files[0]);
    }
  };

  const handleContinue = () => {
    const setupData = {
      uploadedFile,
      step: 1
    };
    onContinue(setupData);
  };

  const handleCancel = () => {
    setUploadedFile(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleCancel} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="modal-content workflow-modal step1-upload" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Step 1: Upload & Extract</h2>
          <button className="modal-close" onClick={handleCancel}>×</button>
        </div>

        <div className="modal-body">
          {/* Workflow Step Indicator - Horizontal Timeline */}
          <WorkflowStepIndicator currentStep={1} userType={userType} variant="horizontal" />

          <div className="step-content">
            <div className="step-description">
              <h3>Upload Brand Strategy Content</h3>
              <p>
                Upload your brand strategy document to begin the extraction process. Our Brand Strategy Agent will analyze your content and extract key strategic components.
              </p>
              
              <div className="extraction-benefits">
                <div className="benefit-item">
                  <div className="benefit-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <span>91% extraction accuracy rate</span>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                    </svg>
                  </div>
                  <span>Transform 5-6 weeks to 15 minutes</span>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <span>Save $45,000-60,000 per template</span>
                </div>
              </div>
            </div>

            <div className="upload-section">
              <h4>Upload Brand Strategy Document</h4>
              <p className="upload-instruction">
                Supported formats: PDF, DOC, DOCX, PPT, PPTX (Max size: 50MB)
              </p>
              
              {/* Hidden file input */}
              <input
                id="file-upload"
                type="file"
                accept=".pdf,.doc,.docx,.ppt,.pptx"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
              
              {/* Clickable drag and drop area */}
              <label 
                htmlFor="file-upload"
                className={`file-upload-area enhanced ${isDragOver ? 'drag-over' : ''} ${uploadedFile ? 'has-file' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                style={{ cursor: uploadedFile ? 'default' : 'pointer' }}
              >
                <div className="upload-content">
                  {uploadedFile ? (
                    <div className="upload-success">
                      <div className="success-icon">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                      <div className="file-info">
                        <div className="file-name">{uploadedFile.name}</div>
                        <div className="file-details">
                          <span className="file-size">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</span>
                          <span className="file-type">{uploadedFile.type || 'Document'}</span>
                        </div>
                      </div>
                      <button 
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setUploadedFile(null);
                        }}
                        style={{ marginTop: '1rem' }}
                      >
                        Remove File
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="upload-icon">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7,10 12,5 17,10" />
                          <line x1="12" y1="5" x2="12" y2="15" />
                        </svg>
                      </div>
                      <div className="upload-text">
                        <div className="primary-text">Drag and drop your brand strategy document here</div>
                        <div className="secondary-text">or click to browse files</div>
                      </div>
                    </>
                  )}
                </div>
              </label>

              {uploadedFile && (
                <div className="processing-preview">
                  <h5>Next: Brand Strategy Agent Processing</h5>
                  <div className="processing-steps">
                    <div className="processing-step">
                      <div className="step-icon">1</div>
                      <span>Document analysis and text extraction</span>
                    </div>
                    <div className="processing-step">
                      <div className="step-icon">2</div>
                      <span>Strategic component identification</span>
                    </div>
                    <div className="processing-step">
                      <div className="step-icon">3</div>
                      <span>Brand Strategy Summary generation</span>
                    </div>
                  </div>
                  <div className="processing-time">
                    <strong>Estimated processing time: 45 seconds</strong>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={handleCancel}>
            Back to User Selection
          </button>
          <button 
            className="btn btn-primary" 
            onClick={handleContinue}
            disabled={!uploadedFile}
          >
            {uploadedFile ? 'Start Processing' : 'Select File to Continue'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step1UploadExtract;