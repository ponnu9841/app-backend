import { Request } from "express";
import { Role } from "../../generated/prisma/enums";

export type AuthUser = {
	id: string;
	role: Role;
};

export type AuthRequest = Request & {
	user?: AuthUser;
};

export type AuthRequestWithUser = Request & {
	user: AuthUser;
};
