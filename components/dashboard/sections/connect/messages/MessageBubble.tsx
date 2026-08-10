export default function MessageBubble({
    message,
}: {
    message: { id: string; sender: "user" | "me"; content: string };
}) {
    const isUser = message.sender === "user";

    return (
        <div
            className={`max-w-[70%] px-4 py-2 rounded-3xl text-sm ${isUser
                ? "bg-pink-500 text-white ml-auto"
                : "bg-gray-100 text-gray-700 mr-auto"
                }`}
        >
            {message.content}
        </div>
    );
}
