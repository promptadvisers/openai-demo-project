import React, { useState } from 'react';

const AddUserModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'Editor',
    department: 'Marketing',
    title: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      role: 'Editor',
      department: 'Marketing',
      title: ''
    });
    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
        <div className="modal-header">
          <h2>Add New User</h2>
          <button 
            className="modal-close" 
            onClick={onClose}
            style={{ fontSize: '24px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="form-input"
                  required
                  placeholder="John"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="form-input"
                  required
                  placeholder="Smith"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                required
                placeholder="john.smith@gsk.com"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Job Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="form-input"
                required
                placeholder="Brand Strategy Manager"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Department</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="Marketing">Marketing</option>
                  <option value="Analytics">Analytics</option>
                  <option value="Product">Product</option>
                  <option value="Medical">Medical Affairs</option>
                  <option value="Sales">Sales</option>
                  <option value="Operations">Operations</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="Administrator">Administrator</option>
                  <option value="Editor">Editor</option>
                  <option value="Viewer">Viewer</option>
                </select>
              </div>
            </div>

            <div style={{ 
              background: 'var(--primary-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '1rem',
              marginTop: '1.5rem'
            }}>
              <h4 style={{ fontSize: '14px', marginBottom: '0.75rem', fontWeight: '600' }}>Permissions</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '13px' }}>
                  <input type="checkbox" defaultChecked={formData.role === 'Administrator'} disabled={formData.role === 'Viewer'} />
                  Create and edit projects
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '13px' }}>
                  <input type="checkbox" defaultChecked={formData.role !== 'Viewer'} disabled={formData.role === 'Viewer'} />
                  Upload and process documents
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '13px' }}>
                  <input type="checkbox" defaultChecked />
                  View configurations and reports
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '13px' }}>
                  <input type="checkbox" defaultChecked={formData.role === 'Administrator'} disabled={formData.role !== 'Administrator'} />
                  Manage users and settings
                </label>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;