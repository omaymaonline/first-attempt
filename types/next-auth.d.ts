import { DefaultSession } from "next-auth";


declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            email: string;
            name?: string | null;
            role: string;
            isEmailVerified: boolean;
            sessionVersion: number;
        } & DefaultSession["user"];
    }

    interface User {
        id: string;
        email: string;
        name?: string | null;
        role: string;
        isEmailVerified: boolean;
        sessionVersion: number;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        email: string;
        name?: string | null;
        role: string;
        isEmailVerified: boolean;
        sessionVersion: number;
    }
}