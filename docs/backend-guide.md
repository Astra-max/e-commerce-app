Backend guide — WestMart
=======================

Overview
--------
The backend lives in the e-commerce-backend/ folder. It is an Express application that exposes REST endpoints for auth, products, cart, quantity, totals and user queries. It follows a controllers -> services -> repository pattern.

Key folders
- src/routes/routes.ts — route registration
- src/controllers — thin controllers that call service functions and return HTTP responses
- src/service — business logic; orchestrates repository calls and input validation
- src/repository — DB access layer (Postgres queries)
- src/middleware — authentication middleware and rate limiting
- src/util — helpers for JWT generation/verification and logger utilities

Auth
- Access tokens: short-lived JWT returned in API JSON.
- Refresh tokens: long-lived token rotated and stored in an httpOnly cookie. Endpoint POST /auth/refresh verifies the refresh token and issues a new access token and rotates the refresh cookie.
- auth.middleware reads Authorization header bearer token and verifies access tokens. It rejects requests with missing or invalid tokens.

Database
- Repository layer uses a pool (configured in config/dbConnect). SQL queries are stored in query/*. Use parameterized queries to avoid injection.
- User rows are returned with snake_case column names (e.g. user_id). The frontend normalizes these to camelCase.

Cart operations
- Cart endpoints expect authenticated requests. The backend ensures the user exists and performs DB updates (add, remove, change quantity), and a separate total/amount controller updates the cart total if needed.

Developer notes
- Keep JWT secrets secure. Rotate as needed.
- When debugging session/refresh issues, check whether the refresh cookie is being set with correct SameSite and secure flags. In development with different origins, configure cookie options to allow cross-site usage if needed for testing, but ensure secure settings are used in production.
- For high reliability, consider adding transaction boundaries around multi-step cart operations.

Running locally
- Set env variables (database connection info, JWT secrets, PORT)
- npm run dev to start the server

Logging & errors
- The app writes useful logs via the logger util. Errors in repository calls return RepositoryError objects which services and controllers turn into HTTP responses with suitable statuses.

Adding endpoints
- Keep controllers minimal and put business rules in services. Reuse repository functions for DB access.

Security
- The server uses both access and refresh tokens. Protect refresh token endpoints from abuse (rate limiter already used on auth routes).
- Consider CSRF mitigations and ensure cookies are set with appropriate attributes in production.