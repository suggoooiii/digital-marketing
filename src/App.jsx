import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion } from "motion/react";
import Lenis from "lenis";
import LocomotiveScroll from "locomotive-scroll";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const cx = (...classes) => classes.filter(Boolean).join(" ");

function splitToSpans(text) {
  // Split into words, preserving spaces between words
  const words = text.split(" ");
  return words.map((w, i) => (
    <span key={i} className="inline-block overflow-hidden align-bottom">
      <span className="inline-block will-change-transform">
        {w}
        {i < words.length - 1 ? "\u00A0" : ""}
      </span>
    </span>
  ));
}

function GlowOrb({ className }) {
  return (
    <div
      className={cx(
        "pointer-events-none absolute blur-3xl opacity-60",
        className
      )}
      aria-hidden="true"
    />
  );
}

function GlassNav({ active, onJump }) {
  return (
    <div className="fixed left-0 right-0 top-0 z-50 px-4 pt-4">
      <div className="mx-auto max-w-6xl">
        <div
          className={cx(
            "relative overflow-hidden rounded-2xl border border-white/10",
            "bg-white/5 backdrop-blur-xl",
            "shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
          )}
        >
          {/* subtle animated sheen */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute -left-24 top-0 h-full w-48 rotate-12 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>

          <div className="relative flex items-center justify-between px-4 py-3 md:px-6">
            <div className="flex items-center gap-3">
              <div className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-xl border border-white/10 bg-white/5">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                <div className="relative text-sm font-semibold tracking-wide text-white/90">
                  DM
                </div>
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold text-white">
                  NoirGrowth
                </div>
                <div className="text-xs text-white/60">
                  Digital Marketing Studio
                </div>
              </div>
            </div>

            <div className="hidden items-center gap-2 md:flex">
              {[
                ["Services", "services"],
                ["Work", "work"],
                ["Process", "process"],
                ["Pricing", "pricing"],
              ].map(([label, id]) => (
                <button
                  key={id}
                  onClick={() => onJump(id)}
                  className={cx(
                    "rounded-xl px-3 py-2 text-sm",
                    active === id
                      ? "bg-white/10 text-white"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  onJump("contact");
                }}
                className={cx(
                  "group relative overflow-hidden rounded-xl border border-white/10",
                  "bg-white/5 px-4 py-2 text-sm font-medium text-white",
                  "hover:bg-white/10"
                )}
              >
                <span className="relative z-10">Book a Call</span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StickyFooter({ onJump }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-4">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
          {/* moving gradient ribbon */}
          <div className="absolute inset-0 opacity-40">
            <div className="absolute -left-40 top-1/2 h-24 w-[520px] -translate-y-1/2 rotate-6 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          </div>

          <div className="relative flex flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between md:px-6">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-white/70" />
              <p className="text-xs text-white/70 md:text-sm">
                Ready to scale?{" "}
                <span className="text-white">Get a free growth audit</span> in
                48 hours.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onJump("pricing")}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 hover:bg-white/10 md:text-sm"
              >
                View Pricing
              </button>
              <button
                onClick={() => onJump("contact")}
                className="rounded-xl bg-white px-3 py-2 text-xs font-semibold text-black hover:opacity-90 md:text-sm"
              >
                Claim Audit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ title, desc, meta, icon }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className={cx(
        "group relative overflow-hidden rounded-2xl border border-white/10",
        "bg-white/5 p-6 backdrop-blur-md",
        "shadow-[0_18px_50px_rgba(0,0,0,0.35)]"
      )}
    >
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -left-24 top-0 h-full w-48 rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="relative flex items-start gap-4">
        <div className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/90">
          {icon}
        </div>
        <div>
          <div className="text-base font-semibold text-white">{title}</div>
          <div className="mt-1 text-sm text-white/65">{desc}</div>
          {meta ? (
            <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
              {meta}
            </div>
          ) : null}
        </div>
      </div>
    </motion.div>
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

  // Lenis + GSAP ScrollTrigger sync
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

  // Locomotive Scroll initialised in non-smooth mode (for data-scroll hooks/parallax without fighting Lenis)
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

  // Active section observer
  useEffect(() => {
    const observers = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id === "top" ? "top" : id);
      if (!el) return;

      const ob = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { root: null, threshold: 0.45 }
      );

      ob.observe(el);
      observers.push(ob);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sectionIds]);

  // GSAP animations (typography + section transitions)
  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        // Hero: “magnetic” glow sweep
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

        // On-scroll typography animation (split spans inside .typo-line)
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

        // Section reveal: unique “curtain” transition
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

        // Pricing pulse accent when it enters view
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
      {/* Background atmospherics */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <GlowOrb className="left-[-140px] top-[-160px] h-[520px] w-[520px] bg-white/10" />
        <GlowOrb className="right-[-180px] top-[120px] h-[520px] w-[520px] bg-white/10" />
        <div className="absolute inset-0 bg-[radial-gradient(1100px_600px_at_50%_-10%,rgba(255,255,255,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.06),transparent_22%,transparent_80%,rgba(255,255,255,0.05))]" />
        <div className="absolute inset-0 opacity-[0.18] [background-image:radial-gradient(rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:18px_18px]" />
      </div>

      <GlassNav active={active} onJump={jumpTo} />
      <StickyFooter onJump={jumpTo} />

      {/* Scroll container (Lenis drives the scroll; Locomotive attached for hooks) */}
      <main ref={scrollWrapRef} className="relative pb-28">
        {/* HERO */}
        <section id="top" className="relative pt-28 md:pt-32">
          <div className="mx-auto max-w-6xl px-4">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-12">
              {/* sweep highlight */}
              <div className="pointer-events-none absolute inset-0 opacity-30">
                <div className="hero-sweep absolute -left-1/2 top-0 h-full w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
              </div>

              <div className="relative grid gap-10 md:grid-cols-12 md:items-center">
                <div className="md:col-span-7">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                    Performance marketing • Creative systems • Conversion design
                  </div>

                  <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
                    Dark-mode growth.
                    <span className="block text-white/70">Bright results.</span>
                  </h1>

                  <p className="mt-5 max-w-xl text-base leading-relaxed text-white/65 md:text-lg">
                    We blend paid media, SEO, and sharp creative into a single
                    conversion machine. Strategy first. Execution fast.
                    Reporting crystal clear.
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      whileHover={{ scale: 1.02 }}
                      transition={{
                        type: "spring",
                        stiffness: 280,
                        damping: 18,
                      }}
                      onClick={() => jumpTo("contact")}
                      className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black hover:opacity-90"
                    >
                      Get a Free Audit
                    </motion.button>

                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      whileHover={{ y: -1 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 18,
                      }}
                      onClick={() => jumpTo("work")}
                      className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/85 hover:bg-white/10"
                    >
                      See Recent Wins
                    </motion.button>
                  </div>

                  <div className="mt-10 flex flex-wrap items-center gap-3 text-xs text-white/55">
                    <span className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                      +72% CVR
                    </span>
                    <span className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                      -31% CPA
                    </span>
                    <span className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                      +4.2 ROAS
                    </span>
                    <span className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                      SEO lift in 60 days
                    </span>
                  </div>
                </div>

                <div className="md:col-span-5">
                  <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6">
                    <div className="absolute inset-0 bg-[radial-gradient(600px_220px_at_20%_10%,rgba(255,255,255,0.14),transparent_55%)]" />
                    <div className="relative">
                      <div className="text-sm font-semibold text-white/85">
                        Live Growth Dashboard
                      </div>
                      <div className="mt-1 text-xs text-white/55">
                        Signal, not noise.
                      </div>

                      <div className="mt-6 space-y-3">
                        {[
                          ["Meta Ads", "Scaling winners", "Stable"],
                          ["Google Search", "High intent", "Rising"],
                          ["Landing Pages", "A/B iterations", "Improving"],
                          ["Email", "Revenue capture", "Strong"],
                        ].map(([a, b, c]) => (
                          <div
                            key={a}
                            className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                          >
                            <div>
                              <div className="text-sm font-medium text-white">
                                {a}
                              </div>
                              <div className="text-xs text-white/55">{b}</div>
                            </div>
                            <div className="text-xs text-white/70">{c}</div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
                        <div className="text-xs text-white/55">Next action</div>
                        <div className="mt-1 text-sm text-white/85">
                          Launch new creative angles + tighten offer framing.
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-white/50">
                    Scroll-triggered animations + smooth motion included (GSAP,
                    Lenis, Locomotive, Motion).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" data-section className="relative mt-12 md:mt-16">
          <div className="curtain pointer-events-none absolute inset-x-0 top-0 mx-auto h-full max-w-6xl origin-left bg-white/10 blur-2xl" />
          <div className="inner mx-auto max-w-6xl px-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-12">
              <div className="max-w-3xl">
                <div className="typo-line text-sm font-semibold text-white/70">
                  {splitToSpans("Services that move numbers — not just pixels")}
                </div>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                  A full-stack growth squad for brands that want velocity.
                </h2>
                <p className="mt-4 text-white/65">
                  Strategy, creative, and optimisation shipped as one system. No
                  hand-offs. No guessing.
                </p>
              </div>

              <div className="mt-10 grid gap-5 md:grid-cols-3">
                <Card
                  title="Paid Media Systems"
                  desc="Meta, Google, TikTok. Rapid testing, budget control, and scalable winners."
                  meta="Creative testing loops"
                  icon={<span className="text-lg">⚡</span>}
                />
                <Card
                  title="Conversion Design"
                  desc="Landing pages that feel premium and convert hard. Copy, layout, and flow."
                  meta="A/B + heatmap-driven"
                  icon={<span className="text-lg">◼︎</span>}
                />
                <Card
                  title="SEO + Content"
                  desc="Search strategy built for commercial intent. Topics, structure, and authority."
                  meta="60–90 day lift targets"
                  icon={<span className="text-lg">⟡</span>}
                />
              </div>
            </div>
          </div>
        </section>

        {/* WORK */}
        <section id="work" data-section className="relative mt-12 md:mt-16">
          <div className="curtain pointer-events-none absolute inset-x-0 top-0 mx-auto h-full max-w-6xl origin-left bg-white/10 blur-2xl" />
          <div className="inner mx-auto max-w-6xl px-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-12">
              <div className="grid gap-8 md:grid-cols-12 md:items-end">
                <div className="md:col-span-7">
                  <div className="typo-line text-sm font-semibold text-white/70">
                    {splitToSpans(
                      "Recent work — clean creative, sharp funnels"
                    )}
                  </div>
                  <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                    Launches, rebuilds, and turnarounds.
                  </h2>
                  <p className="mt-4 text-white/65">
                    A few anonymised snapshots showing what we do best: offer
                    clarity, friction removal, and performance scaling.
                  </p>
                </div>

                <div className="md:col-span-5">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <div className="text-xs text-white/55">Signature move</div>
                    <div className="mt-2 text-sm text-white/80">
                      We pair *creative angles* with *landing page
                      micro-iterations* daily until the funnel “locks in”.
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 grid gap-5 md:grid-cols-3">
                {[
                  ["Ecom Brand", "Offer refactor + UGC loops", "+3.9 ROAS"],
                  ["SaaS", "Search rebuild + LP redesign", "+61% signups"],
                  [
                    "Local Service",
                    "Lead gen funnel + retargeting",
                    "-28% CPL",
                  ],
                ].map(([a, b, c]) => (
                  <motion.div
                    key={a}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6"
                    data-scroll
                    data-scroll-speed="0.6"
                  >
                    <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <div className="absolute -left-24 top-0 h-full w-48 rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    </div>
                    <div className="relative">
                      <div className="text-sm font-semibold text-white">
                        {a}
                      </div>
                      <div className="mt-1 text-sm text-white/65">{b}</div>
                      <div className="mt-5 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/75">
                        <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                        {c}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section id="process" data-section className="relative mt-12 md:mt-16">
          <div className="curtain pointer-events-none absolute inset-x-0 top-0 mx-auto h-full max-w-6xl origin-left bg-white/10 blur-2xl" />
          <div className="inner mx-auto max-w-6xl px-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-12">
              <div className="typo-line text-sm font-semibold text-white/70">
                {splitToSpans(
                  "Process — predictable outcomes, weekly momentum"
                )}
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                A simple operating system for growth.
              </h2>

              <div className="mt-10 grid gap-5 md:grid-cols-4">
                {[
                  ["01", "Audit", "Find leaks, define goals, map the funnel."],
                  ["02", "Build", "Pages, tracking, offers, creative systems."],
                  ["03", "Test", "Angle sprint + rapid iteration loops."],
                  ["04", "Scale", "Double down on winners, expand channels."],
                ].map(([n, t, d]) => (
                  <div
                    key={n}
                    className="rounded-2xl border border-white/10 bg-white/5 p-6"
                  >
                    <div className="text-xs text-white/60">{n}</div>
                    <div className="mt-2 text-base font-semibold text-white">
                      {t}
                    </div>
                    <div className="mt-2 text-sm text-white/65">{d}</div>
                  </div>
                ))}
              </div>

              <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="typo-line text-sm font-semibold text-white/70">
                  {splitToSpans(
                    "On-scroll typography animations are live on this page"
                  )}
                </div>
                <p className="mt-3 text-sm text-white/65">
                  We animate words (not whole blocks) so the motion feels
                  editorial and premium — less “template”, more “studio”.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" data-section className="relative mt-12 md:mt-16">
          <div className="curtain pointer-events-none absolute inset-x-0 top-0 mx-auto h-full max-w-6xl origin-left bg-white/10 blur-2xl" />
          <div className="inner mx-auto max-w-6xl px-4">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-12">
              <div className="price-accent pointer-events-none absolute -left-32 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />

              <div className="typo-line text-sm font-semibold text-white/70">
                {splitToSpans("Pricing — clean packages, zero surprises")}
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                Pick your growth lane.
              </h2>
              <p className="mt-4 text-white/65">
                Start lean, then scale into a full performance system once the
                funnel proves itself.
              </p>

              <div className="mt-10 grid gap-5 md:grid-cols-3">
                {[
                  [
                    "Starter",
                    "£900/mo",
                    [
                      "Audit + tracking",
                      "Landing page tune-up",
                      "Weekly sprint plan",
                    ],
                  ],
                  [
                    "Growth",
                    "£1,800/mo",
                    [
                      "Paid media management",
                      "Creative testing loops",
                      "Conversion optimisation",
                    ],
                  ],
                  [
                    "Scale",
                    "£3,200/mo",
                    [
                      "Multi-channel scaling",
                      "SEO + content engine",
                      "Full funnel redesign",
                    ],
                  ],
                ].map(([name, price, list]) => (
                  <div
                    key={name}
                    className={cx(
                      "relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6",
                      name === "Growth" && "ring-1 ring-white/20"
                    )}
                  >
                    <div className="absolute inset-0 opacity-0 transition-opacity duration-500 hover:opacity-100">
                      <div className="absolute -left-24 top-0 h-full w-48 rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    </div>
                    <div className="relative">
                      <div className="text-sm font-semibold text-white">
                        {name}
                      </div>
                      <div className="mt-2 text-3xl font-semibold tracking-tight">
                        {price}
                      </div>
                      <ul className="mt-5 space-y-2 text-sm text-white/65">
                        {list.map((x) => (
                          <li key={x} className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/70" />
                            <span>{x}</span>
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => jumpTo("contact")}
                        className={cx(
                          "mt-6 w-full rounded-xl px-4 py-2 text-sm font-semibold",
                          name === "Growth"
                            ? "bg-white text-black hover:opacity-90"
                            : "border border-white/10 bg-white/5 text-white/85 hover:bg-white/10"
                        )}
                      >
                        {name === "Growth" ? "Most Popular" : "Choose Plan"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-xs text-white/50">
                Note: prices are examples — replace with your real packages.
              </p>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" data-section className="relative mt-12 md:mt-16">
          <div className="curtain pointer-events-none absolute inset-x-0 top-0 mx-auto h-full max-w-6xl origin-left bg-white/10 blur-2xl" />
          <div className="inner mx-auto max-w-6xl px-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-12">
              <div className="grid gap-10 md:grid-cols-12 md:items-start">
                <div className="md:col-span-6">
                  <div className="typo-line text-sm font-semibold text-white/70">
                    {splitToSpans(
                      "Contact — let’s build your next growth sprint"
                    )}
                  </div>
                  <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                    Want us to audit your funnel?
                  </h2>
                  <p className="mt-4 text-white/65">
                    Send your website + your biggest goal. We’ll reply with
                    quick wins, leaks, and a plan.
                  </p>

                  <div className="mt-8 space-y-3">
                    {[
                      ["48h Audit", "A teardown + priorities list"],
                      ["Weekly Sprints", "Tangible progress every week"],
                      ["Transparent Reporting", "Decisions backed by data"],
                    ].map(([a, b]) => (
                      <div
                        key={a}
                        className="rounded-2xl border border-white/10 bg-white/5 p-4"
                      >
                        <div className="text-sm font-semibold text-white">
                          {a}
                        </div>
                        <div className="mt-1 text-sm text-white/65">{b}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-6">
                  <form
                    onSubmit={(e) => e.preventDefault()}
                    className="rounded-3xl border border-white/10 bg-white/5 p-6"
                  >
                    <div className="grid gap-4">
                      <div>
                        <label className="text-xs text-white/60">Name</label>
                        <input
                          className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/20"
                          placeholder="Jane Doe"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-white/60">Email</label>
                        <input
                          className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/20"
                          placeholder="jane@company.com"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-white/60">Website</label>
                        <input
                          className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/20"
                          placeholder="https://yourbrand.com"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-white/60">Goal</label>
                        <textarea
                          rows={4}
                          className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/20"
                          placeholder="e.g., Cut CPA by 25% and increase lead volume"
                        />
                      </div>

                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        whileHover={{ scale: 1.01 }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 18,
                        }}
                        className="mt-2 rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black hover:opacity-90"
                      >
                        Send Request
                      </motion.button>

                      <p className="text-xs text-white/50">
                        By submitting, you agree to be contacted about your
                        request.
                      </p>
                    </div>
                  </form>

                  <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/55">
                    Tip: Replace the form handler with your backend / CRM
                    (HubSpot, Mailchimp, etc.).
                  </div>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-between gap-3 text-xs text-white/45">
                <div>© {new Date().getFullYear()} NoirGrowth</div>
                <div className="flex items-center gap-3">
                  <a
                    className="hover:text-white/70"
                    href="#top"
                    onClick={(e) => (e.preventDefault(), jumpTo("top"))}
                  >
                    Back to top
                  </a>
                  <span className="text-white/25">•</span>
                  <span>Dark UI • Glass • Motion • Scroll Typo</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Spacer so sticky footer never covers content */}
        <div className="h-24" />
      </main>
    </div>
  );
}
