import { rateLimit } from "express-rate-limit";

// general rate limiter for all routes
export const generalRateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 10 minutes
  max: 100, // Limit each IP to 6 requests per windowMs
  message: { message: "Too many requests, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

// authentication rate limiter for login and signup routes
export const authRateLimiter = rateLimit({
  windowMs: 3 * 60 * 1000, // 5 minutes
  max: 7, // Limit each IP to 7 requests per windowMs
  message: { message: "Too many requests, please try again later." },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
