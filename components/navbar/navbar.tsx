"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/services", label: "Services" },
    { href: "/products", label: "Products" },
    { href: "/policy", label: "Policy" },
    { href: "/contact", label: "Contact" },
    { href: "/dashboard", label: "Dashboard" },
];

export default function Navbar() {
    const pathname = usePathname();

    const [menuOpen, setMenuOpen] = useState(false);

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    return (
        <nav className="border-b border-gray-200 bg-white px-6 py-5">

            <div className="mx-auto flex max-w-6xl items-center justify-between">

                {/* Logo Area */}
                {pathname === "/" ? (

                    <button onClick={scrollToTop} className="flex items-center gap-3 text-pink-500 scale-105 drop-shadow-md transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 hover:text-pink-500 hover:drop-shadow-md">

                        <Image
                            src="/logo.png"
                            alt="Omayma Online Logo"
                            width={42}
                            height={42}
                            className="object-contain"
                            priority
                        />

                        <span className="text-sm font-medium uppercase tracking-[0.3em]">
                            Omayma Online
                        </span>

                    </button>

                ) : (

                    <Link href="/" className=" flex items-center gap-3 text-pink-300 drop-shadow-sm transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 hover:text-pink-400 hover:drop-shadow-md">

                        <Image
                            src="/logo.png"
                            alt="Omayma Online Logo"
                            width={42}
                            height={42}
                            className="object-contain"
                            priority
                        />

                        <span className="text-sm font-medium uppercase tracking-[0.3em]">
                            Omayma Online
                        </span>

                    </Link>

                )}

                {/* Desktop Navbar */}
                <ul className="hidden gap-6 text-sm md:flex">

                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;

                        return (
                            <li key={link.href}>

                                {link.href === "/" && pathname === "/" ? (

                                    <button onClick={scrollToTop} className="text-pink-500 transition hover:text-pink-400">
                                        {link.label}
                                    </button>

                                ) : (

                                    <Link href={link.href} className={`transition hover:text-pink-400 ${isActive ? "text-pink-500" : "text-gray-600"}`}>
                                        {link.label}
                                    </Link>

                                )}

                            </li>
                        );
                    })}

                </ul>

                {/* Mobile Menu Button */}
                <button className={`text-2xl transition md:hidden ${menuOpen ? "text-pink-500" : "text-gray-700 hover:text-pink-400"}`} onClick={() => setMenuOpen(!menuOpen)}>
                    ☰
                </button>

            </div>

            {/* Mobile Menu Panel */}
            <div className={`fixed inset-0 z-40 md:hidden transition-opacity duration-500 ${menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}>

                {/* Background Blur */}
                <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />

                {/* Right Side Panel */}
                <div className={`absolute right-0 top-0 h-full w-35 bg-white shadow-2xl px-8 py-24 transform transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${menuOpen ? "translate-x-0" : "translate-x-full"} `}>

                    <ul className="flex flex-col gap-6 text-sm">

                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;

                            return (
                                <li key={link.href}>

                                    {link.href === "/" && pathname === "/" ? (

                                        <button onClick={() => { scrollToTop(); setMenuOpen(false); }} className="text-pink-500 transition hover:text-pink-400">
                                            {link.label}
                                        </button>

                                    ) : (

                                        <Link href={link.href} className={`transition hover:text-pink-400 ${isActive ? "text-pink-500" : "text-gray-600"}`} onClick={() => setMenuOpen(false)}>
                                            {link.label}
                                        </Link>

                                    )}

                                </li>
                            );
                        })}

                    </ul>

                </div>

            </div>

        </nav>
    );
}