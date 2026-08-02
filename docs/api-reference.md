API Reference — WestMart
=======================

Notes
-----
- All protected endpoints require the Authorization header: `Authorization: Bearer <accessToken>`.
- Many endpoints are also protected by the backend auth middleware which depends on a valid access token.
- The refresh endpoint depends on an httpOnly cookie `refreshToken` set by the server after login.

Auth
----
POST /auth/login
- Body: { emailAddr: string, password: string }
- Response: { accessToken, userId, userName }
- Side-effect: sets httpOnly refreshToken cookie

POST /auth/register
- Body: (user registration fields)
- Response: { accessToken, userId, userName }
- Side-effect: sets httpOnly refreshToken cookie

POST /auth/logout
- Body: none
- Response: { message }
- Side-effect: clears refresh cookie server-side

POST /auth/refresh
- Body: none (relies on cookie)
- Response: { accessToken }
- Purpose: rotate/renew access token

GET /auth/profile
- Protected
- Response: { data: user } where user contains fields depending on backend schema (user_id / user_name / first_name / email_addr). Frontend normalizes snake_case -> camelCase.

Users
-----
GET /users
- Protected
- Returns list of users

GET /users/:userId
- Protected
- Returns specific user info

Products
--------
GET /products
- Protected
- Response: list of products

Cart & Totals
--------------
POST /cart
- Protected
- Body: item payload (productid, name, amount, quantity, status, userId, ...)
- Response: added item

GET /cart/:userId
- Protected
- Response: list of items in the user cart

DELETE /cart/:userId/:itemId
- Protected
- Response: success info

PUT /quantity/add
- Protected
- Body: { userId, productId }
- Response: updated item quantity

PUT /quantity/reduce
- Protected
- Body: { userId, productId }
- Response: updated item quantity or removal when quantity < 1

GET /total/:userId
- Protected
- Response: { total: number }

PUT /total/:productId
- Protected
- Updates total for a product (internal use by cart operations)

Implementation notes
--------------------
- The backend sometimes returns the payload under `data` as `{ data: ... }`. The frontend normalizes responses from /auth/profile and other responses where necessary.
- When using the API from the frontend, the axios instance is configured with withCredentials: true. Keep that in mind if testing with curl or other tools — include cookies when needed.

Errors
------
- The API usually replies with standard HTTP codes and JSON bodies containing `message` for failures. For example: 401 Unauthorized, 404 Not found, 500 Internal server error.

If you need more detail about a specific endpoint (request/response examples), paste a sample response and I can add precise JSON examples to this doc.