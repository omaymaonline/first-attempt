import ResetPasswordForm from "@/components/auth/reset-password/ResetPasswordForm";
import { verifyPasswordResetToken } from "@/lib/services/auth/password";

type Props = {
    searchParams: Promise<{ token?: string }>;
};

export default async function ResetPasswordPage({ searchParams }: Props) {
    const { token } = await searchParams;

    if (!token) {
        return (
            <main className="flex min-h-screen items-center justify-center">
                Invalid password reset link.
            </main>
        );
    }

    const result = await verifyPasswordResetToken(token);

    if (!result.success) {
        return (
            <main className="flex min-h-screen items-center justify-center">
                {result.message}
            </main>
        );
    }

    return (
        <main className="min-h-screen px-6 py-16">
            <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-2">

                {/* Left */}
                <section className="hidden items-center justify-center lg:flex">
                    <div className="space-y-6">
                        <h1 className="text-6xl leading-tight font-medium">
                            Create your
                            <br />
                            new password.
                        </h1>
                        <p className="max-w-md text-lg text-gray-500">
                            Choose a strong password to secure your account.
                        </p>
                    </div>
                </section>

                {/* Right */}
                <section className="animate-in slide-in-from-bottom-4 rounded-3xl border border-gray-100 bg-white p-8 shadow-xl fade-in duration-700">
                    <div className="mb-8">
                        <h2 className="text-center text-3xl font-semibold">
                            Reset password
                        </h2>
                    </div>
                    <ResetPasswordForm token={token} />
                </section>

            </div>
        </main>
    );
}