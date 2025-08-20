import React, { useState } from 'react';

const RunProjectSetupModal = ({ isOpen, onClose, onContinue }) => {
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedOption, setSelectedOption] = useState('migrate');
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
      selectedProject,
      selectedOption,
      uploadedFile
    };
    onContinue(setupData);
  };

  const handleCancel = () => {
    setSelectedProject('');
    setSelectedOption('migrate');
    setUploadedFile(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleCancel} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Run Project Setup</h2>
          <button className="modal-close" onClick={handleCancel} style={{ fontSize: '24px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
        </div>

        <div className="modal-body">
          <div className="setup-section">
            <h3>Migrating Assets</h3>
            <p className="section-description">
              Select an existing project to migrate computed assets from
            </p>

            <div className="form-group">
              <select 
                value={selectedProject} 
                onChange={(e) => setSelectedProject(e.target.value)}
                className="form-select"
              >
                <option value="">Select project</option>
                <option value="mybetriq-mar28">Mybetriq Analysis (MAR28)</option>
                <option value="mybetriq-feb28">Mybetriq Analysis (FEB28)</option>
                <option value="shingrix-jan28">Shingrix Analysis (JAN28)</option>
              </select>
            </div>

            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="migrationOption"
                  value="migrate"
                  checked={selectedOption === 'migrate'}
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
                <div className="radio-content">
                  <h4>Continue with migrating assets</h4>
                  <p>Migrate computed assets from the selected project</p>
                </div>
              </label>
              
              <label className="radio-option">
                <input
                  type="radio"
                  name="migrationOption"
                  value="without"
                  checked={selectedOption === 'without'}
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
                <div className="radio-content">
                  <h4>Continue without migrating assets</h4>
                  <p>Project will run from template without any existing assets</p>
                </div>
              </label>
            </div>

            <div className="upload-section">
              <h4>Upload Brand Strategy Document</h4>
              
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
                className={`file-upload-area ${isDragOver ? 'drag-over' : ''} ${uploadedFile ? 'has-file' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                style={{ cursor: uploadedFile ? 'default' : 'pointer' }}
              >
                <div className="upload-content">
                  {uploadedFile ? (
                    <div className="upload-success">
                      <div className="file-name">{uploadedFile.name}</div>
                      <div className="file-size">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</div>
                      <button 
                        type="button"
                        className="btn btn-secondary"
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
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7,10 12,5 17,10" />
                          <line x1="12" y1="5" x2="12" y2="15" />
                        </svg>
                      </div>
                      <div className="upload-text">
                        <div className="primary-text">Click to upload or drag and drop</div>
                        <div className="secondary-text">PDF, DOC, DOCX, PPT, PPTX files</div>
                      </div>
                    </>
                  )}
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
          <button 
            className="btn btn-primary" 
            onClick={handleContinue}
            disabled={selectedOption === 'migrate' ? (!uploadedFile || !selectedProject) : !uploadedFile}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default RunProjectSetupModal;