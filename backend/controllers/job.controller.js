import {Job} from "../models/job.model.js";
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      jobType,
      experience,
      location,
      salary,
      position,
      companyId,
    } = req.body;
    if (
      !title ||
      !description ||
      !requirements ||
      !jobType ||
      !experience ||
      !location ||
      !salary ||
      !position ||
      !companyId
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    const userId = req.userId; //from middleware authenticaion
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      jobType,
      experience,
      location,
      salary: Number(salary),
      position,
      company: companyId,
      createdBy: userId,
    });
    return res.status(201).json({
      message: "Job created successfully",
      success: true,
      job,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs=await Job.find(query).populate("company");
    if (!jobs) {
      return res.status(404).json({ message: "No jobs found", success: false });
    }
    return res.status(200).json({ success: true, jobs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }
    return res.status(200).json({ success: true, job });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.userId;
    const jobs = await Job.find({ createdBy: adminId });
    if (!jobs) {
      return res.status(404).json({ message: "No jobs found", success: false });
    }
    return res.status(200).json({ success: true, jobs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};