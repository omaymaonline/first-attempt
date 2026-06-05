import Link from "next/link";

type Props = {
    children: React.ReactNode;
    href?: string;
    type?: "button" | "submit";
    onClick?: () => void;
};

export default function PrimaryButton({
    children,
    href,
    type = "button",
    onClick,
}: Props) {
    const styles = "inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-8 py-4 text-base font-semibold transition-all duration-300 hover:scale-[1.02] hover:border-pink-300 hover:text-pink-500";

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