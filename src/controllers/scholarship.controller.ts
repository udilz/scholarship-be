import { type Request, type Response } from "express";
import ScholarshipServices from "../services/scholarship.services";
import { IScholarshipData } from "../types/scholarships.type";
import OpenAI from "openai";
import config from "../config/config"; 
import { ChatCompletionMessageParam } from "../types/openAI.type";

const ScholarshipController = {
   handleGetAllScholarships: async (_: Request, res: Response) => {
      const allScholarships = await ScholarshipServices.getAll();
      return res.json({ data: allScholarships });
   },

   handleCreateScholarship: async (req: Request, res: Response) => {
      const requiredFields = [
         "name",
         "university",
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
      // Check that all required fields have been provided.
      // The required fields are specified in the requiredFields array.
      // If any of the required fields are missing, return a 400 error with a helpful message.
      for (const field of requiredFields) {
         // For each required field, check if it exists in the request body
         if (!req.body[field]) {
            // If it doesn't exist, return an error
            return res.status(400).json({ error: `The ${field} field is required.` });
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
         // Call the service to update the scholarship
         const updatedScholarship = await ScholarshipServices.updateScholarship(scholarshipId, req.body);

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
         const deletedResult = await ScholarshipServices.deleteScholarship(scholarshipId);

         if (!deletedResult) {
            return res.status(404).json({ error: "Scholarship not found" });
         }

         // Return Success response
         return res.status(200).json({ message: "Scholarship deleted successfully", data: { _id: deletedResult._id } });
      } catch (error) {
         const typedError = error as Error;
         return res.status(500).json({ message: typedError.message || "Server error", error: "failed to delete data" });
      }
   },
   handleGetData: async (req: Request, res: Response) => {
      try {
          const { country, major, degrees, funding_type, email } = req.body;
          const allScholarships = await ScholarshipServices.getScholarshipByData(country, major, degrees, funding_type);
          const userProfile = await ScholarshipServices.getUserProfile(email);
          const openai = new OpenAI({
              apiKey: config.OPENAI_API_KEY,
          });
          const mResponse = { userProfile: userProfile, scholarships: allScholarships };
  
          // Define the messages correctly without the unnecessary MessageContent structure.
          const messages: ChatCompletionMessageParam[] = [{
              role: "system",
              content: "You are an expert education consultant and good at viewing student profiles to get scholarships:\n\nIMPORTANT\nTHE OUTPUT SHOULD BE ONLY VALID JSON WITH THE FOLLOWING KEYS:\n- RELEVANCY: percentage\n- shortDescription: string\n- pros and cons analysis\n\nIMPORTANT\nINPUT SCHOLARSHIP LIST IN JSON FORMAT",
          }];
  
          // Using just a single string for user messages
          mResponse.scholarships.forEach((scholarship) => {
              messages.push({
                  role: "user",
                  content: `{"type": "text", "text": "Analyze the suitability of your profile to this scholarship program PROFILE: ${JSON.stringify(mResponse.userProfile)} SCHOLARSHIP: ${JSON.stringify(scholarship)}"}`,
              });
          });
  
          // Call the OpenAI API with the prepared messages
          const response = await openai.chat.completions.create({
              model: "gpt-4o-mini",
              messages: messages,
              temperature: 1,
              max_tokens: 2048,
              top_p: 1,
              frequency_penalty: 0,
              presence_penalty: 0,
          });
         if (!response.choices || response.choices.length === 0) {
               return res.status(400).json({ message: "Invalid response from OpenAI API" });
         }
         if (!response.choices[0].message) {
            return res.status(400).json({ message: "Invalid response from OpenAI API" });
         }
         const rekomendasiAI = response.choices[0].message.content;
         if (!rekomendasiAI) {
            return res.status(400).json({ message: "Invalid response from OpenAI API" });
         }
         const cleanRekomendasiAI = rekomendasiAI.replace(/(\r\n|\n|\r)/gm, "");
         try {
            const dataRekomendasi = JSON.parse(cleanRekomendasiAI);
            const hasilAI = [{
               "rekomendasi": dataRekomendasi,
               "listBeasiswa": mResponse.scholarships
            }];
            return res.status(200).json(hasilAI);
            }catch (error) {
            return res.status(400).json({ message: `Invalid response from OpenAI API: ${error}` });
         }
         // const hasilAI = [{
         //    "rekomendasi": response.choices[0].message.content,
         //    "listBeasiswa": mResponse.scholarships
         // }];
         // return res.status(200).json(hasilAI);
      //  console.log(hasilAI);

  
          
      } catch (error) {
          console.error(error);
          return res.status(500).json({ error: "An error occurred while processing your request." });
      }
  }
  
};

export default ScholarshipController;
