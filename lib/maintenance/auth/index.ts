import { cleanupExpiredVerificationTokens } from "./cleanupExpiredVerificationTokens";
import { cleanupExpiredEmailChangeRequests } from "./cleanupExpiredEmailChangeRequests";
import { cleanupOldUnverifiedUsers } from "./cleanupOldUnverifiedUsers";
import { cleanupPasswordResetTokens } from "./cleanupPasswordResetTokens";
import { cleanupOldLoginAttempts } from "./cleanupOldLoginAttempts";

export async function runAuthMaintenance() {
    await Promise.all([
        cleanupExpiredVerificationTokens(),
        cleanupExpiredEmailChangeRequests(),
        cleanupOldUnverifiedUsers(),
        cleanupPasswordResetTokens(),
        cleanupOldLoginAttempts(),
    ]);
}