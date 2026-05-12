import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { ProductCarousel } from "@/components/ProductCarousel";
import { VideoTestimonials } from "@/components/VideoTestimonials";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProductCarousel />
      <FeaturesSection />
      <VideoTestimonials />
    </main>
  );
}
