"use client";

import { LayoutDashboard, FileText, Briefcase, ShoppingBag, Mail, Settings, ChevronLeft, ChevronRight, } from "lucide-react";

import type { Section } from "./AdminWorkspace";

type Props = {
    activeSection: Section;
    setActiveSection: (section: Section) => void;

    collapsed: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

const items = [
    { id: "overview", label: "Overview", icon: LayoutDashboard, },
    { id: "blog", label: "Blog", icon: FileText, },
    { id: "services", label: "Services", icon: Briefcase, },
    { id: "products", label: "Products", icon: ShoppingBag, },
    { id: "connect", label: "Connect", icon: Mail, },
    { id: "settings", label: "Settings", icon: Settings, },
] as const;

export default function AdminSidebar({
    activeSection,
    setActiveSection,
    collapsed,
    setCollapsed,
}: Props) {
    return (
        <aside className={`fixed left-0 top-22 z-40 hidden h-screen border-r border-gray-100 bg-white shadow-sm transition-all duration-300 lg:flex lg:flex-col ${collapsed ? "w-[56px]" : "w-[160px]"}`}>

            <div className="flex items-center justify-between px-3 py-4">

                {!collapsed && (<h2 className="text-sm font-semibold"> Workspace </h2>)}

                <button onClick={() => setCollapsed(!collapsed)} className="rounded-lg p-2 hover:bg-gray-100">
                    {collapsed ? (<ChevronRight size={18} />) : (<ChevronLeft size={18} />)}
                </button>

            </div>

            <nav className="mt-2 flex-1 px-2">

                {items.map((item) => {
                    const Icon = item.icon;
                    const active = activeSection === item.id;

                    return (
                        <button key={item.id}
                            onClick={() => {
                                setActiveSection(item.id as Section);
                                window.scrollTo({ top: 0, behavior: "smooth", });
                            }}
                            className={`group mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 transition-all ${active ? "bg-pink-50 text-pink-600" : "text-gray-500 hover:bg-gray-50"} ${collapsed ? "justify-center" : ""}`}
                        >
                            <Icon size={18} />

                            {!collapsed && (<span className="text-sm"> {item.label} </span>)}
                            {collapsed && (
                                <span className="pointer-events-none absolute left-12 rounded-full bg-black px-2 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100">
                                    {item.label}
                                </span>
                            )}

                        </button>
                    );
                })}

            </nav>

        </aside>
    );
}