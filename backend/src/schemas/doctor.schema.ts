import { z } from 'zod';

export const doctorFiltersSchema = z.object({
  department: z.string().optional(),
  specialty: z.string().optional(),
});

export const doctorIdSchema = z.object({
  id: z.string().min(1, 'Invalid doctor ID'),
});

export type DoctorFilters = z.infer<typeof doctorFiltersSchema>;
