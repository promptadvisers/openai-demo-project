import React, { useState, useEffect, useRef } from 'react';

const TemplateEditModal = ({ isOpen, onClose, onSave, template }) => {
  const [templateData, setTemplateData] = useState({
    title: '',
    subtitle: '',
    description: '',
    productName: 'Shingrix',
    indication: 'Herpes Zoster (Shingles) Prevention',
    primaryGoal: 'Double the number of Canadians protected against Shingles',
    targetAudience: 'Adults 50+ and immunocompromised adults 18+',
    keyMessages: [
      'Shingrix provides superior protection against shingles',
      '90% efficacy rate maintained over 4+ years',
      'Recommended by leading medical organizations'
    ],
    channels: [
      { name: 'Digital Advertising', frequency: 'Weekly', reach: '2.5M' },
      { name: 'Healthcare Provider Outreach', frequency: 'Monthly', reach: '15K' },
      { name: 'Patient Education Materials', frequency: 'Quarterly', reach: '500K' }
    ]
  });

  const modalRef = useRef(null);

  useEffect(() => {
    if (template && isOpen) {
      setTemplateData({
        title: template.title || '',
        subtitle: template.subtitle || '',
        description: template.description || 'GSK Canada pharmaceutical brand strategy template for market expansion',
        productName: 'Shingrix',
        indication: 'Herpes Zoster (Shingles) Prevention',
        primaryGoal: 'Double the number of Canadians protected against Shingles',
        targetAudience: 'Adults 50+ and immunocompromised adults 18+',
        keyMessages: [
          'Shingrix provides superior protection against shingles',
          '90% efficacy rate maintained over 4+ years',
          'Recommended by leading medical organizations'
        ],
        channels: [
          { name: 'Digital Advertising', frequency: 'Weekly', reach: '2.5M' },
          { name: 'Healthcare Provider Outreach', frequency: 'Monthly', reach: '15K' },
          { name: 'Patient Education Materials', frequency: 'Quarterly', reach: '500K' }
        ]
      });
    }
  }, [template, isOpen]);

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

  const handleSave = () => {
    const updatedTemplate = {
      ...template,
      ...templateData,
      lastModified: new Date().toISOString()
    };
    onSave(updatedTemplate);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const updateKeyMessage = (index, value) => {
    const newMessages = [...templateData.keyMessages];
    newMessages[index] = value;
    setTemplateData({ ...templateData, keyMessages: newMessages });
  };

  const addKeyMessage = () => {
    setTemplateData({
      ...templateData,
      keyMessages: [...templateData.keyMessages, 'New key message']
    });
  };

  const removeKeyMessage = (index) => {
    const newMessages = templateData.keyMessages.filter((_, i) => i !== index);
    setTemplateData({ ...templateData, keyMessages: newMessages });
  };

  const updateChannel = (index, field, value) => {
    const newChannels = [...templateData.channels];
    newChannels[index] = { ...newChannels[index], [field]: value };
    setTemplateData({ ...templateData, channels: newChannels });
  };

  const addChannel = () => {
    setTemplateData({
      ...templateData,
      channels: [...templateData.channels, { name: 'New Channel', frequency: 'Monthly', reach: '0' }]
    });
  };

  const removeChannel = (index) => {
    const newChannels = templateData.channels.filter((_, i) => i !== index);
    setTemplateData({ ...templateData, channels: newChannels });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div ref={modalRef} className="modal-content template-edit-modal">
        <div className="modal-header">
          <h2>Edit Template</h2>
          <button className="modal-close" onClick={handleCancel} aria-label="Close" style={{ fontSize: '24px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>

        <div className="modal-body">
          <div className="template-edit-content">
            {/* Basic Information */}
            <div className="config-section">
              <h3>Template Information</h3>
              <div className="form-group">
                <label className="form-label">Template Title</label>
                <input
                  type="text"
                  className="form-input"
                  value={templateData.title}
                  onChange={(e) => setTemplateData({ ...templateData, title: e.target.value })}
                  placeholder="Enter template title"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Subtitle</label>
                <input
                  type="text"
                  className="form-input"
                  value={templateData.subtitle}
                  onChange={(e) => setTemplateData({ ...templateData, subtitle: e.target.value })}
                  placeholder="Enter template subtitle"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  className="form-textarea"
                  rows="3"
                  value={templateData.description}
                  onChange={(e) => setTemplateData({ ...templateData, description: e.target.value })}
                  placeholder="Enter template description"
                />
              </div>
            </div>

            {/* Product Information */}
            <div className="config-section">
              <h3>Product Information</h3>
              <div className="form-group">
                <label className="form-label">Product Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={templateData.productName}
                  onChange={(e) => setTemplateData({ ...templateData, productName: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Indication</label>
                <input
                  type="text"
                  className="form-input"
                  value={templateData.indication}
                  onChange={(e) => setTemplateData({ ...templateData, indication: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Primary Goal</label>
                <textarea
                  className="form-textarea"
                  rows="2"
                  value={templateData.primaryGoal}
                  onChange={(e) => setTemplateData({ ...templateData, primaryGoal: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Target Audience</label>
                <input
                  type="text"
                  className="form-input"
                  value={templateData.targetAudience}
                  onChange={(e) => setTemplateData({ ...templateData, targetAudience: e.target.value })}
                />
              </div>
            </div>

            {/* Key Messages */}
            <div className="config-section">
              <h3>Key Messages</h3>
              <div className="dynamic-list">
                {templateData.keyMessages.map((message, index) => (
                  <div key={index} className="dynamic-item">
                    <input
                      type="text"
                      className="form-input"
                      value={message}
                      onChange={(e) => updateKeyMessage(index, e.target.value)}
                      placeholder="Enter key message"
                    />
                    <button
                      type="button"
                      className="btn btn-danger-outline"
                      onClick={() => removeKeyMessage(index)}
                      aria-label="Remove message"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                      </svg>
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={addKeyMessage}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                  </svg>
                  Add Key Message
                </button>
              </div>
            </div>

            {/* Marketing Channels */}
            <div className="config-section">
              <h3>Marketing Channels</h3>
              <div className="dynamic-list">
                {templateData.channels.map((channel, index) => (
                  <div key={index} className="channel-item">
                    <div className="channel-fields">
                      <div className="form-group">
                        <label className="form-label">Channel Name</label>
                        <input
                          type="text"
                          className="form-input"
                          value={channel.name}
                          onChange={(e) => updateChannel(index, 'name', e.target.value)}
                          placeholder="Channel name"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Frequency</label>
                        <select
                          className="form-select"
                          value={channel.frequency}
                          onChange={(e) => updateChannel(index, 'frequency', e.target.value)}
                        >
                          <option value="Daily">Daily</option>
                          <option value="Weekly">Weekly</option>
                          <option value="Bi-weekly">Bi-weekly</option>
                          <option value="Monthly">Monthly</option>
                          <option value="Quarterly">Quarterly</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Estimated Reach</label>
                        <input
                          type="text"
                          className="form-input"
                          value={channel.reach}
                          onChange={(e) => updateChannel(index, 'reach', e.target.value)}
                          placeholder="e.g., 2.5M"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-danger-outline channel-remove"
                      onClick={() => removeChannel(index)}
                      aria-label="Remove channel"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                      </svg>
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={addChannel}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                  </svg>
                  Add Channel
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            Save Template
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateEditModal;