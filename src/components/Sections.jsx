import React from "react";
import { motion } from "motion/react";
import { splitToSpans } from "../lib/splitToSpans";

const cx = (...classes) => classes.filter(Boolean).join(" ");

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

function SectionShell({ id, children }) {
  return (
    <section id={id} data-section className="relative mt-12 md:mt-16">
      <div
        class
        Name="curtain pointer-events-none absolute inset-x-0 top-0 mx-auto h-full max-w-6xl origin-left bg-white/10 blur-2xl"
      />
      <div className="inner mx-auto max-w-6xl px-4">{children}</div>
    </section>
  );
}

export default function Sections({ onJump }) {
  return (
    <>
      {/* SERVICES */}
      <SectionShell id="services">
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
      </SectionShell>

      {/* WORK */}
      <SectionShell id="work">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-12">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <div className="typo-line text-sm font-semibold text-white/70">
                {splitToSpans("Recent work — clean creative, sharp funnels")}
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
                  We pair creative angles with landing page micro-iterations
                  daily until the funnel “locks in”.
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              ["Ecom Brand", "Offer refactor + UGC loops", "+3.9 ROAS"],
              ["SaaS", "Search rebuild + LP redesign", "+61% signups"],
              ["Local Service", "Lead gen funnel + retargeting", "-28% CPL"],
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
                  <div className="text-sm font-semibold text-white">{a}</div>
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
      </SectionShell>

      {/* PROCESS */}
      <SectionShell id="process">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-12">
          <div className="typo-line text-sm font-semibold text-white/70">
            {splitToSpans("Process — predictable outcomes, weekly momentum")}
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
            A simple operating system for growx th.
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
              We animate words (not whole blocks) so the motion feels editorial
              and premium.
            </p>
          </div>
        </div>
      </SectionShell>

      {/* TESTIMONIALS */}
      <SectionShell id="testimonials">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-12">
          <div className="typo-line text-sm font-semibold text-white/70">
            {splitToSpans("Testimonials — trusted by growth leaders")}
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
            Don't just take our word for it.
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              [
                "“Rewrote our entire acquisition playbook. We went from burning cash to profitable scale in 60 days.”",
                "Alex R.",
                "Founder, DTC Skin",
              ],
              [
                "“The most technical creative team we’ve worked with. Their landing pages actually convert.”",
                "Sarah L.",
                "CMO, FinTech Co.",
              ],
              [
                "“Finally, an agency that cares about CPA as much as we do. Reporting is clear, results are real.”",
                "James T.",
                "Head of Growth, SaaS",
              ],
              [
                "“NoirGrowth is an extension of our team. Their speed of execution is unmatched.”",
                "Emily K.",
                "Director, E-com Brand",
              ],
            ].map(([quote, author, role], i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <div className="text-base leading-relaxed text-white/80">
                  {quote}
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-white/10" />
                  <div>
                    <div className="text-sm font-semibold text-white">
                      {author}
                    </div>
                    <div className="text-xs text-white/50">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionShell>

      {/* CONTACT */}
      <SectionShell id="contact">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-12">
          <div className="grid gap-10 md:grid-cols-12 md:items-start">
            <div className="md:col-span-6">
              <div className="typo-line text-sm font-semibold text-white/70">
                {splitToSpans("Contact — let’s build your next growth sprint")}
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                Want us to audit your funnel?
              </h2>
              <p className="mt-4 text-white/65">
                Send your website + your biggest goal. We’ll reply with quick
                wins, leaks, and a plan.
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
                    <div className="text-sm font-semibold text-white">{a}</div>
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
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    className="mt-2 rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black hover:opacity-90"
                  >
                    Send Request
                  </motion.button>

                  <p className="text-xs text-white/50">
                    By submitting, you agree to be contacted about your request.
                  </p>
                </div>
              </form>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/55">
                Tip: Replace the form handler with your backend / CRM (HubSpot,
                Mailchimp, etc.).
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-3 text-xs text-white/45">
            <div>© {new Date().getFullYear()} NoirGrowth</div>
            <div className="flex items-center gap-3">
              <a
                className="hover:text-white/70"
                href="#top"
                onClick={(e) => (e.preventDefault(), onJump?.("top"))}
              >
                Back to top
              </a>
              <span className="text-white/25">•</span>
              <span>Dark UI • Glass • Motion • Scroll Typo</span>
            </div>
          </div>
        </div>
      </SectionShell>
    </>
  );
}
