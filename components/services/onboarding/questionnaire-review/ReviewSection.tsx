import PrimaryLink from "@/components/buttons&links/PrimaryLink";

type Props = {
    title: string;
    editHref: string;
    children: React.ReactNode;
    completed: boolean;
};

export default function ReviewSection({
    title,
    editHref,
    children,
    completed,
}: Props) {
    return (
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 pb-6">
                <div className="flex items-center gap-3">
                    <h2 className="text-2xl">{title}</h2>

                    {completed ? (
                        <span className="rounded-full border border-green-200 bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
                            ✓ Complete
                        </span>
                    ) : (
                        <span className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-sm font-medium text-red-700">
                            ⚠ Incomplete
                        </span>
                    )}
                </div>

                <PrimaryLink href={editHref}>Edit</PrimaryLink>
            </div>

            <div className="mt-6 space-y-4 text-gray-700">{children}</div>
        </div>
    );
}