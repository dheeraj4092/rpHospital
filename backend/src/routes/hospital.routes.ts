import { Router } from 'express';
import { hospitalController } from '../controllers/hospital.controller.js';

const router = Router();

// Get hospital information
router.get('/', hospitalController.getHospitalInfo);

export default router;
