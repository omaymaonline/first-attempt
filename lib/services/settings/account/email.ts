import { prisma } from "@/lib/prisma";
import { generateVerificationToken } from "@/lib/tokens";
import { sendEmailChangeEmail } from "@/lib/email/sendEmailChangeEmail";

import type { Prisma, PrismaClient, User, EmailChangeRequest, } from "@/app/generated/prisma/client";

// Types & Constants
type EmailDb = PrismaClient | Prisma.TransactionClient;

export type EmailChangePreparation = {
    email: string;
    verificationUrl: string;
};

export type PrepareEmailChangeResult =
    | (EmailChangePreparation & { success: true })
    | { success: false; message: string };

export type VerifyEmailChangeResult =
    | { status: "success" }
    | { status: "invalid" }
    | { status: "expired"; token: string };

export type RequestEmailChangeResult =
    | { success: true; email: string }
    | { success: false; message: string };

const EMAIL_CHANGE_TOKEN_LIFETIME = 24 * 60 * 60 * 1000;

// Internal Helpers
async function deleteEmailChangeRequests(
    userId: string,
    db: EmailDb = prisma,
) {
    await db.emailChangeRequest.deleteMany({ where: { userId } });
}

async function createEmailChangeRequest(
    user: Pick<User, "id" | "email">,
    newEmail: string,
    db: EmailDb = prisma,
) {
    const token = generateVerificationToken();
    const expiresAt = new Date(Date.now() + EMAIL_CHANGE_TOKEN_LIFETIME);

    await db.emailChangeRequest.create({
        data: {
            userId: user.id,
            oldEmail: user.email,
            newEmail,
            token,
            expiresAt,
        },
    });

    return token;
}

async function prepareEmailChange(
    user: Pick<User, "id" | "email">,
    newEmail: string,
    db: EmailDb = prisma,
): Promise<PrepareEmailChangeResult> {
    const normalizedEmail = newEmail.trim().toLowerCase();

    if (normalizedEmail === user.email.toLowerCase()) {
        return {
            success: false,
            message: "Please enter a different email address.",
        };
    }

    const existingUser = await db.user.findUnique({ where: { email: normalizedEmail }, });

    if (existingUser) {
        return {
            success: false,
            message: "This email address is already in use.",
        };
    }

    await deleteEmailChangeRequests(user.id, db);

    const token = await createEmailChangeRequest(user, normalizedEmail, db,);

    return {
        success: true,
        email: normalizedEmail,
        verificationUrl: `${process.env.WEBSITE_URL}/api/auth/change-email?token=${token}`,
    };
}

async function sendEmailChange(preparation: EmailChangePreparation) {
    await sendEmailChangeEmail({
        to: preparation.email,
        verificationUrl: preparation.verificationUrl,
    });
}

async function resendForRequest(request: EmailChangeRequest) {
    const verification = await prepareEmailChange(
        { id: request.userId, email: request.oldEmail },
        request.newEmail,
    );

    if (!verification.success) { return { status: "invalid" as const }; }

    await sendEmailChange(verification);

    return {
        status: "success" as const,
        email: verification.email,
    };
}

// Public Functions
export async function requestEmailChange(
    user: Pick<User, "id" | "email">,
    newEmail: string,
    db: EmailDb = prisma,
): Promise<RequestEmailChangeResult> {
    const preparation = await prepareEmailChange(user, newEmail, db);

    if (!preparation.success) { return preparation; }

    await sendEmailChange(preparation);

    return { success: true, email: preparation.email };
}

export async function verifyEmailChange(
    token: string | null,
): Promise<VerifyEmailChangeResult> {
    if (!token) { return { status: "invalid" }; }

    const request = await prisma.emailChangeRequest.findUnique({
        where: { token },
        include: { user: true },
    });

    if (!request) { return { status: "invalid" }; }

    if (request.expiresAt < new Date()) { return { status: "expired", token }; }

    await prisma.user.update({
        where: { id: request.userId },
        data: {
            email: request.newEmail,
            sessionVersion: { increment: 1 },
        },
    });

    await prisma.emailChangeRequest.delete({
        where: { id: request.id },
    });

    return { status: "success" };
}

export async function resendEmailChange(token: string | null) {
    if (!token) { return { status: "invalid" as const }; }

    const request = await prisma.emailChangeRequest.findUnique({ where: { token } });

    if (!request) { return { status: "invalid" as const }; }

    return resendForRequest(request);
}

export async function getPendingEmailChange(userId: string) {
    const request = await prisma.emailChangeRequest.findUnique({
        where: { userId },
        select: { newEmail: true, expiresAt: true, },
    });

    if (!request) { return null; }

    return {
        email: request.newEmail,
        expiresAt: request.expiresAt,
    };
}

export async function resendPendingEmailChange(userId: string) {
    const request = await prisma.emailChangeRequest.findUnique({
        where: { userId },
    });

    if (!request) { return { success: false, message: "No pending email change request was found.", }; }

    const result = await resendForRequest(request);

    if (result.status !== "success") { return { success: false, message: "Unable to resend the verification email.", }; }

    return { success: true, };
}

export async function cancelEmailChange(userId: string) {
    await deleteEmailChangeRequests(userId);
    return { success: true, };
}