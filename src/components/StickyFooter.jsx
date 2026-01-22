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
  onContactOpen,
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
          {children || (
            <FooterContent
              backgroundColor={backgroundColor}
              onContactOpen={onContactOpen}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// Default Footer Content Component

function FooterContent({ backgroundColor = "#2a1a4a", onContactOpen }) {
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
        <FooterNav onContactOpen={onContactOpen} />
        <FooterHero />
      </div>
    </motion.div>
  );
}

function FooterNav({ onContactOpen }) {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const quickLinks = [
    { label: "Home", action: () => scrollToSection("home") },
    { label: "Services", action: () => scrollToSection("services") },
    { label: "About Us", action: () => scrollToSection("about") },
    { label: "Connect With Us", action: onContactOpen },
  ];

  return (
    <motion.div
      className="footer-animate flex flex-col gap-8 md:flex-row md:justify-between md:gap-20"
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, staggerChildren: 0.1 }}
    >
      {/* Contact Info */}
      <div className="flex flex-col gap-6">
        <h3 className="text-sm uppercase tracking-wider text-white/50">
          Get in Touch
        </h3>

        {/* Phone */}
        <motion.a
          href="tel:+971544999960"
          className="group flex items-center gap-3 text-white transition-colors hover:text-[#4900f4]"
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-colors group-hover:bg-[#4900f4]/20">
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </div>
          <span className="text-lg">+971 54 499 9960</span>
        </motion.a>

        {/* Email */}
        <motion.a
          href="mailto:info@kay-uae.com"
          className="group flex items-center gap-3 text-white transition-colors hover:text-[#4900f4]"
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-colors group-hover:bg-[#4900f4]/20">
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <span className="text-lg">info@kay-uae.com</span>
        </motion.a>

        {/* Location */}
        <motion.div
          className="group flex items-center gap-3 text-white"
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5">
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <span className="text-lg">Abu Dhabi - Al Ain</span>
        </motion.div>
      </div>

      {/* Quick Links */}
      <div className="flex flex-col gap-2">
        <h3 className="mb-2 text-sm uppercase tracking-wider text-white/50">
          Quick Links
        </h3>
        {quickLinks.map((link) => (
          <motion.button
            key={link.label}
            onClick={link.action}
            className="cursor-pointer text-left text-white transition-colors hover:text-[#4900f4]"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {link.label}
          </motion.button>
        ))}
      </div>
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
        Kay Agency
      </motion.h1>
      <p className="text-white/60">©copyright</p>
    </motion.div>
  );
}
