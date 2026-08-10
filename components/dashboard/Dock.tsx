"use client";

import {
    Home,
    FileText,
    LayoutGrid,
    Mail,
    ShoppingBag,
    Settings,
} from "lucide-react";

import { motion } from "framer-motion";

type Section =
    | "overview"
    | "blog"
    | "services"
    | "products"
    | "connect"
    | "settings";

export default function Dock({
    activeSection,
    setActiveSection,
}: {
    activeSection: Section;
    setActiveSection: (s: Section) => void;
}) {
    const items = [
        { id: "overview", icon: Home, label: "Overview" },
        { id: "blog", icon: FileText, label: "Blog" },
        { id: "services", icon: LayoutGrid, label: "Services" },
        { id: "products", icon: ShoppingBag, label: "Products" },
        { id: "connect", icon: Mail, label: "Connect" },
        { id: "settings", icon: Settings, label: "Settings" },
    ] as const;

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">

            <div className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-full p-2 flex flex-row gap-3 shadow-lg w-fit">

                {items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;

                    return (
                        <button key={item.id} onClick={() => setActiveSection(item.id)} className="relative group flex justify-center items-center"> {isActive && (<motion.div layoutId="active-pill" className="absolute inset-0 bg-pink-500 rounded-full" transition={{ type: "spring", stiffness: 500, damping: 30, }} />)}

                            <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }} className={`relative z-10 p-3 rounded-lg ${isActive ? "text-white" : "text-gray-500"}`}>
                                <Icon size={20} />
                            </motion.div>

                            <span className="absolute bottom-full mb-2 text-xs bg-black text-white px-2 py-1 rounded-full shadow-sm opacity-0 group-hover:opacity-100 whitespace-nowrap">
                                {item.label}
                            </span>
                        </button>
                    );
                })}

            </div>

        </div>
    );
}