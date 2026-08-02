Getting started — WestMart (local dev)
======================================

Overview
--------
This document describes the steps to get the project running locally for development. The repository contains two main projects:
- Frontend: e-commerce/ (React + Vite + TypeScript)
- Backend: e-commerce-backend/ (Node.js + Express + Postgres)

Prerequisites
-------------
- Node.js (v18+ recommended)
- npm
- Postgres (or a connection to a compatible database)

Install & run
-------------
1. Clone the repository

   git clone <repo-url>

2. Install frontend dependencies

   cd e-commerce
   npm install

3. Install backend dependencies

   cd ../e-commerce-backend
   npm install

4. Configure environment variables

   - Frontend (e-commerce/.env):
     VITE_BASE_URL=http://localhost:4000

   - Backend (e-commerce-backend/.env):
     Provide DB credentials, and JWT secrets. Typical variables:
     - DATABASE_URL or DB_HOST/DB_USER/DB_PASSWORD/DB_NAME
     - JWT_ACCESS_SECRET
     - JWT_REFRESH_SECRET
     - PORT (default 4000)

5. Start backend

   cd e-commerce-backend
   npm run dev

6. Start frontend

   cd ../e-commerce
   npm run dev

Quick verification
------------------
- Open the frontend URL printed by Vite (usually http://localhost:5173)
- Login or sign up
- On login the app sets an httpOnly refresh cookie, obtains an access token, and stores session data in memory (token kept in a runtime token store). The app will call /auth/refresh on reload to obtain a fresh access token and profile data.

Notes
-----
- The frontend uses an in-memory token helper (services/token) to store the short-lived access token. Refresh tokens live as httpOnly cookies handled by the backend.
- On app start the authorized wrapper (AuthProvider) triggers a refresh and profile fetch and dispatches a cart fetch so the cart is available after page reloads.

If something is empty after reload
---------------------------------
If your cart or profile still appear empty after you refresh:
- Verify the browser is including cookies (the backend sets refresh cookie with httpOnly and sameSite depending on environment). If running cross-origin, ensure proper cookie settings and that the frontend `API` instance uses withCredentials: true.
- Inspect Network -> see POST /auth/refresh and GET /auth/profile responses. If refresh returns 401, the refresh cookie may be missing or expired. If profile returns 401, confirm the access token was set and axios request included Authorization header.

Next
----
Read docs/api-reference.md for detailed API shapes and endpoints, and docs/frontend-guide.md / docs/backend-guide.md for project internals.