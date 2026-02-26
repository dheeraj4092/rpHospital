import { Router } from 'express';
import { doctorController } from '../controllers/doctor.controller.js';
import { validateParams, validateQuery } from '../middleware/validator.js';
import { doctorFiltersSchema, doctorIdSchema } from '../schemas/doctor.schema.js';

const router = Router();

// Get all doctors (with optional filters)
router.get(
  '/',
  validateQuery(doctorFiltersSchema),
  doctorController.getAllDoctors
);

// Get doctor by ID
router.get(
  '/:id',
  validateParams(doctorIdSchema),
  doctorController.getDoctorById
);

export default router;
