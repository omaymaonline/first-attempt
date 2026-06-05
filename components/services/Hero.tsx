"use client";

import { motion } from "framer-motion";

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
                Sometimes they actually do.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.8 }} className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-gray-600">
                Sometimes they need something entirely different. Which they might not know they needed!
            </motion.p>

            {/* subtle underline glow line */}
            <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 2, opacity: 2 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="mx-auto mt-20 h-[1px] w-40 bg-gradient-to-r from-transparent via-pink-300 to-transparent origin-center"
            />
        </div>
    );
}