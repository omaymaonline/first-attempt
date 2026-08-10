export default function HeroBackground() {
    return (
        <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
            {/* Base */}
            <div className="absolute inset-0 bg-[#fdfaf6]" />

            {/* Soft pink atmosphere */}
            <div className="hero-sky absolute inset-0 bg-gradient-to-b from-pink-50 via-pink-100/60 to-[#fdfaf6]" />

            {/* Decorative SVG */}
            <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 1600 900"
                preserveAspectRatio="none"
            >
                <defs>
                    <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="30" />
                    </filter>

                    <linearGradient id="pinkWave" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#F472B6" stopOpacity="0.18" />
                        <stop offset="100%" stopColor="#F472B6" stopOpacity="0" />
                    </linearGradient>

                    <linearGradient id="goldWave" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.12" />
                        <stop offset="100%" stopColor="#FBBF24" stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Top organic sweep */}
                <g className="hero-cloud hero-cloud-top">
                    <path
                        filter="url(#blur)"
                        fill="url(#pinkWave)"
                        d="M-150 120 C180 -60 520 60 780 180 C1000 280 1240 240 1500 80 L1750 0 L1750 420 C1350 300 1050 360 780 300 C490 240 180 280 -150 420 Z"
                    />
                </g>

                {/* Middle floating shape */}
                <g className="hero-cloud hero-cloud-middle">
                    <path
                        filter="url(#blur)"
                        fill="url(#pinkWave)"
                        d="M250 360 C540 250 780 260 1000 360 C1200 450 1400 420 1650 300 L1650 560 C1320 620 1040 570 780 500 C520 430 250 460 0 560 L0 430 C80 390 150 380 250 360 Z"
                    />
                </g>

                {/* Gold accent */}
                <g className="hero-sun">
                    <path
                        filter="url(#blur)"
                        fill="url(#goldWave)"
                        d="M520 610 C780 560 1000 570 1200 640 C1340 690 1490 680 1650 620 L1650 760 C1380 800 1140 780 880 740 C660 705 420 715 180 790 L0 790 C180 690 340 650 520 610 Z"
                    />
                </g>
            </svg>

            {/* Fade into About section */}
            <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-b from-transparent via-[#fdfaf6]/70 to-gray-100" />
        </div>
    );
}