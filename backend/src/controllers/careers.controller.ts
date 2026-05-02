import { Request, Response, NextFunction } from 'express';
import { sendSuccess } from '../utils/response.js';
import logger from '../utils/logger.js';
import { emailService } from '../services/email.service.js';

export const careersController = {
  async submitApplication(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const applicationData = req.body;

      await emailService.sendCareerApplicationNotification({
        fullName: applicationData.fullName,
        email: applicationData.email,
        phone: applicationData.phone,
        position: applicationData.position,
        experience: applicationData.experience,
        currentLocation: applicationData.currentLocation,
        coverLetter: applicationData.coverLetter,
        resumeFileName: applicationData.resumeFileName || undefined,
        resumeFileType: applicationData.resumeFileType || undefined,
        resumeFileBase64: applicationData.resumeFileBase64 || undefined,
        createdAt: new Date(),
      });

      logger.info(`New career application submitted by ${applicationData.fullName}`);

      sendSuccess(
        res,
        null,
        'Application submitted successfully. Our HR team will contact you if your profile matches the requirement.',
        201
      );
    } catch (error) {
      logger.error('Error submitting career application:', error);
      next(error);
    }
  },
};
