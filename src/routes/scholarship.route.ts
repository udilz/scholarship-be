import express from "express";
import ScholarshipController from "../controllers/scholarship.controller";

export const scholarshipRouter = express.Router();

// method to get all scholarships
scholarshipRouter.get("/", ScholarshipController.handleGetAllScholarships);

// method to create new scholarship
scholarshipRouter.post("/", ScholarshipController.handleCreateScholarship);

// method to update a scholarship
scholarshipRouter.patch("/:id", ScholarshipController.handleUpdateScholarship);

// method to delete a scholarship
scholarshipRouter.delete("/:id", ScholarshipController.handleDeleteScholarship);

scholarshipRouter.post("/search", ScholarshipController.handleGetData);