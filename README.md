# Jarwis AI Frontend Prototype

A responsive React + Tailwind CSS frontend prototype based on the Jarwis AI cybersecurity automation proposal.

## Included screens
- Security overview dashboard with KPI cards and charts
- Scan history with search and status filtering
- New scan configuration modal (creates a local demo record only)
- Vulnerability list, filtering, and details modal
- Domain verification prototype
- AI Security Assistant chat UI
- Security reports UI
- Admin access requests and payment history
- Settings UI
- Responsive mobile navigation

## Requirements
- Node.js 20 or newer recommended
- npm

## Run locally
```bash
npm install
npm run dev
```
Open the local URL printed by Vite.

## Production build
```bash
npm run build
npm run preview
```

## Important prototype limitations
This is a frontend-only demo. The dashboard data is sample data and is not evidence of real vulnerabilities. Domain verification and scan creation are simulated locally. Authentication, authorization, payment verification, crawling, vulnerability scanning, AI responses, and report downloads are not connected to a backend.

Before production, connect the UI to the authorized FastAPI backend. Enforce authentication, role-based access, domain ownership verification, payment status, and scan authorization on the server. Never trust frontend state to grant access or confirm payment. Never expose secrets or store website passwords in browser storage.
