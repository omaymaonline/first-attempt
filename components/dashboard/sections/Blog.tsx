"use client";

import { useState } from "react";

type Post = {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    readTime: string;
    createdAt: string;
};

const mockPosts: Post[] = [
    {
        id: "1",
        title: "Building a Modern CMS from Scratch",
        excerpt:
            "A deep dive into structuring scalable content systems with Next.js and PostgreSQL.",
        category: "Development",
        readTime: "6 min read",
        createdAt: "2 days ago",
    },
    {
        id: "2",
        title: "Why User Activity Tracking Matters",
        excerpt:
            "Understanding user behavior through event-driven architecture.",
        category: "Architecture",
        readTime: "4 min read",
        createdAt: "4 days ago",
    },
    {
        id: "3",
        title: "Designing SaaS Dashboards That Feel Alive",
        excerpt:
            "UI principles behind modern dashboards like Linear and Notion.",
        category: "UI/UX",
        readTime: "5 min read",
        createdAt: "1 week ago",
    },
];

export default function BlogSection() {
    const [featured] = useState<Post>(mockPosts[0]);

    return (
        <div className="space-y-8">

            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold">Blog</h1>
                <p className="text-gray-500 mt-1">
                    Articles, insights, and system design notes.
                </p>
            </div>

            {/* Featured post */}
            <div className="bg-white border rounded-xl p-6 hover:shadow-md transition">

                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="px-2 py-1 bg-gray-100 rounded-full">
                        Featured
                    </span>
                    <span>{featured.category}</span>
                    <span>•</span>
                    <span>{featured.readTime}</span>
                </div>

                <h2 className="text-2xl font-semibold mt-3">
                    {featured.title}
                </h2>

                <p className="text-gray-600 mt-2">
                    {featured.excerpt}
                </p>

                <button className="mt-4 text-sm font-medium text-pink-600">
                    Read more →
                </button>
            </div>

            {/* Blog grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                {mockPosts.map((post) => (
                    <div
                        key={post.id}
                        className="bg-white border rounded-xl p-5 hover:shadow-md transition"
                    >

                        <div className="flex items-center justify-between text-xs text-gray-500">
                            <span className="px-2 py-1 bg-gray-100 rounded-full">
                                {post.category}
                            </span>

                            <span>{post.readTime}</span>
                        </div>

                        <h3 className="text-lg font-semibold mt-3">
                            {post.title}
                        </h3>

                        <p className="text-sm text-gray-600 mt-2">
                            {post.excerpt}
                        </p>

                        <div className="mt-4 text-xs text-gray-400">
                            {post.createdAt}
                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
}