import Image from "next/image";

export default function HeroSection() {
    return (

        <section className="relative h-screen overflow-hidden">

            {/* Desktop Hero */}
            <div className="relative hidden h-full w-full md:block">

                <Image
                    src="/hero-desktop.webp"
                    alt="Omayma Online Hero"
                    sizes="100vw"
                    fill
                    priority
                    className="object-cover"
                />

            </div>

            {/* Mobile Hero */}
            <div className="relative block h-full w-full md:hidden">

                <Image
                    src="/hero-mobile.webp"
                    alt="Omayma Online Hero Mobile"
                    sizes="100vw"
                    fill
                    priority
                    className="object-cover"
                />

            </div>

        </section>
    );
}