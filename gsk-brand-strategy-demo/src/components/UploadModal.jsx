import { useState, useRef } from 'react';
import { mockUploadResponse, sleep } from '../data/mockData';

const UploadModal = ({ isOpen, onClose, onUploadComplete }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (file) => {
    // In real app, would validate file type and size
    setSelectedFile({
      name: file.name,
      size: file.size,
      type: file.type
    });
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const simulateUpload = async () => {
    setUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    for (let progress = 0; progress <= 100; progress += 10) {
      setUploadProgress(progress);
      await sleep(200);
    }

    await sleep(500);
    
    // Complete upload and proceed to processing
    onUploadComplete(mockUploadResponse);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal upload-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Upload Brand Strategy Document</h2>
          <button className="modal-close" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="modal-content">
          {!uploading && !selectedFile && (
            <div 
              className={`upload-dropzone ${dragActive ? 'drag-active' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="upload-icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-15" />
                  <polyline points="7,10 12,5 17,10" />
                  <line x1="12" y1="5" x2="12" y2="15" />
                </svg>
              </div>
              <h3>Drag and drop your file here</h3>
              <p>or click to browse files</p>
              <div className="file-requirements">
                <span>Supported formats: PDF, DOC, DOCX</span>
                <span>Maximum size: 10MB</span>
              </div>
            </div>
          )}

          {selectedFile && !uploading && (
            <div className="file-selected">
              <div className="file-info">
                <div className="file-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                  </svg>
                </div>
                <div className="file-details">
                  <h4>{selectedFile.name}</h4>
                  <p>{formatFileSize(selectedFile.size)}</p>
                </div>
                <button 
                  className="remove-file"
                  onClick={() => setSelectedFile(null)}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              
              <div className="upload-actions">
                <button className="btn btn-secondary" onClick={() => setSelectedFile(null)}>
                  Choose Different File
                </button>
                <button className="btn btn-primary" onClick={simulateUpload}>
                  Start Processing
                </button>
              </div>
            </div>
          )}

          {uploading && (
            <div className="upload-progress">
              <div className="upload-status">
                <div className="upload-icon uploading">
                  <div className="spinner"></div>
                </div>
                <h3>Uploading Document...</h3>
                <p>Please wait while we securely upload your brand strategy document.</p>
              </div>
              
              <div className="progress-container">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <span className="progress-text">{uploadProgress}%</span>
              </div>

              <div className="upload-details">
                <div className="upload-detail">
                  <span>File:</span>
                  <span>{selectedFile?.name}</span>
                </div>
                <div className="upload-detail">
                  <span>Size:</span>
                  <span>{formatFileSize(selectedFile?.size || 0)}</span>
                </div>
                <div className="upload-detail">
                  <span>Status:</span>
                  <span className="status-uploading">Uploading...</span>
                </div>
              </div>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileInput}
            style={{ display: 'none' }}
          />
        </div>

        {!uploading && (
          <div className="modal-footer">
            <div className="security-note">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <circle cx="12" cy="16" r="1"></circle>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <span>Your documents are processed securely and never stored permanently.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadModal;