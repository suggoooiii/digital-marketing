import React, { useEffect, useMemo, useRef } from "react";
import {
  motion,
  useReducedMotion as useFramerReducedMotion,
} from "framer-motion";
import Lenis from "lenis";
import LocomotiveScroll from "locomotive-scroll";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function usePrefersReducedMotion() {
  const framerReduced = useFramerReducedMotion();
  const prefersReduced = useMemo(() => Boolean(framerReduced), [framerReduced]);
  return prefersReduced;
}

/**
 * Smooth scroll: Lenis drives scroll. GSAP ticker is synced.
 * LocomotiveScroll is initialized in non-smooth mode (optional) to support data-scroll parallax hooks
 * without stealing scroll from Lenis.
 */
function useSmoothScroll({ containerRef, disabled }) {
  const lenisRef = useRef(null);
  const locoRef = useRef(null);

  useEffect(() => {
    if (disabled) return;

    const container = containerRef.current;
    if (!container) return;

    // Lenis as the smooth scroll driver
    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
      lerp: 0.085,
    });

    lenisRef.current = lenis;

    // GSAP ticker integration
    const raf = (time) => {
      // time from gsap ticker is in seconds; Lenis expects ms
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Keep ScrollTrigger in sync with Lenis
    lenis.on("scroll", ScrollTrigger.update);

    // (Optional) LocomotiveScroll for data-scroll hooks (NOT smooth)
    // This keeps Lenis as the driver while still letting you use loco-style attributes if desired.
    const loco = new LocomotiveScroll({
      el: container,
      smooth: false, // important: Lenis drives smooth scrolling
      multiplier: 1,
      smartphone: { smooth: false },
      tablet: { smooth: false },
    });
    locoRef.current = loco;

    // On refresh/update, make sure both stay correct
    const onRefresh = () => {
      loco.update();
    };
    ScrollTrigger.addEventListener("refresh", onRefresh);
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      gsap.ticker.remove(raf);
      loco.destroy();
      lenis.destroy();
      locoRef.current = null;
      lenisRef.current = null;
    };
  }, [containerRef, disabled]);

  return { lenisRef, locoRef };
}

export default function App() {
  const containerRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useSmoothScroll({ containerRef, disabled: prefersReducedMotion });

  return (
    <div className="min-h-screen bg-[#07020f] text-white">
      {/* Subtle background accents */}
      <BackgroundFX />

      <div
        ref={containerRef}
        // LocomotiveScroll expects the scroll container element. Lenis uses native scroll,
        // so we keep body scrolling but still use this as the "effects container".
        className="relative"
      >
        <Navbar reduced={prefersReducedMotion} />
        <main className="relative">
          <Hero reduced={prefersReducedMotion} />
          <Sections reduced={prefersReducedMotion} />
          <StickyFooter reduced={prefersReducedMotion} />
        </main>
      </div>
    </div>
  );
}

/* ------------------------------ Background FX ------------------------------ */

function BackgroundFX() {
  return (
    <>
      {/* Glow blobs */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-[-140px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-purple-600/25 blur-3xl" />
        <div className="absolute right-[-120px] top-[20%] h-[420px] w-[420px] rounded-full bg-fuchsia-500/15 blur-3xl" />
        <div className="absolute left-[-120px] top-[55%] h-[520px] w-[520px] rounded-full bg-indigo-500/12 blur-3xl" />
        {/* Grain */}
        <div className="absolute inset-0 opacity-[0.08] [background-image:url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22120%22 height=%22120%22 filter=%22url(%23n)%22 opacity=%220.55%22/%3E%3C/svg%3E')] mix-blend-overlay" />
      </div>
    </>
  );
}

/* --------------------------------- Navbar -------------------------------- */

function Navbar({ reduced }) {
  const navRef = useRef(null);

  useGSAP(
    () => {
      if (reduced) return;
      gsap.fromTo(
        navRef.current,
        { y: -18, opacity: 0, filter: "blur(6px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.7,
          ease: "power2.out",
        }
      );
    },
    { dependencies: [reduced] }
  );

  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 pt-4">
        <div
          ref={navRef}
          className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_10px_30px_rgba(0,0,0,0.35)]"
        >
          <a href="#top" className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/10">
              <span className="h-3.5 w-3.5 rounded-full bg-purple-400/90 shadow-[0_0_24px_rgba(168,85,247,0.75)]" />
            </span>
            <span className="font-semibold tracking-tight text-white/90">
              NoirScale
            </span>
          </a>

          <nav className="hidden items-center gap-6 md:flex">
            {["Services", "Proof", "Process", "Testimonials"].map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                className="text-sm text-white/70 hover:text-white/95 transition"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#process"
              className="hidden rounded-xl px-3 py-2 text-sm text-white/70 hover:text-white/95 transition md:inline-flex"
            >
              Let’s talk
            </a>

            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#proof"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-gradient-to-b from-white/12 to-white/5 px-4 py-2 text-sm font-medium text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl hover:border-white/20"
            >
              Get a growth plan
            </motion.a>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ---------------------------------- Hero --------------------------------- */

function Hero({ reduced }) {
  const heroRef = useRef(null);

  useGSAP(
    () => {
      if (reduced) return;

      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".hero-fade",
          { y: 18, opacity: 0, filter: "blur(8px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.08,
          }
        );

        // Subtle parallax glow
        gsap.to(".hero-glow", {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      }, heroRef);

      return () => ctx.revert();
    },
    { dependencies: [reduced] }
  );

  return (
    <section
      id="top"
      ref={heroRef}
      className="mx-auto max-w-6xl px-4 pt-16 md:pt-20"
    >
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 md:p-12 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_30px_80px_rgba(0,0,0,0.55)]">
        <div
          aria-hidden
          className="hero-glow pointer-events-none absolute inset-0"
        >
          <div className="absolute -top-24 left-1/2 h-[360px] w-[760px] -translate-x-1/2 rounded-full bg-purple-500/20 blur-3xl" />
          <div className="absolute bottom-[-160px] right-[-120px] h-[380px] w-[380px] rounded-full bg-fuchsia-500/14 blur-3xl" />
        </div>

        <div className="relative">
          <p className="hero-fade inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-400 shadow-[0_0_18px_rgba(168,85,247,0.8)]" />
            Premium digital growth for modern brands
          </p>

          <h1 className="hero-fade mt-5 text-balance text-4xl font-semibold tracking-tight md:text-6xl">
            Dark. Minimal.{" "}
            <span className="bg-gradient-to-r from-purple-200 via-purple-400 to-fuchsia-300 bg-clip-text text-transparent">
              Relentlessly effective
            </span>
            .
          </h1>

          <p className="hero-fade mt-4 max-w-2xl text-pretty text-base text-white/70 md:text-lg">
            We design conversion-first experiences and run performance campaigns
            that feel premium — fast, measurable, and quietly confident.
          </p>

          <div className="hero-fade mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#services"
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-b from-purple-400/30 to-purple-700/20 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/10 shadow-[0_20px_60px_rgba(168,85,247,0.25)] backdrop-blur-xl hover:ring-white/20"
            >
              Explore services
            </motion.a>

            <motion.a
              whileHover={{ x: 2 }}
              whileTap={{ x: 0 }}
              href="#process"
              className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white/80 backdrop-blur-xl hover:border-white/20 hover:text-white"
            >
              See how we work →
            </motion.a>
          </div>

          <div className="hero-fade mt-10 grid gap-3 md:grid-cols-3">
            <MiniCard title="Strategy" desc="Positioning, messaging, offers." />
            <MiniCard
              title="Creative"
              desc="Premium visuals + landing systems."
            />
            <MiniCard
              title="Performance"
              desc="Paid social + search, optimised weekly."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniCard({ title, desc }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl">
      <div className="text-sm font-semibold text-white/90">{title}</div>
      <div className="mt-1 text-sm text-white/65">{desc}</div>
    </div>
  );
}

/* -------------------------------- Sections -------------------------------- */

function Sections({ reduced }) {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-10 md:pt-14">
      <Services reduced={reduced} />
      <Proof reduced={reduced} />
      <Process reduced={reduced} />
      <Testimonials reduced={reduced} />
      {/* Spacer so pinned footer has room to animate */}
      <div className="h-[40vh] md:h-[55vh]" aria-hidden />
    </div>
  );
}

/* -------- Services (includes premium clip-path reveal on scroll) -------- */

function Services({ reduced }) {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      if (reduced) return;

      const ctx = gsap.context(() => {
        // Section entry
        gsap.fromTo(
          ".svc-in",
          { y: 20, opacity: 0, filter: "blur(8px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 78%",
            },
          }
        );

        // Premium reveal: clip-path expands (for headline)
        gsap.fromTo(
          ".clip-reveal",
          { clipPath: "inset(0 0 100% 0 round 16px)" },
          {
            clipPath: "inset(0 0 0% 0 round 16px)",
            ease: "power2.out",
            duration: 1.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
          }
        );
      }, sectionRef);

      return () => ctx.revert();
    },
    { dependencies: [reduced] }
  );

  return (
    <section id="services" ref={sectionRef} className="mt-14 md:mt-16">
      <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-end">
        <div>
          <div className="clip-reveal inline-block">
            <h2 className="svc-in text-2xl font-semibold tracking-tight md:text-3xl">
              Services that feel premium — and perform
            </h2>
          </div>
          <p className="svc-in mt-3 max-w-xl text-sm text-white/70 md:text-base">
            Minimal pages, sharp messaging, and campaign systems built to
            convert. No clutter — just signal.
          </p>
        </div>

        <div className="svc-in rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
          <div className="text-sm font-semibold text-white/90">
            Typical outcomes
          </div>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li className="flex items-center justify-between">
              <span>Landing conversion lift</span>
              <span className="text-white/90">+18–45%</span>
            </li>
            <li className="flex items-center justify-between">
              <span>CPA reduction</span>
              <span className="text-white/90">-12–28%</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Speed to launch</span>
              <span className="text-white/90">7–14 days</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <ServiceCard
          title="Brand + Messaging"
          desc="Positioning, offer clarity, landing narrative."
        />
        <ServiceCard
          title="Design Systems"
          desc="Glassy UI, responsive components, conversion UX."
        />
        <ServiceCard
          title="Paid Growth"
          desc="Meta, Google, creative testing, weekly optimisation."
        />
      </div>
    </section>
  );
}

function ServiceCard({ title, desc }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.04)] hover:border-white/20"
    >
      <div className="text-sm font-semibold text-white/90">{title}</div>
      <div className="mt-2 text-sm text-white/65">{desc}</div>
    </motion.div>
  );
}

/* ---------------------------------- Proof --------------------------------- */

function Proof({ reduced }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (reduced) return;

      const els = gsap.utils.toArray(".proof-pop");
      gsap.fromTo(
        els,
        { y: 14, opacity: 0, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: { trigger: ref.current, start: "top 78%" },
        }
      );
    },
    { dependencies: [reduced] }
  );

  return (
    <section id="proof" ref={ref} className="mt-14 md:mt-16">
      <div className="flex items-end justify-between gap-6">
        <div>
          <h2 className="proof-pop text-2xl font-semibold tracking-tight md:text-3xl">
            Proof, not promises
          </h2>
          <p className="proof-pop mt-3 max-w-xl text-sm text-white/70 md:text-base">
            We focus on measurable lift: conversion, retention, and efficient
            acquisition.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
        <Stat k="12+" v="Industries shipped" />
        <Stat k="2.1x" v="Median ROAS lift" />
        <Stat k="8–14d" v="Launch window" />
        <Stat k="99.9%" v="Uptime-ready builds" />
      </div>
    </section>
  );
}

function Stat({ k, v }) {
  return (
    <div className="proof-pop rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
      <div className="text-2xl font-semibold tracking-tight text-white">
        {k}
      </div>
      <div className="mt-1 text-sm text-white/65">{v}</div>
    </div>
  );
}

/* --------------------------------- Process -------------------------------- */

function Process({ reduced }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (reduced) return;
      gsap.fromTo(
        ".step",
        { y: 18, opacity: 0, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ref.current, start: "top 78%" },
        }
      );
    },
    { dependencies: [reduced] }
  );

  return (
    <section id="process" ref={ref} className="mt-14 md:mt-16">
      <h2 className="step text-2xl font-semibold tracking-tight md:text-3xl">
        A calm process that ships
      </h2>
      <p className="step mt-3 max-w-xl text-sm text-white/70 md:text-base">
        Short cycles. Weekly optimisation. Everything tracked.
      </p>

      <div className="mt-6 grid gap-3 md:grid-cols-4">
        <Step n="01" t="Audit" d="Offer, funnel, analytics, gaps." />
        <Step n="02" t="Build" d="Landing + creative system." />
        <Step n="03" t="Launch" d="Campaigns, testing matrix." />
        <Step n="04" t="Scale" d="Iterate, optimise, expand." />
      </div>
    </section>
  );
}

function Step({ n, t, d }) {
  return (
    <div className="step rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
      <div className="text-xs font-semibold text-white/55">{n}</div>
      <div className="mt-2 text-sm font-semibold text-white/90">{t}</div>
      <div className="mt-2 text-sm text-white/65">{d}</div>
    </div>
  );
}

/* ------------------------------- Testimonials ------------------------------ */

function Testimonials({ reduced }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (reduced) return;
      gsap.fromTo(
        ".tst",
        { y: 18, opacity: 0, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ref.current, start: "top 78%" },
        }
      );
    },
    { dependencies: [reduced] }
  );

  return (
    <section id="testimonials" ref={ref} className="mt-14 md:mt-16">
      <h2 className="tst text-2xl font-semibold tracking-tight md:text-3xl">
        Clients call it “quietly elite”
      </h2>
      <p className="tst mt-3 max-w-xl text-sm text-white/70 md:text-base">
        Minimal design, strong copy, and performance that shows up in
        dashboards.
      </p>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <Quote
          who="Growth Lead"
          company="SaaS"
          text="The landing system feels premium and converts. Weekly updates were fast, calm, and data-driven."
        />
        <Quote
          who="Founder"
          company="Ecom"
          text="They simplified our message and the numbers moved immediately. Best ‘less is more’ team we’ve worked with."
        />
        <Quote
          who="Marketing Manager"
          company="B2B"
          text="Clean creative, strong testing cadence, and better CPL within two weeks. Zero fluff."
        />
      </div>
    </section>
  );
}

function Quote({ who, company, text }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="tst rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl hover:border-white/20"
    >
      <p className="text-sm leading-relaxed text-white/75">“{text}”</p>
      <div className="mt-4 text-sm font-semibold text-white/90">
        {who} <span className="text-white/45">· {company}</span>
      </div>
    </motion.div>
  );
}

/* ------------------------------ Sticky Footer ------------------------------ */

function StickyFooter({ reduced }) {
  const wrapRef = useRef(null);
  const footerRef = useRef(null);

  useGSAP(
    () => {
      if (reduced) return;

      const wrap = wrapRef.current;
      const footer = footerRef.current;
      if (!wrap || !footer) return;

      const ctx = gsap.context(() => {
        // Pin the footer near the bottom and drive typography transitions via scroll
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrap,
            start: "top bottom",
            end: "bottom bottom+=220",
            scrub: true,
            pin: footer,
            pinSpacing: true,
          },
        });

        tl.fromTo(
          ".ft-reveal",
          {
            clipPath: "inset(0 0 100% 0 round 24px)",
            opacity: 0.6,
            filter: "blur(8px)",
          },
          {
            clipPath: "inset(0 0 0% 0 round 24px)",
            opacity: 1,
            filter: "blur(0px)",
            ease: "none",
          }
        ).fromTo(
          ".ft-shift",
          { y: 10, letterSpacing: "0.06em" },
          { y: 0, letterSpacing: "0.01em", ease: "none" },
          0
        );
      }, wrapRef);

      return () => ctx.revert();
    },
    { dependencies: [reduced] }
  );

  return (
    <section ref={wrapRef} className="relative">
      <footer
        ref={footerRef}
        className="mx-auto mb-6 max-w-6xl px-4"
        aria-label="Footer"
      >
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_30px_90px_rgba(0,0,0,0.65)]">
          {/* Premium glow underlay */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -left-10 bottom-[-120px] h-[340px] w-[340px] rounded-full bg-purple-500/18 blur-3xl" />
            <div className="absolute right-[-80px] top-[-120px] h-[320px] w-[320px] rounded-full bg-fuchsia-500/12 blur-3xl" />
          </div>

          <div className="relative">
            <div className="ft-reveal">
              <div className="ft-shift text-balance text-2xl font-semibold tracking-tight md:text-3xl">
                Ready to make your brand feel premium — and convert like it?
              </div>
              <p className="mt-3 max-w-2xl text-sm text-white/70 md:text-base">
                We’ll send a concise growth plan: quick wins, funnel fixes, and
                a launch path. No slides. No noise.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-white/55">
                © {new Date().getFullYear()} NoirScale. Minimal by design.
              </div>

              <div className="flex items-center gap-2">
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="#top"
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/80 backdrop-blur-xl hover:border-white/20 hover:text-white"
                >
                  Back to top
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="#services"
                  className="rounded-2xl bg-gradient-to-b from-purple-400/30 to-purple-700/20 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/10 shadow-[0_18px_60px_rgba(168,85,247,0.18)] hover:ring-white/20"
                >
                  Get started
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}
