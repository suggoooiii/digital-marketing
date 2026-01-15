import React, { useState } from "react";
import logoImg from "/images/kaymarklogog.png";

const cx = (...classes) => classes.filter(Boolean).join(" ");

const ChevronDown = () => (
  <svg
    className="h-4 w-4 transition-transform group-hover:rotate-180"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

const BoltIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
    <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
  </svg>
);

export default function Navbar({ active = "top", onJump, onContactOpen }) {
  const [openDropdown, setOpenDropdown] = useState(null);

  const navItems = [
    { label: "Home", id: "home" },
    {
      label: "Services",
      id: "services",
      hasDropdown: true,
      badge: "NEW",
      items: [
        { label: "Social Media Ads", id: "social-ads" },
        { label: "Photography", id: "photography" },
        { label: "Management", id: "management" },
      ],
    },
    {
      label: "Resources",
      id: "resources",
      hasDropdown: true,
      items: [
        { label: "Case Studies", id: "case-studies" },
        { label: "Blog", id: "blog" },
      ],
    },
    { label: "Blog", id: "blog" },
  ];

  return (
    <div className="fixed left-0 right-0 top-0 z-50 px-4 py-4">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between rounded-full border border-white/10 bg-[#0a0a0f]/80 px-4 py-2 backdrop-blur-xl">
          {/* Logo */}
          <button
            onClick={() => onJump?.("top")}
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <img src={logoImg} alt="Kay Agency" className="h-8 w-auto" />
          </button>

          {/* Center Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() =>
                  item.hasDropdown && setOpenDropdown(item.id)
                }
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  onClick={() => !item.hasDropdown && onJump?.(item.id)}
                  className={cx(
                    "group flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    active === item.id
                      ? "text-white"
                      : "text-gray-400 hover:text-white"
                  )}
                >
                  {item.label}
                  {item.hasDropdown && <ChevronDown />}
                  {item.badge && (
                    <span className="ml-1 rounded bg-[#c8ff00] px-1.5 py-0.5 text-[10px] font-bold text-black">
                      {item.badge}
                    </span>
                  )}
                </button>

                {/* Dropdown */}
                {item.hasDropdown && openDropdown === item.id && (
                  <div className="absolute left-0 top-full pt-2">
                    <div className="min-w-[180px] rounded-xl border border-white/10 bg-[#0a0a0f]/95 p-2 backdrop-blur-xl">
                      {item.items.map((subItem) => (
                        <button
                          key={subItem.id}
                          onClick={() => {
                            onJump?.(subItem.id);
                            setOpenDropdown(null);
                          }}
                          className="w-full rounded-lg px-3 py-2 text-left text-sm text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
                        >
                          {subItem.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <button
            onClick={() => onContactOpen?.()}
            className="flex items-center gap-2 rounded-full bg-[#4900f4] px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-[#5a1fff] hover:shadow-[0_0_20px_rgba(73,0,244,0.4)]"
          >
            <BoltIcon />
            Connect with us
          </button>
        </div>
      </div>
    </div>
  );
}
