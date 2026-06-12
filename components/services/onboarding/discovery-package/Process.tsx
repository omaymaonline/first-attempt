export default function Process() {
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
        <div className="mx-10 rounded-3xl border border-gray-200 p-8 space-y-6">

            <h2 className="text-3xl">
                Here&apos;s what happens next.
            </h2>

            {steps.map((step, index) => (
                <div key={step} className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-pink-300 text-sm"> {index + 1} </div>
                    <p className="text-lg text-gray-700"> {step} </p>
                </div>
            ))}

        </div>
    );
}