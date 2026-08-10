import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { loginUser } from "@/lib/services/auth/login";
import authConfig from "./auth.config";


export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,

    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24 * 30, // 30 days
    },

    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {

                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const result = await loginUser(
                    String(credentials.email),
                    String(credentials.password),
                );

                if (!result.success) { return null; }

                return result.user;
            }
        }),
    ],

    callbacks: {
        async jwt({ token, user, trigger, session }) {
            // Initial login
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.role = user.role;
                token.emailVerified = user.isEmailVerified;
                token.sessionVersion = user.sessionVersion;

                return token;
            }

            // Session update (name changes)
            if (trigger === "update" && session?.name) {
                token.name = session.name;
            }

            // Validate session version on every request
            if (token.id) {
                const dbUser = await prisma.user.findUnique({
                    where: { id: token.id as string },
                    select: { sessionVersion: true },
                });

                if (!dbUser || dbUser.sessionVersion !== token.sessionVersion) {
                    return null;
                }
            }

            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.name = token.name as string;
                session.user.email = token.email as string;
                session.user.role = token.role as string;
                session.user.isEmailVerified = token.emailVerified as boolean;
            }

            return session;
        },

        async signIn({ user }) {
            if (!user.isEmailVerified) { return false; }
            return true;
        },
    },
});
