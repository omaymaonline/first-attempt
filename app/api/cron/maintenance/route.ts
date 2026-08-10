import { NextResponse } from "next/server";

import { runMaintenance } from "@/lib/maintenance";

export async function GET(request: Request) {
    const authHeader = request.headers.get("authorization");

    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new NextResponse("Unauthorized", {
            status: 401,
        });
    }

    await runMaintenance();

    return NextResponse.json({
        success: true,
    });
}