import { useState } from "react";

export default function MessageComposer({
    onSend,
}: {
    onSend?: (text: string) => void;
}) {
    const [text, setText] = useState("");

    function handleSend() {
        if (!text.trim()) return;
        onSend?.(text.trim());
        setText("");
    }

    return (
        <div className="border-t p-4 flex items-center gap-2 bg-white">
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write a message..."
                className="flex-1 resize-none rounded-2xl border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                rows={1}
            />
            <button
                onClick={handleSend}
                className="px-4 py-2 bg-pink-500 text-white rounded-2xl hover:bg-pink-600 transition"
            >
                Send
            </button>
        </div>
    );
}
