import { type Response, type NextFunction } from "express";
import * as UserService from "./user.service";
import { AuthRequest } from "@/types/authRequest";

export const getUser = async (
	req: AuthRequest,
	res: Response,
	next: NextFunction,
) => {
	try {
		res.status(200).json({ data: req.user });
	} catch (error) {
		next(error);
	}
};

export const changePassword = async (
	req: AuthRequest,
	res: Response,
	next: NextFunction,
) => {
	try {
		const userId = req.user?.id;
		if (!userId) {
			res.status(401).json({ error: "Unauthorized" });
			return;
		}

		const { currentPassword, newPassword } = req.body;
		await UserService.changePassword({ userId, currentPassword, newPassword });
		res.status(200).json({ message: "Password updated successfully" });
	} catch (error) {
		next(error);
	}
};

export const sendEmailOtp = async (
	req: AuthRequest,
	res: Response,
	next: NextFunction,
) => {
	try {
		const userId = req.user?.id;
		if (!userId) {
			res.status(401).json({ error: "Unauthorized" });
			return;
		}

		const { phoneNumber } = req.body;
		await UserService.sendMobileUpdateEmailOtp({ userId, phoneNumber });
		res.status(200).json({ message: "OTP sent to registered email" });
	} catch (error) {
		next(error);
	}
};

export const updatePhone = async (
	req: AuthRequest,
	res: Response,
	next: NextFunction,
) => {
	try {
		const userId = req.user?.id;
		if (!userId) {
			res.status(401).json({ error: "Unauthorized" });
			return;
		}

		const { phoneNumber, otp } = req.body;
		await UserService.verifyAndUpdateMobile({ userId, phoneNumber, otp });
		res
			.status(200)
			.json({ data: { message: "Mobile number updated successfully" } });
	} catch (error) {
		next(error);
	}
};
