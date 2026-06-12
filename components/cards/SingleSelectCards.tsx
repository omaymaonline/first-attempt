import OptionCard from "@/components/cards/OptionCard";

type Props = {
    label: string;
    required?: boolean;
    options: string[];
    value: string;
    onChange: (value: string) => void;
    error?: string;
    id?: string;
};

export default function SingleSelectCards({
    label,
    required = false,
    options,
    value,
    onChange,
    error,
    id,
}: Props) {
    return (
        <div id={id}>

            <label className="mb-4 block text-lg">
                {label}
                {required && (<span className="ml-1 text-pink-500"> * </span>)}
                {error && (
                    <p className="mt-2 text-sm text-[#ff56ad]">
                        {error}
                    </p>
                )}
            </label>

            <div className="grid gap-4 md:grid-cols-2">

                {options.map((option) => (
                    <OptionCard
                        key={option}
                        label={option}
                        selected={value === option}
                        onClick={() =>
                            onChange(option)
                        }
                    />
                ))}

            </div>

        </div>
    );
}