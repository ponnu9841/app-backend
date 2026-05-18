import prisma from "@/config/database";

export const updateUser = async (data: {
    id: string;
    name?: string;
    email?: string;
    password?: string;
}) => {
    const user = await prisma.user.update({
        data,
        where: { id: data.id }
    })
    return user;
}
