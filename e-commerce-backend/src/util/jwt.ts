import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


export const generateToken = (userId: string, userName: string) => {
    try {
        const token = jwt.sign(
            { userId, userName },
            process.env.SECRET_KEY as string,
            { expiresIn: "1d" }
        );
        return token;
    } catch (error) {
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
    } catch (error) {
        throw new Error("Error generating refresh token: " + (error as Error).message);
    }
}