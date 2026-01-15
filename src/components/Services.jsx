import {
  useScroll,
  useTransform,
  motion,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";

// Animated text component
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
        }, 50);

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
    title: "Social Media Management",
    subtitle: "Brand Presence",
    content:
      "Strategic content planning, creative writing, and full platform management to grow your brand's digital presence.",
    expandedContent: {
      description:
        "We handle every aspect of your social media presence, from strategy to execution, ensuring your brand stays relevant and engaging across all platforms.",
      features: [
        "Developing strategy and monthly content plans",
        "Creative content writing in both Arabic and English",
        "Publishing and scheduling across all platforms",
        "Creating trend-based, modern content to increase visibility",
        "Monthly performance reports with detailed analytics",
      ],
    },
    accent: "#4900f4",
    icon: "📱",
  },
  {
    id: 2,
    title: "Performance Marketing & Paid Ads",
    subtitle: "Growth Engine",
    content:
      "Data-driven advertising campaigns across Meta, Google, TikTok, and LinkedIn to maximize your ROI and reach.",
    expandedContent: {
      description:
        "We create and optimize high-performance advertising campaigns that drive real results, from brand awareness to customer acquisition and conversions.",
      features: [
        "Meta Ads (Facebook & Instagram) campaigns",
        "Google Ads targeting high-purchasing-power audiences",
        "TikTok Ads for viral content and wide reach",
        "LinkedIn Ads targeting the B2B sector",
        "Campaign optimization through A/B testing",
      ],
    },
    accent: "#f400a1",
    icon: "📈",
  },
  {
    id: 3,
    title: "Content Creation",
    subtitle: "Visual Storytelling",
    content:
      "Professional video production and photography services tailored for ads, campaigns, and social media content.",
    expandedContent: {
      description:
        "From concept to final cut, we produce compelling visual content that captures attention and tells your brand's story effectively.",
      features: [
        "Professional video production (ads, campaigns, testimonials)",
        "Short-form content (Reels & TikTok)",
        "Lifestyle photography for restaurants and products",
        "End-to-end production from shooting to editing",
      ],
    },
    accent: "#00d4aa",
    icon: "🎬",
  },
  {
    id: 4,
    title: "Brand Identity",
    subtitle: "Visual Excellence",
    content:
      "Complete brand identity development and creative design services to establish a memorable visual presence.",
    expandedContent: {
      description:
        "We craft distinctive visual identities and creative designs that make your brand stand out and resonate with your target audience.",
      features: [
        "Complete visual brand identity (logos, typography, colors)",
        "Creative designs for campaigns and social media",
        "Packaging and product label design",
        "Unified visual style across all platforms",
      ],
    },
    accent: "#ff6b35",
    icon: "🎨",
  },
  {
    id: 5,
    title: "Print Solutions",
    subtitle: "Tangible Impact",
    content:
      "High-quality digital and offset printing services for all your branding and marketing materials.",
    expandedContent: {
      description:
        "Premium printing solutions that bring your brand to life in the physical world.",
      features: [
        "High-quality digital and offset printing",
        "Large-format printing (banners, roll-ups, signage)",
        "Business printing (cards, brochures, catalogs)",
        "Branding materials (stickers, packaging, labels)",
      ],
    },
    accent: "#ffd700",
    icon: "🖨️",
  },
  {
    id: 6,
    title: "Event Management",
    subtitle: "Memorable Experiences",
    content:
      "End-to-end event planning and brand activations that create engaging, unforgettable experiences.",
    expandedContent: {
      description:
        "We design and execute impactful events and activations that connect your brand with audiences.",
      features: [
        "End-to-end event planning and execution",
        "Corporate events, launches, exhibitions",
        "Booth and stand design with full branding",
        "On-site branding and coordination",
      ],
    },
    accent: "#9945FF",
    icon: "🎪",
  },
];

const ServiceCard = ({ service, index, isExpanded, onExpand, onClose }) => {
  const cardRef = useRef(null);

  return (
    <motion.div
      ref={cardRef}
      className="relative shrink-0 cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true }}
      onClick={() => (isExpanded ? onClose() : onExpand(service.id))}
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl bg-[#111] border border-white/10 hover:border-white/20 transition-all duration-300"
        animate={{
          width: isExpanded ? "min(500px, 85vw)" : "280px",
          height: isExpanded ? "auto" : "380px",
        }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        whileHover={
          !isExpanded ? { y: -8, borderColor: "rgba(255,255,255,0.3)" } : {}
        }
      >
        {/* Accent gradient */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background: `linear-gradient(135deg, ${service.accent}50 0%, transparent 60%)`,
          }}
        />

        {/* Content */}
        <div className="relative p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
              style={{ backgroundColor: `${service.accent}20` }}
            >
              {service.icon}
            </div>
            {isExpanded && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 text-sm"
              >
                ✕
              </motion.button>
            )}
          </div>

          {/* Subtitle */}
          <span
            className="text-xs uppercase tracking-widest font-medium mb-2"
            style={{ color: service.accent }}
          >
            {service.subtitle}
          </span>

          {/* Title */}
          <h3 className="font-montserrat text-lg font-bold text-white mb-3 leading-tight">
            {service.title}
          </h3>

          <AnimatePresence mode="wait">
            {isExpanded ? (
              <motion.div
                key="expanded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex-1"
              >
                <p className="text-gray-400 text-sm leading-relaxed mb-5">
                  {service.expandedContent.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {service.expandedContent.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-2 text-gray-400 text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                        style={{ backgroundColor: service.accent }}
                      />
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                <motion.button
                  className="px-5 py-2.5 rounded-full text-sm font-medium text-white"
                  style={{ backgroundColor: service.accent }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  Learn More →
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="collapsed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col"
              >
                <p className="text-gray-500 text-sm leading-relaxed flex-1">
                  {service.content}
                </p>

                {/* Bottom indicator */}
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
                  <span className="text-xs text-gray-600">Click to expand</span>
                  <motion.span
                    className="text-gray-600"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Number badge */}
        <div className="absolute bottom-4 right-4 text-4xl font-bold opacity-5 text-white">
          {String(index + 1).padStart(2, "0")}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function Services() {
  const targetRef = useRef(null);
  const [expandedId, setExpandedId] = useState(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Removed useSpring - direct transform for snappier feel
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setExpandedId(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section ref={targetRef} className="relative h-[200vh] bg-black">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {/* Header */}
        <div className="px-8 md:px-16 mb-10">
          <motion.span
            className="text-[#4900f4] text-xs uppercase tracking-widest font-medium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            What We Do
          </motion.span>
          <TypewriterText
            text="Our Services"
            className="font-montserrat text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-2"
            delay={200}
          />
        </div>

        {/* Cards */}
        <motion.div
          className="flex gap-5 pl-8 md:pl-16 pr-[20vw]"
          style={{ x }}
        >
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              isExpanded={expandedId === service.id}
              onExpand={setExpandedId}
              onClose={() => setExpandedId(null)}
            />
          ))}

          {/* CTA Card */}
          <motion.div
            className="shrink-0 w-[280px] h-[380px] flex items-center justify-center rounded-2xl border border-dashed border-white/20 bg-white/5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="text-center px-6">
              <h3 className="font-montserrat text-xl font-bold text-white mb-3">
                Ready to grow?
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                Let's elevate your brand together.
              </p>
              <motion.button
                className="px-6 py-3 rounded-full text-sm font-medium text-white bg-[#4900f4]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Get in Touch
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Progress */}
        <div className="absolute bottom-8 left-8 md:left-16 flex items-center gap-3">
          <div className="w-24 h-0.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#4900f4] rounded-full"
              style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
            />
          </div>
          <span className="text-white/40 text-xs">Scroll</span>
        </div>
      </div>
    </section>
  );
}
