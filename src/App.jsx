import React, { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { motion, useScroll, useTransform } from "motion/react";
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
  const heroRef = useRef(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Scroll-driven animations for hero section
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Video transforms as you scroll
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.5, 0]);
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, 0.5, 1],
  );

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();

    return () => {
      locomotiveScroll.destroy();
    };
  }, []);

  // Listen for custom event to open contact form (from Services "Get Started" button)
  useEffect(() => {
    const handleOpenContact = () => setIsContactOpen(true);
    window.addEventListener("openContactForm", handleOpenContact);
    return () =>
      window.removeEventListener("openContactForm", handleOpenContact);
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
      <div
        id="home"
        ref={heroRef}
        className="relative h-screen w-full overflow-hidden"
      >
        {/* Video Background with scroll animations */}
        <motion.div
          className="absolute inset-0"
          style={{
            scale: videoScale,
            y: videoY,
            opacity: videoOpacity,
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          >
            <source src={liquidic} type="video/mp4" />
          </video>
          {/* Dark Overlay on video only */}
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>
        {/* Hero Text with parallax */}
        <motion.div
          className="relative z-10 flex h-full flex-col items-center justify-center gap-6"
          style={{ y: textY, opacity: textOpacity }}
        >
          {/* Animated tagline above */}
          <motion.p
            className="text-xs font-medium uppercase tracking-[0.15em] text-white/70 md:text-base md:tracking-[0.3em]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Digital Marketing Excellence
          </motion.p>

          {/* Main title with staggered letter animation */}
          <motion.h1
            className="relative text-center font-['Gambarino'] text-7xl font-normal tracking-tight text-white mix-blend-difference md:text-8xl lg:text-9xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.span
              className="inline-block"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Kay
            </motion.span>
            <span className="mx-2 md:mx-4" />
            <motion.span
              className="inline-block"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Agency
            </motion.span>
          </motion.h1>

          {/* Subtitle below */}
          <motion.div
            className="mt-4 max-w-md text-center md:max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <p className="text-xl text-white/80 md:text-2xl lg:text-3xl">
              We are digital partners
            </p>
            <p className="text-xl text-white/80 md:text-2xl lg:text-3xl">
              for{" "}
              <span className="font-['Libre_Baskerville'] italic text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] to-[#f472b6]">
                modern brands
              </span>
            </p>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <motion.div
              className="flex flex-col items-center gap-2 text-white/50"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-xs uppercase tracking-widest">Scroll</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      {/* <Intro /> */}
      <div id="services">
        <Services />
      </div>
      <div id="about">
        <Section />
      </div>
      <Clients />
      <StickyFooter
        height={700}
        backgroundColor="#681881"
        onContactOpen={() => setIsContactOpen(true)}
      />
    </main>
  );
}
