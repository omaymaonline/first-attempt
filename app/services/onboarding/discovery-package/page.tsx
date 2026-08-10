import PrimaryButton from "@/components/buttons&links/PrimaryButton";

export default function DiscoveryPackage() {
    const steps = [
        "I analyse your answers and prepare for the roadmap",
        "We schedule a 60-minute discovery session, where you hear my thoughts about your situation.",
        "I create your roadmap, the deliverables depend on your case and level of complexity you want (PDF, Slide Deck, Notion Workspace, Diagram...).",
        "We meet again to review and refine the roadmap. (30 minutes)",
        "Revisions are made if needed (Up To 3 Revisions Unless the mistake originated from my side).",
        "Final deliverables are sent.",
        "Implementation remains optional.",
    ];

    return (
        <div className="space-y-12">

            <div className="text-center">

                <h1 className="mt-30 text-5xl md:text-6xl"> Discovery Package </h1>

                <p className="mx-auto mt-4 max-w-2xl text-xl leading-relaxed text-gray-600">
                    You&apos;ve successfully completed the questionnaire. You can directly continue to submition
                </p>

                <div className="mt-10 mb-10 flex justify-center">

                    <PrimaryButton href="/services/onboarding/payment">
                        Continue to Submission
                    </PrimaryButton>

                </div>

                <p className="mx-auto mt-4 mb-10 max-w-2xl text-xl leading-relaxed text-gray-600">
                    Or
                </p>


                <div className="mx-10 mb-20 rounded-3xl border border-gray-200 p-8 space-y-6">

                    <h2 className="text-3xl">
                        Know what happens next first
                    </h2>

                    {steps.map((step, index) => (
                        <div key={step} className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-pink-300 text-sm"> {index + 1} </div>
                            <p className="text-lg text-gray-700"> {step} </p>
                        </div>
                    ))}

                    <div className="mt-10 flex justify-center">

                        <PrimaryButton href="/services/onboarding/payment">
                            Continue to Submission
                        </PrimaryButton>

                    </div>

                </div>

            </div>

        </div>
    );
}