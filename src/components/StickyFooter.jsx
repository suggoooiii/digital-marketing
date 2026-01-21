import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { DottedGlowBackground } from "@components/ui/dotted-glow-background";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function StickyFooter({
  height = 800,
  backgroundColor = "#2a1a4a",
  children,
}) {
  const containerRef = useRef(null);
  const footerRef = useRef(null);
  const locomotiveScrollRef = useRef(null);

  // Initialize Locomotive Scroll
  useEffect(() => {
    locomotiveScrollRef.current = new LocomotiveScroll();

    return () => {
      locomotiveScrollRef.current?.destroy();
    };
  }, []);

  // GSAP animations using @gsap/react hook
  useGSAP(
    () => {
      if (!footerRef.current) return;

      // Animate footer content on scroll
      gsap.fromTo(
        footerRef.current.querySelectorAll(".footer-animate"),
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "top center",
            scrub: 1,
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{
        height: `${height}px`,
        clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)",
      }}
    >
      <div
        className="relative"
        style={{
          height: `calc(100vh + ${height}px)`,
          top: "-100vh",
        }}
      >
        <div
          ref={footerRef}
          className="sticky w-full"
          style={{
            height: `${height}px`,
            top: `calc(100vh - ${height}px)`,
          }}
        >
          {children || <FooterContent backgroundColor={backgroundColor} />}
        </div>
      </div>
    </div>
  );
}

// Default Footer Content Component

function FooterContent({ backgroundColor = "#2a1a4a" }) {
  return (
    <motion.div
      className="relative flex h-full w-full flex-col justify-between overflow-hidden px-12 py-8"
      style={{ backgroundColor }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Dotted Glow Background */}
      <DottedGlowBackground
        className="absolute inset-0 z-0"
        gap={20}
        radius={1.5}
        color="rgba(255,255,255,0.1)"
        glowColor="rgba(73, 0, 244, 0.8)"
        opacity={1}
        speedMin={0.3}
        speedMax={12}
      />
      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between">
        <FooterNav />
        <FooterHero />
      </div>
    </motion.div>
  );
}

function FooterNav() {
  const navSections = [
    {
      title: "About",
      links: ["Home", "Projects", "Our Mission", "Contact Us"],
    },
    {
      title: "Education",
      links: ["News", "Learn", "Certification", "Publications"],
    },
  ];

  return (
    <motion.div
      className="footer-animate flex shrink-0 gap-20"
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, staggerChildren: 0.1 }}
    >
      {navSections.map((section) => (
        <div key={section.title} className="flex flex-col gap-2">
          <h3 className="mb-2 text-sm uppercase text-white/50">
            {section.title}
          </h3>
          {section.links.map((link) => (
            <motion.p
              key={link}
              className="cursor-pointer text-white transition-colors hover:text-white/80"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {link}
            </motion.p>
          ))}
        </div>
      ))}
    </motion.div>
  );
}

function FooterHero() {
  return (
    <motion.div
      className="footer-animate flex items-end justify-between"
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <motion.h1
        className="mt-10 text-[10vw] leading-[0.8] text-white"
        initial={{ scale: 0.9 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Marketing Agency
      </motion.h1>
      <p className="text-white/60">©copyright</p>
    </motion.div>
  );
}
