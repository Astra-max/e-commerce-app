// util/jwt.ts
import jwt from "jsonwebtoken";
import { JwtSignCredentials } from "../../types";
import { logger } from "./logger";
import LoadCfg from "../config/loadConfg";

const accessSecret = LoadCfg.loadSecretKey();
const refreshSecret = "ekfn84u8thgjnkfpowk495u"; // NEW — see note below

export const generateToken = (data: JwtSignCredentials) => {
  try {
    return jwt.sign(
      { userId: data.userId, userName: data.userName, type: "access" },
      accessSecret,
      { expiresIn: "1d" }
    );
  } catch (error: any) {
    logger.error("Error generating token:", error);
    throw new Error("Error generating token: " + error.message);
  }
};

export const refreshToken = (userId: string, userName: string) => {
  try {
    return jwt.sign(
      { userId, userName, type: "refresh" },
      refreshSecret,
      { expiresIn: "7d" }
    );
  } catch (error: any) {
    logger.error("Error generating refresh token:", error);
    throw new Error("Error generating refresh token: " + error.message);
  }
};

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, accessSecret) as JwtSignCredentials & { type: string };
    if (decoded.type !== "access") throw new Error("Not an access token");
    return decoded;
  } catch (error: any) {
    logger.error("Error verifying token:", error);
    throw new Error("Error verifying token: " + error.message);
  }
};

export const verifyRefreshToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, refreshSecret) as JwtSignCredentials & { type: string };
    if (decoded.type !== "refresh") throw new Error("Not a refresh token");
    return decoded;
  } catch (error: any) {
    logger.error("Error verifying refresh token:", error);
    throw new Error("Error verifying refresh token: " + error.message);
  }
};