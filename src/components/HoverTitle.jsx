import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function HoverTitle({ text }) {
  console.log("🚀 ~ HoverTitle ~ text:", text);
  const container = useRef();

  // Create context-safe functions for event listeners
  const { contextSafe } = useGSAP({ scope: container });

  const onEnter = contextSafe(() => {
    gsap.to(".char", {
      y: -10,
      color: "#3b82f6", // Tailwind blue-500
      stagger: 0.03,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
  });

  const onLeave = contextSafe(() => {
    gsap.to(".char", {
      y: 0,
      color: "currentColor",
      stagger: 0.02,
      duration: 0.3,
      ease: "power2.in",
      overwrite: "auto",
    });
  });

  return (
    <div
      ref={container}
      className="flex h-screen items-center justify-center bg-zinc-950"
    >
      <h1
        className="cursor-default text-5xl font-bold text-white overflow-hidden"
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        {text.split("").map((char, i) => (
          <span key={i} className="char inline-block whitespace-pre">
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
}
