import Link from "next/link";
 
type Props = {
    href: string;
    children: React.ReactNode;
};

export default function PrimaryLink({ href, children }: Props) {
    const styles = "inline-flex items-center text-sm uppercase tracking-[0.2em] text-pink-600 transition-all duration-300 hover:text-pink-400 hover:underline";

    return (
        <Link href={href} className={styles}>
            {children}
        </Link>
    );
}