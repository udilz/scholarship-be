import mongoose from "mongoose";
import config from "../config/config";


export default async function dbConnect() {
   return mongoose
      .connect(config.MONGO_URI as string)
      .then(() => console.log("MongoDB connected"))
      .catch((err) => {
         console.log(err);
         process.exit(1);
      });
}
