import { LoginData } from "./types";

// Validate login form
export function validateLogin(data: LoginData) {
    const errors: Partial<Record<keyof LoginData, string>> = {};

    // Email validation
    if (!data.email.trim()) {
        errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = "Enter a valid email.";
    }

    // Password validation
    if (!data.password) { errors.password = "Password is required."; }

    return errors;
}