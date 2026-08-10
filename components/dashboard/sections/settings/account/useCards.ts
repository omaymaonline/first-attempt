"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { validateName, validateEmail } from "@/lib/services/settings/account/validation";


export function useNameCard(initialName: string) {
    const [editing, setEditing] = useState(false);
    const [savedName, setSavedName] = useState(initialName);
    const [name, setName] = useState(initialName);
    const [error, setError] = useState<string>();
    const [isSaving, setIsSaving] = useState(false);

    const { update: updateSession } = useSession();

    function startEditing() {
        setEditing(true);
        setError(undefined);
    }

    function cancelEditing() {
        setEditing(false);
        setName(savedName);
        setError(undefined);
    }

    function update(value: string) {
        setName(value);
        setError(validateName(value));
    }

    async function save() {
        const validationError = validateName(name);
        if (validationError) {
            setError(validationError);
            return;
        }

        setIsSaving(true);

        try {
            const response = await fetch("/api/settings/account/name", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name }),
            });

            const result = await response.json();

            if (!response.ok) {
                setError(result.message);
                return;
            }

            setSavedName(result.name);
            setName(result.name);
            setEditing(false);
            setError(undefined);

            await updateSession({ name: result.name });
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsSaving(false);
        }
    }

    return {
        editing,
        name,
        error,
        isSaving,
        startEditing,
        cancelEditing,
        update,
        save,
    };
}



export function useEmailCard(initialEmail: string,) {
    const [editing, setEditing] = useState(false);
    const [savedEmail] = useState(initialEmail);
    const [email, setEmail] = useState("");
    const [verificationEmail, setVerificationEmail] = useState<string>();
    const [error, setError] = useState<string>();
    const [isSaving, setIsSaving] = useState(false);
    const [loadingPending, setLoadingPending] = useState(true);

    useEffect(() => { loadPendingEmail(); }, []);

    async function loadPendingEmail() {
        setLoadingPending(true);

        try {
            const response = await fetch("/api/settings/account/email/pending");

            if (!response.ok) return;

            const result = await response.json();

            setVerificationEmail(result.pendingEmail?.email);
        } catch {
            // Ignore.
        } finally { setLoadingPending(false); }
    }

    function startEditing() {
        setEditing(true);
        setEmail("");
        setError(undefined);
    }

    function cancelEditing() {
        setEditing(false);
        setEmail("");
        setError(undefined);
    }

    function update(value: string) {
        setEmail(value);
        setError(validateEmail(value));
    }

    async function continueChange() {
        const validationError = validateEmail(email);
        if (validationError) {
            setError(validationError);
            return;
        }

        if (email.toLowerCase() === savedEmail.toLowerCase()) {
            setError("Please enter a different email address.");
            return;
        }

        setIsSaving(true);

        try {
            const response = await fetch("/api/settings/account/email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const result = await response.json();

            if (!response.ok) {
                setError(result.message);
                return;
            }

            await loadPendingEmail();
            setEditing(false);
            setError(undefined);
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsSaving(false);
        }
    }

    async function resendVerification() {
        setIsSaving(true);
        setError(undefined);

        try {
            const response = await fetch(
                "/api/settings/account/email/resend",
                { method: "POST", },
            );

            const result = await response.json();

            if (!response.ok) {
                setError(result.message);
                return;
            }

            await loadPendingEmail();
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsSaving(false);
        }
    }

    async function cancelPendingChange() {
        setIsSaving(true);
        setError(undefined);

        try {
            const response = await fetch(
                "/api/settings/account/email/cancel",
                { method: "DELETE", },
            );

            const result = await response.json();

            if (!response.ok) {
                setError(result.message);
                return;
            }

            await loadPendingEmail();
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsSaving(false);
        }
    }

    return {
        editing,
        email,
        error,
        isSaving,

        loadingPending,
        verificationEmail,

        startEditing,
        cancelEditing,
        update,

        continueChange,
        resendVerification,
        cancelPendingChange,
    };
}