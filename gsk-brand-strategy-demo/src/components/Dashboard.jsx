import React from 'react';
import ProjectCard from './ProjectCard';

const Dashboard = ({ onNewTemplate, onNewProject }) => {
  // Mock project data matching the design
  const templateProjects = [
    {
      title: 'Mybetriq Analysis (MAR28)',
      subtitle: 'Overactive Bladder',
      shareInfo: [
        'Lorem Ipsum Dollor Sit Amed',
        'Lorem Ipsum Dollor Sit Amed'
      ]
    },
    {
      title: 'Mybetriq Analysis (MAR28)',
      subtitle: 'Overactive Bladder',
      shareInfo: [
        'Lorem Ipsum Dollor Sit Amed',
        'Lorem Ipsum Dollor Sit Amed'
      ]
    }
  ];

  const deployedProjects = [
    {
      title: 'Mybetriq Analysis (MAR28)',
      subtitle: 'Overactive Bladder',
      shareInfo: [
        'Lorem Ipsum Dollor Sit Amed',
        'Lorem Ipsum Dollor Sit Amed'
      ],
      status: {
        type: 'executing',
        text: 'Project is still executing'
      },
      isDeployed: true
    },
    {
      title: 'Mybetriq Analysis (MAR28)',
      subtitle: 'Overactive Bladder',
      shareInfo: [
        'Lorem Ipsum Dollor Sit Amed',
        'Lorem Ipsum Dollor Sit Amed'
      ],
      status: {
        type: 'failed',
        text: '5/5 Test suites failed'
      },
      isDeployed: true
    }
  ];

  const undeployedProjects = [
    {
      title: 'Mybetriq Analysis (MAR28)',
      subtitle: 'Overactive Bladder',
      shareInfo: [],
      hasMenu: false
    }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
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
      </div>

      <div className="dashboard-content">
        {/* Templates Section */}
        <section className="project-section">
          <h2 className="section-title">Templates</h2>
          <div className="project-grid">
            {templateProjects.map((project, index) => (
              <ProjectCard
                key={`template-${index}`}
                title={project.title}
                subtitle={project.subtitle}
                shareInfo={project.shareInfo}
              />
            ))}
          </div>
        </section>

        {/* Deployed Section */}
        <section className="project-section">
          <h2 className="section-title">Deployed</h2>
          <div className="project-grid">
            {deployedProjects.map((project, index) => (
              <ProjectCard
                key={`deployed-${index}`}
                title={project.title}
                subtitle={project.subtitle}
                shareInfo={project.shareInfo}
                status={project.status}
                isDeployed={project.isDeployed}
              />
            ))}
          </div>
        </section>

        {/* Undeployed Section */}
        <section className="project-section">
          <h2 className="section-title">Undeployed</h2>
          <div className="project-grid">
            {undeployedProjects.map((project, index) => (
              <ProjectCard
                key={`undeployed-${index}`}
                title={project.title}
                subtitle={project.subtitle}
                shareInfo={project.shareInfo}
                hasMenu={project.hasMenu}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;