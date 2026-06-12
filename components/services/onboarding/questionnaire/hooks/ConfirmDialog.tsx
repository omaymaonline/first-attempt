"use client";

type ConfirmDialogProps = {
    open: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
};

export default function ConfirmDialog({
    open,
    title,
    message,
    onConfirm,
    onCancel,
}: ConfirmDialogProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
                <p className="mb-4 text-xl font-semibold">{title}</p>
                <p className="mb-6 text-gray-600">{message}</p>

                <div className="flex justify-end gap-4">
                    <button onClick={onCancel} className="rounded-lg border border-gray-300 px-4 py-2 text-gray-600 hover:bg-gray-100">
                        Cancel
                    </button>
                    <button onClick={onConfirm} className="rounded-lg bg-pink-500 px-4 py-2 text-white hover:bg-pink-600" >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}