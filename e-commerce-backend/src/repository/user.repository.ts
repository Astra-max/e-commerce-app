import { User } from "../../types";
import pool from "../config/dbConnect";
import { getAllUsersQuery, getUserByEmail, newUser, getUserByIdQuery, deleteUserById } from "../query/user.query";
import { logger } from "../util/logger";

export interface RepositoryError {
    isError: boolean;
    message: string;
    statusCode?: number;
}

export interface UserLoginData {
    userId: string;
    userName: string;
    password?: string;
}

export const saveUser = async (user: User): Promise<UserLoginData | RepositoryError> => {
    try {
        const result = await pool.query(
        newUser,
        [
            user.userName,
            user.firstName,
            user.secondName,
            user.emailAddr,
            user.phone,
            user.idNo,
            user.password,
        ]
    );
    logger.info(`User ${user.userName} saved successfully with ID ${result.rows[0].user_id}.`);
    return {
        userId: result.rows[0].user_id,
        userName: result.rows[0].user_name
    };
    } catch (error: any) {
        logger.error("Error saving user to database:", error);
        return { isError: true, message: "Error saving user to database", statusCode: 500 };
    }
}

export const handleGetUserByEmail = async (email: string): Promise<UserLoginData | RepositoryError> => {
    try {
        const result = await pool.query(getUserByEmail, [email]);
        
        if (result.rows.length > 0) {
            return {
                userId: result.rows[0].user_id,
                userName: result.rows[0].user_name,
                password: result.rows[0].password,
            }
        }
        logger.warn(`User with email ${email} not found.`);
        return { isError: true, message: "User not found", statusCode: 404 };
    } catch (error: any) {
        logger.error("Error fetching user by email:", error);
        return { isError: true, message: "Error fetching user by email", statusCode: 500 };
    }
}

export const getAllUsers = async (): Promise<User[] | RepositoryError> => {
    try {
        const result = await pool.query(getAllUsersQuery);
        logger.info(`Fetched ${result.rows.length} users from the database.`);
        return result.rows;
    } catch (error: any) {
        logger.error("Error fetching all users:", error);
        return { isError: true, message: "server error", statusCode: 500 };
    }
}

export const getUserById = async (userId: string): Promise<User | RepositoryError> => {
    try {
        const result = await pool.query(getUserByIdQuery, [userId]);
        logger.info(`Fetched user with ID ${userId} from the database.`);
        if (result.rows.length > 0) {
            return result.rows[0];
        }
        logger.warn(`User with ID ${userId} not found.`);
        return { isError: true, message: "User not found", statusCode: 404 };
    } catch (error: any) {
        logger.error("Error fetching user by ID:", error);
        return { isError: true, message: "Error fetching user by ID", statusCode: 500 };
    }
}

export const deleteUser = async (userId: string): Promise<User | RepositoryError> => {
    try {
        const result = await pool.query(deleteUserById, [userId])
        logger.info(`User with ID ${userId} deleted successfully.`);
        return result.rows[0]
    } catch (error: any) {
        logger.error("Error deleting user:", error);
        return {isError: true, message: "Failed to remove user", statusCode: 500}
    }
}