import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";

import { updatePassword } from "@/lib/services/settings/security/password";

export async function PATCH(request: Request) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 },
            );
        }

        const body = await request.json();

        if (typeof body.currentPassword !== "string" || typeof body.newPassword !== "string") {
            return NextResponse.json(
                { message: "Invalid request." },
                { status: 400 },
            );
        }

        const result = await updatePassword(
            session.user.id,
            body.currentPassword,
            body.newPassword,
        );

        if (!result.success) {
            return NextResponse.json(
                { message: result.message },
                { status: result.status },
            );
        }

        return NextResponse.json({ message: "Password updated.", });

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { message: "Internal server error." },
            { status: 500 },
        );
    }
}