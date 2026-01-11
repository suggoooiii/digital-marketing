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

  const stickySections = [
    {
      id: 1,
      offset: 0,
      bgColor: "bg-[#C3ABFF]",
      imgSrc: "src/assets/img/cc.jpg",
      title: "Content Creation",
      titleColor: "black",
      p1: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      p2: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      children: "The algorithm's workings are shrouded in complexity...",
    },
    {
      id: 2,
      offset: 151.583,
      bgColor: "bg-[#FED35B]",
      imgSrc: "src/assets/img/seo.jpg",
      title: "SEO",
      titleColor: "black",
      p1: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      p2: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      children: "The digital gospel etched into the very code...",
    },
    {
      id: 3,
      offset: 303.166,
      bgColor: "bg-[#FFFFFF]",
      imgSrc: "src/assets/img/adv.jpg",
      title: "Advertisement",
      titleColor: "black",
      p1: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      p2: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      children: "The elusive entities, lacking human form...",
    },
    {
      id: 4,
      offset: 454.749,
      bgColor: "bg-[#FBC1D4]",
      imgSrc: "src/assets/img/brandstrategy.jpg",
      title: "Brand Strategy",
      titleColor: "black",
      p1: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      p2: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      children:
        "This overlooked realm, a consequence of algorithmic judgments...",
    },
    {
      id: 5,
      offset: 606.332,
      bgColor: "bg-[#1E1E1E]",
      imgSrc: "src/assets/img/visualidentity.jpg",
      title: "Visual Identity",
      titleColor: "white",
      p1: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      p2: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      children:
        "This overlooked realm, a consequence of algorithmic judgments...",
    },
  ];

  return (
    <main>
      <Intro />
      <Services />
      <Section />
      <div className="relative w-full">
        {stickySections.map((section) => (
          <StickySection
            key={section.id}
            offset={section.offset}
            bgColor={section.bgColor}
            imgSrc={section.imgSrc}
            title={section.title}
            titleColor={section.titleColor}
            p1={section.p1}
            p2={section.p2}
          >
            {section.children}
          </StickySection>
        ))}
      </div>
      {/* Outro Section */}
      <div className="h-screen flex items-center justify-center text-white">
        <p className="text-2xl">End of the journey.</p>
      </div>
    </main>
  );
}
