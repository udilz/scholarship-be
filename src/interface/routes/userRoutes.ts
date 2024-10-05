import { Router } from "express";
import { MongoUserRepository } from "../../infrastructure/repositories/MongoUserRepository";
import { GetAllUsers } from "../../use-cases/GetAllUsers";
import { UserController } from "../controllers/UserController";
import bcrypt from 'bcrypt';
import { UserModel } from "../../infrastructure/model/UserModel";
import  jwt from "jsonwebtoken";
import { Auth } from "../../infrastructure/model/AuthModel";

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
router.post("/users/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });    
    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    }
    
    // Authorization
    const JWT_ACCESS_SECRET='+0NXAbo9BHgbgVBeCz522MwgDMhWZTMjtj8OqgkE6P0=';
    const JWT_REFRESH_SECRET='jO4t1WgXk6diBYSBFU4fAdHPKupqoAMAkuDsXuyCP0nYz54e+n2HHNEIXiPIPuXfCqzg/WZnkdLDXAqaHFdUlw==%';
    const Payload = {
        id: user._id,
        name: user.name,
        email: user.email   
    }
    const accessToken = jwt.sign(Payload, JWT_ACCESS_SECRET, { expiresIn: "1m" });
    const refreshToken = jwt.sign(Payload, JWT_REFRESH_SECRET, { expiresIn: "30d" });

    const newRefreshToken = new Auth({
        userId: user._id,
        RefreshToken: refreshToken
    })

    await newRefreshToken.save();
    return res.cookie("AccessToken", accessToken,{httpOnly: true}).cookie("RefreshToken", refreshToken,{httpOnly: true}).status(200).json({ message: "Login success" });
    // return res.json({ message: "Login success" });
})
router.post("/users/logout", async(req, res)=>{
    const {RefreshToken} = req.cookies;
    console.log(RefreshToken);
    if(!RefreshToken) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    await Auth.findOneAndDelete({RefreshToken});
    res.clearCookie("AccessToken").clearCookie("RefreshToken").status(200).json({ message: "Logout success" });
})

export {router as userRoutes};
