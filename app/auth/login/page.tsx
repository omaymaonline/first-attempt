import LoginForm from "@/components/auth/login/LoginForm";

export default function LoginPage() {
    return (
        <section className="min-h-screen flex items-center px-6 py-16">
            <div className="mx-auto w-full max-w-md">

                <div className="mb-8 text-center">
                    <h1 className="text-4xl">
                        Good to See You Again
                    </h1>
                </div>

                <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
                    <LoginForm />
                </div>

                <p className="mt-10">
                    By signing in, you agree to our{" "}
                    <a href="/policy" className="font-medium underline decoration-gray-300 underline-offset-4 transition hover:text-pink-500 hover:decoration-pink-300">
                        Terms, Acceptable Use, and Privacy Policy
                    </a>.
                </p>

            </div>
        </section>
    );
}