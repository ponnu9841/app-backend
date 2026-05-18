import { z } from "zod";

export const userUpdateSchema = z.object({
	name: z.string().optional(),
	email: z.email().optional(),
	password: z.string().min(6).optional(),
});

export const changePasswordSchema = z.object({
	currentPassword: z.string().min(6),
	newPassword: z.string().min(6),
});

export const sendEmailOtpSchema = z.object({
	phoneNumber: z.string().min(6),
});

export const updatePhoneSchema = z.object({
	phoneNumber: z.string().min(6),
	otp: z.string().min(4),
});
