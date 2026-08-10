import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";

import { updateName } from "@/lib/services/settings/account/account";

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

        if (typeof body.name !== "string") {
            return NextResponse.json(
                { message: "Invalid request." },
                { status: 400 },
            );
        }

        const result = await updateName(session.user.id, body.name,);

        if (!result.success) {
            return NextResponse.json(
                { message: result.message },
                { status: result.status },
            );
        }

        return NextResponse.json({
            message: "Name updated.",
            name: result.name,
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Internal server error.", },
            { status: 500, },
        );
    }
}