import React from 'react';

const ViewConfigurationModal = ({ isOpen, onClose, project, onEditConfiguration }) => {
  if (!isOpen || !project) return null;

  // Generate unique mock data based on project name
  const generateMockData = (projectName) => {
    const configs = {
      'Shingrix Vaccine Launch': {
        indication: 'Herpes Zoster (Shingles) Prevention',
        targetPopulation: '50+ years adults',
        segments: [
          { name: 'Vaccine Champions', percentage: 45, color: '#F59E0B' },
          { name: 'Prevention Focused', percentage: 30, color: '#10B981' },
          { name: 'General Practice', percentage: 20, color: '#3B82F6' },
          { name: 'Specialists', percentage: 5, color: '#8B5CF6' }
        ],
        hcps: [
          { name: 'Dr. Margaret Chen', specialty: 'Immunology', segment: 'Vaccine Champions', powerScore: 10 },
          { name: 'Dr. John Williams', specialty: 'Family Medicine', segment: 'Prevention Focused', powerScore: 9 },
          { name: 'Dr. Susan Park', specialty: 'Geriatrics', segment: 'General Practice', powerScore: 8 },
          { name: 'Dr. Robert Miller', specialty: 'Internal Medicine', segment: 'Prevention Focused', powerScore: 7 }
        ],
        frequency: 'Bi-weekly touchpoints',
        listSize: 250
      },
      'Advair HFA Campaign': {
        indication: 'Asthma & COPD Management',
        targetPopulation: 'Adults with persistent asthma',
        segments: [
          { name: 'Respiratory Experts', percentage: 35, color: '#EF4444' },
          { name: 'High Volume PCPs', percentage: 35, color: '#F59E0B' },
          { name: 'Pulmonologists', percentage: 20, color: '#22C55E' },
          { name: 'Allergists', percentage: 10, color: '#A855F7' }
        ],
        hcps: [
          { name: 'Dr. Amanda Rodriguez', specialty: 'Pulmonology', segment: 'Respiratory Experts', powerScore: 10 },
          { name: 'Dr. Kevin Zhang', specialty: 'Allergy & Immunology', segment: 'Allergists', powerScore: 9 },
          { name: 'Dr. Lisa Thompson', specialty: 'Family Medicine', segment: 'High Volume PCPs', powerScore: 8 },
          { name: 'Dr. Michael Brown', specialty: 'Internal Medicine', segment: 'High Volume PCPs', powerScore: 7 }
        ],
        frequency: 'Weekly engagement',
        listSize: 180
      },
      'Trelegy Market Analysis': {
        indication: 'COPD Triple Therapy',
        targetPopulation: 'Severe COPD patients',
        segments: [
          { name: 'COPD Specialists', percentage: 40, color: '#0EA5E9' },
          { name: 'Pulmonary Leaders', percentage: 30, color: '#F97316' },
          { name: 'Hospital Systems', percentage: 20, color: '#84CC16' },
          { name: 'Managed Care', percentage: 10, color: '#EC4899' }
        ],
        hcps: [
          { name: 'Dr. Patricia Kumar', specialty: 'Pulmonology', segment: 'COPD Specialists', powerScore: 10 },
          { name: 'Dr. James Wilson', specialty: 'Critical Care', segment: 'Hospital Systems', powerScore: 9 },
          { name: 'Dr. Emily Davis', specialty: 'Respiratory Medicine', segment: 'Pulmonary Leaders', powerScore: 9 },
          { name: 'Dr. Daniel Lee', specialty: 'Internal Medicine', segment: 'COPD Specialists', powerScore: 8 }
        ],
        frequency: 'Monthly cycles',
        listSize: 320
      },
      'Nucala Patient Program': {
        indication: 'Severe Eosinophilic Asthma',
        targetPopulation: 'Severe asthma with eosinophilic phenotype',
        segments: [
          { name: 'Severe Asthma Centers', percentage: 50, color: '#DC2626' },
          { name: 'Allergy Specialists', percentage: 25, color: '#FBBF24' },
          { name: 'Academic Centers', percentage: 15, color: '#059669' },
          { name: 'Payers', percentage: 10, color: '#7C3AED' }
        ],
        hcps: [
          { name: 'Dr. Rachel Martinez', specialty: 'Allergy & Asthma', segment: 'Severe Asthma Centers', powerScore: 10 },
          { name: 'Dr. Thomas Anderson', specialty: 'Immunology', segment: 'Allergy Specialists', powerScore: 9 },
          { name: 'Dr. Jennifer White', specialty: 'Pulmonology', segment: 'Academic Centers', powerScore: 8 },
          { name: 'Dr. Christopher Taylor', specialty: 'Respiratory', segment: 'Severe Asthma Centers', powerScore: 8 }
        ],
        frequency: 'Bi-weekly',
        listSize: 150
      },
      'Benlysta Strategy': {
        indication: 'Systemic Lupus Erythematosus',
        targetPopulation: 'Active SLE patients',
        segments: [
          { name: 'Rheumatology KOLs', percentage: 40, color: '#06B6D4' },
          { name: 'Lupus Centers', percentage: 30, color: '#F59E0B' },
          { name: 'Community Rheum', percentage: 20, color: '#10B981' },
          { name: 'Nephrology', percentage: 10, color: '#EF4444' }
        ],
        hcps: [
          { name: 'Dr. Maria Gonzalez', specialty: 'Rheumatology', segment: 'Rheumatology KOLs', powerScore: 10 },
          { name: 'Dr. David Kim', specialty: 'Lupus Specialist', segment: 'Lupus Centers', powerScore: 9 },
          { name: 'Dr. Sarah Johnson', specialty: 'Nephrology', segment: 'Nephrology', powerScore: 8 },
          { name: 'Dr. Mark Roberts', specialty: 'Rheumatology', segment: 'Community Rheum', powerScore: 7 }
        ],
        frequency: 'Monthly touchpoints',
        listSize: 200
      }
    };

    // Default configuration if project name doesn't match
    const defaultConfig = configs['Shingrix Vaccine Launch'];
    
    // Find matching config or use default
    for (const key in configs) {
      if (projectName.includes(key.split(' ')[0])) {
        return configs[key];
      }
    }
    
    return defaultConfig;
  };

  const config = generateMockData(project.title);

  return (
    <div className="modal-overlay" onClick={onClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '900px', width: '90%' }}>
        <div className="modal-header">
          <h2>Configuration: {project.title}</h2>
          <button 
            className="modal-close" 
            onClick={onClose}
            style={{ fontSize: '24px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            ×
          </button>
        </div>

        <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          {/* Configuration Overview */}
          <div style={{ 
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
            border: '1px solid rgba(102, 126, 234, 0.3)',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                  Indication
                </label>
                <div style={{ fontSize: '14px', fontWeight: '600', marginTop: '0.25rem' }}>
                  {config.indication}
                </div>
              </div>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                  Target Population
                </label>
                <div style={{ fontSize: '14px', fontWeight: '600', marginTop: '0.25rem' }}>
                  {config.targetPopulation}
                </div>
              </div>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                  List Size
                </label>
                <div style={{ fontSize: '14px', fontWeight: '600', marginTop: '0.25rem' }}>
                  {config.listSize} HCPs
                </div>
              </div>
            </div>
          </div>

          {/* Market Segments */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '16px', marginBottom: '1rem', color: 'var(--primary-blue)' }}>
              Market Segmentation
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              {config.segments.map((segment, index) => (
                <div key={index} style={{ 
                  background: 'var(--card-bg)', 
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: segment.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: '700',
                    fontSize: '16px'
                  }}>
                    {segment.percentage}%
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '0.25rem' }}>
                      {segment.name}
                    </h4>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      Frequency: {config.frequency}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top HCPs */}
          <div>
            <h3 style={{ fontSize: '16px', marginBottom: '1rem', color: 'var(--primary-blue)' }}>
              Top Healthcare Professionals
            </h3>
            <div style={{ 
              background: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: '40px 2fr 1.5fr 1.5fr 80px',
                padding: '0.75rem 1rem',
                background: 'var(--primary-bg)',
                borderBottom: '1px solid var(--border-color)',
                fontSize: '12px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                color: 'var(--text-secondary)'
              }}>
                <div>PS</div>
                <div>Name</div>
                <div>Specialty</div>
                <div>Segment</div>
                <div>Actions</div>
              </div>
              {config.hcps.map((hcp, index) => (
                <div key={index} style={{
                  display: 'grid',
                  gridTemplateColumns: '40px 2fr 1.5fr 1.5fr 80px',
                  padding: '0.75rem 1rem',
                  borderBottom: index < config.hcps.length - 1 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
                  alignItems: 'center',
                  fontSize: '13px'
                }}>
                  <div>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: hcp.powerScore === 10 ? '#F59E0B' : 
                                       hcp.powerScore === 9 ? '#EAB308' :
                                       hcp.powerScore === 8 ? '#7C3AED' : '#3B82F6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: '600',
                      fontSize: '12px'
                    }}>
                      {hcp.powerScore}
                    </div>
                  </div>
                  <div style={{ fontWeight: '500' }}>{hcp.name}</div>
                  <div style={{ color: 'var(--text-secondary)' }}>{hcp.specialty}</div>
                  <div style={{ color: 'var(--text-secondary)' }}>{hcp.segment}</div>
                  <div>
                    <button style={{
                      background: 'transparent',
                      border: '1px solid var(--border-color)',
                      borderRadius: '4px',
                      padding: '0.25rem 0.5rem',
                      color: 'var(--primary-blue)',
                      fontSize: '11px',
                      cursor: 'pointer'
                    }}>
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => {
              onClose();
              if (onEditConfiguration) {
                onEditConfiguration(project);
              }
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m0 2v14h14V5H5m4 10h2v2H9v-2m0-8h2v6H9V7"/>
            </svg>
            Open Full Configuration
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewConfigurationModal;