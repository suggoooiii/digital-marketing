import { useScroll, useTransform, motion, useSpring } from "framer-motion";
import { useRef } from "react";
import { DottedGlowBackground } from "./ui/dotted-glow-background";

const services = [
  {
    id: 1,
    title: "Social media ads",
    content:
      "Advertising campaigns across social media platforms such as Facebook, Instagram, YouTube, and TikTok. Our specialized team develops customized strategies to increase engagement and reach, enhancing your campaign results and achieving your marketing goals.",
  },
  {
    id: 2,
    title: "Photography and design",
    content:
      "We offer innovative photography and design services that reflect your brand identity and target your audience in a distinctive way, whether it's visual content, professional photos, or high-quality creative designs.",
  },
  {
    id: 3,
    title: "Social media management",
    content:
      "We professionally manage your social media accounts, employing integrated strategies to develop engaging content and interact instantly with your followers. Our expertise spans all major platforms, enhancing your brand's visibility and digital performance.",
  },
];

const Card = ({ title, content, index, targetRef, totalCards }) => {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const cardStart = index / totalCards;
  const cardEnd = (index + 1) / totalCards;

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Card slides in from right horizontally
  const x = useTransform(
    smoothProgress,
    [cardStart, cardEnd],
    ["100vw", "0vw"]
  );

  // Scale down when next card comes
  const scale = useTransform(
    smoothProgress,
    [cardEnd, cardEnd + 0.1],
    [1, 0.95]
  );

  const opacity = useTransform(
    smoothProgress,
    [cardStart, cardStart + 0.1, cardEnd, cardEnd + 0.15],
    [0, 1, 1, index === totalCards - 1 ? 1 : 0.2]
  );

  const isLastCard = index === totalCards - 1;
  const finalOpacity = isLastCard
    ? useTransform(smoothProgress, [cardStart, cardStart + 0.1], [0, 1])
    : opacity;

  // Offset each card to the right based on index
  const leftOffset = index * 60; // 60px offset per card

  return (
    <motion.div
      className="absolute top-1/2 -translate-y-1/2 h-[70vh] flex bg-[#111] border border-[#222] rounded-3xl overflow-hidden hover:border-gray-600 transition-colors duration-500"
      style={{
        x,
        scale,
        opacity: finalOpacity,
        left: `calc(10vw + ${leftOffset}px)`,
        width: `calc(80vw - ${leftOffset}px)`,
        zIndex: index,
      }}
    >
      {/* Vertical Title Tab */}
      <div className="relative w-16 md:w-20 flex-shrink-0 bg-[#0a0a0a] border-r border-[#222] flex items-center justify-center">
        <span
          className="text-white text-sm md:text-base font-bold uppercase tracking-widest whitespace-nowrap"
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            transform: "rotate(180deg)",
          }}
        >
          {String(index + 1).padStart(2, "0")}. {title}
        </span>
      </div>

      {/* Card Content Area */}
      <div className="relative flex-1 p-8 md:p-12 overflow-hidden">
        {/* Dotted Glow Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <DottedGlowBackground
            darkColor="oklch(29.3% 0.136 325.661)"
            glowColor="oklch(74% 0.238 322.16)"
            gap={40}
            radius={4}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center h-full">
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-prose">
            {content}
          </p>
        </div>

        {/* Corner glow effect */}
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-[80px] pointer-events-none" />
      </div>
    </motion.div>
  );
};

export default function Services() {
  const targetRef = useRef(null);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {services.map((service, index) => (
          <Card
            key={service.id}
            title={service.title}
            content={service.content}
            index={index}
            targetRef={targetRef}
            totalCards={services.length}
          />
        ))}
      </div>
    </section>
  );
}
