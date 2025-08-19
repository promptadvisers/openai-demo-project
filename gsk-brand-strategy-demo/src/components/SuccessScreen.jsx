import { useState, useEffect } from 'react';
import { MOCK_DATA } from '../data/mockData';

const SuccessScreen = ({ isOpen, onClose, onStartNew }) => {
  const [animationStep, setAnimationStep] = useState(0);
  
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setAnimationStep(1);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const successMetrics = MOCK_DATA.successMetrics;

  return (
    <div className="modal-overlay">
      <div className="modal success-modal large-modal">
        {/* Success Header */}
        <div className="success-header">
          <div className={`success-icon ${animationStep >= 1 ? 'animated' : ''}`}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="20,6 9,17 4,12"></polyline>
            </svg>
          </div>
          <h1 className="gsk-gradient-text">Configuration Successfully Deployed!</h1>
          <p>Your <strong>Shingrix</strong> brand strategy has been transformed into a field-ready BOB configuration.</p>
          <div className="success-highlights">
            <div className="highlight-item">
              <span className="metric-highlight">5.3 weeks</span>
              <span>Time Saved</span>
            </div>
            <div className="highlight-item">
              <span className="metric-highlight">$52,000</span>
              <span>Cost Savings</span>
            </div>
            <div className="highlight-item">
              <span className="metric-highlight">91%</span>
              <span>Accuracy</span>
            </div>
          </div>
        </div>

        {/* Success Metrics */}
        <div className="success-metrics">
          <h2>Transformation Results</h2>
          <div className="metrics-grid">
            <div className="metric-card primary interactive-element tooltip">
              <div className="metric-icon float-animation">⏱️</div>
              <div className="metric-content">
                <span className="metric-label">Time Saved</span>
                <span className="metric-value metric-highlight">{successMetrics.timeSaved}</span>
                <span className="metric-description">vs. traditional 5-6 week process</span>
              </div>
              <span className="tooltip-text">Traditional brand strategy implementation takes 5-6 weeks of manual work</span>
            </div>

            <div className="metric-card primary interactive-element tooltip">
              <div className="metric-icon float-animation">💰</div>
              <div className="metric-content">
                <span className="metric-label">Cost Savings</span>
                <span className="metric-value metric-highlight">{successMetrics.costSaved}</span>
                <span className="metric-description">in consulting and operational costs</span>
              </div>
              <span className="tooltip-text">Savings from reduced consulting fees and internal resource allocation</span>
            </div>

            <div className="metric-card secondary interactive-element tooltip">
              <div className="metric-icon float-animation">🎯</div>
              <div className="metric-content">
                <span className="metric-label">Accuracy Rate</span>
                <span className="metric-value metric-highlight">{successMetrics.accuracyRate}</span>
                <span className="metric-description">AI extraction success rate</span>
              </div>
              <span className="tooltip-text">Advanced NLP achieves 91% accuracy in strategic objective extraction</span>
            </div>

            <div className="metric-card secondary interactive-element tooltip">
              <div className="metric-icon float-animation">⭐</div>
              <div className="metric-content">
                <span className="metric-label">Configuration Score</span>
                <span className="metric-value metric-highlight">{successMetrics.configurationScore}</span>
                <span className="metric-description">based on best practices</span>
              </div>
              <span className="tooltip-text">Score based on pharmaceutical industry best practices and optimization algorithms</span>
            </div>
          </div>
        </div>

        {/* Deployment Summary */}
        <div className="deployment-summary">
          <h2>What Was Deployed</h2>
          <div className="summary-grid">
            <div className="summary-section">
              <h3>Campaign Configuration</h3>
              <ul>
                <li>✅ {MOCK_DATA.bobConfiguration.campaignName}</li>
                <li>✅ {MOCK_DATA.bobConfiguration.duration} campaign duration</li>
                <li>✅ {MOCK_DATA.bobConfiguration.totalTouchpoints.toLocaleString()} total touchpoints</li>
                <li>✅ 4 distinct audience segments</li>
              </ul>
            </div>

            <div className="summary-section">
              <h3>Channel Strategy</h3>
              <ul>
                {MOCK_DATA.bobConfiguration.channels.map((channel, index) => (
                  <li key={index}>✅ {channel.name} ({channel.percentage}% allocation)</li>
                ))}
              </ul>
            </div>

            <div className="summary-section">
              <h3>Target Audiences</h3>
              <ul>
                {MOCK_DATA.segments.map((segment, index) => (
                  <li key={index}>✅ {segment.name} ({segment.estimatedReach})</li>
                ))}
              </ul>
            </div>

            <div className="summary-section">
              <h3>Expected Outcomes</h3>
              <ul>
                <li>✅ {MOCK_DATA.bobConfiguration.expectedOutcomes.engagementLift} engagement increase</li>
                <li>✅ {MOCK_DATA.bobConfiguration.expectedOutcomes.prescriptionGrowth} prescription growth</li>
                <li>✅ {MOCK_DATA.bobConfiguration.expectedOutcomes.reachExpansion} HCP expansion</li>
                <li>✅ {MOCK_DATA.bobConfiguration.expectedOutcomes.roi} predicted ROI</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="next-steps">
          <h2>Next Steps</h2>
          <div className="steps-timeline">
            <div className="step-item completed">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Configuration Complete</h4>
                <p>BOB platform configured with your brand strategy</p>
              </div>
            </div>

            <div className="step-item active">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Content Development</h4>
                <p>Create campaign materials based on extracted insights</p>
                <span className="step-duration">1-2 weeks</span>
              </div>
            </div>

            <div className="step-item">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Campaign Launch</h4>
                <p>Begin multi-channel HCP engagement campaign</p>
                <span className="step-duration">2-3 weeks</span>
              </div>
            </div>

            <div className="step-item">
              <div className="step-number">4</div>
              <div className="step-content">
                <h4>Performance Monitoring</h4>
                <p>Track KPIs and optimize based on real-time data</p>
                <span className="step-duration">Ongoing</span>
              </div>
            </div>
          </div>
        </div>

        {/* ROI Projection */}
        <div className="roi-projection">
          <h2>12-Month ROI Projection</h2>
          <div className="roi-chart">
            <div className="roi-bars">
              {[
                { month: 'Q1', value: 1.2, label: '1.2x' },
                { month: 'Q2', value: 2.8, label: '2.8x' },
                { month: 'Q3', value: 3.9, label: '3.9x' },
                { month: 'Q4', value: 4.2, label: '4.2x' }
              ].map((quarter, index) => (
                <div key={index} className="roi-bar">
                  <div className="roi-bar-fill" style={{ height: `${(quarter.value / 4.2) * 100}%` }}></div>
                  <span className="roi-bar-label">{quarter.label}</span>
                  <span className="roi-bar-quarter">{quarter.month}</span>
                </div>
              ))}
            </div>
            <div className="roi-summary">
              <span className="roi-final">Projected 12-month ROI: <strong className="gsk-gradient-text">4.2x</strong></span>
              <div className="roi-benefits">
                <span>✅ Faster market penetration</span>
                <span>✅ Improved HCP engagement</span>
                <span>✅ Optimized resource allocation</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="success-actions">
          <div className="action-grid">
            <button className="btn btn-secondary" onClick={() => window.print()}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6,9 6,2 18,2 18,9"></polyline>
                <path d="M6,18H4a2,2 0 0,1-2-2v-5a2,2 0 0,1,2-2H20a2,2 0 0,1,2,2v5a2,2 0 0,1-2,2H18"></path>
                <polyline points="6,14 6,22 18,22 18,14"></polyline>
              </svg>
              Export Report
            </button>
            
            <button className="btn btn-secondary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"></path>
              </svg>
              View Configuration
            </button>
            
            <button className="btn btn-primary" onClick={onStartNew}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12,6 12,12 16,14"></polyline>
              </svg>
              Process Another Brand
            </button>
            
            <button className="btn btn-success" onClick={onClose}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20,6 9,17 4,12"></polyline>
              </svg>
              Complete Demo
            </button>
          </div>
        </div>

        {/* Demo Footer */}
        <div className="demo-footer">
          <div className="demo-note pharma-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12,6v6l4,2"></path>
            </svg>
            <span>This demonstration showcases the potential of AI-powered brand strategy transformation. 
                  Results are based on simulated data and actual performance may vary.</span>
          </div>
          <div className="final-cta">
            <h3 className="gsk-gradient-text">Ready to Transform Your Brand Strategy?</h3>
            <p>Contact GSK Canada to learn how AI can accelerate your pharmaceutical marketing initiatives.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessScreen;