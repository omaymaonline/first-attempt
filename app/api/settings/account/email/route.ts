import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";

import { requestEmailChange } from "@/lib/services/settings/account/email";

export async function POST(request: Request) {
    const session = await auth();

    if (!session?.user?.id || !session.user.email) {
        return NextResponse.json(
            { message: "Unauthorized." },
            { status: 401 },
        );
    }

    const body = await request.json();

    if (typeof body.email !== "string") {
        return NextResponse.json(
            { message: "Invalid request." },
            { status: 400 },
        );
    }

    const result = await requestEmailChange(
        { id: session.user.id, email: session.user.email, },
        body.email,
    );

    if (!result.success) {
        return NextResponse.json(
            { message: result.message },
            { status: 400 },
        );
    }

    return NextResponse.json({
        message: "Verification email sent.",
        email: result.email,
    });
}