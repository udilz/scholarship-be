import express from "express";
import { Scholarship } from "../models/scholarship.schema";

export const scholarshipRouter = express.Router();

scholarshipRouter.get("/", async (_, res) => {
   // method to get all scholarships data
   const allScholarships = await Scholarship.find();

   return res.json({ data: allScholarships });
});
