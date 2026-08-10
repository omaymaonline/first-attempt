"use client";

import { motion } from "framer-motion";

import PrimaryButton from "../buttons&links/PrimaryButton";

export default function Hero() {
    return (
        <div className="text-center">
            {/* Title */}
            <h1 className="mt-25 text-5xl leading-tight md:text-6xl">
                How We Work
            </h1>

            {/* Paragraph */}
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-gray-600">
                Most people arrive thinking they need a website.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }} className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-gray-600">
                Sometimes they do.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.8 }} className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-gray-600">
                Sometimes they need something entirely different.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6, duration: 0.8 }} className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-gray-600">
                Already familiar with the process?
            </motion.p>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.0, duration: 0.8 }} className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-gray-600">
                <PrimaryButton href="/services/onboarding/questionnaire">
                    Find Your Next Step
                </PrimaryButton>
            </motion.p>

            {/* subtle underline glow line */}
            <div className="flex items-center justify-center mt-20">
                {/* Left line */}
                <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="h-[1px] w-40 bg-gradient-to-r from-transparent via-pink-300 to-transparent"
                />

                {/* OR text */}
                <span className="mx-4 text-gray-600 font-medium">OR</span>

                {/* Right line */}
                <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="h-[1px] w-40 bg-gradient-to-r from-transparent via-pink-300 to-transparent"
                />
            </div>

        </div>
    );
}