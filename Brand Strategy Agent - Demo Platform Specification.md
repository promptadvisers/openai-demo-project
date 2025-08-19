## **Mock Pharmaceutical Configuration Platform for GSK Canada**

---

## **CRITICAL: This is a DEMO Application**

### **What This Is**

* A **visual demonstration** of how brand strategy transformation could work  
* A **mockup platform** with predetermined outcomes  
* A **sales/presentation tool** to show the concept  
* Everything uses **Shingrix mock data** regardless of input

### **What This Is NOT**

* NOT a functional system  
* NOT processing real documents  
* NOT making real AI calls  
* NOT storing any data  
* NOT calculating anything

---

## **Executive Summary**

The Brand Strategy Agent demo showcases how pharmaceutical companies could transform brand strategy documents into field-ready configurations in just 15 minutes instead of 5-6 weeks. This demo platform walks users through a realistic-feeling workflow using GSK's Shingrix vaccine as the example throughout.

**Demo Value Proposition**: Show stakeholders a polished vision of automated brand strategy operationalization without building actual functionality.

---

## **Complete User Journey**

### **Screen 1: Projects Dashboard**

**What User Sees:**

```
Brand Strategy Agent
├── Customer: GSK Canada (top left)
├── Sidebar Navigation:
│   ├── Projects (active)
│   ├── Templates
│   ├── Curation Configuration
│   └── Analytics
├── Main Content:
│   ├── "Projects" heading
│   ├── [New Template] button (gray)
│   ├── [New Project] button (blue)
│   └── Sample Project Card:
│       ├── "Shingrix Analysis (Q3 2024)"
│       ├── "Herpes Zoster Vaccine"
│       └── Status: "Project is still executing"
```

**User Action**: Click "New Template" **Result**: Upload modal opens

---

### **Screen 2: Brand Strategy Upload Modal**

**What User Sees:**

```
Modal: "Create Brand Strategy Template"
├── Drag-and-drop zone with upload icon
├── "Drag and drop your brand strategy document"
├── "or click to browse"
├── "Supported formats: PPTX, PDF, DOCX"
└── [Upload Document] button (disabled until file selected)
```

**Behind the Scenes**: User can upload ANY file \- we don't actually process it **Visual Feedback**: Show filename and size when selected **User Action**: Upload any file **Result**: 2-second fake upload, then processing screen

---

### **Screen 3: Document Processing (45 seconds simulated)**

**What User Sees:**

```
Modal: "Analyzing Your Brand Strategy"
├── File info: [Whatever file they uploaded]
├── Progress bar animating 0% → 100%
├── Processing steps appearing one by one:
│   ├── ✅ "Document analysis complete" (after 10 seconds)
│   ├── 🔄 "Extracting strategy components..." (at 20 seconds)
│   ├── ⏳ "Mapping to system configuration" (at 30 seconds)
│   └── ⏳ "Generating template" (at 40 seconds)
└── Subtle pulsing animation
```

**Implementation**: Simple setTimeout() for each step **Result**: Auto-transition to review screen

---

### **Screen 4: Extracted Strategy Review**

**Always Shows This Data** (regardless of upload):

```
Modal: "Review & Validate Extracted Information"
├── "✅ High Confidence Extraction (87%)"
├── Product Information Card:
│   ├── Product Name: "Shingrix"
│   ├── Indication: "Herpes Zoster (Shingles) Prevention"
│   ├── Therapeutic Area: "Vaccines/Immunology"
│   ├── Market: "Canada"
│   └── Strategic Period: "2024-2026"
├── Business Objectives Card:
│   ├── Primary Goal: "Double the number of Canadians protected"
│   ├── Growth Target: "3% CAGR by 2026"
│   ├── Current Position: "2.9M Canadians protected"
│   └── Market Opportunity: "12M eligible Canadians"
├── HCP Segments Card:
│   ├── HZ Champions: "Leaders in medical education"
│   ├── HZ Rising Stars: "Building advocacy"
│   ├── Primary Care: "Over-burdened GPs"
│   └── Specialists: "Alternative vaccinators"
└── [Generate Configuration] button
```

**Interaction**: Cards appear editable but changes don't persist **User Action**: Click "Generate Configuration" **Result**: 30-second configuration animation

---

### **Screen 5: Configuration Generation**

**What User Sees:**

```
Modal: "Creating Your BOB Template"
├── Progress bar: 0% → 100% over 30 seconds
├── Current step updates:
│   ├── "Template type selection..." (0-25%)
│   ├── "HCP segmentation mapping..." (25-50%)
│   ├── "Curation bucket configuration..." (50-75%)
│   └── "PowerScore weighting calculation..." (75-100%)
└── Processing animation
```

**Result**: Auto-transition to preview

---

### **Screen 6: BOB Configuration Preview**

**Always Shows:**

```
Modal: "Generated Configuration Preview" (1200px wide)
├── Left Column - Configuration:
│   ├── Template Type: "Specialty Product - Vaccines"
│   ├── Curation Buckets:
│   │   ├── HZ Champions: 40% - Weekly
│   │   ├── Rising Stars: 30% - Bi-weekly
│   │   ├── Primary Care: 20% - Monthly
│   │   └── Specialists: 10% - Quarterly
│   └── PowerScore Weights:
│       ├── HZ Patient Volume: 35%
│       ├── Shingrix History: 25%
│       └── Adult Vaccine Advocacy: 20%
├── Right Column - HCP Preview:
│   └── Sample HCP Table (35 rows):
│       ├── PS | Name | Specialty | Segment
│       ├── 10 | Dr. Sarah Chen | ID | Champion
│       ├── 10 | Dr. Michael Torres | IM | Champion
│       ├── 9 | Dr. Jennifer Walsh | PC | Rising Star
│       └── [32 more mock HCPs...]
└── [Create Template] button
```

---

### **Screen 7: Template Creation Form**

**Pre-filled Form:**

```
Template Name: "Shingrix Canada Strategic Template 2024-2026"
Description: [Pre-filled description about Shingrix strategy]
Category: "Specialty Product - Post Launch - Vaccines"
Sharing: ☑️ Share with GSK Canada Strategic Team

Impact Metrics (display only):
├── "Manual Configuration Time: 5-6 weeks"
├── "AI-Generated Time: 15 minutes"
└── "Estimated Savings: $45,000-60,000"

[Create Template] button
```

---

### **Screen 8: Success Screen**

```
✅ "Shingrix Template Ready!"
Template ID: TMPLT-SHX-CA-240815-001

Options:
├── [Run Simulation Now]
├── [View Template Details]
└── [Return to Dashboard]
```

---

## **Mock Data Structure**

### **Always Use This Data**

```javascript
const MOCK_DATA = {
  // Shingrix Strategy
  strategy: {
    product: "Shingrix",
    company: "GSK Canada",
    indication: "Herpes Zoster (Shingles) Prevention",
    goal: "Double the number of Canadians protected against Shingles",
    currentCoverage: "2.9M Canadians (23.5%)",
    targetGrowth: "3% CAGR by 2026",
    marketSize: "12M eligible Canadians"
  },
  
  // HCP Segments
  segments: [
    { name: "HZ Champions", size: 45, frequency: "Weekly", percentage: 40 },
    { name: "Rising Stars", size: 89, frequency: "Bi-weekly", percentage: 30 },
    { name: "Primary Care", size: 127, frequency: "Monthly", percentage: 20 },
    { name: "Specialists", size: 73, frequency: "Quarterly", percentage: 10 }
  ],
  
  // Sample HCPs (show first 35)
  hcps: [
    { ps: 10, name: "Dr. Sarah Chen", specialty: "Infectious Disease", segment: "HZ Champion", location: "Toronto, ON" },
    { ps: 10, name: "Dr. Michael Torres", specialty: "Internal Medicine", segment: "HZ Champion", location: "Montreal, QC" },
    { ps: 9, name: "Dr. Jennifer Walsh", specialty: "Primary Care", segment: "Rising Star", location: "Vancouver, BC" },
    { ps: 9, name: "Dr. Ahmed Hassan", specialty: "Oncology", segment: "Rising Star", location: "Calgary, AB" },
    { ps: 8, name: "Dr. Lisa Anderson", specialty: "Family Medicine", segment: "Primary Care", location: "Ottawa, ON" },
    { ps: 7, name: "Dr. David Kim", specialty: "Rheumatology", segment: "Specialists", location: "Winnipeg, MB" },
    // ... generate 29 more with similar pattern
  ],
  
  // Metrics to display
  metrics: {
    timeSaved: "5-6 weeks → 15 minutes",
    costSaved: "$45,000-60,000",
    successRate: "91%",
    configurationsCreated: 23
  }
};
```

---

## **Design System Implementation**

### **Colors (MUST use these exact values)**

```css
:root {
  /* Backgrounds */
  --primary-bg: #2A2D35;
  --card-bg: #1E2025;
  --sidebar-bg: #1A1D23;
  
  /* Primary Actions */
  --primary-blue: #4A90E2;
  --primary-blue-hover: #3A7BD5;
  
  /* Text */
  --text-primary: #FFFFFF;
  --text-secondary: #9CA3AF;
  --text-muted: #6B7280;
  
  /* Borders */
  --border-color: #374151;
  --border-light: #4B5563;
  
  /* Status */
  --success: #10B981;
  --warning: #F59E0B;
  --error: #EF4444;
  
  /* PowerScore Colors */
  --ps-10: #F59E0B;
  --ps-9: #EAB308;
  --ps-8: #84CC16;
  --ps-7: #8B5CF6;
}
```

### **Components**

#### **Navigation Sidebar**

```css
.sidebar {
  width: 240px;
  background: var(--sidebar-bg);
  border-right: 1px solid var(--border-color);
  padding: 0;
}

.sidebar-item {
  padding: 12px 24px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}

.sidebar-item:hover {
  background: rgba(74, 144, 226, 0.1);
  color: var(--text-primary);
}

.sidebar-item.active {
  background: rgba(74, 144, 226, 0.2);
  color: var(--primary-blue);
  border-right: 2px solid var(--primary-blue);
}
```

#### **Cards**

```css
.card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 24px;
  transition: all 0.2s;
}

.card:hover {
  border-color: var(--border-light);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

#### **Modals**

```css
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: var(--card-bg);
  border-radius: 12px;
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);
  max-width: 600px;
  width: 90%;
}

.modal-large {
  max-width: 1200px;
}
```

#### **Buttons**

```css
.btn {
  padding: 10px 16px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: var(--primary-blue);
  color: white;
  border: none;
}

.btn-primary:hover {
  background: var(--primary-blue-hover);
}

.btn-secondary {
  background: #6B7280;
  color: white;
  border: none;
}
```

---

## **Implementation Guidelines**

### **Simple Tech Stack**

* **Frontend Only**: React or vanilla HTML/CSS/JS  
* **No Backend**: Everything is client-side  
* **Mock Data**: Hardcoded in JavaScript files  
* **Animations**: CSS transitions and setTimeout()  
* **Deployment**: Static hosting (Netlify, Vercel, GitHub Pages)

### **File Structure (Keep it Simple)**

```
/
├── index.html
├── styles.css
├── app.js
├── mockData.js
└── assets/
    └── gsk-logo.png
```

### **Key Functions**

```javascript
// Simulate upload
function handleUpload(file) {
  showUploadProgress();
  setTimeout(() => {
    showProcessingScreen();
  }, 2000);
}

// Simulate processing
function simulateProcessing() {
  const steps = [
    { text: "Document analysis complete", delay: 10000 },
    { text: "Extracting strategy components...", delay: 10000 },
    { text: "Mapping to system configuration", delay: 15000 },
    { text: "Generating template", delay: 10000 }
  ];
  
  steps.forEach((step, index) => {
    setTimeout(() => {
      updateProcessingStep(step.text);
      updateProgress((index + 1) * 25);
    }, step.delay);
  });
  
  setTimeout(() => {
    showExtractedData(MOCK_DATA.strategy);
  }, 45000);
}

// Always show same data
function showExtractedData() {
  // Display mock Shingrix data
  // Don't actually extract anything from uploaded file
}
```

---

## **Demo Talking Points**

Each screen supports these key messages:

### **Upload Screen**

"Simply drag and drop your brand strategy document \- supports any format"

### **Processing Screen**

"Our AI analyzes your entire strategy in under a minute"

### **Review Screen**

"Every strategic element is extracted with high confidence"

### **Configuration Screen**

"Automatically generates optimal field configurations"

### **Success Screen**

"What used to take 5-6 weeks now takes just 15 minutes"

---

## **What NOT to Build**

❌ **NO** real file parsing  
 ❌ **NO** API calls to Claude or any AI service  
 ❌ **NO** database or data persistence  
 ❌ **NO** user authentication  
 ❌ **NO** actual calculations or algorithms  
 ❌ **NO** error handling (beyond basic UI)  
 ❌ **NO** real form validation  
 ❌ **NO** responsive mobile design (focus on desktop demo)

---

## **What TO Focus On**

✅ **Beautiful UI** that looks professional and pharmaceutical-grade  
 ✅ **Smooth animations** between screens  
 ✅ **Convincing progress bars** and loading states  
 ✅ **Polished interactions** (hover states, transitions)  
 ✅ **Clear user flow** from upload to success  
 ✅ **Professional data visualizations** (can be static images)  
 ✅ **GSK branding** consistency  
 ✅ **"Wow factor"** that impresses stakeholders

---

## **Success Criteria**

The demo succeeds if viewers believe they're seeing a real system that could:

* Save 5-6 weeks of configuration time  
* Reduce costs by $45,000-60,000 per brand  
* Transform any brand strategy into field-ready configurations  
* Deliver consistent, high-quality results

Remember: **This is theater, not engineering.** Make it look amazing, make it feel real, but keep the implementation dead simple.

---

*Demo Version 1.0 \- August 2024* *For GSK Canada Presentation*

