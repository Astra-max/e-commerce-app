import { NextFunction, Request, Response } from "express";

/**
 * Handles general rate limiter
 */
export function GeneralRateLimiter(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let count = 3;
  count -= 1;
  console.log(`Allowed count ${count}`)
  if (count <= 0) {
    console.log("Request blocked: too many requests");
    return res.json({ message: "Too many request try later" });
  }
  return next();
}

export default function RequestLimit(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(req.method, req.url);
  next();
}
