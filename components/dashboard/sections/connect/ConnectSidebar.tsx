import { MessageCircle, Phone, Video, Calendar } from "lucide-react";
import { ConnectView } from "./types";

type Props = {
    view: ConnectView;
    setView: (v: ConnectView) => void;
};

const items = [
    { id: "messages", label: "Messages", icon: MessageCircle },
    { id: "calls", label: "Calls", icon: Phone },
    { id: "meetings", label: "Meetings", icon: Video },
    { id: "schedule", label: "Schedule", icon: Calendar },
] as const;

export default function ConnectSidebar({ view, setView }: Props) {
    return (
        <div className="max-h-[calc(100vh-5rem)] space-y-2 overflow-y-auto rounded-3xl bg-white p-4 shadow-md">
            {items.map(({ id, label, icon: Icon }) => (
                <button
                    key={id}
                    type="button"
                    onClick={() => setView(id as ConnectView)}
                    className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left transition 
                        ${view === id ? "bg-pink-50 text-pink-500" : "text-gray-500 hover:bg-gray-50"}`}
                >
                    <Icon size={18} />
                    {label}
                </button>
            ))}
        </div>
    );
}