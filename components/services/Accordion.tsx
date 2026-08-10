"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

export default function Accordion({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    const [open, setOpen] = useState(false);

    return (
        <div>

            <button
                onClick={() => setOpen(!open)}
                className="group flex items-center gap-4 text-left"
            >
                <ChevronRight
                    className={`mt-1 h-5 w-5 shrink-0 transition-transform duration-200 ${open ? "rotate-90" : ""
                        }`}
                />

                <span className="text-3xl font-medium tracking-tight">
                    {title}
                </span>
            </button>

            <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-[2000px] pt-6" : "max-h-0"}`}> {children} </div>

        </div>
    );
}