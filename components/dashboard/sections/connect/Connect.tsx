"use client";

import { useState } from "react";
import { MessageCircle, Phone, Video, Calendar } from "lucide-react";

import MobileIconTabs from "@/components/layout/MobileIconTabs";
import ConnectSidebar from "./ConnectSidebar";

import Messages from "./messages/Messages";
import Calls from "./calls/Calls";
import Meetings from "./meetings/Meetings";
import Schedule from "./schedule/Schedule";

import { ConnectView } from "./types";

const items = [
    { id: "messages", label: "Messages", icon: MessageCircle },
    { id: "calls", label: "Calls", icon: Phone },
    { id: "meetings", label: "Meetings", icon: Video },
    { id: "schedule", label: "Schedule", icon: Calendar },
] as const;

export default function Connect() {
    const [view, setView] = useState<ConnectView>("messages");

    return (
        <div className="space-y-6">
            {/* Header */}
            <header>
                <h1 className="text-4xl">Connect</h1>
                <p className="mt-2 text-gray-500">Stay in touch and collaborate.</p>
            </header>

            {/* Mobile Tabs */}
            <MobileIconTabs active={view} setActive={setView} items={items} />

            {/* Layout */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr]">
                {/* Sidebar (desktop only) */}
                <aside className="hidden lg:block">
                    <div className="sticky top-30">
                        <ConnectSidebar view={view} setView={setView} />
                    </div>
                </aside>

                {/* Main Section */}
                <section>
                    {view === "messages" && <Messages />}
                    {view === "calls" && <Calls />}
                    {view === "meetings" && <Meetings />}
                    {view === "schedule" && <Schedule />}
                </section>
            </div>
        </div>
    );
}
