"use client";

import { useRouter } from "next/navigation";

import PrimaryButton from "@/components/buttons&links/PrimaryButton";
import ShortTextField from "@/components/fields/ShortTextField";
import TextareaField from "@/components/fields/TextareaField";

import { useContactForm } from "./useContactForm";
import { validateContact } from "./validation";

export default function ContactForm() {
    const { data, setData } = useContactForm();
    const errors = validateContact(data);
    const canSubmit = Object.keys(errors).length === 0;

    const router = useRouter();

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (!canSubmit) {
            const firstErrorId = Object.keys(errors)[0];
            document.getElementById(firstErrorId ?? "")?.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            return;
        }

        router.push("/contact/thank-you");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-10">
            <ShortTextField
                id="name"
                label="Name"
                value={data.name}
                onChange={(val) => setData({ ...data, name: val })}
                placeholder="Your name"
                required
                error={errors.name}
                maxLength={64}
            />

            <ShortTextField
                id="email"
                label="Email"
                type="email"
                value={data.email}
                onChange={(val) => setData({ ...data, email: val })}
                placeholder="you@example.com"
                required
                error={errors.email}
                maxLength={254}
            />

            <ShortTextField
                id="subject"
                label="Subject"
                value={data.subject}
                onChange={(val) => setData({ ...data, subject: val })}
                placeholder="What would you like to discuss?"
                required
                error={errors.subject}
                maxLength={80}
            />

            <TextareaField
                id="message"
                label="Message"
                value={data.message}
                onChange={(val) => setData({ ...data, message: val })}
                required
                error={errors.message}
                maxLength={1200}
            />

            <div className="flex justify-center pt-4">
                <PrimaryButton type="submit" inactive={!canSubmit}>
                    Submit
                </PrimaryButton>
            </div>
        </form>
    );
}
