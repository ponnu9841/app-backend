import { comparePassword } from "@/utils/password";
import prisma from "@/config/database";
import { signToken } from "@/utils/jwt";


export const getUserByEmail = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: { email: email }
    });
    return user;
}


export const login = async (name: string | undefined, email: string, password: string, hashedPassword: string | undefined) => {

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
    password: string;
}) => {
    const user = await prisma.user.create({
        data
    })
    return user;
}
