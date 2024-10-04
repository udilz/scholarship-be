import express from "express";
import dotenv from "dotenv";
import { errorHandler } from "./interface/middleware/errorHandler";
import { userRoutes } from "./interface/routes/userRoutes";
import dbConnect from "./infrastructure/database/config";

dotenv.config();
dbConnect();
const app = express();
app.use(express.json());
app.use(errorHandler);
app.use("/api", userRoutes);    

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));

// import cors from "cors";
// import dbConnect from "./utils/db";
// import cookieParser from "cookie-parser";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();

// // config
// dbConnect();
// app.use(
//    cors({
//       origin: "http://localhost:5173",
//       credentials: true,
//    }),
// );
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));
// app.use(cookieParser());

// // routes

// app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
