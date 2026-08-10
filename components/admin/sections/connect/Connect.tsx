"use client";

import { useState } from "react";
import ConnectSidebar from "./ConnectSidebar";

import Contact from "./contact/Contact";
import Messages from "./messages/Messages";
import Calls from "./calls/Calls";
import Meetings from "./meetings/Meetings";
import Schedule from "./schedule/Schedule";

import { AdminConnectView } from "./types";

export default function Connect() {
    const [view, setView] = useState<AdminConnectView>("contact");

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-4xl">Connect</h1>
                <p className="mt-2 text-gray-500">
                    Manage communication and meetings
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
                <div className="min-h-[100px]">
                    <ConnectSidebar view={view} setView={setView} />
                </div>

                {view === "contact" && <Contact />}
                {view === "messages" && <Messages />}
                {view === "calls" && <Calls />}
                {view === "meetings" && <Meetings />}
                {view === "schedule" && <Schedule />}
            </div>
        </div>
    );
}
