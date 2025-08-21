import React, { useState, useMemo } from 'react';
import './DocumentsView.css';

const DocumentsView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock documents data with various states
  const mockDocuments = [
    {
      id: 1,
      name: 'Shingrix_Brand_Strategy_Q4_2024.pdf',
      type: 'pdf',
      size: '2.4 MB',
      uploadedAt: new Date('2024-11-28T10:30:00'),
      uploadedBy: 'Sarah Johnson',
      status: 'complete',
      processingTime: '45 seconds',
      extractedData: {
        product: 'Shingrix',
        indication: 'Herpes Zoster Prevention',
        targetSegments: 4,
        confidence: 0.91
      }
    },
    {
      id: 2,
      name: 'GSK_Competitive_Analysis_Nov2024.docx',
      type: 'docx',
      size: '1.8 MB',
      uploadedAt: new Date('2024-11-27T14:15:00'),
      uploadedBy: 'Michael Chen',
      status: 'complete',
      processingTime: '38 seconds',
      extractedData: {
        product: 'Multiple Products',
        indication: 'Various',
        targetSegments: 6,
        confidence: 0.88
      }
    },
    {
      id: 3,
      name: 'Market_Research_Summary_Q3.pptx',
      type: 'pptx',
      size: '4.3 MB',
      uploadedAt: new Date('2024-11-26T09:45:00'),
      uploadedBy: 'Emma Davis',
      status: 'processing',
      processingTime: null,
      progress: 65
    },
    {
      id: 4,
      name: 'Legacy_Campaign_Data.xlsx',
      type: 'xlsx',
      size: '8.9 MB',
      uploadedAt: new Date('2024-11-25T16:20:00'),
      uploadedBy: 'James Wilson',
      status: 'failed',
      error: 'File format not supported for data extraction',
      processingTime: null
    },
    {
      id: 5,
      name: 'Advair_HFA_Strategy_2024.pdf',
      type: 'pdf',
      size: '3.1 MB',
      uploadedAt: new Date('2024-11-24T11:00:00'),
      uploadedBy: 'Lisa Anderson',
      status: 'complete',
      processingTime: '52 seconds',
      extractedData: {
        product: 'Advair HFA',
        indication: 'Asthma Management',
        targetSegments: 3,
        confidence: 0.93
      }
    },
    {
      id: 6,
      name: 'Trelegy_Market_Analysis.pdf',
      type: 'pdf',
      size: '2.7 MB',
      uploadedAt: new Date('2024-11-23T13:30:00'),
      uploadedBy: 'Robert Taylor',
      status: 'pending',
      processingTime: null
    }
  ];

  // Get file icon based on type
  const getFileIcon = (type) => {
    const icons = {
      pdf: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <text x="7" y="18" fontSize="8" fill="currentColor" stroke="none">PDF</text>
        </svg>
      ),
      docx: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <text x="6" y="18" fontSize="8" fill="currentColor" stroke="none">DOC</text>
        </svg>
      ),
      xlsx: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <text x="7" y="18" fontSize="8" fill="currentColor" stroke="none">XLS</text>
        </svg>
      ),
      pptx: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <text x="7" y="18" fontSize="8" fill="currentColor" stroke="none">PPT</text>
        </svg>
      )
    };
    return icons[type] || icons.pdf;
  };

  // Get status badge
  const getStatusBadge = (status, progress = null) => {
    const badges = {
      complete: (
        <span className="status-badge status-complete">
          <span className="status-dot"></span>
          Complete
        </span>
      ),
      processing: (
        <span className="status-badge status-processing">
          <span className="status-dot"></span>
          Processing {progress && `(${progress}%)`}
        </span>
      ),
      failed: (
        <span className="status-badge status-failed">
          <span className="status-dot"></span>
          Failed
        </span>
      ),
      pending: (
        <span className="status-badge status-pending">
          <span className="status-dot"></span>
          Pending
        </span>
      )
    };
    return badges[status];
  };

  // Format date
  const formatDate = (date) => {
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Filter and sort documents
  const filteredDocuments = useMemo(() => {
    let filtered = [...mockDocuments];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(doc => 
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.uploadedBy.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(doc => doc.status === filterStatus);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return b.uploadedAt - a.uploadedAt;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'status':
          return a.status.localeCompare(b.status);
        case 'size':
          return parseFloat(b.size) - parseFloat(a.size);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, filterStatus, sortBy]);

  // Handle document selection
  const handleSelectDocument = (docId) => {
    setSelectedDocuments(prev => 
      prev.includes(docId) 
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    );
  };

  const handleSelectAll = () => {
    if (selectedDocuments.length === filteredDocuments.length) {
      setSelectedDocuments([]);
    } else {
      setSelectedDocuments(filteredDocuments.map(doc => doc.id));
    }
  };

  // Handle bulk actions
  const handleBulkDelete = () => {
    console.log('Deleting documents:', selectedDocuments);
    setSelectedDocuments([]);
  };

  const handleBulkDownload = () => {
    console.log('Downloading documents:', selectedDocuments);
  };

  return (
    <div className="documents-view">
      {/* Header */}
      <div className="documents-header">
        <div className="header-content">
          <h1 className="page-title">Documents</h1>
          <button className="upload-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 5 17 10"/>
              <line x1="12" y1="5" x2="12" y2="15"/>
            </svg>
            Upload Document
          </button>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="controls-bar">
        <div className="search-section">
          <div className="search-box">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="filters-section">
          {/* Status Filter */}
          <div className="filter-chips">
            {['all', 'complete', 'processing', 'failed', 'pending'].map(status => (
              <button
                key={status}
                className={`filter-chip ${filterStatus === status ? 'active' : ''}`}
                onClick={() => setFilterStatus(status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
                {status !== 'all' && (
                  <span className="chip-count">
                    {mockDocuments.filter(d => d.status === status).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <select 
            className="sort-dropdown"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date">Sort by Date</option>
            <option value="name">Sort by Name</option>
            <option value="status">Sort by Status</option>
            <option value="size">Sort by Size</option>
          </select>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedDocuments.length > 0 && (
        <div className="bulk-actions-bar">
          <div className="selection-info">
            <input
              type="checkbox"
              checked={selectedDocuments.length === filteredDocuments.length}
              onChange={handleSelectAll}
              className="checkbox"
            />
            <span>{selectedDocuments.length} selected</span>
          </div>
          <div className="bulk-actions">
            <button className="btn-secondary" onClick={handleBulkDownload}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="5" x2="12" y2="15"/>
              </svg>
              Download
            </button>
            <button className="btn-danger" onClick={handleBulkDelete}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
              Delete
            </button>
          </div>
        </div>
      )}

      {/* Documents List */}
      <div className="documents-list">
        {filteredDocuments.length === 0 ? (
          <div className="empty-state">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.3">
              <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
              <polyline points="13 2 13 9 20 9"/>
            </svg>
            <h3>No documents found</h3>
            <p>Upload your first brand strategy document to get started</p>
            <button className="btn-primary">
              Upload Document
            </button>
          </div>
        ) : (
          <div className="documents-grid">
            {filteredDocuments.map(doc => (
              <div key={doc.id} className="document-card">
                <div className="card-header">
                  <input
                    type="checkbox"
                    checked={selectedDocuments.includes(doc.id)}
                    onChange={() => handleSelectDocument(doc.id)}
                    className="checkbox"
                  />
                  <div className="file-icon">
                    {getFileIcon(doc.type)}
                  </div>
                  <div className="document-info">
                    <h3 className="document-name">{doc.name}</h3>
                    <div className="document-meta">
                      <span className="meta-item">{doc.size}</span>
                      <span className="meta-separator">•</span>
                      <span className="meta-item">Uploaded {formatDate(doc.uploadedAt)}</span>
                      <span className="meta-separator">•</span>
                      <span className="meta-item">by {doc.uploadedBy}</span>
                    </div>
                  </div>
                  {getStatusBadge(doc.status, doc.progress)}
                </div>

                {doc.status === 'processing' && (
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${doc.progress}%` }}></div>
                  </div>
                )}

                {doc.status === 'complete' && doc.extractedData && (
                  <div className="extracted-info">
                    <div className="info-row">
                      <span className="info-label">Product:</span>
                      <span className="info-value">{doc.extractedData.product}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Confidence:</span>
                      <span className="confidence-score" style={{
                        color: doc.extractedData.confidence > 0.9 ? '#10B981' : 
                               doc.extractedData.confidence > 0.7 ? '#F59E0B' : '#EF4444'
                      }}>
                        {(doc.extractedData.confidence * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                )}

                {doc.status === 'failed' && (
                  <div className="error-message">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" y1="8" x2="12" y2="12"/>
                      <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    {doc.error}
                  </div>
                )}

                <div className="card-actions">
                  {doc.status === 'complete' && (
                    <>
                      <button className="action-btn">
                        View Results
                      </button>
                      <button className="action-btn secondary">
                        Download
                      </button>
                    </>
                  )}
                  {doc.status === 'failed' && (
                    <button className="action-btn retry">
                      Retry Processing
                    </button>
                  )}
                  {doc.status === 'pending' && (
                    <button className="action-btn">
                      Start Processing
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentsView;