import express from "express";
import { register,login,updateProfile,logout } from "../controllers/user.controller.js";
import auth from "../middlewares/auth.js";
import { singleUpload } from "../middlewares/multer.js";
const router=express.Router();
router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/profile/update").post(auth,singleUpload,updateProfile);
router.route("/logout").post(auth,logout);

export default router;