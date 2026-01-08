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
  const charRefs = useRef([]);
  // 1. Add a ref to track animation state
  const isAnimating = useRef(false);

  const { contextSafe } = useGSAP({ scope: containerRef });

  const triggerFx6 = useCallback(
    contextSafe(() => {
      // 2. Prevent triggering if already running
      if (isAnimating.current || !charRefs.current.length) return;
      isAnimating.current = true;

      // Count total characters to know when to finish
      let completedChars = 0;
      const totalChars = lines.join("").length;

      charRefs.current.forEach((lineChars, lineIndex) => {
        const lineDelay = (lineIndex + 1) * 80;

        lineChars.forEach((charEl) => {
          if (!charEl) return;

          setTimeout(() => {
            animateChar(charEl, () => {
              // 3. Callback when a char finishes
              completedChars++;
              if (completedChars === totalChars) {
                isAnimating.current = false;
              }
            });
          }, lineDelay);
        });
      });
    }),
    [lines]
  );

  const animateChar = (element, onComplete) => {
    const MAX_ITERATIONS = 15;
    const originalText = element.dataset.original;
    let iteration = 0;

    const loop = () => {
      if (iteration === MAX_ITERATIONS - 1) {
        element.innerText = originalText;
        element.style.color = "";
        if (onComplete) onComplete(); // Notify completion
        return;
      }

      element.innerText = getRandomChar();
      element.style.color = getRandomColor();
      iteration++;

      if (iteration < MAX_ITERATIONS) {
        setTimeout(loop, getRandomDelay());
      }
    };
    loop();
  };

  useMemo(() => {
    charRefs.current = lines.map(() => []);
  }, [lines]);

  return (
    <div
      ref={containerRef}
      className="font-mono text-xl cursor-default"
      onMouseEnter={triggerFx6}
    >
      {lines.map((line, lineIndex) => (
        <div
          key={lineIndex}
          className="block overflow-hidden pointer-events-none"
        >
          {" "}
          {/* Optional: pointer-events-none on children ensures hover hits the parent smoothly */}
          {line.split("").map((char, charIndex) => (
            <span
              key={`${lineIndex}-${charIndex}`}
              ref={(el) => (charRefs.current[lineIndex][charIndex] = el)}
              data-original={char}
              className="inline-block whitespace-pre transition-colors"
              style={{ willChange: "transform, opacity" }}
            >
              {char}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};
