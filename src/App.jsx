import React, { useEffect, useMemo, useRef, useState } from "react";
import Lenis from "lenis";
import LocomotiveScroll from "locomotive-scroll";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Sections from "./components/Sections";
import StickyFooter from "./components/StickyFooter";

gsap.registerPlugin(ScrollTrigger);

function GlowOrb({ className }) {
  return (
    <div
      className={[
        "pointer-events-none absolute blur-3xl opacity-60",
        className,
      ].join(" ")}
      aria-hidden="true"
    />
  );
}

export default function App() {
  const rootRef = useRef(null);
  const scrollWrapRef = useRef(null);
  const locoRef = useRef(null);
  const lenisRef = useRef(null);

  const sectionIds = useMemo(
    () => ["top", "services", "work", "process", "pricing", "contact"],
    []
  );
  const [active, setActive] = useState("top");

  // Lenis + ScrollTrigger sync
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      syncTouch: true,
      wheelMultiplier: 0.9,
    });
    lenisRef.current = lenis;

    const raf = (time) => {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Locomotive (non-smooth mode to avoid fighting Lenis; still useful for data-scroll hooks/parallax)
  useEffect(() => {
    if (!scrollWrapRef.current) return;

    const loco = new LocomotiveScroll({
      el: scrollWrapRef.current,
      smooth: false,
      smartphone: { smooth: false },
      tablet: { smooth: false },
    });

    locoRef.current = loco;

    const onResize = () => loco.update();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      loco.destroy();
      locoRef.current = null;
    };
  }, []);

  const jumpTo = (id) => {
    const el = document.getElementById(id === "top" ? "top" : id);
    if (!el || !lenisRef.current) return;

    lenisRef.current.scrollTo(el, {
      offset: -90,
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });
  };

  // Active section tracking
  useEffect(() => {
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id === "top" ? "top" : id);
      if (!el) return;

      const ob = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.45 }
      );

      ob.observe(el);
      observers.push(ob);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sectionIds]);

  // GSAP animations: hero sweep + typography + section curtains
  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        // hero sweep
        gsap.fromTo(
          ".hero-sweep",
          { xPercent: -120 },
          {
            xPercent: 120,
            duration: 2.2,
            ease: "power2.inOut",
            repeat: -1,
            repeatDelay: 0.9,
          }
        );

        // word-level typography animation
        const lines = gsap.utils.toArray(".typo-line");
        lines.forEach((line) => {
          const words = line.querySelectorAll("span > span");
          gsap.fromTo(
            words,
            { y: 28, opacity: 0, rotateX: 55, skewY: 6, filter: "blur(6px)" },
            {
              y: 0,
              opacity: 1,
              rotateX: 0,
              skewY: 0,
              filter: "blur(0px)",
              ease: "power3.out",
              stagger: 0.03,
              scrollTrigger: {
                trigger: line,
                start: "top 82%",
                end: "bottom 55%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });

        // unique section curtain transition
        const sections = gsap.utils.toArray("[data-section]");
        sections.forEach((sec) => {
          const curtain = sec.querySelector(".curtain");
          const inner = sec.querySelector(".inner");
          if (!curtain || !inner) return;

          gsap.fromTo(
            curtain,
            { scaleX: 1, transformOrigin: "left" },
            {
              scaleX: 0,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: sec,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );

          gsap.fromTo(
            inner,
            { y: 26, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: sec,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });

        // pricing accent pulse
        gsap.fromTo(
          ".price-accent",
          { opacity: 0.35 },
          {
            opacity: 0.75,
            duration: 1.2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            scrollTrigger: { trigger: "#pricing", start: "top 70%" },
          }
        );
      }, rootRef);

      return () => ctx.revert();
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className="min-h-screen bg-[#070A12] text-white">
      {/* background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <GlowOrb className="left-[-140px] top-[-160px] h-[520px] w-[520px] bg-white/10" />
        <GlowOrb className="right-[-180px] top-[120px] h-[520px] w-[520px] bg-white/10" />
        <div className="absolute inset-0 bg-[radial-gradient(1100px_600px_at_50%_-10%,rgba(255,255,255,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.06),transparent_22%,transparent_80%,rgba(255,255,255,0.05))]" />
        <div className="absolute inset-0 opacity-[0.18] [background-image:radial-gradient(rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:18px_18px]" />
      </div>

      <Navbar active={active} onJump={jumpTo} />
      <StickyFooter onJump={jumpTo} />

      <main ref={scrollWrapRef} className="relative pb-28">
        <Hero onJump={jumpTo} />
        <Sections onJump={jumpTo} />

        {/* spacer so sticky footer never covers content */}
        <div className="h-24" />
      </main>
    </div>
  );
}
