import express from "express";
import cors from "cors";
import dbConnect from "./utils/db";
import cookieParser from "cookie-parser";
import { scholarshipRouter } from "./routes/scholarship.route";
import { userRouter } from "./routes/users.route";
import config from "./config/config";
// dotenv.config();

const app = express();

// config
dbConnect();
app.use(
   cors({
      origin: "http://localhost:8000",
      credentials: true,
   }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// routes
app.use("/api/v1/scholarships", scholarshipRouter);
app.use("/api/v1/users/", userRouter);

// start server
app.listen(config.PORT, () => console.log(`Server running on port ${config.PORT}`));
