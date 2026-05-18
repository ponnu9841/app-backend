import { Router } from "express";
import * as UserController from "./user.controller";
import {
	changePasswordSchema,
	sendEmailOtpSchema,
	updatePhoneSchema,
} from "./user.schema";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { validateRequestBody } from "@/middlewares/validation";

const router = Router();

router.get("/me", authMiddleware, UserController.getUser);
router.put(
	"/me/password",
	authMiddleware,
	validateRequestBody(changePasswordSchema),
	UserController.changePassword,
);
router.post(
	"/me/email/otp",
	authMiddleware,
	validateRequestBody(sendEmailOtpSchema),
	UserController.sendEmailOtp,
);
router.put(
	"/me/phone",
	authMiddleware,
	validateRequestBody(updatePhoneSchema),
	UserController.updatePhone,
);

export default router;
