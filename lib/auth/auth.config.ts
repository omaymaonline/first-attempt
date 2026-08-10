import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default {
    providers: [Credentials({})],

    pages: { signIn: "/auth/login", },

    callbacks: {
        authorized({ auth, request }) {
            const pathname = request.nextUrl.pathname;

            const isAuthPage =
                pathname === "/auth/login" ||
                pathname === "/auth/register";

            const isDashboard = pathname.startsWith("/dashboard");

            const isAdmin = pathname.startsWith("/admin");

            // Guest
            if (!auth) {
                if (isDashboard || isAdmin) { return false; }
                return true;
            }

            const role = auth.user?.role;

            // Logged-in user visiting auth pages
            if (isAuthPage) {
                return Response.redirect(
                    new URL(role === "ADMIN" ? "/admin" : "/dashboard", request.nextUrl.origin)
                );
            }

            // Admin should never see user dashboard
            if (role === "ADMIN" && isDashboard) { return Response.redirect(new URL("/admin", request.nextUrl.origin)); }

            // User should never see admin pages
            if (role !== "ADMIN" && isAdmin) { return Response.redirect(new URL("/dashboard", request.nextUrl.origin)); }

            return true;
        },
    },
} satisfies NextAuthConfig;