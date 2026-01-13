import {
  useScroll,
  useTransform,
  motion,
  useSpring,
  useInView,
  AnimatePresence,
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
        "Meta Ads (Facebook & Instagram) campaigns to increase awareness, engagement, and customer acquisition",
        "Google Ads campaigns targeting high-purchasing-power audiences",
        "TikTok Ads for viral content and wide reach",
        "LinkedIn Ads targeting the B2B sector",
        "Campaign optimization through A/B testing and audience analysis to achieve higher efficiency and better ad spend",
      ],
    },
    accent: "#f400a1",
  },
  {
    id: 3,
    title: "Content Creation (Photos & Videos)",
    subtitle: "Visual Storytelling",
    content:
      "Professional video production and photography services tailored for ads, campaigns, and social media content.",
    expandedContent: {
      description:
        "From concept to final cut, we produce compelling visual content that captures attention and tells your brand's story effectively.",
      features: [
        "Professional video production (ads, campaigns, client testimonials)",
        "Short-form, trend-driven content production (Reels & TikTok)",
        "Daily lifestyle photography for restaurants and products",
        "End-to-end production from copywriting and shooting to editing and post-production",
      ],
    },
    accent: "#00d4aa",
  },
  {
    id: 4,
    title: "Creative Design & Brand Identity",
    subtitle: "Visual Excellence",
    content:
      "Complete brand identity development and creative design services to establish a consistent, memorable visual presence.",
    expandedContent: {
      description:
        "We craft distinctive visual identities and creative designs that make your brand stand out and resonate with your target audience.",
      features: [
        "Developing a complete visual brand identity (logos, typography, and colors)",
        "Creative designs for advertising campaigns and social media posts",
        "Packaging and product label design",
        "Maintaining a unified and consistent visual style across all platforms",
      ],
    },
    accent: "#ff6b35",
  },
  {
    id: 5,
    title: "Print Solutions",
    subtitle: "Tangible Impact",
    content:
      "High-quality digital and offset printing services for all your branding and marketing materials.",
    expandedContent: {
      description:
        "Premium printing solutions that bring your brand to life in the physical world, from business essentials to large-format displays.",
      features: [
        "High-quality digital and offset printing services",
        "Large-format printing (banners, roll-ups, posters, and signage)",
        "Business printing (business cards, brochures, flyers, catalogs)",
        "Branding materials (stickers, packaging, labels, and promotional items)",
        "Indoor and outdoor signage with durable, premium finishes",
        "Customized print solutions tailored to brand identity and campaign needs",
      ],
    },
    accent: "#ffd700",
  },
  {
    id: 6,
    title: "Event Management & Activation",
    subtitle: "Memorable Experiences",
    content:
      "End-to-end event planning and brand activations that create engaging, unforgettable experiences.",
    expandedContent: {
      description:
        "We design and execute impactful events and activations that connect your brand with audiences in meaningful, memorable ways.",
      features: [
        "End-to-end event planning and execution",
        "Corporate events, product launches, exhibitions, and brand activations",
        "Booth and stand design with full branding setup",
        "On-site branding (backdrops, banners, screens, and printed materials)",
        "Coordination with vendors, logistics, and event timelines",
        "Creative concepts to deliver engaging and memorable brand experiences",
      ],
    },
    accent: "#9945FF",
  },
];

const ServiceCard = ({
  service,
  index,
  isExpanded,
  isBlurred,
  onExpand,
  onClose,
}) => {
  const cardRef = useRef(null);

  const handleClick = () => {
    if (isExpanded) {
      onClose();
    } else {
      // This will expand this card (and implicitly close any other expanded card)
      onExpand(service.id);

      // Scroll the card into view
      setTimeout(() => {
        if (cardRef.current) {
          cardRef.current.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          });
        }
      }, 100);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative shrink-0 cursor-pointer transition-all duration-500 ${
        isExpanded
          ? "w-[85vw] md:w-[70vw] lg:w-[60vw]"
          : "w-[85vw] md:w-[45vw] lg:w-[35vw]"
      }`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      onClick={handleClick}
      style={{
        filter: isBlurred ? "blur(8px)" : "blur(0px)",
        opacity: isBlurred ? 0.3 : 1,
      }}
    >
      <motion.div
        className={`relative w-full rounded-3xl overflow-hidden bg-[#0a0a0a] border transition-all duration-500 ${
          isExpanded
            ? "border-white/30 h-auto min-h-[70vh]"
            : "border-white/10 hover:border-white/30 hover:scale-[1.02] h-[70vh]"
        }`}
      >
        {/* Background Gradient */}
        <div
          className="absolute inset-0 opacity-20 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 30% 20%, ${service.accent}40 0%, transparent 50%)`,
          }}
        />

        {/* Number Badge - always absolute positioned */}
        <div
          className="absolute top-6 left-6 w-12 h-12 rounded-full border-2 transition-all duration-300 flex items-center justify-center z-20 bg-[#0a0a0a]"
          style={{ borderColor: service.accent, color: service.accent }}
        >
          <span className="text-lg font-bold">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Close Button - only show when expanded */}
        <AnimatePresence>
          {isExpanded && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-20"
            >
              ✕
            </motion.button>
          )}
        </AnimatePresence>

        {/* Content */}
        <div
          className={`flex flex-col p-8 md:p-10 ${
            isExpanded
              ? "relative pt-28 md:pt-28"
              : "absolute bottom-0 left-0 right-0"
          }`}
        >
          <motion.span
            className={`text-sm uppercase tracking-widest mb-2 font-medium ${
              isExpanded ? "ml-16" : ""
            }`}
            style={{ color: service.accent }}
          >
            {service.subtitle}
          </motion.span>

          <h3
            className={`font-montserrat text-2xl md:text-3xl font-bold text-white mb-4 leading-tight ${
              isExpanded ? "" : "min-h-[4.5rem] md:min-h-[5rem]"
            }`}
          >
            {service.title}
          </h3>

          <AnimatePresence mode="wait">
            {isExpanded ? (
              <motion.div
                key="expanded"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Description */}
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  {service.expandedContent.description}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-4">
                    What's included:
                  </h4>
                  <ul className="space-y-3">
                    {service.expandedContent.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-3 text-gray-400"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <span
                          className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                          style={{ backgroundColor: service.accent }}
                        />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <motion.button
                  className="px-8 py-4 rounded-full text-base font-semibold text-white transition-all duration-300"
                  style={{ backgroundColor: service.accent }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  Get Started →
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="collapsed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="text-gray-400 text-base leading-relaxed mb-6 line-clamp-2">
                  {service.content}
                </p>

                <div className="self-start inline-block px-6 py-3 rounded-full text-sm font-semibold text-white border border-white/20 bg-white/5 backdrop-blur-sm">
                  Click to expand →
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Decorative glow */}
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] opacity-30"
          style={{ backgroundColor: service.accent }}
        />

        {/* Corner Accent */}
        <div
          className="absolute bottom-0 right-0 w-32 h-32 opacity-20"
          style={{
            background: `linear-gradient(135deg, transparent 50%, ${service.accent} 50%)`,
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default function Services() {
  const containerRef = useRef(null);
  const targetRef = useRef(null);
  const [expandedId, setExpandedId] = useState(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(services.length - 1) * 37}%`]
  );

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setExpandedId(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-black">
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
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              isExpanded={expandedId === service.id}
              isBlurred={expandedId !== null && expandedId !== service.id}
              onExpand={setExpandedId}
              onClose={() => setExpandedId(null)}
            />
          ))}

          {/* End Card - CTA */}
          <motion.div
            className={`shrink-0 w-[85vw] md:w-[45vw] lg:w-[35vw] h-[70vh] flex items-center justify-center transition-all duration-500 ${
              expandedId !== null ? "blur-sm opacity-30" : ""
            }`}
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
                className="px-8 py-4 rounded-full text-base font-semibold text-white bg-[#4900f4] hover:bg-[#5a1fff] transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
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
