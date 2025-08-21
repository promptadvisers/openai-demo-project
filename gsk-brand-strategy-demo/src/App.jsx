import { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import DocumentsView from './components/DocumentsView';
import CurationConfiguration from './components/CurationConfiguration';
import RunProjectSetupModal from './components/RunProjectSetupModal';
import RunProjectSummaryModal from './components/RunProjectSummaryModal';
import ConfigurationReview from './components/ConfigurationReview';
import ProcessingModal from './components/ProcessingModal';
import TemplateEditModal from './components/TemplateEditModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import ViewResultsModal from './components/ViewResultsModal';
import ViewConfigurationModal from './components/ViewConfigurationModal';
import AddUserModal from './components/AddUserModal';
import UserDetailsModal from './components/UserDetailsModal';
import UserTypeSelector from './components/UserTypeSelector';
import Step1UploadExtract from './components/Step1UploadExtract';
import Step2ReviewValidate from './components/Step2ReviewValidate';
import Step4RunSimulations from './components/Step4RunSimulations';
import Step5ValidateResults from './components/Step5ValidateResults';
import Step6DeployTemplate from './components/Step6DeployTemplate';
import Step7MonitorPerformance from './components/Step7MonitorPerformance';
import './styles/globals.css';
import './App.css';

function App() {
  // Main application state
  const [currentView, setCurrentView] = useState('dashboard');
  const [workflowStep, setWorkflowStep] = useState(null); // null, 1, 2, 3, 4, 5, 6, 7
  const [userType, setUserType] = useState(null); // 'pharma' or 'internal'
  
  // Modal states
  const [modals, setModals] = useState({
    userTypeSelector: false,
    step1UploadExtract: false,
    step2ReviewValidate: false,
    step3CurationConfiguration: false,
    step4RunSimulations: false,
    step5ValidateResults: false,
    step6DeployTemplate: false,
    step7MonitorPerformance: false,
    runProjectSetup: false,
    runProjectSummary: false,
    processing: false,
    templateEdit: false,
    deleteConfirm: false,
    viewResults: false,
    viewConfiguration: false,
    addUser: false,
    userDetails: false
  });
  
  // Application data
  const [projectData, setProjectData] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [savedProjects, setSavedProjects] = useState(() => {
    // Load saved projects from localStorage
    const saved = localStorage.getItem('gsk-brand-projects');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentProject, setCurrentProject] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [selectedUpload, setSelectedUpload] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  // Helper function to update modal state
  const updateModal = useCallback((modalName, isOpen) => {
    setModals(prev => ({ ...prev, [modalName]: isOpen }));
  }, []);

  // Navigation handler
  const handleNavigate = useCallback((view) => {
    setCurrentView(view);
  }, []);

  // New Workflow Entry Point
  const handleNewTemplate = useCallback(() => {
    if (!userType) {
      updateModal('userTypeSelector', true);
    } else {
      setWorkflowStep(1);
      updateModal('step1UploadExtract', true);
    }
  }, [updateModal, userType]);

  // User Type Selection
  const handleUserTypeChange = useCallback((type) => {
    setUserType(type);
  }, []);

  const handleUserTypeConfirm = useCallback(() => {
    updateModal('userTypeSelector', false);
    setWorkflowStep(1);
    updateModal('step1UploadExtract', true);
  }, [updateModal]);

  // Step 1: Upload & Extract workflow
  const handleStep1Continue = useCallback((setupData) => {
    // Store the uploaded file
    setUploadedFile(setupData.uploadedFile);
    setProjectData(prev => ({ ...prev, setup: setupData }));
    updateModal('step1UploadExtract', false);
    
    // Start processing immediately after file upload
    updateModal('processing', true);
    
    // After 45 seconds of processing, show the review step
    setTimeout(() => {
      updateModal('processing', false);
      setWorkflowStep(2);
      updateModal('step2ReviewValidate', true);
    }, 45000); // 45 seconds as per CLAUDE.md
  }, [updateModal]);

  // Step 2: Review & Validate workflow
  const handleStep2Continue = useCallback((summaryData) => {
    const fullProjectData = { 
      ...projectData, 
      summary: summaryData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'active'
    };
    
    setProjectData(fullProjectData);
    setCurrentProject(fullProjectData);
    
    // Save to localStorage
    const newProjects = [...savedProjects, fullProjectData];
    setSavedProjects(newProjects);
    localStorage.setItem('gsk-brand-projects', JSON.stringify(newProjects));
    
    updateModal('step2ReviewValidate', false);
    
    if (userType === 'pharma') {
      // For pharma users, workflow ends here with success message
      setWorkflowStep(null);
      setCurrentView('dashboard');
      // TODO: Show success message
    } else {
      // For internal users, continue to step 3
      setWorkflowStep(3);
      updateModal('step3CurationConfiguration', true);
    }
  }, [updateModal, projectData, savedProjects, userType]);

  // Legacy handler for backward compatibility
  const handleProjectSetupContinue = useCallback((setupData) => {
    // Store the uploaded file
    setUploadedFile(setupData.uploadedFile);
    setProjectData(prev => ({ ...prev, setup: setupData }));
    updateModal('runProjectSetup', false);
    
    // Start processing immediately after file upload
    updateModal('processing', true);
    
    // After 45 seconds of processing, show the extracted data review
    setTimeout(() => {
      updateModal('processing', false);
      updateModal('runProjectSummary', true);
    }, 45000); // 45 seconds as per CLAUDE.md
  }, [updateModal]);

  // Legacy handler for backward compatibility
  const handleProjectSummarySubmit = useCallback((summaryData) => {
    const fullProjectData = { 
      ...projectData, 
      summary: summaryData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'active'
    };
    
    setProjectData(fullProjectData);
    setCurrentProject(fullProjectData);
    
    // Save to localStorage
    const newProjects = [...savedProjects, fullProjectData];
    setSavedProjects(newProjects);
    localStorage.setItem('gsk-brand-projects', JSON.stringify(newProjects));
    
    updateModal('runProjectSummary', false);
    // Go directly to configuration view after review
    setWorkflowStep(3);
    updateModal('step3CurationConfiguration', true);
  }, [updateModal, projectData, savedProjects]);

  // Step 3: Configuration to Step 4 Navigation
  const handleStep3ToStep4 = useCallback(() => {
    setWorkflowStep(4);
    updateModal('step3CurationConfiguration', false);
    updateModal('step4RunSimulations', true);
  }, [updateModal]);

  // Step 4: Simulations Navigation
  const handleStep4BackToStep3 = useCallback(() => {
    setWorkflowStep(3);
    updateModal('step4RunSimulations', false);
    updateModal('step3CurationConfiguration', true);
  }, [updateModal]);

  const handleStep4ToStep5 = useCallback(() => {
    setWorkflowStep(5);
    updateModal('step4RunSimulations', false);
    updateModal('step5ValidateResults', true);
  }, [updateModal]);

  // Step 5: Results Validation Navigation
  const handleStep5BackToStep4 = useCallback(() => {
    setWorkflowStep(4);
    updateModal('step5ValidateResults', false);
    updateModal('step4RunSimulations', true);
  }, [updateModal]);

  const handleStep5ToStep6 = useCallback(() => {
    setWorkflowStep(6);
    updateModal('step5ValidateResults', false);
    updateModal('step6DeployTemplate', true);
  }, [updateModal]);

  // Step 6: Deployment Navigation
  const handleStep6BackToStep5 = useCallback(() => {
    setWorkflowStep(5);
    updateModal('step6DeployTemplate', false);
    updateModal('step5ValidateResults', true);
  }, [updateModal]);

  const handleStep6ToStep7 = useCallback(() => {
    setWorkflowStep(7);
    updateModal('step6DeployTemplate', false);
    updateModal('step7MonitorPerformance', true);
  }, [updateModal]);

  // Step 7: Monitor Performance Navigation
  const handleStep7BackToStep6 = useCallback(() => {
    setWorkflowStep(6);
    updateModal('step7MonitorPerformance', false);
    updateModal('step6DeployTemplate', true);
  }, [updateModal]);

  const handleCompleteWorkflow = useCallback(() => {
    setWorkflowStep(null);
    updateModal('step7MonitorPerformance', false);
    setCurrentView('dashboard');
    // TODO: Show success celebration or summary
  }, [updateModal]);

  // Step 3: Configuration Navigation
  const handleStep3Close = useCallback(() => {
    setWorkflowStep(null);
    updateModal('step3CurationConfiguration', false);
    setCurrentView('dashboard');
  }, [updateModal]);

  // Navigation helpers
  const handleReturnToUpload = useCallback(() => {
    setWorkflowStep(1);
    setCurrentView('dashboard');
    // Close any open step modals
    Object.keys(modals).forEach(modalName => {
      if (modalName.startsWith('step')) {
        updateModal(modalName, false);
      }
    });
    updateModal('step1UploadExtract', true);
  }, [updateModal, modals]);

  // New Project workflow - go directly to file upload (legacy)
  const handleNewProject = useCallback(() => {
    updateModal('runProjectSetup', true);
  }, [updateModal]);


  // Modal close handlers
  const closeModal = useCallback((modalName) => {
    updateModal(modalName, false);
  }, [updateModal]);

  // Project action handlers
  const handleEditProject = useCallback((project, type = 'project') => {
    console.log('Editing:', type, project);
    if (type === 'template') {
      setSelectedTemplate(project);
      updateModal('templateEdit', true);
    } else {
      // For projects, open the project setup modal
      updateModal('runProjectSetup', true);
    }
  }, [updateModal]);

  const handleRunProject = useCallback((project) => {
    console.log('Running project:', project);
    // If it's a saved project, load its configuration
    if (project.summary) {
      setCurrentProject(project);
      setProjectData(project);
      setWorkflowStep(3);
      updateModal('step3CurationConfiguration', true);
    } else {
      // Start the project workflow for new projects
      updateModal('runProjectSetup', true);
    }
  }, [updateModal]);

  const handleDeleteProject = useCallback((project) => {
    setDeleteTarget({ item: project, type: 'project' });
    updateModal('deleteConfirm', true);
  }, [updateModal]);
  
  const handleDeleteConfirm = useCallback(() => {
    if (deleteTarget) {
      if (deleteTarget.item.isSaved) {
        // Remove from saved projects
        const updatedProjects = savedProjects.filter(p => p.id !== deleteTarget.item.projectData.id);
        setSavedProjects(updatedProjects);
        localStorage.setItem('gsk-brand-projects', JSON.stringify(updatedProjects));
      }
      // Show success message (in a real app, this would be a toast notification)
      console.log(`${deleteTarget.type} deleted successfully`);
    }
    setDeleteTarget(null);
    updateModal('deleteConfirm', false);
  }, [deleteTarget, savedProjects, updateModal]);

  const handleDuplicateProject = useCallback((project) => {
    console.log('Duplicating project:', project);
    // Show success message
    alert(`Project "${project.title}" duplicated (mock action)`);
  }, []);

  const handleViewConfiguration = useCallback((project) => {
    setSelectedProject(project);
    updateModal('viewConfiguration', true);
  }, [updateModal]);

  const handleTemplateSave = useCallback((updatedTemplate) => {
    console.log('Template saved:', updatedTemplate);
    // In a real app, this would save to backend
    alert(`Template "${updatedTemplate.title}" saved successfully`);
    setSelectedTemplate(null);
  }, []);

  // Render current view
  const renderCurrentView = () => {
    switch (currentView) {
      case 'documents':
        return <DocumentsView />;
      case 'documents-old':
        return (
          <div className="uploads-view">
            <div className="view-header">
              <h1>Documents</h1>
              <button className="btn btn-primary" onClick={handleNewTemplate}>Upload Document</button>
            </div>
            <div className="upload-history">
              <div className="history-section">
                <h2>Recent Uploads</h2>
                <div className="upload-list">
                  <div className="upload-item">
                    <div className="upload-info">
                      <div className="upload-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm0 8c-.55 0-1-.45-1-1V3.5L18.5 9H14z"/>
                        </svg>
                      </div>
                      <div className="upload-details">
                        <h3>Shingrix_Brand_Strategy_Q4_2024.pdf</h3>
                        <p>Uploaded 2 hours ago • 2.4 MB</p>
                        <div className="upload-status success">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                          </svg>
                          Processing Complete
                        </div>
                      </div>
                    </div>
                    <div className="upload-actions">
                      <button 
                        className="btn btn-secondary" 
                        onClick={() => {
                          setSelectedUpload({
                            filename: 'Shingrix_Brand_Strategy_Q4_2024.pdf',
                            status: 'complete',
                            uploadDate: '2 hours ago',
                            extractedData: {
                              product: 'Shingrix',
                              indication: 'Herpes Zoster Prevention',
                              targetAudience: 'Adults 50+',
                              keyMessages: ['Prevention is better than treatment', 'One-time protection']
                            }
                          });
                          updateModal('viewResults', true);
                        }}
                      >
                        View Results
                      </button>
                      <button className="btn btn-secondary">Download</button>
                    </div>
                  </div>
                  
                  <div className="upload-item">
                    <div className="upload-info">
                      <div className="upload-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm0 8c-.55 0-1-.45-1-1V3.5L18.5 9H14z"/>
                        </svg>
                      </div>
                      <div className="upload-details">
                        <h3>GSK_Competitive_Analysis_Nov2024.docx</h3>
                        <p>Uploaded 1 day ago • 1.8 MB</p>
                        <div className="upload-status success">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                          </svg>
                          Processing Complete
                        </div>
                      </div>
                    </div>
                    <div className="upload-actions">
                      <button 
                        className="btn btn-secondary" 
                        onClick={() => {
                          setSelectedUpload({
                            filename: 'GSK_Competitive_Analysis_Nov2024.docx',
                            status: 'complete',
                            uploadDate: '1 day ago',
                            extractedData: {
                              product: 'Portfolio Analysis',
                              indication: 'Multiple Therapeutic Areas',
                              targetAudience: 'Healthcare Professionals',
                              keyMessages: ['Market leadership', 'Innovation pipeline']
                            }
                          });
                          updateModal('viewResults', true);
                        }}
                      >
                        View Results
                      </button>
                      <button className="btn btn-secondary">Download</button>
                    </div>
                  </div>

                  <div className="upload-item">
                    <div className="upload-info">
                      <div className="upload-icon processing">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm0 8c-.55 0-1-.45-1-1V3.5L18.5 9H14z"/>
                        </svg>
                      </div>
                      <div className="upload-details">
                        <h3>Market_Research_Summary_Q3.pptx</h3>
                        <p>Uploaded 3 days ago • 4.2 MB</p>
                        <div className="upload-status processing">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M12 6v6l4 2"/>
                          </svg>
                          Processing...
                        </div>
                      </div>
                    </div>
                    <div className="upload-actions">
                      <button className="btn btn-secondary" disabled>Processing</button>
                      <button className="btn btn-secondary">Download</button>
                    </div>
                  </div>

                  <div className="upload-item">
                    <div className="upload-info">
                      <div className="upload-icon error">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm0 8c-.55 0-1-.45-1-1V3.5L18.5 9H14z"/>
                        </svg>
                      </div>
                      <div className="upload-details">
                        <h3>Legacy_Campaign_Data.xlsx</h3>
                        <p>Uploaded 1 week ago • 8.9 MB</p>
                        <div className="upload-status error">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="12" cy="12" r="10"/>
                            <line x1="15" y1="9" x2="9" y2="15"/>
                            <line x1="9" y1="9" x2="15" y2="15"/>
                          </svg>
                          Processing Failed
                        </div>
                      </div>
                    </div>
                    <div className="upload-actions">
                      <button className="btn btn-secondary">Retry</button>
                      <button className="btn btn-secondary">Download</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="users-view">
            <div className="view-header">
              <h1>Settings</h1>
            </div>
            
            <div style={{ maxWidth: '800px' }}>
              <div className="document-card" style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ marginBottom: '1rem' }}>General Settings</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Organization Name</label>
                    <input className="form-input" type="text" value="GSK Canada" readOnly />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Default Language</label>
                    <select className="form-select">
                      <option>English</option>
                      <option>French</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Time Zone</label>
                    <select className="form-select">
                      <option>Eastern Time (ET)</option>
                      <option>Central Time (CT)</option>
                      <option>Mountain Time (MT)</option>
                      <option>Pacific Time (PT)</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="document-card" style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ marginBottom: '1rem' }}>AI Configuration</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Processing Model</label>
                    <select className="form-select">
                      <option>Advanced (91% accuracy)</option>
                      <option>Standard (85% accuracy)</option>
                      <option>Fast (78% accuracy)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Auto-Extract Threshold</label>
                    <input className="form-input" type="number" value="85" min="50" max="100" />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <input type="checkbox" id="auto-process" defaultChecked />
                    <label htmlFor="auto-process" style={{ cursor: 'pointer' }}>Automatically process uploaded documents</label>
                  </div>
                </div>
              </div>
              
              <div className="document-card">
                <h3 style={{ marginBottom: '1rem' }}>Notifications</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <input type="checkbox" id="email-notify" defaultChecked />
                    <label htmlFor="email-notify" style={{ cursor: 'pointer' }}>Email notifications for completed processing</label>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <input type="checkbox" id="error-notify" defaultChecked />
                    <label htmlFor="error-notify" style={{ cursor: 'pointer' }}>Alert on processing errors</label>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <input type="checkbox" id="weekly-summary" />
                    <label htmlFor="weekly-summary" style={{ cursor: 'pointer' }}>Weekly summary reports</label>
                  </div>
                </div>
              </div>
              
              <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                <button className="btn btn-primary">Save Settings</button>
                <button className="btn btn-secondary">Cancel</button>
              </div>
            </div>
          </div>
        );
      case 'help':
        return (
          <div className="users-view">
            <div className="view-header">
              <h1>Help & Support</h1>
            </div>
            
            <div className="documents-grid">
              <div className="document-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #4A90E2, #357ABD)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21 5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5zm-2 12H5V7h14v10z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '16px' }}>Getting Started Guide</h3>
                    <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>Learn the basics of the Brand Strategy Experimentation Platform</p>
                  </div>
                </div>
                <button className="btn btn-secondary" style={{ width: '100%' }}>View Documentation</button>
              </div>
              
              <div className="document-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #10B981, #059669)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '16px' }}>FAQ</h3>
                    <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>Frequently asked questions and answers</p>
                  </div>
                </div>
                <button className="btn btn-secondary" style={{ width: '100%' }}>Browse FAQ</button>
              </div>
              
              <div className="document-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '16px' }}>API Documentation</h3>
                    <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>Technical documentation for developers</p>
                  </div>
                </div>
                <button className="btn btn-secondary" style={{ width: '100%' }}>View API Docs</button>
              </div>
              
              <div className="document-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '16px' }}>Contact Support</h3>
                    <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>Get help from our support team</p>
                  </div>
                </div>
                <button className="btn btn-primary" style={{ width: '100%' }}>Contact Support</button>
              </div>
            </div>
            
            <div className="document-card" style={{ marginTop: '2rem', background: 'linear-gradient(135deg, rgba(74, 144, 226, 0.1), rgba(16, 185, 129, 0.1))' }}>
              <h3 style={{ marginBottom: '1rem' }}>Need Immediate Assistance?</h3>
              <p style={{ marginBottom: '1rem' }}>Our support team is available Monday-Friday, 9 AM - 5 PM ET</p>
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Email</div>
                  <a href="mailto:support@odaia.ca" style={{ color: 'var(--primary-blue)', textDecoration: 'none' }}>support@odaia.ca</a>
                </div>
                <div>
                  <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Phone</div>
                  <a href="tel:1-800-555-0123" style={{ color: 'var(--primary-blue)', textDecoration: 'none' }}>1-800-555-0123</a>
                </div>
                <div>
                  <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Response Time</div>
                  <span style={{ color: 'var(--text-secondary)' }}>Within 24 hours</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'templates':
        return (
          <div className="templates-view">
            <div className="view-header">
              <h1>Templates</h1>
              <button className="btn btn-primary" onClick={handleNewTemplate}>New Template</button>
            </div>
            
            <div className="documents-grid">
              <div className="document-card">
                <h3>Shingrix Launch Template</h3>
                <p>Standard template for vaccine launches in Canadian market</p>
                <div className="template-details" style={{ 
                  margin: '1rem 0', 
                  padding: '0.75rem', 
                  background: 'var(--primary-bg)', 
                  borderRadius: '4px',
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)'
                }}>
                  <div>Segments: 4 (HZ Champions, Rising Stars, Primary Care, Specialists)</div>
                  <div>Channels: Email, F2F, Virtual</div>
                  <div>Duration: 6 months</div>
                  <div>Last Updated: Nov 15, 2024</div>
                </div>
                <div className="document-actions">
                  <button className="btn btn-secondary" onClick={() => handleEditProject({ title: 'Shingrix Template' }, 'template')}>Edit</button>
                  <button className="btn btn-secondary">Duplicate</button>
                </div>
              </div>
              
              <div className="document-card">
                <h3>Mybetriq Campaign Template</h3>
                <p>OAB market penetration strategy template</p>
                <div className="template-details" style={{ 
                  margin: '1rem 0', 
                  padding: '0.75rem', 
                  background: 'var(--primary-bg)', 
                  borderRadius: '4px',
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)'
                }}>
                  <div>Segments: 3 (Urologists, PCPs, Nurse Practitioners)</div>
                  <div>Channels: Digital, Print, Conferences</div>
                  <div>Duration: 12 months</div>
                  <div>Last Updated: Oct 28, 2024</div>
                </div>
                <div className="document-actions">
                  <button className="btn btn-secondary" onClick={() => handleEditProject({ title: 'Mybetriq Template' }, 'template')}>Edit</button>
                  <button className="btn btn-secondary">Duplicate</button>
                </div>
              </div>
              
              <div className="document-card">
                <h3>Generic Pharma Template</h3>
                <p>Adaptable template for various pharmaceutical products</p>
                <div className="template-details" style={{ 
                  margin: '1rem 0', 
                  padding: '0.75rem', 
                  background: 'var(--primary-bg)', 
                  borderRadius: '4px',
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)'
                }}>
                  <div>Segments: Customizable</div>
                  <div>Channels: Multi-channel</div>
                  <div>Duration: Flexible</div>
                  <div>Last Updated: Sep 10, 2024</div>
                </div>
                <div className="document-actions">
                  <button className="btn btn-secondary" onClick={() => handleEditProject({ title: 'Generic Template' }, 'template')}>Edit</button>
                  <button className="btn btn-secondary">Duplicate</button>
                </div>
              </div>
              
              <div className="document-card">
                <h3>Respiratory Portfolio Template</h3>
                <p>Integrated approach for respiratory product lines</p>
                <div className="template-details" style={{ 
                  margin: '1rem 0', 
                  padding: '0.75rem', 
                  background: 'var(--primary-bg)', 
                  borderRadius: '4px',
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)'
                }}>
                  <div>Segments: 5 (Pulmonologists, Allergists, PCPs, Pharmacists, Payers)</div>
                  <div>Channels: Omnichannel</div>
                  <div>Duration: 18 months</div>
                  <div>Last Updated: Aug 5, 2024</div>
                </div>
                <div className="document-actions">
                  <button className="btn btn-secondary" onClick={() => handleEditProject({ title: 'Respiratory Template' }, 'template')}>Edit</button>
                  <button className="btn btn-secondary">Duplicate</button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'users':
        return (
          <div className="users-view">
            <div className="view-header">
              <h1>Users</h1>
              <button 
                className="btn btn-primary" 
                onClick={() => updateModal('addUser', true)}
              >
                Add User
              </button>
            </div>
            
            <div className="users-table-container">
              <div className="users-table">
                <div className="users-table-header">
                  <div className="table-cell">User</div>
                  <div className="table-cell">Department</div>
                  <div className="table-cell">Role</div>
                  <div className="table-cell">Projects</div>
                  <div className="table-cell">Status</div>
                  <div className="table-cell">Actions</div>
                </div>
                
                <div 
                  className="users-table-row" 
                  onClick={() => {
                    setSelectedUser({
                      name: 'Sarah Mitchell',
                      email: 'sarah.mitchell@gsk.com',
                      role: 'Administrator',
                      department: 'Marketing',
                      projects: 12,
                      status: 'active',
                      lastSeen: '2 hours ago',
                      joinDate: '2023-01-15'
                    });
                    updateModal('userDetails', true);
                  }}
                >
                  <div className="table-cell user-info">
                    <div className="user-avatar" style={{
                      background: 'linear-gradient(135deg, #4A90E2, #357ABD)'
                    }}>SM</div>
                    <div>
                      <div className="user-name">Sarah Mitchell</div>
                      <div className="user-title">Brand Strategy Lead</div>
                    </div>
                  </div>
                  <div className="table-cell">Marketing</div>
                  <div className="table-cell">
                    <span className="role-badge admin">Administrator</span>
                  </div>
                  <div className="table-cell">12 active</div>
                  <div className="table-cell">
                    <div className="status-indicator">
                      <span className="status-dot active"></span>
                      Active
                    </div>
                  </div>
                  <div className="table-cell">
                    <button className="btn btn-sm btn-secondary">Edit</button>
                  </div>
                </div>
                
                <div 
                  className="users-table-row" 
                  onClick={() => {
                    setSelectedUser({
                      name: 'James Chen',
                      email: 'james.chen@gsk.com',
                      role: 'Editor',
                      department: 'Analytics',
                      projects: 8,
                      status: 'active',
                      lastSeen: 'Currently online',
                      joinDate: '2023-03-22'
                    });
                    updateModal('userDetails', true);
                  }}
                >
                  <div className="table-cell user-info">
                    <div className="user-avatar" style={{
                      background: 'linear-gradient(135deg, #10B981, #059669)'
                    }}>JC</div>
                    <div>
                      <div className="user-name">James Chen</div>
                      <div className="user-title">Data Analyst</div>
                    </div>
                  </div>
                  <div className="table-cell">Analytics</div>
                  <div className="table-cell">
                    <span className="role-badge editor">Editor</span>
                  </div>
                  <div className="table-cell">8 active</div>
                  <div className="table-cell">
                    <div className="status-indicator">
                      <span className="status-dot active"></span>
                      Active
                    </div>
                  </div>
                  <div className="table-cell">
                    <button className="btn btn-sm btn-secondary">Edit</button>
                  </div>
                </div>
                
                <div 
                  className="users-table-row" 
                  onClick={() => {
                    setSelectedUser({
                      name: 'Emily Parker',
                      email: 'emily.parker@gsk.com',
                      role: 'Editor',
                      department: 'Product',
                      projects: 6,
                      status: 'away',
                      lastSeen: 'Yesterday',
                      joinDate: '2023-06-10'
                    });
                    updateModal('userDetails', true);
                  }}
                >
                  <div className="table-cell user-info">
                    <div className="user-avatar" style={{
                      background: 'linear-gradient(135deg, #F59E0B, #D97706)'
                    }}>EP</div>
                    <div>
                      <div className="user-name">Emily Parker</div>
                      <div className="user-title">Product Manager</div>
                    </div>
                  </div>
                  <div className="table-cell">Product</div>
                  <div className="table-cell">
                    <span className="role-badge editor">Editor</span>
                  </div>
                  <div className="table-cell">6 active</div>
                  <div className="table-cell">
                    <div className="status-indicator">
                      <span className="status-dot away"></span>
                      Away
                    </div>
                  </div>
                  <div className="table-cell">
                    <button className="btn btn-sm btn-secondary">Edit</button>
                  </div>
                </div>
                
                <div 
                  className="users-table-row" 
                  onClick={() => {
                    setSelectedUser({
                      name: 'Michael Roberts',
                      email: 'michael.roberts@gsk.com',
                      role: 'Viewer',
                      department: 'Medical',
                      projects: 3,
                      status: 'offline',
                      lastSeen: '3 days ago',
                      joinDate: '2023-09-05'
                    });
                    updateModal('userDetails', true);
                  }}
                >
                  <div className="table-cell user-info">
                    <div className="user-avatar" style={{
                      background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)'
                    }}>MR</div>
                    <div>
                      <div className="user-name">Michael Roberts</div>
                      <div className="user-title">Medical Affairs</div>
                    </div>
                  </div>
                  <div className="table-cell">Medical</div>
                  <div className="table-cell">
                    <span className="role-badge viewer">Viewer</span>
                  </div>
                  <div className="table-cell">3 active</div>
                  <div className="table-cell">
                    <div className="status-indicator">
                      <span className="status-dot offline"></span>
                      Offline
                    </div>
                  </div>
                  <div className="table-cell">
                    <button className="btn btn-sm btn-secondary">Edit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <Dashboard 
            onNewTemplate={handleNewTemplate}
            onNewProject={handleNewProject}
            onEditProject={handleEditProject}
            onRunProject={handleRunProject}
            onDeleteProject={handleDeleteProject}
            onDuplicateProject={handleDuplicateProject}
            onViewConfiguration={handleViewConfiguration}
            savedProjects={savedProjects}
          />
        );
    }
  };

  return (
    <div className="app">
      <Sidebar 
        currentView={currentView}
        onNavigate={handleNavigate}
      />
      
      <main className="app-main">
        {renderCurrentView()}
      </main>

      {/* Modal Components */}
      {modals.userTypeSelector && (
        <UserTypeSelector
          isOpen={modals.userTypeSelector}
          userType={userType}
          onUserTypeChange={handleUserTypeChange}
          onClose={handleUserTypeConfirm}
        />
      )}

      {modals.step1UploadExtract && (
        <Step1UploadExtract
          isOpen={modals.step1UploadExtract}
          onClose={() => {
            setWorkflowStep(null);
            closeModal('step1UploadExtract');
          }}
          onContinue={handleStep1Continue}
          userType={userType}
        />
      )}

      {modals.step2ReviewValidate && (
        <Step2ReviewValidate
          isOpen={modals.step2ReviewValidate}
          onClose={() => {
            setWorkflowStep(null);
            closeModal('step2ReviewValidate');
          }}
          onSubmit={handleStep2Continue}
          setupData={projectData?.setup}
          userType={userType}
        />
      )}

      {modals.step3CurationConfiguration && (
        <CurationConfiguration
          isOpen={modals.step3CurationConfiguration}
          onClose={handleStep3Close}
          projectData={currentProject || projectData}
          onReturnToUpload={handleReturnToUpload}
          onContinueToStep4={handleStep3ToStep4}
          userType={userType}
        />
      )}

      {modals.step4RunSimulations && (
        <Step4RunSimulations
          isOpen={modals.step4RunSimulations}
          onClose={() => {
            setWorkflowStep(null);
            closeModal('step4RunSimulations');
          }}
          projectData={projectData}
          onReturnToUpload={handleReturnToUpload}
          onBackToStep3={handleStep4BackToStep3}
          onContinueToStep5={handleStep4ToStep5}
          userType={userType}
        />
      )}

      {modals.step5ValidateResults && (
        <Step5ValidateResults
          isOpen={modals.step5ValidateResults}
          onClose={() => {
            setWorkflowStep(null);
            closeModal('step5ValidateResults');
          }}
          projectData={projectData}
          onReturnToUpload={handleReturnToUpload}
          onBackToStep4={handleStep5BackToStep4}
          onContinueToStep6={handleStep5ToStep6}
          userType={userType}
        />
      )}

      {modals.step6DeployTemplate && (
        <Step6DeployTemplate
          isOpen={modals.step6DeployTemplate}
          onClose={() => {
            setWorkflowStep(null);
            closeModal('step6DeployTemplate');
          }}
          projectData={projectData}
          onReturnToUpload={handleReturnToUpload}
          onBackToStep5={handleStep6BackToStep5}
          onContinueToStep7={handleStep6ToStep7}
          userType={userType}
        />
      )}

      {modals.step7MonitorPerformance && (
        <Step7MonitorPerformance
          isOpen={modals.step7MonitorPerformance}
          onClose={() => {
            setWorkflowStep(null);
            closeModal('step7MonitorPerformance');
          }}
          projectData={projectData}
          onReturnToUpload={handleReturnToUpload}
          onBackToStep6={handleStep7BackToStep6}
          onCompleteWorkflow={handleCompleteWorkflow}
          userType={userType}
        />
      )}

      {/* Legacy modals for backward compatibility */}
      {modals.runProjectSetup && (
        <RunProjectSetupModal
          isOpen={modals.runProjectSetup}
          onClose={() => closeModal('runProjectSetup')}
          onContinue={handleProjectSetupContinue}
        />
      )}

      {modals.runProjectSummary && (
        <ConfigurationReview
          isOpen={modals.runProjectSummary}
          onClose={() => closeModal('runProjectSummary')}
          onSubmit={handleProjectSummarySubmit}
          setupData={projectData?.setup}
        />
      )}

      {modals.processing && (
        <ProcessingModal
          isOpen={modals.processing}
          onClose={() => closeModal('processing')}
          projectData={projectData}
        />
      )}

      {modals.templateEdit && (
        <TemplateEditModal
          isOpen={modals.templateEdit}
          onClose={() => closeModal('templateEdit')}
          onSave={handleTemplateSave}
          template={selectedTemplate}
        />
      )}

      {modals.deleteConfirm && (
        <DeleteConfirmModal
          isOpen={modals.deleteConfirm}
          onClose={() => {
            setDeleteTarget(null);
            closeModal('deleteConfirm');
          }}
          onConfirm={handleDeleteConfirm}
          itemType={deleteTarget?.type}
          itemName={deleteTarget?.item?.title || deleteTarget?.item?.projectData?.summary?.projectName}
        />
      )}

      {modals.viewResults && (
        <ViewResultsModal
          isOpen={modals.viewResults}
          onClose={() => {
            setSelectedUpload(null);
            closeModal('viewResults');
          }}
          uploadData={selectedUpload}
        />
      )}

      {modals.addUser && (
        <AddUserModal
          isOpen={modals.addUser}
          onClose={() => closeModal('addUser')}
          onSave={(userData) => {
            console.log('User added:', userData);
            closeModal('addUser');
          }}
        />
      )}

      {modals.userDetails && (
        <UserDetailsModal
          isOpen={modals.userDetails}
          onClose={() => {
            setSelectedUser(null);
            closeModal('userDetails');
          }}
          userData={selectedUser}
          onEdit={(userData) => {
            console.log('User edited:', userData);
            setSelectedUser(null);
            closeModal('userDetails');
          }}
        />
      )}

      {modals.viewConfiguration && (
        <ViewConfigurationModal
          isOpen={modals.viewConfiguration}
          onClose={() => {
            setSelectedProject(null);
            closeModal('viewConfiguration');
          }}
          project={selectedProject}
          onEditConfiguration={(project) => {
            setProjectData(project);
            setCurrentProject(project);
            setWorkflowStep(3);
            updateModal('step3CurationConfiguration', true);
          }}
        />
      )}

    </div>
  );
}

export default App;
