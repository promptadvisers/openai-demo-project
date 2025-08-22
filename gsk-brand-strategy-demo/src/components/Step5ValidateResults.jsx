import React, { useState, useEffect } from 'react';
import WorkflowStepIndicator from './WorkflowStepIndicator';
import ClientApprovalModal from './ClientApprovalModal';
import { MOCK_DATA } from '../data/mockData';
import { USER_ROLES } from '../utils/permissions';

const Step5ValidateResults = ({ 
  isOpen,
  onClose,
  projectData, 
  onReturnToUpload,
  onBackToStep4,
  onContinueToStep6,
  userRole = 'BA',
  approvalStates,
  onApprovalRequest,
  onApprovalUpdate
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedSegment, setSelectedSegment] = useState(MOCK_DATA.segments[0].id);
  const [showIterateModal, setShowIterateModal] = useState(false);
  const [fixingOverlap, setFixingOverlap] = useState(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [approvalRequested, setApprovalRequested] = useState(false);

  // Mock simulation results data
  const simulationResults = {
    totalHCPs: 6000,
    targetedHCPs: 4250,
    overlapDetected: 312,
    efficiencyScore: 87.3,
    confidenceLevel: 95.2,
    iterations: 10000,
    
    overlapAnalysis: [
      { 
        segment1: 'HZ Champions', 
        segment2: 'Rising Stars', 
        overlap: 45, 
        impact: 'Medium',
        recommendation: 'Adjust frequency cadence to reduce overlap by 28%'
      },
      { 
        segment1: 'Primary Care', 
        segment2: 'Specialists', 
        overlap: 12, 
        impact: 'Low',
        recommendation: 'Current configuration optimal'
      },
      { 
        segment1: 'HZ Champions', 
        segment2: 'Specialists', 
        overlap: 23, 
        impact: 'Low',
        recommendation: 'Consider specialized content for KOL overlap'
      }
    ],

    performanceMetrics: {
      reach: { current: 4250, projected: 6350, lift: '+49%' },
      engagement: { current: 23.5, projected: 31.7, lift: '+34%' },
      prescriptions: { current: 12400, projected: 14632, lift: '+18%' },
      roi: { current: 2.8, projected: 4.2, lift: '+50%' }
    },

    segmentPerformance: MOCK_DATA.segments.map(segment => ({
      ...segment,
      currentReach: Math.floor(Math.random() * 1000) + 500,
      projectedReach: Math.floor(Math.random() * 1500) + 800,
      engagementRate: (Math.random() * 20 + 15).toFixed(1),
      conversionRate: (Math.random() * 8 + 5).toFixed(1),
      costEfficiency: (Math.random() * 3 + 2).toFixed(1)
    }))
  };

  const [showIterationOptions, setShowIterationOptions] = useState(false);
  
  const handleContinue = () => {
    // If user is BA and approval not yet requested, request it
    if (userRole === USER_ROLES.BA && !approvalRequested && approvalStates?.step5?.status !== 'approved') {
      setApprovalRequested(true);
      setShowApprovalModal(true);
      if (onApprovalRequest) {
        onApprovalRequest(5, simulationResults);
      }
      return;
    }
    
    // If client or already approved, proceed
    if (userRole === USER_ROLES.CLIENT || approvalStates?.step5?.status === 'approved') {
      onContinueToStep6();
    }
  };
  
  const handleApprovalComplete = (approval) => {
    setShowApprovalModal(false);
    if (onApprovalUpdate) {
      onApprovalUpdate('step5', { status: 'approved', ...approval });
    }
    // Auto-proceed after approval
    onContinueToStep6();
  };
  
  const handleChangesRequested = (changeRequest) => {
    setShowApprovalModal(false);
    setApprovalRequested(false);
    if (onApprovalUpdate) {
      onApprovalUpdate('step5', { status: 'changes_requested', ...changeRequest });
    }
    alert(`Changes requested: ${changeRequest.feedback}\nPlease return to Step 3 to adjust configuration.`);
  };

  const handleIterateConfiguration = () => {
    setShowIterateModal(true);
  };

  const handleApplyFix = async (overlapIndex) => {
    setFixingOverlap(overlapIndex);
    // Simulate fix processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    alert(`Fix applied successfully for ${simulationResults.overlapAnalysis[overlapIndex].segment1} and ${simulationResults.overlapAnalysis[overlapIndex].segment2} overlap!`);
    setFixingOverlap(null);
  };

  const renderOverviewTab = () => (
    <div className="results-overview">
      <div className="results-grid">
        {/* Key Performance Indicators */}
        <div className="document-card kpi-card">
          <h3>Key Performance Indicators</h3>
          <div className="kpi-grid">
            <div className="kpi-item">
              <div className="kpi-icon success">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <div className="kpi-content">
                <div className="kpi-value">{simulationResults.performanceMetrics.reach.projected.toLocaleString()}</div>
                <div className="kpi-label">Total HCP Reach</div>
                <div className="kpi-change positive">{simulationResults.performanceMetrics.reach.lift}</div>
              </div>
            </div>

            <div className="kpi-item">
              <div className="kpi-icon success">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 3h18l-2 13H5L3 3z"/>
                  <path d="M9 9h6v6H9z"/>
                </svg>
              </div>
              <div className="kpi-content">
                <div className="kpi-value">{simulationResults.performanceMetrics.engagement.projected}%</div>
                <div className="kpi-label">Engagement Rate</div>
                <div className="kpi-change positive">{simulationResults.performanceMetrics.engagement.lift}</div>
              </div>
            </div>

            <div className="kpi-item">
              <div className="kpi-icon success">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l3 9a5.002 5.002 0 01-6.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16l-3-9"/>
                </svg>
              </div>
              <div className="kpi-content">
                <div className="kpi-value">{simulationResults.performanceMetrics.prescriptions.projected.toLocaleString()}</div>
                <div className="kpi-label">Monthly Prescriptions</div>
                <div className="kpi-change positive">{simulationResults.performanceMetrics.prescriptions.lift}</div>
              </div>
            </div>

            <div className="kpi-item">
              <div className="kpi-icon success">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="1" x2="12" y2="23"/>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>
              <div className="kpi-content">
                <div className="kpi-value">{simulationResults.performanceMetrics.roi.projected}x</div>
                <div className="kpi-label">Projected ROI</div>
                <div className="kpi-change positive">{simulationResults.performanceMetrics.roi.lift}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Simulation Confidence */}
        <div className="document-card confidence-card">
          <h3>Simulation Confidence</h3>
          <div className="confidence-content">
            <div className="confidence-score">
              <div className="score-circle">
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <circle 
                    cx="60" 
                    cy="60" 
                    r="50" 
                    fill="none" 
                    stroke="#374151" 
                    strokeWidth="8"
                  />
                  <circle 
                    cx="60" 
                    cy="60" 
                    r="50" 
                    fill="none" 
                    stroke="#4A90E2" 
                    strokeWidth="8"
                    strokeDasharray={`${simulationResults.confidenceLevel * 3.14} 314`}
                    strokeLinecap="round"
                    transform="rotate(-90 60 60)"
                  />
                  <text x="60" y="65" textAnchor="middle" className="score-text">
                    {simulationResults.confidenceLevel}%
                  </text>
                </svg>
              </div>
              <div className="confidence-details">
                <div className="confidence-item">
                  <span className="confidence-label">Iterations:</span>
                  <span className="confidence-value">{simulationResults.iterations.toLocaleString()}</span>
                </div>
                <div className="confidence-item">
                  <span className="confidence-label">Efficiency Score:</span>
                  <span className="confidence-value">{simulationResults.efficiencyScore}/100</span>
                </div>
                <div className="confidence-item">
                  <span className="confidence-label">Model Accuracy:</span>
                  <span className="confidence-value">94.7%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOverlapAnalysisTab = () => (
    <div className="overlap-analysis">
      <div className="analysis-header">
        <h3>Audience Overlap Analysis</h3>
        <p>Identifying potential conflicts and optimization opportunities across HCP segments</p>
      </div>

      <div className="overlap-summary">
        <div className="summary-stats">
          <div className="stat-item">
            <div className="stat-value">{simulationResults.overlapDetected}</div>
            <div className="stat-label">HCPs with Overlap</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">5.2%</div>
            <div className="stat-label">Total Overlap Rate</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">Medium</div>
            <div className="stat-label">Impact Level</div>
          </div>
        </div>
      </div>

      <div className="overlap-details">
        <div className="document-card overlap-table-card">
          <div className="overlap-table">
            <div className="table-header">
              <div className="table-cell">Segment Overlap</div>
              <div className="table-cell">HCP Count</div>
              <div className="table-cell">Impact</div>
              <div className="table-cell">Recommendation</div>
              <div className="table-cell">Action</div>
            </div>
            
            {simulationResults.overlapAnalysis.map((overlap, index) => (
              <div key={index} className="table-row">
                <div className="table-cell">
                  <div className="overlap-segments">
                    <span className="segment-name">{overlap.segment1}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="3"/>
                      <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24"/>
                    </svg>
                    <span className="segment-name">{overlap.segment2}</span>
                  </div>
                </div>
                <div className="table-cell">
                  <span className="overlap-count">{overlap.overlap} HCPs</span>
                </div>
                <div className="table-cell">
                  <span className={`impact-badge ${overlap.impact.toLowerCase()}`}>
                    {overlap.impact}
                  </span>
                </div>
                <div className="table-cell">
                  <span className="recommendation-text">{overlap.recommendation}</span>
                </div>
                <div className="table-cell">
                  <button 
                    className="btn btn-sm btn-secondary" 
                    onClick={() => handleApplyFix(index)}
                    disabled={fixingOverlap === index}
                  >
                    {fixingOverlap === index ? 'Applying...' : 'Apply Fix'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSegmentPerformanceTab = () => (
    <div className="segment-performance">
      <div className="performance-header">
        <h3>Segment Performance Analysis</h3>
        <div className="segment-selector">
          <select 
            value={selectedSegment} 
            onChange={(e) => setSelectedSegment(parseInt(e.target.value))}
            className="form-select"
          >
            <option value="">All Segments</option>
            {MOCK_DATA.segments.map(segment => (
              <option key={segment.id} value={segment.id}>{segment.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="performance-grid">
        {simulationResults.segmentPerformance
          .filter(segment => !selectedSegment || segment.id === selectedSegment)
          .map((segment) => (
            <div key={segment.id} className="document-card segment-card">
              <div className="segment-header">
                <h4>{segment.name}</h4>
                <div className="segment-percentage">{segment.percentage}%</div>
              </div>
              
              <div className="segment-metrics">
                <div className="metric-item">
                  <div className="metric-label">Current Reach</div>
                  <div className="metric-value">{segment.currentReach.toLocaleString()} HCPs</div>
                </div>
                <div className="metric-item">
                  <div className="metric-label">Projected Reach</div>
                  <div className="metric-value">{segment.projectedReach.toLocaleString()} HCPs</div>
                  <div className="metric-change positive">+{Math.floor((segment.projectedReach - segment.currentReach) / segment.currentReach * 100)}%</div>
                </div>
                <div className="metric-item">
                  <div className="metric-label">Engagement Rate</div>
                  <div className="metric-value">{segment.engagementRate}%</div>
                </div>
                <div className="metric-item">
                  <div className="metric-label">Conversion Rate</div>
                  <div className="metric-value">{segment.conversionRate}%</div>
                </div>
                <div className="metric-item">
                  <div className="metric-label">Cost Efficiency</div>
                  <div className="metric-value">${segment.costEfficiency}/HCP</div>
                </div>
              </div>

              <div className="segment-actions">
                <div className="segment-frequency">
                  <span className="frequency-label">Target Frequency:</span>
                  <span className="frequency-value">{segment.frequency}</span>
                </div>
                <button className="btn btn-sm btn-secondary">
                  Optimize Segment
                </button>
              </div>
            </div>
        ))}
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="modal-content workflow-modal step5-validate" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Step 5: Validate Results</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          {/* Workflow Step Indicator - Horizontal Timeline */}
          <WorkflowStepIndicator currentStep={5} userRole={userRole} variant="horizontal" />
          
          <div className="step-content">
            <div className="step-description">
              <h3>Validate Results</h3>
              <p>Review simulation results, analyze overlap patterns, and validate performance projections</p>
              
              {/* Approval Status Indicator */}
              {approvalStates?.step5?.status === 'approved' && (
                <div style={{
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.05))',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '12px',
                  padding: '1rem 1.25rem',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#10B981">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  <div>
                    <div style={{ fontWeight: '600', color: '#10B981', marginBottom: '0.125rem' }}>Client Approval Granted</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      Results approved by {approvalStates.step5.approvedBy || 'Client'} at {approvalStates.step5.approvedAt ? new Date(approvalStates.step5.approvedAt).toLocaleString() : 'recently'}
                    </div>
                  </div>
                </div>
              )}
              
              {approvalStates?.step5?.status === 'changes_requested' && (
                <div style={{
                  background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.05))',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '12px',
                  padding: '1rem 1.25rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#EF4444">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                    </svg>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '600', color: '#EF4444', marginBottom: '0.125rem' }}>Changes Requested</div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                        {approvalStates.step5.feedback || 'Client has requested changes to the simulation configuration.'}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="results-actions">
                <button className="btn btn-secondary" onClick={() => setShowIterationOptions(!showIterationOptions)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 4h22M1 10h22M1 16h22"/>
                  </svg>
                  Iterate Configuration
                </button>
              </div>
            </div>

            {/* Iteration Options Dropdown */}
            {showIterationOptions && (
              <div className="iteration-options">
                <div className="document-card iteration-card">
                  <h4>Configuration Iteration Options</h4>
                  <div className="iteration-buttons">
                    <button className="btn btn-secondary" onClick={onBackToStep4}>
                      Re-run Simulation
                    </button>
                    <button className="btn btn-secondary" onClick={() => { setShowIterationOptions(false); setShowIterateModal(true); }}>
                      Modify Configuration
                    </button>
                    <button className="btn btn-secondary" onClick={() => setShowIterationOptions(false)}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Results Tabs */}
            <div className="results-tabs">
              <div className="tab-navigation">
                <button 
                  className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
                  Overview
                </button>
                <button 
                  className={`tab-button ${activeTab === 'overlap' ? 'active' : ''}`}
                  onClick={() => setActiveTab('overlap')}
                >
                  Overlap Analysis
                </button>
                <button 
                  className={`tab-button ${activeTab === 'segments' ? 'active' : ''}`}
                  onClick={() => setActiveTab('segments')}
                >
                  Segment Performance
                </button>
              </div>

              <div className="tab-content">
                {activeTab === 'overview' && renderOverviewTab()}
                {activeTab === 'overlap' && renderOverlapAnalysisTab()}
                {activeTab === 'segments' && renderSegmentPerformanceTab()}
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <div className="footer-actions">
            <button className="btn btn-secondary" onClick={onReturnToUpload}>
              Return to Upload
            </button>
            <div className="footer-actions-right">
              <button className="btn btn-secondary" onClick={onBackToStep4}>
                Back to Simulations
              </button>
              <button className="btn btn-primary" onClick={handleContinue}>
                {(() => {
                  if (userRole === USER_ROLES.CLIENT) {
                    return 'Proceed to Deployment';
                  }
                  if (approvalRequested && approvalStates?.step5?.status !== 'approved') {
                    return 'Awaiting Client Approval...';
                  }
                  if (approvalStates?.step5?.status === 'approved') {
                    return 'Deploy Template';
                  }
                  return 'Request Client Approval';
                })()}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Iterate Configuration Modal */}
        {showIterateModal && (
          <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1001 }}>
            <div className="modal-content" style={{ background: 'var(--card-bg)', padding: '2rem', borderRadius: '12px', maxWidth: '500px', width: '90%', border: '1px solid var(--border-color)' }}>
              <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Configuration Iteration</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                In a real scenario, this would allow you to modify segment targeting, frequency settings, or overlap thresholds and re-run the simulation with updated parameters.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button className="btn btn-secondary" onClick={() => setShowIterateModal(false)}>
                  Close
                </button>
                <button className="btn btn-primary" onClick={() => { setShowIterateModal(false); onBackToStep4(); }}>
                  Back to Configuration
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Client Approval Modal */}
        <ClientApprovalModal
          isOpen={showApprovalModal}
          onClose={() => setShowApprovalModal(false)}
          step={5}
          data={simulationResults}
          onApprove={handleApprovalComplete}
          onRequestChanges={handleChangesRequested}
          isReadOnly={userRole === USER_ROLES.BA}
        />
      </div>
    </div>
  );
};

export default Step5ValidateResults;