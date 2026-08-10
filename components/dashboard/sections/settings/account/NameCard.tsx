"use client";

import ShortTextField from "@/components/fields/ShortTextField";
import ThirdButton from "@/components/buttons&links/ThirdButton";
import SecondaryButton from "@/components/buttons&links/SecondaryButton";
import PrimaryButton from "@/components/buttons&links/PrimaryButton";

import { useNameCard } from "./useCards";

type Props = {
    initialName: string;
};

export default function NameCard({
    initialName,
}: Props) {
    const {
        editing,
        name,
        error,
        isSaving,
        startEditing,
        cancelEditing,
        save,
        update,
    } = useNameCard(initialName);

    return (
        <div className="rounded-3xl border bg-white p-6 shadow-sm">

            <h2 className="text-xl font-semibold">
                Name
            </h2>

            <p className="mt-1 text-sm text-gray-500">
                Your public display name.
            </p>

            {!editing ? (
                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <p className="text-gray-900">
                        {name}
                    </p>

                    <ThirdButton onClick={startEditing}>
                        Edit
                    </ThirdButton>

                </div>
            ) : (
                <div className="mt-6 space-y-6">

                    <ShortTextField
                        id="name"
                        label="Full name"
                        value={name}
                        error={error}
                        required
                        onChange={update}
                    />

                    <div className="flex justify-end gap-3">

                        <SecondaryButton onClick={cancelEditing}>
                            Cancel
                        </SecondaryButton>

                        <PrimaryButton onClick={save} disabled={isSaving}>
                            {isSaving ? "Saving..." : "Save"}
                        </PrimaryButton>

                    </div>

                </div>
            )}

        </div>
    );
}