import express from 'express';
import { applyJob,getApplications,getApplicants,updateStatus } from '../controllers/application.controller.js';
import auth from '../middlewares/auth.js';

const router = express.Router();
router.route('/apply/:id').post(auth,applyJob);
router.route('/get').get(auth,getApplications);
router.route('/:id/applicants').get(auth,getApplicants);
router.route('/status/:id/update').put(auth,updateStatus);

export default router; 
