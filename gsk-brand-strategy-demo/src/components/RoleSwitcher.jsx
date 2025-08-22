import React from 'react';
import { USER_ROLES } from '../utils/permissions';

const RoleSwitcher = ({ currentRole, onRoleChange }) => {
  return (
    <div style={{
      position: 'fixed',
      top: '1rem',
      right: '1rem',
      zIndex: 9999,
      background: 'var(--card-bg)',
      border: '1px solid var(--border-color)',
      borderRadius: '12px',
      padding: '0.75rem 1rem',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
      }}>
        <span style={{
          fontSize: '0.75rem',
          color: 'var(--text-secondary)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          fontWeight: '600'
        }}>
          Demo Role:
        </span>
        
        <div style={{
          display: 'flex',
          background: 'var(--primary-bg)',
          borderRadius: '8px',
          padding: '2px',
          border: '1px solid rgba(74, 144, 226, 0.2)'
        }}>
          <button
            onClick={() => onRoleChange(USER_ROLES.BA)}
            style={{
              padding: '0.5rem 1rem',
              background: currentRole === USER_ROLES.BA 
                ? 'linear-gradient(135deg, var(--primary-blue), #357ABD)' 
                : 'transparent',
              color: currentRole === USER_ROLES.BA ? 'white' : 'var(--text-secondary)',
              border: 'none',
              borderRadius: '6px',
              fontSize: '0.8125rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 200ms ease',
              minWidth: '100px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
              </svg>
              Brand Analyst
            </div>
          </button>
          
          <button
            onClick={() => onRoleChange(USER_ROLES.CLIENT)}
            style={{
              padding: '0.5rem 1rem',
              background: currentRole === USER_ROLES.CLIENT 
                ? 'linear-gradient(135deg, #8B5CF6, #7C3AED)' 
                : 'transparent',
              color: currentRole === USER_ROLES.CLIENT ? 'white' : 'var(--text-secondary)',
              border: 'none',
              borderRadius: '6px',
              fontSize: '0.8125rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 200ms ease',
              minWidth: '100px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
              </svg>
              Client
            </div>
          </button>
        </div>
        
        {currentRole === USER_ROLES.CLIENT && (
          <div style={{
            marginLeft: '0.5rem',
            padding: '0.25rem 0.625rem',
            background: 'rgba(139, 92, 246, 0.1)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            borderRadius: '4px',
            fontSize: '0.6875rem',
            color: '#A78BFA',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Limited Access
          </div>
        )}
      </div>
      
      <div style={{
        marginTop: '0.625rem',
        fontSize: '0.6875rem',
        color: 'var(--text-secondary)',
        opacity: 0.7,
        textAlign: 'center'
      }}>
        {currentRole === USER_ROLES.BA 
          ? 'Full workflow access' 
          : 'Review & approval only'}
      </div>
    </div>
  );
};

export default RoleSwitcher;