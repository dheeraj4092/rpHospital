import { Request, Response, NextFunction } from 'express';
import { appointmentService } from '../services/appointment.service.js';
import { sendSuccess, sendError } from '../utils/response.js';
import logger from '../utils/logger.js';

export const appointmentController = {
  async createAppointment(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const appointmentData = req.body;

      // Convert preferredDate to Date if it's a string
      if (appointmentData.preferredDate && typeof appointmentData.preferredDate === 'string') {
        appointmentData.preferredDate = new Date(appointmentData.preferredDate);
      }

      const appointment = await appointmentService.createAppointment(appointmentData);

      logger.info(`New appointment created: ${appointment.id} for ${appointment.patientName}`);

      sendSuccess(
        res,
        {
          id: appointment.id,
          patientName: appointment.patientName,
          phone: appointment.phone,
          status: appointment.status,
          doctor: appointment.doctor,
          department: appointment.department,
          createdAt: appointment.createdAt,
        },
        'Appointment created successfully. Our team will contact you shortly.',
        201
      );
    } catch (error: any) {
      logger.error('Error creating appointment:', error);
      next(error);
    }
  },

  async getAppointmentById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const appointment = await appointmentService.getAppointmentById(id);

      if (!appointment) {
        sendError(res, 'NOT_FOUND', 'Appointment not found', 404);
        return;
      }

      sendSuccess(res, appointment);
    } catch (error) {
      logger.error('Error fetching appointment:', error);
      next(error);
    }
  },

  async getAllAppointments(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const result = await appointmentService.getAllAppointments(page, limit);

      sendSuccess(res, result);
    } catch (error) {
      logger.error('Error fetching appointments:', error);
      next(error);
    }
  },

  async updateAppointment(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const updateData = req.body;

      // Convert preferredDate to Date if it's a string
      if (updateData.preferredDate && typeof updateData.preferredDate === 'string') {
        updateData.preferredDate = new Date(updateData.preferredDate);
      }

      const appointment = await appointmentService.updateAppointment(id, updateData);

      if (!appointment) {
        sendError(res, 'NOT_FOUND', 'Appointment not found', 404);
        return;
      }

      logger.info(`Appointment updated: ${appointment.id}`);

      sendSuccess(res, appointment, 'Appointment updated successfully');
    } catch (error: any) {
      if (error.code === 'P2025') {
        sendError(res, 'NOT_FOUND', 'Appointment not found', 404);
        return;
      }
      logger.error('Error updating appointment:', error);
      next(error);
    }
  },

  async deleteAppointment(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await appointmentService.deleteAppointment(id);

      logger.info(`Appointment deleted: ${id}`);

      sendSuccess(res, null, 'Appointment deleted successfully');
    } catch (error: any) {
      if (error.code === 'P2025') {
        sendError(res, 'NOT_FOUND', 'Appointment not found', 404);
        return;
      }
      logger.error('Error deleting appointment:', error);
      next(error);
    }
  },
};
