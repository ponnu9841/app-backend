import { z } from 'zod';

export const userRegistrationSchema = z.object({
    username: z.string(),
    email: z.email(),
    password: z.string().min(8),
    address: z.string().optional()
});

export const userUpdationSchema = z.object({
    id: z.string(),
    username: z.string().optional(),
    email: z.email().optional(),
    password: z.string().optional(),
    address: z.string().optional()
});