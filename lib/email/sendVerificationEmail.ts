import { transporter } from "./transporter";
import { verificationTemplate } from "./templates/verification";

type SendVerificationEmailProps = {
    to: string;
    verificationUrl: string;
};

export async function sendVerificationEmail({
    to,
    verificationUrl,
}: SendVerificationEmailProps) {
    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to,
        subject: "Verify your account ✨",
        html: verificationTemplate({ verificationUrl, }),
    });
}