import { User } from "../entities/User";

export interface UserRepository {
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User | null>;
    create(user: User): Promise<User>;
    update(user: User): Promise<void>;
    delete(id: string): Promise<void>;
}