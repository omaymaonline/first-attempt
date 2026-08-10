import { prisma } from "@/lib/prisma";
import { generateVerificationToken } from "@/lib/tokens";

import { sendPasswordResetEmail } from "@/lib/email/sendPasswordResetEmail";
import { hashPassword } from "@/lib/auth/password";

import type { Prisma, PrismaClient, User, PasswordResetToken, } from "@/app/generated/prisma/client";

type PasswordDb = PrismaClient | Prisma.TransactionClient;

const PASSWORD_RESET_TOKEN_LIFETIME = 30 * 60 * 1000; // 30 minutes

type PasswordResetPreparation = {
    email: string;
    resetUrl: string;
};

type PreparePasswordResetResult =
    | (PasswordResetPreparation & { success: true })
    | { success: false; message: string; };

export type VerifyPasswordResetResult =
    | { success: true; request: PasswordResetToken }
    | { success: false; message: string };

export type ResetPasswordResult =
    | { success: true }
    | { success: false; message: string };


async function deletePasswordResetRequests(
    userId: string,
    db: PasswordDb = prisma,
) {
    await db.passwordResetToken.deleteMany({
        where: { userId },
    });
}

async function createPasswordResetRequest(
    user: Pick<User, "id" | "email">,
    db: PasswordDb = prisma,
) {
    const token = generateVerificationToken();
    const expiresAt = new Date(Date.now() + PASSWORD_RESET_TOKEN_LIFETIME,);

    await db.passwordResetToken.create({
        data: { userId: user.id, token, expiresAt, },
    });

    return token;
}

async function preparePasswordReset(
    email: string,
    db: PasswordDb = prisma,
): Promise<PreparePasswordResetResult> {

    const normalizedEmail = email.trim().toLowerCase();

    const user = await db.user.findUnique({
        where: { email: normalizedEmail, },
        select: { id: true, email: true, emailVerified: true, },
    });

    if (!user) { return { success: false, message: "If an account exists for this email, we've sent a password reset link.", }; }

    if (!user.emailVerified) { return { success: false, message: "Please verify your email before resetting your password.", }; }

    await deletePasswordResetRequests(user.id, db);

    const token = await createPasswordResetRequest(user, db);

    return {
        success: true,
        email: user.email,
        resetUrl: `${process.env.WEBSITE_URL}/reset-password?token=${token}`,
    };
}

async function sendPasswordReset(
    preparation: PasswordResetPreparation,
) {
    await sendPasswordResetEmail({
        to: preparation.email,
        resetUrl: preparation.resetUrl,
    });
}

export async function verifyPasswordResetToken(
    token: string,
    db: PasswordDb = prisma,
): Promise<VerifyPasswordResetResult> {
    const request = await db.passwordResetToken.findUnique({ where: { token }, });

    if (!request) { return { success: false, message: "This password reset link is invalid.", }; }

    if (request.expiresAt < new Date()) {
        await db.passwordResetToken.delete({ where: { id: request.id }, });
        return { success: false, message: "This password reset link has expired.", };
    }

    return { success: true, request, };
}

export async function resetPassword(
    token: string,
    password: string,
    db: PasswordDb = prisma,
): Promise<ResetPasswordResult> {

    const verification = await verifyPasswordResetToken(token, db);

    if (!verification.success) { return verification; }

    const hashedPassword = await hashPassword(password);

    await db.user.update({
        where: { id: verification.request.userId },
        data: {
            password: hashedPassword,
            sessionVersion: { increment: 1, },
        },
    });

    await db.passwordResetToken.delete({
        where: { id: verification.request.id, },
    });

    return { success: true, };
}



export async function requestPasswordReset(
    email: string,
    db: PasswordDb = prisma,
) {
    const preparation = await preparePasswordReset(email, db);

    /*
        Security:
        Never reveal whether an email exists.
    */

    if (!preparation.success) { return { success: true }; }

    await sendPasswordReset(preparation);

    return { success: true };
}