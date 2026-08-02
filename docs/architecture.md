Architecture — WestMart
=======================

High level
----------
WestMart is split into two main parts:

1. Frontend (e-commerce/)
   - React + TypeScript + Vite
   - Uses Redux Toolkit for app state (slices: auth, products, cart, total, quantity, itemHistory)
   - Axios is used for API calls, with a global instance that injects access tokens and retries via refresh-token flow

2. Backend (e-commerce-backend/)
   - Node.js + Express
   - JWT-based authentication (short-lived access tokens + refresh tokens stored in httpOnly cookies)
   - Controllers -> Services -> Repository pattern: controllers validate input and call services; services orchestrate business logic; repository performs DB queries.

Key flows
---------
Authentication
- Login: client POSTs credentials to /auth/login. Server returns an access token in JSON and sets a refresh token cookie.
- Refresh: frontend calls POST /auth/refresh to rotate/renew the access token (refresh cookie must be present). Backend verifies refresh token and returns a new access token. Refresh token rotation extends session security.
- Auth middleware validates Authorization header "Bearer <token>" for protected endpoints.

Session boot on page load
- On app mount AuthProvider calls /auth/refresh then /auth/profile to populate the frontend session and immediately fetch the user's cart so page reloads restore the user's cart and profile.

Optimistic cart updates
- When a user adds to cart, the UI updates local Redux state immediately (add or increment) and the subtotal is updated. An API request is sent in the background to persist the change. If the request fails, the local state is rolled back and an error is logged/shown.

Why the split matters
- The frontend keeps minimal token state in-memory; refresh life is handled by a cookie so the browser doesn't expose refresh tokens to JS.
- The backend remains responsible for data integrity and persistence; optimistic frontend updates are UI improvements but server state is the source-of-truth.

Files of interest
- Frontend:
  - src/components/auth/authorized.tsx — session boot & refresh
  - src/services/axios.ts — axios instance, attach token
  - src/services/refreshToken.ts — axios response interceptor for automatic refresh
  - src/store/feature/* — redux slices
  - src/components/products/productCard.tsx — optimistic add-to-cart implementation
  - src/components/ui/loading.tsx — reusable loading component

- Backend:
  - src/routes/routes.ts — routes map
  - src/controllers/* — controllers for carts, auth, products, users
  - src/service/* — business logic
  - src/repository/* — db queries
  - src/middleware/auth.middleware.ts — access token validation

Scaling notes
- Token rotation reduces attack window for stolen refresh tokens.
- For high-throughput, move session and cart reads/writes to a dedicated data store (Redis caching for cart) and add instrumentation around cart ops to ensure eventual consistency.

Security notes
- Keep JWT secrets safe and rotate as required.
- The refresh cookie should be set with secure and proper sameSite values in production to avoid CSRF risks.