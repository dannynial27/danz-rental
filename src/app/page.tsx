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

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <Navigation />
      <main className="flex-grow">
        <Hero />
        <Features />
        <Fleet />
        <Process />
        <Testimonials />
        <Statistics />
        <FAQ />
        <CtaBanner />
      </main>
      <Footer />
      <FloatingActionButtons />
      <RentalAssistant />
    </>
  );
}
