import MessageBubble from "./MessageBubble";
import MessageComposer from "./MessageComposer";

type ChatMessage = {
    id: string;
    sender: "user" | "me";
    content: string;
};

export default function Messages() {
    const messages: ChatMessage[] = [
        { id: "1", sender: "user", content: "Hello Omayma!" },
        { id: "2", sender: "me", content: "Hi there, how are you?" },
    ];

    return (
        <div className="border rounded-3xl bg-white flex flex-col overflow-hidden">
            <div className="border-b p-6">
                <h2 className="text-xl font-medium">Omayma Online</h2>
                <p className="text-sm text-gray-500">Conversations are private</p>
            </div>

            <div className="flex-1 p-6 space-y-4 overflow-y-auto">
                {messages.map((m) => (
                    <MessageBubble key={m.id} message={m} />
                ))}
            </div>

            <MessageComposer />
        </div>
    );
}