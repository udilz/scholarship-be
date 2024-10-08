import ScholarshipRepository from "../repositories/scholarship.repository";
import { IScholarshipData } from "../types/scholarships.type";

const ScholarshipServices = {
   getAll: async () => {
      try {
         const allScholarships = await ScholarshipRepository.getAll();
         return allScholarships;
      } catch (error) {
         console.log("Scholarship service error", error);
      }
   },

   getOne: async (scholarshipId: string) => {
      try {
         // Fetch the scholarship by ID
         const scholarship = await ScholarshipRepository.findById(scholarshipId);

         // Return the scholarship or null if not found
         return scholarship;
      } catch (error) {
         console.log("Error fetching scholarship in service", error);
         throw new Error("Error fetching scholarship");
      }
   },

   createScholarship: async (newScholarshipData: IScholarshipData) => {
      try {
         return await ScholarshipRepository.createScholarship(newScholarshipData);
      } catch (error) {
         console.log("Error creating scholarship in service", error);
         throw new Error("Error creating scholarship");
      }
   },

   // New method for updating a scholarship
   updateScholarship: async (scholarshipId: string, updatedData: IScholarshipData) => {
      try {
         // Attempt to update the scholarship with the provided updated data
         const updatedScholarship = await ScholarshipRepository.updateScholarship(scholarshipId, updatedData);

         // If the update is successful, return the updated scholarship
         return updatedScholarship;
      } catch (error) {
         // If the update fails, log the error and rethrow it
         // This is because we want to make sure the error is handled and logged
         // in the service layer, and then rethrow it to the controller layer
         // so that it can be handled by the error handling middleware
         console.log("Error updating scholarship in service", error);
         throw new Error("Error updating scholarship");
      }
   },

   deleteScholarship: async (scholarshipId: string) => {
      try {
         const scholarship = await ScholarshipRepository.findById(scholarshipId);
         if (!scholarship) {
            return null;
         }
         return await ScholarshipRepository.deleteScholarship(scholarshipId);
      } catch (error) {
         console.log("Error deleting scholarship in service", error);
         throw new Error("Error deleting scholarship");
      }
   },
};

export default ScholarshipServices;
