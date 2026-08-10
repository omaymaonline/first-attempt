type Props = {
    children: React.ReactNode;
    type?: "button" | "submit";
    onClick?: () => void;
};

export default function ThirdButton({
    children,
    type = "button",
    onClick,
}: Props) {
    return (
        <button
            type={type}
            onClick={onClick}
            className="rounded-xl border border-gray-300 px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
        >
            {children}
        </button>
    );
}