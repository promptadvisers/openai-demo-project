import React, { useState, useMemo, useEffect } from 'react';

const DocumentsView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [processingProgress, setProcessingProgress] = useState({});
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);

  // Mock documents data
  const mockDocuments = [
    {
      id: 1,
      name: 'Shingrix_Brand_Strategy_Q4_2024.pdf',
      type: 'pdf',
      size: '2.4 MB',
      uploadedAt: new Date('2024-11-28T10:30:00'),
      uploadedBy: 'Sarah Johnson',
      status: 'complete',
      extractedData: {
        product: 'Shingrix',
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
      extractedData: {
        product: 'Multiple Products',
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
      error: 'File format not supported for data extraction'
    },
    {
      id: 5,
      name: 'Advair_HFA_Strategy_2024.pdf',
      type: 'pdf',
      size: '3.1 MB',
      uploadedAt: new Date('2024-11-24T11:00:00'),
      uploadedBy: 'Lisa Anderson',
      status: 'complete',
      extractedData: {
        product: 'Advair HFA',
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
      status: 'pending'
    }
  ];

  // Effect to animate processing progress
  useEffect(() => {
    const processingDocs = mockDocuments.filter(doc => doc.status === 'processing');
    
    processingDocs.forEach(doc => {
      if (!processingProgress[doc.id]) {
        // Initialize progress
        setProcessingProgress(prev => ({
          ...prev,
          [doc.id]: doc.progress || 65
        }));
        
        // Animate progress to 100%
        const interval = setInterval(() => {
          setProcessingProgress(prev => {
            const currentProgress = prev[doc.id] || 65;
            if (currentProgress >= 100) {
              clearInterval(interval);
              // Update document status after completion
              setTimeout(() => {
                doc.status = 'complete';
                doc.extractedData = {
                  product: 'Market Research Analysis',
                  confidence: 0.89
                };
              }, 500);
              return prev;
            }
            // Increment progress (faster as it gets closer to 100)
            const increment = currentProgress < 90 ? 2 : 0.5;
            return {
              ...prev,
              [doc.id]: Math.min(100, currentProgress + increment)
            };
          });
        }, 100);
        
        // Cleanup
        return () => clearInterval(interval);
      }
    });
  }, []);

  // Filter and sort documents
  const filteredDocuments = useMemo(() => {
    let filtered = [...mockDocuments];

    if (searchQuery) {
      filtered = filtered.filter(doc => 
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.uploadedBy.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(doc => doc.status === filterStatus);
    }

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

  // Format date
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Handle selection
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

  // Handle View Results
  const handleViewResults = (doc) => {
    setSelectedResult({
      ...doc,
      extractedData: doc.extractedData || {
        product: 'Unknown Product',
        confidence: 0
      },
      insights: {
        keyFindings: [
          'Market share increased by 15% in Q4 2024',
          'Customer satisfaction score improved to 4.7/5',
          'Brand awareness reached 78% in target demographic',
          'Digital engagement up 45% year-over-year'
        ],
        recommendations: [
          'Increase digital marketing spend by 20%',
          'Focus on patient education initiatives',
          'Expand into adjacent therapeutic areas',
          'Strengthen partnerships with healthcare providers'
        ],
        metrics: {
          roi: '3.2x',
          reach: '2.5M',
          engagement: '12.8%',
          conversion: '4.2%'
        }
      }
    });
    setShowResultsModal(true);
  };

  // Styles
  const styles = {
    container: {
      padding: '2.5rem',
      background: 'linear-gradient(135deg, #2A2D35 0%, #1E2025 100%)',
      minHeight: '100vh',
      width: '100%',
      boxSizing: 'border-box',
      overflowX: 'hidden'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '3rem',
      paddingBottom: '1.5rem',
      borderBottom: '1px solid rgba(74, 144, 226, 0.1)'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: '700',
      color: '#FFFFFF',
      margin: 0,
      background: 'linear-gradient(135deg, #FFFFFF 0%, #E0E7FF 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      letterSpacing: '-0.02em'
    },
    uploadBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.875rem 1.75rem',
      background: 'linear-gradient(135deg, #4A90E2 0%, #357ABD 100%)',
      border: 'none',
      borderRadius: '12px',
      color: 'white',
      fontWeight: '600',
      cursor: 'pointer',
      fontSize: '0.95rem',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 4px 15px rgba(74, 144, 226, 0.3)',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 25px rgba(74, 144, 226, 0.4)'
      }
    },
    controls: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
      gap: '1.5rem',
      flexWrap: 'wrap',
      padding: '1.5rem',
      background: 'rgba(30, 32, 37, 0.5)',
      borderRadius: '12px',
      backdropFilter: 'blur(10px)'
    },
    searchBox: {
      position: 'relative',
      flex: '1',
      maxWidth: '450px'
    },
    searchInput: {
      width: '100%',
      padding: '0.75rem 1rem 0.75rem 3rem',
      background: 'rgba(26, 29, 35, 0.8)',
      border: '1px solid rgba(74, 144, 226, 0.2)',
      borderRadius: '10px',
      color: '#FFFFFF',
      fontSize: '0.9rem',
      boxSizing: 'border-box',
      transition: 'all 0.3s ease',
      '&:focus': {
        borderColor: '#4A90E2',
        boxShadow: '0 0 0 3px rgba(74, 144, 226, 0.1)'
      }
    },
    searchIcon: {
      position: 'absolute',
      left: '1rem',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#9CA3AF'
    },
    filters: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    filterChips: {
      display: 'flex',
      gap: '0.5rem'
    },
    filterChip: {
      padding: '0.5rem 1rem',
      background: 'rgba(26, 29, 35, 0.8)',
      border: '1px solid rgba(74, 144, 226, 0.2)',
      borderRadius: '24px',
      color: '#9CA3AF',
      fontSize: '0.85rem',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'all 0.3s ease',
      fontWeight: '500',
      '&:hover': {
        borderColor: '#4A90E2',
        color: '#4A90E2'
      }
    },
    filterChipActive: {
      background: 'linear-gradient(135deg, #4A90E2 0%, #357ABD 100%)',
      borderColor: 'transparent',
      color: 'white',
      boxShadow: '0 2px 8px rgba(74, 144, 226, 0.3)'
    },
    sortDropdown: {
      padding: '0.5rem 1rem',
      background: 'rgba(26, 29, 35, 0.8)',
      border: '1px solid rgba(74, 144, 226, 0.2)',
      borderRadius: '10px',
      color: '#FFFFFF',
      fontSize: '0.85rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      '&:focus': {
        borderColor: '#4A90E2',
        outline: 'none'
      }
    },
    bulkActions: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem',
      background: '#1A1D23',
      borderRadius: '8px',
      marginBottom: '1rem'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
      gap: '1.5rem',
      width: '100%',
      paddingBottom: '2rem'
    },
    card: {
      background: 'linear-gradient(135deg, #1E2025 0%, #1A1D23 100%)',
      border: '1px solid rgba(74, 144, 226, 0.1)',
      borderRadius: '16px',
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '240px',
      position: 'relative',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 12px 24px rgba(74, 144, 226, 0.15)',
        borderColor: 'rgba(74, 144, 226, 0.3)'
      }
    },
    cardHeader: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.75rem',
      marginBottom: '1rem'
    },
    checkbox: {
      width: '18px',
      height: '18px',
      cursor: 'pointer',
      flexShrink: 0
    },
    fileIcon: {
      color: '#4A90E2',
      flexShrink: 0
    },
    documentInfo: {
      flex: 1,
      minWidth: 0
    },
    documentName: {
      fontSize: '0.9rem',
      fontWeight: '600',
      color: '#FFFFFF',
      margin: '0 0 0.375rem 0',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical'
    },
    documentMeta: {
      fontSize: '0.7rem',
      color: '#9CA3AF',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.25rem',
      alignItems: 'center'
    },
    statusBadge: {
      position: 'absolute',
      top: '1.25rem',
      right: '1.25rem',
      padding: '0.25rem 0.5rem',
      borderRadius: '4px',
      fontSize: '0.65rem',
      fontWeight: '600',
      textTransform: 'uppercase',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.25rem'
    },
    statusComplete: {
      background: 'rgba(16, 185, 129, 0.15)',
      color: '#10B981'
    },
    statusProcessing: {
      background: 'rgba(74, 144, 226, 0.15)',
      color: '#4A90E2'
    },
    statusFailed: {
      background: 'rgba(239, 68, 68, 0.15)',
      color: '#EF4444'
    },
    statusPending: {
      background: 'rgba(156, 163, 175, 0.15)',
      color: '#9CA3AF'
    },
    extractedInfo: {
      background: 'rgba(26, 29, 35, 0.5)',
      border: '1px solid #374151',
      borderRadius: '6px',
      padding: '0.625rem',
      margin: '0.75rem 0'
    },
    infoRow: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '0.75rem',
      marginBottom: '0.375rem'
    },
    errorMessage: {
      padding: '0.625rem',
      background: 'rgba(239, 68, 68, 0.1)',
      border: '1px solid rgba(239, 68, 68, 0.2)',
      borderRadius: '6px',
      color: '#EF4444',
      fontSize: '0.75rem',
      margin: '0.75rem 0',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    progressBar: {
      height: '6px',
      background: 'rgba(55, 65, 81, 0.5)',
      borderRadius: '3px',
      overflow: 'hidden',
      margin: '1.5rem auto',
      width: '80%',
      position: 'relative'
    },
    progressFill: {
      height: '100%',
      background: 'linear-gradient(90deg, #4A90E2, #10B981)',
      transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      borderRadius: '3px',
      boxShadow: '0 0 10px rgba(74, 144, 226, 0.5)'
    },
    progressContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem 0',
      marginTop: 'auto',
      marginBottom: 'auto'
    },
    progressText: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#4A90E2',
      marginBottom: '0.5rem',
      fontFamily: 'monospace'
    },
    progressLabel: {
      fontSize: '0.75rem',
      color: '#9CA3AF',
      marginTop: '0.5rem',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    cardActions: {
      display: 'flex',
      gap: '0.5rem',
      marginTop: 'auto',
      paddingTop: '0.75rem'
    },
    actionBtn: {
      flex: 1,
      padding: '0.5rem 0.75rem',
      background: '#4A90E2',
      border: 'none',
      borderRadius: '6px',
      color: 'white',
      fontSize: '0.8rem',
      fontWeight: '500',
      cursor: 'pointer',
      textAlign: 'center'
    },
    actionBtnSecondary: {
      background: 'transparent',
      border: '1px solid #374151',
      color: '#9CA3AF'
    },
    actionBtnRetry: {
      background: 'rgba(245, 158, 11, 0.1)',
      border: '1px solid #F59E0B',
      color: '#F59E0B'
    },
    emptyState: {
      textAlign: 'center',
      padding: '4rem 2rem'
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'complete': return styles.statusComplete;
      case 'processing': return styles.statusProcessing;
      case 'failed': return styles.statusFailed;
      case 'pending': return styles.statusPending;
      default: return {};
    }
  };

  // Add responsive styles based on window width
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  
  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Adjust styles based on screen size
  const responsiveContainer = {
    ...styles.container,
    ...(windowWidth <= 1024 ? { 
      padding: '1.5rem'
    } : {}),
    ...(windowWidth <= 768 ? { 
      padding: '1rem'
    } : {})
  };

  const responsiveGrid = {
    ...styles.grid,
    ...(windowWidth >= 1800 ? { 
      gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))'
    } : {}),
    ...(windowWidth <= 1400 ? { 
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))'
    } : {}),
    ...(windowWidth <= 1024 ? { 
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '1.25rem'
    } : {}),
    ...(windowWidth <= 768 ? { 
      gridTemplateColumns: '1fr',
      gap: '1rem'
    } : {})
  };

  return (
    <div style={responsiveContainer}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Documents</h1>
        <button style={styles.uploadBtn}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 5 17 10"/>
            <line x1="12" y1="5" x2="12" y2="15"/>
          </svg>
          Upload Document
        </button>
      </div>

      {/* Controls */}
      <div style={styles.controls}>
        <div style={styles.searchBox}>
          <svg style={styles.searchIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        <div style={styles.filters}>
          <div style={styles.filterChips}>
            {['all', 'complete', 'processing', 'failed', 'pending'].map(status => (
              <button
                key={status}
                style={{
                  ...styles.filterChip,
                  ...(filterStatus === status ? styles.filterChipActive : {})
                }}
                onClick={() => setFilterStatus(status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
                {status !== 'all' && (
                  <span style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    padding: '0.125rem 0.375rem',
                    borderRadius: '10px',
                    fontSize: '0.7rem'
                  }}>
                    {mockDocuments.filter(d => d.status === status).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          <select 
            style={styles.sortDropdown}
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

      {/* Bulk Actions */}
      {selectedDocuments.length > 0 && (
        <div style={styles.bulkActions}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#9CA3AF' }}>
            <input
              type="checkbox"
              checked={selectedDocuments.length === filteredDocuments.length}
              onChange={handleSelectAll}
              style={styles.checkbox}
            />
            <span>{selectedDocuments.length} selected</span>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button style={{ ...styles.actionBtn, ...styles.actionBtnSecondary }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '0.25rem' }}>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="5" x2="12" y2="15"/>
              </svg>
              Download
            </button>
            <button style={{ ...styles.actionBtn, background: 'transparent', border: '1px solid #EF4444', color: '#EF4444' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '0.25rem' }}>
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
              Delete
            </button>
          </div>
        </div>
      )}

      {/* Documents Grid */}
      {filteredDocuments.length === 0 ? (
        <div style={styles.emptyState}>
          <h3 style={{ color: '#FFFFFF', marginBottom: '0.5rem' }}>No documents found</h3>
          <p style={{ color: '#9CA3AF', marginBottom: '2rem' }}>Upload your first brand strategy document to get started</p>
          <button style={styles.uploadBtn}>Upload Document</button>
        </div>
      ) : (
        <div style={responsiveGrid}>
          {filteredDocuments.map(doc => (
            <div key={doc.id} style={styles.card}>
              <div style={styles.cardHeader}>
                <input
                  type="checkbox"
                  checked={selectedDocuments.includes(doc.id)}
                  onChange={() => handleSelectDocument(doc.id)}
                  style={styles.checkbox}
                />
                <div style={styles.fileIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                  </svg>
                </div>
                <div style={styles.documentInfo}>
                  <h3 style={styles.documentName}>{doc.name}</h3>
                  <div style={styles.documentMeta}>
                    <span>{doc.size}</span>
                    <span style={{ margin: '0 0.25rem' }}>•</span>
                    <span>Uploaded {formatDate(doc.uploadedAt)}</span>
                    <span style={{ margin: '0 0.25rem' }}>•</span>
                    <span>by {doc.uploadedBy}</span>
                  </div>
                </div>
                <span style={{ ...styles.statusBadge, ...getStatusStyle(doc.status) }}>
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'currentColor' }}></span>
                  {doc.status === 'processing' ? `Processing (${Math.round(processingProgress[doc.id] || doc.progress || 0)}%)` : doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                </span>
              </div>

              {doc.status === 'processing' && (
                <div style={styles.progressContainer}>
                  <div style={styles.progressText}>
                    {Math.round(processingProgress[doc.id] || doc.progress || 0)}%
                  </div>
                  <div style={styles.progressBar}>
                    <div style={{ 
                      ...styles.progressFill, 
                      width: `${processingProgress[doc.id] || doc.progress || 0}%` 
                    }}></div>
                  </div>
                  <div style={styles.progressLabel}>Processing Document...</div>
                </div>
              )}

              {doc.status === 'complete' && doc.extractedData && (
                <div style={styles.extractedInfo}>
                  <div style={styles.infoRow}>
                    <span style={{ color: '#9CA3AF' }}>Product:</span>
                    <span style={{ color: '#FFFFFF' }}>{doc.extractedData.product}</span>
                  </div>
                  <div style={{ ...styles.infoRow, marginBottom: 0 }}>
                    <span style={{ color: '#9CA3AF' }}>Confidence:</span>
                    <span style={{ 
                      color: doc.extractedData.confidence > 0.9 ? '#10B981' : '#F59E0B',
                      fontWeight: '600'
                    }}>
                      {(doc.extractedData.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              )}

              {doc.status === 'failed' && (
                <div style={styles.errorMessage}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  {doc.error}
                </div>
              )}

              <div style={styles.cardActions}>
                {doc.status === 'complete' && (
                  <>
                    <button 
                      style={styles.actionBtn}
                      onClick={() => handleViewResults(doc)}
                    >
                      View Results
                    </button>
                    <button style={{ ...styles.actionBtn, ...styles.actionBtnSecondary }}>Download</button>
                  </>
                )}
                {doc.status === 'failed' && (
                  <button style={{ ...styles.actionBtn, ...styles.actionBtnRetry }}>Retry Processing</button>
                )}
                {doc.status === 'pending' && (
                  <button style={styles.actionBtn}>Start Processing</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Results Modal */}
      {showResultsModal && selectedResult && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(5px)'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #2A2D35 0%, #1E2025 100%)',
            borderRadius: '16px',
            width: '90%',
            maxWidth: '900px',
            maxHeight: '90vh',
            overflow: 'auto',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(74, 144, 226, 0.2)'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '2rem',
              borderBottom: '1px solid rgba(74, 144, 226, 0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h2 style={{ 
                  color: '#FFFFFF', 
                  fontSize: '1.75rem', 
                  margin: 0,
                  marginBottom: '0.5rem'
                }}>
                  Extracted Insights
                </h2>
                <p style={{ color: '#9CA3AF', margin: 0, fontSize: '0.9rem' }}>
                  {selectedResult.name}
                </p>
              </div>
              <button
                onClick={() => setShowResultsModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#9CA3AF',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  padding: '0.5rem',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease'
                }}
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div style={{ padding: '2rem' }}>
              {/* Product Info Section */}
              <div style={{
                background: 'rgba(74, 144, 226, 0.1)',
                border: '1px solid rgba(74, 144, 226, 0.2)',
                borderRadius: '12px',
                padding: '1.5rem',
                marginBottom: '2rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ color: '#4A90E2', margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>
                      {selectedResult.extractedData.product}
                    </h3>
                    <p style={{ color: '#9CA3AF', margin: 0, fontSize: '0.875rem' }}>
                      Extracted with {(selectedResult.extractedData.confidence * 100).toFixed(0)}% confidence
                    </p>
                  </div>
                  <div style={{
                    background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    fontWeight: '600',
                    fontSize: '0.875rem'
                  }}>
                    AI Validated
                  </div>
                </div>
              </div>

              {/* Key Metrics */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                {Object.entries(selectedResult.insights?.metrics || {}).map(([key, value]) => (
                  <div key={key} style={{
                    background: 'rgba(30, 32, 37, 0.5)',
                    border: '1px solid rgba(55, 65, 81, 0.5)',
                    borderRadius: '12px',
                    padding: '1.25rem',
                    textAlign: 'center'
                  }}>
                    <div style={{ 
                      color: '#4A90E2', 
                      fontSize: '1.5rem', 
                      fontWeight: '700',
                      marginBottom: '0.25rem' 
                    }}>
                      {value}
                    </div>
                    <div style={{ 
                      color: '#9CA3AF', 
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      {key}
                    </div>
                  </div>
                ))}
              </div>

              {/* Key Findings */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ 
                  color: '#FFFFFF', 
                  fontSize: '1.125rem', 
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span style={{ color: '#10B981' }}>✓</span> Key Findings
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {selectedResult.insights?.keyFindings?.map((finding, index) => (
                    <div key={index} style={{
                      background: 'rgba(16, 185, 129, 0.05)',
                      border: '1px solid rgba(16, 185, 129, 0.2)',
                      borderRadius: '8px',
                      padding: '1rem',
                      color: '#D1D5DB',
                      fontSize: '0.9rem',
                      lineHeight: '1.5'
                    }}>
                      {finding}
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ 
                  color: '#FFFFFF', 
                  fontSize: '1.125rem', 
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span style={{ color: '#F59E0B' }}>💡</span> Recommendations
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {selectedResult.insights?.recommendations?.map((rec, index) => (
                    <div key={index} style={{
                      background: 'rgba(245, 158, 11, 0.05)',
                      border: '1px solid rgba(245, 158, 11, 0.2)',
                      borderRadius: '8px',
                      padding: '1rem',
                      color: '#D1D5DB',
                      fontSize: '0.9rem',
                      lineHeight: '1.5',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem'
                    }}>
                      <span style={{ color: '#F59E0B', flexShrink: 0 }}>→</span>
                      {rec}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{
              padding: '1.5rem 2rem',
              borderTop: '1px solid rgba(74, 144, 226, 0.1)',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '1rem'
            }}>
              <button
                onClick={() => setShowResultsModal(false)}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'transparent',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#9CA3AF',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                Close
              </button>
              <button
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'linear-gradient(135deg, #4A90E2 0%, #357ABD 100%)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(74, 144, 226, 0.3)'
                }}
              >
                Export Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentsView;