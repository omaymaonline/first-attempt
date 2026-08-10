import { prisma } from "@/lib/prisma";

import { verifyPassword } from "@/lib/auth/password";

import type { User } from "@/app/generated/prisma/client";

const LOGIN_LOCK_TIME = 15 * 60 * 1000; // 15 minutes

const MAX_FAILED_ATTEMPTS = 5;

type LoginSuccess = {
    success: true;

    user: {
        id: string;
        name: string;
        email: string;
        role: string;
        isEmailVerified: boolean;
        sessionVersion: number;
    };
};

type LoginFailure = {
    success: false;
    reason:
    | "INVALID_CREDENTIALS"
    | "ACCOUNT_LOCKED"
    | "ACCOUNT_DISABLED";
};

type LoginResult =
    | LoginSuccess
    | LoginFailure;



async function findUser(
    email: string,
): Promise<User | null> {

    return prisma.user.findUnique({
        where: { email },
    });

}



async function unlockIfExpired(user: User) {
    if (user.lockedUntil && user.lockedUntil <= new Date()
    ) {
        await prisma.user.update({
            where: { id: user.id },
            data: { failedLoginCount: 0, lockedUntil: null, },
        });

        user.failedLoginCount = 0;
        user.lockedUntil = null;
    }
}



async function recordFailedLogin(user: User) {

    const failedLoginCount = user.failedLoginCount + 1;

    const lockedUntil =
        failedLoginCount >= MAX_FAILED_ATTEMPTS
            ? new Date(Date.now() + LOGIN_LOCK_TIME)
            : null;

    await prisma.$transaction([

        prisma.user.update({
            where: { id: user.id },
            data: {
                failedLoginCount,
                lockedUntil,
            },
        }),

        prisma.loginAttempt.create({
            data: {
                email: user.email,
                success: false,
            },
        }),

    ]);
}



async function recordFailedAttempt(
    email: string,
) {
    await prisma.loginAttempt.create({
        data: { email, success: false, },
    });
}



async function recordSuccessfulLogin(user: User) {

    await prisma.$transaction([

        prisma.user.update({
            where: { id: user.id },
            data: {
                failedLoginCount: 0,
                lockedUntil: null,
            },
        }),

        prisma.loginAttempt.deleteMany({
            where: {
                email: user.email,
                success: false,
            },
        }),

        prisma.loginAttempt.create({
            data: {
                email: user.email,
                success: true,
            },
        }),

    ]);
}



export async function loginUser(rawEmail: string, password: string,): Promise<LoginResult> {

    const email = rawEmail.trim().toLowerCase();

    const user = await findUser(email);

    if (!user) {
        await recordFailedAttempt(email);
        return { success: false, reason: "INVALID_CREDENTIALS", };
    }

    if (!user.isActive) {
        return { success: false, reason: "ACCOUNT_DISABLED", };
    }

    await unlockIfExpired(user);

    if (user.lockedUntil && user.lockedUntil > new Date()) {
        return { success: false, reason: "ACCOUNT_LOCKED", };
    }

    const valid = await verifyPassword(password, user.password,);

    if (!valid) {
        await recordFailedLogin(user);
        return { success: false, reason: "INVALID_CREDENTIALS", };
    }

    await recordSuccessfulLogin(user);

    return {
        success: true,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            isEmailVerified: user.emailVerified,
            sessionVersion: user.sessionVersion,
        },
    };
}