import bcrypt from "bcrypt";
import httpStatus from "http-status";
import { responseObj } from "../../../shared/response.js";
import { UserServices } from "./users.service.js";
import catchAsync from "../../../shared/catchAsync.js";
import { generateToken } from "../../../shared/generateToken.js";
import { responseMsg } from "../../../shared/responseMessage.js";

const createUser = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  let data = {};

  // Check if email exists
  const emailExists = await UserServices.checkEmailExists(email);
  if (emailExists) {
    const responseData = responseObj(
      httpStatus.BAD_REQUEST,
      "Email already exists"
    );
    return res.status(httpStatus.BAD_REQUEST).json(responseData);
  }

  const user = await UserServices.createUser(req.body);

  console.log(user);
  responseMsg(res, 200, "User creation successful");
});

const loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  let user = await UserServices.getUserByEmail(email);

  // Check if user exists
  if (!user) {
    return responseMsg(res, 404, "User Not Found");
  }

  // Check if password is correct
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return responseMsg(res, 401, "Invalid credentials");
  }

  res.status(200).json({
    message: "Login Successful",
    userId: user.userId,
    userRoleId: user.userRoleId,
  });
});

const deleteUser = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;
  const deletedUser = await UserServices.deleteUser(+userId);
  if (!deletedUser) {
    return responseMsg(res, 404, "User Not Found");
  }
  responseMsg(res, 200, "User deletion successful");
});

const updateUser = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;
  const updatedData = req.body;

  const updatedUser = await UserServices.updateUser(userId, updatedData);
  if (!updatedUser) {
    return responseMsg(res, 404, "User Not Found");
  }
  responseMsg(res, 200, "User update successful");
});

const getUserById = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;
  const user = await UserServices.getUserById(userId);
  if (!user) {
    return responseMsg(res, 404, "User Not Found");
  }

  res.status(200).json({
    user,
  });
});

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await UserServices.getAllUsers();
  res.json(users);
});

export const UserControllers = {
  createUser,
  deleteUser,
  updateUser,
  getUserById,
  getAllUsers,
  loginUser,
};
