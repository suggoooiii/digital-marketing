import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
// import swirling from "/src/assets/swirlingObj.webm";

export default function Section() {
  const container = useRef();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-50%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], ["10%", "30%"]);

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
      className="relative flex items-center justify-center min-h-[80vh] overflow-hidden bg-[oklch(96.7%_0.001_286.375)]"
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
          <span className="font-['Libre_Baskerville'] text-lg md:text-xl italic text-zinc-600 tracking-wide">
            About Us
          </span>
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="font-['Gambarino'] text-5xl md:text-6xl lg:text-7xl font-normal text-zinc-900 leading-tight mt-6"
        >
          We're{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] to-[#c8ff00]">
            Kay Agency
          </span>
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-zinc-600 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mt-8"
        >
          Kay Agency is a full-service digital marketing partner specializing in
          creative content, advertising, influencer campaigns, and brand
          development across industries such as F&B, furniture, weddings,
          healthcare, and more.
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-zinc-500 text-base leading-relaxed max-w-2xl mx-auto mt-4"
        >
          Founded with a passion for innovation, we believe in the power of
          storytelling, data-driven strategies, and designs that leave lasting
          impressions.
        </motion.p>
      </motion.div>
    </div>
  );
}
