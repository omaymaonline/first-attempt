import VerificationEmailNotice from "@/components/auth/verification/VerificationEmailNotice";

import { resendVerification, resendVerificationByEmail, } from "@/lib/services/auth/verification";

type Props = {
    searchParams: Promise<{
        token?: string;
        email?: string;
    }>;
};

export default async function ResendVerificationPage({ searchParams, }: Props) {
    const { token, email } = await searchParams;

    const result = token
        ? await resendVerification(token)
        : await resendVerificationByEmail(email ?? null);

    if (result.status === "invalid") {
        return (
            <section className="min-h-screen flex items-center px-6 py-16">
                <div className="mx-auto w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-sm text-center">
                    Invalid verification request.
                </div>
            </section>
        );
    }

    if (result.status === "already-verified") {
        return (
            <section className="min-h-screen flex items-center px-6 py-16">
                <div className="mx-auto w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-sm text-center">
                    Your email is already verified.
                </div>
            </section>
        );
    }

    return (
        <section className="min-h-screen flex items-center px-6 py-16">
            <div className="mx-auto w-full max-w-md">
                <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
                    <VerificationEmailNotice
                        title="Verification email sent ✨"
                        description="We've sent a new verification email to:"
                        email={result.email}
                    />
                </div>
            </div>
        </section>
    );
}