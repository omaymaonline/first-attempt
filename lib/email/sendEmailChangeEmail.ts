import { transporter } from "./transporter";
import { emailChangeTemplate } from "./templates/emailChanged";


type SendEmailChangeEmailProps = {
    to: string;
    verificationUrl: string;
};


export async function sendEmailChangeEmail({
    to,
    verificationUrl,
}: SendEmailChangeEmailProps) {
    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to,
        subject: "Confirm your new email ✨",
        html: emailChangeTemplate({ verificationUrl }),
    });
}