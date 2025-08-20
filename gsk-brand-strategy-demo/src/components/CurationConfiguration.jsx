import React, { useState, useRef } from 'react';

const CurationConfiguration = () => {
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
    { id: 7, name: 'Dr. Rachel Goldstein', specialty: 'Pulmonology', segment: 'Regional Expert', powerScore: 5 }
  ];

  const handleBucketSizeChange = (bucket, value) => {
    setBucketSizes(prev => ({
      ...prev,
      [bucket]: value
    }));
  };

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

  return (
    <div className="curation-configuration">
      <div className="curation-header">
        <div className="breadcrumb">
          <span>Curation Configuration</span>
          <span className="breadcrumb-separator">/</span>
          <span>Product Line Configs</span>
        </div>
        <div className="curation-actions">
          <button className="btn btn-secondary">Cancel</button>
          <button className="btn btn-primary">Save Configs</button>
        </div>
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
        </div>

        <div className="curation-main">
          {/* Median Region HCPs */}
          <div className="hcp-table-container">
            <div className="table-header">
              <h3>Median Region (100 HCPs)</h3>
              <button className="expand-button">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15,18 9,12 15,6"></polyline>
                </svg>
              </button>
            </div>
            
            <div className="hcp-table">
              <div className="table-headers">
                <div className="header-cell">PS</div>
                <div className="header-cell">Name</div>
                <div className="header-cell">Specialty</div>
                <div className="header-cell">Segment</div>
              </div>
              
              <div className="table-body">
                {hcpData.map((hcp) => (
                  <div key={hcp.id} className="table-row">
                    <div className="cell powerscore-cell">
                      <div 
                        className="powerscore-badge"
                        style={{ backgroundColor: getPowerScoreColor(hcp.powerScore) }}
                      >
                        {hcp.powerScore}
                      </div>
                    </div>
                    <div className="cell">{hcp.name}</div>
                    <div className="cell">{hcp.specialty}</div>
                    <div className="cell">{hcp.segment}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sample Curated List */}
          <div className="hcp-table-container">
            <div className="table-header">
              <h3>Sample Curated List (30 HCPs)</h3>
              <button className="expand-button">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15,18 9,12 15,6"></polyline>
                </svg>
              </button>
            </div>
            
            <div className="hcp-table">
              <div className="table-headers">
                <div className="header-cell">PS</div>
                <div className="header-cell">Name</div>
                <div className="header-cell">Specialty</div>
                <div className="header-cell">Segment</div>
              </div>
              
              <div className="table-body">
                {hcpData.map((hcp) => (
                  <div key={`sample-${hcp.id}`} className="table-row">
                    <div className="cell powerscore-cell">
                      <div 
                        className="powerscore-badge"
                        style={{ backgroundColor: getPowerScoreColor(hcp.powerScore) }}
                      >
                        {hcp.powerScore}
                      </div>
                    </div>
                    <div className="cell">{hcp.name}</div>
                    <div className="cell">{hcp.specialty}</div>
                    <div className="cell">{hcp.segment}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurationConfiguration;