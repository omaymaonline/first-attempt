import type { User } from "@/app/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/email/sendVerificationEmail";

import type { PrismaClient, Prisma } from "@/app/generated/prisma/client";

type VerificationDb = PrismaClient | Prisma.TransactionClient;

type VerificationPreparation = {
    email: string;
    verificationUrl: string;
};

const VERIFICATION_TOKEN_LIFETIME = 24 * 60 * 60 * 1000;

export async function deleteVerificationTokens(
    userId: string,
    db: VerificationDb = prisma
) {
    await db.verificationToken.deleteMany({ where: { userId } });
}


async function createVerificationToken(userId: string, db: VerificationDb = prisma) {
    const token = generateVerificationToken();
    const expiresAt = new Date(Date.now() + VERIFICATION_TOKEN_LIFETIME);

    await db.verificationToken.create({
        data: { userId, token, expiresAt },
    });

    return token;
}

export async function prepareVerification(
    user: Pick<User, "id" | "email">,
    db: VerificationDb = prisma
): Promise<VerificationPreparation> {

    await deleteVerificationTokens(user.id, db);

    const token = await createVerificationToken(user.id, db);

    return {
        email: user.email,
        verificationUrl:
            `${process.env.WEBSITE_URL}/api/auth/verify-email?token=${token}`,
    };
}

export async function sendVerification(
    verification: VerificationPreparation
) {
    await sendVerificationEmail({
        to: verification.email,
        verificationUrl: verification.verificationUrl,
    });
}

export type VerifyEmailResult =
    | { status: "success" }
    | { status: "invalid" }
    | { status: "already-verified" }
    | { status: "expired"; token: string };

export async function verifyEmail(token: string | null): Promise<VerifyEmailResult> {
    if (!token) return { status: "invalid" };

    const verificationToken = await prisma.verificationToken.findUnique({
        where: { token },
        include: { user: true, },
    });
    if (!verificationToken) return { status: "invalid" };

    if (verificationToken.expiresAt < new Date()) {
        return { status: "expired", token };
    }

    const user = verificationToken.user;

    if (user.emailVerified) return { status: "already-verified" };

    await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: true },
    });

    await deleteVerificationTokens(user.id);

    return { status: "success" };
}


async function resendForUser(user: Pick<User, "id" | "email" | "emailVerified">): Promise<
    | { status: "success"; email: string }
    | { status: "already-verified" }
> {
    if (user.emailVerified) { return { status: "already-verified" }; }
    const verification = await prepareVerification(user);
    await sendVerification(verification);
    return { status: "success", email: user.email, };
}


export async function resendVerification(token: string | null): Promise<
    | { status: "success"; email: string }
    | { status: "invalid" }
    | { status: "already-verified" }
> {
    if (!token) { return { status: "invalid" }; }

    const verificationToken = await prisma.verificationToken.findUnique({
        where: { token },
        include: { user: true },
    });

    if (!verificationToken) { return { status: "invalid" }; }
    return resendForUser(verificationToken.user);
}


export async function resendVerificationByEmail(email: string | null): Promise<
    | { status: "success"; email: string }
    | { status: "invalid" }
    | { status: "already-verified" }
> {
    if (!email) { return { status: "invalid" }; }

    const user = await prisma.user.findUnique({
        where: { email: email.trim().toLowerCase(), },
    });

    if (!user) { return { status: "invalid" }; }
    return resendForUser(user);
}