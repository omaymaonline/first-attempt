"use client";

import Link from "next/link";

export default function ContactThankYouPage() {
    return (
        <section className="px-6 py-24">
            <div className="mx-auto max-w-2xl text-center">

                <h1 className="text-5xl font-semibold leading-tight md:text-6xl text-pink-500">
                    Thank You!
                </h1>

                {/* Message */}
                <p className="mt-6 text-lg leading-relaxed text-gray-600">
                    Your message has been successfully submitted.
                    We’ll review it and get back to you as soon as possible.
                </p>

                {/* Actions */}
                <div className="mt-10 flex justify-center gap-6">
                    <Link href="/" className="rounded-xl bg-pink-500 px-6 py-3 text-white shadow-sm transition hover:bg-pink-600">
                        Back to Home
                    </Link>

                    <Link href="/contact" className="rounded-xl border border-gray-300 px-6 py-3 text-gray-600 transition hover:border-pink-400 hover:text-pink-500">
                        Send Another Message
                    </Link>
                </div>
            </div>
        </section>
    );
}
