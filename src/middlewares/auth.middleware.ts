import { Request, Response, NextFunction } from "express";
import { verifyToken } from "@/utils/jwt";

export interface AuthRequest extends Request {
	user?: any;
}

export const authMiddleware = (
	req: AuthRequest,
	res: Response,
	next: NextFunction,
) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		res.status(401).json({ message: "Unauthorized" });
		return;
	}

	const token = authHeader?.split(" ")[1];
	if (!token) return res.status(401).json({ message: "Unauthorized" });

	try {
		const decoded = verifyToken(token) as { user: any };
		if (typeof decoded === "object") {
			req.user = decoded;
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
