import VerificationEmailNotice from "@/components/auth/verification/VerificationEmailNotice";

import { resendEmailChange } from "@/lib/services/settings/account/email";

type Props = {
    searchParams: Promise<{
        token?: string;
    }>;
};

export default async function ResendEmailChangePage({
    searchParams,
}: Props) {
    const { token } = await searchParams;

    const result = await resendEmailChange(token ?? null);

    if (result.status === "invalid") {
        return (
            <section className="min-h-screen flex items-center px-6 py-16">
                <div className="mx-auto w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-sm text-center">
                    Invalid email change request.
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
                        description="We've sent a new confirmation email to:"
                        email={result.email}
                    />
                </div>
            </div>
        </section>
    );
}