import Hero from "@/components/services/Hero";
import Timeline from "@/components/services/Timeline";
import Fit from "@/components/services/Fit";
import CTA from "@/components/services/CTA";

export default function HowWeWorkPage() {
    return (
        <main className="relative overflow-x-hidden">
            <div className="mx-auto max-w-7xl">
                <Hero />

                <Timeline />

                <Fit />

                <CTA />
            </div>
        </main>
    );
}