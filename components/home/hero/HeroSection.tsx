import Container from "@/components/layout/Container";

import HeroArtwork from "./HeroArtwork";
import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";

export default function HeroSection() {
  return (
    <section className=" relative overflow-hidden min-h-[calc(100vh-73px)]">
      <HeroBackground />

      <Container className="h-full">

        <div className="grid min-h-[calc(100vh-73px)] items-center gap-16 py-12  sm:grid-cols-2">
          <HeroContent />
          <HeroArtwork />
        </div>

      </Container>
    </section>
  );
}