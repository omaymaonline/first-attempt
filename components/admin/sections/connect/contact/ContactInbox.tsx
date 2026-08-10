"use client";

import { useEffect, useState } from "react";
import { ContactData } from "@/components/contact/types";

export default function ContactInbox({
    onSelect,
}: {
    onSelect: (submission: ContactData) => void;
}) {
    const [submissions, setSubmissions] = useState<ContactData[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("contactSubmissions");
        if (saved) setSubmissions(JSON.parse(saved));
    }, []);

    return (
        <div className="bg-white rounded-3xl shadow-sm p-4 h-full overflow-y-auto">
            <h2 className="text-lg font-medium mb-4">Inbox</h2>
            {submissions.length === 0 && (
                <p className="text-gray-500">No submissions yet.</p>
            )}
            <ul className="space-y-2">
                {submissions.map((s, i) => (
                    <li key={i}>
                        <button
                            onClick={() => onSelect(s)}
                            className="block w-full text-left px-3 py-2 rounded-xl hover:bg-pink-50 transition"
                        >
                            <p className="font-medium">{s.name}</p>
                            <p className="text-sm text-gray-500 truncate">{s.subject}</p>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}