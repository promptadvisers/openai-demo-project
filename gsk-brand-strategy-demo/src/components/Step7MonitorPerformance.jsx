import React, { useState, useEffect } from 'react';
import WorkflowStepIndicator from './WorkflowStepIndicator';
import { MOCK_DATA } from '../data/mockData';

const Step7MonitorPerformance = ({ 
  isOpen,
  onClose,
  projectData, 
  onReturnToUpload,
  onBackToStep6,
  onCompleteWorkflow,
  userRole = 'BA' 
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('30d');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30);

  // Dynamic performance data based on time range
  const getPerformanceData = (range) => {
    const baseData = {
      deployment: {
        status: 'Active',
        uptime: '99.8%',
        deployedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        version: 'v2.1.3',
        environment: 'Production'
      }
    };

    switch (range) {
      case '7d':
        return {
          ...baseData,
          realTimeMetrics: {
            activeUsers: 187,
            totalReach: 2890,
            engagementRate: 28.4,
            conversionRate: 6.8,
            systemHealth: 98.5
          },
          kpiTrends: [
            { 
              metric: 'HCP Reach', 
              current: 2890, 
              target: 6350, 
              progress: 46, 
              trend: '+5%',
              trendDirection: 'up'
            },
            { 
              metric: 'Engagement Rate', 
              current: 28.4, 
              target: 35.0, 
              progress: 81, 
              trend: '+3.1%',
              trendDirection: 'up'
            },
            { 
              metric: 'Prescription Lift', 
              current: 8.2, 
              target: 18.0, 
              progress: 46, 
              trend: '+8.2%',
              trendDirection: 'up'
            },
            { 
              metric: 'ROI Realization', 
              current: 2.1, 
              target: 4.2, 
              progress: 50, 
              trend: '+45%',
              trendDirection: 'up'
            }
          ]
        };

      case '90d':
        return {
          ...baseData,
          realTimeMetrics: {
            activeUsers: 312,
            totalReach: 8420,
            engagementRate: 34.8,
            conversionRate: 11.2,
            systemHealth: 97.8
          },
          kpiTrends: [
            { 
              metric: 'HCP Reach', 
              current: 8420, 
              target: 6350, 
              progress: 100, 
              trend: '+28%',
              trendDirection: 'up'
            },
            { 
              metric: 'Engagement Rate', 
              current: 34.8, 
              target: 35.0, 
              progress: 99, 
              trend: '+18.7%',
              trendDirection: 'up'
            },
            { 
              metric: 'Prescription Lift', 
              current: 21.6, 
              target: 18.0, 
              progress: 100, 
              trend: '+21.6%',
              trendDirection: 'up'
            },
            { 
              metric: 'ROI Realization', 
              current: 4.5, 
              target: 4.2, 
              progress: 100, 
              trend: '+125%',
              trendDirection: 'up'
            }
          ]
        };

      default: // 30d
        return {
          ...baseData,
          realTimeMetrics: {
            activeUsers: 247,
            totalReach: 4832,
            engagementRate: 31.7,
            conversionRate: 8.3,
            systemHealth: 97.2
          },
          kpiTrends: [
            { 
              metric: 'HCP Reach', 
              current: 4832, 
              target: 6350, 
              progress: 76, 
              trend: '+12%',
              trendDirection: 'up'
            },
            { 
              metric: 'Engagement Rate', 
              current: 31.7, 
              target: 35.0, 
              progress: 91, 
              trend: '+8.2%',
              trendDirection: 'up'
            },
            { 
              metric: 'Prescription Lift', 
              current: 16.4, 
              target: 18.0, 
              progress: 91, 
              trend: '+16.4%',
              trendDirection: 'up'
            },
            { 
              metric: 'ROI Realization', 
              current: 3.8, 
              target: 4.2, 
              progress: 90, 
              trend: '+90%',
              trendDirection: 'up'
            }
          ]
        };
    }
  };

  const performanceData = {
    ...getPerformanceData(timeRange),

    segmentPerformance: MOCK_DATA.segments.map((segment, index) => ({
      ...segment,
      activeHCPs: Math.floor(Math.random() * 800) + 400,
      engagementRate: (Math.random() * 15 + 20).toFixed(1),
      responseRate: (Math.random() * 10 + 5).toFixed(1),
      conversionRate: (Math.random() * 8 + 4).toFixed(1),
      status: index < 2 ? 'Exceeding' : index < 3 ? 'On Track' : 'Below Target',
      alerts: index === 3 ? ['Engagement below threshold'] : []
    })),

    alertsNotifications: [
      {
        id: 1,
        type: 'warning',
        title: 'Specialists Segment Underperforming',
        message: 'Engagement rate dropped 5% in the last 7 days',
        timestamp: '2 hours ago',
        acknowledged: false
      },
      {
        id: 2,
        type: 'info',
        title: 'HZ Champions Exceeding Target',
        message: 'Segment performance is 15% above projected goals',
        timestamp: '6 hours ago',
        acknowledged: true
      },
      {
        id: 3,
        type: 'success',
        title: 'Monthly ROI Target Achieved',
        message: 'Portfolio ROI has reached 3.8x, approaching 4.2x target',
        timestamp: '1 day ago',
        acknowledged: true
      }
    ]
  };

  // Auto-refresh effect
  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      // In real app, this would fetch fresh data
      console.log('Refreshing performance data...');
    }, refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'exceeding': return '#10B981';
      case 'on track': return '#4A90E2';
      case 'below target': return '#F59E0B';
      default: return '#9CA3AF';
    }
  };

  const renderOverviewTab = () => (
    <div className="performance-overview">
      {/* Real-time Metrics */}
      <div className="document-card realtime-metrics">
        <div className="metrics-header">
          <h3>Real-time Performance</h3>
          <div className="refresh-controls">
            <label className="refresh-toggle">
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
              />
              <span>Auto-refresh</span>
            </label>
            {autoRefresh && (
              <select 
                value={refreshInterval} 
                onChange={(e) => setRefreshInterval(parseInt(e.target.value))}
                className="form-select refresh-interval"
              >
                <option value={15}>15s</option>
                <option value={30}>30s</option>
                <option value={60}>1min</option>
              </select>
            )}
          </div>
        </div>
        
        <div className="metrics-grid">
          <div className="metric-item">
            <div className="metric-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <div className="metric-content">
              <div className="metric-value">{performanceData.realTimeMetrics.activeUsers}</div>
              <div className="metric-label">Active Users</div>
            </div>
          </div>

          <div className="metric-item">
            <div className="metric-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 3h18l-2 13H5L3 3z"/>
                <path d="M9 9h6v6H9z"/>
              </svg>
            </div>
            <div className="metric-content">
              <div className="metric-value">{performanceData.realTimeMetrics.totalReach.toLocaleString()}</div>
              <div className="metric-label">Total Reach</div>
            </div>
          </div>

          <div className="metric-item">
            <div className="metric-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
              </svg>
            </div>
            <div className="metric-content">
              <div className="metric-value">{performanceData.realTimeMetrics.engagementRate}%</div>
              <div className="metric-label">Engagement Rate</div>
            </div>
          </div>

          <div className="metric-item">
            <div className="metric-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l3 9a5.002 5.002 0 01-6.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16l-3-9"/>
              </svg>
            </div>
            <div className="metric-content">
              <div className="metric-value">{performanceData.realTimeMetrics.conversionRate}%</div>
              <div className="metric-label">Conversion Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Progress */}
      <div className="document-card kpi-progress">
        <h3>KPI Progress Tracking</h3>
        <div className="kpi-list">
          {performanceData.kpiTrends.map((kpi, index) => (
            <div key={index} className="kpi-item">
              <div className="kpi-header">
                <div className="kpi-info">
                  <span className="kpi-name">{kpi.metric}</span>
                  <span className={`kpi-trend ${kpi.trendDirection}`}>{kpi.trend}</span>
                </div>
                <div className="kpi-values">
                  <span className="kpi-current">{kpi.current}</span>
                  <span className="kpi-target">/ {kpi.target}</span>
                </div>
              </div>
              
              <div className="kpi-progress-bar">
                <div 
                  className="kpi-progress-fill"
                  style={{ width: `${kpi.progress}%` }}
                ></div>
              </div>
              
              <div className="progress-percentage">{kpi.progress}% of target</div>
            </div>
          ))}
        </div>
      </div>

      {/* System Health */}
      <div className="document-card system-health">
        <h3>System Health & Deployment Status</h3>
        <div className="health-grid">
          <div className="health-item">
            <div className="health-label">Deployment Status</div>
            <div className="health-value status-active">{performanceData.deployment.status}</div>
          </div>
          <div className="health-item">
            <div className="health-label">System Uptime</div>
            <div className="health-value">{performanceData.deployment.uptime}</div>
          </div>
          <div className="health-item">
            <div className="health-label">Health Score</div>
            <div className="health-value">{performanceData.realTimeMetrics.systemHealth}%</div>
          </div>
          <div className="health-item">
            <div className="health-label">Version</div>
            <div className="health-value">{performanceData.deployment.version}</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSegmentAnalysisTab = () => (
    <div className="segment-analysis">
      <div className="segments-grid">
        {performanceData.segmentPerformance.map((segment) => (
          <div key={segment.id} className="document-card segment-card">
            <div className="segment-header">
              <h4>{segment.name}</h4>
              <div 
                className="segment-status"
                style={{ color: getStatusColor(segment.status) }}
              >
                {segment.status}
              </div>
            </div>

            <div className="segment-metrics">
              <div className="metric-row">
                <span className="metric-label">Active HCPs</span>
                <span className="metric-value">{segment.activeHCPs.toLocaleString()}</span>
              </div>
              <div className="metric-row">
                <span className="metric-label">Engagement Rate</span>
                <span className="metric-value">{segment.engagementRate}%</span>
              </div>
              <div className="metric-row">
                <span className="metric-label">Response Rate</span>
                <span className="metric-value">{segment.responseRate}%</span>
              </div>
              <div className="metric-row">
                <span className="metric-label">Conversion Rate</span>
                <span className="metric-value">{segment.conversionRate}%</span>
              </div>
            </div>

            <div className="segment-frequency">
              <span className="frequency-label">Target Frequency:</span>
              <span className="frequency-value">{segment.frequency}</span>
            </div>

            {segment.alerts.length > 0 && (
              <div className="segment-alerts">
                {segment.alerts.map((alert, index) => (
                  <div key={index} className="alert-item warning">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                    </svg>
                    <span>{alert}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="segment-actions">
              <button className="btn btn-sm btn-secondary">View Details</button>
              <button className="btn btn-sm btn-secondary">Optimize</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAlertsTab = () => (
    <div className="alerts-notifications">
      <div className="alerts-header">
        <h3>Alerts & Notifications</h3>
        <div className="alerts-controls">
          <button className="btn btn-secondary">Mark All Read</button>
          <button className="btn btn-secondary">Settings</button>
        </div>
      </div>

      <div className="alerts-list">
        {performanceData.alertsNotifications.map((alert) => (
          <div key={alert.id} className={`alert-card ${alert.type} ${alert.acknowledged ? 'acknowledged' : ''}`}>
            <div className="alert-icon">
              {alert.type === 'warning' && (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                </svg>
              )}
              {alert.type === 'info' && (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 16v-4M12 8h.01"/>
                </svg>
              )}
              {alert.type === 'success' && (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22,4 12,14.01 9,11.01"/>
                </svg>
              )}
            </div>

            <div className="alert-content">
              <div className="alert-header">
                <h5>{alert.title}</h5>
                <span className="alert-time">{alert.timestamp}</span>
              </div>
              <p className="alert-message">{alert.message}</p>
            </div>

            <div className="alert-actions">
              {!alert.acknowledged && (
                <button className="btn btn-sm btn-secondary">Acknowledge</button>
              )}
              <button className="btn btn-sm btn-secondary">Resolve</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="modal-content workflow-modal step7-monitor" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Step 7: Monitor Performance</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          {/* Workflow Step Indicator - Horizontal Timeline */}
          <WorkflowStepIndicator currentStep={7} userRole={userRole} variant="horizontal" />
          
          <div className="step-content">
            <div className="step-description">
              <h3>Monitor Performance</h3>
              <p>Track deployment performance, monitor KPI progress, and receive real-time alerts</p>
            </div>

            <div className="monitoring-controls">
              <div className="time-range-selector">
                <label>Time Range:</label>
                <select 
                  value={timeRange} 
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="form-select"
                >
                  <option value="24h">Last 24 Hours</option>
                  <option value="7d">Last 7 Days</option>
                  <option value="30d">Last 30 Days</option>
                  <option value="90d">Last 90 Days</option>
                </select>
              </div>
            </div>

            {/* Performance Tabs */}
            <div className="performance-tabs">
              <div className="tab-navigation">
                <button 
                  className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 3h7v9H3zM14 3h7v5h-7zM14 12h7v9h-7zM3 16h7v5H3z"/>
            </svg>
                  Overview
                </button>
                <button 
                  className={`tab-button ${activeTab === 'segments' ? 'active' : ''}`}
                  onClick={() => setActiveTab('segments')}
                >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
                  Segment Analysis
                </button>
                <button 
                  className={`tab-button ${activeTab === 'alerts' ? 'active' : ''}`}
                  onClick={() => setActiveTab('alerts')}
                >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
                  Alerts
                  {performanceData.alertsNotifications.filter(alert => !alert.acknowledged).length > 0 && (
                    <span className="alert-badge">
                      {performanceData.alertsNotifications.filter(alert => !alert.acknowledged).length}
                    </span>
                  )}
                </button>
              </div>

              <div className="tab-content">
                {activeTab === 'overview' && renderOverviewTab()}
                {activeTab === 'segments' && renderSegmentAnalysisTab()}
                {activeTab === 'alerts' && renderAlertsTab()}
              </div>
            </div>

            {/* Success Summary */}
            <div className="document-card workflow-summary">
              <div className="summary-header">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="success-icon">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22,4 12,14.01 9,11.01"/>
          </svg>
          <h3>Brand Strategy Workflow Complete</h3>
        </div>
        
        <div className="summary-content">
          <p>Your {MOCK_DATA.product} brand strategy has been successfully transformed into a field-ready configuration and deployed. The system is now actively monitoring performance and optimizing engagement.</p>
          
          <div className="summary-achievements">
            <div className="achievement-item">
              <strong>Time Saved:</strong> 5.3 weeks → 2.5 hours (97% reduction)
            </div>
            <div className="achievement-item">
              <strong>Cost Savings:</strong> $52,000 in configuration costs
            </div>
            <div className="achievement-item">
              <strong>Accuracy:</strong> 91% AI extraction success rate
            </div>
            <div className="achievement-item">
              <strong>ROI Projection:</strong> 4.2x return on investment
            </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <div className="footer-actions">
            <button className="btn btn-secondary" onClick={onReturnToUpload}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Return to Upload
            </button>
            <div className="footer-actions-right">
              <button className="btn btn-secondary" onClick={onBackToStep6}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                Back to Deployment
              </button>
              <button className="btn btn-primary" onClick={onCompleteWorkflow}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22,4 12,14.01 9,11.01"/>
                </svg>
                Complete Workflow
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step7MonitorPerformance;