import { Request, Response } from "express";
import { getAllUsersService } from "../service/auth.service";
import { getUserByIdService } from "../service/user.service";
import { logger } from "../util/logger"

export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsersService();
    res.status(200).json({ isError: false, message: "Users fetched successfully", data: users });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ isError: true, message: "Internal server error" });
    }
};

export const getUserByIdController = async (req: Request, res: Response) => {
  const { isError, message, statusCode, data } = await getUserByIdService(req)

  if (isError) {
    logger.warn(`Db error ${message}`)
    return res.status(statusCode).json({message});
  }
  return res.status(200).json({data})
}