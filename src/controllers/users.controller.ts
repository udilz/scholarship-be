import type { Request, Response } from "express";
import UsersServices from "../services/users.services";
import { IUser } from "../types/users.type";


const UserController = {
    handleGetAllUser: async (_: Request, res: Response) => {
       const allUsers = await UsersServices.getAll();
        return res.json({ data: allUsers });
    },

    handleLoginUser: async (req: Request, res: Response) => {
      const { email, password } = req.body;
      const loginUser = await UsersServices.loginUser(email,password);
      if(!loginUser) {
         return res.json({ message: "Invalid email or password" });
      }
      return res.cookie("AccessToken", loginUser.accessToken,{httpOnly: true}).cookie("RefreshToken", loginUser.refreshToken,{httpOnly: true}).status(200).json({ message: "Login success" });
    },

    handleLogoutUser: async (req: Request, res: Response) => {
      const {RefreshToken} = req.cookies;
      if(!RefreshToken) {
         return res.json({ message: "Invalid token" });
      }
      const token = await UsersServices.logoutUser(RefreshToken);
      // console.log(token);
      if(!token) {
         return res.json({ message: "Invalid token" });
      }
      // // console.log(RefreshToken);
      // return res.json({ message: token });
      return res.clearCookie("AccessToken").clearCookie("RefreshToken").status(200).json({ message: "Logout success" });
    },
   

    handleCreateUser: async (req: Request, res: Response) => {
       const requiredFields = [
        "name",
        "email",
        "password"
       ];
       for (const field of requiredFields) {
          // For each required field, check if it exists in the request body
          if (!req.body[field]) {
             // If it doesn't exist, return an error
             return res.status(400).json({ error: `The ${field} field is required.` });
          }
       }
       try {
          const newUser: IUser = req.body;
          const createUser = await UsersServices.createUser(newUser);
          return res
             .status(201)
             .json({ message: "New user created successfully", data: { _id: createUser._id } });
       } catch {
          return res.status(500).json({ error: "Failed to create the scholarship." });
       }
    },
 
    handleUpdateUser: async (req: Request, res: Response) => {
       const header = req.headers.authorization;
       const userID = req.params.id;
       // updating a scholarship requires authorization
       if (header !== "123123") {
          return res.status(401).json({
             message: "Unauthorized",
          });
       }
       try {
          // business logic to update a scholarship
          // Call the service to update the scholarship
          const updateUser = await UsersServices.updateUser(userID, req.body);
 
          if (!updateUser) {
             return res.status(404).json({ message: "User not found" });
          }
          // return response
          return res.json({ message: "User updated successfully", updateUser });
       } catch (error) {
          return res.status(500).json({
             error: "Server error",
             details: error instanceof Error ? error.message : "An unknown error occurred",
          });
       }
    },
    handleDeleteUser: async (req: Request, res: Response) => {
       const userID = req.params.id;

       try {
          const deletedResult = await UsersServices.deleteUser(userID);
          if (!deletedResult) {
             return res.status(404).json({ error: "User not found" });
          }
          // Return Success response
          return res.status(200).json({ message: "User deleted successfully", data: { _id: deletedResult._id } });
       } catch (error) {
          const typedError = error as Error;
          return res.status(500).json({ message: typedError.message || "Server error", error: "failed to delete data" });
       }
    },
 };
 
 export default UserController;
 