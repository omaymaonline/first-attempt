import { NextResponse } from "next/server";

import { requestPasswordReset } from "@/lib/services/auth/password";

export async function POST(request: Request) {
    const body = await request.json();

    if (typeof body.email !== "string") { return NextResponse.json({ message: "Invalid request." }, { status: 400 },); }

    await requestPasswordReset(body.email);

    
    return NextResponse.json({ message: "If an account exists for this email, we've sent a password reset link.", });
}