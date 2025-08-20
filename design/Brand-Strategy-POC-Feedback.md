# Brand Strategy POC - Feedback

## Version -1: Loom

### Nomenclature Clarification

Some of the terminology is mingled up so let's clarify that before tomorrow if possible.

For example here:

The customer creates their **brand strategy**, and our **brand strategy agent** helps **operationalize** their brand strategy through our **brand strategy experimentation platform** (if you want to call it that).

In terms of the nomenclature, they upload **brand strategy content**, we extract the **brand strategy summary**, and we **translate** it into a **simulation project template** in that order.

This order impacts the workflow - see below.

### Workflow Clarity

#### Prioritize uploads as the true entry point

Right now, the flow starts at "Create my brand strategy," that assumes a project already exists (ie. Drop down select project). In reality, the **uploads** come first — they are what populate everything downstream.

→ **Suggestion:** Make "Upload & Review" the first step in the UI, clearly separated and prioritized visually at the top.

#### Think of it as linear steps

Users should experience the workflow as a step process:

1. User Uploads files → Extract strategy content
2. User Reviews extracted content  
3. Translate strategy content summary into configuration
4. Run simulations
5. Validate configuration outcomes with simulation reports (Overlap analysis, curation simulation)
6. Deploy validated project template (the configured strategy approved after the simulation report is reviewed)
7. See outcome of deployed strategy in field via reports (adherence, ROI)

#### Think of it as having two users and how we can accommodate that in the workflow
**Pharma user and Internal User**

The first human step should be: "Did the system extract all the information needed to populate the strategy template?" This step should be more isolated to reduce any complexity in the pharma user having to navigate the rest of this system - if we can have the upload + review be super no brainer for anyone ie. more like a wizard and then let the navigating the system be more of an internal user journey.

### UI/UX Specific Feedback

#### Redundancies in Current Workflow

There are some redundancies in the current workflow for example the extracted info screens feel similar. I prefer the cleaner version and I think layering in the "what AI to use to process" for the internal user would be nice in this area. The pharma user can see this or something even more summarized like what Midori drafted. 

The drop down of which AI to use (fastest, best quality etc) - where it sits right now made me a bit confused and thought it was part of generating downstream assets after the project template is deployed.

#### AI Extraction Complete Screen

**AI Extraction Complete - 91% Confidence**

Successfully extracted 14 strategic components from your document. Use AI to optimize individual fields or apply global enhancements.

**Extracted Data Example:**
- **Project Name:** Shingrix Canada Q4 2024 Campaign
- **Product Name:** Shingrix  
- **Indication:** Herpes Zoster (Shingles) Prevention
- **Primary Business Goal:** Double the number of Canadians protected against Shingles
- **Target Audience:** Adults 50+ and immunocompromised adults 18+
- **Current Market Coverage:** 2.9M Canadians (23.5%)
- **Target Growth:** 3% CAGR by 2026
- **Competitive Landscape:** Limited competition - primary competitor is Zostavax (being phased out)
- **Market Opportunity:** 12M eligible Canadians remain unprotected

**Market Segments:**
- **HZ Champions** (40%): High-volume prescribers focused on prevention
- **Rising Stars** (30%): Growing practices with vaccination focus
- **Primary Care** (20%): Broad reach general practitioners  
- **Specialists** (10%): Targeted specialist engagement

#### Transparent Progress Indicators

**I like this very much - keep this**

The processing screen with clear progress indicators showing:
- Processing competitive insights... 
- ✓ Analyzing document structure
- ✓ Extracting brand strategy components
- ✓ Identifying key objectives and goals
- ✓ Mapping market segments
- ⊙ Processing competitive insights
- Generating template parameters
- Optimizing targeting parameters
- Finalizing strategy template

#### Uploads Screen

This is also a nice screen - I see this as part of an internal user's journey where they can see what customer uploaded and check the original docs if ever needed.

**Recent Uploads Section showing:**
- Shingrix_Brand_Strategy_Q4_2024.pdf - Processing Complete
- GSK_Competitive_Analysis_Nov2024.docx - Processing Complete  
- Market_Research_Summary_Q3.pptx - Processing
- Legacy_Campaign_Data.xlsx - Retry

### Configuration Mapping

#### Translate language → configuration

After review, we need a clear step where the extracted strategy elements (objectives, segments, tactics, leading indicators, etc.) are mapped into the system's configuration. This is where BAs validate alignment. This current sits here (below) if I am understanding - I can help make this a bit cleaner so can leave this as is for now.

**Curation Configuration - Product Line Config**

Sample Curated List (30 HCPs):
- Dr. Priya Patel - Endocrinology - KOL Influencer
- Dr. Marcus Johnson - Internal Medicine - High Prescriber
- Dr. Sophia Rodriguez - Cardiology - Early Adopter
- Dr. Ahmed Hassan - Nephrology - Volume Driver

### Support Iteration via Simulation

Right now, the flow ends with creating the template. But the real value comes after that — simulating/experimenting, showing overlap analysis, and producing curation reports.

For full e2e will need to add steps where users can "Run & Review Simulation" before moving to deployment. See the full e2e workflow at the top.

## Summary of Key Changes Needed

1. **Make uploads the true entry point** - Remove project selection dropdown from initial flow
2. **Implement 7-step linear workflow** for clarity
3. **Create dual user experience** - Simplified wizard for pharma users, full system for internal users
4. **Move AI model selection** to extraction results screen for internal users only
5. **Add simulation and validation steps** before deployment
6. **Include iteration capability** to return to configuration based on simulation results
7. **Keep transparent progress indicators** throughout the workflow
8. **Clean up redundant extraction displays** - consolidate to single, cleaner version