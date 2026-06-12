import Link from "next/link";

type Props = {
    children: React.ReactNode;
    href?: string;
    type?: "button" | "submit";
    onClick?: () => void;
    disabled?: boolean;
    inactive?: boolean;
};

export default function PrimaryButton({
    children,
    href,
    type = "button",
    onClick,
    disabled = false,
    inactive = false,
}: Props) {
    const styles = `inline-flex items-center justify-center rounded-full
                    border border-gray-300 px-8 py-4 text-sm font-semibold
                    transition-all duration-300
                    ${inactive ? "bg-white text-gray-400 opacity-50" : "bg-white hover:bg-pink-500 hover:text-white hover:border-pink-100 hover:scale-[1.02]"}
                    `;

    const stateStyles = disabled ? "hover:scale-[1.02] hover:border-pink-100 hover:bg-pink-500 hover:text-white opacity-40" : "hover:scale-[1.02] hover:border-pink-100 hover:bg-pink-500 hover:text-white";

    if (href) {
        return (
            <Link href={href} className={styles}>
                {children}
            </Link>
        );
    }

    return (

        <button type={type} onClick={onClick} className={`${styles} ${stateStyles}`} disabled={disabled}>
            {children}
        </button>
    );
}