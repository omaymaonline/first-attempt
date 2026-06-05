"use client";

import { motion } from "framer-motion";

// Navigation items

const sections = [
    { id: "discovery", label: "Discovery" },
    { id: "understanding", label: "Understanding" },
    { id: "clarity", label: "Clarity" },
    { id: "roadmap", label: "Roadmap" },
    { id: "implementation", label: "Implementation" },
];

type Props = { activeSection: string; progress: number; visible: boolean; };

export default function JourneyNav({
    activeSection,
    progress,
    visible,
}: Props) {
    return (
        <motion.aside
            animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -20, }}
            transition={{ duration: 0.4 }}
            className="fixed left-10 top-1/2 z-50 hidden -translate-y-1/2 lg:flex"
        >
            <div className="relative">
                {/* Rail */}
                <div className="absolute left-[11px] top-3 z-0 h-[calc(100%-24px)] w-px bg-gray-200" />

                {/* Progress */}
                <motion.div
                    style={{ height: `${progress * 100}%` }}
                    className="absolute left-[11px] top-3 z-0 w-px bg-pink-500"
                />

                {/* Steps */}
                <div className="space-y-8">
                    {sections.map((section, index) => {
                        const active =
                            activeSection === section.id;

                        return (
                            <a
                                key={section.id}
                                href={`#${section.id}`}
                                className="group relative flex items-center"
                            >
                                <motion.div
                                    animate={{ scale: active ? 1.25 : 1, }}
                                    transition={{ duration: 0.3, }}
                                    className={`relative z-10 h-6 w-6 rounded-full border-2 bg-white ${active ? "border-pink-500" : "border-gray-300"}`}
                                >
                                    <motion.div
                                        animate={{ scale: active ? 1 : 0, }}
                                        transition={{ duration: 0.25, }}
                                        className="h-full w-full rounded-full bg-pink-500"
                                    />
                                </motion.div>

                                <div className={`   pointer-events-none
                                                    absolute
                                                    left-10
                                                    top-1/2
                                                    -translate-y-1/2
                                                    whitespace-nowrap
                                                    rounded-full
                                                    border
                                                    border-black/5
                                                    bg-white/95
                                                    px-3
                                                    py-1
                                                    text-sm
                                                    backdrop-blur
                                                    shadow-[0_10px_40px_rgba(0,0,0,0.08)]
                                                    transition-all
                                                    duration-200
                                                    ${active ? "translate-x-1 opacity-100 text-black" : "opacity-0 text-gray-700 group-hover:translate-x-1 group-hover:opacity-100"}`}>

                                    {index + 1}. {section.label}

                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>
        </motion.aside>
    );
}