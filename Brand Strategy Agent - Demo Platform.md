## **PROJECT CONTEXT \- CRITICAL: READ FIRST**

**This is a DEMO/MOCKUP application. No actual functionality required.**

* ALL data is mock data from the Shingrix example  
* NO real document processing \- just simulate with delays  
* NO database \- everything is in-memory/hardcoded  
* NO real AI calls \- responses are predetermined  
* Focus on UI/UX flow and visual polish

## **Purpose**

Create a convincing demo that shows how pharmaceutical companies (GSK Canada) could transform brand strategy documents into field configurations. The demo should feel real but everything is smoke and mirrors with beautiful UI.

## **Design System \- EXACT SPECIFICATIONS**

### **Color Palette (Use these EXACT hex values)**

```css
/* Dark theme pharmaceutical platform */
--primary-bg: #2A2D35           /* Main dashboard background */
--card-bg: #1E2025              /* Card backgrounds */
--sidebar-bg: #1A1D23           /* Navigation sidebar */
--primary-blue: #4A90E2         /* Primary buttons, active states */
--text-primary: #FFFFFF         /* Main headings */
--text-secondary: #9CA3AF       /* Descriptions, metadata */
--border-color: #374151         /* Card borders */
--success: #10B981              /* Success states */
--warning: #F59E0B              /* Warning states */
--error: #EF4444                /* Error states */

/* PowerScore colors for HCP tables */
--ps-10: #F59E0B                /* Orange - Highest priority */
--ps-9: #EAB308                 /* Yellow - High priority */
--ps-8: #84CC16                 /* Green - Medium-high priority */
```

### **Typography**

* Font: Inter (Google Fonts)  
* Base size: 16px  
* Headings: 24px (semibold)  
* Body: 14px (regular)

## **User Journey \- Step by Step**

### **1\. Landing Page**

User sees: Projects dashboard with "New Template" button Mock data shows: 1 existing project "Shingrix Analysis (Q3 2024)"

### **2\. Upload Modal**

User action: Click "New Template" Shows: Beautiful drag-drop area User uploads: ANY file (PDF, PPTX, whatever \- we don't care) Simulate: Upload progress bar (fake 2-3 second delay)

### **3\. Processing Animation**

Show: "Analyzing Your Brand Strategy" with progress bar Simulate: 45 seconds of fake processing with steps:

* "Document analysis complete" ✓  
* "Extracting strategy components..." (spinning)  
* "Mapping to system configuration"  
* "Generating template"

### **4\. Extracted Strategy Review**

Display: Pre-filled Shingrix data in editable cards Always show the SAME data regardless of what was uploaded:

* Product: Shingrix  
* Goal: Double Canadians protected against Shingles  
* Growth Target: 3% CAGR by 2026  
* 4 HCP Segments (Champions, Rising Stars, Primary Care, Specialists)  
* Market Access: 66% → 75% private coverage target

### **5\. Configuration Preview**

Show: Generated BOB configuration Display: 35 HCP sample list with mock names PowerScore distribution visualization Always use the same configuration regardless of input

### **6\. Simulation Results**

Display: Pre-made charts and graphs Show: Overlap analysis, reach & frequency projections Numbers are all hardcoded \- no calculation needed

### **7\. Success Screen**

Show: "Template Created Successfully\!" Return to dashboard with new template visible

## **Mock Data to Use**

### **Sample HCPs (Always show these)**

```javascript
const mockHCPs = [
  { ps: 10, name: "Dr. Sarah Chen", specialty: "Infectious Disease", segment: "HZ Champion" },
  { ps: 10, name: "Dr. Michael Torres", specialty: "Internal Medicine", segment: "HZ Champion" },
  { ps: 9, name: "Dr. Jennifer Walsh", specialty: "Primary Care", segment: "Rising Star" },
  { ps: 9, name: "Dr. Ahmed Hassan", specialty: "Oncology", segment: "Rising Star" },
  { ps: 8, name: "Dr. Lisa Anderson", specialty: "Family Medicine", segment: "Primary Care" },
  // ... use the full list from the PRD
];
```

### **Extraction Results (Always return these)**

```javascript
const mockExtraction = {
  product: "Shingrix",
  indication: "Herpes Zoster (Shingles) Prevention",
  market: "Canada",
  primaryGoal: "Double the number of Canadians protected against Shingles",
  growthTarget: "3% CAGR by 2026",
  currentPosition: "2.9M Canadians protected, 23.5% immunization rate",
  // ... use full data from PRD
};
```

## **Implementation Approach**

### **File Upload Handler**

```javascript
// Don't actually process the file!
async function handleUpload(file) {
  // Just show upload animation
  setUploading(true);
  
  // Fake delay
  await sleep(2000);
  
  // Always proceed to "processing" regardless of file
  setStep('processing');
}
```

### **Processing Simulation**

```javascript
async function simulateProcessing() {
  const steps = [
    { text: "Document analysis complete", duration: 1000 },
    { text: "Extracting strategy components...", duration: 2000 },
    { text: "Mapping to system configuration", duration: 1500 },
    { text: "Generating template", duration: 1000 }
  ];
  
  for (const step of steps) {
    setCurrentStep(step.text);
    await sleep(step.duration);
  }
  
  // Always show the same extracted data
  setExtractedData(mockExtraction);
}
```

## **UI Components Needed**

### **Modals**

* Upload modal (with drag-drop zone)  
* Processing modal (with animated progress)  
* Review modal (large, with editable cards)  
* Configuration preview modal  
* Success modal

### **Cards**

* Project cards for dashboard  
* Strategy component cards (editable appearance but don't save)  
* HCP preview cards

### **Tables**

* HCP list table with PowerScore badges  
* Simulation results table

### **Charts (Static Images or Simple Divs)**

* Overlap analysis chart  
* Reach & frequency bar chart  
* ROI projection line chart

## **Important UI Details**

### **Animations**

* Smooth transitions between screens (300ms)  
* Progress bars should animate smoothly  
* Hover effects on all interactive elements  
* Loading spinners during "processing"

### **Responsive Design**

* Modals should be centered and responsive  
* Dashboard cards in grid layout  
* Mobile-friendly (though primarily desktop focused)

### **Professional Polish**

* Consistent spacing (8px base unit)  
* Rounded corners (6px for buttons, 8px for cards)  
* Subtle shadows on cards  
* Hover states for all clickable elements

## **What NOT to Build**

❌ NO actual file parsing ❌ NO real AI/Claude API calls  
 ❌ NO database connections ❌ NO authentication system ❌ NO real calculations ❌ NO data persistence ❌ NO error handling beyond UI ❌ NO complex state management

## **What TO Focus On**

✅ Beautiful, polished UI ✅ Smooth animations and transitions ✅ Convincing loading states ✅ Professional pharmaceutical aesthetic ✅ Clear user journey flow ✅ Impressive-looking dashboards ✅ Charts that look data-driven (but aren't)

## **Demo Script Support**

The demo should support this narrative:

1. "Upload your brand strategy document"  
2. "Our AI extracts key strategic components"  
3. "Review and validate the extraction"  
4. "Generate your BOB configuration"  
5. "Run simulations to test effectiveness"  
6. "Deploy to field teams"

Each step should feel real but use pre-determined data.

## **File Structure (Simple)**

```
src/
├── components/
│   ├── Dashboard.jsx
│   ├── UploadModal.jsx
│   ├── ProcessingModal.jsx
│   ├── ReviewModal.jsx
│   ├── ConfigPreview.jsx
│   └── SuccessScreen.jsx
├── data/
│   └── mockData.js  // ALL mock data here
├── styles/
│   └── globals.css  // Design system
└── App.jsx          // Main app logic
```

## **Tech Stack (Keep it SIMPLE)**

* React (or plain HTML/CSS/JS if simpler)  
* CSS for styling (or Tailwind)  
* No backend needed  
* No database needed  
* Deploy as static site

## **Key Messages to Reinforce**

Every screen should subtly reinforce:

* "5-6 weeks → 15 minutes"  
* "$45,000 saved per template"  
* "91% success rate"  
* "GSK Canada" branding

Remember: This is a DEMO. Make it look amazing, make it feel real, but don't build real functionality. The goal is to show what's POSSIBLE, not to build a working system.

