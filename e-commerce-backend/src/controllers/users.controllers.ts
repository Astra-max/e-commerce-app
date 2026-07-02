import { Request, Response } from "express";
import { getAllUsersService } from "../service/auth.service";

export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsersService();
    res.status(200).json({ isError: false, message: "Users fetched successfully", data: users });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ isError: true, message: "Internal server error" });
    }
};