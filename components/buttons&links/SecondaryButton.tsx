import Link from "next/link";

type Props = {
    children: React.ReactNode;
    href?: string;
    type?: "button" | "submit";
    onClick?: () => void;
};

export default function SecondaryButton({
    children,
    href,
    type = "button",
    onClick,
}: Props) {
    const styles = "inline-flex items-center justify-center rounded-full border border-gray-300 bg-gray-100 px-6 py-3 text-sm font-medium text-gray-700 transition-all duration-300 hover:scale-[1.02] hover:border-gray-400 hover:bg-gray-200";

    if (href) {
        return (
            <Link href={href} className={styles}>
                {children}
            </Link>
        );
    }

    return (
        <button type={type} onClick={onClick} className={styles}>
            {children}
        </button>
    );
}