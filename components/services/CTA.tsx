"use client";

import { motion } from "framer-motion";

import PrimaryButton from "@/components/buttons&links/PrimaryButton"

export default function CTA() {
    return (
        <section className="relative py-16 px-6">
            <div className="mx-auto max-w-4xl text-center">
                <motion.div
                    initial={{ opacity: 0, y: 40, }}
                    whileInView={{ opacity: 1, y: 0, }}
                    viewport={{ once: true, }}
                    transition={{ duration: 0.8, }}
                >
                    
                    <h2 className="mt-16 text-5xl md:text-6xl font-medium">
                        Ready to begin?
                    </h2>

                    <p className="mx-auto mt-8 mb-4 max-w-2xl text-xl text-gray-600 leading-relaxed">
                        Whether you need a roadmap, a website,
                        or help deciding what comes next,
                        start with a short form and a conversation.
                    </p>

                    <PrimaryButton href="/services/onboarding/questionnaire">
                        Find Your Next Step
                    </PrimaryButton>

                </motion.div>
            </div>
        </section>
    );
}