import { emailLayout } from "./layout";

type EmailChangeTemplateProps = {
  verificationUrl: string;
};

export function emailChangeTemplate({
  verificationUrl,
}: EmailChangeTemplateProps) {
  return emailLayout({
    title: "Confirm your new email",
    description: `
            We received a request to change the email address associated with your account.
            <br/><br/>
            Click the button below to confirm your new email.
        `,
    buttonText: "Confirm Email Change",
    buttonUrl: verificationUrl,
    footerNote: `
            This link expires in 24 hours.<br/>
            Your account will continue using your current email until you confirm this new address.
        `,
  });
}