import { Request, Response, NextFunction } from "express";
import { Logger } from "@/utils/logger";
import { ApiResponse } from "@/utils/response";

export const errorHandler = (
	err: any,
	_req: Request,
	res: Response,
	_next: NextFunction,
) => {
	Logger.error(err);

	if (err instanceof SyntaxError && "body" in err) {
		return ApiResponse.error(res, "Invalid request", 400);
	}

	return ApiResponse.error(
		res,
		err.message || "Internal Server Error",
		err.status || 500,
	);
};
