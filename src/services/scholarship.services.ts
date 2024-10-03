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

   createScholarship: async (newScholarshipData: IScholarshipData) => {
      try {
         return await ScholarshipRepository.createScholarship(newScholarshipData);
      } catch (error) {
         console.log("Error creating scholarship in service", error);
         throw new Error("Error creating scholarship");
      }
   },
};

export default ScholarshipServices;
