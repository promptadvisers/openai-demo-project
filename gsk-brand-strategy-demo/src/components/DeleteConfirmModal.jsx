import React from 'react';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, itemType = 'project', itemName = '' }) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
        <div className="modal-header" style={{ borderBottom: 'none', paddingBottom: '0' }}>
          <h2 style={{ color: 'var(--error)' }}>Delete {itemType === 'template' ? 'Template' : 'Project'}</h2>
          <button className="modal-close" onClick={onClose} style={{ fontSize: '24px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
        </div>

        <div className="modal-body">
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid var(--error)',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--error)" style={{ flexShrink: 0, marginTop: '2px' }}>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
              <div>
                <p style={{ 
                  color: 'var(--text-primary)', 
                  fontSize: '0.95rem',
                  marginBottom: '0.5rem',
                  fontWeight: '500'
                }}>
                  This action cannot be undone
                </p>
                <p style={{ 
                  color: 'var(--text-secondary)', 
                  fontSize: '0.875rem',
                  margin: 0,
                  lineHeight: '1.5'
                }}>
                  Are you sure you want to delete <strong style={{ color: 'var(--text-primary)' }}>"{itemName}"</strong>? 
                  {itemType === 'project' && ' All associated configurations and data will be permanently removed.'}
                  {itemType === 'template' && ' This template will no longer be available for creating new projects.'}
                </p>
              </div>
            </div>
          </div>

          {itemType === 'project' && (
            <div style={{
              background: 'var(--primary-bg)',
              borderRadius: '8px',
              padding: '1rem',
              marginBottom: '1rem'
            }}>
              <h4 style={{ 
                color: 'var(--text-primary)', 
                fontSize: '0.875rem',
                fontWeight: '600',
                marginBottom: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                What will be deleted:
              </h4>
              <ul style={{ 
                margin: 0, 
                paddingLeft: '1.5rem',
                color: 'var(--text-secondary)',
                fontSize: '0.875rem',
                lineHeight: '1.6'
              }}>
                <li>Project configuration and settings</li>
                <li>Extracted brand strategy data</li>
                <li>Market segmentation and targeting</li>
                <li>All associated deployment history</li>
              </ul>
            </div>
          )}
        </div>

        <div className="modal-footer" style={{ gap: '0.75rem' }}>
          <button 
            className="btn btn-secondary" 
            onClick={onClose}
            style={{ minWidth: '100px' }}
          >
            Cancel
          </button>
          <button 
            className="btn"
            onClick={handleConfirm}
            style={{ 
              minWidth: '100px',
              backgroundColor: 'var(--error)',
              color: 'white',
              border: 'none'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#DC2626'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--error)'}
          >
            Delete {itemType === 'template' ? 'Template' : 'Project'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;