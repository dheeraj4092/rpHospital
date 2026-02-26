import { Router } from 'express';
import { appointmentController } from '../controllers/appointment.controller.js';
import { validate, validateParams, validateQuery } from '../middleware/validator.js';
import { appointmentLimiter } from '../middleware/rateLimiter.js';
import {
  createAppointmentSchema,
  updateAppointmentSchema,
  appointmentIdSchema,
  paginationSchema,
} from '../schemas/appointment.schema.js';

const router = Router();

// Create appointment (with rate limiting)
router.post(
  '/',
  appointmentLimiter,
  validate(createAppointmentSchema),
  appointmentController.createAppointment
);

// Get all appointments (with pagination)
router.get(
  '/',
  validateQuery(paginationSchema),
  appointmentController.getAllAppointments
);

// Get appointment by ID
router.get(
  '/:id',
  validateParams(appointmentIdSchema),
  appointmentController.getAppointmentById
);

// Update appointment
router.patch(
  '/:id',
  validateParams(appointmentIdSchema),
  validate(updateAppointmentSchema),
  appointmentController.updateAppointment
);

// Delete appointment
router.delete(
  '/:id',
  validateParams(appointmentIdSchema),
  appointmentController.deleteAppointment
);

export default router;
