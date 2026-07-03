import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { JwtSignCredentials } from "../../types";
import { logger } from "./logger";

dotenv.config();

export const generateToken = (data: JwtSignCredentials) => {
    try {
        const token = jwt.sign(
            { userId: data.userId, userName: data.userName },
            process.env.SECRET_KEY as string,
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
            process.env.SECRET_KEY as string,
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
        const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as JwtSignCredentials;    
    return decoded;
    } catch (error: any) {
        logger.error("Error verifying token:", error);
        throw new Error("Error verifying token: " + (error as Error).message);
    }
}