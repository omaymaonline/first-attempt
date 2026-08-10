import Link from "next/link";

type Props = {
    href: string;
    children: React.ReactNode;
};

export default function SecondaryLink({ href, children }: Props) {
    const styles = "inline-flex items-center text-sm tracking-wide text-gray-600 transition-all duration-300 hover:text-gray-400 hover:underline";

    return (
        <Link href={href} className={styles}>
            {children}
        </Link>
    );
}
