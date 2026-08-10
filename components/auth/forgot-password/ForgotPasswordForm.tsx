"use client";

import { useState } from "react";

import PrimaryButton from "@/components/buttons&links/PrimaryButton";
import ShortTextField from "@/components/fields/ShortTextField";

import { useForgotPasswordForm } from "./useForgotPasswordForm";
import { validateForgotPassword } from "./validation";
import { ForgotPasswordData } from "./types";
import VerificationEmailNotice from "@/components/auth/verification/VerificationEmailNotice";

export default function ForgotPasswordForm() {
    const { data, setData } = useForgotPasswordForm();

    const [errors, setErrors] = useState<Partial<Record<keyof ForgotPasswordData, string>>>({});

    const [submitted, setSubmitted] = useState(false);
    const [notice, setNotice] = useState("");
    const [successEmail, setSuccessEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    function update(value: string) {
        const updated = { ...data, email: value, };
        setData(updated);
        if (notice) setNotice("");
        if (successEmail) setSuccessEmail("");
        if (submitted) { setErrors(validateForgotPassword(updated)); }
    }

    function scrollToError(errors: Partial<Record<keyof ForgotPasswordData, string>>,) {
        const first = Object.keys(errors)[0];
        if (!first) return;
        const element = document.getElementById(first);
        element?.scrollIntoView({ behavior: "smooth", block: "center", });
        (element?.querySelector("input") as HTMLInputElement)?.focus();
    }

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        if (isSubmitting) return;
        setSubmitted(true);
        const validation = validateForgotPassword(data);
        setErrors(validation);
        if (Object.keys(validation).length) {
            scrollToError(validation);
            return;
        }
        setIsSubmitting(true);
        try {
            const response = await fetch("/api/auth/forgot-password",
                { method: "POST", headers: { "Content-Type": "application/json", }, body: JSON.stringify(data), },
            );

            const result = await response.json();

            if (!response.ok) {
                setNotice(result.message);
                return;
            }

            setSuccessEmail(data.email);

        } catch (error) {
            console.error(error);
            setNotice("Connection problem. Please try again.",);
        } finally { setIsSubmitting(false); }
    }


    if (successEmail) {
        return (
            <VerificationEmailNotice
                email={successEmail}
                title="Password reset email sent"
                description="If an account exists for this email, we've sent a password reset link to:"
                footer={
                    <>
                        <p className="text-sm text-gray-500">
                            The link expires in 30 minutes.
                        </p>

                        <p className="text-xs text-gray-400">
                            If you don&apos;t receive anything, check your spam folder.
                        </p>
                    </>
                }
            />
        );
    }


    return (
        <form onSubmit={submit} className="space-y-8">
            <ShortTextField
                id="email"
                label="Email"
                type="email"
                value={data.email}
                error={errors.email}
                required
                onChange={update}
            />

            {notice && (
                <div className="rounded-xl bg-pink-50 border border-pink-200 px-5 py-3 text-gray-700">
                    {notice}
                </div>
            )}

            <div className="flex justify-center">
                <PrimaryButton type="submit" inactive={Object.keys(errors).length > 0} disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send reset link"}
                </PrimaryButton>
            </div>
        </form>
    );
}