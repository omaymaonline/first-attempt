import { Mail, MessageCircle, Phone, Video, Calendar } from "lucide-react";
import { AdminConnectView } from "./types";

export default function ConnectSidebar({
    view,
    setView,
}: {
    view: AdminConnectView;
    setView: (v: AdminConnectView) => void;
}) {
    const items = [
        { id: "contact", label: "Contact", icon: Mail },
        { id: "messages", label: "Messages", icon: MessageCircle },
        { id: "calls", label: "Calls", icon: Phone },
        { id: "meetings", label: "Meetings", icon: Video },
        { id: "schedule", label: "Schedule", icon: Calendar },
    ] as const;

    return (
        <div className="bg-white rounded-3xl shadow-md p-4 space-y-2">
            {items.map(({ id, label, icon: Icon }) => (
                <button
                    key={id}
                    onClick={() => setView(id as AdminConnectView)}
                    className={`flex items-center gap-2 w-full px-3 py-2 rounded-xl transition
            ${view === id ? "bg-pink-50 text-pink-500" : "text-gray-500 hover:bg-gray-50"}`}
                >
                    <Icon size={18} />
                    {label}
                </button>
            ))}
        </div>
    );
}
