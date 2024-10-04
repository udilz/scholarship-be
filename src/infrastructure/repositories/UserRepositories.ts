import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/interfaces/UserRepository";

export class InmemoryUserRepositories implements UserRepository {
    private users: User[] = [];

    async findAll(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    async findById(id: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    async create(user: User): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async update(user: User): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}