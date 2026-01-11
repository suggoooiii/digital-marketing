import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import laptop0 from "/src/assets/img/laptop0.jpg";
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
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          style={{ opacity }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-[7vw] uppercase font-mono text-center z-20 mix-blend-difference m-0"
        >
          <TextHoverEffect text="Kay" />
          Marketing Agency
        </motion.h1>
      </div>
      <motion.div style={{ y }} className="relative h-full">
        <img
          src={laptop0}
          fill
          alt="image"
          style={{ objectFit: "cover" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </motion.div>
    </div>
  );
}
