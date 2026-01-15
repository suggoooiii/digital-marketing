import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import swirling from "/src/assets/swirlingObj.gif";

export default function Section() {
  const container = useRef();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-40%", "50%"]);
  const scale = useTransform(scrollYProgress, [0, 1], ["10%", "-80%"]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div
      ref={container}
      className="relative flex items-center justify-center min-h-[80vh] overflow-hidden bg-[#0a0a0f]"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      {/* Content */}
      <motion.div
        className="relative z-10 w-full max-w-5xl mx-auto px-8 py-20 text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div variants={itemVariants}>
          <span className="text-[#4900f4] font-semibold tracking-wider uppercase text-sm">
            About Us
          </span>
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="font-montserrat text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mt-6"
        >
          We're{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4900f4] to-[#c8ff00]">
            Kay Agency
          </span>
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mt-8"
        >
          Kay Agency is a full-service digital marketing partner specializing in
          creative content, advertising, influencer campaigns, and brand
          development across industries such as F&B, furniture, weddings,
          healthcare, and more.
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-gray-500 text-base leading-relaxed max-w-2xl mx-auto mt-4"
        >
          Founded with a passion for innovation, we believe in the power of
          storytelling, data-driven strategies, and designs that leave lasting
          impressions.
        </motion.p>

        <motion.div variants={itemVariants} className="mt-10">
          <button className="group inline-flex items-center gap-3 rounded-full bg-white/5 border border-white/10 px-8 py-4 text-white font-semibold transition-all hover:bg-[#4900f4] hover:border-[#4900f4]">
            Learn More About Us
            <svg
              className="w-5 h-5 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </motion.div>
      </motion.div>

      {/* Background - Swirling GIF with parallax */}
      <div className="absolute inset-0 z-0">
        <motion.div style={{ y, scale }} className="relative w-full h-full">
          <img
            src={swirling}
            alt="background"
            className="absolute inset-0 w-full h-full object-cover opacity-15"
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-transparent to-[#0a0a0f]" />
        </motion.div>
      </div>
    </div>
  );
}
