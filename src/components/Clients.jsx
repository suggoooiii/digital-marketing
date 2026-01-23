import { motion } from "framer-motion";

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

// Marquee Row Component
function MarqueeRow({ logos, direction = "left", speed = 30 }) {
  // Duplicate logos for seamless loop
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className="relative flex overflow-hidden">
      {/* Gradient masks */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-[#0a0a0f] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-[#0a0a0f] to-transparent" />

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
  return (
    <section className="relative overflow-hidden bg-[#0a0a0f] py-20">
      {/* Header */}
      <motion.div
        className="mx-auto mb-12 max-w-4xl px-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-[#4900f4]">
          Our Clients
        </span>
        <h2 className="font-['Gambarino'] text-3xl font-bold text-white md:text-4xl lg:text-5xl">
          Trusted by{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] to-[#c8ff00]">
            30+ Brands
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-gray-400">
          From startups to established businesses, we've helped brands across
          industries grow their digital presence.
        </p>
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
          <p className="font-montserrat text-2xl font-bold text-white md:text-4xl">
            30+
          </p>
          <p className="text-xs text-gray-500 md:text-sm">Happy Clients</p>
        </div>
        <div className="h-8 w-px bg-white/10" />
        <div className="text-center">
          <p className="font-montserrat text-2xl font-bold text-white md:text-4xl">
            150+
          </p>
          <p className="text-xs text-gray-500 md:text-sm">Projects Delivered</p>
        </div>
        <div className="h-8 w-px bg-white/10" />
        <div className="text-center">
          <p className="font-montserrat text-2xl font-bold text-white md:text-4xl">
            5+
          </p>
          <p className="text-xs text-gray-500 md:text-sm">Years Experience</p>
        </div>
      </motion.div>
    </section>
  );
}
