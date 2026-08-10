type ShortTextFieldProps = {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: "text" | "email" | "password";
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
        <div id={id} className="scroll-mt-32">
            {/* Label */}
            <label className="mb-2 block text-lg">
                {label}
                {required && <span className="ml-1 text-pink-500">*</span>}
            </label>

            {/* Input */}
            <input
                type={type}
                value={value}
                maxLength={maxLength}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                onFocus={(e) => e.currentTarget.scrollIntoView({ behavior: "smooth", block: "center", })}
                className={`w-full rounded-2xl bg-transparent p-2 outline-none transition border ${error ? "border-red-400" : "border-gray-300 focus:border-pink-400"}`} />

            {/* Error + Counter */}
            <div className="mt-2 flex items-center justify-between">
                <div>
                    {error && <p className="text-sm text-red-500">{error}</p>}
                </div>
                <p className="text-xs text-gray-500">
                    {value.length} / {maxLength}
                </p>
            </div>
        </div>
    );
}