"use client";

import { Eye, EyeOff } from "lucide-react";

type Props = {
    id: string;
    label: string;
    value: string;
    error?: string;
    required?: boolean;
    showPassword: boolean;
    togglePassword: () => void;
    onChange: (value: string) => void;
};

export default function PasswordField({
    id,
    label,
    value,
    error,
    required,
    showPassword,
    togglePassword,
    onChange,
}: Props) {
    return (
        <div id={id} className="scroll-mt-32">
            {/* Label */}
            <label className="mb-2 block text-lg">
                {label}
                {required && <span className="text-pink-500">*</span>}
            </label>

            {/* Error */}
            {error && <p className="mb-2 text-sm text-red-500">{error}</p>}

            {/* Input + Toggle */}
            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    value={value}
                    maxLength={32}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={(e) => e.currentTarget.scrollIntoView({ behavior: "smooth", block: "center", })}
                    className="w-full rounded-2xl border border-gray-300 p-3 pr-12 outline-none focus:border-pink-400"
                />

                <button
                    type="button"
                    onClick={togglePassword}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-500"
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>
        </div>
    );
}
