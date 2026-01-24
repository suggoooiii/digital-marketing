import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Import all client logos
const clientLogos = [
  "images/clients/client-1.jpeg",
  "images/clients/client-2.jpeg",
  "images/clients/client-3.jpeg",
  "images/clients/client-4.jpeg",
  "images/clients/client-5.jpeg",
  "images/clients/client-6.jpeg",
  "images/clients/client-7.jpeg",
  "images/clients/client-8.jpeg",
  "images/clients/client-9.jpeg",
  "images/clients/client-10.jpeg",
  "images/clients/client-11.jpeg",
  "images/clients/client-12.jpeg",
  "images/clients/client-13.jpeg",
  "images/clients/client-14.jpeg",
  "images/clients/client-15.jpeg",
  "images/clients/client-16.jpeg",
];

const clientLogos2 = [
  "images/clients/client-17.jpeg",
  "images/clients/client-18.jpeg",
  "images/clients/client-19.jpeg",
  "images/clients/client-20.jpeg",
  "images/clients/client-21.jpeg",
  "images/clients/client-22.jpeg",
  "images/clients/client-23.jpeg",
  "images/clients/client-24.jpeg",
  "images/clients/client-25.jpeg",
  "images/clients/client-26.jpeg",
  "images/clients/client-27.jpeg",
  "images/clients/client-28.jpeg",
  "images/clients/client-29.jpeg",
  "images/clients/client-30.jpeg",
  "images/clients/client-31.jpeg",
  "images/clients/client-32.jpeg",
];

// ...existing code...

// Marquee Row Component with dynamic gradient colors
function MarqueeRow({
  logos,
  direction = "left",
  speed = 30,
  gradientColor = "#0a0a0f",
}) {
  // Duplicate logos for seamless loop
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className="relative flex overflow-hidden">
      {/* Gradient masks */}
      <motion.div
        className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20"
        style={{
          background: `linear-gradient(to right, ${gradientColor}, transparent)`,
        }}
      />
      <motion.div
        className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20"
        style={{
          background: `linear-gradient(to left, ${gradientColor}, transparent)`,
        }}
      />

      <motion.div
        className="flex gap-8 py-4"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          x: {
            duration: speed,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        {duplicatedLogos.map((logo, index) => (
          <div
            key={index}
            className="group relative flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/5 p-2 transition-all duration-300 hover:bg-white/10 hover:scale-110"
          >
            <img
              src={logo}
              alt={`Client ${index + 1}`}
              className="h-full w-full rounded-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Clients() {
  const container = useRef();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  // Continue the color transition from About Us section
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["#f5f5f5", "#f5f5f5", "#0a0a0f"],
  );

  const textColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["#0a0a0f", "#0a0a0f", "#ffffff"],
  );

  const subtextColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["#4b5563", "#4b5563", "#9ca3af"],
  );

  const labelColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["rgba(10,10,15,0.7)", "rgba(10,10,15,0.7)", "rgba(255,255,255,0.8)"],
  );

  const statTextColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["#0a0a0f", "#0a0a0f", "#ffffff"],
  );

  const dividerColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["rgba(10,10,15,0.1)", "rgba(10,10,15,0.1)", "rgba(255,255,255,0.1)"],
  );

  return (
    <motion.section
      ref={container}
      className="relative overflow-hidden py-20"
      style={{ backgroundColor }}
    >
      {/* Header */}
      <motion.div
        className="mx-auto mb-12 max-w-4xl px-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.span
          className="mb-4 inline-block font-['Libre_Baskerville'] text-lg md:text-xl italic tracking-wide"
          style={{ color: labelColor }}
        >
          Our Clients
        </motion.span>
        <motion.h2
          className="font-['Gambarino'] text-3xl font-bold md:text-4xl lg:text-5xl"
          style={{ color: textColor }}
        >
          Trusted by{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] to-[#c8ff00]">
            30+ Brands
          </span>
        </motion.h2>
        <motion.p
          className="mx-auto mt-4 max-w-2xl"
          style={{ color: subtextColor }}
        >
          From startups to established businesses, we've helped brands across
          industries grow their digital presence.
        </motion.p>
      </motion.div>

      {/* Marquee Rows */}
      <div className="space-y-6">
        <MarqueeRow logos={clientLogos} direction="left" speed={35} />
        <MarqueeRow logos={clientLogos2} direction="right" speed={40} />
      </div>

      {/* Bottom Stats - Minimal */}
      <motion.div
        className="mx-auto mt-16 flex max-w-4xl items-center justify-center gap-4 px-4 md:gap-16 md:px-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="text-center">
          <motion.p
            className="font-montserrat text-2xl font-bold md:text-4xl"
            style={{ color: statTextColor }}
          >
            30+
          </motion.p>
          <motion.p
            className="text-xs md:text-sm"
            style={{ color: subtextColor }}
          >
            Happy Clients
          </motion.p>
        </div>
        <motion.div
          className="h-8 w-px"
          style={{ backgroundColor: dividerColor }}
        />
        <div className="text-center">
          <motion.p
            className="font-montserrat text-2xl font-bold md:text-4xl"
            style={{ color: statTextColor }}
          >
            150+
          </motion.p>
          <motion.p
            className="text-xs md:text-sm"
            style={{ color: subtextColor }}
          >
            Projects Delivered
          </motion.p>
        </div>
        <motion.div
          className="h-8 w-px"
          style={{ backgroundColor: dividerColor }}
        />
        <div className="text-center">
          <motion.p
            className="font-montserrat text-2xl font-bold md:text-4xl"
            style={{ color: statTextColor }}
          >
            5+
          </motion.p>
          <motion.p
            className="text-xs md:text-sm"
            style={{ color: subtextColor }}
          >
            Years Experience
          </motion.p>
        </div>
      </motion.div>
    </motion.section>
  );
}
