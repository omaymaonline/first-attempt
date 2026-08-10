export function formatName(name: string) {
    return name
        .trim()
        .split(/\s+/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
}

export function validateName(name: string): string | undefined {
    const words = name.trim().split(/\s+/).filter(Boolean);

    if (!name.trim()) { return "Full name is required."; }

    if (words.length < 2) { return "Please enter at least two words."; }

    return undefined;
}

export function validateEmail(email: string): string | undefined {
    if (!email.trim()) { return "Email is required."; }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { return "Please enter a valid email address."; }

    return undefined;
}