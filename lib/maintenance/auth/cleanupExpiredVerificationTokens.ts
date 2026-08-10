import { prisma } from "@/lib/prisma";

export async function cleanupExpiredVerificationTokens() {
    await prisma.verificationToken.deleteMany({
        where: {
            expiresAt: { lt: new Date(), },
        },
    });
}