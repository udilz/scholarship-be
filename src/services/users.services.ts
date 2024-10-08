import UsersRepository from "../repositories/users.repository";
import { IUser } from "../types/users.type";
import bcrypt from 'bcrypt';
import  jwt from "jsonwebtoken";
import { Auth } from "../models/auth.schema";
import config from "../config/config"; 


const UsersServices = {
    getAll: async () => {
       try {
          const allUsers = await UsersRepository.getAll();
          return allUsers;
       } catch (error) {
          console.log("Users service error", error);
       }
    },
 
    createUser: async (newUser: IUser) => {
       try {
          return await UsersRepository.createUser(newUser);
       } catch (error) {
          console.log("Error creating user in service", error);
          throw new Error("Error creating user in service");
       }
    },
 
    updateUser: async (userID: string, updatedData: IUser) => {
       try {
          // Attempt to update the scholarship with the provided updated data
          const updatedUser = await UsersRepository.updateUser(userID, updatedData);
 
          // If the update is successful, return the updated scholarship
          return updatedUser;
       } catch (error) {
          // If the update fails, log the error and rethrow it
          // This is because we want to make sure the error is handled and logged
          // in the service layer, and then rethrow it to the controller layer
          // so that it can be handled by the error handling middleware
          console.log("Error updating user in service", error);
          throw new Error("Error updating user in service");
       }
    },
 
    deleteUser: async (userID: string) => {
       try {
          const user = await UsersRepository.findById(userID);
          if (!user) {
             return null;
          }
          return await UsersRepository.deleteUser(userID);
       } catch (error) {
          console.log("Error deleting user in service", error);
          throw new Error("Error deleting user in service");
       }
    },

    logoutUser: async (refreshTokena: string) => {
      try{
         // console.log("sericess");
         // console.log(refreshTokena);
         const RefreshToken = await UsersRepository.findToken(refreshTokena);
         // console.log(RefreshToken);
         if(!RefreshToken) {
            return "Unauthorized"
         }
         // console.log("Perpare delete token ",RefreshToken);
         // await Auth.findOneAndDelete({RefreshToken.RefreshToken});
         return await UsersRepository.deleteToken(RefreshToken.RefreshToken);
         // return RefreshToken;
      } catch (error) {
         console.log("Users service error", error);
      }

    },
    

    loginUser: async (email: string, password: string) => {
        try {
            const User = await UsersRepository.findOne(email);
            if (!User) {
               return null;
            }
            // console.log(password);
            // console.log(User);
            // console.log(User.password);
            const isMatch = await bcrypt.compare(password, User.password);
            if (!isMatch) {
               console.log({ message: "Invalid email or password XXXX" });
            }
            const Payload = {
               id: User._id,
               name: User.name,
               email: User.email
            }
                // Authorization
            const accessToken = jwt.sign(Payload, config.JWT_ACCESS_SECRET, { expiresIn: "10m" });
            const refreshToken = jwt.sign(Payload, config.JWT_REFRESH_SECRET, { expiresIn: "30d" });

            const newRefreshToken = new Auth({
               userId: User._id,
               RefreshToken: refreshToken
            })

            await newRefreshToken.save();
            return { accessToken, refreshToken };

                    
                   // return LoginUser.password;
         } catch (error) {
            console.log("Users service error", error);
         }
      }
 };
 
 export default UsersServices;
 