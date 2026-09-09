import HeroSection from "@/components/home/HeroSection";
import LatestCollection from "@/components/home/LatestCollection";
import FrontendLayout from "@/components/layouts/FrontendLayout";

export default function Home() {
  return (
    <FrontendLayout>
      <HeroSection />
      <LatestCollection />
    </FrontendLayout>
  );
}
