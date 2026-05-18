import { Response, NextFunction } from "express";
import { decodeToken } from "@/utils/jwt";
import {
	AuthRequest,
	AuthRequestWithUser,
	AuthUser,
} from "@/types/authRequest";

export const authMiddleware = (
	req: AuthRequest,
	res: Response,
	next: NextFunction,
) => {
	const authHeader = req.headers.authorization;

	// console.log(authHeader, "first")

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		res.status(401).json({ message: "Unauthorized" });
		return;
	}

	const token = authHeader?.split(" ")[1];
	if (!token) return res.status(401).json({ message: "Unauthorized" });

	try {
		const decoded = decodeToken(token) as {
			user: AuthUser;
		};
		if (decoded && typeof decoded === "object") {
			req.user = decoded.user;
			next();
			return;
		}
		res.status(401).json({ error: "Unauthorized" });
	} catch (error) {
		res.status(401).json({ message: "Unauthorized" });
		return;
	}

	return;
};

export const userExistsMiddleware = (
	req: AuthRequestWithUser,
	res: Response,
	next: NextFunction,
) => {
	try {
		if (!req.user) {
			res.status(401).json({ message: "User not found" });
		}
		next();
		return;
	} catch (error) {
		next(error);
	}
};
