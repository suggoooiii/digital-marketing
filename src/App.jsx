import React, { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import Intro from "@components/Intro";
import Services from "@components/Services";
import Section from "@components/Sections";
import Clients from "@components/Clients";
import Navbar from "@components/Navbar";
import ContactModal from "@components/ContactModal";
import FloatingContactButton from "@components/FloatingContactButton";
import { DottedGlowBackground } from "@components/ui/dotted-glow-background";
import Sparkles from "@components/effects/Sparkles";
import StickyFooter from "@components/StickyFooter";
import LocomotiveScroll from "locomotive-scroll";

export default function App() {
  const scrollRef = useRef(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();

    return () => {
      locomotiveScroll.destroy();
    };
  }, []);

  return (
    <main ref={scrollRef}>
      <Navbar onContactOpen={() => setIsContactOpen(true)} />
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
      <FloatingContactButton
        phoneNumber="+971544999960"
        whatsappNumber="+971544999960"
      />
      <div id="home">
        <Sparkles
          text="Kay Agency"
          textSize="text-5xl md:text-7xl lg:text-9xl"
          particleDensity={700}
          particleColor="#00bcff"
        />
      </div>
      {/* <Intro /> */}
      <div id="services">
        <Services />
      </div>
      <div id="about">
        <Section />
      </div>
      <Clients />
      <StickyFooter height={600} onContactOpen={() => setIsContactOpen(true)} />
    </main>
  );
}
