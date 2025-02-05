import { z } from 'zod';

const createUserSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  role: z.enum(['user', 'admin']),
});

export type CreateUserFormData = z.infer<typeof createUserSchema>;

const updateUserSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['user', 'admin']),
});

export type UpdateUserFormData = z.infer<typeof updateUserSchema>;

export { createUserSchema, updateUserSchema };
