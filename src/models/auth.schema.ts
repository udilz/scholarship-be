import {model, Schema} from "mongoose";
import { IAuth } from "../types/auth.type";

const AuthSchema = new Schema({
    userId: String,
    RefreshToken: String
});

// export const Auth = model("Auth", AuthSchema)
export const Auth = model<IAuth>("Auth", AuthSchema);