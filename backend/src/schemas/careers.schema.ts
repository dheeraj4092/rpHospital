import { z } from 'zod';

const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;

export const createCareerApplicationSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must not exceed 100 characters')
    .regex(/^[a-zA-Z\s.]+$/, 'Name can only contain letters, spaces, and periods'),
  email: z.string().email('Please provide a valid email address'),
  phone: z
    .string()
    .regex(phoneRegex, 'Invalid phone number format')
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must not exceed 15 digits'),
  position: z
    .string()
    .min(2, 'Position must be at least 2 characters')
    .max(120, 'Position must not exceed 120 characters'),
  experience: z
    .string()
    .min(1, 'Please select your experience')
    .max(50, 'Experience must not exceed 50 characters'),
  currentLocation: z
    .string()
    .min(2, 'Current location must be at least 2 characters')
    .max(120, 'Current location must not exceed 120 characters'),
  coverLetter: z
    .string()
    .min(30, 'Cover letter should be at least 30 characters')
    .max(2000, 'Cover letter must not exceed 2000 characters'),
  resumeFileName: z.string().max(255, 'Resume filename too long').optional(),
  resumeFileType: z.string().max(120, 'Resume type too long').optional(),
  resumeFileBase64: z.string().max(15_000_000, 'Resume file is too large').optional(),
});

export type CreateCareerApplicationInput = z.infer<typeof createCareerApplicationSchema>;
