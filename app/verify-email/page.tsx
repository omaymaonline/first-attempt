import PrimaryButton from "@/components/buttons&links/PrimaryButton";

type Props = {
    searchParams: Promise<{
        status?: string;
        token?: string;
    }>;
};

export default async function VerifyEmailPage({ searchParams, }: Props) {
    const params = await searchParams;
    const status = params.status;
    const token = params.token;

    let title = "";
    let message = "";

    switch (status) {
        case "success":
            title = "Email verified 🎉";
            message = "Your account has been verified successfully. You can now sign in.";
            break;

        case "already-verified":
            title = "Email already verified";
            message = "Your account is already verified. You can sign in normally.";
            break;

        case "expired":
            title = "Verification link expired";
            message = "This verification link has expired. Please request a new verification email.";
            break;

        case "invalid":
            title = "Invalid verification link";
            message = "This verification link is invalid or has already been used. Try loggin in.";
            break;

        default:
            title = "Something went wrong";
            message = "We couldn't verify your email. Please try again later.";
    }

    return (
        <main className="min-h-screen flex items-center justify-center px-6">
            <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm">

                <h1 className="text-3xl font-semibold">
                    {title}
                </h1>

                <p className="mt-4 text-gray-600">
                    {message}
                </p>

                <div className="mt-8 flex justify-center gap-4">
                    {status === "expired" && token ? (
                        <PrimaryButton href={`/resend-verification?token=${token}`}> Send New Verification Email </PrimaryButton>
                    ) : (
                        <PrimaryButton href="/auth/login">Go to Login</PrimaryButton>
                    )}
                </div>


            </div>
        </main>
    );
}