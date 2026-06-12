type SectionCardProps = {
    title: string;
    description?: string;
    children: React.ReactNode;
};

export default function SectionCard({
    title,
    description,
    children,
}: SectionCardProps) {
    return (
        <section className="mt-20 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

            <div className="border-b border-gray-100 pb-6">

                <h2 className="text-3xl">
                    {title}
                </h2>

                {description && (
                    <p className="mt-4 max-w-2xl text-gray-600 leading-relaxed">
                        {description}
                    </p>
                )}

            </div>

            <div className="mt-10">
                {children}
            </div>

        </section>
    );
}