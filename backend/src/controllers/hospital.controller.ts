import { Request, Response, NextFunction } from 'express';
import { hospitalService } from '../services/hospital.service.js';
import { sendSuccess, sendError } from '../utils/response.js';
import logger from '../utils/logger.js';

export const hospitalController = {
  async getHospitalInfo(_req: Request, res: Response, next: NextFunction) {
    try {
      const hospitalInfo = await hospitalService.getHospitalInfo();
      return sendSuccess(res, hospitalInfo);
    } catch (error: any) {
      if (error.message === 'Hospital information not found') {
        return sendError(res, 'NOT_FOUND', 'Hospital information not found', 404);
      }
      logger.error('Error fetching hospital info:', error);
      return next(error);
    }
  },
};
