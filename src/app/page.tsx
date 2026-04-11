import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Process from "@/components/Process";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import BgTester from "@/components/BgTester";

export default function Home() {
  return (
    <SmoothScroll>
      <BgTester />
      <div className="relative z-10">
        <Navigation />
        <main>
          <Hero />
          <Services />
          <Work />
          <Process />
          <FAQ />
          <Testimonials />
          <CallToAction />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
