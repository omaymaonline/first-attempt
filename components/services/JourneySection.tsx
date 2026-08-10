"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type Props = {
    id: string;
    step: string;
    children: React.ReactNode;
};

export default function JourneySection({
    id,
    step,
    children,
}: Props) {
    const ref = useRef(null);

    const isInView = useInView(ref, { once: true, margin: "-20% 0px -20% 0px", });

    return (
        <section id={id} ref={ref} className="relative py-12 scroll-mt-24">
            <div className="flex justify-center px-6 lg:pl-24">
                <div className="relative w-full max-w-[900px]">
                    {/* glow */}
                    <div className="absolute -inset-32 -z-10 rounded-full bg-pink-500/15 blur-[160px]" />

                    {/* card */}
                    <motion.div
                        initial={{ opacity: 0, y: 120, }}
                        animate={isInView ? { opacity: 1, y: 0, } : {}}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], }}
                        className="
                                    relative
                                    w-full
                                    max-w-[900px]
                                    rounded-3xl
                                    border
                                    border-black/5
                                    bg-white/95
                                    p-8 md:p-10
                                    backdrop-blur
                                    shadow-[0_40px_120px_rgba(0,0,0,0.06)]
                                    "
                    >
                        <p className="text-sm uppercase tracking-widest text-pink-500 lg:hidden">
                            {step}
                        </p>

                        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1, } : {}} transition={{ delay: 0.45, duration: 0.8, }} className="mt-8 text-lg leading-loose text-gray-700">
                            {children}
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}