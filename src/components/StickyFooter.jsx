import React from "react";

export default function StickyFooter({ onJump }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-4">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
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
                onClick={() => onJump?.("pricing")}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 hover:bg-white/10 md:text-sm"
              >
                View Pricing
              </button>
              <button
                onClick={() => onJump?.("contact")}
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
