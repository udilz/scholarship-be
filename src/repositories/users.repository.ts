import { Auth } from "../models/auth.schema";
import { Users } from "../models/users.schema";
import { IUser } from "../types/users.type";

const UsersRepository = {
    getAll: async () => {
       // business logic
       try {
          // input validation
          const allUsers = await Users.find();
 
          //  filtering by DTO
          return allUsers;
       } catch (error) {
          console.log("Cannot get from database", error);
       }
    },
 
    createUser: async (newUserData: IUser) => {
       try {
          const newUser = new Users(newUserData);
          return await newUser.save();
       } catch (error) {
          console.log("Error creating user in repository", error);
          throw new Error("Error creating user in repository");
       }
    },
 
    findById: async (userID: string) => {
       try {
          return await Users.findById(userID);
       } catch (_error) {
          throw new Error("Error finding user");
       }
    },

    findOne: async (email: string) => {
       try {
          return await Users.findOne({ email });
          console.log(email);
       } catch (_error) {
          throw new Error("Error finding user");
       }
    },
    updateUser: async (userID: string, updatedData: IUser) => {
       try {
          const updatedScholarship = await Users.findOneAndUpdate(
             { _id: userID },
             { $set: updatedData },
             { new: true, omitUndefined: true },
          );
          return updatedScholarship;
       } catch (error) {
          console.log("Error updating user in repository", error);
          throw new Error("Error updating user in repository");
       }
    },
 
    deleteUser: async (userID: string) => {
       // Method to delete scholarship
       try {
          return await Users.findByIdAndDelete(userID);
       } catch (error) {
          console.log("Error deleting user in repository", error);
          throw new Error("Error deleting user in repository");
       }
    },
    loginUser: async (email: string) => {
       try {
          const loginUser = await Users.findOne({ email });
          return loginUser;
          
       } catch (error) {
          console.log("Error logging user in repository", error);
          throw new Error("Error logging user in repository");
       }
    },

    logoutUser: async (refreshToken: string) => {
      try {
         const token = await Auth.findOne({ refreshToken });
         // console.log("repository", token);
         return token;
         
      } catch (error) {
         console.log("Error logging user in repository", error);
         throw new Error("Error logging user in repository");
      }
   },
   findToken: async (RefreshToken: string) => {
      try {
         return await Auth.findOne({ RefreshToken });
         // console.log(RefreshToken);
      } catch (_error) {
         throw new Error("Error finding user");
      }
   },
   deleteToken: async (token: string) => {
      // Method to delete scholarship
      try {
         return await Auth.findOneAndDelete({ RefreshToken: token });
      } catch (error) {
         console.log("Error deleting token in repository", error);
         throw new Error("Error deleting token in repository");
      }
   },

};
 export default UsersRepository;