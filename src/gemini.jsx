import React, { useState, useRef, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  useLocation,
} from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  Users,
  Mail,
  Menu,
  X,
  CheckCircle,
  ArrowUpRight,
  TrendingUp,
  Globe,
  Smartphone,
  Search,
} from "lucide-react";

// --- MOCK DATA ---
const SERVICES = [
  {
    id: 1,
    title: "Paid Advertising",
    description:
      "Data-driven campaigns across Meta, Google, and TikTok that scale revenue, not just clicks.",
    icon: <BarChart3 className="w-8 h-8 text-blue-400" />,
  },
  {
    id: 2,
    title: "SEO & Content",
    description:
      "Dominating search results with technical precision and storytelling that converts visitors.",
    icon: <Search className="w-8 h-8 text-purple-400" />,
  },
  {
    id: 3,
    title: "Web Experience",
    description:
      "Award-winning design and development focused on speed, aesthetics, and conversion rate optimization.",
    icon: <Globe className="w-8 h-8 text-pink-400" />,
  },
  {
    id: 4,
    title: "Lifecycle Marketing",
    description:
      "Email and SMS retention strategies that turn one-time buyers into lifetime advocates.",
    icon: <Users className="w-8 h-8 text-cyan-400" />,
  },
];

const METRICS = [
  { label: "ROAS Average", value: "+212%" },
  { label: "CAC Reduction", value: "-38%" },
  { label: "Client Revenue", value: "$500M+" },
  { label: "Retention Rate", value: "94%" },
];

const CASE_STUDIES = [
  {
    id: 1,
    client: "Nebula Tech",
    category: "SaaS Growth",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    stat: "+150% ARR",
  },
  {
    id: 2,
    client: "Velvet & Oak",
    category: "E-Commerce",
    image:
      "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2500&auto=format&fit=crop",
    stat: "4.5x ROAS",
  },
  {
    id: 3,
    client: "Aura Stream",
    category: "Mobile App",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop",
    stat: "1M+ Downloads",
  },
];

const TESTIMONIALS = [
  {
    id: 1,
    text: "NovaGrowth didn't just run ads; they completely re-engineered our funnel. The results were immediate and undeniable.",
    author: "Elena R., CMO at TechFlow",
    role: "Series B SaaS",
  },
  {
    id: 2,
    text: "The level of design and technical execution is unmatched. They treat our brand like it's their own.",
    author: "Marcus J., Founder",
    role: "Lifestyle Brand",
  },
];

// --- UTILS ---
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- ANIMATION COMPONENTS (Native CSS/React) ---

const Reveal = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const style = {
    transitionDelay: `${delay}s`,
  };

  return (
    <div
      ref={ref}
      style={style}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${className}`}
    >
      {children}
    </div>
  );
};

// --- UI COMPONENTS ---

const Button = ({
  children,
  variant = "primary",
  className = "",
  to,
  ...props
}) => {
  const baseClasses =
    "relative inline-flex items-center justify-center px-8 py-4 font-semibold tracking-wide transition-all duration-300 rounded-full group overflow-hidden";

  const variants = {
    primary:
      "bg-white text-black hover:bg-gray-200 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]",
    secondary:
      "bg-transparent border border-white/20 text-white hover:bg-white/10 hover:border-white/40",
    glow: "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-purple-500/50",
  };

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  if (to) {
    return (
      <Link
        to={to}
        className={`${baseClasses} ${variants[variant]} ${className}`}
        {...props}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {content}
    </button>
  );
};

const Section = ({ children, className = "", id = "" }) => (
  <section
    id={id}
    className={`relative px-6 py-20 md:py-32 w-full max-w-7xl mx-auto ${className}`}
  >
    {children}
  </section>
);

// --- LAYOUT COMPONENTS ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    setVisible(true); // Trigger fade in on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Services", path: "/services" },
    { name: "Work", path: "/work" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 transform ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      } ${
        scrolled
          ? "bg-black/80 backdrop-blur-md border-b border-white/5 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold tracking-tighter flex items-center gap-2"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold">N</span>
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            NovaGrowth
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-white ${
                  isActive ? "text-white" : "text-gray-400"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <Button
            variant="primary"
            to="/contact"
            className="!py-2 !px-5 text-sm"
          >
            Book Audit
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full h-screen bg-black/95 backdrop-blur-xl p-6 flex flex-col gap-6 md:hidden">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-2xl font-bold text-gray-300 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Button variant="glow" to="/contact" onClick={() => setIsOpen(false)}>
            Get Started
          </Button>
        </div>
      )}
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-zinc-950 border-t border-white/10 pt-20 pb-10">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-2">
          <div className="text-2xl font-bold mb-6 flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-500 to-purple-600"></div>
            NovaGrowth
          </div>
          <p className="text-gray-400 max-w-sm mb-6">
            Performance marketing and design that prints revenue. We help
            ambitious brands scale faster than their competition.
          </p>
          <div className="flex gap-4">
            {/* Social placeholders */}
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
              <Globe size={18} className="text-gray-400" />
            </div>
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
              <Mail size={18} className="text-gray-400" />
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Company</h4>
          <ul className="space-y-4 text-gray-400">
            <li>
              <Link
                to="/services"
                className="hover:text-white transition-colors"
              >
                Services
              </Link>
            </li>
            <li>
              <Link to="/work" className="hover:text-white transition-colors">
                Work
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-white transition-colors"
              >
                Careers
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Legal</h4>
          <ul className="space-y-4 text-gray-400">
            <li>
              <span className="cursor-pointer hover:text-white transition-colors">
                Privacy Policy
              </span>
            </li>
            <li>
              <span className="cursor-pointer hover:text-white transition-colors">
                Terms of Service
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p>© 2024 NovaGrowth Agency. All rights reserved.</p>
        <p>Designed for Excellence.</p>
      </div>
    </div>
  </footer>
);

// --- PAGES ---

const Home = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <div className="relative min-h-screen flex items-center pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-zinc-950/0 to-zinc-950/0 pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-10">
            <div
              className={`inline-block px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium mb-6 transition-all duration-1000 transform ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              🚀 Scaling Brands to $50M+
            </div>
            <h1
              className={`text-5xl md:text-7xl font-bold tracking-tight mb-8 text-white leading-[1.1] transition-all duration-1000 delay-100 transform ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              Growth that <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                prints revenue.
              </span>
            </h1>
            <p
              className={`text-xl text-gray-400 mb-8 max-w-lg leading-relaxed transition-all duration-1000 delay-200 transform ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              We combine data-driven performance marketing with award-winning
              creative to scale your business faster than the competition.
            </p>
            <div
              className={`flex flex-wrap gap-4 transition-all duration-1000 delay-300 transform ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <Button variant="primary" to="/work">
                View Our Work <ArrowRight size={18} />
              </Button>
              <Button variant="secondary" to="/services">
                Our Services
              </Button>
            </div>

            <div
              className={`mt-12 flex gap-8 border-t border-white/10 pt-8 transition-all duration-1000 delay-500 transform ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              {METRICS.slice(0, 3).map((m, i) => (
                <div key={i}>
                  <div className="text-3xl font-bold text-white mb-1">
                    {m.value}
                  </div>
                  <div className="text-sm text-gray-500">{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`relative hidden lg:block transition-all duration-1000 delay-300 transform ${
              mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-blue-900/20">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2370&auto=format&fit=crop"
                alt="Analytics Dashboard"
                className="w-full h-auto object-cover"
              />
              {/* Floating UI Card Mockup */}
              <div className="absolute bottom-8 left-8 right-8 bg-black/60 backdrop-blur-md p-6 rounded-xl border border-white/10 z-20">
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">
                      Total Revenue
                    </div>
                    <div className="text-2xl font-bold text-white">
                      $2,845,000
                    </div>
                  </div>
                  <div className="flex items-center text-green-400 text-sm font-medium bg-green-400/10 px-2 py-1 rounded">
                    <TrendingUp size={14} className="mr-1" /> +124%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Preview */}
      <Section className="bg-zinc-950">
        <Reveal>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Our Expertise
              </h2>
              <p className="text-gray-400 max-w-md">
                Comprehensive growth solutions designed for the modern digital
                landscape.
              </p>
            </div>
            <Button variant="secondary" to="/services" className="mt-6 md:mt-0">
              All Services
            </Button>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, i) => (
            <Reveal key={service.id} delay={i * 0.1}>
              <div className="group p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 h-full">
                <div className="mb-6 p-3 rounded-lg bg-white/5 w-fit group-hover:bg-blue-600/20 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
                <div className="flex items-center text-sm font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-300">
                  Learn more <ArrowRight size={14} className="ml-2" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Selected Work */}
      <Section>
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-16 text-center">
            Recent Wins
          </h2>
        </Reveal>

        <div className="space-y-24">
          {CASE_STUDIES.map((study, i) => (
            <div
              key={study.id}
              className={`flex flex-col ${
                i % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
              } gap-12 items-center`}
            >
              <div className="w-full lg:w-1/2">
                <Reveal>
                  <div className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                    <img
                      src={study.image}
                      alt={study.client}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </Reveal>
              </div>
              <div className="w-full lg:w-1/2">
                <Reveal delay={0.2}>
                  <div className="text-blue-400 font-medium mb-4">
                    {study.category}
                  </div>
                  <h3 className="text-4xl font-bold text-white mb-6">
                    {study.client}
                  </h3>
                  <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 mb-8">
                    {study.stat}
                  </div>
                  <Button variant="secondary" to="/work">
                    Read Case Study
                  </Button>
                </Reveal>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Social Proof */}
      <Section className="bg-zinc-900/50 rounded-3xl my-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.2}>
              <div className="relative">
                <div className="text-6xl text-blue-500/20 font-serif absolute -top-8 -left-4">
                  "
                </div>
                <p className="text-xl md:text-2xl text-white font-medium mb-6 relative z-10">
                  {t.text}
                </p>
                <div>
                  <div className="text-white font-bold">{t.author}</div>
                  <div className="text-gray-500 text-sm">{t.role}</div>
                </div>
              </div>
              ,
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <div className="py-32 text-center">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
            Ready to scale?
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-10 text-lg">
            Stop guessing with your marketing budget. Let's build a strategy
            that actually converts.
          </p>
          <Button variant="glow" to="/contact" className="text-lg px-10 py-5">
            Get Your Free Audit
          </Button>
        </Reveal>
      </div>
    </div>
  );
};

const ServicesPage = () => (
  <div className="pt-32 pb-20">
    <Section>
      <Reveal>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8">
          Our Services
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mb-20">
          We don't do "everything". We do the four things that actually drive
          revenue for modern brands.
        </p>
      </Reveal>

      <div className="grid gap-8">
        {SERVICES.map((service, i) => (
          <Reveal key={service.id} delay={i * 0.1}>
            <div className="bg-white/5 border border-white/5 p-8 md:p-12 rounded-2xl flex flex-col md:flex-row gap-8 items-start md:items-center group hover:bg-white/[0.07] transition-colors">
              <div className="p-4 rounded-xl bg-black/40 text-blue-400 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-lg">{service.description}</p>
              </div>
              <div className="w-full md:w-auto">
                <ul className="space-y-2 text-gray-500 text-sm">
                  <li className="flex items-center">
                    <CheckCircle size={14} className="mr-2 text-green-500" />{" "}
                    Strategy
                  </li>
                  <li className="flex items-center">
                    <CheckCircle size={14} className="mr-2 text-green-500" />{" "}
                    Execution
                  </li>
                  <li className="flex items-center">
                    <CheckCircle size={14} className="mr-2 text-green-500" />{" "}
                    Reporting
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  </div>
);

const WorkPage = () => (
  <div className="pt-32 pb-20">
    <Section>
      <Reveal>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8">Work</h1>
        <p className="text-xl text-gray-400 max-w-2xl mb-20">
          Results speak louder than slides. Here's how we've helped our partners
          dominate their markets.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {CASE_STUDIES.map((study, i) => (
          <Reveal key={study.id} delay={i * 0.1}>
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl aspect-video mb-6">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                <img
                  src={study.image}
                  alt={study.client}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full z-20">
                  {study.category}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {study.client}
              </h3>
              <p className="text-gray-400 text-lg mb-4">
                Achieved{" "}
                <span className="text-white font-semibold">{study.stat}</span>{" "}
                within 90 days.
              </p>
              <div className="flex items-center text-sm font-bold text-white/50 group-hover:text-white transition-colors">
                View Case Study <ArrowUpRight size={16} className="ml-1" />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  </div>
);

const AboutPage = () => (
  <div className="pt-32 pb-20">
    <Section>
      <Reveal>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8">
          About Us
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mb-20">
          We are a team of data scientists, creatives, and strategists obsessed
          with one thing: Growth.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
        <Reveal>
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
            alt="Team"
            className="rounded-2xl border border-white/10"
          />
        </Reveal>
        <Reveal delay={0.2}>
          <h3 className="text-3xl font-bold text-white mb-6">
            Not your average agency.
          </h3>
          <p className="text-gray-400 mb-6 leading-relaxed">
            Most agencies care about deliverables. We care about outcomes.
            Founded in 2020, NovaGrowth was built to bridge the gap between
            creative storytelling and hard-core performance analytics.
          </p>
          <p className="text-gray-400 leading-relaxed">
            We don't outsource. We don't use interns on key accounts. When you
            work with us, you work with senior experts who have scaled brands
            from zero to IPO.
          </p>
        </Reveal>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-white/10 py-16">
        {METRICS.map((m, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {m.value}
              </div>
              <div className="text-gray-500 text-sm">{m.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  </div>
);

const ContactPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
  };

  return (
    <div className="pt-32 pb-20">
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <Reveal>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8">
              Let's Talk.
            </h1>
            <p className="text-xl text-gray-400 mb-12">
              Ready to scale? Fill out the form and our strategists will be in
              touch within 24 hours.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/5 rounded-lg text-blue-400">
                  <Mail />
                </div>
                <div>
                  <div className="text-white font-semibold">Email Us</div>
                  <div className="text-gray-400">hello@novagrowth.agency</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/5 rounded-lg text-purple-400">
                  <Smartphone />
                </div>
                <div>
                  <div className="text-white font-semibold">Call Us</div>
                  <div className="text-gray-400">+1 (555) 000-1234</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/5 rounded-lg text-pink-400">
                  <Users />
                </div>
                <div>
                  <div className="text-white font-semibold">Visit Us</div>
                  <div className="text-gray-400">
                    123 Growth Blvd, New York, NY
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <form
              onSubmit={handleSubmit}
              className="bg-white/5 border border-white/10 p-8 rounded-2xl space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">First Name</label>
                  <input
                    type="text"
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 outline-none transition-colors"
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Last Name</label>
                  <input
                    type="text"
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 outline-none transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Email Address</label>
                <input
                  type="email"
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 outline-none transition-colors"
                  placeholder="john@company.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">
                  Service Interest
                </label>
                <select className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 outline-none transition-colors">
                  <option>Paid Advertising</option>
                  <option>SEO & Content</option>
                  <option>Web Experience</option>
                  <option>Strategy Audit</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Message</label>
                <textarea
                  rows="4"
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 outline-none transition-colors"
                  placeholder="Tell us about your goals..."
                ></textarea>
              </div>
              <Button variant="glow" className="w-full justify-center">
                Send Message
              </Button>
            </form>
          </Reveal>
        </div>
      </Section>
    </div>
  );
};

// --- APP ROOT ---

const AppContent = () => {
  return (
    <div className="bg-zinc-950 min-h-screen text-slate-200 selection:bg-blue-500/30 font-sans">
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
