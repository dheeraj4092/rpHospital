import { Request, Response, NextFunction } from 'express';
import { doctorService } from '../services/doctor.service.js';
import { sendSuccess, sendError } from '../utils/response.js';
import logger from '../utils/logger.js';

export const doctorController = {
  async getAllDoctors(req: Request, res: Response, next: NextFunction) {
    try {
      const { department, specialty } = req.query;

      const filters = {
        ...(department && { department: department as string }),
        ...(specialty && { specialty: specialty as string }),
      };

      const doctors = await doctorService.getAllDoctors(filters);

      return sendSuccess(res, doctors);
    } catch (error) {
      logger.error('Error fetching doctors:', error);
      return next(error);
    }
  },

  async getDoctorById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const doctor = await doctorService.getDoctorById(id);

      if (!doctor) {
        return sendError(res, 'NOT_FOUND', 'Doctor not found', 404);
      }

      return sendSuccess(res, doctor);
    } catch (error) {
      logger.error('Error fetching doctor:', error);
      return next(error);
    }
  },
};
