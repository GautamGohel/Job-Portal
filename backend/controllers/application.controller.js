import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
export const applyJob = async (req, res) => {
  try {
    const userId = req.userId;
    const jobId = req.params.id;
    if (!jobId) {
      return res
        .status(400)
        .json({ message: "Job id is required", success: false });
    }
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication) {
      return res
        .status(400)
        .json({ message: "Already applied for this job", success: false });
    }
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }
    const application = await Application.create({
      job: jobId,
      applicant: userId,
    });

    job.applications.push(application._id);
    await job.save();

    return res
      .status(201)
      .json({ message: "Applied successfully", success: true, application });
  } catch (error) {
    console.log(error);
  }
};

export const getApplications = async (req, res) => {
  //get all applications of a user
  try {
    const userId = req.userId;
    const applications = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 }) // Sort applications by createdAt in descending order
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });
    if (!applications) {
      return res
        .status(404)
        .json({ message: "No applications found", success: false });
    }
    return res.status(200).json({ success: true, applications });
  } catch (error) {
    console.log(error);
  }
};

export const getApplicants = async (req, res) => {
  //how many applicants applied for a job
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: { path: "applicant", options: { sort: { createdAt: -1 } } },
    });
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }
    return res
      .status(200)
      .json({ success: true, applicants: job.applications });
  } catch (error) {
    console.log(error);
  }
};

export const updateStatus= async (req, res) => {  
  try {
    const {status} = req.body;
    const applicationId = req.params.id;
    if(!status){
      return res.status(400).json({message:"Status is required",success:false});
    }
    const application = await Application.findById(applicationId);
    if(!application){
      return res.status(404).json({message:"Application not found",success:false});
    }

    application.status = status.toLowerCase();
    await application.save();
    return res
      .status(200)
      .json({ message: "Application updated successfully", success: true, application });
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }};
