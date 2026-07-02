import { User } from "../../types";
import pool from "../model/model";
import { getAllUsersQuery, getUserByEmail, newUser, getUserByIdQuery, deleteUserById } from "../query/user.query";

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
    return {
        userId: result.rows[0].user_id,
        userName: result.rows[0].user_name
    };
    } catch (error: any) {
        return { isError: true, message: "Error saving user to database", statusCode: 500 };
    }
}

export const handleGetUserByEmail = async (email: string): Promise<UserLoginData | RepositoryError> => {
    try {
        const result = await pool.query(getUserByEmail, [email]);
        if (result.rows.length > 0) {
            return {
                userId: result.rows[0].user_id,
                userName: result.rows[0].user_name
            }
        }
        return { isError: true, message: "User not found", statusCode: 404 };
    } catch (error: any) {
        return { isError: true, message: "Error fetching user by email", statusCode: 500 };
    }
}

export const getAllUsers = async (): Promise<User[] | RepositoryError> => {
    try {
        const result = await pool.query(getAllUsersQuery);
        return result.rows;
    } catch (error: any) {
        return { isError: true, message: "server error", statusCode: 500 };
    }
}

export const getUserById = async (userId: string): Promise<User | RepositoryError> => {
    try {
        const result = await pool.query(getUserByIdQuery, [userId]);
        if (result.rows.length > 0) {
            return result.rows[0];
        }
        return { isError: true, message: "User not found", statusCode: 404 };
    } catch (error: any) {
        return { isError: true, message: "Error fetching user by ID", statusCode: 500 };
    }
}

export const deleteUser = async (userId: string): Promise<User | RepositoryError> => {
    try {
        const result = await pool.query(deleteUserById, [userId])
        return result.rows[0]
    } catch (error: any) {
        return {isError: true, message: "Failed to remove user", statusCode: 500}
    }
}