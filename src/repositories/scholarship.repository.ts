import { Scholarship } from "../models/scholarship.schema";

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
};

export default ScholarshipRepository;
