import { NextResponse } from "next/server";
import { registerUser } from "@/lib/services/auth/register";

export async function POST(request: Request) {
    const result = await registerUser(await request.json());

    if (!result.success) {
        return NextResponse.json(result.body, { status: result.status });
    }

    return NextResponse.json({
        message: "Account created. Check your email to verify your account.",
    });
}
