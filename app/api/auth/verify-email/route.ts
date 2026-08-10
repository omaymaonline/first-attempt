import { NextRequest, NextResponse } from "next/server";

import { verifyEmail } from "@/lib/services/auth/verification";

export async function GET(request: NextRequest) {
    try {
        const token = request.nextUrl.searchParams.get("token");
        const result = await verifyEmail(token);
        if (result.status === "expired") {
            return NextResponse.redirect(
                new URL(`/verify-email?status=expired&token=${result.token}`, request.url)
            );
        }
        return NextResponse.redirect(
            new URL(`/verify-email?status=${result.status}`, request.url)
        );
    } catch (error) {
        console.error("Email verification error:", error);
        return NextResponse.redirect(
            new URL("/verify-email?status=error", request.url)
        );
    }
}