WestMart — E-commerce App
=========================

Short description
-----------------
WestMart is a full-stack e-commerce sample application that includes a React + Vite frontend and an Express/Node backend. The app demonstrates user authentication (access + refresh token rotation), product browsing, an optimistic cart with client-first updates, and a small set of REST APIs for products, cart, totals, and user profile.

Repository layout
-----------------
- e-commerce/                — Frontend application (React + TypeScript + Vite)
- e-commerce-backend/        — Backend (Node.js + Express) and API
- docs/                      — Additional documentation (architecture, API, dev guides)

Quick links
-----------
- Frontend source: e-commerce/
- Backend source: e-commerce-backend/
- Docs: docs/

Features
--------
- Authentication with access and refresh tokens (refresh uses an httpOnly cookie)
- Profile page reliably fetched after refresh
- Cart that is reloaded after a successful session refresh
- Optimistic add-to-cart UX: UI updates first, API call follows and rolls back on failure
- Global axios instance with access-token injection and automatic refresh retry
- Reusable Loading component for nicer loading state UI

Prerequisites
-------------
- Node.js 18+ (or compatible LTS)
- npm 9+ (or newer)
- A running Postgres database for the backend (or adjust backend DB config to your DB)

Getting started (development)
-----------------------------
1. Clone the repo
   git clone <repo-url>

2. Install dependencies
   - Frontend:
     cd e-commerce
     npm install

   - Backend:
     cd ../e-commerce-backend
     npm install

3. Environment variables
   - Frontend (e-commerce/.env or your local env):
     VITE_BASE_URL=http://localhost:4000   # set to your backend URL

   - Backend (e-commerce-backend/.env):
     Configure your DB connection and any JWT secrets. Example variables expected by the backend:
     - DATABASE_URL (or DB_HOST / DB_USER / DB_PASSWORD / DB_NAME depending on config)
     - JWT_ACCESS_SECRET
     - JWT_REFRESH_SECRET
     - NODE_ENV
     - PORT

4. Run backend and frontend
   - Backend (development):
     cd e-commerce-backend
     npm run dev

   - Frontend (development):
     cd ../e-commerce
     npm run dev

Build for production
--------------------
- Frontend: cd e-commerce && npm run build
- Backend: follow your usual production process (build/transpile if used, start process manager)

Where to find docs
------------------
Full developer and API documentation has been added under the docs/ folder in the repository root. Start with docs/getting-started.md and docs/api-reference.md.

Support / Issues
----------------
If you run into problems, open an issue in the repository with the following info:
- Which part is failing (frontend/backend)
- The exact commands you ran
- Relevant console or network errors

License
-------
This repository does not include a license file. Add a license that suits your needs before publishing.