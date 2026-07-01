import { Request } from "express";
import { handleGetUserByEmail } from "../repository/user.repository";
import isRepositoryError from "../util/repoErr";
import { comparePassword } from "../util/hash.password.util";
import { generateToken } from "../util/jwt";
import { responseData, ValidationError } from "../../types";


export const authLoginService = async (data: Request): Promise<ValidationError> => {
    const { emailAddr, password } = data.body;
    if (!emailAddr) {
        return { isError: true, message: "Email address is required", statusCode: 400 };
    }
    if (!password) {
        return { isError: true, message: "Password is required", statusCode: 400 };
    }

    const getUserByEmail = await handleGetUserByEmail(emailAddr);

    if (isRepositoryError(getUserByEmail)) {
        return { isError: true, 
            message: getUserByEmail.message,
            statusCode: Number(getUserByEmail.statusCode)
        };
    }
    
    const isValidPassword = comparePassword(password, getUserByEmail.password);

    if (!isValidPassword) {
        return { isError: true, message: "Invalid password", statusCode: 401 };
    }

    const token = generateToken(getUserByEmail.userId, getUserByEmail.userName);
    if (!token) {
        return { isError: true, message: "Failed to generate token", statusCode: 500 };
    }
    const userData: responseData = {
        token,
        userId: getUserByEmail.userId,
        userName: getUserByEmail.userName
    };
    return { isError: false, message: "Login successful", statusCode: 200, data: userData };
}