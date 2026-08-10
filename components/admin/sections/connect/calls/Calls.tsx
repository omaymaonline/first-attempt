"use client";

export default function Calls() {
    return (
        <div className="bg-white rounded-3xl shadow-sm p-6 h-full flex flex-col items-center justify-center text-gray-500">
            <h2 className="text-xl font-medium mb-2">Calls</h2>
            <p>No calls yet.</p>
            <button className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition">
                Request Call
            </button>
        </div>
    );
}
