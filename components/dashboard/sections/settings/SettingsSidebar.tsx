"use client";

import { User, Lock, Monitor, AlertTriangle } from "lucide-react";
import { SettingsView } from "./types";

type Props = {
    view: SettingsView;
    setView: (section: SettingsView) => void;
};

const items = [
    { id: "account", label: "Account", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "sessions", label: "Sessions", icon: Monitor },
    { id: "danger", label: "Danger Zone", icon: AlertTriangle },
] as const;

export default function SettingsSidebar({ view, setView }: Props) {
    return (
        <div className="max-h-[calc(100vh-5rem)] space-y-2 overflow-y-auto rounded-3xl bg-white p-4 shadow-md">
            {items.map(({ id, label, icon: Icon }) => (
                <button
                    key={id}
                    type="button"
                    onClick={() => setView(id)}
                    className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left transition
                    ${view === id ? "bg-gray-100 font-medium text-pink-900" : "text-gray-500 hover:bg-gray-50"}`}>
                    <Icon size={18} />
                    {label}
                </button>
            ))}
        </div>
    );
}
