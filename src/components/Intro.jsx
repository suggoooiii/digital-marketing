import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import heroimg from "/src/assets/img/heroSectionimg.jpeg";
import { TextHoverEffect } from "./ui/text-hover-effect";

export default function Intro() {
  const container = useRef();

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "150vh"]);
  const opacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  return (
    <div className="h-screen overflow-hidden" ref={container}>
      <div className="absolute z-10 w-full h-full flex items-center justify-center">
        {/* <TextHoverEffect text="Kay" /> */}
      </div>

      {/* Text Content - Left Side */}
      <motion.div
        style={{ opacity }}
        className="absolute z-20 left-8 md:left-16 lg:left-24 top-1/2 -translate-y-1/2 max-w-xl"
      >
        <h1 className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
          We Turn Clicks Into Customers
        </h1>
        <p className="font-montserrat text-lg md:text-xl text-gray-300 leading-relaxed">
          Data-driven marketing that brings you real leads, real sales, and
          measurable growth.
        </p>
      </motion.div>

      <motion.div style={{ y }} className="relative h-full">
        <img
          src={heroimg}
          fill
          alt="image"
          style={{ objectFit: "cover" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </motion.div>
    </div>
  );
}
