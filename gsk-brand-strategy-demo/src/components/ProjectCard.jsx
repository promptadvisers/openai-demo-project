import React, { useState } from 'react';

const ProjectCard = ({ 
  title, 
  subtitle, 
  shareInfo, 
  status, 
  isDeployed = false, 
  hasMenu = true,
  statusColor = 'blue'
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const getStatusIcon = () => {
    switch (status?.type) {
      case 'executing':
        return (
          <div className="status-item executing">
            <div className="status-icon">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <span>{status.text}</span>
          </div>
        );
      case 'failed':
        return (
          <div className="status-item failed">
            <div className="status-icon">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M8 12l4 4 8-8" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <span>{status.text}</span>
          </div>
        );
      default:
        return null;
    }
  };

  const handleMenuClick = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  return (
    <div className="project-card">
      <div className="card-header">
        <div className="card-title">
          <h3>{title}</h3>
          <p className="card-subtitle">{subtitle}</p>
        </div>
        {hasMenu && (
          <div className="card-menu" onClick={handleMenuClick}>
            <button className="menu-button">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="12" cy="5" r="1"></circle>
                <circle cx="12" cy="19" r="1"></circle>
              </svg>
            </button>
            {showMenu && (
              <div className="menu-dropdown">
                <button className="menu-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                  Edit Template
                </button>
                <button className="menu-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14,2 14,8 20,8"></polyline>
                  </svg>
                  Run Project from Template
                </button>
                <button className="menu-item danger">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3,6 5,6 21,6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                  Delete Template
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="card-content">
        {shareInfo && (
          <div className="share-info">
            {shareInfo.map((info, index) => (
              <div key={index} className="share-item">
                <span className="share-label">Share:</span>
                <span className="share-value">{info}</span>
              </div>
            ))}
          </div>
        )}
        
        {status && (
          <div className="card-status">
            {getStatusIcon()}
          </div>
        )}
      </div>

      {isDeployed && (
        <div className="card-footer">
          <button className="undeploy-button">
            <span>Undeploy</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 8v4l3 3"></path>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;