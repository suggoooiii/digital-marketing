import {
  useScroll,
  useTransform,
  motion,
  useSpring,
  useInView,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";

// Animated text component - types out characters one by one
const TypewriterText = ({ text, className, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (isInView) {
      let currentIndex = 0;
      const timeout = setTimeout(() => {
        const interval = setInterval(() => {
          if (currentIndex <= text.length) {
            setDisplayedText(text.slice(0, currentIndex));
            currentIndex++;
          } else {
            clearInterval(interval);
          }
        }, 50); // Speed of typing (ms per character)

        return () => clearInterval(interval);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [isInView, text, delay]);

  return (
    <h2 ref={ref} className={className}>
      {displayedText}
      <span className="animate-pulse">|</span>
    </h2>
  );
};

const services = [
  {
    id: 1,
    title: "Social Media Ads",
    subtitle: "Targeted Campaigns",
    content:
      "Advertising campaigns across social media platforms such as Facebook, Instagram, YouTube, and TikTok. Our specialized team develops customized strategies to increase engagement and reach.",
    image: "/images/social-ads.jpg",
    accent: "#4900f4",
  },
  {
    id: 2,
    title: "Photography & Design",
    subtitle: "Visual Identity",
    content:
      "We offer innovative photography and design services that reflect your brand identity and target your audience in a distinctive way, whether it's visual content or high-quality creative designs.",
    image: "/images/photography.jpg",
    accent: "#f400a1",
  },
  {
    id: 3,
    title: "Social Media Management",
    subtitle: "Brand Growth",
    content:
      "We professionally manage your social media accounts, employing integrated strategies to develop engaging content and interact instantly with your followers across all major platforms.",
    image: "/images/management.jpg",
    accent: "#00d4aa",
  },
  {
    id: 4,
    title: "Content Strategy",
    subtitle: "Storytelling",
    content:
      "Crafting compelling narratives that resonate with your audience. We develop content calendars, write copy, and create multimedia content that drives engagement and conversions.",
    image: "/images/content.jpg",
    accent: "#ff6b35",
  },
];

const ServiceCard = ({ service, index }) => {
  const cardRef = useRef(null);

  return (
    <motion.div
      ref={cardRef}
      className="relative flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[35vw] h-[70vh] group cursor-grab active:cursor-grabbing"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      {/* Card Container */}
      <div className="relative w-full h-full rounded-3xl overflow-hidden bg-[#0a0a0a] border border-white/10 transition-all duration-500 group-hover:border-white/20">
        {/* Background Gradient */}
        <div
          className="absolute inset-0 opacity-20 transition-opacity duration-500 group-hover:opacity-40"
          style={{
            background: `radial-gradient(circle at 30% 20%, ${service.accent}40 0%, transparent 50%)`,
          }}
        />

        {/* Number Badge */}
        <div
          className="absolute top-6 left-6 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white border-2 transition-all duration-300 group-hover:scale-110"
          style={{ borderColor: service.accent, color: service.accent }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
          {/* Subtitle */}
          <motion.span
            className="text-sm uppercase tracking-widest mb-2 font-medium"
            style={{ color: service.accent }}
          >
            {service.subtitle}
          </motion.span>

          {/* Title */}
          <h3 className="font-montserrat text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-base leading-relaxed mb-6 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
            {service.content}
          </p>

          {/* CTA Button */}
          <motion.button
            className="self-start px-6 py-3 rounded-full text-sm font-semibold text-white border border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/40"
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            Learn More →
          </motion.button>
        </div>

        {/* Decorative Elements */}
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] opacity-30 transition-opacity duration-500 group-hover:opacity-50"
          style={{ backgroundColor: service.accent }}
        />

        {/* Corner Accent */}
        <div
          className="absolute bottom-0 right-0 w-32 h-32 opacity-20"
          style={{
            background: `linear-gradient(135deg, transparent 50%, ${service.accent} 50%)`,
          }}
        />
      </div>
    </motion.div>
  );
};

export default function Services() {
  const containerRef = useRef(null);
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Calculate total scroll distance based on number of cards
  const x = useTransform(
    smoothProgress,
    [0, 1],
    ["0%", `-${(services.length - 1) * 37}%`]
  );

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-black">
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {/* Section Header */}
        <div className="px-8 md:px-16 mb-8">
          <motion.span
            className="text-[#4900f4] text-sm uppercase tracking-widest font-medium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            What We Do
          </motion.span>
          <TypewriterText
            text="Our Services"
            className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-2"
            delay={200}
          />
        </div>

        {/* Horizontal Scroll Container */}
        <motion.div
          ref={containerRef}
          className="flex gap-6 md:gap-8 pl-8 md:pl-16"
          style={{ x }}
        >
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}

          {/* End Card - CTA */}
          <motion.div
            className="flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[35vw] h-[70vh] flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="text-center px-8">
              <h3 className="font-montserrat text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to grow?
              </h3>
              <p className="text-gray-400 mb-8 max-w-sm mx-auto">
                Let's discuss how we can help elevate your brand to the next
                level.
              </p>
              <motion.button
                className="px-8 py-4 rounded-full text-base font-semibold text-black bg-[#4900f4] hover:bg-[#5a1fff] transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                style={{ color: "white" }}
              >
                Get in Touch
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Progress Indicator */}
        <div className="absolute bottom-8 left-8 md:left-16 flex items-center gap-4">
          <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#4900f4] rounded-full"
              style={{ scaleX: smoothProgress, transformOrigin: "left" }}
            />
          </div>
          <span className="text-white/50 text-sm">Scroll to explore</span>
        </div>
      </div>
    </section>
  );
}
