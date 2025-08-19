import { useState } from 'react';
import Dashboard from './components/Dashboard';
import UploadModal from './components/UploadModal';
import ProcessingModal from './components/ProcessingModal';
import ReviewModal from './components/ReviewModal';
import ConfigPreview from './components/ConfigPreview';
import SuccessScreen from './components/SuccessScreen';
import './styles/globals.css';
import './App.css';

function App() {
  const [currentStep, setCurrentStep] = useState('dashboard');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [processingModalOpen, setProcessingModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [configPreviewOpen, setConfigPreviewOpen] = useState(false);
  const [successScreenOpen, setSuccessScreenOpen] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const [configData, setConfigData] = useState(null);

  // Handle upload flow
  const handleStartUpload = () => {
    setUploadModalOpen(true);
  };

  const handleUploadComplete = (uploadResponse) => {
    setUploadModalOpen(false);
    setProcessingModalOpen(true);
  };

  const handleProcessingComplete = (processedData) => {
    setProcessingModalOpen(false);
    setExtractedData(processedData);
    setReviewModalOpen(true);
  };

  const handleReviewConfirm = (reviewedData) => {
    setReviewModalOpen(false);
    setConfigData(reviewedData);
    setConfigPreviewOpen(true);
  };

  const handleConfigDeploy = (configData) => {
    setConfigPreviewOpen(false);
    setSuccessScreenOpen(true);
  };

  const handleStartNew = () => {
    // Reset all states
    setSuccessScreenOpen(false);
    setUploadModalOpen(false);
    setProcessingModalOpen(false);
    setReviewModalOpen(false);
    setConfigPreviewOpen(false);
    setExtractedData(null);
    setConfigData(null);
    setCurrentStep('dashboard');
  };

  const handleCompleteDemo = () => {
    // Reset to dashboard
    setSuccessScreenOpen(false);
    setCurrentStep('dashboard');
  };

  return (
    <div className="app">
      {/* Navigation Header */}
      <nav className="app-nav">
        <div className="nav-content">
          <div className="nav-brand">
            <div className="brand-logo">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12l2 2 4-4"></path>
                <circle cx="12" cy="12" r="10"></circle>
              </svg>
            </div>
            <div className="brand-text">
              <h3>GSK Brand Strategy Agent</h3>
              <span>AI-Powered Configuration Platform</span>
            </div>
          </div>

          <div className="nav-actions">
            <div className="demo-indicator">
              <span className="demo-badge">DEMO</span>
              <span className="demo-text">Simulation Mode</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="app-main">
        <Dashboard onStartUpload={handleStartUpload} />
      </main>

      {/* Modals */}
      <UploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onUploadComplete={handleUploadComplete}
      />

      <ProcessingModal
        isOpen={processingModalOpen}
        onClose={() => setProcessingModalOpen(false)}
        onProcessingComplete={handleProcessingComplete}
      />

      <ReviewModal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        onConfirm={handleReviewConfirm}
        extractedData={extractedData}
      />

      <ConfigPreview
        isOpen={configPreviewOpen}
        onClose={() => setConfigPreviewOpen(false)}
        onDeploy={handleConfigDeploy}
        configData={configData}
      />

      <SuccessScreen
        isOpen={successScreenOpen}
        onClose={handleCompleteDemo}
        onStartNew={handleStartNew}
      />
    </div>
  );
}

export default App;
