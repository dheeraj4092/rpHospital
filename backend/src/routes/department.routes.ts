import { Router } from 'express';
import { departmentController } from '../controllers/department.controller.js';

const router = Router();

// Get all departments
router.get('/', departmentController.getAllDepartments);

// Get department by ID
router.get('/:id', departmentController.getDepartmentById);

export default router;
