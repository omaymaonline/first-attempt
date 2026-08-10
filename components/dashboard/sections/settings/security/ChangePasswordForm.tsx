"use client";

import { useState } from "react";

import PrimaryButton from "@/components/buttons&links/PrimaryButton";
import SecondaryButton from "@/components/buttons&links/SecondaryButton";
import PasswordField from "@/components/password/PasswordField";
import PasswordStrength from "@/components/password/PasswordStrength";

import { passwordStrong } from "@/lib/auth/passwordValidation";

type Props = {
    onSuccess: () => void;
    onCancel: () => void;
};

function validate(currentPassword: string, newPassword: string, confirmPassword: string) {
    const errors: { currentPassword?: string; newPassword?: string; confirmPassword?: string } = {};

    if (!currentPassword) {
        errors.currentPassword = "Current password is required.";
    }

    if (!passwordStrong(newPassword)) {
        errors.newPassword = "Password must meet all requirements.";
    }

    if (!confirmPassword) {
        errors.confirmPassword = "Please confirm your password.";
    } else if (newPassword !== confirmPassword) {
        errors.confirmPassword = "Passwords do not match.";
    }

    return errors;
}

export default function ChangePasswordForm({ onSuccess, onCancel }: Props) {
    //const currentPasswordRef = useRef<HTMLInputElement>(null);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPasswords, setShowPasswords] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [notice, setNotice] = useState("");
    const [errors, setErrors] = useState<{ currentPassword?: string; newPassword?: string; confirmPassword?: string }>({});

    function update() {
        if (!submitted) return;
        setErrors(validate(currentPassword, newPassword, confirmPassword));
    }

    function clear() {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setErrors({});
        setNotice("");
        setSubmitted(false);
    }

    function cancel() {
        clear();
        onCancel();
    }

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        if (isSubmitting) return;

        setSubmitted(true);
        const validation = validate(currentPassword, newPassword, confirmPassword);
        setErrors(validation);

        if (Object.keys(validation).length) return;

        setIsSubmitting(true);

        try {
            const response = await fetch("/api/settings/security/password", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ currentPassword, newPassword }),
            });

            const result = await response.json();

            if (!response.ok) {
                setNotice(result.message);
                return;
            }

            clear();
            onSuccess();
        } catch (error) {
            console.error(error);
            setNotice("Connection problem. Please try again.");
        } finally { setIsSubmitting(false); }
    }

    return (
        <form onSubmit={submit} className="space-y-8">
            <PasswordField
                id="currentPassword"
                label="Current password"
                value={currentPassword}
                error={errors.currentPassword}
                required
                showPassword={showPasswords}
                togglePassword={() => setShowPasswords(!showPasswords)}
                onChange={(value) => { setCurrentPassword(value); update(); }}
            />

            <PasswordField
                id="newPassword"
                label="New password"
                value={newPassword}
                error={errors.newPassword}
                required
                showPassword={showPasswords}
                togglePassword={() => setShowPasswords(!showPasswords)}
                onChange={(value) => { setNewPassword(value); update(); }}
            />

            {newPassword && <PasswordStrength password={newPassword} />}

            <PasswordField
                id="confirmPassword"
                label="Confirm password"
                value={confirmPassword}
                error={errors.confirmPassword}
                required
                showPassword={showPasswords}
                togglePassword={() => setShowPasswords(!showPasswords)}
                onChange={(value) => { setConfirmPassword(value); update(); }}
            />

            {notice && (
                <div className="rounded-xl border border-pink-200 bg-pink-50 px-5 py-3 text-gray-700">
                    {notice}
                </div>
            )}

            <div className="flex justify-end gap-3">
                <SecondaryButton type="button" onClick={cancel}>
                    Cancel
                </SecondaryButton>

                <PrimaryButton type="submit" inactive={Object.keys(errors).length > 0} disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save Changes"}
                </PrimaryButton>
            </div>
        </form>
    );
}