import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../util/jwt";
import { JwtSignCredentials } from "../../types";
import { logger } from "../util/logger";

interface AuthenticatedRequest extends Request {
    user?: JwtSignCredentials;
}

export function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Token missing" });
    }
    
    const verifiedToken = verifyToken(token);

    if (!verifiedToken) {
        return res.status(401).json({ message: "Invalid token" });
    }

    req.user = verifiedToken; // Attach the decoded token to the request object

    next();
}