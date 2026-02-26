import { Request, Response, NextFunction } from 'express';
import { departmentService } from '../services/department.service.js';
import { sendSuccess, sendError } from '../utils/response.js';
import logger from '../utils/logger.js';

export const departmentController = {
  async getAllDepartments(_req: Request, res: Response, next: NextFunction) {
    try {
      const departments = await departmentService.getAllDepartments();
      return sendSuccess(res, departments);
    } catch (error) {
      logger.error('Error fetching departments:', error);
      return next(error);
    }
  },

  async getDepartmentById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const department = await departmentService.getDepartmentById(id);

      if (!department) {
        return sendError(res, 'NOT_FOUND', 'Department not found', 404);
      }

      return sendSuccess(res, department);
    } catch (error) {
      logger.error('Error fetching department:', error);
      return next(error);
    }
  },
};
