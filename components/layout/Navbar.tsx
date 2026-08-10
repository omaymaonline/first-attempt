"use client";

import Brand from "../branding/Brand";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const publicLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/services", label: "Services" },
    { href: "/products", label: "Products" },
    { href: "/policy", label: "Policy" },
    { href: "/contact", label: "Contact" },
];

export default function Navbar() {
    const pathname = usePathname();
    const { data: session } = useSession();

    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => { setMenuOpen(false); }, [pathname]);

    function scrollToTop() { window.scrollTo({ top: 0, behavior: "smooth" }); }

    // Role‑based link
    const dashboardLink = session?.user?.role === "ADMIN" ? { href: "/admin", label: "Admin" } : session ? { href: "/dashboard", label: "Dashboard" } : null;

    const navLinks = dashboardLink ? [...publicLinks, dashboardLink] : publicLinks;

    return (
        <nav className="border-b border-gray-200 bg-white px-6 py-2">
            <div className="mx-auto flex max-w-6xl items-center justify-between">
                {pathname === "/" ? (
                    <button onClick={scrollToTop}>
                        <Brand active />
                    </button>
                ) : (
                    <Brand />
                )}

                {/* Desktop Navbar */}
                <ul className="hidden gap-6 text-sm md:flex items-center">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <li key={link.href}>
                                <Link href={link.href} className={`transition hover:text-pink-400 ${isActive ? "text-pink-500" : "text-gray-600"}`}>
                                    {link.label}
                                </Link>
                            </li>
                        );
                    })}

                    {/* Auth buttons (only show if no session) */}
                    {!session && (
                        <li className="flex gap-3">
                            <Link href="/auth/login" className={`px-4 py-2 border border-gray-300 rounded-full text-sm transition ${pathname === "/auth/login" ? "text-pink-500 border-pink-400" : "text-gray-700 hover:text-pink-300 hover:border-pink-300"}`}>
                                Login
                            </Link>
                            <Link href="/auth/register" className={`px-4 py-2 border border-gray-300 rounded-full bg-gray-100 text-sm transition ${pathname === "/auth/register" ? "text-pink-500 border-pink-400 bg-pink-50" : "text-gray-700 hover:text-pink-500 hover:border-pink-400 hover:bg-pink-50"}`}>
                                Register
                            </Link>
                        </li>
                    )}


                </ul>


                {/* Mobile Menu Button */}
                <button className={`relative z-50 flex items-center justify-center text-2xl md:hidden transition-colors ${menuOpen ? "text-pink-500" : "text-gray-700 hover:text-pink-400"}`} onClick={() => setMenuOpen(!menuOpen)}>
                    {/* Hamburger */}
                    <span className={`transition-all duration-300 ${menuOpen ? "opacity-0 scale-90" : "opacity-100 scale-100"}`}>
                        ☰
                    </span>

                    {/* Cross */}
                    <span className={`absolute transition-all duration-300 ${menuOpen ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
                        ✕
                    </span>
                </button>




            </div>

            {/* Mobile Menu Panel */}
            <div className={`fixed inset-0 z-40 md:hidden transition-opacity duration-500 ${menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}>
                <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />

                <div className={`absolute right-0 top-0 h-full w-35 bg-white shadow-2xl px-8 py-24 transform transition-transform duration-700 ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
                    <ul className="flex flex-col gap-6 text-sm">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <li key={link.href}>
                                    <Link href={link.href} className={`transition hover:text-pink-400 ${isActive ? "text-pink-500" : "text-gray-600"}`} onClick={() => setMenuOpen(false)}>
                                        {link.label}
                                    </Link>
                                </li>
                            );
                        })}

                        {/* Auth buttons (only show if no session) */}
                        {!session && (
                            <li className="flex flex-col gap-3">
                                <Link href="/auth/login" className={`px-4 py-2 border border-gray-300 rounded-full text-sm transition ${pathname === "/auth/login" ? "text-pink-500 border-pink-400" : "text-gray-700 hover:text-pink-300 hover:border-pink-300"}`}>
                                    Login
                                </Link>
                                <Link href="/auth/register" className={`px-4 py-2 border border-gray-300 rounded-full bg-gray-100 text-sm transition ${pathname === "/auth/register" ? "text-pink-500 border-pink-400 bg-pink-50" : "text-gray-700 hover:text-pink-500 hover:border-pink-400 hover:bg-pink-50"}`}>
                                    Register
                                </Link>
                            </li>
                        )}

                    </ul>
                </div>
            </div>
        </nav>
    );
}
