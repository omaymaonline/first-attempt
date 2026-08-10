import PrimaryLink from "@/components/buttons&links/PrimaryLink";

export default function ServicesPreview() {
    return (
        <section className="bg-[#fff7fb] px-6 py-24">
            <div className="mx-auto max-w-4xl text-center">

                <p className="text-sm uppercase tracking-[0.2em] text-pink-500">
                    How We Work
                </p>

                <h2 className="mt-4 text-4xl md:text-6xl">
                    Most people think they need a website.
                </h2>

                <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-gray-600">
                    Sometimes they do.
                    Sometimes they need something entirely different. Which they might not know they needed!
                </p>

                <div className="mt-16 grid gap-4 md:grid-cols-4">

                    <div className="rounded-2xl border border-gray-200 p-6">
                        <p className="text-sm text-pink-500">01</p>
                        <h3 className="mt-2 text-xl">Discovery</h3>
                    </div>

                    <div className="rounded-2xl border border-gray-200 p-6">
                        <p className="text-sm text-pink-500">02</p>
                        <h3 className="mt-2 text-xl">Understanding</h3>
                    </div>

                    <div className="rounded-2xl border border-gray-200 p-6">
                        <p className="text-sm text-pink-500">03</p>
                        <h3 className="mt-2 text-xl">Clarity</h3>
                    </div>

                    <div className="rounded-2xl border border-gray-200 p-6">
                        <p className="text-sm text-pink-500">04</p>
                        <h3 className="mt-2 text-xl">Implementation</h3>
                    </div>

                </div>

                <p className="mx-auto mt-10 max-w-xl text-lg text-gray-600">
                    We begin by understanding the situation,
                    then build only what genuinely needs to be built.
                </p>

                <p className="mt-2 text-xl text-gray-700">
                    And the solution depends on the problem.
                </p>

                <div className="mt-10 text-center">
                    <PrimaryLink href="/services">
                        Explore the journey →
                    </PrimaryLink>
                </div>

            </div>
        </section>
    );
}