import express from 'express';
import {registerCompany,getCompany,getCompanyById,updateCompany} from '../controllers/company.controller.js';
import auth from '../middlewares/auth.js';

const router = express.Router();
router.route('/register').post(auth,registerCompany); 
router.route('/get').get(auth, getCompany);
router.route('/get/:id').get(auth, getCompanyById);
router.route('/update/:id').put(auth, updateCompany);

export default router;