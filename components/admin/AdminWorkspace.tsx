"use client";

import { useState } from "react";

import AdminSidebar from "./AdminSidebar";

import Overview from "./sections/Overview";
import Blog from "./sections/Blog";
import Services from "./sections/Services";
import Products from "./sections/Products";
import Connect from "./sections/connect/Connect";
import Settings from "./sections/Settings";

export type Section =
    | "overview"
    | "blog"
    | "services"
    | "products"
    | "connect"
    | "settings";


type Props = { userName: string };


export default function AdminWorkspace({ userName }: Props) {
    const [activeSection, setActiveSection] = useState<Section>("overview");

    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50">

            <AdminSidebar
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            />

            {/* Mobile Navigation */}

            <div className="sticky top-20 z-20 border-b border-gray-100 bg-white lg:hidden">

                <div className="flex overflow-x-auto scrollbar-none px-2">

                    {["overview", "blog", "services", "products", "contact", "settings",].map((section) => (

                        <button
                            key={section}
                            onClick={() => {
                                setActiveSection(section as Section);
                                window.scrollTo({ top: 0, behavior: "smooth", });
                            }}
                            className={`shrink-0 border-b-2 px-3 py-2 text-xs capitalize transition ${activeSection === section ? "border-pink-500 text-pink-600" : "border-transparent text-gray-500"}`}
                        >
                            {section}
                        </button>

                    ))}

                </div>

            </div>

            <main className={`px-6 py-8 transition-all duration-300 md:px-10 ${collapsed ? "lg:ml-[56px]" : "lg:ml-[160px]"}`}>
                {activeSection === "overview" && <Overview userName={userName}/>}
                {activeSection === "blog" && <Blog />}
                {activeSection === "services" && <Services />}
                {activeSection === "products" && <Products />}
                {activeSection === "connect" && <Connect />}
                {activeSection === "settings" && <Settings />}
            </main>

        </div>
    );
}