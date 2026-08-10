import RegisterForm from "@/components/auth/register/RegisterForm";

export default async function RegisterPage() {

    return (
        <main className="min-h-screen px-6 py-16">
            <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">

                {/* Left side (intro text) */}
                <section className="hidden lg:flex items-center">
                    <div className="sticky top-1/2 -translate-y-1/2 space-y-6">
                        <h1 className="text-6xl leading-tight font-medium">
                            Join something
                            <br />
                            worth your time.
                        </h1>

                        <p className="max-w-md text-lg text-gray-500">
                            Create your account to connect, collaborate, explore services and
                            manage your workspace.
                        </p>
                    </div>
                </section>

                {/* Right side (form card) */}
                <section
                    className="
                                rounded-3xl
                                bg-white
                                p-8
                                shadow-xl
                                border
                                border-gray-100
                                animate-in
                                fade-in
                                slide-in-from-bottom-4
                                duration-700
                            "
                >
                    <div className="mb-8">
                        <h2 className="text-3xl text-center font-semibold">Create account</h2>
                    </div>

                    <RegisterForm />

                    <p className="mt-10">
                        By signing up, you agree to our {" "}
                        <a
                            href="/policy"
                            rel="noopener noreferrer"
                            className="font-medium underline decoration-gray-300 underline-offset-4 transition hover:text-pink-500 hover:decoration-pink-300"
                        >
                            Terms, Acceptable Use, and Privacy Policy
                        </a>.
                    </p>

                </section>
            </div>
        </main>
    );
}