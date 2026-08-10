import { prisma } from "@/lib/prisma";

const LOGIN_ATTEMPT_RETENTION_DAYS = 30;

export async function cleanupOldLoginAttempts() {
    const cutoff = new Date(
        Date.now() - LOGIN_ATTEMPT_RETENTION_DAYS * 24 * 60 * 60 * 1000,
    );

    const { count } = await prisma.loginAttempt.deleteMany({
        where: { createdAt: { lt: cutoff, }, },
    });

    return count;
}