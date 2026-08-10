import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

import AdminWorkspace from "@/components/admin/AdminWorkspace";

export default async function AdminPage() {
    const session = await auth();

    console.log("SESSION:", session);

    if (!session) { redirect("/auth/login"); }

    return <AdminWorkspace userName={session.user?.name ?? "CEO"} />;
}