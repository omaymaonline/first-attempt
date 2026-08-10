import { z } from "zod";
import { hashPassword } from "@/lib/auth/password";
import { Prisma } from "@/app/generated/prisma/client";

import { prisma } from "@/lib/prisma";
import { prepareVerification, sendVerification } from "./verification";

// Validation schema
export const registerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string()
        .min(8, "Password too short")
        .max(32, "Password too long")
        .regex(/[a-z]/, "Need lowercase")
        .regex(/[A-Z]/, "Need uppercase")
        .regex(/[0-9]/, "Need number")
        .regex(/[^A-Za-z0-9]/, "Need special character"),
});

// Result type
export type RegisterResult =
    | { success: true }
    | {
        success: false;
        status: 400;
        body: {
            message: string;
            errors: ReturnType<typeof registerSchema.safeParse> extends infer _ ? unknown : never;
        };
    }
    | {
        success: false;
        status: 409;
        body: { code: "EMAIL_EXISTS"; message: string };
    }
    | {
        success: false;
        status: 500;
        body: { message: string };
    };

// Service function
export async function registerUser(body: unknown): Promise<RegisterResult> {
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
        return {
            success: false,
            status: 400,
            body: {
                message: "Invalid data",
                errors: parsed.error.flatten(),
            },
        };
    }

    const { name, email, password } = parsed.data;

    try {
        const hashedPassword = await hashPassword(password);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        const verification = await prepareVerification(user);

        await sendVerification(verification);

        return { success: true };

    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
            return { success: false, status: 409, body: { code: "EMAIL_EXISTS", message: "Account already exists" }, };
        }

        console.error(error);

        return { success: false, status: 500, body: { message: "Something went wrong" }, };
    }
}
