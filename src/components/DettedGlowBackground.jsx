import { useEffect, useRef, useState } from "react";

export default function DettedGlowBackground({ children }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseMove = (event) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      setMousePosition({ x, y });
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-full min-h-screen bg-black overflow-hidden"
    >
      {/* Dot Pattern */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#333 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Mouse Glow Follower */}
      <div
        className="absolute z-0 pointer-events-none rounded-full blur-[100px] opacity-50 bg-blue-500"
        style={{
          width: "400px",
          height: "400px",
          left: mousePosition.x - 200,
          top: mousePosition.y - 200,
          transition: "transform 0.1s ease-out", // Smooth movement
        }}
      />

      {/* Content wrapper */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
