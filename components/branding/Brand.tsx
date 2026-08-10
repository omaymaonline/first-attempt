import Link from "next/link";
import Logo from "./Logo";

type BrandProps = {
    href?: string;
    showName?: boolean;
    className?: string;
    active?: boolean;
};

export default function Brand({ href = "/", showName = true, className = "", active = false, }: BrandProps) {
    return (
        <Link
            href={href}
            aria-label="Go to homepage"
            className={`
                inline-flex items-center gap-3 transition-colors
                ${active ? "text-pink-500" : "text-[var(--foreground)] hover:text-[var(--primary)]"}
                ${className}
            `}
        >
            <Logo className="h-8 w-auto" />

            {showName && (
                <span className="text-sm font-medium uppercase tracking-[0.3em]">
                    Omayma Online
                </span>
            )}
        </Link>
    );
}