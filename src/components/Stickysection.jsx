import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const StickySection = ({
  //   children,
  imgSrc,
  title,
  offset = 0,
  bgColor = "bg-neutral-900",
  titleColor = "rgb(30, 30, 30)",
}) => {
  const container = useRef(null);

  // Track scroll progress of this specific container relative to the viewport
  const { scrollYProgress } = useScroll({
    target: container,
    // 'start end': when top of element hits bottom of viewport (starts entering)
    // 'end start': when bottom of element hits top of viewport (fully leaves)
    offset: ["start center", "start end"],
  });

  // Map scroll progress to animation values (mimicking the GSAP tween)
  // yPercent: 10 -> -60
  // rotation: 20 -> -20
  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-100%"]);
  console.log("🚀 ~ StickySection ~ y:", y);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]); // Optional: adds depth
  // const y = useTransform(scrollYProgress, [0, 1], ["0px", "-255.5px"]);

  return (
    <div
      ref={container}
      className={`sticky w-full overflow-hidden ${bgColor} flex flex-col items-center justify-center rounded-t-[2rem] relative`}
      // Dynamic height and top position for the stacking effect
      style={{
        top: offset,
        height: `calc(90vh - ${offset}px)`,
      }}
    >
      <h2
        className="absolute top-8 left-8 uppercase tracking-tighter z-20"
        style={{
          fontSize: "119.583px",
          fontWeight: 600,
          lineHeight: "119.583px",
          color: titleColor,
        }}
      >
        {title}
      </h2>
      <motion.div
        style={{
          y: y,
          rotate: rotate,
          scale: scale,
        }}
        className="absolute top-8 right-8 w-96 z-10"
      >
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-auto object-cover shadow-2xl"
        />
      </motion.div>

      <div class="flex flex-row gap-[7.5625rem] text-[#1E1E1E]">
        <p class="flex text-[2rem] font-normal leading-[1.2] text-[#1E1E1E] m-0 p-0"></p>
        <p class="block text-[1.125rem] font-normal leading-[1.2] text-[#1E1E1E] m-0 p-0"></p>
      </div>
    </div>
  );
};

export default StickySection;
