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

   deleteScholarship: async (scholarshipId: string) => {
      try {
         const scholarship = await ScholarshipRepository.findById(scholarshipId);
         if (!scholarship) {
            return null;
         }
         return await ScholarshipRepository.deleteScholarship(scholarshipId);
      } catch (_error) {
         throw new Error("Error deleting scholarship");
      }
   },
};

export default ScholarshipServices;
