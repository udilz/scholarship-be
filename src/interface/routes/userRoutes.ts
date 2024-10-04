import { Router } from "express";
import { MongoUserRepository } from "../../infrastructure/repositories/MongoUserRepository";
import { GetAllUsers } from "../../use-cases/GetAllUsers";
import { UserController } from "../controllers/UserController";
import bcrypt from 'bcrypt';
import { UserModel } from "../../infrastructure/model/UserModel";


const router = Router();

const userRepository = new MongoUserRepository();
const getallUsers = new GetAllUsers(userRepository);
const userController = new UserController(getallUsers);

router.get("/users", (req, res) => userController.getAll(req, res));
router.post("/users/register", async (req, res) => {
    const { name, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    console.log({ name, email, hashPassword });
    const newUser = {
        name,
        email,
        password: hashPassword,
        role: null,
        educational_background: null,
        major: null,
        funding_need: null,
        preference: null,
        created_at: Date.now(),
        updated_at: null
    
    }
    const create = UserModel;
    const createUser = new create(newUser);
    const data = await createUser.save();
    return res.json({ message: "User register success", data });
});
export {router as userRoutes};
