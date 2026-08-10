"use client";

import NameCard from "./NameCard";
import EmailCard from "./EmailCard";

import { useCurrentUser } from "@/components/dashboard/useCurrentUser";

export default function Account() {
    const user = useCurrentUser();

    if (!user) return null;

    return (
        <div className="space-y-6">
            <NameCard initialName={user.name ?? ""} />
            <EmailCard initialEmail={user.email} />
        </div>
    );
}