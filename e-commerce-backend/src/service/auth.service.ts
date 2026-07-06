import { Request } from "express";
import { getAllUsers, handleGetUserByEmail, saveUser } from "../repository/user.repository";
import isRepositoryError from "../util/repoErr";
import { comparePassword, hashPassword } from "../util/hash.password.util";
import { generateToken } from "../util/jwt";
import { ResponseData, User, UserRequest, ServiceResponse } from "../../types";

export const authLoginService = async (
  data: Request,
): Promise<ServiceResponse<ResponseData>> => {
  const { emailAddr, password } = data.body;
  if (!emailAddr) {
    return {
      isError: true,
      message: "Email address is required",
      statusCode: 400,
    };
  }
  if (!password) {
    return { isError: true, message: "Password is required", statusCode: 400 };
  }

  const getUserByEmail = await handleGetUserByEmail(emailAddr);

  if (isRepositoryError(getUserByEmail)) {
    return {
      isError: true,
      message: getUserByEmail.message,
      statusCode: Number(getUserByEmail.statusCode),
    };
  }

  let isValidPassword = false;

  if (getUserByEmail.password) {
    isValidPassword = await comparePassword(password, getUserByEmail.password);
  }

  if (!isValidPassword) {
    return { isError: true, message: "Invalid password", statusCode: 401 };
  }

  const token = generateToken({ userId: getUserByEmail.userId, userName: getUserByEmail.userName });
  if (!token) {
    return {
      isError: true,
      message: "Failed to generate token",
      statusCode: 500,
    };
  }
  const userData: ResponseData = {
    accessToken: token,
    userId: getUserByEmail.userId,
    userName: getUserByEmail.userName,
  };
  return {
    isError: false,
    message: "Login successful",
    statusCode: 200,
    data: userData,
  };
};

export const authSignUpService = async (
  data: Request,
): Promise<ServiceResponse<ResponseData>> => {
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
    confirmPassword,
  }: UserRequest = data.body;
  if (!userName) return { isError: true, message: "Username is required", statusCode: 400 };
  if (!firstName) return { isError: true, message: "First name is required", statusCode: 400 };
  if (!secondName) return { isError: true, message: "Second name is required", statusCode: 400 };
  if (!emailAddr) return { isError: true, message: "Email address is required", statusCode: 400 };
  if (!password) return { isError: true, message: "Password is required", statusCode: 400 };
  if (!gender) return { isError: true, message: "Gender is required", statusCode: 400 };
  if (!age) return { isError: true, message: "Age is required", statusCode: 400 };
  if (!phone) return { isError: true, message: "Phone number is required", statusCode: 400 };
  if (!idNo) return { isError: true, message: "ID number is required", statusCode: 400 };
  if (!confirmPassword) return { isError: true, message: "Confirm password is required", statusCode: 400 };
  if (password !== confirmPassword) {
    return { isError: true, message: "Passwords do not match", statusCode: 400 };
  }

  const existingUser = await handleGetUserByEmail(emailAddr);

  if (!isRepositoryError(existingUser)) {
    return {
      isError: true,
      message: "User already exists",
      statusCode: 409,
    };
  }

  const hashedPassword = await hashPassword(password);
  if (!hashedPassword) {
    return {
      isError: true,
      message: "Failed to hash password",
      statusCode: 500,
    };
    }

     const userExists = await handleGetUserByEmail(emailAddr);
        if (isRepositoryError(userExists) && userExists.statusCode === 409) {
            return { isError: true, message: "User already exists", statusCode: 409 };
        }

    const savedUser = await saveUser({
        userName,
        firstName,
        secondName,
        emailAddr,
        gender,
        age,
        phone,
        idNo,
        password: hashedPassword
    });

    if (isRepositoryError(savedUser)) {
        return {
            isError: true,
            message: savedUser.message,
            statusCode: Number(savedUser.statusCode),
        };
    }

    const token = generateToken({ userId: savedUser.userId, userName: savedUser.userName });
    if (!token) {
        return {
            isError: true,
            message: "Failed to generate token",
            statusCode: 500,
        };
    }

    return {
        isError: false,
        message: "User registered successfully",
        statusCode: 201,
        data: {
            accessToken: token,
            userId: savedUser.userId,
            userName: savedUser.userName,
        },
    };
};


export const getAllUsersService = async (): Promise<User[] | ServiceResponse<User>> => {
  const users = await getAllUsers();
  // check if the result is an error object or an array of users
  if (!Array.isArray(users)) {
    return { isError: true, message: users.message, statusCode: Number(users.statusCode) };
  }
  return users;
};