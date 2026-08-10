"use client";

import { getPasswordChecks } from "../../lib/auth/passwordValidation";

export default function PasswordStrength({ password }: { password: string }) {
    // Checks
    const checks = getPasswordChecks(password);

    // Score & percentage
    const score = Object.values(checks).filter(Boolean).length;
    const percent = (score / 5) * 100;

    // Missing requirements
    const missing: string[] = [];
    if (!checks.length) missing.push("8 characters");
    if (!checks.uppercase) missing.push("uppercase letter");
    if (!checks.lowercase) missing.push("lowercase letter");
    if (!checks.number) missing.push("number");
    if (!checks.special) missing.push("special character");

    // Render
    return (
        <div className="space-y-3">
            {/* Progress bar */}
            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div className="h-full rounded-full bg-gradient-to-r from-gray-400 via-pink-400 to-yellow-400 transition-all"
                    style={{ width: `${percent}%` }}
                />
            </div>

            {/* Feedback */}
            {score === 5 ? (<p className="text-sm text-yellow-600">Strong password</p>) : (<p className="text-sm text-gray-500">Missing: {missing.join(", ")}</p>)}
        </div>
    );
}