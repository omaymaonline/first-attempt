"use client";

import { useState } from "react";

import PrimaryButton from "@/components/buttons&links/PrimaryButton";
import PrimaryLink from "@/components/buttons&links/PrimaryLink";
import ShortTextField from "@/components/fields/ShortTextField";
import PasswordField from "@/components/password/PasswordField";
import PasswordStrength from "@/components/password/PasswordStrength";

import { validateRegister, formatName } from "./validation";
import { RegisterData } from "./types";
import { useRegisterForm } from "./useRegisterForm";

import VerificationEmailNotice from "@/components/auth/verification/VerificationEmailNotice";

export default function RegisterForm() {
    const { data, setData } = useRegisterForm();

    const [errors, setErrors] = useState<Partial<Record<keyof RegisterData, string>>>({});
    const [submitted, setSubmitted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [notice, setNotice] = useState("");
    const [successEmail, setSuccessEmail] = useState("");

    // Helpers
    function update(field: keyof RegisterData, value: string) {
        const updated = { ...data, [field]: value };
        setData(updated);

        if (notice) setNotice("");

        if (submitted) {
            const validation = validateRegister(updated);
            setErrors((prev) => ({ ...prev, [field]: validation[field] }));
        }
    }

    function scrollToError(errors: Partial<Record<keyof RegisterData, string>>) {
        const first = Object.keys(errors)[0];
        if (!first) return;

        const element = document.getElementById(first);
        element?.scrollIntoView({ behavior: "smooth", block: "center" });
        (element?.querySelector("input") as HTMLInputElement)?.focus();
    }

    // Submit
    async function submit(e: React.FormEvent) {
        e.preventDefault();
        if (isSubmitting) return;

        setSubmitted(true);

        const validation = validateRegister(data);
        setErrors(validation);

        if (Object.keys(validation).length) {
            scrollToError(validation);
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...data, name: formatName(data.name) }),
            });

            const result = await response.json();

            if (!response.ok) {
                if (result.message === "Account already exists") {
                    const emailError = { email: "An account with this email already exists." };
                    setErrors((prev) => ({ ...prev, ...emailError }));
                    scrollToError(emailError);
                    return;
                }

                console.error("Registration error:", result);
                setNotice("Something went wrong. Please try again.");
                return;
            }

            setSuccessEmail(data.email);
            window.scrollTo({ top: 0, behavior: "smooth" });


        } catch (err) {
            console.error("Network error:", err);
            setNotice("Connection problem. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    const hasErrors = Object.keys(errors).length > 0;

    if (successEmail) { return (<VerificationEmailNotice email={successEmail} />); }

    // Render
    return (
        <form onSubmit={submit} className="space-y-8">
            {/* Name */}
            <ShortTextField
                id="name"
                label="Full name"
                value={data.name}
                error={errors.name}
                required
                onChange={(value) => update("name", value)}
            />

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

            {errors.email?.includes("already") && (
                <div>
                    <PrimaryLink href="/auth/login">Sign in instead</PrimaryLink>
                </div>
            )}

            {/* Password */}
            <PasswordField
                id="password"
                label="Password"
                value={data.password}
                error={errors.password}
                required
                showPassword={showPassword}
                togglePassword={() => setShowPassword(!showPassword)}
                onChange={(value) => update("password", value)}
            />

            {data.password && <PasswordStrength password={data.password} />}

            {/* Confirm Password */}
            <PasswordField
                id="confirmPassword"
                label="Confirm password"
                value={data.confirmPassword}
                error={errors.confirmPassword}
                required
                showPassword={showPassword}
                togglePassword={() => setShowPassword(!showPassword)}
                onChange={(value) => update("confirmPassword", value)}
            />

            {/* Notice */}
            {notice && (<div className="rounded-xl bg-gray-900 px-5 py-3 text-white">{notice}</div>)}

            {/* Submit */}
            <div className="flex justify-center">
                <PrimaryButton type="submit" inactive={hasErrors} disabled={isSubmitting}>
                    {isSubmitting ? "Creating account..." : "Create Account"}
                </PrimaryButton>
            </div>
        </form>
    );
}