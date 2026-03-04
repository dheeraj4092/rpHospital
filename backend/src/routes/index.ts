import { Router } from 'express';
import appointmentRoutes from './appointment.routes.js';
import doctorRoutes from './doctor.routes.js';
import departmentRoutes from './department.routes.js';
import hospitalRoutes from './hospital.routes.js';
import partnerRoutes from './partner.routes.js';
import bookingRoutes from './booking.routes.js';

const router = Router();

// Health check endpoint
router.get('/health', (_req, res) => {
  res.json({ success: true, message: 'Server is running', timestamp: new Date() });
});

// API routes
router.use('/appointments', appointmentRoutes);
router.use('/doctors', doctorRoutes);
router.use('/departments', departmentRoutes);
router.use('/hospital-info', hospitalRoutes);
router.use('/partners', partnerRoutes);
router.use('/booking', bookingRoutes);

export default router;
