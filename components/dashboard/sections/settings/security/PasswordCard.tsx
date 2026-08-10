"use client";

import { useState } from "react";

import ThirdButton from "@/components/buttons&links/ThirdButton";
import ChangePasswordForm from "./ChangePasswordForm";

export default function PasswordCard() {
    const [editing, setEditing] = useState(false);
    const [success, setSuccess] = useState(false);

    function handleSuccess() {
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
            setEditing(false);
        }, 1000);
    }

    function handleCancel() { setEditing(false); }

    return (
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all">
            <div className="space-y-2">
                <h3 className="text-xl font-semibold">Password</h3>
                <p className="text-gray-500">
                    Keep your account secure by updating your password.
                </p>
            </div>

            {!editing ? (
                <div className="mt-8 flex items-center justify-between">
                    <p className="tracking-[0.35em] text-gray-400">••••••••••••••</p>
                    <ThirdButton onClick={() => setEditing(true)}>Change Password</ThirdButton>
                </div>
            ) : (
                <div className="mt-8 border-t border-gray-100 pt-8">
                    {success ? (
                        <div className="rounded-xl border border-green-200 bg-green-50 px-5 py-3 text-green-700">
                            Password updated successfully.
                        </div>
                    ) : (
                        <ChangePasswordForm onSuccess={handleSuccess} onCancel={handleCancel} />
                    )}
                </div>
            )}
        </div>
    );
}