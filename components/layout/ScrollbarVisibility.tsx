"use client";

import { useEffect } from "react";

export default function ScrollbarVisibility() {

    useEffect(() => {

        let timeout: NodeJS.Timeout;

        const handleScroll = () => {

            document.body.classList.add("scrolling");

            clearTimeout(timeout);

            timeout = setTimeout(() => {
                document.body.classList.remove("scrolling");
            }, 800);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };

    }, []);

    return null;
}