Deployment — WestMart
======================

Build steps
-----------
- Frontend (e-commerce):
  1. cd e-commerce
  2. npm ci
  3. npm run build
  4. Serve the contents of the `dist/` folder with a static web server (or embed into a Node/Express server)

- Backend (e-commerce-backend):
  1. cd e-commerce-backend
  2. npm ci
  3. Set environment variables for production (DATABASE_URL, JWT secrets, NODE_ENV=production, PORT)
  4. Use a process manager (pm2, systemd) to start the server: `node dist/index.js` (or `npm start` if configured)

Environment & secrets
---------------------
- Always provide secrets via environment variables (CI/CD secret stores or server env). Never commit secrets to the repo.
- Required variables (examples):
  - DATABASE_URL (or DB_HOST/DB_USER/DB_PASS/DB_NAME)
  - JWT_ACCESS_SECRET
  - JWT_REFRESH_SECRET
  - PORT
  - NODE_ENV=production

Cookies & CORS
--------------
- In production, ensure cookies are set with `secure: true` and the correct `sameSite` value for your domain setup.
- If frontend and backend are on different domains, configure CORS on the backend and allow credentials. Example (Express):
  app.use(cors({ origin: 'https://your-frontend.com', credentials: true }))

Reverse proxy
-------------
- If behind a reverse proxy (NGINX) terminate TLS at the proxy and forward requests to the backend node server. Make sure the proxy forwards cookies and sets the correct headers.

Scaling & reliability
---------------------
- Use connection pooling for Postgres and configure max connections for your environment.
- Consider sticky sessions or stateless session design depending on your refresh token strategy.

CI/CD
-----
- Use an automated pipeline to run lint, build, and (optionally) tests before deployment. Store artifacts (frontend dist) and deploy to a static host (Netlify, Vercel) or a container registry and run on your infrastructure.

Rolling updates
---------------
- Use health checks and rolling restarts to avoid downtime.
- If you store session state server-side (not currently required), ensure session migration or sticky routing when scaling.

Monitoring
----------
- Add monitoring for API latencies, DB errors, and authentication failures. Instrument the cart operations and refresh endpoint to reduce user-facing failures.

Run using the provided scripts
----------------------------
Two helper scripts are included to make starting the app easy on both Windows (PowerShell) and Unix-like systems (bash).

Files:
- scripts\run.ps1  — PowerShell script (recommended for Windows)
- scripts/run.sh   — POSIX shell script (Linux / macOS)

Usage (Windows / PowerShell):
1. Open PowerShell in the repository root.
2. If execution policy prevents running scripts, allow the current session temporarily:
   - Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
3. Run the script:
   - .\scripts\run.ps1

Usage (Linux / macOS):
1. Open a terminal in the repository root.
2. Make the script executable (first time):
   - chmod +x ./scripts/run.sh
3. Run the script:
   - ./scripts/run.sh

What the scripts do:
- Check for Docker being installed.
- Run `docker compose up --build` to build and start the services defined in docker-compose.yml.
- Wait for the backend health endpoint at http://localhost:5500/health to respond (a limited timeout).
- Print helpful next steps and how to stop the stack: `docker compose down`.

Notes:
- The docker-compose.yml provided expects Postgres, backend and frontend services. Ensure ports 5432 (Postgres), 5500 (backend) and 80 (frontend) are available on your machine or update the compose file accordingly.
- If backend health fails, inspect logs with `docker compose logs backend`.
- For production deployments behind a reverse proxy, adjust the compose and nginx/frontend configuration accordingly.