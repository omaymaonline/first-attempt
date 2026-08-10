import HeroLogo from "./HeroLogo";

export default function HeroArtwork() {
    return (
        <div className="flex items-center justify-center">
            <div
                className="
                    relative
                    flex
                    aspect-square
                    w-[min(42vw,30rem)]
                    min-w-[15rem]
                    items-center
                    justify-center
                "
            >
                {/* Morning sunlight */}
                <div
                    className="
                        hero-sun
                        absolute
                        h-[75%]
                        w-[75%]
                        rounded-full
                        bg-gradient-to-br
                        from-amber-200/35
                        via-pink-200/25
                        to-transparent
                        blur-3xl
                    "
                />

                <HeroLogo />
            </div>
        </div>
    );
}