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
// import Sparkles from "@components/effects/Sparkles";
import StickyFooter from "@components/StickyFooter";
import LocomotiveScroll from "locomotive-scroll";
import liquidic from "/src/assets/videos/purple_liquid.mp4";

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
      <div id="home" className="relative h-screen w-full overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={liquidic} type="video/mp4" />
        </video>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/20" />
        {/* Hero Text */}
        <div className="relative z-10 flex h-full items-center justify-center">
          <h1 className="text-center font-montserrat text-5xl font-bold text-white md:text-7xl lg:text-9xl">
            Kay Agency
          </h1>
        </div>
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
