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
         // Attempt to update the scholarship with the provided updated data
         // The findByIdAndUpdate() method takes four parameters:
         // 1. The filter to find the document to update (in this case, the _id field)
         // 2. The update to apply to the document (in this case, the updatedData object)
         // 3. The options object, which specifies whether to return the updated document
         //    (in this case, we set new: true, which means that the method will return the
         //    updated document instead of the original document)
         // 4. The omitUndefined option, which specifies that if the updatedData object
         //    contains a property with an undefined value, that property should be
         //    ignored and not updated in the database.
         const updatedScholarship = await Scholarship.findOneAndUpdate(
            { _id: scholarshipId },
            { $set: updatedData },
            { new: true, omitUndefined: true },
         );
         // If the update is successful, return the updated scholarship
         return updatedScholarship;
      } catch (error) {
         // If the update fails, log the error and rethrow it
         // This is because we want to make sure the error is handled and logged
         // in the repository layer, and then rethrow it to the service layer
         // so that it can be handled by the error handling middleware
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
   searchScholarship: async ( country: string, major: string, degrees: string, funding_type: string ) => {
      try {
         const query: { country?: string; major?: string; degrees?: string; funding_type?: string } = {}
      if (country) {
         query.country = country;
      }
      if (major) {
         query.major = major;
      }
      if (degrees) {
         query.degrees = degrees;
      }
      if (funding_type) {
         query.funding_type = funding_type;
      }
         return await Scholarship.find(query);
      } catch (_error) {
         throw new Error("Error finding scholarship");
      }
   }
};

export default ScholarshipRepository;
