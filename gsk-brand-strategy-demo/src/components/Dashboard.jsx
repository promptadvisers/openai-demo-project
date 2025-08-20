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
          <button className="btn-ai-brand-strategy" onClick={onNewTemplate}>
            Create My Brand Strategy
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