import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content confirmation-modal">
        <div className="modal-header">
          <h2>Confirmation</h2>
        </div>

        <div className="modal-body">
          <div className="confirmation-content">
            <div className="confirmation-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12l2 2 4-4"></path>
                <circle cx="12" cy="12" r="10"></circle>
              </svg>
            </div>
            <h3>Project Creation Confirmed</h3>
            <p>Your new project has been successfully created and will be available in the dashboard shortly.</p>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={onSubmit}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;