import { type Request, type Response, type NextFunction } from "express"
import * as AuthService from "@/services/auth.service"
import { hashPassword } from "@/utils/password";

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await AuthService.getUserByEmail(email);
        const { isValid, jwt } = await AuthService.login(user?.name, email, password, user?.password);
        console.log(isValid, jwt)
        if (isValid) {
            res.status(200).send({ data: { token: jwt } });
            return;
        }
        res.status(401).send({ error: 'Invalid email or password' });
    } catch (error) {
        next(error)
    }
}

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;

        const hashedPassword = await hashPassword(data.password);
        const reqBody = {
            name: req.body.name as string,
            email: req.body.email as string,
            password: hashedPassword
        }
        const userCreated = await AuthService.register(reqBody);
        const { password, ...rest } = userCreated;
        res.status(200).json({ data: rest });
    } catch (error) {
        next(error)
    }
}