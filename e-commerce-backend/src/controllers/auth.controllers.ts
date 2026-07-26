import { type Request, type Response } from "express";
import { authLoginService, authSignUpService } from "../service/auth.service";
import { verifyRefreshToken, generateToken, refreshToken } from "../util/jwt";
import { logger } from "../util/logger";
import LoadCfg from "../config/loadConfg";

const nodeEnv = LoadCfg.loadNodeEnv();
const productionEnv = nodeEnv === "production";

const REFRESH_COOKIE_OPTS = {
  httpOnly: true,
  secure: productionEnv,
  sameSite: "strict" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export const HandleLogin = async (req: Request, res: Response) => {
  try {
    const { message, statusCode, data, isError } = await authLoginService(req);

    if (isError || !data) {
      return res.status(statusCode).json({ message });
    }

    const refreshAuthToken = refreshToken(data.userId, data.userName);
    res.cookie("refreshToken", refreshAuthToken, REFRESH_COOKIE_OPTS);

    logger.info(`User ${data.userName} logged in successfully`);

    return res.status(statusCode).json({
      accessToken: data.accessToken,
      userId: data.userId,
      userName: data.userName,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const HandleSignUP = async (req: Request, res: Response) => {
  try {
    const { message, statusCode, data, isError } = await authSignUpService(req);

    if (isError || !data) {
      return res.status(statusCode).json({ message });
    }

    const refreshAuthToken = refreshToken(data.userId, data.userName);

    if (!refreshAuthToken) {
      return res.status(500).json({ message: "Failed to generate refresh token" });
    }

    res.cookie("refreshToken", refreshAuthToken, REFRESH_COOKIE_OPTS);

    logger.info(`User ${data.userName} signed up successfully`);

    return res.status(statusCode).json({
      accessToken: data.accessToken,
      userId: data.userId,
      userName: data.userName,
    });
  } catch (error) {
    console.error("Error during sign up:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const HandleLogout = (req: Request, res: Response) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: productionEnv,
    sameSite: "strict",
  });
  logger.info(`User logged out successfully`);
  return res.status(200).json({ message: "Logged out successfully" });
};

// controller/auth.controller.ts — the missing /auth/refresh 
export const HandleRefresh = (req: Request, res: Response) => {
  const token = req.cookies?.refreshToken;

  if (!token) {
    logger.warn("Refresh attempted with no refresh token cookie present");
    return res.status(401).json({ message: "No refresh token" });
  }

  try {
    const decoded = verifyRefreshToken(token);

    const accessToken = generateToken({
      userId: decoded.userId,
      userName: decoded.userName,
    });

    // Rotate the refresh token too — extends the session and limits the
    // window a stolen refresh token stays valid for.
    const newRefreshToken = refreshToken(decoded.userId, decoded.userName);
    res.cookie("refreshToken", newRefreshToken, REFRESH_COOKIE_OPTS);

    logger.info(`Refreshed access token for user ${decoded.userName}`);

    return res.status(200).json({ accessToken });
  } catch (error) {
    logger.warn(`Refresh token verification failed: ${(error as Error).message}`);
    return res.status(401).json({ message: "Invalid or expired refresh token" });
  }
};