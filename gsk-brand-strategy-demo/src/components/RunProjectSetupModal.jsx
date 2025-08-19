import React, { useState } from 'react';

const RunProjectSetupModal = ({ isOpen, onClose, onContinue }) => {
  const [selectedProject, setSelectedProject] = useState('');
  const [migrationType, setMigrationType] = useState('without');
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleContinue = () => {
    const setupData = {
      selectedProject,
      migrationType,
      uploadedFile
    };
    onContinue(setupData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content run-project-setup">
        <div className="modal-header">
          <h2>Run Project Setup</h2>
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
                  name="migrationType"
                  value="without"
                  checked={migrationType === 'without'}
                  onChange={(e) => setMigrationType(e.target.value)}
                />
                <div className="radio-content">
                  <h4>Continue without migrating assets</h4>
                  <p>Project will run from template without any existing assets</p>
                </div>
              </label>
            </div>

            {/* File Upload Section */}
            <div className="upload-section">
              <h4>Upload Brand Strategy Document</h4>
              <div className="file-upload-area">
                <input
                  type="file"
                  id="file-upload"
                  accept=".pdf,.doc,.docx,.ppt,.pptx"
                  onChange={handleFileUpload}
                  className="file-input"
                />
                <label htmlFor="file-upload" className="file-upload-label">
                  <div className="upload-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7,10 12,5 17,10" />
                      <line x1="12" y1="5" x2="12" y2="15" />
                    </svg>
                  </div>
                  <div className="upload-text">
                    {uploadedFile ? (
                      <>
                        <span className="file-name">{uploadedFile.name}</span>
                        <span className="file-size">({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)</span>
                      </>
                    ) : (
                      <>
                        <span>Click to upload or drag and drop</span>
                        <span className="file-types">PDF, DOC, DOCX, PPT, PPTX</span>
                      </>
                    )}
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button 
            className="btn btn-primary" 
            onClick={handleContinue}
            disabled={!uploadedFile}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default RunProjectSetupModal;