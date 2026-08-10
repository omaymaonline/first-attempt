import { emailLayout } from "./layout";

type PasswordResetTemplateProps = {
    resetUrl: string;
};

export function passwordResetTemplate({
    resetUrl,
}: PasswordResetTemplateProps) {
    return emailLayout({
        title: "Reset your password",
        description: `
            We received a request to reset the password for your Omayma Online account.
            <br/><br/>
            If you made this request, click the button below to choose a new password.
            <br/><br/>
            If you didn't request a password reset, you can safely ignore this email.
        `,
        buttonText: "Reset Password",
        buttonUrl: resetUrl,
        footerNote: `
            This link expires in 30 minutes.<br/>
            For your security, it can only be used once.
        `,
    });
}