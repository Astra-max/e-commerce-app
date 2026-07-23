import jwt from "jsonwebtoken";
import { JwtSignCredentials } from "../../types";
import { logger } from "./logger";
import LoadCfg from "../config/loadConfg";


const jwtSecret = LoadCfg.loadSecretKey();

export const generateToken = (data: JwtSignCredentials) => {
    try {
        const token = jwt.sign(
            { userId: data.userId, userName: data.userName },
            jwtSecret,
            { expiresIn: "1d" }
        );
        return token;
    } catch (error: any) {
        logger.error("Error generating token:", error);
        throw new Error("Error generating token: " + (error as Error).message);
    }
}

export const refreshToken = (userId: string, userName: string) => {
    try {
        const token = jwt.sign(
            { userId, userName },
            jwtSecret,
            { expiresIn: "7d" }
        );
        return token;
    } catch (error: any) {
        logger.error("Error generating refresh token:", error);
        throw new Error("Error generating refresh token: " + (error as Error).message);
    }
}

export const verifyToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, jwtSecret) as JwtSignCredentials;    
    return decoded;
    } catch (error: any) {
        logger.error("Error verifying token:", error);
        throw new Error("Error verifying token: " + (error as Error).message);
    }
}