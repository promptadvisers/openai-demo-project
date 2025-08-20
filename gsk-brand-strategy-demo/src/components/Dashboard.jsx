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
        { label: "Share:", value: "Dr. Emily Chen, Dr. Michael Roberts" },
        { label: "Share:", value: "Marketing Team, Medical Affairs" }
      ]
    },
    {
      id: 2,
      title: "Advair HFA Campaign (OCT24)",
      subtitle: "Asthma Management",
      shares: [
        { label: "Share:", value: "Dr. Sarah Mitchell, Dr. James Chen" },
        { label: "Share:", value: "Respiratory Team, Brand Management" }
      ]
    }
  ];

  const deployedData = [
    {
      id: 3,
      title: "Trelegy Market Analysis (SEP24)",
      subtitle: "COPD Treatment",
      shares: [
        { label: "Share:", value: "Dr. Amanda Rodriguez, Dr. Kevin Zhang" },
        { label: "Share:", value: "Clinical Research Team" }
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
        { label: "Share:", value: "Dr. Lisa Thompson, Dr. Mark Williams" },
        { label: "Share:", value: "Patient Access Team, Specialty Care" }
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
      shares: [],
      status: [],
      hasUndeploy: false
    }
  ];

  return (
    <div className="dashboard">
      <div className="projects-header">
        <div className="projects-title">
          <h1>Projects</h1>
        </div>
        <div className="dashboard-actions">
          <button className="btn-primary-hero" onClick={onNewTemplate} style={{
            background: 'linear-gradient(135deg, #4A90E2 0%, #357ABD 100%)',
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '12px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            boxShadow: '0 8px 24px rgba(74, 144, 226, 0.3)',
            transition: 'all 300ms'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7,10 12,5 17,10" />
              <line x1="12" y1="5" x2="12" y2="15" />
            </svg>
            Upload & Review Brand Strategy
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="dashboard-hero" style={{
        background: 'linear-gradient(135deg, rgba(74, 144, 226, 0.1) 0%, rgba(53, 122, 189, 0.05) 100%)',
        border: '1px solid rgba(74, 144, 226, 0.2)',
        borderRadius: '16px',
        padding: '2rem',
        margin: '0 2rem 2rem 2rem',
        textAlign: 'center'
      }}>
        <h2 style={{ 
          fontSize: '1.75rem', 
          margin: '0 0 1rem 0',
          background: 'linear-gradient(135deg, #4A90E2, #357ABD)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Transform Your Brand Strategy in Minutes
        </h2>
        <p style={{ 
          fontSize: '1.125rem',
          color: 'var(--text-secondary)',
          margin: '0 0 2rem 0',
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          Upload your Brand Strategy Content and let our Brand Strategy Agent extract key components. 
          Turn 5-6 weeks of work into 15 minutes with 91% accuracy.
        </p>
        
        <div className="hero-stats" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2rem',
          maxWidth: '600px',
          margin: '0 auto 2rem auto'
        }}>
          <div className="stat-item">
            <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--primary-blue)' }}>91%</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Extraction Accuracy</div>
          </div>
          <div className="stat-item">
            <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--primary-blue)' }}>15min</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Processing Time</div>
          </div>
          <div className="stat-item">
            <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--primary-blue)' }}>$55K</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Average Savings</div>
          </div>
        </div>

        <button 
          className="btn-hero-cta" 
          onClick={onNewTemplate}
          style={{
            background: 'linear-gradient(135deg, #4A90E2 0%, #357ABD 100%)',
            color: 'white',
            border: 'none',
            padding: '1.25rem 3rem',
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
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7,10 12,5 17,10" />
            <line x1="12" y1="5" x2="12" y2="15" />
          </svg>
          Start with Upload & Review
        </button>
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