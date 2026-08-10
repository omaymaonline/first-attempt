export function getPasswordChecks(password: string) {
    return {
        length: password.length >= 8,
        lowercase: /[a-z]/.test(password),
        uppercase: /[A-Z]/.test(password),
        number: /\d/.test(password),
        special: /[^A-Za-z0-9]/.test(password),
    };
}

export function passwordStrong(password: string) {
    return Object.values(getPasswordChecks(password)).every(Boolean);
}