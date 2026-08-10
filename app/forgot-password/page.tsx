import ForgotPasswordForm from "@/components/auth/forgot-password/ForgotPasswordForm";

export default function ForgotPasswordPage() {
    return (
        <main className="min-h-screen px-6 py-16">
            <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-2">

                <section className="hidden lg:flex items-center justify-center">
                    <div className="space-y-6">
                        <h1 className="text-6xl leading-tight font-medium">
                            Forgot your
                            <br />
                            password?
                        </h1>

                        <p className="max-w-md text-lg text-gray-500">
                            Enter your email address and we&apos;ll send you a secure
                            link to create a new password.
                        </p>
                    </div>
                </section>

                <section className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="mb-8">
                        <h2 className="text-center text-3xl font-semibold">
                            Reset password
                        </h2>
                    </div>
                    <ForgotPasswordForm />
                </section>

            </div>
        </main>
    );
}