import PrimaryButton from "@/components/buttons&links/PrimaryButton";

type Props = {
    searchParams: Promise<{
        status?: string;
        token?: string;
    }>;
};

export default async function ChangeEmailPage({
    searchParams,
}: Props) {
    const params = await searchParams;

    const status = params.status;
    const token = params.token;

    let title = "";
    let message = "";

    switch (status) {
        case "success":
            title = "Email updated 🎉";
            message = "Your email address has been changed successfully. Please sign in using your new email.";
            break;

        case "expired":
            title = "Verification link expired";
            message = "This email change link has expired. You can request another one from your account settings.";
            break;

        case "invalid":
            title = "Invalid verification link";
            message = "This verification link is invalid or has already been used.";
            break;

        default:
            title = "Something went wrong";
            message = "We couldn't complete your email change. Please try again.";
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

                <div className="mt-8 flex justify-center">
                    {status === "expired" && token ? (
                        <PrimaryButton href={`/resend-email-change?token=${token}`}>
                            Send New Verification Email
                        </PrimaryButton>
                    ) : (
                        <PrimaryButton href="/auth/login">
                            Login
                        </PrimaryButton>
                    )}
                </div>

            </div>
        </main>
    );
}