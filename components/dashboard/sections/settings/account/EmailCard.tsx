"use client";

import ShortTextField from "@/components/fields/ShortTextField";
import ThirdButton from "@/components/buttons&links/ThirdButton";
import SecondaryButton from "@/components/buttons&links/SecondaryButton";
import PrimaryButton from "@/components/buttons&links/PrimaryButton";
import VerificationEmailNotice from "@/components/auth/verification/VerificationEmailNotice";

import { useEmailCard } from "./useCards";

type Props = {
    initialEmail: string;
};

export default function EmailCard({ initialEmail, }: Props) {
    const {
        editing,
        email,
        error,
        isSaving,
        loadingPending,
        verificationEmail,

        startEditing,
        cancelEditing,
        update,

        continueChange,
        resendVerification,
        cancelPendingChange,
    } = useEmailCard(initialEmail);

    if (loadingPending) {
        return (
            <div className="rounded-3xl border bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold">Email</h2>

                <p className="mt-1 text-sm text-gray-500">
                    Loading your email settings...
                </p>

                <div className="mt-6 space-y-3">
                    <div className="h-5 w-56 animate-pulse rounded bg-gray-200" />
                    <div className="h-10 w-24 animate-pulse rounded-xl bg-gray-200" />
                </div>
            </div>
        );
    }

    if (verificationEmail) {
        return (
            <div className="rounded-3xl border bg-white p-6 shadow-sm">
                <VerificationEmailNotice
                    email={verificationEmail}
                    title="Verify your new email"
                    description="We've sent a verification email to:"
                    footer={
                        <>
                            <p className="text-sm text-gray-500">
                                Your current email will remain active until you verify the new one.
                            </p>
                            <p className="text-xs text-gray-400">
                                Check your inbox and spam folder, then click the verification link.
                            </p>
                            {error && (
                                <p className="text-sm text-red-500 mt-3">
                                    {error}
                                </p>
                            )}
                            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                                <SecondaryButton onClick={resendVerification}>
                                    Resend Email
                                </SecondaryButton>

                                <ThirdButton onClick={cancelPendingChange}>
                                    Cancel Request
                                </ThirdButton>
                            </div>

                        </>
                    }
                />
            </div>
        );
    }

    return (
        <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Email</h2>
            <p className="mt-1 text-sm text-gray-500">
                This email is used to sign in and receive important account notifications.
            </p>

            {!editing ? (
                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-gray-900">{initialEmail}</p>
                    <ThirdButton onClick={startEditing}>
                        Change
                    </ThirdButton>
                </div>
            ) : (
                <div className="mt-6 space-y-6">
                    {/* Current email */}
                    <div>
                        <p className="mb-2 text-sm font-medium text-gray-700">Current email</p>
                        <div className="rounded-xl border bg-gray-50 px-4 py-3 text-gray-600">
                            {initialEmail}
                        </div>
                    </div>

                    {/* New email */}
                    <ShortTextField
                        id="email"
                        label="New email"
                        type="email"
                        value={email}
                        error={error}
                        required
                        onChange={update}
                    />

                    {/* Buttons */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                        <SecondaryButton onClick={cancelEditing}>Cancel</SecondaryButton>
                        <PrimaryButton onClick={continueChange} disabled={isSaving}>
                            {isSaving ? "Sending..." : "Send Verification"}
                        </PrimaryButton>
                    </div>
                </div>
            )}
        </div>
    );
}