import PrimaryLink from "@/components/links/PrimaryLink";

export default function AboutPreview() {
    return (

        <section className="px-6 py-24">

            <div className="mx-auto max-w-4xl">

                <p className="text-sm text-center uppercase tracking-[0.2em] text-pink-500">
                    What is Omayma Online?
                </p>

                <h2 className="mt-4 text-4xl text-center leading-tight md:text-5xl">
                    A Quiet Digital Space
                </h2>

                <div className="mt-10 space-y-6 text-lg leading-loose text-gray-700 text-center text-adjust">

                    <p>
                        As-salamu alaykum and peace be upon you all.
                        Welcome to Omayma Online!
                    </p>

                    <p>
                        This is my digital space where ideas, systems,
                        experiments, and learning processes slowly take shape.
                    </p>

                    <p>
                        I created this space because I genuinely enjoy solving
                        problems, especially the kind that make people feel
                        overwhelmed, disconnected, or stuck with technology.
                    </p>

                    <p>
                        This is my part studio, part laboratory, and part digital home.
                    </p>

                </div>

                <div className="mt-10 text-center">
                    <PrimaryLink href="/about">
                        Read More →
                    </PrimaryLink>
                </div>

            </div>

        </section>
    );
}