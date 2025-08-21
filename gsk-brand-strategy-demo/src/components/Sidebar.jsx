import React from 'react';

const Sidebar = ({ currentView, onNavigate }) => {
  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <div className="app-branding">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '0.75rem'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              boxShadow: '0 4px 16px rgba(102, 126, 234, 0.35)',
              animation: 'pulse 3s ease-in-out infinite',
              flexShrink: 0
            }}>
              ✨
            </div>
            <div style={{ flex: 1 }}>
              <h1 className="app-title" style={{ marginBottom: '0.25rem', lineHeight: '1.3' }}>Brand Strategy Experimentation Platform</h1>
              <div className="customer-name">GSK Canada</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="sidebar-nav">
        <div className="nav-section">
          <button 
            className={`nav-item ${currentView === 'dashboard' ? 'active' : ''}`}
            onClick={() => onNavigate('dashboard')}
          >
            <div className="nav-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
            </div>
            <span className="nav-label">Projects</span>
          </button>
          
          <button 
            className={`nav-item ${currentView === 'templates' ? 'active' : ''}`}
            onClick={() => onNavigate('templates')}
          >
            <div className="nav-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
              </svg>
            </div>
            <span className="nav-label">Templates</span>
          </button>

          <button 
            className={`nav-item ${currentView === 'documents' ? 'active' : ''}`}
            onClick={() => onNavigate('documents')}
          >
            <div className="nav-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
              </svg>
            </div>
            <span className="nav-label">Documents</span>
          </button>

          <button 
            className={`nav-item ${currentView === 'users' ? 'active' : ''}`}
            onClick={() => onNavigate('users')}
          >
            <div className="nav-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 7c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4zm-4 7c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <span className="nav-label">Users</span>
          </button>
        </div>
        
        <div className="nav-section">
          <button 
            className={`nav-item ${currentView === 'settings' ? 'active' : ''}`}
            onClick={() => onNavigate('settings')}
          >
            <div className="nav-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
              </svg>
            </div>
            <span className="nav-label">Settings</span>
          </button>
          
          <button 
            className={`nav-item ${currentView === 'help' ? 'active' : ''}`}
            onClick={() => onNavigate('help')}
          >
            <div className="nav-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
              </svg>
            </div>
            <span className="nav-label">Help</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;