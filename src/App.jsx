import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import Intro from "@components/Intro";
import Services from "@components/Services";
import Section from "@components/Sections";
import DettedGlowBackground from "@components/DettedGlowBackground";
import { DottedGlowBackground } from "@components/ui/dotted-glow-background";
import StickySection from "@components/effects/Stickysection";

export default function App() {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <main>
      <Intro />
      <Services />
      <Section />
      <div className="h-screen"></div>
      <StickySection p1="Branding Strategy" p2="" bgColor="bg-neutral-900" />
      <StickySection p1="Branding Strategy" p2="" bgColor="bg-neutral-700" />
      <StickySection p1="Branding Strategy" p2="" bgColor="bg-neutral-500" />
      <StickySection p1="Branding Strategy" p2="" bgColor="bg-neutral-300" />
    </main>
  );
}
