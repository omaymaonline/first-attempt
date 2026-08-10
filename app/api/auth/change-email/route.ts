import { NextResponse } from "next/server";

import { verifyEmailChange } from "@/lib/services/settings/account/email";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const token = searchParams.get("token");

    const result = await verifyEmailChange(token);

    switch (result.status) {
        case "success":
            return NextResponse.redirect(
                new URL("/change-email?status=success", request.url)
            );

        case "expired":
            return NextResponse.redirect(
                new URL(`/change-email?status=expired&token=${result.token}`, request.url)
            );

        case "invalid":
        default:
            return NextResponse.redirect(
                new URL("/change-email?status=invalid", request.url)
            );
    }
}