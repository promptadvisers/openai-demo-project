import React from 'react';

const UserDetailsModal = ({ isOpen, onClose, user }) => {
  if (!isOpen || !user) return null;

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getAvatarColor = (name) => {
    const colors = [
      'linear-gradient(135deg, #4A90E2, #357ABD)',
      'linear-gradient(135deg, #10B981, #059669)',
      'linear-gradient(135deg, #F59E0B, #D97706)',
      'linear-gradient(135deg, #8B5CF6, #7C3AED)',
      'linear-gradient(135deg, #EF4444, #DC2626)'
    ];
    return colors[name.length % colors.length];
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
        <div className="modal-header" style={{ borderBottom: 'none' }}>
          <h2>User Details</h2>
          <button 
            className="modal-close" 
            onClick={onClose}
            style={{ fontSize: '24px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            ×
          </button>
        </div>

        <div className="modal-body">
          {/* User Profile Header */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1.5rem',
            padding: '1.5rem',
            background: 'var(--primary-bg)',
            borderRadius: '8px',
            marginBottom: '2rem'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: getAvatarColor(user.name),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '28px',
              fontWeight: '600',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
            }}>
              {getInitials(user.name)}
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '20px', margin: '0 0 0.25rem 0' }}>{user.name}</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '0 0 0.5rem 0' }}>{user.title}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ 
                  width: '8px', 
                  height: '8px', 
                  borderRadius: '50%', 
                  background: user.status === 'Online' ? 'var(--success)' : 
                             user.status === 'Away' ? 'var(--warning)' : 
                             'var(--text-muted)' 
                }}></span>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  {user.status} • {user.lastSeen}
                </span>
              </div>
            </div>
          </div>

          {/* User Information Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
            <div>
              <label style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Email
              </label>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '14px' }}>{user.email || `${user.name.toLowerCase().replace(' ', '.')}@gsk.com`}</p>
            </div>
            
            <div>
              <label style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Department
              </label>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '14px' }}>{user.department}</p>
            </div>
            
            <div>
              <label style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Role
              </label>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '14px' }}>{user.role}</p>
            </div>
            
            <div>
              <label style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Active Projects
              </label>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '14px' }}>{user.activeProjects} projects</p>
            </div>
          </div>

          {/* Activity Section */}
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ fontSize: '14px', marginBottom: '1rem', fontWeight: '600' }}>Recent Activity</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { action: 'Created project', project: 'Shingrix Q4 Campaign', time: '2 hours ago' },
                { action: 'Uploaded document', project: 'Market Analysis Report', time: '1 day ago' },
                { action: 'Modified configuration', project: 'Mybetriq Strategy', time: '3 days ago' },
                { action: 'Shared template', project: 'Generic Pharma Template', time: '1 week ago' }
              ].map((activity, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  padding: '0.75rem',
                  background: 'var(--primary-bg)',
                  borderRadius: '6px',
                  fontSize: '13px'
                }}>
                  <div>
                    <span style={{ color: 'var(--text-primary)' }}>{activity.action}</span>
                    <span style={{ color: 'var(--text-secondary)' }}> • {activity.project}</span>
                  </div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{activity.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Permissions */}
          <div>
            <h4 style={{ fontSize: '14px', marginBottom: '1rem', fontWeight: '600' }}>Permissions</h4>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr',
              gap: '0.75rem',
              padding: '1rem',
              background: 'var(--primary-bg)',
              borderRadius: '8px'
            }}>
              {[
                { permission: 'Create projects', hasAccess: user.role !== 'Viewer' },
                { permission: 'Edit configurations', hasAccess: user.role !== 'Viewer' },
                { permission: 'Upload documents', hasAccess: user.role !== 'Viewer' },
                { permission: 'View reports', hasAccess: true },
                { permission: 'Manage users', hasAccess: user.role === 'Administrator' },
                { permission: 'System settings', hasAccess: user.role === 'Administrator' }
              ].map((perm, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '13px' }}>
                  <span style={{ color: perm.hasAccess ? 'var(--success)' : 'var(--text-muted)' }}>
                    {perm.hasAccess ? '✓' : '×'}
                  </span>
                  <span style={{ color: perm.hasAccess ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                    {perm.permission}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          <button className="btn btn-primary">
            Edit User
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;