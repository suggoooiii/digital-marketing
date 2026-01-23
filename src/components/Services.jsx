import {
  useScroll,
  useTransform,
  motion,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";

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

// Modal Sheet Component for expanded service details
const ServiceModal = ({ service, onClose }) => {
  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleGetStarted = () => {
    onClose();
    // Dispatch custom event to open contact form
    window.dispatchEvent(new CustomEvent("openContactForm"));
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal Content */}
      <motion.div
        className="relative w-full md:w-auto md:max-w-lg md:mx-4 bg-[#111] border border-white/10 rounded-t-3xl md:rounded-2xl overflow-hidden max-h-[85vh] md:max-h-[80vh]"
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag indicator for mobile */}
        <div className="md:hidden flex justify-center py-3">
          <div className="w-10 h-1 rounded-full bg-white/20" />
        </div>

        {/* Accent gradient */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${service.accent}50 0%, transparent 60%)`,
          }}
        />

        <div className="relative p-6 overflow-y-auto max-h-[calc(85vh-20px)] md:max-h-[calc(80vh-20px)]">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl"
              style={{ backgroundColor: `${service.accent}20` }}
            >
              {service.icon}
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Subtitle */}
          <span
            className="text-xs uppercase tracking-widest font-medium"
            style={{ color: service.accent }}
          >
            {service.subtitle}
          </span>

          {/* Title */}
          <h3 className="font-['Gambarino'] text-2xl text-white mt-2 mb-4">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            {service.expandedContent.description}
          </p>

          {/* Features */}
          <ul className="space-y-3 mb-8">
            {service.expandedContent.features.map((feature, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-3 text-gray-300 text-sm"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <span
                  className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                  style={{ backgroundColor: service.accent }}
                />
                {feature}
              </motion.li>
            ))}
          </ul>

          {/* CTA Button */}
          <motion.button
            className="w-full py-3.5 rounded-xl text-sm font-medium text-white"
            style={{ backgroundColor: service.accent }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGetStarted}
          >
            Get Started →
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Desktop Card Component (for horizontal scroll)
const DesktopServiceCard = ({ service, index, onExpand }) => {
  return (
    <motion.div
      className="relative shrink-0 cursor-pointer w-[300px] h-[400px]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true }}
      onClick={() => onExpand(service)}
    >
      <motion.div
        className="relative h-full overflow-hidden rounded-2xl bg-[#111] border border-white/10 transition-colors duration-300"
        whileHover={{ y: -8, borderColor: "rgba(255,255,255,0.3)" }}
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
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
            style={{ backgroundColor: `${service.accent}20` }}
          >
            {service.icon}
          </div>

          {/* Subtitle */}
          <span
            className="text-xs uppercase tracking-widest font-medium mb-2"
            style={{ color: service.accent }}
          >
            {service.subtitle}
          </span>

          {/* Title */}
          <h3 className="font-['Gambarino'] text-xl text-white mb-3 leading-tight">
            {service.title}
          </h3>

          {/* Content */}
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
        </div>

        {/* Number badge */}
        <div className="absolute bottom-4 right-4 text-4xl font-bold opacity-5 text-white">
          {String(index + 1).padStart(2, "0")}
        </div>
      </motion.div>
    </motion.div>
  );
};

// Mobile Card Component (for vertical layout)
const MobileServiceCard = ({ service, index, onExpand }) => {
  return (
    <motion.div
      className="relative cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true, margin: "-50px" }}
      onClick={() => onExpand(service)}
    >
      <div className="relative overflow-hidden rounded-xl bg-[#111] border border-white/10 active:border-white/20 transition-colors">
        {/* Accent gradient */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background: `linear-gradient(135deg, ${service.accent}50 0%, transparent 60%)`,
          }}
        />

        <div className="relative p-5 flex gap-4">
          {/* Icon */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
            style={{ backgroundColor: `${service.accent}20` }}
          >
            {service.icon}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <span
              className="text-[10px] uppercase tracking-widest font-medium"
              style={{ color: service.accent }}
            >
              {service.subtitle}
            </span>
            <h3 className="font-['Gambarino'] text-lg text-white mt-1 leading-tight">
              {service.title}
            </h3>
            <p className="text-gray-500 text-xs leading-relaxed mt-2 line-clamp-2">
              {service.content}
            </p>
          </div>

          {/* Arrow */}
          <div className="flex items-center">
            <span className="text-gray-600 text-lg">→</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Services() {
  const targetRef = useRef(null);
  const containerRef = useRef(null);
  const [selectedService, setSelectedService] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // All hooks MUST be called before any conditional returns
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Calculate dynamic scroll distance based on content width
  // 6 service cards × 300px + gaps + padding
  const totalCardsWidth = 6 * 300 + 5 * 20 + 64;
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -(totalCardsWidth - 1200 + 100)],
  );

  // Check for mobile viewport - must be after all hooks
  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedService(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Mobile Layout - Vertical stacked cards
  if (isMobile) {
    return (
      <section className="relative bg-black py-16 px-4">
        {/* Header */}
        <div className="mb-8">
          <motion.h2
            className="font-['Libre_Baskerville'] text-lg italic text-white/80 tracking-wide"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Our Services
          </motion.h2>
        </div>

        {/* Cards Grid */}
        <div className="flex flex-col gap-4">
          {services.map((service, index) => (
            <MobileServiceCard
              key={service.id}
              service={service}
              index={index}
              onExpand={setSelectedService}
            />
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedService && (
            <ServiceModal
              service={selectedService}
              onClose={() => setSelectedService(null)}
            />
          )}
        </AnimatePresence>
      </section>
    );
  }

  // Desktop Layout - Horizontal scroll
  return (
    <section ref={targetRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {/* Header */}
        <div className="px-8 md:px-16 mb-10">
          <motion.span
            className="font-['Libre_Baskerville'] text-lg md:text-xl italic text-white/80 tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Services
          </motion.span>
        </div>

        {/* Cards */}
        <div ref={containerRef} className="overflow-hidden">
          <motion.div className="flex gap-5 pl-8 md:pl-16" style={{ x }}>
            {services.map((service, index) => (
              <DesktopServiceCard
                key={service.id}
                service={service}
                index={index}
                onExpand={setSelectedService}
              />
            ))}
          </motion.div>
        </div>

        {/* Progress */}
        <div className="absolute bottom-8 left-8 md:left-16 flex items-center gap-3">
          <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#4900f4] rounded-full"
              style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
            />
          </div>
          <span className="text-white/40 text-xs">Scroll to explore</span>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedService && (
          <ServiceModal
            service={selectedService}
            onClose={() => setSelectedService(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
