import mongoose, {Schema, Document} from "mongoose";

interface IUser extends Document{
    id:string;
    name: string;
    email: string;
    password: string;
    role: string;
    educational_background: string;
    major: string;
    funding_need: string;
    preference: string;
    created_at: Date;
    updated_at: Date;
}

const UserSchema: Schema = new Schema({
    id: String,
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: String,
    educational_background: String,
    major: String,
    funding_need: String,
    preference: String,
    created_at: Date,
    updated_at: Date
});

const UserModel = mongoose.model<IUser>("User", UserSchema);
export {UserModel, IUser}
