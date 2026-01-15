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
import StickyFooter from "@components/StickyFooter";
import LocomotiveScroll from "locomotive-scroll";
import LogoReveal from "@components/LogoReveal";

export default function App() {
  const scrollRef = useRef(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();

    return () => {
      locomotiveScroll.destroy();
    };
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
    <main ref={scrollRef}>
      <Navbar onContactOpen={() => setIsContactOpen(true)} />
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
      <FloatingContactButton onClick={() => setIsContactOpen(true)} />
      {/* <LogoReveal /> */}
      <Intro />
      <Services />
      <Section />
      <Clients />
      <StickyFooter height={800} />
    </main>
  );
}
