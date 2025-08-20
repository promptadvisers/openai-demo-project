import React from 'react';
import ProjectCard from './ProjectCard';

const Dashboard = ({ onNewTemplate, onNewProject, onEditProject, onRunProject, onDeleteProject, onDuplicateProject, onViewConfiguration, savedProjects = [] }) => {
  // Combine saved projects with mock template data
  const templatesData = [
    // Add saved projects first
    ...savedProjects.map(project => ({
      id: project.id,
      title: project.summary?.projectName || 'Untitled Project',
      subtitle: project.summary?.productName || 'Brand Strategy',
      shares: [
        { label: "Product:", value: project.summary?.productName || 'Shingrix' },
        { label: "Goal:", value: project.summary?.businessGoal || 'Strategic Expansion' }
      ],
      isSaved: true,
      projectData: project
    })),
    // Then add mock templates
    {
      id: 1,
      title: "Shingrix Vaccine Launch (NOV24)",
      subtitle: "Herpes Zoster Prevention",
      shares: [
        { label: "Product:", value: "Shingrix Vaccine" },
        { label: "Goal:", value: "Increase vaccination rates among high-risk adults 50+" }
      ]
    },
    {
      id: 2,
      title: "Advair HFA Campaign (OCT24)",
      subtitle: "Asthma Management",
      shares: [
        { label: "Product:", value: "Advair HFA" },
        { label: "Goal:", value: "Improve asthma control and reduce emergency visits" }
      ]
    }
  ];

  const deployedData = [
    {
      id: 3,
      title: "Trelegy Market Analysis (SEP24)",
      subtitle: "COPD Treatment",
      shares: [
        { label: "Product:", value: "Trelegy Ellipta" },
        { label: "Goal:", value: "Expand market penetration in COPD treatment" }
      ],
      status: [
        { type: "executing", text: "Project is still executing", icon: "clock" },
        { type: "failed", text: "2/5 Test suites failed", icon: "warning" }
      ],
      hasUndeploy: true
    },
    {
      id: 4,
      title: "Nucala Patient Program (AUG24)",
      subtitle: "Severe Asthma",
      shares: [
        { label: "Product:", value: "Nucala (mepolizumab)" },
        { label: "Goal:", value: "Improve patient access and treatment adherence" }
      ],
      status: [
        { type: "executing", text: "Project is still executing", icon: "clock" },
        { type: "failed", text: "5/5 Test suites failed", icon: "error" }
      ],
      hasUndeploy: true
    }
  ];

  const undeployedData = [
    {
      id: 5,
      title: "Benlysta Strategy (JUL24)",
      subtitle: "Systemic Lupus Erythematosus",
      shares: [
        { label: "Product:", value: "Benlysta (belimumab)" },
        { label: "Goal:", value: "Increase awareness and diagnosis rates in SLE" }
      ],
      status: [],
      hasUndeploy: false
    }
  ];

  return (
    <div className="dashboard">
      {/* Primary Action Section */}
      <div className="primary-action-section" style={{
        background: 'linear-gradient(135deg, rgba(74, 144, 226, 0.15) 0%, rgba(53, 122, 189, 0.08) 100%)',
        border: '2px solid rgba(74, 144, 226, 0.25)',
        borderRadius: '16px',
        padding: '2rem',
        margin: '0 2rem 2rem 2rem',
        textAlign: 'center'
      }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          margin: '0 0 0.75rem 0',
          color: 'var(--text-primary)',
          fontWeight: '600'
        }}>
          Start Your Brand Strategy Transformation
        </h2>
        <p style={{ 
          fontSize: '1rem',
          color: 'var(--text-secondary)',
          margin: '0 0 1.5rem 0',
          maxWidth: '500px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          Upload your brand strategy document and let our AI extract key components in minutes
        </p>
        <button className="btn-primary-hero" onClick={onNewTemplate} style={{
          background: 'linear-gradient(135deg, #4A90E2 0%, #357ABD 100%)',
          color: 'white',
          border: 'none',
          padding: '1.25rem 2.5rem',
          borderRadius: '12px',
          fontSize: '1.125rem',
          fontWeight: '600',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '1rem',
          boxShadow: '0 12px 32px rgba(74, 144, 226, 0.4)',
          transition: 'all 300ms',
          transform: 'translateY(0)'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 16px 40px rgba(74, 144, 226, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 12px 32px rgba(74, 144, 226, 0.4)';
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7,10 12,5 17,10" />
            <line x1="12" y1="5" x2="12" y2="15" />
          </svg>
          Upload & Review Brand Strategy
        </button>
      </div>

      <div className="projects-header">
        <div className="projects-title">
          <h1>Projects</h1>
        </div>
      </div>

      {/* Platform Benefits Section */}
      <div className="platform-benefits" style={{
        background: 'linear-gradient(135deg, rgba(74, 144, 226, 0.08) 0%, rgba(53, 122, 189, 0.04) 100%)',
        border: '1px solid rgba(74, 144, 226, 0.15)',
        borderRadius: '16px',
        padding: '2.5rem',
        margin: '0 2rem 3rem 2rem',
        textAlign: 'center'
      }}>
        <h2 style={{ 
          fontSize: '1.75rem', 
          margin: '0 0 1.25rem 0',
          background: 'linear-gradient(135deg, #4A90E2, #357ABD)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontWeight: '700'
        }}>
          Pharmaceutical Brand Strategy Transformation
        </h2>
        <p style={{ 
          fontSize: '1.125rem',
          color: 'var(--text-secondary)',
          margin: '0 0 2.5rem 0',
          maxWidth: '700px',
          marginLeft: 'auto',
          marginRight: 'auto',
          lineHeight: '1.6'
        }}>
          Leverage our Brand Strategy Experimentation Platform to transform complex brand strategy documents into actionable field configurations. 
          Turn 5-6 weeks of manual work into 15 minutes with industry-leading 91% accuracy.
        </p>
        
        <div className="benefits-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2.5rem',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <div className="benefit-item" style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '2.5rem', 
              fontWeight: '800', 
              color: 'var(--primary-blue)',
              marginBottom: '0.5rem'
            }}>91%</div>
            <div style={{ 
              fontSize: '0.95rem', 
              color: 'var(--text-secondary)',
              fontWeight: '500'
            }}>AI Extraction Accuracy</div>
          </div>
          <div className="benefit-item" style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '2.5rem', 
              fontWeight: '800', 
              color: 'var(--primary-blue)',
              marginBottom: '0.5rem'
            }}>15min</div>
            <div style={{ 
              fontSize: '0.95rem', 
              color: 'var(--text-secondary)',
              fontWeight: '500'
            }}>Processing Time</div>
          </div>
          <div className="benefit-item" style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '2.5rem', 
              fontWeight: '800', 
              color: 'var(--primary-blue)',
              marginBottom: '0.5rem'
            }}>$55K</div>
            <div style={{ 
              fontSize: '0.95rem', 
              color: 'var(--text-secondary)',
              fontWeight: '500'
            }}>Average Cost Savings</div>
          </div>
          <div className="benefit-item" style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '2.5rem', 
              fontWeight: '800', 
              color: 'var(--primary-blue)',
              marginBottom: '0.5rem'
            }}>5-6wk</div>
            <div style={{ 
              fontSize: '0.95rem', 
              color: 'var(--text-secondary)',
              fontWeight: '500'
            }}>Time Reduction</div>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        {/* Templates Section */}
        <div className="project-section">
          <h2 className="section-title">Templates</h2>
          <div className="project-grid">
            {templatesData.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                type="template"
                onEdit={(project) => onEditProject(project, 'template')}
                onRun={onRunProject}
                onDelete={onDeleteProject}
                onViewConfiguration={onViewConfiguration}
              />
            ))}
          </div>
        </div>

        {/* Deployed Section */}
        <div className="project-section">
          <h2 className="section-title">Deployed</h2>
          <div className="project-grid">
            {deployedData.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                type="deployed"
                onEdit={onEditProject}
                onDelete={onDeleteProject}
                onDuplicate={onDuplicateProject}
                onViewConfiguration={onViewConfiguration}
              />
            ))}
          </div>
        </div>

        {/* Undeployed Section */}
        <div className="project-section">
          <h2 className="section-title">Undeployed</h2>
          <div className="project-grid">
            {undeployedData.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                type="undeployed"
                onEdit={onEditProject}
                onDelete={onDeleteProject}
                onDuplicate={onDuplicateProject}
                onViewConfiguration={onViewConfiguration}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;