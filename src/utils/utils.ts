import { Prisma } from "@/../generated/prisma/client";

export const extractDuplicateField = (
	err: Prisma.PrismaClientKnownRequestError,
): string | undefined => {
	const meta = err.meta as Record<string, any> | undefined;

	const target = meta?.target;
	if (Array.isArray(target) && typeof target[0] === "string") return target[0];
	if (typeof target === "string") return target;

	const cause = meta?.driverAdapterError?.cause;
	const constraint = cause?.constraint;
	const fields: unknown = constraint?.fields ?? constraint?.columns;
	if (Array.isArray(fields) && typeof fields[0] === "string") return fields[0];

	const constraintName: string | undefined =
		typeof constraint === "string" ? constraint : constraint?.name;
	const match = constraintName?.match(/^[A-Za-z0-9]+_(.+)_key$/);
	if (match) return match[1];

	const originalMessage: string | undefined = cause?.originalMessage;
	const msgMatch = originalMessage?.match(
		/unique constraint "[A-Za-z0-9]+_(.+)_key"/,
	);
	if (msgMatch) return msgMatch[1];

	return undefined;
};
