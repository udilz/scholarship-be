import express from "express";
import UsersController from "../controllers/users.controller";

export const userRouter = express.Router();
userRouter.get("/all", UsersController.handleGetAllUser);
userRouter.post("/login", UsersController.handleLoginUser);
userRouter.post("/logout", UsersController.handleLogoutUser);
// userRouter.post("/", UsersController.handleCreateUser);
// userRouter.post("/", UsersController.handleUpdateUser);
// userRouter.post("/", UsersController.handleDeleteUser);