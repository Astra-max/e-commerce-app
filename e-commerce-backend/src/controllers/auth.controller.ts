import { type Request, type Response } from "express";
import { User } from "../../types";
import pool from "../model/model";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { getUserByEmail, newUser } from "../repository/user.query";
import { authLoginService } from "../service/auth.service";
import { generateToken, refreshToken } from "../util/jwt";

dotenv.config();

/**
 * Handles handle login
 */
export const HandleLogin = async (req: Request, res: Response) => {
  try {
    const { message, statusCode, data, isError } = await authLoginService(req);

    if (isError || !data) {
      return res.status(statusCode).json({ message });
    }

    const refreshAuthToken = refreshToken(data.userId, data.userName);
    // send refresh token in cookie
    res.cookie("refreshToken", refreshAuthToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // send access token in response
    return res.status(statusCode).json({
      accessToken: data.token,
      userId: data.userId,
      userName: data.userName,
    });
  } catch (error) {
    console.error("Error during login:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

/**
 * Handles handle sign u p
 */
export const HandleSignUP = async (req: Request, res: Response) => {
  const {
    userName,
    firstName,
    secondName,
    emailAddr,
    password,
    gender,
    age,
    phone,
    idNo,
    confirm: _,
  }: User = req.body;

  if (
    !userName ||
    !firstName ||
    !secondName ||
    !emailAddr ||
    !password ||
    !gender ||
    !age ||
    !phone ||
    !idNo
  )
    return res.json({ message: "missing credentials" });
  try {
    const userExists = await pool.query(getUserByEmail, [emailAddr]);
    if (userExists.rows.length > 0)
      return res.json({ message: "Account exist. please login" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await pool.query(newUser, [
      userName,
      firstName,
      secondName,
      emailAddr,
      phone,
      idNo,
      hashedPassword,
    ]);
    const token = generateToken(user.rows[0].user_id, userName);

    return res.status(201).json({
      token,
      userId: user.rows[0].user_id,
      userName,
    });
  } catch (error) {
    console.log(`Server Error: ${error}`);
  }
};
