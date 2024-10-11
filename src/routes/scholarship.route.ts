import express from "express";
import ScholarshipController from "../controllers/scholarship.controller";

export const scholarshipRouter = express.Router();

// method to get all scholarships
scholarshipRouter.get("/getall/", ScholarshipController.handleGetAllScholarships);

// method to get a scholarship
scholarshipRouter.get("/get/:id", ScholarshipController.handleGetOneScholarship);

// method to create new scholarship
scholarshipRouter.post("/create/", ScholarshipController.handleCreateScholarship);

// method to update a scholarship
scholarshipRouter.put("/update/:id", ScholarshipController.handleUpdateScholarship);

// method to delete a scholarship
<<<<<<< HEAD
scholarshipRouter.delete("/delete/:id", ScholarshipController.handleDeleteScholarship);
=======
scholarshipRouter.delete("/:id", ScholarshipController.handleDeleteScholarship);

scholarshipRouter.post("/search", ScholarshipController.handleGetData);
>>>>>>> 4309907 (update scholarship response with profile and push to AI prompt)
