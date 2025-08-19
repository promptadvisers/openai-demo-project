# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **demo/mockup application** for GSK Canada showcasing a Brand Strategy Agent that transforms pharmaceutical brand strategy documents into field-ready configurations. 

**CRITICAL: This is NOT a functional system** - it's designed as a visual demonstration with predetermined outcomes using Shingrix vaccine mock data.

## Project Type

- **Demo Platform**: Visual proof-of-concept for pharmaceutical companies
- **No Real Functionality**: All processing is simulated with delays and animations
- **Static Mock Data**: Everything uses hardcoded Shingrix data regardless of input
- **Presentation Tool**: Designed to demonstrate time savings (5-6 weeks → 15 minutes)

## Key Constraints

### What This System DOES
- Shows beautiful UI/UX flow for brand strategy transformation
- Simulates document upload and processing (45-second fake animation)
- Displays predetermined Shingrix configuration data
- Demonstrates pharmaceutical-grade visual design

### What This System DOES NOT Do
- ❌ Process real documents (any uploaded file is ignored)
- ❌ Make actual AI/API calls
- ❌ Store or persist any data
- ❌ Perform real calculations or analysis
- ❌ Have backend functionality

## Mock Data Structure

All demonstrations use this exact data regardless of input:

```javascript
const MOCK_DATA = {
  product: "Shingrix",
  company: "GSK Canada", 
  indication: "Herpes Zoster (Shingles) Prevention",
  primaryGoal: "Double the number of Canadians protected against Shingles",
  currentCoverage: "2.9M Canadians (23.5%)",
  targetGrowth: "3% CAGR by 2026",
  segments: [
    { name: "HZ Champions", percentage: 40, frequency: "Weekly" },
    { name: "Rising Stars", percentage: 30, frequency: "Bi-weekly" },
    { name: "Primary Care", percentage: 20, frequency: "Monthly" },
    { name: "Specialists", percentage: 10, frequency: "Quarterly" }
  ]
};
```

## Design System

### Color Palette (Exact Values Required)
```css
--primary-bg: #2A2D35        /* Dashboard background */
--card-bg: #1E2025           /* Card backgrounds */
--sidebar-bg: #1A1D23        /* Navigation sidebar */
--primary-blue: #4A90E2      /* Primary actions */
--text-primary: #FFFFFF      /* Headings */
--text-secondary: #9CA3AF    /* Descriptions */
--border-color: #374151      /* Borders */
--success: #10B981           /* Success states */
```

### Key UI Components
- Dark theme pharmaceutical platform aesthetic
- Smooth animations (300ms transitions)
- Professional modal system for workflow steps
- PowerScore visualization with color coding
- Animated progress bars for "processing" simulation

## User Journey Flow

1. **Dashboard** → Upload brand strategy document
2. **Upload Modal** → Drag-drop any file (not processed)
3. **Processing Screen** → 45-second animated fake processing
4. **Review Screen** → Always shows Shingrix extracted data
5. **Configuration Preview** → Displays mock BOB configuration
6. **Success Screen** → Shows completion metrics

## Demo Talking Points

Each screen supports these key messages:
- "Transform 5-6 weeks of work into 15 minutes"
- "Save $45,000-60,000 per brand template"
- "91% AI extraction success rate"
- "12M eligible Canadians opportunity"

## Implementation Notes

### Technology Approach
- Frontend-only (React or vanilla HTML/CSS/JS)
- No backend required
- Static hosting deployment
- All "processing" done with setTimeout() delays

### File Upload Handler Pattern
```javascript
// Don't process uploaded files - just simulate
async function handleUpload(file) {
  setUploading(true);
  await sleep(2000); // Fake upload delay
  setStep('processing');
  // Always proceed with same mock data
}
```

### Processing Simulation Pattern
```javascript
// Simulate multi-step processing
const steps = [
  { text: "Document analysis complete", delay: 10000 },
  { text: "Extracting strategy components...", delay: 10000 },
  { text: "Mapping to system configuration", delay: 15000 },
  { text: "Generating template", delay: 10000 }
];
```

## Development Focus

### Priority: Visual Polish Over Functionality
- Smooth animations and transitions
- Professional pharmaceutical UI aesthetic
- Convincing loading states and progress indicators
- GSK Canada branding consistency
- Desktop-focused responsive design

### Avoid Building
- Real file parsing or document processing
- API integrations or backend services
- Database connections or data persistence
- Complex error handling beyond basic UI
- Mobile-first responsive design

## Success Criteria

The demo succeeds when viewers believe they're seeing a real system capable of transforming pharmaceutical brand strategies into field configurations with significant time and cost savings, despite being entirely smoke and mirrors.