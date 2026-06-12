type ShortTextFieldProps = {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: "text" | "email";
    required?: boolean;
    maxLength?: number;
    error?: string;
    id?: string;
};

export default function ShortTextField({
    label,
    value,
    onChange,
    placeholder,
    type = "text",
    required = false,
    maxLength = 150,
    error,
    id,
}: ShortTextFieldProps) {
    return (
        <div id={id}>
            <div>

                <label className="mb-3 block text-lg">
                    {label}
                    {required && (<span className="ml-1 text-pink-500">*</span>)}
                </label>

                {error && (<p className="mb-3 text-sm text-[#ff56ad]"> {error} </p>)}

            </div>


            <input
                type={type}
                value={value}
                maxLength={maxLength}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                className="w-full rounded-2xl border border-gray-300 bg-transparent p-4 outline-none transition placeholder:text-gray-300 focus:border-pink-400"
            />

            <p className="mt-2 text-right text-sm text-gray-500"> {value.length} / {maxLength} </p>

        </div>
    );
}