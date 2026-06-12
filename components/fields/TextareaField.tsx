type Props = {
    label: string;
    note?: string;
    value: string;
    onChange: (value: string) => void;
    maxLength?: number;
    required?: boolean;
    error?: string;
    id?: string;
};

export default function TextareaField({
    label,
    note,
    value,
    onChange,
    maxLength = 1500,
    required = false,
    error,
    id,
}: Props) {
    return (
        <div id={id}>

            <div>

                <label className="mb-3 block text-lg">
                    {label}
                    {required && (<span className="ml-1 text-pink-500">*</span>)}
                </label>

                {error && (<p className="mb-3 text-sm text-[#ff56ad]"> {error} </p>)}

            </div>

            {note && (<p className="mt-3 text-gray-500"> {note} </p>)}

            <textarea value={value} maxLength={maxLength} onChange={(e) => onChange(e.target.value)} rows={2} className=" mt-6 w-full resize-none rounded-2xl border border-gray-200 p-5 outline-none transition focus:border-pink-400 " />

            <div className="mt-2 text-right text-sm text-gray-500">
                {value.length} / {maxLength}
            </div>

        </div>
    );
}