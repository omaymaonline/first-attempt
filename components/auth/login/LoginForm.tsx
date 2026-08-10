"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Eye, EyeOff } from "lucide-react";

import PrimaryButton from "@/components/buttons&links/PrimaryButton";
import PrimaryLink from "@/components/buttons&links/PrimaryLink";
import SecondaryLink from "@/components/buttons&links/SecondaryLink";
import ShortTextField from "@/components/fields/ShortTextField";

import { useLoginForm } from "./useLoginForm";
import { validateLogin } from "./validation";
import { LoginData } from "./types";

export default function LoginForm() {
    const { data, setData } = useLoginForm();

    const [errors, setErrors] = useState<Partial<Record<keyof LoginData, string>>>({});
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [notice, setNotice] = useState("");

    // Helpers
    function update(field: keyof LoginData, value: string) {
        const updated = { ...data, [field]: value };
        setData(updated);

        if (notice) setNotice("");

        if (Object.keys(errors).length) { setErrors(validateLogin(updated)); }
    }

    // Submit
    async function submit(e: React.FormEvent) {
        e.preventDefault();
        if (isSubmitting) return;

        const validation = validateLogin(data);
        setErrors(validation);

        if (Object.keys(validation).length) return;

        setIsSubmitting(true);
        setNotice("");

        try {
            const result = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
            });

            if (!result) {
                setNotice("Something went wrong.");
                return;
            }

            if (result?.error === "AccessDenied") {
                setNotice("Please verify your email before signing in.");
                return;
            }

            if (result?.error === "CredentialsSignin") {
                setNotice("Invalid email or password.");
                return;
            }

            window.location.href = "/dashboard";


        } catch {
            setNotice("Something went wrong. Please try again.");
        } finally { setIsSubmitting(false); }
    }

    // Render
    return (
        <form onSubmit={submit} className="space-y-7">
            {/* Email */}
            <ShortTextField
                id="email"
                label="Email"
                type="email"
                value={data.email}
                error={errors.email}
                required
                onChange={(value) => update("email", value)}
            />

            {/* Password */}
            <div className="relative">
                <ShortTextField
                    id="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    value={data.password}
                    error={errors.password}
                    required
                    onChange={(value) => update("password", value)}
                />

                <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-500"
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>

            {/* Forgot password */}
            <div className="flex justify-end">
                <SecondaryLink href="/forgot-password">Forgot password?</SecondaryLink>
            </div>

            {/* Notice */}
            {notice && (
                <div className="space-y-3 rounded-xl bg-red-50 p-3 text-sm text-red-600">
                    <p>{notice}</p>
                    {notice === "Please verify your email before signing in." && (
                        <PrimaryButton href={`/resend-verification?email=${encodeURIComponent(data.email)}`}>
                            Resend verification email
                        </PrimaryButton>
                    )}
                </div>
            )}

            {/* Submit */}
            <div className="flex justify-center">
                <PrimaryButton type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Signing in..." : "Log In"}
                </PrimaryButton>
            </div>

            {/* Register link */}
            <div className="text-center text-sm text-gray-500">
                Don&apos;t have an account?
                <div className="mt-2">
                    <PrimaryLink href="/auth/register">Create one</PrimaryLink>
                </div>
            </div>
        </form>
    );
}