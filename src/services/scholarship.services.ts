import ScholarshipRepository from "../repositories/scholarship.repository";

const ScholarshipServices = {
   getAll: async () => {
      try {
         const allScholarships = await ScholarshipRepository.getAll();
         return allScholarships;
      } catch (error) {
         console.log("Scholarship service error", error);
      }
   },
};

export default ScholarshipServices;
