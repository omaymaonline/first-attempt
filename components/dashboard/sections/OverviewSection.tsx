import { useCurrentUser } from "@/components/dashboard/useCurrentUser";

export default function OverviewSection() {
    const user = useCurrentUser();

    if (!user) return null;

    return (
        <div className="space-y-8">

            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold">
                    Welcome back, {user.name}
                </h1>

                <p className="text-gray-500 mt-1">
                    Here’s a summary of your recent activity across the platform.
                </p>
            </div>

            {/* Summary cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                <Card title="Blog Activity" value="3 reads" />
                <Card title="Messages" value="2 sent" />
                <Card title="Services" value="1 request" />
                <Card title="Purchases" value="2 items" />

            </div>

            {/* Recent activity feed */}
            <div className="bg-white border rounded-xl p-6 space-y-4">

                <h2 className="font-semibold text-lg">
                    Recent Activity
                </h2>

                <ActivityItem
                    text="You read: Building a Modern CMS"
                    time="2h ago"
                />

                <ActivityItem
                    text="You sent a contact message"
                    time="1d ago"
                />

                <ActivityItem
                    text="You purchased: UI Kit Pack"
                    time="3d ago"
                />

                <ActivityItem
                    text="You submitted a service request"
                    time="5d ago"
                />

            </div>

            {/* Quick access section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <QuickCard
                    title="Continue Reading"
                    desc="Resume your latest blog activity"
                />

                <QuickCard
                    title="View Messages"
                    desc="Check replies and conversations"
                />

                <QuickCard
                    title="Your Purchases"
                    desc="Access your downloaded products"
                />

            </div>

        </div>
    );
}

/* ----------------- Components ----------------- */

function Card({
    title,
    value,
}: {
    title: string;
    value: string;
}) {
    return (
        <div className="bg-white border rounded-xl p-4">
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-xl font-bold mt-1">{value}</p>
        </div>
    );
}

function ActivityItem({
    text,
    time,
}: {
    text: string;
    time: string;
}) {
    return (
        <div className="flex justify-between items-center py-2 border-b last:border-none">
            <span className="text-sm text-gray-700">{text}</span>
            <span className="text-xs text-gray-400">{time}</span>
        </div>
    );
}

function QuickCard({
    title,
    desc,
}: {
    title: string;
    desc: string;
}) {
    return (
        <div className="bg-white border rounded-xl p-5 hover:shadow-md transition">
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-gray-500 mt-1">{desc}</p>
        </div>
    );
}





{/* A relationship status card.

Something like:

────────────────────
Journey
────────────────────

Account Created

Questionnaire Completed

Discovery Session Pending

Current Stage:
Planning
────────────────────

Why?

Because your entire website is about journeys.

Not transactions.

This turns Connect into:

Communication
+
Project Progress

which is much more valuable. */}