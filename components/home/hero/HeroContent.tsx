import PrimaryButton from "@/components/buttons&links/PrimaryButton";
import SecondaryButton from "@/components/buttons&links/SecondaryButton";

import { heroData } from "./hero.data";

export default function HeroContent() {
    return (
        <div className="flex max-w-2xl flex-col items-start">
            {/* Eyebrow */}
            <p className="mb-4 text-xs font-small uppercase tracking-[0.18em] text-pink-400">
                {heroData.eyebrow}
            </p>

            {/* Heading */}
            <h1 className="text-4xl leading-tight font-normal  sm:text-5xl lg:text-6xl">
                <span className="block">
                    {heroData.title.line1}
                </span>

                <span className="block">
                    {heroData.title.line2}
                </span>
            </h1>

            {/* Description */}
            <p className="mt-8 hidden max-w-lg text-lg leading-8 text-gray-600 min-[900px]:block">
                {heroData.description}
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">
                <PrimaryButton href={heroData.primaryCTA.href}>
                    {heroData.primaryCTA.label}
                </PrimaryButton>

                <SecondaryButton href={heroData.secondaryCTA.href}>
                    {heroData.secondaryCTA.label}
                </SecondaryButton>
            </div>
        </div>
    );
}