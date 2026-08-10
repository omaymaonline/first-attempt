import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";

import { resendPendingEmailChange } from "@/lib/services/settings/account/email";

export async function POST() {
    const session = await auth();

    if (!session?.user?.id) {
        return NextResponse.json(
            { message: "Unauthorized." },
            { status: 401 },
        );
    }

    const result = await resendPendingEmailChange(session.user.id);

    if (!result.success) {
        return NextResponse.json(
            { message: result.message },
            { status: 400 },
        );
    }

    return NextResponse.json({ success: true, });
}