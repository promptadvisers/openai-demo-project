import React from 'react';
import ProjectCard from './ProjectCard';

const Dashboard = ({ onNewTemplate, onNewProject }) => {
  // Mock project data to match the design
  const templatesData = [
    {
      id: 1,
      title: "Mybetriq Analysis (MAR28)",
      subtitle: "Overactive Bladder",
      shares: [
        { label: "Share:", value: "Lorem Ipsum Dollor Sit Amed" },
        { label: "Share:", value: "Lorem Ipsum Dollor Sit Amed" }
      ]
    },
    {
      id: 2,
      title: "Mybetriq Analysis (MAR28)",
      subtitle: "Overactive Bladder",
      shares: [
        { label: "Share:", value: "Lorem Ipsum Dollor Sit Amed" },
        { label: "Share:", value: "Lorem Ipsum Dollor Sit Amed" }
      ]
    }
  ];

  const deployedData = [
    {
      id: 3,
      title: "Mybetriq Analysis (MAR28)",
      subtitle: "Overactive Bladder",
      shares: [
        { label: "Share:", value: "Lorem Ipsum Dollor Sit Amed" },
        { label: "Share:", value: "Lorem Ipsum Dollor Sit Amed" }
      ],
      status: [
        { type: "executing", text: "Project is still executing", icon: "clock" },
        { type: "failed", text: "2/5 Test suites failed", icon: "warning" }
      ],
      hasUndeploy: true
    },
    {
      id: 4,
      title: "Mybetriq Analysis (MAR28)",
      subtitle: "Overactive Bladder",
      shares: [
        { label: "Share:", value: "Lorem Ipsum Dollor Sit Amed" },
        { label: "Share:", value: "Lorem Ipsum Dollor Sit Amed" }
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
      title: "Mybetriq Analysis (MAR28)",
      subtitle: "Overactive Bladder",
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
          <button className="clear-cache-btn">Clear Cache</button>
        </div>
        <div className="dashboard-actions">
          <button className="btn btn-secondary" onClick={onNewTemplate}>
            New Template
          </button>
          <button className="btn btn-primary" onClick={onNewProject}>
            New Project
          </button>
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
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;