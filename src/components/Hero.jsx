import React from "react";
import { motion } from "motion/react";

export default function Hero({ onJump }) {
  return (
    <section id="top" className="relative pt-28 md:pt-32">
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-12">
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
                conversion machine. Strategy first. Execution fast. Reporting
                crystal clear.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 280, damping: 18 }}
                  onClick={() => onJump?.("contact")}
                  className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black hover:opacity-90"
                >
                  Get a Free Audit
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ y: -1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  onClick={() => onJump?.("work")}
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
                Scroll typography animations + smooth motion included.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
