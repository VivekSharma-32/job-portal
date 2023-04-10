import jobsModel from "../models/jobsModel.js";
import mongoose from "mongoose";
import moment from "moment";

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

// ======== UPDATE JOBS ====
export const updateJobController = async (req, res, next) => {
  const { id } = req.params;
  const { companyName, position, createdBy } = req.body;

  // validation
  if (!companyName || !position) {
    next("Please provide all fields");
  }
  // find job
  const job = await jobsModel.findOne({ _id: id });

  // validation
  if (!job) {
    next(`No job found with this id ${id}`);
  }

  if (!req.user.userId === job.createdBy.toString()) {
    next("You are not authorized to update this job");
    return;
  }

  const updateJob = await jobsModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ updateJob });
};

//  delete a job

export const deleteJobController = async (req, res, next) => {
  const { id } = req.params;
  // find job
  const job = await jobsModel.findOne({ _id: id });

  // validation
  if (!job) {
    next(`No job found by this id ${id}`);
  }

  if (!req.user.userId === job.createdBy.toString()) {
    next(`You are not authorized to delete this job`);
  }

  await job.deleteOne();

  res.status(200).json({ message: "Success, Job deleted" });
};

// ========= JOBS STATS AND FILTER ==========
export const jobStatsController = async (req, res) => {
  const stats = await jobsModel.aggregate([
    // search by user doc
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);
  const defaultStats = {
    pending: stats.pending || 0,
    reject: stats.reject || 0,
    interview: stats.interview || 0,
  };

  // monthly yearly stats
  let monthlyApplication = await jobsModel.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: {
          $sum: 1,
        },
      },
    },
  ]);

  monthlyApplication = monthlyApplication
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();

  res
    .status(200)
    .json({ totalJobs: stats.length, defaultStats, monthlyApplication });
};

// default stats
