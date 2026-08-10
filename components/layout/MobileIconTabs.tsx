"use client";

import type { LucideIcon } from "lucide-react";

type MobileIconTabsProps<T extends string> = {
    active: T;
    setActive: (value: T) => void;
    items: readonly {
        id: T;
        label: string;
        icon: LucideIcon;
    }[];
};

export default function MobileIconTabs<T extends string>({
    active,
    setActive,
    items,
}: MobileIconTabsProps<T>) {
    return (
        <nav className="lg:hidden">
            <div className="inline-flex gap-2 rounded-2xl bg-white p-2 shadow-sm">
                {items.map((item) => {
                    const Icon = item.icon;
                    const isActive = active === item.id;

                    return (
                        <button
                            key={item.id}
                            type="button"
                            aria-label={item.label}
                            title={item.label}
                            onClick={() => {
                                setActive(item.id);
                                window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className={`flex h-11 w-11 items-center justify-center rounded-xl transition-all
                ${isActive
                                    ? "bg-pink-50 text-pink-600"
                                    : "text-gray-500 hover:bg-gray-50"
                                }
              `}
                        >
                            <Icon size={18} />
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}