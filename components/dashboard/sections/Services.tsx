export default function ServicesSection() {
    return (
        <div className="space-y-8">

            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold">
                    Services
                </h1>

                <p className="text-gray-500 mt-1">
                    Track your requests, submissions, and delivered work.
                </p>
            </div>

            {/* Grid of service categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <ServiceCard
                    title="Questionnaires"
                    description="Forms you have submitted to help us understand your needs."
                    items={[
                        "Website onboarding form",
                        "Brand discovery questionnaire",
                        "Product requirement survey",
                    ]}
                />

                <ServiceCard
                    title="Service Requests"
                    description="Custom requests you have submitted."
                    items={[
                        "Landing page design request",
                        "E-commerce setup request",
                        "Portfolio website request",
                    ]}
                />

                <ServiceCard
                    title="Deliverables"
                    description="Files, results, or outputs delivered to you."
                    items={[
                        "UI mockups (Figma)",
                        "Website prototype",
                        "Brand identity kit",
                    ]}
                />

                <ServiceCard
                    title="Invoices"
                    description="Your payment history and receipts."
                    items={[
                        "Invoice #001 - Paid",
                        "Invoice #002 - Pending",
                        "Invoice #003 - Paid",
                    ]}
                />
            </div>

            {/* Bottom status panel */}
            <div className="bg-white border rounded-xl p-6">

                <h2 className="font-semibold text-lg">
                    Service Status
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                    This section will update in real-time once your requests are processed.
                </p>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">

                    <StatusCard label="Active Requests" value="2" />
                    <StatusCard label="Completed" value="5" />
                    <StatusCard label="Pending Review" value="1" />

                </div>
            </div>

        </div>
    );
}

/* ---------------- helpers ---------------- */

function ServiceCard({
    title,
    description,
    items,
}: {
    title: string;
    description: string;
    items: string[];
}) {
    return (
        <div className="bg-white border rounded-xl p-5 hover:shadow-md transition">

            <h3 className="text-lg font-semibold">{title}</h3>

            <p className="text-sm text-gray-500 mt-1">
                {description}
            </p>

            <div className="mt-4 space-y-2">
                {items.map((item, i) => (
                    <div
                        key={i}
                        className="text-sm text-gray-700 flex items-center gap-2"
                    >
                        <span className="w-2 h-2 rounded-full bg-pink-500" />
                        {item}
                    </div>
                ))}
            </div>

        </div>
    );
}

function StatusCard({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="bg-gray-50 border rounded-xl p-4">
            <p className="text-sm text-gray-500">{label}</p>
            <p className="text-xl font-bold mt-1">{value}</p>
        </div>
    );
}