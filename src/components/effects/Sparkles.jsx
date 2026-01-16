import { useEffect, useRef, useState } from "react";

// Sparkles particle component
const SparklesCore = ({
  background = "transparent",
  minSize = 0.4,
  maxSize = 1.4,
  particleDensity = 1200,
  particleColor = "#FFFFFF",
  className = "",
}) => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const particles = [];

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
        canvas.width = width;
        canvas.height = height;
      }
    });

    resizeObserver.observe(canvas.parentElement);

    // Create particles
    const createParticles = () => {
      const particleCount = Math.floor(
        (dimensions.width * dimensions.height) / particleDensity
      );

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * dimensions.width,
          y: Math.random() * dimensions.height,
          size: Math.random() * (maxSize - minSize) + minSize,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random(),
          opacitySpeed: (Math.random() - 0.5) * 0.01,
        });
      }
    };

    // Animation loop
    const animate = () => {
      if (!ctx) return;

      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      particles.forEach((particle) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Update opacity (twinkling effect)
        particle.opacity += particle.opacitySpeed;
        if (particle.opacity <= 0.1 || particle.opacity >= 1) {
          particle.opacitySpeed *= -1;
        }

        // Wrap around edges
        if (particle.x < 0) particle.x = dimensions.width;
        if (particle.x > dimensions.width) particle.x = 0;
        if (particle.y < 0) particle.y = dimensions.height;
        if (particle.y > dimensions.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    if (dimensions.width > 0 && dimensions.height > 0) {
      particles.length = 0;
      createParticles();
      animate();
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [
    dimensions.width,
    dimensions.height,
    minSize,
    maxSize,
    particleDensity,
    particleColor,
  ]);

  return (
    <canvas ref={canvasRef} style={{ background }} className={className} />
  );
};

// Main Sparkles component with the full layout
export default function Sparkles({ text = "Kay Agency" }) {
  const [particleColor, setParticleColor] = useState("#FFFFFF");

  // Check for dark mode (you can adjust this based on your theme system)
  useEffect(() => {
    const isDark =
      document.documentElement.classList.contains("dark") ||
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    setParticleColor(isDark ? "#FFFFFF" : "#FFFFFF"); // Keep white for dark bg
  }, []);

  return (
    <div className="flex h-[40rem] w-full flex-col items-center justify-center overflow-hidden rounded-md bg-black">
      <h1 className="relative z-20 text-center text-3xl font-bold text-white md:text-7xl lg:text-9xl">
        {text}
      </h1>

      <div className="relative h-40 w-[40rem] max-w-full px-4">
        {/* Gradient lines */}
        <div className="absolute inset-x-20 top-0 h-[2px] w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm" />
        <div className="absolute inset-x-20 top-0 h-px w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        <div className="absolute inset-x-60 top-0 h-[5px] w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent blur-sm" />
        <div className="absolute inset-x-60 top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent" />

        {/* Sparkles canvas */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={3.4}
          particleDensity={1200}
          particleColor={particleColor}
          className="h-full w-full"
        />

        {/* Mask overlay */}
        <div className="absolute inset-0 h-full w-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]" />
      </div>
    </div>
  );
}

// Export SparklesCore separately if needed
export { SparklesCore };
