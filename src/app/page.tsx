import { Navigation } from "@/components/sections/Navigation";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { Fleet } from "@/components/sections/Fleet";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { Statistics } from "@/components/sections/Statistics";
import { FAQ } from "@/components/sections/FAQ";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Footer } from "@/components/sections/Footer";
import { LoadingScreen } from "@/components/sections/LoadingScreen";
import { ScrollProgress } from "@/components/sections/ScrollProgress";
import { FloatingActionButtons } from "@/components/sections/FloatingActionButtons";
import { RentalAssistant } from "@/components/sections/RentalAssistant";
import { QuickBookingWidget } from "@/components/sections/QuickBookingWidget";
import { RentalRequirements } from "@/components/sections/RentalRequirements";
import { PromotionBanner } from "@/components/sections/PromotionBanner";
import { GoogleMapsSection } from "@/components/sections/GoogleMapsSection";
import { AIRecommendation } from "@/components/sections/AIRecommendation";
import { TrustIndicators } from "@/components/sections/TrustIndicators";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <PromotionBanner />
      <Navigation />
      <main className="flex-grow">
        <Hero />
        <TrustIndicators />
        <Features />
        <AIRecommendation />
        <Fleet />
        <Process />
        <RentalRequirements />
        <GoogleMapsSection />
        <Testimonials />
        <Statistics />
        <FAQ />
        <CtaBanner />
      </main>
      <Footer />
      <FloatingActionButtons />
      <RentalAssistant />
      <QuickBookingWidget />
    </>
  );
}
