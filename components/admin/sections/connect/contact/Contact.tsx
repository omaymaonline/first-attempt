"use client";

import { useState } from "react";
import ContactInbox from "./ContactInbox";
import ContactPreview from "./ContactPreview";
import { ContactData } from "@/components/contact/types";

export default function Contact() {
    const [selected, setSelected] = useState<ContactData | null>(null);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6 h-screen">
            <ContactInbox onSelect={setSelected} />
            <ContactPreview submission={selected} />
        </div>
    );
}