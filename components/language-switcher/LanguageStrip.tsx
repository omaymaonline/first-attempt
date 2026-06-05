"use client";

export default function LanguageStrip() {
    return (
        <div className="border-b border-pink-100 bg-pink-50 px-6 py-2 text-sm">
            <div className="mx-auto flex max-w-6xl gap-4 text-gray-600">

                <span className="transition hover:text-pink-500">
                    English
                </span>

                <span className="transition hover:text-pink-500">
                    Français
                </span>

                <span className="transition hover:text-pink-500">
                    العربية
                </span>


            </div>
        </div>
    );
}