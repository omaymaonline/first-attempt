import { transporter } from "./transporter";
import { passwordResetTemplate } from "./templates/passwordReset";

type SendPasswordResetEmailProps = {
    to: string;
    resetUrl: string;
};

export async function sendPasswordResetEmail({
    to,
    resetUrl,
}: SendPasswordResetEmailProps) {
    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to,
        subject: "Reset your password 🔒",
        html: passwordResetTemplate({ resetUrl }),
    });
}