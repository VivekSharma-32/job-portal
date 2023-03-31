import express from "express";
import userAuth from "./../middlewares/authMiddleware.js";
import { createJob, getAllJobs } from "./../controllers/jobsController.js";

// router object
const router = express.Router();

// routes
// CREATE JOB || POST
router.post("/create-job", userAuth, createJob);

// GET JOBS || GET
router.get("/get-jobs", userAuth, getAllJobs);

export default router;
