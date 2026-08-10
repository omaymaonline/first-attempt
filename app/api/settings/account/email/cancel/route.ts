import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";

import { cancelEmailChange } from "@/lib/services/settings/account/email";

export async function DELETE() {
    const session = await auth();

    if (!session?.user?.id) {
        return NextResponse.json(
            { message: "Unauthorized." },
            { status: 401 },
        );
    }

    await cancelEmailChange(session.user.id);

    return NextResponse.json({ success: true, });
}