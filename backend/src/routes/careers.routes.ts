import { Router } from 'express';
import { validate } from '../middleware/validator.js';
import { careerApplicationLimiter } from '../middleware/rateLimiter.js';
import { createCareerApplicationSchema } from '../schemas/careers.schema.js';
import { careersController } from '../controllers/careers.controller.js';

const router = Router();

router.post(
  '/applications',
  careerApplicationLimiter,
  validate(createCareerApplicationSchema),
  careersController.submitApplication
);

export default router;
