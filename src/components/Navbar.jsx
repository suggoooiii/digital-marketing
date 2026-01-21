import React, { useState, useEffect } from "react";
import logoImg from "/images/kaymarklogog.png";

const cx = (...classes) => classes.filter(Boolean).join(" ");

const BoltIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
    <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
  </svg>
);

const MenuIcon = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

export default function Navbar({ onContactOpen }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { label: "Home", id: "home" },
    { label: "Services", id: "services" },
    { label: "About Us", id: "about" },
  ];

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => ({
        id: item.id,
        element: document.getElementById(item.id),
      }));

      const scrollPosition = window.scrollY + 150; // Offset for navbar height

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const offsetTop = section.element.offsetTop;
          if (scrollPosition >= offsetTop) {
            setActiveSection(section.id);
            return;
          }
        }
      }
      setActiveSection("home");
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="fixed left-0 right-0 top-0 z-50 px-4 py-4">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between rounded-full border border-white/10 bg-[#0a0a0f]/80 px-4 py-2 backdrop-blur-xl">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <img src={logoImg} alt="Kay Agency" className="h-8 w-auto" />
          </button>

          {/* Desktop Navigation - Floating Pills */}
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cx(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
                  activeSection === item.id
                    ? "bg-white/10 text-white shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                    : "text-gray-400 hover:bg-white/5 hover:text-white",
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right side: CTA + Mobile menu */}
          <div className="flex items-center gap-2">
            {/* CTA Button */}
            <button
              onClick={() => onContactOpen?.()}
              className="flex items-center gap-2 rounded-full bg-[#4900f4] px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-[#5a1fff] hover:shadow-[0_0_20px_rgba(73,0,244,0.4)]"
            >
              <BoltIcon />
              <span className="hidden sm:inline">Connect with us</span>
              <span className="sm:hidden">Contact</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-white/5 hover:text-white md:hidden"
            >
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="mt-2 rounded-2xl border border-white/10 bg-[#0a0a0f]/95 p-2 backdrop-blur-xl md:hidden">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cx(
                  "w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition-all duration-300",
                  activeSection === item.id
                    ? "bg-white/10 text-white shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                    : "text-gray-400 hover:bg-white/5 hover:text-white",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
