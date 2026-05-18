import { z } from "zod";

export const registrationSchema = z
	.object({
		name: z.string(),
		email: z.email().optional(),
		mobileNumber: z
			.string()
			.regex(/^\d{10}$/, "Mobile number must be 10 digits")
			.optional(),

		password: z.string().min(6),
	})
	.refine((data) => data.email || data.mobileNumber, {
		message: "Either email or mobile number is required",
		path: ["email"],
	});

export const loginSchema = z.object({
	email: z.email(),
	password: z.string().min(6),
});
