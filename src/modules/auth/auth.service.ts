import { comparePassword } from "@/utils/password";
import prisma from "@/config/database";
import { signToken } from "@/utils/jwt";
import { extractDuplicateField } from "@/utils/utils";
import { Prisma } from "@/../generated/prisma/client";

export const getUserByEmailOrMobile = async (identifier: string) => {
	try {
		const user = await prisma.user.findFirst({
			where: {
				OR: [
					{
						email: identifier,
					},
					{
						mobile: identifier,
					},
				],
			},
		});

		return user;
	} catch (error) {
		throw new Error("Failed to retrieve user");
	}
};

export const login = async (
	name: string | undefined,
	email: string,
	password: string,
	hashedPassword: string | undefined,
) => {
	const match = await comparePassword(password, hashedPassword || "");
	if (match === false) return { isValid: false, jwt: null };
	const jwt = signToken({
		user: { name, email },
	});

	return { isValid: match, jwt };
};

export const register = async (data: {
	name: string;
	email: string;
	mobile: string;
	password: string;
}) => {
	try {
		const user = await prisma.user.create({ data });
		return user;
	} catch (err) {
		if (
			err instanceof Prisma.PrismaClientKnownRequestError &&
			err.code === "P2002"
		) {
			const field = extractDuplicateField(err) ?? "field";
			const error: Error & { status?: number } = new Error(
				`An account with this ${field} already exists`,
			);
			error.status = 409;
			throw error;
		}
		throw err;
	}
};
