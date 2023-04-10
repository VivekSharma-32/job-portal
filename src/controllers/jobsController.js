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
  const { status, workType, search, sort } = req.query;

  // conditions for searching
  const queryObject = {
    createdBy: req.user.userId,
  };

  // logic filters
  if (status && status !== "all") {
    queryObject.status = status;
  }

  // worktype filter
  if (workType && workType !== "all") {
    queryObject.workType = workType;
  }

  // search filter
  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }

  let queryResult = jobsModel.find(queryObject);

  // sorting
  if (sort === "latest") {
    queryResult = queryResult.sort("-createdAt");
  }

  if (sort === "oldest") {
    queryResult = queryResult.sort("createdAt");
  }

  if (sort === "a-z") {
    queryResult = queryResult.sort("position");
  }
  if (sort === "z-a") {
    queryResult = queryResult.sort("-position");
  }

  // pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  queryResult = queryResult.skip(skip).limit(limit);

  // jobs count
  const totalJobs = await jobsModel.countDocuments(queryResult);
  const numberOfPage = Math.ceil(totalJobs / limit);

  const jobs = await queryResult;

  // const jobs = await jobsModel.find({ createdBy: req.user.userId });

  res.status(200).json({
    totalJobs,
    jobs,
    numberOfPage,
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
