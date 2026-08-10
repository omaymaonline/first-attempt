import HeroSection from "@/components/home/hero/HeroSection";
import AboutPreview from "@/components/home/AboutPreview";
import ServicesPreview from "@/components/home/ServicesPreview";
import FeaturedWriting from "@/components/home/FeaturedWriting";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>

      <HeroSection />

      <AboutPreview />

      <ServicesPreview />

      <FeaturedWriting />

      <CTASection />

    </>
  );
}