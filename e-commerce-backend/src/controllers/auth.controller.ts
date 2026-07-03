import { type Request, type Response } from "express";
import dotenv from "dotenv";
import { authLoginService, authSignUpService } from "../service/auth.service";
import { refreshToken } from "../util/jwt";
import { logger } from "../util/logger";

dotenv.config();

// Handles handle login
export const HandleLogin = async (req: Request, res: Response) => {
  try {
    const { message, statusCode, data, isError } = await authLoginService(req);

    if (isError || !data) {
      return res.status(statusCode).json({ message });
    }

    const refreshAuthToken = refreshToken(data.userId, data.userName);
    // send refresh token in cookie
    res.cookie("refreshToken", refreshAuthToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    logger.info(`User ${data.userName} logged in successfully`);
    // send access token in response
    return res.status(statusCode).json({
      accessToken: data.accessToken,
      userId: data.userId,
      userName: data.userName,
    });
  } catch (error) {
    console.error("Error during login:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

/**
 * Handles handle sign u p
 */
export const HandleSignUP = async (req: Request, res: Response) => {
  const { message, statusCode, data, isError } = await authSignUpService(req);

  if (isError || !data) {
    return res.status(statusCode).json({ message });
  }

  // send refresh token in cookie
  const refreshAuthToken = refreshToken(data.userId, data.userName);

  if (!refreshAuthToken) {
    return res.status(500).json({
      message: "Failed to generate refresh token",
    });
  }

  res.cookie("refreshToken", refreshAuthToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  logger.info(`User ${data.userName} signed up successfully`);

  return res.status(statusCode).json({
    accessToken: data.accessToken,
    userId: data.userId,
    userName: data.userName,
  });
};

export const HandleLogout = (req: Request, res: Response) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  logger.info(`User logged out successfully`);
  return res.status(200).json({ message: "Logged out successfully" });
}

export const userProfile = async (req: Request, res: Response) => {}