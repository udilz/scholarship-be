import express from "express";
import cors from "cors";
import dbConnect from "./utils/db";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { scholarshipRouter } from "./routes/scholarship.route";

dotenv.config();

const app = express();

// config
dbConnect();
app.use(
   cors({
      origin: "http://localhost:5173",
      credentials: true,
   }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// routes
app.use("/scholarships", scholarshipRouter);

// start server
app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
