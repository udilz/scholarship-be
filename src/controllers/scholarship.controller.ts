import type { Request, Response } from "express";
import { Scholarship } from "../models/scholarship.schema";
import ScholarshipServices from "../services/scholarship.services";
import { IScholarshipData } from "../types/scholarships.type";

const ScholarshipController = {
   handleGetAllScholarships: async (_req: Request, res: Response) => {
      const allScholarships = await ScholarshipServices.getAll();
      return res.json({ data: allScholarships });
   },

   handleCreateScholarship: async (req: Request, res: Response) => {
      const requiredFields = [
         "name",
         "description",
         "country",
         "city",
         "major",
         "email",
         "degrees",
         "funding_type",
         "open_date",
         "close_date",
      ];

      // Check for missing required fields
      for (const field of requiredFields) {
         if (!req.body[field]) {
            return res.status(400).json({ error: "All fields are required." });
         }
      }

      try {
         const newScholarshipData: IScholarshipData = req.body;
         // method to create new scholarship into the database
         const createScholarship = await ScholarshipServices.createScholarship(newScholarshipData);

         // return response
         return res
            .status(201)
            .json({ message: "New Scholarship created successfully", data: { _id: createScholarship._id } });
      } catch {
         return res.status(500).json({ error: "Failed to create the scholarship." });
      }
   },

   handleUpdateScholarship: async (req: Request, res: Response) => {
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
   },
   handleDeleteScholarship: async (req: Request, res: Response) => {
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
   },
};

export default ScholarshipController;
