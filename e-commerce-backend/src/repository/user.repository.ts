import { User } from "../../types";
import pool from "../model/model";
import { getUserByEmail, newUser } from "../repository/user.query";
import isRepositoryError from "../util/repoErr";



export interface RepositoryError {
    isError: boolean;
    message: string;
    statusCode?: number;
}

export const saveUser = async (user: User): Promise<User | RepositoryError> => {
    try {
        const existingUser = await handleGetUserByEmail(user.emailAddr);
        if (isRepositoryError(existingUser)) {
            return { isError: true, message: "User already exists", statusCode: 409 };
        }
        const result = await pool.query(
        newUser,
        [
            user.userName,
            user.firstName,
            user.secondName,
            user.emailAddr,
            user.phone,
            user.idNo,
            user.password
        ]
    );
    return result.rows[0];
    } catch (error: any) {
        return { isError: true, message: "Error saving user to database", statusCode: 500 };
    }
}

export const handleGetUserByEmail = async (email: string): Promise<User | RepositoryError> => {
    try {
        const result = await pool.query(getUserByEmail, [email]);
        if (result.rows.length > 0) {
            return result.rows[0];
        }
        return { isError: true, message: "User not found", statusCode: 404 };
    } catch (error: any) {
        return { isError: true, message: "Error fetching user by email", statusCode: 500 };
    }
}