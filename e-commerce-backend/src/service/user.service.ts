import { Request } from "express"
import isRepositoryError from "../util/repoErr";
import { getUserById } from "../repository/user.repository"
import { User } from "../../types";
import { ServiceResponse } from "../model/response";


export const getUserByIdService = async (data: Request): Promise<ServiceResponse<User>> => {
    const userId = data.params?.userId;

    if (!userId) return {
        isError: true, message: "missing user id", statusCode: 400
    }

    const user = await getUserById(userId)

    if (isRepositoryError(user)) return {
        isError: true, message: user.message, statusCode: Number(user.statusCode)
    }

    return {
        isError: false, message: "user found", statusCode: 200, data: user
    }
}