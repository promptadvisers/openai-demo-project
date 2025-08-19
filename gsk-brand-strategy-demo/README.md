# GSK Canada Brand Strategy Agent Demo Platform

> **CRITICAL: This is a DEMO/MOCKUP application with no real functionality. All processing is simulated with predetermined Shingrix data.**

A sophisticated pharmaceutical demo platform showcasing how AI can transform brand strategy documents into field-ready configurations in 15 minutes instead of 5-6 weeks.

## 🎯 Demo Value Proposition

- **Transform 5-6 weeks → 15 minutes** of brand strategy configuration
- **Save $45,000-$60,000** per brand template creation
- **91% AI extraction accuracy** with pharmaceutical-grade processing
- **4.2x ROI** with 12M Canadian market opportunity

## 🚀 Quick Start

```bash
cd gsk-brand-strategy-demo
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the demo.

## 📋 Demo Flow (3-4 minutes)

1. **Dashboard** (30s) - Value proposition and existing Shingrix project
2. **Upload Modal** (15s) - Drag-drop any file (not actually processed)
3. **Processing** (45s) - Animated 45-second AI simulation
4. **Review** (30s) - Always shows extracted Shingrix data
5. **Configuration** (45s) - BOB platform integration preview
6. **Success** (45s) - ROI projections and completion metrics

## 🎨 Design System

### Color Palette (Pharmaceutical Grade)
```css
--primary-bg: #2A2D35     /* Dashboard background */
--card-bg: #1E2025        /* Card backgrounds */
--sidebar-bg: #1A1D23     /* Navigation sidebar */
--primary-blue: #4A90E2   /* Primary actions */
--text-primary: #FFFFFF   /* Headings */
--text-secondary: #9CA3AF /* Descriptions */
--border-color: #374151   /* Borders */
--success: #10B981        /* Success states */
```

### PowerScore Visualization
- **PS 10**: #F59E0B (Orange - Highest priority)
- **PS 9**: #EAB308 (Yellow - High priority)
- **PS 8**: #84CC16 (Green - Medium-high priority)

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Dashboard.jsx         # Main landing page
│   ├── UploadModal.jsx       # File upload interface
│   ├── ProcessingModal.jsx   # 45-second simulation
│   ├── ReviewModal.jsx       # Extracted data review
│   ├── ConfigPreview.jsx     # BOB configuration
│   └── SuccessScreen.jsx     # Completion metrics
├── data/
│   └── mockData.js          # All Shingrix mock data
├── styles/
│   ├── globals.css          # Design system
│   └── App.css              # Component styles
└── App.jsx                  # Main application
```

## 📊 Mock Data (Always Displayed)

### Product Information
- **Product**: Shingrix
- **Company**: GSK Canada
- **Indication**: Herpes Zoster (Shingles) Prevention
- **Goal**: Double Canadians protected against Shingles
- **Growth Target**: 3% CAGR by 2026

### Target Segments
- **HZ Champions** (40%) - Weekly engagement
- **Rising Stars** (30%) - Bi-weekly engagement  
- **Primary Care** (20%) - Monthly engagement
- **Specialists** (10%) - Quarterly engagement

### Market Opportunity
- **Current Coverage**: 2.9M Canadians (23.5%)
- **Eligible Population**: 12.3M Canadians
- **Private Coverage Target**: 66% → 75%

## 🎪 Demo Features

### What This DOES (Smoke & Mirrors)
✅ Beautiful pharmaceutical-grade UI/UX  
✅ 45-second animated "processing" simulation  
✅ Professional modal system with smooth transitions  
✅ PowerScore visualization with color coding  
✅ Convincing loading states and progress indicators  
✅ Predetermined Shingrix data regardless of input  

### What This DOES NOT Do (Intentionally)
❌ Process real documents (files are ignored)  
❌ Make actual AI/API calls  
❌ Store or persist any data  
❌ Perform real calculations  
❌ Have backend functionality  

## 🛠️ Technical Implementation

### File Upload Handler (Simulation Only)
```javascript
async function handleUpload(file) {
  setUploading(true);
  await sleep(2000); // Fake upload delay
  setStep('processing');
  // Always proceed with same mock data
}
```

### Processing Simulation
```javascript
const processingSteps = [
  { text: "Document analysis complete", delay: 10000 },
  { text: "Extracting strategy components...", delay: 10000 },
  { text: "Mapping to system configuration", delay: 15000 },
  { text: "Generating template", delay: 10000 }
];
```

## 📱 Responsive Design

- **Desktop** (1920x1080) - Full presentation mode
- **Tablet** (1024x768) - Stakeholder review sessions
- **Mobile** (768px+) - Basic responsive support

## 🚀 Deployment

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

The built files will be in the `dist/` directory, ready for static hosting.

## 🎯 Stakeholder Presentation Tips

### Demo Script Support
1. "Upload your brand strategy document"
2. "Our AI extracts key strategic components"  
3. "Review and validate the extraction"
4. "Generate your BOB configuration"
5. "Run simulations to test effectiveness"
6. "Deploy to field teams"

### Key Messages to Emphasize
- Pharmaceutical compliance and security
- Dramatic time savings (weeks to minutes)
- Significant cost reduction ($45K-$60K savings)
- Market opportunity scale (12M Canadians)
- Technical sophistication (91% accuracy)

## ⚠️ Important Notes

- **Demo Purpose Only**: This is a visual proof-of-concept
- **No Real Data**: All outputs are predetermined Shingrix mock data
- **Security Safe**: No actual document processing or data storage
- **Presentation Ready**: Optimized for stakeholder demonstrations

## 📄 License

Proprietary demo platform for GSK Canada stakeholder presentations.