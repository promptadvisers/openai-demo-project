import React, { useState } from 'react';
import WorkflowStepIndicator from './WorkflowStepIndicator';

const CurationConfiguration = ({ 
  isOpen,
  onClose,
  projectData, 
  onReturnToUpload,
  onContinueToStep4,
  userType = 'internal' 
}) => {
  const [bucketSizes, setBucketSizes] = useState({
    A: 50,
    B: 25,
    C: 15,
    D: 10
  });

  const [bucketFrequencies, setBucketFrequencies] = useState({
    A: 70,
    B: 50,
    C: 30,
    D: 20,
    overflow: 10
  });

  const [maxListSize, setMaxListSize] = useState(30);
  const [isDragging, setIsDragging] = useState(null);
  const [selectedSpecialties, setSelectedSpecialties] = useState({
    'Specialty A': true,
    'Specialty B': true,
    'Specialty C': true,
    'Specialty D': true,
    'Specialty E': true,
    'Specialty F': true
  });

  const [selectedSegments, setSelectedSegments] = useState({
    'Segment A': false,
    'Segment B': false,
    'Segment C': false,
    'Segment D': false,
    'Segment E': false,
    'Segment F': false
  });

  // Mock HCP data with PowerScores - Diverse pharma names
  const hcpData = [
    { id: 1, name: 'Dr. Priya Patel', specialty: 'Endocrinology', segment: 'KOL Influencer', powerScore: 10 },
    { id: 2, name: 'Dr. Marcus Johnson', specialty: 'Internal Medicine', segment: 'High Prescriber', powerScore: 10 },
    { id: 3, name: 'Dr. Sophia Rodriguez', specialty: 'Cardiology', segment: 'Early Adopter', powerScore: 9 },
    { id: 4, name: 'Dr. Ahmed Hassan', specialty: 'Nephrology', segment: 'Volume Driver', powerScore: 9 },
    { id: 5, name: 'Dr. Grace O\'Brien', specialty: 'Family Practice', segment: 'Growth Potential', powerScore: 7 },
    { id: 6, name: 'Dr. Takeshi Yamamoto', specialty: 'Rheumatology', segment: 'Specialist Leader', powerScore: 7 },
    { id: 7, name: 'Dr. Rachel Goldstein', specialty: 'Pulmonology', segment: 'Regional Expert', powerScore: 5 },
    { id: 8, name: 'Dr. Chen Wei', specialty: 'Infectious Disease', segment: 'Research Leader', powerScore: 10 },
    { id: 9, name: 'Dr. Isabella Martinez', specialty: 'Oncology', segment: 'Treatment Innovator', powerScore: 9 },
    { id: 10, name: 'Dr. James Thompson', specialty: 'Gastroenterology', segment: 'Practice Builder', powerScore: 8 },
    { id: 11, name: 'Dr. Fatima Al-Rashid', specialty: 'Dermatology', segment: 'Digital Pioneer', powerScore: 8 },
    { id: 12, name: 'Dr. Michael O\'Connor', specialty: 'Emergency Medicine', segment: 'Protocol Developer', powerScore: 7 },
    { id: 13, name: 'Dr. Yuki Tanaka', specialty: 'Psychiatry', segment: 'Mental Health Advocate', powerScore: 7 },
    { id: 14, name: 'Dr. Sarah Williams', specialty: 'Pediatrics', segment: 'Child Health Expert', powerScore: 6 },
    { id: 15, name: 'Dr. Roberto Silva', specialty: 'Orthopedics', segment: 'Surgical Innovator', powerScore: 6 },
    { id: 16, name: 'Dr. Anna Kowalski', specialty: 'Radiology', segment: 'Imaging Specialist', powerScore: 5 },
    { id: 17, name: 'Dr. David Kim', specialty: 'Anesthesiology', segment: 'Safety Champion', powerScore: 5 },
    { id: 18, name: 'Dr. Maria Gonzalez', specialty: 'Obstetrics', segment: 'Women\'s Health Leader', powerScore: 8 },
    { id: 19, name: 'Dr. Erik Lindqvist', specialty: 'Neurology', segment: 'Brain Health Pioneer', powerScore: 9 },
    { id: 20, name: 'Dr. Aisha Okonkwo', specialty: 'Hematology', segment: 'Blood Disorder Expert', powerScore: 7 },
    { id: 21, name: 'Dr. Pierre Dubois', specialty: 'Urology', segment: 'Minimally Invasive Specialist', powerScore: 6 },
    { id: 22, name: 'Dr. Raj Sharma', specialty: 'Ophthalmology', segment: 'Vision Care Leader', powerScore: 8 },
    { id: 23, name: 'Dr. Lisa Anderson', specialty: 'Allergy & Immunology', segment: 'Immune System Expert', powerScore: 7 },
    { id: 24, name: 'Dr. Carlos Mendoza', specialty: 'Sports Medicine', segment: 'Athletic Performance Specialist', powerScore: 6 },
    { id: 25, name: 'Dr. Nadia Petrov', specialty: 'Plastic Surgery', segment: 'Reconstructive Pioneer', powerScore: 5 },
    { id: 26, name: 'Dr. Hassan Ali', specialty: 'Pathology', segment: 'Diagnostic Expert', powerScore: 7 },
    { id: 27, name: 'Dr. Jennifer Chang', specialty: 'Physical Medicine', segment: 'Rehabilitation Leader', powerScore: 6 },
    { id: 28, name: 'Dr. Alessandro Rossi', specialty: 'Vascular Surgery', segment: 'Circulation Specialist', powerScore: 8 },
    { id: 29, name: 'Dr. Kenji Nakamura', specialty: 'Geriatrics', segment: 'Aging Population Expert', powerScore: 7 },
    { id: 30, name: 'Dr. Emily Roberts', specialty: 'Critical Care', segment: 'ICU Specialist', powerScore: 9 },
    { id: 31, name: 'Dr. Omar Farouk', specialty: 'Thoracic Surgery', segment: 'Chest Surgery Expert', powerScore: 8 },
    { id: 32, name: 'Dr. Victoria Clarke', specialty: 'Pain Management', segment: 'Chronic Pain Specialist', powerScore: 6 },
    { id: 33, name: 'Dr. Hiroshi Sato', specialty: 'Nuclear Medicine', segment: 'Molecular Imaging Expert', powerScore: 5 },
    { id: 34, name: 'Dr. Leila Hosseini', specialty: 'Medical Genetics', segment: 'Genomic Medicine Pioneer', powerScore: 8 },
    { id: 35, name: 'Dr. Thomas Mueller', specialty: 'Occupational Medicine', segment: 'Workplace Health Expert', powerScore: 6 },
    { id: 36, name: 'Dr. Camila Santos', specialty: 'Tropical Medicine', segment: 'Global Health Advocate', powerScore: 7 },
    { id: 37, name: 'Dr. Benjamin Taylor', specialty: 'Sleep Medicine', segment: 'Sleep Disorder Specialist', powerScore: 6 },
    { id: 38, name: 'Dr. Zara Khan', specialty: 'Preventive Medicine', segment: 'Public Health Leader', powerScore: 7 },
    { id: 39, name: 'Dr. Lucas Andersson', specialty: 'Addiction Medicine', segment: 'Substance Abuse Expert', powerScore: 5 },
    { id: 40, name: 'Dr. Marta Kowalczyk', specialty: 'Palliative Care', segment: 'End-of-Life Care Specialist', powerScore: 8 },
    { id: 41, name: 'Dr. Rashid Mohammed', specialty: 'Transplant Surgery', segment: 'Organ Transplant Expert', powerScore: 9 },
    { id: 42, name: 'Dr. Sophie Laurent', specialty: 'Clinical Pharmacology', segment: 'Drug Development Specialist', powerScore: 7 },
    { id: 43, name: 'Dr. Alexei Volkov', specialty: 'Interventional Radiology', segment: 'Image-Guided Therapy Expert', powerScore: 8 },
    { id: 44, name: 'Dr. Priyanka Singh', specialty: 'Maternal-Fetal Medicine', segment: 'High-Risk Pregnancy Specialist', powerScore: 7 },
    { id: 45, name: 'Dr. Jean-Luc Martin', specialty: 'Hand Surgery', segment: 'Upper Extremity Specialist', powerScore: 6 },
    { id: 46, name: 'Dr. Yuki Watanabe', specialty: 'Reproductive Endocrinology', segment: 'Fertility Expert', powerScore: 8 },
    { id: 47, name: 'Dr. Antonio Ricci', specialty: 'Pediatric Surgery', segment: 'Children\'s Surgical Specialist', powerScore: 7 },
    { id: 48, name: 'Dr. Ingrid Hansen', specialty: 'Medical Oncology', segment: 'Cancer Treatment Leader', powerScore: 9 },
    { id: 49, name: 'Dr. Khalid Al-Mansouri', specialty: 'Cardiac Surgery', segment: 'Heart Surgery Pioneer', powerScore: 10 },
    { id: 50, name: 'Dr. Rebecca Foster', specialty: 'Neonatology', segment: 'Newborn Care Expert', powerScore: 8 }
  ];

  const handleSpecialtyToggle = (specialty) => {
    setSelectedSpecialties(prev => ({
      ...prev,
      [specialty]: !prev[specialty]
    }));
  };

  const handleSegmentToggle = (segment) => {
    setSelectedSegments(prev => ({
      ...prev,
      [segment]: !prev[segment]
    }));
  };

  const getPowerScoreColor = (score) => {
    if (score === 10) return '#F59E0B'; // Orange
    if (score === 9) return '#EAB308';  // Yellow
    if (score === 7) return '#7C3AED';  // Purple
    if (score === 5) return '#3B82F6';  // Blue
    return '#9CA3AF'; // Default gray
  };

  const getFrequencyText = (value) => {
    if (value === 0) return 'Never';
    if (value <= 20) return 'Rarely (Every 3 months)';
    if (value <= 40) return 'Occasionally (Every 6 weeks)';
    if (value <= 60) return 'Regularly (Every 4 weeks)';
    if (value <= 80) return 'Frequently (Every 2 weeks)';
    return 'Most often (Weekly)';
  };

  const handleSliderMouseDown = (e, bucket) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(bucket);
    
    const sliderTrack = e.currentTarget.closest('.slider-track') || e.currentTarget;
    const rect = sliderTrack.getBoundingClientRect();
    
    const handleMouseMove = (moveEvent) => {
      const x = moveEvent.clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      
      setBucketFrequencies(prev => ({
        ...prev,
        [bucket]: Math.round(percentage)
      }));
    };
    
    const handleMouseUp = () => {
      setIsDragging(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="modal-content workflow-modal step3-configure" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header" style={{ 
        padding: '2rem 2.5rem',
        borderBottom: '1px solid rgba(74, 144, 226, 0.1)',
        background: 'linear-gradient(135deg, rgba(42, 45, 53, 0.98) 0%, rgba(30, 32, 37, 0.98) 100%)'
      }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '700' }}>Step 3: Configure Strategy</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          {/* Workflow Step Indicator */}
          <WorkflowStepIndicator currentStep={3} userType={userType} variant="horizontal" />

          <div className="step-content">
            <div className="step-description" style={{
              background: 'linear-gradient(135deg, rgba(74, 144, 226, 0.08) 0%, rgba(53, 122, 189, 0.05) 100%)',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '2rem',
              border: '1px solid rgba(74, 144, 226, 0.15)'
            }}>
              <h3 style={{
                fontSize: '1.375rem',
                fontWeight: '700',
                marginBottom: '0.5rem',
                color: '#FFFFFF'
              }}>Configure Strategy</h3>
              <p style={{
                margin: 0,
                color: 'var(--text-secondary)',
                fontSize: '0.95rem'
              }}>
                Map brand strategy to simulation project template with HCP targeting and frequency settings
              </p>
            </div>

            <div className="curation-content">
              <div className="curation-sidebar">
              {/* Maximum List Size */}
              <div className="config-section">
                <h3>Maximum List Size</h3>
                <p className="section-description">Number of HCPs in curated list</p>
                <div className="number-input">
                  <input
                    type="number"
                    value={maxListSize}
                    onChange={(e) => setMaxListSize(parseInt(e.target.value))}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Bucket Configurations */}
              {['A', 'B', 'C', 'D'].map((bucket, index) => {
                const colors = ['#F59E0B', '#EAB308', '#7C3AED', '#3B82F6'];
                return (
                  <div key={bucket} className="config-section bucket-config">
                    <div className="bucket-header">
                      <div 
                        className="bucket-indicator"
                        style={{ backgroundColor: colors[index] }}
                      >
                        {bucket}
                      </div>
                      <h3>Bucket {bucket} Configs</h3>
                    </div>
                    
                    <div className="bucket-controls">
                      <div className="bucket-size">
                        <label>Bucket Size</label>
                        <p>Percentage of total list size</p>
                        <div className="size-control">
                          <span className="size-value">{bucketSizes[bucket]}%</span>
                        </div>
                      </div>
                      
                      <div className="relative-frequency">
                        <label>Relative Frequency</label>
                        <div className="frequency-slider">
                          <div 
                            className="slider-track"
                            onMouseDown={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect();
                              const x = e.clientX - rect.left;
                              const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
                              setBucketFrequencies(prev => ({
                                ...prev,
                                [bucket]: Math.round(percentage)
                              }));
                              handleSliderMouseDown(e, bucket);
                            }}
                            style={{ cursor: 'pointer', position: 'relative' }}
                          >
                            <div className="slider-fill" style={{ width: `${bucketFrequencies[bucket]}%`, backgroundColor: colors[index] }}></div>
                            <div 
                              className="slider-handle" 
                              style={{ 
                                left: `${bucketFrequencies[bucket]}%`, 
                                backgroundColor: colors[index], 
                                borderColor: '#1A1B1F',
                                cursor: 'grab'
                              }}
                              onMouseDown={(e) => {
                                e.stopPropagation();
                                handleSliderMouseDown(e, bucket);
                              }}
                            ></div>
                          </div>
                          <div className="slider-labels">
                            <span className="range-label">Never</span>
                            <span className="range-label">Most often</span>
                          </div>
                        </div>
                        <p className="frequency-description">Estimated Frequency: {getFrequencyText(bucketFrequencies[bucket])}</p>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Overflow Bucket */}
              <div className="config-section bucket-config">
                <div className="bucket-header">
                  <h3>Overflow Bucket Configs</h3>
                </div>
                
                <div className="bucket-controls">
                  <div className="relative-frequency">
                    <label>Relative Frequency</label>
                    <div className="frequency-slider">
                      <div 
                        className="slider-track"
                        onMouseDown={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const x = e.clientX - rect.left;
                          const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
                          setBucketFrequencies(prev => ({
                            ...prev,
                            overflow: Math.round(percentage)
                          }));
                          handleSliderMouseDown(e, 'overflow');
                        }}
                        style={{ cursor: 'pointer', position: 'relative' }}
                      >
                        <div className="slider-fill" style={{ width: `${bucketFrequencies.overflow}%`, backgroundColor: '#6B7280' }}></div>
                        <div 
                          className="slider-handle" 
                          style={{ 
                            left: `${bucketFrequencies.overflow}%`, 
                            backgroundColor: '#6B7280', 
                            borderColor: '#1A1B1F',
                            cursor: 'grab'
                          }}
                          onMouseDown={(e) => {
                            e.stopPropagation();
                            handleSliderMouseDown(e, 'overflow');
                          }}
                        ></div>
                      </div>
                      <div className="slider-labels">
                        <span className="range-label">Never</span>
                        <span className="range-label">Most often</span>
                      </div>
                    </div>
                    <p className="frequency-description">Estimated Frequency: {getFrequencyText(bucketFrequencies.overflow)}</p>
                  </div>
                </div>

                <div className="overflow-options">
                  <label className="checkbox-option">
                    <input type="checkbox" defaultChecked />
                    <span>Assign 0 PowerScore HCPs to overflow bucket</span>
                  </label>
                  <label className="checkbox-option">
                    <input type="checkbox" defaultChecked />
                    <span>Include upcoming appointments in curation</span>
                  </label>
                </div>
              </div>

              {/* Specialties */}
              <div className="config-section">
                <h3>Specialties</h3>
                <p className="section-description">
                  All specialties included by default, exclude any you don't want in the list.
                </p>
                <div className="checkbox-list">
                  {Object.entries(selectedSpecialties).map(([specialty, checked]) => (
                    <label key={specialty} className="checkbox-option">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleSpecialtyToggle(specialty)}
                      />
                      <span>{specialty}</span>
                      <span className="frequency-note">Estimated Frequency: Every 4 weeks</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Segments */}
              <div className="config-section">
                <h3>Segments</h3>
                <p className="section-description">
                  All segments included by default, select specific segments to filter the list.
                </p>
                <div className="checkbox-list">
                  {Object.entries(selectedSegments).map(([segment, checked]) => (
                    <label key={segment} className="checkbox-option">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleSegmentToggle(segment)}
                      />
                      <span>{segment}</span>
                      <span className="frequency-note">Estimated Frequency: Every 4 weeks</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* PowerScore Distribution Chart */}
              <div className="config-section">
                <h3>PowerScore Distribution</h3>
                <div className="powerscore-chart">
                  <div className="chart-container">
                    <div className="chart-bars">
                      <div className="chart-bar" style={{ height: '40%', background: '#F59E0B' }}>
                        <span className="bar-value">23%</span>
                        <span className="bar-label">10</span>
                      </div>
                      <div className="chart-bar" style={{ height: '35%', background: '#EAB308' }}>
                        <span className="bar-value">20%</span>
                        <span className="bar-label">9</span>
                      </div>
                      <div className="chart-bar" style={{ height: '25%', background: '#8B5CF6' }}>
                        <span className="bar-value">15%</span>
                        <span className="bar-label">8</span>
                      </div>
                      <div className="chart-bar" style={{ height: '45%', background: '#7C3AED' }}>
                        <span className="bar-value">25%</span>
                        <span className="bar-label">7</span>
                      </div>
                      <div className="chart-bar" style={{ height: '20%', background: '#6366F1' }}>
                        <span className="bar-value">12%</span>
                        <span className="bar-label">6</span>
                      </div>
                      <div className="chart-bar" style={{ height: '10%', background: '#3B82F6' }}>
                        <span className="bar-value">5%</span>
                        <span className="bar-label">5</span>
                      </div>
                    </div>
                    <div className="chart-axis">
                      <span className="axis-label">PowerScore Distribution</span>
                    </div>
                  </div>
                  <div className="chart-legend">
                    <div className="legend-item">
                      <div className="legend-color" style={{ background: '#F59E0B' }}></div>
                      <span>Top Tier (10)</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-color" style={{ background: '#EAB308' }}></div>
                      <span>High Value (9)</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-color" style={{ background: '#7C3AED' }}></div>
                      <span>Growth (7-8)</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-color" style={{ background: '#3B82F6' }}></div>
                      <span>Standard (5-6)</span>
                    </div>
                  </div>
                </div>
              </div>
              </div>

              <div className="curation-main">
              {/* Median Region HCPs */}
                             <div className="hcp-table-container" style={{
                 background: 'rgba(30, 32, 37, 0.5)',
                 borderRadius: '12px',
                 padding: '1.25rem',
                 border: '1px solid rgba(74, 144, 226, 0.1)',
                 marginBottom: '1.5rem'
               }}>
                 <div className="table-header" style={{
                   display: 'flex',
                   justifyContent: 'space-between',
                   alignItems: 'center',
                   marginBottom: '1rem'
                 }}>
                   <h3 style={{
                     fontSize: '1.125rem',
                     fontWeight: '600',
                     color: '#FFFFFF',
                     margin: 0
                   }}>Median Region (100 HCPs)</h3>
                   <button className="expand-button" style={{
                     background: 'transparent',
                     border: 'none',
                     color: '#9CA3AF',
                     cursor: 'pointer',
                     padding: '0.25rem'
                   }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="15,18 9,12 15,6"></polyline>
                    </svg>
                  </button>
                </div>
                
                <div className="hcp-table">
                  <div className="table-headers" style={{
                    display: 'grid',
                    gridTemplateColumns: '60px 1fr 1fr 1fr',
                    gap: '1rem',
                    padding: '0.75rem 1rem',
                    background: 'rgba(55, 65, 81, 0.3)',
                    borderRadius: '8px 8px 0 0',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                    color: '#9CA3AF',
                    border: '1px solid rgba(55, 65, 81, 0.3)',
                    borderBottom: 'none'
                  }}>
                    <div className="header-cell">PS</div>
                    <div className="header-cell">NAME</div>
                    <div className="header-cell">SPECIALTY</div>
                    <div className="header-cell">SEGMENT</div>
                  </div>
                  
                  <div className="table-body" style={{
                    maxHeight: '400px',
                    overflowY: 'auto',
                    borderRadius: '0 0 8px 8px',
                    border: '1px solid rgba(55, 65, 81, 0.3)',
                    borderTop: 'none',
                    minHeight: '200px'
                  }}>
                    <div style={{ padding: '1rem', color: '#FFFFFF', fontSize: '0.875rem' }}>
                      Data length: {hcpData ? hcpData.length : 'undefined'}
                    </div>
                    {hcpData && hcpData.length > 0 ? hcpData.map((hcp, index) => (
                      <div key={hcp.id} style={{
                        display: 'grid',
                        gridTemplateColumns: '60px 1fr 1fr 1fr',
                        gap: '1rem',
                        padding: '0.75rem 1rem',
                        borderBottom: index < hcpData.length - 1 ? '1px solid rgba(55, 65, 81, 0.2)' : 'none',
                        alignItems: 'center',
                        background: 'rgba(30, 32, 37, 0.3)',
                        transition: 'background 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(74, 144, 226, 0.1)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(30, 32, 37, 0.3)'}
                      >
                        <div style={{
                          display: 'flex',
                          justifyContent: 'center'
                        }}>
                          <div 
                            style={{ 
                              backgroundColor: getPowerScoreColor(hcp.powerScore),
                              color: 'white',
                              width: '28px',
                              height: '28px',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.75rem',
                              fontWeight: '700'
                            }}
                          >
                            {hcp.powerScore}
                          </div>
                        </div>
                        <div style={{ 
                          color: '#FFFFFF',
                          fontSize: '0.875rem',
                          fontWeight: '500'
                        }}>{hcp.name}</div>
                        <div style={{ 
                          color: '#9CA3AF',
                          fontSize: '0.875rem'
                        }}>{hcp.specialty}</div>
                        <div style={{ 
                          color: '#9CA3AF',
                          fontSize: '0.875rem'
                        }}>{hcp.segment}</div>
                      </div>
                    )) : (
                      <div style={{
                        padding: '2rem',
                        textAlign: 'center',
                        color: '#9CA3AF'
                      }}>
                        No HCP data available
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Sample Curated List */}
                             <div className="hcp-table-container" style={{
                 background: 'rgba(30, 32, 37, 0.5)',
                 borderRadius: '12px',
                 padding: '1.25rem',
                 border: '1px solid rgba(74, 144, 226, 0.1)',
                 marginTop: '1.5rem'
               }}>
                 <div className="table-header" style={{
                   display: 'flex',
                   justifyContent: 'space-between',
                   alignItems: 'center',
                   marginBottom: '1rem'
                 }}>
                   <h3 style={{
                     fontSize: '1.125rem',
                     fontWeight: '600',
                     color: '#FFFFFF',
                     margin: 0
                   }}>Sample Curated List (30 HCPs)</h3>
                   <button className="expand-button" style={{
                     background: 'transparent',
                     border: 'none',
                     color: '#9CA3AF',
                     cursor: 'pointer',
                     padding: '0.25rem'
                   }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="15,18 9,12 15,6"></polyline>
                    </svg>
                  </button>
                </div>
                
                <div className="hcp-table">
                  <div className="table-headers" style={{
                    display: 'grid',
                    gridTemplateColumns: '60px 1fr 1fr 1fr',
                    gap: '1rem',
                    padding: '0.75rem 1rem',
                    background: 'rgba(55, 65, 81, 0.3)',
                    borderRadius: '8px 8px 0 0',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                    color: '#9CA3AF',
                    border: '1px solid rgba(55, 65, 81, 0.3)',
                    borderBottom: 'none'
                  }}>
                    <div className="header-cell">PS</div>
                    <div className="header-cell">NAME</div>
                    <div className="header-cell">SPECIALTY</div>
                    <div className="header-cell">SEGMENT</div>
                  </div>
                  
                  <div className="table-body" style={{
                    maxHeight: '400px',
                    overflowY: 'auto',
                    borderRadius: '0 0 8px 8px',
                    border: '1px solid rgba(55, 65, 81, 0.3)',
                    borderTop: 'none',
                    minHeight: '200px'
                  }}>
                    <div style={{ padding: '1rem', color: '#FFFFFF', fontSize: '0.875rem' }}>
                      Sample Data length: {hcpData ? hcpData.length : 'undefined'}
                    </div>
                    {hcpData && hcpData.length > 0 ? hcpData.slice(0, 30).map((hcp, index) => (
                      <div key={`sample-${hcp.id}`} style={{
                        display: 'grid',
                        gridTemplateColumns: '60px 1fr 1fr 1fr',
                        gap: '1rem',
                        padding: '0.75rem 1rem',
                        borderBottom: index < 29 ? '1px solid rgba(55, 65, 81, 0.2)' : 'none',
                        alignItems: 'center',
                        background: 'rgba(30, 32, 37, 0.3)',
                        transition: 'background 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(74, 144, 226, 0.1)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(30, 32, 37, 0.3)'}
                      >
                        <div style={{
                          display: 'flex',
                          justifyContent: 'center'
                        }}>
                          <div 
                            style={{ 
                              backgroundColor: getPowerScoreColor(hcp.powerScore),
                              color: 'white',
                              width: '28px',
                              height: '28px',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.75rem',
                              fontWeight: '700'
                            }}
                          >
                            {hcp.powerScore}
                          </div>
                        </div>
                        <div style={{ 
                          color: '#FFFFFF',
                          fontSize: '0.875rem',
                          fontWeight: '500'
                        }}>{hcp.name}</div>
                        <div style={{ 
                          color: '#9CA3AF',
                          fontSize: '0.875rem'
                        }}>{hcp.specialty}</div>
                        <div style={{ 
                          color: '#9CA3AF',
                          fontSize: '0.875rem'
                        }}>{hcp.segment}</div>
                      </div>
                    )) : (
                      <div style={{
                        padding: '2rem',
                        textAlign: 'center',
                        color: '#9CA3AF'
                      }}>
                        No HCP data available
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer" style={{ 
          position: 'sticky', 
          bottom: '0', 
          backgroundColor: 'var(--modal-bg)', 
          borderTop: '1px solid var(--border-color)', 
          padding: '1.5rem 2rem',
          margin: '0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.1)'
        }}>
          <button className="btn btn-secondary" onClick={onReturnToUpload}>
            ← Back to Review
          </button>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn btn-secondary">Save as Draft</button>
            <button className="btn btn-primary" onClick={onContinueToStep4}>
              Continue to Simulations
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default CurationConfiguration;