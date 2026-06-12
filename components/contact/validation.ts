import { ContactData } from "./types";

export function validateContact(data: ContactData) {
    const errors: Partial<Record<keyof ContactData, string>> = {};

    if (!data.name.trim()) errors.name = "Name is required.";
    if (!data.email.trim()) errors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
        errors.email = "Please enter a valid email address.";

    if (!data.subject.trim()) errors.subject = "Subject is required.";
    if (!data.message.trim()) errors.message = "Message is required.";

    return errors;
}
