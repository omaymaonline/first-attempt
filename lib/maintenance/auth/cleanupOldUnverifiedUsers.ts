import { prisma } from "@/lib/prisma";

export async function cleanupOldUnverifiedUsers() {
    const sevenDaysAgo = new Date(Date.now() - 1000 * 60 * 60 * 24 * 7,);

    await prisma.user.deleteMany({
        where: {
            emailVerified: false,
            createdAt: { lt: sevenDaysAgo, },
        },
    });
}