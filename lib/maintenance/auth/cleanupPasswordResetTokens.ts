import { prisma } from "@/lib/prisma";

export async function cleanupPasswordResetTokens() {
    await prisma.passwordResetToken.deleteMany({
        where: { expiresAt: { lt: new Date(), }, },
    });
}