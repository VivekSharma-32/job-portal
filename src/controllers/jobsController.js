import jobsModel from "../models/jobsModel.js";

// create new job
export const createJob = async (req, res, next) => {
  const { companyName, position } = req.body;
  if (!companyName || !position) {
    next("Fill all the fields");
  }
  req.body.createdBy = req.user.userId;
  const job = await jobsModel.create(req.body);
  res.status(201).json({
    job,
  });
};

// get all jobs controller
export const getAllJobs = async (req, res, next) => {
  const jobs = await jobsModel.find({ createdBy: req.user.userId });
  res.status(200).json({
    totalJobs: jobs.length,
    jobs,
  });
};
