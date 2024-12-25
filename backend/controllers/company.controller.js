import {Company} from "../models/company.model.js";
export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName)
      return res
        .status(400)
        .json({ message: "Company name is required", success: false });
    const existingCompany = await Company.findOne({name:companyName});
    if (existingCompany) {
      return res
        .status(400)
        .json({ message: "Company name already exists", success: false });
    }
    const company =await Company.create({
      name:companyName,
      userId:req.userId
    });
    return res
      .status(201)
      .json({
        message: "Company created successfully",
        success: true,
        company,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCompany= async (req, res) => {
  try {
    const userId = req.userId;
    const companies = await Company.find({userId});
    if (!companies) {
      return res
        .status(404)
        .json({ message: "Company not found", success: false });
    }
    return res.status(200).json({ success: true, companies });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res
        .status(404)
        .json({ message: "Company not found", success: false });
    }
    return res.status(200).json({ success: true, company });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const updateCompany = async (req, res) => {
  try {
    const {name, description, website, location} = req.body;
    const file = req.file;
    const updateData = {name, description, website, location};
    const companyId = req.params.id;
    const company = await Company.findByIdAndUpdate(companyId,updateData,{new:true});
    if(!company){
      return res.status(404).json({message:"Company not found",success:false});
    }
    return res
      .status(200)
      .json({ message: "Company updated successfully", success: true, company });
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}