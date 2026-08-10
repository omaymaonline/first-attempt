import { prisma } from "@/lib/prisma";

export async function cleanupExpiredEmailChangeRequests() {
    await prisma.emailChangeRequest.deleteMany({
        where: {
            expiresAt: { lt: new Date(), },
        },
    });
}