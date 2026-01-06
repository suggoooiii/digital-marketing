import React, { useRef, useMemo, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// Configuration
const COLORS = ["#2b4539", "#61dca3", "#61b3dc"];
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-+=/[]{};:<>,0123456789";

const getRandomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];
const getRandomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];
const getRandomDelay = () => Math.floor(Math.random() * (110 - 30 + 1)) + 30;

export const TypeShuffle = ({ lines = [] }) => {
  const containerRef = useRef(null);
  // Store refs to all character spans
  //Structure: charRefs.current[lineIndex][charIndex]
  const charRefs = useRef([]);

  const { contextSafe } = useGSAP({ scope: containerRef });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const triggerFx6 = useCallback(
    contextSafe(() => {
      if (!charRefs.current.length) return;

      // Iterate through lines
      charRefs.current.forEach((lineChars, lineIndex) => {
        // Stagger start time for the line: (lineIndex + 1) * 80ms
        const lineDelay = (lineIndex + 1) * 80;

        // Start animation for each character in this line
        lineChars.forEach((charEl) => {
          if (!charEl) return;

          // We use vanilla JS timeouts inside strictly for the "random loop" behavior
          // because GSAP timelines are deterministic.
          // We wrap it in a timeout to respect the line stagger.
          setTimeout(() => {
            animateChar(charEl);
          }, lineDelay);
        });
      });
    }),
    []
  );

  const animateChar = (element) => {
    const MAX_ITERATIONS = 15;
    const originalText = element.dataset.original;
    const originalColor = element.dataset.color; // stored in dataset or just inherit
    let iteration = 0;

    const loop = () => {
      // Finished? Restore state
      if (iteration === MAX_ITERATIONS - 1) {
        element.innerText = originalText;
        element.style.color = ""; // Remove inline style to revert to CSS class color
        return;
      }

      // Glitch State
      element.innerText = getRandomChar();
      element.style.color = getRandomColor();

      iteration++;

      // Re-loop with random delay
      if (iteration < MAX_ITERATIONS) {
        setTimeout(loop, getRandomDelay());
      }
    };

    loop();
  };

  // Initialize refs array based on data
  useMemo(() => {
    charRefs.current = lines.map(() => []);
  }, [lines]);

  return (
    <div ref={containerRef} className="font-mono text-xl cursor-default">
      {lines.map((line, lineIndex) => (
        <div key={lineIndex} className="block overflow-hidden">
          {line.split("").map((char, charIndex) => (
            <span
              key={`${lineIndex}-${charIndex}`}
              ref={(el) => (charRefs.current[lineIndex][charIndex] = el)}
              data-original={char}
              className="inline-block whitespace-pre transition-colors"
              style={{ willChange: "transform, opacity" }} // optimization
            >
              {char}
            </span>
          ))}
        </div>
      ))}

      <button
        onClick={triggerFx6}
        className="mt-8 px-4 py-2 border border-white/20 hover:bg-white/10 transition-colors text-sm rounded"
      >
        Trigger FX6
      </button>
    </div>
  );
};
