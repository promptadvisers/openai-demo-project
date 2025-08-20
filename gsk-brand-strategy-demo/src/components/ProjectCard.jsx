import React, { useState, useRef, useEffect } from 'react';

const ProjectCard = ({ project, type }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isMenuOpen]);

  const handleMenuToggle = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = (action) => {
    console.log(`${action} clicked for project ${project.id}`);
    setIsMenuOpen(false);
  };

  const getStatusIcon = (iconType) => {
    switch (iconType) {
      case 'clock':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 6v6l4 2"/>
          </svg>
        );
      case 'warning':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
          </svg>
        );
      case 'error':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
        );
      default:
        return null;
    }
  };

  const renderMenuItems = () => {
    if (type === 'template') {
      return (
        <>
          <button 
            className="menu-item" 
            onClick={() => handleMenuItemClick('edit')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            </svg>
            Edit Template
          </button>
          <button 
            className="menu-item" 
            onClick={() => handleMenuItemClick('run')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
            Run Project from Template
          </button>
          <button 
            className="menu-item danger" 
            onClick={() => handleMenuItemClick('delete')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
            </svg>
            Delete Template
          </button>
        </>
      );
    } else {
      return (
        <>
          <button 
            className="menu-item" 
            onClick={() => handleMenuItemClick('edit')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            </svg>
            Edit Project
          </button>
          <button 
            className="menu-item" 
            onClick={() => handleMenuItemClick('duplicate')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
            </svg>
            Duplicate
          </button>
          <button 
            className="menu-item danger" 
            onClick={() => handleMenuItemClick('delete')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
            </svg>
            Delete Project
          </button>
        </>
      );
    }
  };

  return (
    <div className="project-card">
      <div className="card-header">
        <div className="card-title">
          <h3>{project.title}</h3>
          <p className="card-subtitle">{project.subtitle}</p>
        </div>
        <div className="card-menu">
          <button 
            ref={buttonRef}
            className="menu-button" 
            onClick={handleMenuToggle}
            aria-label="More options"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="1"/>
              <circle cx="12" cy="5" r="1"/>
              <circle cx="12" cy="19" r="1"/>
            </svg>
          </button>
          {isMenuOpen && (
            <div ref={menuRef} className="menu-dropdown">
              {renderMenuItems()}
            </div>
          )}
        </div>
      </div>

      {project.shares && project.shares.length > 0 && (
        <div className="card-content">
          <div className="share-info">
            {project.shares.map((share, index) => (
              <div key={index} className="share-item">
                <span className="share-label">{share.label}</span>
                <span className="share-value">{share.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {project.status && project.status.length > 0 && (
        <div className="card-status">
          {project.status.map((status, index) => (
            <div key={index} className={`status-item ${status.type}`}>
              <div className="status-icon">
                {getStatusIcon(status.icon)}
              </div>
              <span>{status.text}</span>
            </div>
          ))}
        </div>
      )}

      {project.hasUndeploy && (
        <div className="card-footer">
          <button className="undeploy-button">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Undeploy
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;