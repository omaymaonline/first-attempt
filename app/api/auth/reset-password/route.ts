import { NextResponse } from "next/server";

import { resetPassword } from "@/lib/services/auth/password";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        if (typeof body.token !== "string" || typeof body.password !== "string") {
            return NextResponse.json(
                { message: "Invalid request.", },
                { status: 400, },
            );
        }

        const result = await resetPassword(body.token, body.password,);

        if (!result.success) {
            return NextResponse.json(
                { message: result.message, },
                { status: 400, },
            );
        }

        return NextResponse.json({ message: "Password updated successfully.", });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { message: "Internal server error.", },
            { status: 500, },
        );
    }
}