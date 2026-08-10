import { ForgotPasswordData } from "./types";

export function validateForgotPassword(
    data: ForgotPasswordData,
) {
    const errors: Partial<Record<keyof ForgotPasswordData, string>> = {};

    if (!data.email.trim()) {
        errors.email = "Email is required.";
    } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
    ) { errors.email = "Please enter a valid email address."; }

    return errors;
}