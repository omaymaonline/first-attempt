import { emailLayout } from "./layout";

type VerificationTemplateProps = {
  verificationUrl: string;
};

export function verificationTemplate({
  verificationUrl,
}: VerificationTemplateProps) {
  return emailLayout({
    title: "Welcome to Omayma Online!",
    description: `
            Your account has been created successfully.<br/>
            Please verify your email address to continue.
        `,
    buttonText: "Verify Account",
    buttonUrl: verificationUrl,
    footerNote: `
            This link expires in 24 hours.<br/>
            Accounts not verified within 7 days will be removed.
        `,
  });
}