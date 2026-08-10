export function getInboxUrl(email: string) {
    const domain = email.split("@")[1]?.toLowerCase();

    switch (domain) {
        case "gmail.com":
            return "https://mail.google.com";

        case "outlook.com":
        case "hotmail.com":
        case "live.com":
        case "msn.com":
            return "https://outlook.live.com/mail";

        case "yahoo.com":
            return "https://mail.yahoo.com";

        case "icloud.com":
        case "me.com":
        case "mac.com":
            return "https://www.icloud.com/mail";

        default:
            return null;
    }
}