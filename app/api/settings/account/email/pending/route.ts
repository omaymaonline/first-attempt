import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";

import { getPendingEmailChange } from "@/lib/services/settings/account/email";

export async function GET() {
    const session = await auth();

    if (!session?.user?.id) {
        return NextResponse.json(
            { message: "Unauthorized." },
            { status: 401 },
        );
    }

    const pendingEmail = await getPendingEmailChange(session.user.id);

    return NextResponse.json({ pendingEmail, });
}