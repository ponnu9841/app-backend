import { type Request, type Response, type NextFunction } from "express"
import * as UserService from "@/services/user.service"
import { AuthRequest } from "@/types/authRequest";
import { hashPassword } from "@/utils/password";

export const getUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({ data: req.user });
    } catch (error) {
        next(error)
    }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;

        const hashedPassword = data.password ? await hashPassword(data.password) : "";
        const reqBody = {
            id: req.body.id as string,
            name: (req.body.name as string) || "",
            email: (req.body.email as string) || "",
            password: hashedPassword
        }
        const userCreated = await UserService.updateUser(reqBody);
        const { password, ...rest } = userCreated;
        res.status(200).json({ data: rest });
    } catch (error) {
        next(error)
    }
}