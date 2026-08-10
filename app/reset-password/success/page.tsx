import PrimaryButton from "@/components/buttons&links/PrimaryButton";

export default function ResetPasswordSuccessPage() {
    return (
        <main className="min-h-screen px-6 py-16">
            <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">

                {/* Left */}
                <section className="hidden lg:flex items-center">
                    <div className="sticky top-1/2 -translate-y-1/2 space-y-6">
                        <h1 className="text-6xl leading-tight font-medium">
                            Password
                            <br />
                            updated.
                        </h1>
                        <p className="max-w-md text-lg text-gray-500">
                            Your password has been changed successfully.
                            You can now sign in using your new password.
                        </p>
                    </div>
                </section>

                {/* Right */}
                <section className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="space-y-8 text-center">
                        <div className="space-y-4">
                            <div className="text-6xl">🎉</div>
                            <h2 className="text-3xl font-semibold">Password updated</h2>
                            <p className="text-gray-600">
                                Your password has been reset successfully.
                            </p>
                            <p className="text-sm text-gray-500">
                                All previous sessions have been signed out for your security.
                            </p>
                        </div>

                        <div className="flex justify-center pt-2">
                            <PrimaryButton href="/auth/login">Sign in</PrimaryButton>
                        </div>
                    </div>
                </section>

            </div>
        </main>
    );
}
