import { useState } from 'react';
import { MOCK_DATA } from '../data/mockData';

const Dashboard = ({ onStartUpload }) => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="dashboard">
      {/* Header Section */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-text">
            <h1>GSK Brand Strategy Agent</h1>
            <p>Transform pharmaceutical brand strategies into field-ready configurations in minutes, not weeks.</p>
          </div>
          <div className="header-stats">
            <div className="stat-card tooltip">
              <span className="stat-number">5-6 weeks</span>
              <span className="stat-label">Traditional Process</span>
              <span className="tooltip-text">Manual configuration typically requires multiple consultants and weeks of strategic analysis</span>
            </div>
            <div className="stat-divider pulse-animation">→</div>
            <div className="stat-card highlighted tooltip float-animation">
              <span className="stat-number gsk-gradient-text">15 minutes</span>
              <span className="stat-label">With AI Agent</span>
              <span className="tooltip-text">AI-powered extraction and configuration in under 15 minutes</span>
            </div>
          </div>
          
          {/* Key Demo Talking Points */}
          <div className="demo-highlight mt-6">
            <div className="talking-points">
              <h4 className="gsk-gradient-text">Key Value Propositions</h4>
              <div className="talking-points-grid">
                <div className="talking-point">
                  <span className="metric-highlight">97% Time Savings</span>
                  <span>Transform 5-6 weeks → 15 minutes</span>
                </div>
                <div className="talking-point">
                  <span className="metric-highlight">$45K-$60K Saved</span>
                  <span>Per brand template configuration</span>
                </div>
                <div className="talking-point">
                  <span className="metric-highlight">91% Accuracy</span>
                  <span>AI extraction success rate</span>
                </div>
                <div className="talking-point">
                  <span className="metric-highlight">12M Canadians</span>
                  <span>Eligible population opportunity</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Action Section */}
      <section className="main-action">
        <div className="action-card">
          <div className="action-content">
            <h2>Upload Brand Strategy Document</h2>
            <p>Upload your brand strategy document and let our AI agent extract key insights, 
               map strategic objectives, and generate a complete BOB configuration.</p>
            
            <div className="upload-area interactive-element" onClick={onStartUpload}>
              <div className="upload-icon float-animation">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7,10 12,5 17,10" />
                  <line x1="12" y1="5" x2="12" y2="15" />
                </svg>
              </div>
              <h3>Drag & Drop or Click to Upload</h3>
              <p>PDF, DOC, DOCX up to 10MB</p>
              <div className="upload-features">
                <div className="feature-item">
                  <span className="feature-icon">🔒</span>
                  <span>Secure Processing</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">⚡</span>
                  <span>15-Minute Turnaround</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🎯</span>
                  <span>91% Accuracy Rate</span>
                </div>
              </div>
            </div>

            <button className="btn btn-primary btn-large" onClick={onStartUpload}>
              Start Processing
            </button>
          </div>
        </div>
      </section>

      {/* Value Proposition Cards */}
      <section className="value-props">
        <h2>What Our AI Agent Delivers</h2>
        <div className="value-grid">
          {[
            {
              icon: "⚡",
              title: "Speed",
              description: "Reduce configuration time from weeks to minutes",
              metric: "97% time savings",
              tooltip: "Transform traditional 5-6 week manual processes into 15-minute automated workflows"
            },
            {
              icon: "🎯",
              title: "Accuracy",
              description: "AI-powered extraction with 91% accuracy rate",
              metric: "91% success rate",
              tooltip: "Advanced NLP ensures precise extraction of strategic objectives and KPIs"
            },
            {
              icon: "💰",
              title: "Cost Efficiency",
              description: "Save $45K-$60K per brand template",
              metric: "$52K average savings",
              tooltip: "Eliminate consulting fees and reduce internal resource allocation"
            },
            {
              icon: "📈",
              title: "Scale",
              description: "Process multiple brands simultaneously",
              metric: "12M+ Canadians reached",
              tooltip: "Eligible Canadian population represents significant growth opportunity"
            }
          ].map((prop, index) => (
            <div 
              key={index}
              className={`value-card interactive-element tooltip ${hoveredCard === index ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="value-icon float-animation">{prop.icon}</div>
              <h3>{prop.title}</h3>
              <p>{prop.description}</p>
              <div className="value-metric metric-highlight">{prop.metric}</div>
              <span className="tooltip-text">{prop.tooltip}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Current Portfolio Overview */}
      <section className="portfolio-overview">
        <h2>Portfolio Overview</h2>
        <div className="portfolio-grid">
          <div className="portfolio-card featured">
            <div className="portfolio-header">
              <h3 className="gsk-gradient-text">{MOCK_DATA.product}</h3>
              <span className="portfolio-status active pharma-badge">Active Campaign</span>
            </div>
            <p>{MOCK_DATA.indication}</p>
            <div className="portfolio-stats">
              <div className="portfolio-stat">
                <span className="stat-label">Current Coverage</span>
                <span className="stat-value">{MOCK_DATA.currentCoverage}</span>
              </div>
              <div className="portfolio-stat">
                <span className="stat-label">Target Growth</span>
                <span className="stat-value">{MOCK_DATA.targetGrowth}</span>
              </div>
            </div>
            <div className="portfolio-actions">
              <button className="btn btn-secondary btn-small">View Details</button>
              <button className="btn btn-primary btn-small" onClick={onStartUpload}>
                Update Strategy
              </button>
            </div>
          </div>

          <div className="portfolio-card placeholder">
            <div className="placeholder-content">
              <div className="placeholder-icon">+</div>
              <h3>Add New Brand</h3>
              <p>Upload a brand strategy document to create a new configuration</p>
              <button className="btn btn-secondary" onClick={onStartUpload}>
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;