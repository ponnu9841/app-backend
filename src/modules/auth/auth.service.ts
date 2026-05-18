import { comparePassword } from "@/utils/password";
import prisma from "@/config/database";
import { signToken } from "@/utils/jwt";
import { extractDuplicateField } from "@/utils/utils";
import { Prisma, type User } from "@/../generated/prisma/client";

export const getUserByEmailOrMobile = async (identifier: string) => {
	try {
		const user = await prisma.user.findFirst({
			where: {
				OR: [
					{
						email: identifier,
					},
					{
						phone: identifier,
					},
				],
			},
		});

		return user;
	} catch (error) {
		throw new Error("Failed to retrieve user");
	}
};

export const login = async (user: User, password: string) => {
	const match = await comparePassword(password, user.password || "");
	if (match === false) return { isValid: false, jwt: null };
	const jwt = signToken({
		user: {
			id: user.id,
			role: user.role,
		},
	});

	return { isValid: match, jwt };
};

export const register = async (data: {
	name: string;
	email: string;
	phone: string;
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
