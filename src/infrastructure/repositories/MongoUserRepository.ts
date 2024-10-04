import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/interfaces/UserRepository";
import { UserModel } from "../model/UserModel";

export class MongoUserRepository implements UserRepository{
    async findAll(): Promise<User[]> {
        return await UserModel.find();
    }
    async findById(id: string): Promise<User | null> {
        return await UserModel.findById(id);
    }
    async create(user: User): Promise<User> {
        const newUser = new UserModel(user);
        await newUser.save();
        return newUser;
    }

    async update(user: User): Promise<void> {
        await UserModel.findByIdAndUpdate(user.id, user);
    }
    async delete(id:string):Promise<void>{
        await UserModel.findByIdAndDelete(id);
    }
}