import React from "react";

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function Navbar({ active = "top", onJump }) {
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
                  onClick={() => onJump?.(id)}
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

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                onJump?.("contact");
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
  );
}
