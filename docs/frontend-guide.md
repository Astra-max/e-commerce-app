Frontend guide — WestMart
=========================

Overview
--------
The frontend lives in the e-commerce/ directory and is a React + TypeScript app using Vite. Application state is managed with Redux Toolkit slices.

Key folders
- src/components — UI components
  - auth/authorized.tsx — bootstraps session on app start (refresh + profile)
  - layout/layout.tsx — global layout and ProfileAccountLayout for profile routes
  - products/* — product list, product card, single product views (includes optimistic add-to-cart)
  - ui/loading.tsx — reusable loading spinner and message
- src/services — networking helpers
  - axios.ts — axios instance (withCredentials: true). Attaches access token to Authorization header when present.
  - refreshToken.ts — response interceptor that tries /auth/refresh on 401 and retries the original request with new token
  - token.ts — small in-memory access token helper used by axios
- src/store/feature — redux slices
  - authSlice.ts — session state, setSession, fetchUserProfile thunk
  - cartSlice.ts — cart state, optimistic update reducers and async thunks for server persistence
  - productSlice.ts — products list
  - totalSlice.ts, quantitySlice.ts — totals and quantity endpoints

Important UX notes
- AuthProvider triggers POST /auth/refresh then GET /auth/profile and dispatches a cart fetch so the app resumes user state after page reloads.
- Optimistic add-to-cart updates the Redux cart state immediately and updates subtotal locally. It then calls HandleAddItem; on failure it rolls back the change and subtracts subtotal.
- Loading component is used to present nicer loading states on product lists, single-product pages, and cart pages.

Debugging tips
- If profile or cart is empty after reload, open developer tools -> Network and inspect POST /auth/refresh and GET /auth/profile. Confirm a 200 response and that profile contains a user id.
- If POST /auth/refresh is returning 401, the refresh cookie may not be present — confirm server set cookie and that browser includes it (watch SameSite and secure flags when using different origins).
- The axios instance and refresh interceptor are registered at startup via import in src/main.tsx (services/refreshToken). Ensure this file is imported early.

Extending frontend
- Add unit tests around slices (reducers) and thunks for safer refactoring.
- Convert the setSession plain dispatch in AuthProvider to a typed action by improving fetchUserProfile typings if desired (the project currently normalizes and dispatches a plain action to avoid local typing friction).

Local development
- npm run dev in e-commerce/ will start the Vite dev server
- npm run build creates a production build in e-commerce/dist

Files to review for cart/profile bugs
- src/components/auth/authorized.tsx
- src/store/feature/authSlice.ts
- src/store/feature/cartSlice.ts
- src/services/axios.ts and src/services/refreshToken.ts
- src/components/products/productCard.tsx (optimistic add logic)