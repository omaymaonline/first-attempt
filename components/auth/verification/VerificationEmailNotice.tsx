import PrimaryButton from "@/components/buttons&links/PrimaryButton";

import { getInboxUrl } from "../inbox/getInboxUrl";

type VerificationEmailNoticeProps = {
    email: string;
    title?: string;
    description?: string;
    footer?: React.ReactNode;
};

export default function VerificationEmailNotice({
    email,
    title = "Account created 🎉",
    description = "We've sent a verification email to:",
    footer,
}: VerificationEmailNoticeProps) {

    const inboxUrl = getInboxUrl(email);

    return (
        <div className="space-y-8 text-center">

            <div className="space-y-4">

                <h3 className="text-3xl font-semibold">
                    {title}
                </h3>

                <p className="text-gray-600">
                    {description}
                </p>

                <p className="font-medium break-all">
                    {email}
                </p>

            </div>

            <div className="space-y-3">

                {footer ?? (
                    <>
                        <p className="text-sm text-gray-500">
                            Check your inbox and spam folder, then click the verification link.
                        </p>

                        <p className="text-xs text-gray-400">
                            The button below is only a shortcut. You can open your usual inbox app.
                        </p>
                    </>
                )}

            </div>

            <div className="pt-2 flex justify-center">

                {inboxUrl ? (
                    <PrimaryButton href={inboxUrl}>
                        Open Inbox
                    </PrimaryButton>
                ) : (
                    <PrimaryButton href="/">
                        Open Email App
                    </PrimaryButton>
                )}

            </div>

        </div>
    );
}