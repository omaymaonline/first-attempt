"use client";

import { motion } from "framer-motion";

export default function Fit() {
    const goodFit = [
        "You feel overwhelmed and need clarity.",
        "You have ideas but don't know what to prioritise.",
        "You want a structured roadmap before investing time or money.",
        "You are open to feedback and alternative solutions.",
        "You prefer thoughtful decision-making over guessing.",
    ];

    const badFit = [
        "You are looking for guaranteed outcomes.",
        "You expect instant growth or instant results.",
        "You want someone to blindly agree with every idea.",
        "You are not willing to invest time into understanding your situation.",
        "You only want validation rather than honest recommendations.",
    ];

    return (
        <section className="mt-10 grid gap-8 md:grid-cols-2 mx-10">

            {/* Good Fit */}
            <motion.div initial={{ opacity: 0, y: 40, }} whileInView={{ opacity: 1, y: 0, }} viewport={{ once: true, }} transition={{ duration: 0.8, }}>
                <div className="rounded-3xl border border-green-200 bg-green-50 p-8">

                    <h2 className="text-3xl">
                        Good Fit
                    </h2>

                    <p className="mt-4 text-gray-600">
                        You will probably benefit from this process if:
                    </p>

                    <div className="mt-8 space-y-5">
                        {goodFit.map((item) => (
                            <div key={item} className="flex gap-3">
                                <span>✓</span>

                                <p>{item}</p>
                            </div>
                        ))}
                    </div>

                </div>

            </motion.div>


            {/* Not Good Fit */}
            <motion.div initial={{ opacity: 0, y: 40, }} whileInView={{ opacity: 1, y: 0, }} viewport={{ once: true, }} transition={{ duration: 1.4, }}>
                <div className="rounded-3xl border border-red-200 bg-red-50 p-8">

                    <h2 className="text-3xl">
                        Not a Good Fit
                    </h2>

                    <p className="mt-4 text-gray-600">
                        This process may not be suitable if:
                    </p>

                    <div className="mt-8 space-y-5">
                        {badFit.map((item) => (
                            <div key={item} className="flex gap-3">
                                <span>✕</span>

                                <p>{item}</p>
                            </div>
                        ))}
                    </div>

                </div>

            </motion.div>


        </section>

    );
}