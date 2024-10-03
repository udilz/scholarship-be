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
};

export default ScholarshipRepository;
