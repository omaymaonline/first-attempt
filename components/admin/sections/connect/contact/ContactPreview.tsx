"use client";

import { ContactData } from "@/components/contact/types";

export default function ContactPreview({
    submission,
}: {
    submission: ContactData | null;
}) {
    if (!submission) {
        return (
            <div className="bg-white rounded-3xl shadow-sm p-6 flex items-center justify-center text-gray-400">
                Select a submission
            </div>
        );
    }

    return (
        <div className="bg-white rounded-3xl shadow-sm p-6 h-full overflow-y-auto">
            <h2 className="text-xl font-medium mb-2">{submission.subject}</h2>
            <p className="text-sm text-gray-500 mb-6">From: {submission.name} ({submission.email})</p>

            <div className="prose max-w-none mb-6">
                <p>{submission.message}</p>
            </div>

            {/* Future: reply box, actions */}
            <div className="border-t pt-4">
                <button className="px-4 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition">
                    Reply
                </button>
            </div>
        </div>
    );
}