// Mock data for GSK Canada Shingrix Brand Strategy Demo
// This data is used throughout the application regardless of user input

export const MOCK_DATA = {
  product: "Shingrix",
  company: "GSK Canada",
  indication: "Herpes Zoster (Shingles) Prevention",
  primaryGoal: "Double the number of Canadians protected against Shingles",
  currentCoverage: "2.9M Canadians (23.5%)",
  targetGrowth: "3% CAGR by 2026",
  
  // Strategic objectives extracted from "brand strategy document"
  objectives: [
    {
      id: 1,
      title: "Market Expansion",
      description: "Increase market penetration among eligible Canadians aged 50+",
      powerScore: 8.5,
      priority: "High"
    },
    {
      id: 2,
      title: "HCP Education",
      description: "Enhance healthcare provider awareness and recommendation rates",
      powerScore: 7.8,
      priority: "High"
    },
    {
      id: 3,
      title: "Patient Awareness",
      description: "Drive direct-to-consumer awareness through digital channels",
      powerScore: 6.9,
      priority: "Medium"
    },
    {
      id: 4,
      title: "Access & Reimbursement",
      description: "Improve patient access through formulary optimization",
      powerScore: 7.2,
      priority: "High"
    }
  ],

  // Target audience segments for BOB configuration
  segments: [
    {
      id: 1,
      name: "HZ Champions",
      description: "High-prescribing HCPs who actively recommend shingles vaccination",
      percentage: 40,
      frequency: "Weekly",
      powerScore: 9.2,
      targetActions: ["Product updates", "Clinical data", "Patient materials"],
      estimatedReach: "2,400 HCPs"
    },
    {
      id: 2,
      name: "Rising Stars",
      description: "Moderate prescribers with growth potential",
      percentage: 30,
      frequency: "Bi-weekly",
      powerScore: 7.1,
      targetActions: ["Educational content", "Case studies", "Peer insights"],
      estimatedReach: "1,800 HCPs"
    },
    {
      id: 3,
      name: "Primary Care",
      description: "General practitioners serving eligible patient populations",
      percentage: 20,
      frequency: "Monthly",
      powerScore: 6.8,
      targetActions: ["Disease awareness", "Guidelines", "Tools"],
      estimatedReach: "1,200 HCPs"
    },
    {
      id: 4,
      name: "Specialists",
      description: "Infectious disease and immunology specialists",
      percentage: 10,
      frequency: "Quarterly",
      powerScore: 8.7,
      targetActions: ["Research updates", "KOL insights", "Advisory participation"],
      estimatedReach: "600 HCPs"
    }
  ],

  // Market opportunity data
  marketData: {
    totalEligibleCanadians: "12.3M",
    currentVaccinationRate: "23.5%",
    targetVaccinationRate: "47%",
    marketPotential: "$890M",
    competitorShare: {
      shingrix: 89,
      zostavax: 8,
      other: 3
    }
  },

  // BOB Configuration Preview Data
  bobConfiguration: {
    campaignName: "Shingrix Champions 2024",
    duration: "12 months",
    totalTouchpoints: 847,
    channels: [
      {
        name: "Email",
        percentage: 45,
        frequency: "Bi-weekly",
        content: ["Clinical updates", "Patient stories", "Practice tools"]
      },
      {
        name: "Digital Ads",
        percentage: 25,
        frequency: "Weekly",
        content: ["Product messaging", "Disease awareness", "Call-to-action"]
      },
      {
        name: "Sales Rep Visits",
        percentage: 20,
        frequency: "Monthly",
        content: ["Face-to-face meetings", "Sample drops", "Educational materials"]
      },
      {
        name: "Events & Webinars",
        percentage: 10,
        frequency: "Quarterly",
        content: ["CME programs", "Peer discussions", "Expert panels"]
      }
    ],
    expectedOutcomes: {
      engagementLift: "+34%",
      prescriptionGrowth: "+18%",
      reachExpansion: "+2,100 HCPs",
      roi: "4.2x"
    }
  },

  // Processing simulation steps
  processingSteps: [
    {
      id: 1,
      text: "Analyzing uploaded document structure...",
      duration: 8000,
      progress: 20
    },
    {
      id: 2,
      text: "Extracting strategic objectives and KPIs...",
      duration: 12000,
      progress: 45
    },
    {
      id: 3,
      text: "Identifying target audience segments...",
      duration: 10000,
      progress: 70
    },
    {
      id: 4,
      text: "Mapping to BOB configuration templates...",
      duration: 8000,
      progress: 85
    },
    {
      id: 5,
      text: "Generating field-ready configuration...",
      duration: 7000,
      progress: 100
    }
  ],

  // Success metrics for final screen
  successMetrics: {
    timeSaved: "5.3 weeks",
    costSaved: "$52,000",
    accuracyRate: "91%",
    configurationScore: "8.7/10",
    readyForDeployment: true
  },

  // Demo talking points
  talkingPoints: {
    timeEfficiency: "Transform 5-6 weeks of manual work into 15 minutes",
    costSavings: "Save $45,000-60,000 per brand template configuration",
    accuracy: "91% AI extraction success rate with human validation",
    scale: "12M eligible Canadians represent significant growth opportunity"
  }
};

// Utility functions for mock data manipulation
export const getMockProcessingStep = (stepIndex) => {
  return MOCK_DATA.processingSteps[stepIndex] || MOCK_DATA.processingSteps[0];
};

export const getMockSegmentByName = (segmentName) => {
  return MOCK_DATA.segments.find(segment => 
    segment.name.toLowerCase().includes(segmentName.toLowerCase())
  ) || MOCK_DATA.segments[0];
};

export const calculateMockProgress = (currentTime, totalTime) => {
  return Math.min(Math.round((currentTime / totalTime) * 100), 100);
};

// Simulated delay function for processing animations
export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock file upload response
export const mockUploadResponse = {
  success: true,
  filename: "GSK_Shingrix_Brand_Strategy_2024.pdf",
  fileSize: "2.4 MB",
  uploadTime: new Date().toISOString(),
  documentType: "Brand Strategy Document",
  extractedPages: 47
};

export default MOCK_DATA;