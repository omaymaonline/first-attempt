import { prisma } from "@/lib/prisma";

import { hashPassword, verifyPassword, } from "@/lib/auth/password";

import { passwordStrong } from "@/lib/auth/passwordValidation";

type Failed = {
    success: false;
    status: number;
    message: string;
};

type Success = {
    success: true;
};

export async function updatePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
): Promise<Success | Failed> {

    if (!currentPassword) { return { success: false, status: 400, message: "Current password is required.", }; }

    if (!passwordStrong(newPassword)) { return { success: false, status: 400, message: "Password must meet all requirements.", }; }

    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { password: true, },
    });

    if (!user) { return { success: false, status: 404, message: "User not found.", }; }

    const matches = await verifyPassword(currentPassword, user.password,);

    if (!matches) { return { success: false, status: 400, message: "Current password is incorrect.", }; }

    const hashedPassword = await hashPassword(newPassword);

    await prisma.user.update({
        where: { id: userId, },
        data: { password: hashedPassword, sessionVersion: { increment: 1, }, },
    });

    return { success: true, };
}