import React, { useState } from 'react';

const CurationConfiguration = () => {
  const [bucketSizes, setBucketSizes] = useState({
    A: 50,
    B: 25,
    C: 15,
    D: 10
  });

  const [maxListSize, setMaxListSize] = useState(30);
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

  // Mock HCP data with PowerScores
  const hcpData = [
    { id: 1, name: 'Crystal Ball', specialty: 'Obstetric Advisor', segment: 'Obstetric Advisor', powerScore: 10, color: '#F59E0B' },
    { id: 2, name: 'Meridian Kryat', specialty: 'Obstetric Expert', segment: 'Starter', powerScore: 10, color: '#F59E0B' },
    { id: 3, name: 'George Smith', specialty: 'Lorem Ipsum', segment: 'Lorem Ipsum', powerScore: 9, color: '#EAB308' },
    { id: 4, name: 'Samantha White', specialty: 'Obstetric Advisor', segment: 'Obstetric Advisor', powerScore: 9, color: '#EAB308' },
    { id: 5, name: 'Alexander Lee', specialty: 'Obstetric Expert', segment: 'Obstetric Expert', powerScore: 7, color: '#7C3AED' },
    { id: 6, name: 'Olivia Johnson', specialty: 'Lorem Ipsum', segment: 'Lorem Ipsum', powerScore: 7, color: '#7C3AED' },
    { id: 7, name: 'Ethan Brown', specialty: 'Obstetric Advisor', segment: 'Obstetric Advisor', powerScore: 5, color: '#3B82F6' }
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
                      <div className="slider-track">
                        <div className="slider-range">
                          <span className="range-label">Never</span>
                          <div className="slider-handle" style={{ left: '70%' }}></div>
                          <span className="range-label">Most often</span>
                        </div>
                      </div>
                      <p className="frequency-description">Estimated Frequency: Every 4 weeks</p>
                    </div>
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
                  <div className="slider-track">
                    <div className="slider-range">
                      <span className="range-label">Never</span>
                      <div className="slider-handle" style={{ left: '30%' }}></div>
                      <span className="range-label">Most often</span>
                    </div>
                  </div>
                  <p className="frequency-description">Estimated Frequency: Never</p>
                </div>
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