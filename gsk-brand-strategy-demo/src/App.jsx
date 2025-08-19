import { useState } from 'react';
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
  const [currentView, setCurrentView] = useState('dashboard');
  const [runProjectSetupOpen, setRunProjectSetupOpen] = useState(false);
  const [runProjectSummaryOpen, setRunProjectSummaryOpen] = useState(false);
  const [processingModalOpen, setProcessingModalOpen] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [projectData, setProjectData] = useState(null);

  // Handle navigation
  const handleNavigate = (view) => {
    setCurrentView(view);
  };

  // Handle New Template flow
  const handleNewTemplate = () => {
    setRunProjectSetupOpen(true);
  };

  const handleProjectSetupContinue = (setupData) => {
    setRunProjectSetupOpen(false);
    setRunProjectSummaryOpen(true);
  };

  const handleProjectSummarySubmit = (summaryData) => {
    setRunProjectSummaryOpen(false);
    setProcessingModalOpen(true);
    
    // Simulate processing
    setTimeout(() => {
      setProcessingModalOpen(false);
      setCurrentView('curation');
    }, 25000);
  };

  const handleConfirmationSubmit = () => {
    setConfirmationModalOpen(false);
    setCurrentView('dashboard');
  };

  // Handle New Project flow
  const handleNewProject = () => {
    // For demo, show confirmation modal
    setConfirmationModalOpen(true);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'curation':
        return <CurationConfiguration />;
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

      {/* Modals */}
      <RunProjectSetupModal
        isOpen={runProjectSetupOpen}
        onClose={() => setRunProjectSetupOpen(false)}
        onContinue={handleProjectSetupContinue}
      />

      <RunProjectSummaryModal
        isOpen={runProjectSummaryOpen}
        onClose={() => setRunProjectSummaryOpen(false)}
        onSubmit={handleProjectSummarySubmit}
      />

      <ProcessingModal
        isOpen={processingModalOpen}
        onClose={() => setProcessingModalOpen(false)}
      />

      <ConfirmationModal
        isOpen={confirmationModalOpen}
        onClose={() => setConfirmationModalOpen(false)}
        onSubmit={handleConfirmationSubmit}
      />
    </div>
  );
}

export default App;
