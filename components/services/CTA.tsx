"use client";

import { motion } from "framer-motion";

import PrimaryButton from "@/components/buttons/PrimaryButton"

export default function CTA() {
    return (
        <section className="mt-10 relative py-16 px-6">
            <div className="mx-auto max-w-4xl text-center">
                <motion.div
                    initial={{ opacity: 0, y: 40, }}
                    whileInView={{ opacity: 1, y: 0, }}
                    viewport={{ once: true, }}
                    transition={{ duration: 0.8, }}
                >
                    <div className="flex flex-1 justify-center">

                        <div className="flex flex-col gap-1 text-lg font-medium tracking-[0.1em] text-gray-600 mt-2 md:flex-row md:items-center md:gap-2">

                            <span>Reduce chaos.</span>

                            <span className="hidden md:block"> </span>

                            <span>Create clarity.</span>

                            <span className="hidden md:block"> </span>

                            <span>Build thoughtful systems.</span>

                        </div>
                    </div>

                    <h2 className="mt-16 text-5xl md:text-6xl font-medium">
                        Ready to begin?
                    </h2>

                    <p className="mx-auto mt-8 mb-4 max-w-2xl text-xl text-gray-600 leading-relaxed">
                        Whether you need a roadmap, a website,
                        or help deciding what comes next,
                        start with a short form and a conversation.
                    </p>

                    <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-500">
                        Together, we&apos;ll determine the most sensible path forward.
                    </p>

                    <PrimaryButton href="/services/onboarding/questionnaire">
                        Find Your Next Step
                    </PrimaryButton>

                </motion.div>
            </div>
        </section>
    );
}