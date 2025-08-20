import React, { useEffect, useRef } from 'react';

const ConfirmationModal = ({ isOpen, onClose, onSubmit }) => {
  const modalRef = useRef(null);

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

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div ref={modalRef} className="modal-content">
        <div className="modal-header">
          <h2>Demo Information</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>

        <div className="modal-body">
          <div className="demo-highlight">
            <h3>GSK Canada Brand Strategy Agent Demo</h3>
            <p>This is a demonstration of a pharmaceutical brand strategy transformation platform designed for GSK Canada.</p>
            
            <div style={{ marginTop: '1.5rem' }}>
              <h4>Key Demo Features:</h4>
              <ul style={{ textAlign: 'left', marginTop: '0.5rem' }}>
                <li><strong>Automated Processing:</strong> Transform 5-6 weeks of manual work into 15 minutes</li>
                <li><strong>Cost Savings:</strong> Save $45,000-60,000 per brand template creation</li>
                <li><strong>Shingrix Focus:</strong> All demonstrations use predetermined Shingrix vaccine data</li>
                <li><strong>AI Simulation:</strong> 91% extraction success rate with realistic processing times</li>
                <li><strong>Market Opportunity:</strong> Target 12M eligible Canadians</li>
              </ul>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <h4>Demo Workflow:</h4>
              <ol style={{ textAlign: 'left', marginTop: '0.5rem' }}>
                <li>Upload brand strategy document (any PDF file)</li>
                <li>45-second realistic processing simulation</li>
                <li>View extracted Shingrix configuration data</li>
                <li>Explore field-ready BOB configurations</li>
              </ol>
            </div>

            <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: 'rgba(74, 144, 226, 0.1)', borderRadius: '8px' }}>
              <p style={{ margin: 0, fontWeight: '600' }}>
                Note: This is a visual demonstration. No actual AI processing occurs - all results display predetermined Shingrix data regardless of input.
              </p>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          <button className="btn btn-primary" onClick={onSubmit}>
            Start Demo
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;