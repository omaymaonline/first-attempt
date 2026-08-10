import { FiMail } from "react-icons/fi";

import {
    FaGithub,
    FaLinkedin,
} from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="border-t-[0.5px] border-gray-200 bg-white px-6 py-2">

            {/* Main Footer Content */}
            <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-center">

                {/* Left Side */}
                <div className="flex-1">

                    <div className="flex flex-col gap-1 text-sm font-medium tracking-[0.1em] text-gray-800 md:flex-row md:items-center md:gap-2">

                        <span>Calm Systems</span>

                        <span className="hidden md:block">•</span>

                        <span>Thoughtful Technology</span>

                        <span className="hidden md:block">•</span>

                        <span>Scalable Architecture</span>

                    </div>
                </div>

                {/* Right Side */}
                <div className="flex flex-1 items-center justify-center gap-8 text-gray-500 md:justify-end">

                    <a
                        href="mailto:omayma.online@gmail.com?subject=Inquiry&body=Hello,%20Omayma%20Online!%20I%20have%20an%20inquiry."
                        className="transition hover:scale-110 hover:text-pink-400"
                        target="_blank"
                    >
                        <FiMail size={22} />
                    </a>

                    <a
                        href="https://github.com/omaymaonline"
                        target="_blank"
                        className="transition hover:scale-110 hover:text-pink-400"
                    >
                        <FaGithub size={20} />
                    </a>

                    <a
                        href="https://linkedin.com/in/omaymaonline/"
                        target="_blank"
                        className="transition hover:scale-110 hover:text-pink-400"
                    >
                        <FaLinkedin size={20} />
                    </a>
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t-[0.5px] mx-auto mt-2 max-w-6xl border-t border-gray-100 pt-6 text-center text-xs text-gray-400">
                © 2026 Omayma Online. All rights reserved.
            </div>

        </footer>
    );
}