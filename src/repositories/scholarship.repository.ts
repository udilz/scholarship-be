import { Scholarship } from "../models/scholarship.schema";
import { IScholarshipData } from "../types/scholarships.type";

const ScholarshipRepository = {
   getAll: async () => {
      // business logic
      try {
         // input validation
         const allScholarships = await Scholarship.find();

         //  filtering by DTO
         return allScholarships;
      } catch (error) {
         console.log("Cannot get from database", error);
      }
   },

   createScholarship: async (newScholarshipData: IScholarshipData) => {
      try {
         // Create new scholarship in the database
         const newScholarship = new Scholarship(newScholarshipData);
         return await newScholarship.save();
      } catch (error) {
         console.log("Error creating scholarship in repository", error);
         throw new Error("Error creating scholarship in repository");
      }
   },

   findById: async (scholarshipId: string) => {
      try {
         return await Scholarship.findById(scholarshipId);
      } catch (_error) {
         throw new Error("Error finding scholarship");
      }
   },

   // New method for updating a scholarship
   updateScholarship: async (scholarshipId: string, updatedData: IScholarshipData) => {
      try {
         const updatedScholarship = await Scholarship.findOneAndUpdate(
            { _id: scholarshipId },
            { $set: updatedData },
            { new: true, omitUndefined: true },
         );
         return updatedScholarship;
      } catch (error) {
         console.log("Error updating scholarship in repository", error);
         throw new Error("Error updating scholarship in repository");
      }
   },

   deleteScholarship: async (scholarshipId: string) => {
      // Method to delete scholarship
      try {
         return await Scholarship.findByIdAndDelete(scholarshipId);
      } catch (error) {
         console.log("Error deleting scholarship in repository", error);
         throw new Error("Error deleting scholarship in repository");
      }
   },
};

export default ScholarshipRepository;
