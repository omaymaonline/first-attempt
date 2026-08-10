"use client";

import { useState } from "react";
import { User, Lock, Monitor, AlertTriangle } from "lucide-react";

import MobileIconTabs from "@/components/layout/MobileIconTabs";
import SettingsSidebar from "./SettingsSidebar";

import Account from "./account/Account";
import Security from "./security/Security";
import Sessions from "./sessions/Sessions";
import Danger from "./danger/Danger";

import { SettingsView } from "./types";


const items = [
    { id: "account", label: "Account", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "sessions", label: "Sessions", icon: Monitor },
    { id: "danger", label: "Danger Zone", icon: AlertTriangle },
] as const;

export default function SettingsSection() {
    const [view, setView] = useState<SettingsView>("account");

    return (
        <div className="space-y-6">
            {/* Header */}
            <header>
                <h1 className="text-4xl">Settings</h1>
            </header>

            {/* Mobile Navigation */}
            <MobileIconTabs active={view} setActive={setView} items={items} />

            {/* Layout */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr]">
                {/* Desktop Sidebar */}
                <aside className="hidden lg:block">
                    <div className="sticky top-30">
                        <SettingsSidebar view={view} setView={setView} />
                    </div>
                </aside>

                {/* Main Content */}
                <section>
                    {view === "account" && <Account />}
                    {view === "security" && <Security />}
                    {view === "sessions" && <Sessions />}
                    {view === "danger" && <Danger />}
                </section>
            </div>
        </div>
    );
}