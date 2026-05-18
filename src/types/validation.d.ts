import type { ZodObject, ZodRawShape } from "zod";

export type StrictZodObject = ZodObject<ZodRawShape, "strict">;

export type Schema = {
	querySchema: StrictZodObject;
	bodySchema: StrictZodObject;
	paramsSchema: StrictZodObject;
	headerSchema: StrictZodObject;
};
