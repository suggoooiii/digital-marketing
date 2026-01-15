import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

import logoImg from "/images/kaymarklogog.png";

export default function LogoReveal() {
  const container = useRef();

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  // Logo scale: starts normal, zooms in dramatically
  const scale = useTransform(scrollYProgress, [0, 1], [1, 50]);

  // Clip path: circle that expands from center
  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.8, 1],
    [
      "circle(15% at 50% 50%)",
      "circle(80% at 50% 50%)",
      "circle(150% at 50% 50%)",
    ]
  );

  // Logo opacity: fades out as it zooms
  const logoOpacity = useTransform(scrollYProgress, [0, 0.6, 0.8], [1, 1, 0]);

  // Background opacity
  const bgOpacity = useTransform(scrollYProgress, [0.7, 1], [1, 0]);

  return (
    <div ref={container} className="h-[200vh] relative">
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
        {/* Dark background that fades out */}
        <motion.div
          className="absolute inset-0 bg-black z-20 pointer-events-none"
          style={{ opacity: bgOpacity }}
        />

        {/* Clip mask reveal */}
        <motion.div className="absolute inset-0 z-10" style={{ clipPath }}>
          {/* This is where the Intro content will show through */}
          <div className="w-full h-full bg-gradient-to-b from-[#0a0a0f] to-[#111]" />
        </motion.div>

        {/* Logo container */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-30"
          style={{ opacity: logoOpacity }}
        >
          <motion.div style={{ scale }} className="relative">
            {/* Replace with your actual logo */}
            <img
              src={logoImg}
              alt="Kay Agency"
              className="w-32 h-32 md:w-48 md:h-48 object-contain"
            />
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2"
          style={{ opacity: logoOpacity }}
        >
          <span className="text-white/50 text-xs uppercase tracking-widest">
            Scroll
          </span>
          <motion.div
            className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center"
            initial={{ opacity: 0.5 }}
          >
            <motion.div
              className="w-1 h-2 bg-white/50 rounded-full mt-1"
              animate={{ y: [0, 12, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
