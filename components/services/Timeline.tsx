"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";


import JourneyNav from "./JourneyNav";
import JourneySection from "./JourneySection";

import Accordion from "./Accordion";

// Timeline content

const sections = [
    {
        id: "discovery",
        step: "Discovery",
        title: "You arrive,",
        content: (
            <>
                <p>Usually with something like:</p>

                <div className="mt-6 space-y-3 pl-6 text-gray-500">
                    <p>“I need a website.”</p>
                    <p>“I want to start a business.”</p>
                    <p>“Everything feels messy.”</p>
                    <p>“I don&apos;t know where to begin.”</p>
                </div>

                <p className="mt-6">
                    That&apos;s completely normal.
                </p>

                <p>
                    Therefore, we do not start by discussing software,
                    platforms, or technology.
                </p>

                <p>
                    We start by understanding the situation.
                </p>
            </>
        ),
    },

    {
        id: "understanding",
        step: "Understanding",
        title: "We talk through a discovery session",
        content: (
            <>
                <p> Where we explore: </p>

                <ul className="mt-6 space-y-3 pl-6">
                    <li>• your goals</li>
                    <li>• your challenges</li>
                    <li>• your constraints</li>
                    <li>• your priorities: what matters now, what can wait, what is necessary, what is optional, </li>
                    <li>• what should not be built at all </li>
                    <li>• your current situation</li>
                </ul>

                <p className="mt-6"> So, our job becomes to understand what is actually happening. </p>
            </>
        ),
    },

    {
        id: "roadmap",
        step: "Roadmap",
        title: "Clarifying your position through an executable roadmap,",
        content: (
            <>
                <p> After the research and analysis phase, I prepare a practical implementation plan. </p>

                <p> Depending on the project, this may include: </p>

                <ul className="mt-6 space-y-3 pl-6">
                    <li>• a presentation</li>
                    <li>• a PDF roadmap (a strategy, implementation priorities, recommended tools, learning resources, workflow suggestions...)</li>
                    <li>• system diagrams</li>
                    <li>• a Notion workspace</li>
                </ul>
            </>
        ),
    },

    {
        id: "implementation",
        step: "Implementation",
        title: "Where we build",
        content: (
            <>
                <p>
                    If you decide to continue working with us, we move into implementation.
                </p>

                <div className="mt-8 grid gap-4 md:grid-cols-2">
                    {[
                        "Websites",
                        "Portfolio Websites",
                        "Landing Pages",
                        "Notion Systems",
                        "Dashboards",
                        "Automations",
                        "Educational Platforms",
                        "Custom Internal Tools",
                    ].map((item) => (
                        <div key={item} className="rounded-2xl bg-gray-50 p-4">
                            {item}
                        </div>
                    ))}
                </div>

                <p className="mt-8">
                    The solution depends on the problem.
                </p>
            </>
        ),
    },
];

export default function Timeline() {
    // Navigation state
    const [activeSection, setActiveSection] = useState("discovery");
    const [progress, setProgress] = useState(0);
    const [showNav, setShowNav] = useState(false);

    // Timeline container
    const timelineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            // Active section

            let closestSection = sections[0].id;
            let smallestDistance = Infinity;

            sections.forEach((section) => {
                const element = document.getElementById(section.id);

                if (!element) return;

                const rect = element.getBoundingClientRect();

                const distance = Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2);

                if (distance < smallestDistance) {
                    smallestDistance = distance;
                    closestSection = section.id;
                }
            });

            setActiveSection(closestSection);

            // Timeline progress + nav visibility

            if (timelineRef.current) {
                const rect = timelineRef.current.getBoundingClientRect();

                const total = timelineRef.current.offsetHeight - window.innerHeight;

                const passed = -rect.top;

                const value = Math.max(0, Math.min(1, passed / total));

                setProgress(value);

                setShowNav(rect.top < window.innerHeight * 0.3 && rect.bottom > window.innerHeight * 0.3);
            }
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mx-auto h-[1px] w-40 bg-gradient-to-r from-transparent via-pink-300 to-transparent"
            />

            <motion.div initial={{ opacity: 0, y: 40, }} whileInView={{ opacity: 1, y: 0, }} viewport={{ once: true, }} transition={{ duration: 0.8, }}>
                <h2 className="mt-10 text-3xl text-center"> How we work: </h2>
            </motion.div>

            <JourneyNav activeSection={activeSection} progress={progress} visible={showNav} />

            <div ref={timelineRef} className="relative mt-20">
                {sections.map((section) => (
                    <JourneySection key={section.id} id={section.id} step={section.step}>
                        <Accordion title={section.title}>
                            {section.content}
                        </Accordion>
                    </JourneySection>
                ))}
            </div>
        </>
    );
}