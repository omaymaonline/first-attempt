import { passwordStrong } from "@/lib/auth/passwordValidation";

import { RegisterData } from "./types";

// Format name
export function formatName(name: string) {
    return name
        .trim()
        .split(/\s+/)
        .map(word => word[0].toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
}

export function validateRegister(data: RegisterData) {
    const errors: Partial<Record<keyof RegisterData, string>> = {};

    const words = data.name.trim().split(/\s+/).filter(Boolean);

    if (!data.name.trim()) {
        errors.name = "Full name is required.";
    } else if (words.length < 2) {
        errors.name = "Please enter your first and last name.";
    }

    if (!data.email.trim()) {
        errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = "Please enter a valid email address.";
    }

    if (!data.password) {
        errors.password = "Password is required.";
    } else if (!passwordStrong(data.password)) {
        errors.password = "Password must meet all requirements.";
    }

    if (!data.confirmPassword) {
        errors.confirmPassword = "Please confirm your password.";
    } else if (data.password !== data.confirmPassword) {
        errors.confirmPassword = "Passwords do not match.";
    }

    return errors;
}