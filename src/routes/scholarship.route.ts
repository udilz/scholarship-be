import express from "express";
import { Scholarship } from "../models/scholarship.schema";

export const scholarshipRouter = express.Router();

// method to get all scholarships
scholarshipRouter.get("/", async (_, res) => {
   // method to get all scholarships data
   const allScholarships = await Scholarship.find();

   return res.json({ data: allScholarships });
});

// method to create new scholarship
scholarshipRouter.post("/", async (req, res) => {
   // method to create new scholarship into the database
   const createScholarship = new Scholarship(req.body);
   await createScholarship.save();

   // return response
   return res.json({
      data: req.body,
   });
});

// method to update a scholarship
scholarshipRouter.patch("/:id", async (req, res) => {
   const header = req.headers.authorization;
   const scholarshipId = req.params.id;

   // updating a scholarship requires authorization
   if (header !== "123123") {
      return res.status(401).json({
         message: "Unauthorized",
      });
   }

   try {
      // business logic to update a scholarship
      const updatedScholarship = await Scholarship.findOneAndUpdate(
         { _id: scholarshipId },
         { $set: req.body },
         { new: true, omitUndefined: true },
      );

      if (!updatedScholarship) {
         return res.status(404).json({ message: "Scholarship not found" });
      }

      // return response
      return res.json({ message: "Scholarship updated successfully", updatedScholarship });
   } catch (error) {
      // We want to return a 500 error with a JSON body containing information about the error, but we need to be careful because the error object might not be an instance of Error.  This is because the error object might be an arbitrary object that was thrown by the code in the try block, or it might be a string, or it might be null, or it might be undefined, or it might be something else entirely.

      // So, we first check if the error object is an instance of Error.  If it is, then we know that it has a message property, and we can return a 500 error with a JSON body containing that message.

      // If the error object is not an instance of Error, then we don't know what properties it has, so we can't return a 500 error with a JSON body containing information about the error.  In this case, we just return a 500 error with a generic error message.

      // Narrow the type of error
      return res.status(500).json({
         error: "Server error",
         details: error instanceof Error ? error.message : "An unknown error occurred",
      });
   }
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
