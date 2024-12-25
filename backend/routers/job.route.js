import express from 'express';
import {postJob,getAllJobs,getAdminJobs,getJobById} from '../controllers/job.controller.js';
import auth from '../middlewares/auth.js';
const router = express.Router();
router.route('/post').post(auth,postJob);
router.route('/get').get(getAllJobs);
router.route('/get/:id').get(getJobById);
router.route('/admin').get(auth,getAdminJobs);

export default router;