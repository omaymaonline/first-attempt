"use client";

import { useEffect, useRef, useState } from "react";

import JourneyNav from "./JourneyNav";
import JourneySection from "./JourneySection";

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
                    <p>“I don't know where to begin.”</p>
                </div>

                <p className="mt-6">
                    That's completely normal.
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
        title: "We talk,",
        content: (
            <>
                <p> Through a discovery session, we explore: </p>

                <ul className="mt-6 space-y-3 pl-6">
                    <li>• your goals</li>
                    <li>• your challenges</li>
                    <li>• your constraints</li>
                    <li>• your priorities</li>
                    <li>• your current situation</li>
                </ul>

                <p className="mt-6"> So, our job becomes to understand what is actually happening. </p>
            </>
        ),
    },

    {
        id: "clarity",
        step: "Clarity",
        title: "We continue clarifying your position,",
        content: (
            <>
                <p> Because most people are not lacking effort. </p>

                <p> They are lacking clarity. </p>

                <p> Together we identify: </p>

                <ul className="mt-6 space-y-3 pl-6">
                    <li>• what matters now</li>
                    <li>• what can wait</li>
                    <li>• what is necessary</li>
                    <li>• what is optional</li>
                    <li>• what should not be built at all</li>
                </ul>

                <p className="mt-6"> Here, you receive a form which you answer and accordingly we move on to the next phase.</p>

            </>
        ),
    },

    {
        id: "roadmap",
        step: "Roadmap",
        title: "You receive a roadmap,",
        content: (
            <>
                <p>
                    After the research and analysis phase, I prepare a practical implementation plan.
                </p>

                <p>
                    Depending on the project,
                    this may include:
                </p>

                <ul className="mt-6 space-y-3 pl-6">
                    <li>• a presentation</li>
                    <li>• a PDF roadmap</li>
                    <li>• recommended tools</li>
                    <li>• learning resources</li>
                    <li>• system diagrams</li>
                    <li>• a Notion workspace</li>
                </ul>
            </>
        ),
    },

    {
        id: "implementation",
        step: "Implementation",
        title: "Then we build,",
        content: (
            <>
                <p>
                    If you decide to continue working with me, we move into implementation.
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

        window.addEventListener(
            "scroll",
            handleScroll,
            { passive: true }
        );

        return () =>
            window.removeEventListener(
                "scroll",
                handleScroll
            );
    }, []);

    return (
        <>
            <JourneyNav activeSection={activeSection} progress={progress} visible={showNav} />

            <div ref={timelineRef} className="relative mt-20">
                {sections.map((section) => (
                    <JourneySection key={section.id} id={section.id} step={section.step} title={section.title}>
                        {section.content}
                    </JourneySection>
                ))}
            </div>
        </>
    );
}