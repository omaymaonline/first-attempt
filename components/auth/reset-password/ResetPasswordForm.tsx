"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import PrimaryButton from "@/components/buttons&links/PrimaryButton";
import PasswordField from "@/components/password/PasswordField";
import PasswordStrength from "@/components/password/PasswordStrength";

import { passwordStrong } from "@/lib/auth/passwordValidation";

type ResetPasswordFormProps = {
    token: string;
};

// Validation helper
function validate(password: string, confirmPassword: string) {
    const errors: { password?: string; confirmPassword?: string } = {};

    if (!passwordStrong(password)) {
        errors.password = "Password must meet all requirements.";
    }

    if (!confirmPassword) {
        errors.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
        errors.confirmPassword = "Passwords do not match.";
    }

    return errors;
}

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
    const router = useRouter();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});
    const [submitted, setSubmitted] = useState(false);
    const [notice, setNotice] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    function updatePassword(value: string) {
        setPassword(value);
        if (notice) setNotice("");
        if (submitted) setErrors(validate(value, confirmPassword));
    }

    function updateConfirmPassword(value: string) {
        setConfirmPassword(value);
        if (notice) setNotice("");
        if (submitted) setErrors(validate(password, value));
    }

    function scrollToError(errors: { password?: string; confirmPassword?: string }) {
        const first = Object.keys(errors)[0];
        if (!first) return;

        const element = document.getElementById(first);
        element?.scrollIntoView({ behavior: "smooth", block: "center" });
        (element?.querySelector("input") as HTMLInputElement)?.focus();
    }

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        if (isSubmitting) return;

        setSubmitted(true);
        const validation = validate(password, confirmPassword);
        setErrors(validation);

        if (Object.keys(validation).length) {
            scrollToError(validation);
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password }),
            });

            const result = await response.json();

            if (!response.ok) {
                setNotice(result.message);
                return;
            }

            router.push("/reset-password/success");
        } catch (error) {
            console.error(error);
            setNotice("Connection problem. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={submit} className="space-y-8">
            <PasswordField
                id="password"
                label="New password"
                value={password}
                error={errors.password}
                required
                showPassword={showPassword}
                togglePassword={() => setShowPassword(!showPassword)}
                onChange={updatePassword}
            />

            {password && <PasswordStrength password={password} />}

            <PasswordField
                id="confirmPassword"
                label="Confirm password"
                value={confirmPassword}
                error={errors.confirmPassword}
                required
                showPassword={showPassword}
                togglePassword={() => setShowPassword(!showPassword)}
                onChange={updateConfirmPassword}
            />

            {notice && (
                <div className="rounded-xl border border-pink-200 bg-pink-50 px-5 py-3 text-gray-700">
                    {notice}
                </div>
            )}

            <div className="flex justify-center">
                <PrimaryButton type="submit" inactive={Object.keys(errors).length > 0} disabled={isSubmitting}>
                    {isSubmitting ? "Updating password..." : "Update password"}
                </PrimaryButton>
            </div>
        </form>
    );
}
