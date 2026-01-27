import { type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../../types";
import pool from "../model/model";
import { v7 as setId } from "uuid";
import bcrypt from "bcrypt";
import { userQuery } from "../model/query";
import dotenv from "dotenv";

dotenv.config();

export const HandleLogin = async (req: Request, res: Response) => {
  const { emailAddr, password } = req.body;
  if (!emailAddr || !password)
    return res.status(400).json({ message: "missing login credentials" });

  try {
    const checkUser = await pool.query(userQuery, [emailAddr]);
    if (checkUser.rows.length === 0)
      return res
        .status(400)
        .json({ message: "please sign-up for free account" });

    const hashPassword = await bcrypt.compare(
      password,
      checkUser.rows[0].password
    );
    //if (!hashPassword)
    //return res.status(400).json({ message: "invalid password, try again" });
    const user = await pool.query(userQuery, [emailAddr]);
    const userData = {
      token: 123,
      userId: checkUser.rows[0].userid,
      userName: checkUser.rows[0].username,
    };
    const token = jwt.sign(
      {
        userId: checkUser.rows[0].userid,
        userName: checkUser.rows[0].username,
      },
      process.env.SECRET_KEY as string,
      { expiresIn: "7d" } // token valid for 7 days
    );
     return res.status(200).json({
      token,
      userId: checkUser.rows[0].userid,
      userName: checkUser.rows[0].username,
    });
  } catch (error) {
    console.log(error);
  }
};

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
    const userExists = await pool.query(
      `SELECT email FROM users WHERE email=$1`,
      [emailAddr]
    );
    if (userExists.rows.length > 0)
      return res.json({ message: "Account exist. please login" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = userExists.rows[0]
    await pool.query(
      `INSERT INTO users(userid,username,firstname,secondname,email,age,phone,idNo,gender,password) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
      [
        setId(),
        userName,
        firstName,
        secondName,
        emailAddr,
        age,
        phone,
        idNo,
        gender,
        hashedPassword,
      ]
    );
     const token = jwt.sign(
      { userId: user.userid, userName },
      process.env.SECRET_KEY as string,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      token,
      userId: user.userid,
      userName,
    });
  } catch (error) {
    console.log(`Server Error: ${error}`);
  }
};
