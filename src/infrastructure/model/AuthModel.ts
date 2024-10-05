import {model, Schema} from "mongoose";

const AuthSchema = new Schema({
    userId: String,
    RefreshToken: String
});

export const Auth = model("Auth", AuthSchema)