// export default function Description() {
//   return (
//     <div className="flex justify-center my-40">
//       <p className="text-[7.5vw] uppercase text-center max-w-[50vw] leading-none">
//         The quick brown fox jumps over the lazy dog
//       </p>
//     </div>
//   );
// }

import { useScroll, useTransform, motion, useSpring } from "framer-motion";
import { useRef } from "react";

const services = [
  {
    id: 1,
    title: "1. Social media ads",
    content:
      "Advertising campaigns across social media platforms such as Facebook, Instagram, YouTube, and TikTok. Our specialized team develops customized strategies to increase engagement and reach, enhancing your campaign results and achieving your marketing goals.",
  },
  {
    id: 2,
    title: "2. Photography and design",
    content:
      "We offer innovative photography and design services that reflect your brand identity and target your audience in a distinctive way, whether it's visual content, professional photos, or high-quality creative designs.",
  },
  {
    id: 3,
    title: "3. Social media account management",
    content:
      "We professionally manage your social media accounts, employing integrated strategies to develop engaging content and interact instantly with your followers. Our expertise spans all major platforms, enhancing your brand's visibility and digital performance.",
  },
];

export default function Services() {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Add damping (smooth physics) to the scroll value
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Map vertical scroll to horizontal movement
  // starts slightly off-center (10%) and moves left until cards are revealed (-65%)
  const x = useTransform(smoothProgress, [0, 1], ["10%", "-80%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-black ">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-16 px-16">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative h-[60vh] w-[80vw] md:w-[40vw] flex-shrink-0 flex flex-col justify-between p-12 bg-[#111] border border-[#222] rounded-3xl overflow-hidden hover:border-gray-600 transition-colors duration-500"
            >
              <div className="z-10 flex flex-col gap-6">
                <h3 className="text-4xl md:text-5xl font-bold text-white uppercase leading-tight">
                  {service.title}
                </h3>
                <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-prose">
                  {service.content}
                </p>
              </div>
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-[80px] group-hover:bg-white/10 transition-all duration-500" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
