import express from "express";
import { UserControllers } from "./users.controller.js";

const usersRouter = express.Router();
//users
usersRouter.route("/").get(UserControllers.getAllUsers);
usersRouter
  .route("/:userId")
  .get(UserControllers.getUserById)
  .delete(UserControllers.deleteUser);
// auth
const authRouter = express.Router();
authRouter.route("/login").post(UserControllers.loginUser);

// no common endpoints
const tempRouter = express.Router();

tempRouter.route("/createUser").post(UserControllers.createUser);
tempRouter.route("/updateUser/:userId").put(UserControllers.updateUser);

export { usersRouter, authRouter, tempRouter };
