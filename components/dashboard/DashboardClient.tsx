"use client";

import { useEffect, useState } from "react";

import Dock from "@/components/dashboard/Dock";
import OverviewSection from "@/components/dashboard/sections/OverviewSection";
import BlogSection from "@/components/dashboard/sections/Blog";
import ServicesSection from "@/components/dashboard/sections/Services";
import ConnectSection from "@/components/dashboard/sections/connect/Connect";
import ProductsSection from "@/components/dashboard/sections/Products";
import SettingsSection from "./sections/settings/Settings";

type Section =
    | "overview"
    | "blog"
    | "services"
    | "products"
    | "connect"
    | "settings";

export default function DashboardClient() {
    const [activeSection, setActiveSection] = useState<Section>("overview");

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth", });
    }, [activeSection]);

    function renderSection() {
        switch (activeSection) {
            case "overview": return <OverviewSection />;
            case "blog": return <BlogSection />;
            case "services": return <ServicesSection />;
            case "products": return <ProductsSection />;
            case "connect": return <ConnectSection />;
            case "settings": return <SettingsSection />;
            default: return null;
        }
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Dock activeSection={activeSection} setActiveSection={setActiveSection} />
            <main className="mt-1 flex-1 p-10">{renderSection()}</main>
        </div>
    );
}