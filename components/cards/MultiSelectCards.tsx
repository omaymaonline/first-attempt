import OptionCard from "@/components/cards/OptionCard";

type Props = {
    label?: string;
    options: string[];
    values: string[];
    onChange: (values: string[]) => void;
    required?: boolean;
    error?: string;
    id?: string;
};

export default function MultiSelectCards({
    label,
    options,
    values,
    required,
    onChange,
    error,
    id,
}: Props) {
    const toggle = (option: string) => {
        if (values.includes(option)) {
            onChange(
                values.filter((v) => v !== option)
            );
        } else {
            onChange([...values, option]);
        }
    };

    return (
        <div id={id}>

            {label && (
                <label className="mb-4 block text-lg">
                    {label}
                    {required && (<span className="ml-1 text-pink-500">*</span>)}
                    {error && (
                        <p className="mt-2 text-sm text-[#ff56ad]">
                            {error}
                        </p>
                    )}
                </label>
            )}

            <div className="grid gap-4 md:grid-cols-2">

                {options.map((option) => (
                    <OptionCard
                        key={option}
                        label={option}
                        selected={values.includes(option)}
                        onClick={() => toggle(option)}
                    />
                ))}

            </div>

        </div>
    );
}