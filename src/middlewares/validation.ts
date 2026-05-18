import { RequestHandler } from "express";
import { z } from "zod";

import { StatusCodes } from "http-status-codes";

const validate = (
	schema: z.ZodObject<any, any>,
	source: "body" | "params" | "query",
): RequestHandler => {
	return async (req, res, next) => {
		try {
			await schema.parseAsync(req[source]);
			next();
		} catch (err) {
			if (err instanceof z.ZodError) {
				const errorMessages = err.issues.map((issue: any) => ({
					message: `${issue.path.join(".")} is ${issue.message}`,
				}));
				res
					.status(StatusCodes.BAD_REQUEST)
					.json({ error: "Invalid data", details: errorMessages });
			} else {
				next(err);
			}
		}
	};
};

const validateRequestBody = (schema: z.ZodObject<any, any>): RequestHandler => {
	return validate(schema, "body");
};

const validateRequestParams = (schema: z.ZodObject<any, any>): RequestHandler => {
	return validate(schema, "params");
};

const validateRequestQuery = (schema: z.ZodObject<any, any>): RequestHandler => {
	return validate(schema, "query");
};

export { validateRequestBody, validateRequestParams, validateRequestQuery };
