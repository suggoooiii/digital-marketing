import React from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";

const MessageIcon = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
);

export default function FloatingContactButton({ onClick }) {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [100, 300], [0, 1]);
  const scale = useTransform(scrollY, [100, 300], [0.8, 1]);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <motion.button
        onClick={onClick}
        style={{ opacity, scale }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#4900f4] text-white shadow-lg transition-colors hover:bg-[#5a1fff] hover:shadow-[0_0_30px_rgba(73,0,244,0.5)]"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Contact us"
      >
        <MessageIcon />

        {/* Ping animation */}
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4900f4] opacity-20" />
      </motion.button>
    </div>
  );
}
