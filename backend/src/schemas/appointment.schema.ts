import { z } from 'zod';

// Phone number validation (supports +91, 0, or plain 10-digit numbers)
const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;

export const createAppointmentSchema = z.object({
  patientName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters')
    .regex(/^[a-zA-Z\s.]+$/, 'Name can only contain letters, spaces, and periods'),
  phone: z
    .string()
    .regex(phoneRegex, 'Invalid phone number format')
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must not exceed 15 digits'),
  doctorId: z.string().optional(),
  departmentId: z.string().optional(),
  notes: z.string().max(500, 'Notes must not exceed 500 characters').optional(),
  preferredDate: z.string().datetime().optional().or(z.date().optional()),
});

export const updateAppointmentSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED']).optional(),
  doctorId: z.string().optional(),
  departmentId: z.string().optional(),
  notes: z.string().max(500).optional(),
  preferredDate: z.string().datetime().optional().or(z.date().optional()),
});

export const appointmentIdSchema = z.object({
  id: z.string().min(1, 'Invalid appointment ID'),
});

export const paginationSchema = z.object({
  page: z
    .string()
    .optional()
    .default('1')
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().int().positive()),
  limit: z
    .string()
    .optional()
    .default('10')
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().int().positive().max(100)),
});

export type CreateAppointmentInput = z.infer<typeof createAppointmentSchema>;
export type UpdateAppointmentInput = z.infer<typeof updateAppointmentSchema>;
