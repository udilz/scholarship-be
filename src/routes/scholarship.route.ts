import express from "express";
import { Scholarship } from "../models/scholarship.schema";

export const scholarshipRouter = express.Router();

scholarshipRouter.get("/", async (_, res) => {
   // method to get all scholarships data
   const allScholarships = await Scholarship.find();

   return res.json({ data: allScholarships });
});

scholarshipRouter.post("/", async (req, res) => {
   // method to create new scholarship into the database
   const createScholarship = new Scholarship(req.body);
   await createScholarship.save();

   // return response
   return res.json({
      data: req.body,
   });
});

// method to delete a scholarship
scholarshipRouter.delete("/:id", async (req, res) => {
   const scholarshipId = req.params.id;

   try {
      // Check if the scholarship exists before deleting
      const scholarship = await Scholarship.findById(scholarshipId);

      if (!scholarship) {
         return res.status(404).json({ error: "Scholarship not found" });
      }

      // Delete the scholarship from the database
      await Scholarship.findByIdAndDelete(scholarshipId);

      // Return success response
      return res.status(200).json({
         message: "Scholarship deleted successfully",
         scholarship_id: scholarshipId,
      });
   } catch (error) {
      // Return server error response in case of any exceptions
      return res.status(500).json({
         message: error,
         error: "Server error",
      });
   }
});
