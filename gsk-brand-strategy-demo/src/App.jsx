import { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CurationConfiguration from './components/CurationConfiguration';
import RunProjectSetupModal from './components/RunProjectSetupModal';
import RunProjectSummaryModal from './components/RunProjectSummaryModal';
import ProcessingModal from './components/ProcessingModal';
import ConfirmationModal from './components/ConfirmationModal';
import './styles/globals.css';
import './App.css';

function App() {
  // Main application state
  const [currentView, setCurrentView] = useState('dashboard');
  
  // Modal states
  const [modals, setModals] = useState({
    runProjectSetup: false,
    runProjectSummary: false,
    processing: false,
    confirmation: false
  });
  
  // Application data
  const [projectData, setProjectData] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  // Helper function to update modal state
  const updateModal = useCallback((modalName, isOpen) => {
    setModals(prev => ({ ...prev, [modalName]: isOpen }));
  }, []);

  // Navigation handler
  const handleNavigate = useCallback((view) => {
    setCurrentView(view);
  }, []);

  // New Template workflow
  const handleNewTemplate = useCallback(() => {
    updateModal('runProjectSetup', true);
  }, [updateModal]);

  const handleProjectSetupContinue = useCallback((setupData) => {
    setProjectData(prev => ({ ...prev, setup: setupData }));
    updateModal('runProjectSetup', false);
    updateModal('runProjectSummary', true);
  }, [updateModal]);

  const handleProjectSummarySubmit = useCallback((summaryData) => {
    setProjectData(prev => ({ ...prev, summary: summaryData }));
    updateModal('runProjectSummary', false);
    updateModal('processing', true);
    
    // Simulate realistic processing time (25 seconds)
    setTimeout(() => {
      updateModal('processing', false);
      setCurrentView('curation');
    }, 25000);
  }, [updateModal]);

  // New Project workflow
  const handleNewProject = useCallback(() => {
    updateModal('confirmation', true);
  }, [updateModal]);

  const handleConfirmationSubmit = useCallback(() => {
    updateModal('confirmation', false);
    setCurrentView('dashboard');
    // Reset any temporary data
    setProjectData(null);
    setUploadedFile(null);
  }, [updateModal]);

  // Modal close handlers
  const closeModal = useCallback((modalName) => {
    updateModal(modalName, false);
  }, [updateModal]);

  // Render current view
  const renderCurrentView = () => {
    switch (currentView) {
      case 'curation':
        return <CurationConfiguration projectData={projectData} />;
      default:
        return (
          <Dashboard 
            onNewTemplate={handleNewTemplate}
            onNewProject={handleNewProject}
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
      {modals.runProjectSetup && (
        <RunProjectSetupModal
          isOpen={modals.runProjectSetup}
          onClose={() => closeModal('runProjectSetup')}
          onContinue={handleProjectSetupContinue}
        />
      )}

      {modals.runProjectSummary && (
        <RunProjectSummaryModal
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

      {modals.confirmation && (
        <ConfirmationModal
          isOpen={modals.confirmation}
          onClose={() => closeModal('confirmation')}
          onSubmit={handleConfirmationSubmit}
        />
      )}
    </div>
  );
}

export default App;
