import { z } from "zod";

export const userUpdateSchema = z.object({
	name: z.string().optional(),
	email: z.email().optional(),
	password: z.string().min(6).optional(),
});
