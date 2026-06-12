type Props = {
    selected: boolean;
    label: string;
    onClick: () => void;
};

export default function OptionCard({
    selected,
    label,
    onClick,
}: Props) {
    return (
        <button type="button" onClick={onClick} className={` rounded-2xl border p-5 text-left transition ${selected ? "border-pink-400 bg-pink-50" : "border-gray-200 hover:border-pink-200"}`}>
            {label}
        </button>
    );
}