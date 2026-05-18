import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import {
  Eye,
  Users,
  BarChart3,
  Clock,
  TrendingUp,
  MapPin,
  Footprints,
  ShoppingBag,
  Building2,
  Gem,
  UtensilsCrossed,
  Target,
  UserX,
  FileText,
  Camera,
  Cpu,
  CheckCircle2,
  Wifi,
  Activity,
  Shirt,
  Store,
  Sparkles,
  Zap,
  Shield,
  ArrowRight,
  Menu,
  X,
  ChevronDown,
  Car,
  Heart,
  Glasses,
  Briefcase,
  Package,
  Triangle,
  CreditCard,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { FAQAccordion } from "./components/FAQAccordion";
import { HeroTrackingScene } from "./components/HeroTrackingScene";
import { IndustryCard } from "./components/IndustryCard";
import { LiveDashboardPreview } from "./components/LiveDashboardPreview";
import { MallAnalytics } from "./components/MallAnalytics";
import { RetailProblemViz } from "./components/RetailProblemViz";
import { RetailSceneStripe } from "./components/RetailSceneStripe";

const NAV_DROPDOWNS = [
  {
    label: "Platform",
    items: [
      { name: "Live Dashboard", href: "#dashboard" },
      { name: "Key Features", href: "#features" },
      { name: "Mall Analytics", href: "#mall-analytics" },
      { name: "In-Store Analytics", href: "#analytics" },
      { name: "Hardware & Sensors", href: "#hardware" },
      { name: "Integrations", href: "#integrations" },
    ],
  },
  {
    label: "Industry",
    items: [
      { name: "Fashion & Apparel", href: "#industries" },
      { name: "Shopping Malls", href: "#industries" },
      { name: "Jewellery & Luxury", href: "#industries" },
      { name: "Hospitality & F&B", href: "#industries" },
    ],
  },
  {
    label: "Resources",
    items: [
      { name: "FAQ", href: "#faq" },
      { name: "Testimonials", href: "#testimonials" },
      { name: "Contact", href: "#contact" },
    ],
  },
];

const MOBILE_NAV_LINKS = [
  { name: "Dashboard", href: "#dashboard" },
  { name: "Features", href: "#features" },
  { name: "Mall Analytics", href: "#mall-analytics" },
  { name: "In-Store Analytics", href: "#analytics" },
  { name: "Hardware", href: "#hardware" },
  { name: "Industries", href: "#industries" },
  { name: "Pricing", href: "#pricing" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "FAQ", href: "#faq" },
];

export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    role: "",
    email: "",
    phone: "",
    locations: "",
    industry: "",
    message: "",
    source: "",
  });

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [statsInView, setStatsInView] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const progressScaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you! We'll be in touch shortly.");
    console.log("Form submitted:", formData);
  };

  const brands = [
    { name: "BFL GROUP", icon: Triangle },
    { name: "HealthySpot", icon: Heart },
    { name: "New West KnifeWorks", icon: Package },
    { name: "Inditech Technologies", icon: Briefcase },
    { name: "Optical Retail UAE", icon: Glasses },
    { name: "Galadari Motors", icon: Car },
  ];

  const faqItems = [
    {
      question: "What is a people counting system?",
      answer:
        "A people counting system uses advanced sensors and AI technology to accurately track the number of visitors entering and exiting your retail space in real-time. Our system uses 3D stereo vision to ensure the highest accuracy.",
    },
    {
      question: "How accurate is the Beyond Traffic people counting system?",
      answer:
        "Beyond Traffic achieves 98%+ accuracy using 3D stereo vision technology that filters out carts, shadows, and mannequins, ensuring you get reliable data for critical business decisions.",
    },
    {
      question: "Does it track customer demographics?",
      answer:
        "Yes, our AI-powered system can identify gender, age groups, and even distinguish between individual shoppers and groups, helping you better understand your customer base.",
    },
    {
      question: "Can it integrate with my existing POS system?",
      answer:
        "Absolutely. Beyond Traffic seamlessly integrates with Point of Sale systems to automatically calculate conversion rates and identify peak selling hours.",
    },
    {
      question: "How much does it cost in the UAE?",
      answer:
        "Pricing varies based on the number of locations and features required. Contact us for a customized quote tailored to your business needs.",
    },
    {
      question: "Is it suitable for small businesses?",
      answer:
        "Yes! We offer affordable, easy-to-use solutions specifically designed for independent retailers, boutiques, and SMEs in the UAE.",
    },
    {
      question: "How is the data displayed?",
      answer:
        "All data is accessible through an intuitive web dashboard that shows real-time footfall, historical trends, conversion rates, and more. You can also schedule automated reports.",
    },
    {
      question: "Does it distinguish between staff and customers?",
      answer:
        "Yes, our AI technology can filter out staff movements to ensure your visitor counts only reflect actual customers.",
    },
    {
      question: "What kind of hardware is required?",
      answer:
        "We provide advanced 3D stereo vision sensors that are easy to install. They support multiple heights and offer Wi-Fi and BLE connectivity with remote diagnostics.",
    },
    {
      question: "How long does installation take?",
      answer:
        "Installation is quick and minimally disruptive. Most single-location setups are completed within a few hours, with immediate data collection.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-amber-50 to-yellow-50 relative overflow-x-hidden">
      {/* Animated dot pattern background */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#c084fc_1.5px,transparent_1.5px)] [background-size:40px_40px] animate-[drift_60s_linear_infinite]" />
      </div>

      {/* Floating gradient orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 right-1/4 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-yellow-400/15 rounded-full blur-3xl"
        />
      </div>

      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: progressScaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 z-[60] origin-left shadow-[0_0_12px_rgba(245,158,11,0.6)]"
      />

      {/* Header/Navigation */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-2xl border-b border-gray-200/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
            : "bg-white/70 backdrop-blur-md border-b border-transparent"
        }`}
      >
        <div
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center transition-all duration-300 ${
            scrolled ? "py-2.5" : "py-4"
          }`}
        >
          <motion.a
            href="#"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 group"
          >
            <div
              className={`bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ${
                scrolled ? "w-9 h-9" : "w-10 h-10"
              }`}
            >
              <Eye className={`text-white transition-all ${scrolled ? "w-5 h-5" : "w-6 h-6"}`} />
            </div>
            <span className="text-xl font-black uppercase tracking-tight text-gray-900">
              Beyond Traffic<span className="text-yellow-500">.</span>
            </span>
          </motion.a>

          <nav className="hidden md:flex gap-1 items-center">
            {NAV_DROPDOWNS.map((dropdown) => (
              <div
                key={dropdown.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(dropdown.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className={`px-4 py-2 rounded-full transition-all text-sm font-semibold flex items-center gap-1 uppercase tracking-wide ${
                    activeDropdown === dropdown.label
                      ? "text-yellow-600 bg-yellow-50"
                      : "text-gray-700 hover:text-yellow-600 hover:bg-yellow-50/60"
                  }`}
                >
                  {dropdown.label}
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${
                      activeDropdown === dropdown.label ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {activeDropdown === dropdown.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-full left-0 pt-3 min-w-[280px]"
                    >
                      <div className="bg-white/95 backdrop-blur-2xl border border-gray-200/80 text-gray-900 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] p-2 overflow-hidden">
                        {dropdown.items.map((item, idx) => (
                          <motion.a
                            key={item.name}
                            href={item.href}
                            onClick={() => setActiveDropdown(null)}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.04, duration: 0.2 }}
                            className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl hover:bg-yellow-50 transition-colors group/item"
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                              <span className="font-semibold text-sm group-hover/item:text-yellow-700 transition-colors">
                                {item.name}
                              </span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 group-hover/item:text-yellow-600 transition-all" />
                          </motion.a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            <a
              href="#pricing"
              className="px-4 py-2 text-gray-700 hover:text-yellow-600 hover:bg-yellow-50/60 rounded-full transition-all text-sm font-semibold uppercase tracking-wide"
            >
              Pricing
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="hidden md:flex bg-gradient-to-r from-yellow-500 to-amber-600 text-white px-5 py-2.5 rounded-full hover:shadow-xl hover:shadow-yellow-500/40 transition-shadow duration-300 items-center gap-2 group font-semibold text-sm uppercase tracking-wide"
            >
              Book Demo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-yellow-50 transition-colors"
            >
              <motion.div
                animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-2xl border-b border-gray-200/70 shadow-xl overflow-hidden"
            >
              <div className="px-4 py-5 space-y-1">
                {MOBILE_NAV_LINKS.map((link, idx) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.25 }}
                    className="flex items-center justify-between px-3 py-3 rounded-xl text-gray-800 hover:bg-yellow-50 hover:text-yellow-700 transition-colors font-semibold uppercase tracking-wide text-sm"
                  >
                    {link.name}
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </motion.a>
                ))}
                <motion.a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: MOBILE_NAV_LINKS.length * 0.05, duration: 0.25 }}
                  className="mt-3 w-full bg-gradient-to-r from-yellow-500 to-amber-600 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-yellow-500/30 transition-all flex items-center justify-center gap-2 group font-semibold uppercase tracking-wide text-sm"
                >
                  Book Demo
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section — two-column: text left, dark tracking scene right */}
      <section className="relative pt-6 md:pt-9 pb-8 md:pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-start">
            {/* LEFT — content */}
            <div className="lg:col-span-6 xl:col-span-6 text-left">
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="mb-3 md:mb-4"
              >
                <span className="stori-label">
                  Beyond Traffic &mdash; The Intelligence Platform for Modern Retail
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="mb-4 md:mb-5"
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black leading-[0.95] tracking-tight mb-3 md:mb-4">
                  <motion.span
                    initial={{ opacity: 0, y: 14, letterSpacing: "0.1em" }}
                    animate={{ opacity: 1, y: 0, letterSpacing: "-0.02em" }}
                    transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="block text-gray-900 drop-shadow-sm"
                  >
                    Real-Time Traffic.
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 14, letterSpacing: "0.1em" }}
                    animate={{ opacity: 1, y: 0, letterSpacing: "-0.02em" }}
                    transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="block text-gray-900 drop-shadow-sm"
                  >
                    Real Business Insight,
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 14, letterSpacing: "0.1em" }}
                    animate={{ opacity: 1, y: 0, letterSpacing: "-0.02em" }}
                    transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="block stori-gradient drop-shadow-lg relative"
                  >
                    See Beyond the Crowd!
                    <motion.span
                      className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-500 rounded-full origin-left"
                      style={{ width: "92%" }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                    />
                  </motion.span>
                </h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="text-base md:text-lg lg:text-xl text-gray-700 font-medium"
                >
                  The most intelligent people counting system in the UAE
                </motion.p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm md:text-base text-gray-600 max-w-xl mb-5 md:mb-6 leading-relaxed"
              >
                Transform retail performance with AI-powered traffic intelligence. Track footfall, measure conversion, understand demographics&mdash;all in real-time with 3D stereo vision technology.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="flex gap-3 flex-wrap items-center"
              >
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.04, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="group bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-500 text-white px-7 py-3 md:px-8 md:py-3.5 rounded-full shadow-2xl shadow-yellow-500/40 hover:shadow-yellow-500/60 transition-shadow duration-300 flex items-center gap-2 text-base md:text-lg font-semibold relative overflow-hidden"
                >
                  <span className="relative z-10">Stop Guessing, Start Tracking</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300 relative z-10" />
                </motion.a>
                <motion.a
                  href="#dashboard"
                  whileHover={{ scale: 1.04, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="text-gray-800 px-5 py-3 md:px-6 md:py-3.5 rounded-full border-2 border-gray-200 hover:border-gray-400 transition-colors flex items-center gap-2 text-sm md:text-base font-semibold"
                >
                  See Live Dashboard
                </motion.a>
              </motion.div>

              {/* Trust micro-bar under CTAs */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.85 }}
                className="mt-4 md:mt-6 flex items-center gap-5 text-[11px] md:text-xs font-bold uppercase tracking-widest text-gray-500"
              >
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  50+ UAE Stores Live
                </span>
                <span className="hidden sm:flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                  98% Accuracy
                </span>
                <span className="hidden md:flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  24/7 Monitoring
                </span>
              </motion.div>
            </div>

            {/* RIGHT — tracking scene, aligned with the start of the headline */}
            <div className="lg:col-span-6 xl:col-span-6 lg:mt-[3.25rem] xl:mt-[3.5rem]">
              <HeroTrackingScene />
            </div>
          </div>
        </div>
      </section>

      {/* Live Dashboard Preview — shows visitors what the product actually does */}
      <div id="dashboard">
        <LiveDashboardPreview />
      </div>

      {/* Analytics Preview Section - multi-panel dashboard tiles */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-yellow-50/30 to-white overflow-hidden">
        {/* soft decorative orbs */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-yellow-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 md:mb-14"
          >
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-700 mb-4">
              Analytics in Action
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight px-4 mb-4">
              <span className="block text-gray-900">Inside the Beyond Traffic</span>
              <span className="block stori-gradient">analytics dashboard</span>
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Every panel is live. Filter by store, hour, day, week — drill into footfall, conversion, dwell and demographics in one place.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {/* Panel 1: Traffic by Store - horizontal bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md transition-shadow p-5 md:p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm md:text-base font-bold text-gray-900">Traffic by Store</h3>
                  <p className="text-[11px] text-gray-500">Live · today</p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-gray-700">
                  <span className="w-2 h-2 rounded-full bg-yellow-500" /> Today
                </span>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart
                  data={[
                    { name: "Dubai Mall", value: 4862 },
                    { name: "Yas Mall AD", value: 2978 },
                    { name: "Mall of Emirates", value: 3640 },
                    { name: "City Centre Mirdif", value: 2140 },
                    { name: "Palm Jumeirah", value: 1893 },
                  ]}
                  layout="vertical"
                  margin={{ top: 0, right: 16, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 10, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="name" width={110} tick={{ fontSize: 10, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ fill: "rgba(234,179,8,0.08)" }} contentStyle={{ borderRadius: 10, border: "1px solid #E5E7EB", fontSize: 12 }} />
                  <Bar dataKey="value" fill="#EAB308" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Panel 2: Traffic by Hour - line chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md transition-shadow p-5 md:p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm md:text-base font-bold text-gray-900">Traffic by Hour</h3>
                  <p className="text-[11px] text-gray-500">Peak detected · 7 PM</p>
                </div>
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-yellow-100 text-yellow-800 border border-yellow-200">
                  Last Week
                </span>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart
                  data={[
                    { h: "9 AM", v: 12 }, { h: "10", v: 28 }, { h: "11", v: 55 },
                    { h: "12", v: 78 }, { h: "1 PM", v: 105 }, { h: "2", v: 122 },
                    { h: "3", v: 128 }, { h: "4", v: 120 }, { h: "5", v: 118 },
                    { h: "6", v: 105 }, { h: "7 PM", v: 138 }, { h: "8", v: 92 },
                    { h: "9", v: 96 }, { h: "10", v: 76 }, { h: "11 PM", v: 35 },
                  ]}
                  margin={{ top: 8, right: 16, left: -8, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="h" tick={{ fontSize: 10, fill: "#6B7280" }} axisLine={false} tickLine={false} interval={1} />
                  <YAxis tick={{ fontSize: 10, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #E5E7EB", fontSize: 12 }} />
                  <Line type="monotone" dataKey="v" stroke="#EAB308" strokeWidth={2.5} dot={{ r: 3, fill: "#EAB308", strokeWidth: 0 }} activeDot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Panel 3: Traffic by Day - grouped bars (This Week vs Last Week) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md transition-shadow p-5 md:p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm md:text-base font-bold text-gray-900">Traffic by Day</h3>
                  <p className="text-[11px] text-gray-500">This Week vs Last Week</p>
                </div>
                <div className="flex items-center gap-3 text-[11px] font-semibold">
                  <span className="inline-flex items-center gap-1.5 text-gray-700"><span className="w-2 h-2 rounded-full bg-yellow-500" /> This Week</span>
                  <span className="inline-flex items-center gap-1.5 text-gray-700"><span className="w-2 h-2 rounded-full bg-yellow-200" /> Last Week</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart
                  data={[
                    { d: "Sun", t: 1400, l: 1050 },
                    { d: "Mon", t: 3100, l: 620 },
                    { d: "Tue", t: 3380, l: 870 },
                    { d: "Wed", t: 1980, l: 880 },
                    { d: "Thu", t: 2240, l: 870 },
                    { d: "Fri", t: 2950, l: 980 },
                    { d: "Sat", t: 380, l: 1820 },
                  ]}
                  margin={{ top: 8, right: 8, left: -10, bottom: 0 }}
                  barGap={4}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="d" tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #E5E7EB", fontSize: 12 }} />
                  <Bar dataKey="t" fill="#EAB308" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="l" fill="#FEF08A" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Panel 4: Performance Trend - Period 1 vs Period 2 line overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md transition-shadow p-5 md:p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm md:text-base font-bold text-gray-900">Performance Trend</h3>
                  <p className="text-[11px] text-gray-500">Traffic In vs Traffic Out · 8 days</p>
                </div>
                <div className="flex items-center gap-3 text-[11px] font-semibold">
                  <span className="inline-flex items-center gap-1.5 text-gray-700"><span className="w-2 h-2 rounded-full bg-amber-600" /> In</span>
                  <span className="inline-flex items-center gap-1.5 text-gray-700"><span className="w-2 h-2 rounded-full bg-yellow-400" /> Out</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart
                  data={[
                    { d: "01", i: 789, o: 818 },
                    { d: "02", i: 1400, o: 1380 },
                    { d: "03", i: 1100, o: 1080 },
                    { d: "04", i: 531, o: 534 },
                    { d: "05", i: 609, o: 577 },
                    { d: "06", i: 591, o: 586 },
                    { d: "07", i: 632, o: 637 },
                    { d: "08", i: 803, o: 807 },
                  ]}
                  margin={{ top: 8, right: 8, left: -10, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="aIn" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#D97706" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#D97706" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="aOut" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FACC15" stopOpacity={0.45} />
                      <stop offset="100%" stopColor="#FACC15" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="d" tick={{ fontSize: 10, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #E5E7EB", fontSize: 12 }} />
                  <Area type="monotone" dataKey="i" stroke="#D97706" strokeWidth={2.5} fill="url(#aIn)" />
                  <Area type="monotone" dataKey="o" stroke="#FACC15" strokeWidth={2.5} fill="url(#aOut)" />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Below the grid: small KPI strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-6 md:mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
          >
            {[
              { label: "Total Traffic In", value: "12.7K", delta: "+0.7%", tint: "bg-[#FEF9C3]" },
              { label: "Total Traffic Out", value: "12.1K", delta: "+14.5%", tint: "bg-[#FEF3C7]" },
              { label: "Avg Dwell", value: "8m 24s", delta: "+12%", tint: "bg-[#FEFCE8]" },
              { label: "Conversion", value: "31.2%", delta: "+3.2 pts", tint: "bg-[#FDE68A]/40" },
            ].map((k) => (
              <div key={k.label} className={`${k.tint} rounded-xl border border-yellow-200/60 p-4`}>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-700">{k.label}</p>
                <p className="text-xl md:text-2xl font-black text-gray-900 tabular-nums mt-1">{k.value}</p>
                <p className="text-[11px] font-semibold text-emerald-700 mt-0.5">↑ {k.delta}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats & Testimonial Section */}
      <section className="relative py-8 md:py-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900" ref={statsRef}>
        <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-500/15 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Stats Bar - compact inline strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-6 md:mb-8 pb-6 md:pb-8 border-b border-white/10">
            {[
              { value: "1M+", label: "Visitors tracked daily" },
              { value: "98%", label: "Counting accuracy" },
              { value: "50+", label: "UAE stores live" },
              { value: "24/7", label: "Real-time monitoring" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="text-center"
              >
                <motion.h4
                  initial={{ scale: 0.7 }}
                  animate={statsInView ? { scale: 1 } : { scale: 0.7 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="text-2xl md:text-3xl mb-1 font-black text-white tabular-nums"
                >
                  {stat.value}
                </motion.h4>
                <p className="text-[11px] md:text-xs text-gray-400 leading-tight">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Trust label */}
          <div className="text-center mb-6">
            <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-gray-500">
              Trusted across UAE retail · Live across these networks
            </p>
          </div>

          {/* Moving brand marquee — dark theme */}
          <div className="relative overflow-hidden -mx-4 sm:-mx-6 lg:-mx-8">
            <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-black via-black/90 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-black via-black/90 to-transparent z-10 pointer-events-none" />
            <motion.div
              className="flex py-2"
              animate={{ x: [0, -50 * brands.length * 10] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              {[...brands, ...brands, ...brands].map((brand, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 mx-8 md:mx-12 flex-shrink-0 group cursor-pointer"
                  whileHover={{ scale: 1.08, y: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <brand.icon className="w-7 h-7 text-gray-500 group-hover:text-yellow-400 transition-colors duration-300" />
                  <span className="text-lg md:text-xl font-black uppercase tracking-tight text-gray-500 group-hover:text-yellow-400 transition-colors duration-300 whitespace-nowrap">
                    {brand.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Retail Problem Section */}
      <section className="relative py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        {/* Retail scene strip — top */}
        <RetailSceneStripe className="absolute top-0 left-0 right-0 h-40 md:h-56" opacity={0.32} />
        {/* AI detection corner brackets */}
        <span className="hidden md:block absolute top-6 left-6 w-6 h-6 border-t-2 border-l-2 border-amber-400/40" />
        <span className="hidden md:block absolute top-6 right-6 w-6 h-6 border-t-2 border-r-2 border-amber-400/40" />
        <span className="hidden md:block absolute bottom-6 left-6 w-6 h-6 border-b-2 border-l-2 border-amber-400/40" />
        <span className="hidden md:block absolute bottom-6 right-6 w-6 h-6 border-b-2 border-r-2 border-amber-400/40" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-yellow-100 border border-yellow-200 rounded-full px-4 py-2 mb-6">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-violet-700 font-medium uppercase tracking-wide">
                The Retail Problem
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 font-black leading-tight px-4 uppercase tracking-tight">
              Retailers Operate{" "}
              <span className="bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent">
                Completely Blind
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              Without a reliable people counting system, every staffing decision, store layout change, and
              marketing campaign is a costly guess.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                number: "1)",
                title: "Inaccurate foot traffic measurement",
                description: "Manual counts miss thousands of daily visitors, making data unreliable",
              },
              {
                number: "2)",
                title: "Traffic not linked to transactions",
                description: "No visibility into conversion rates or revenue lost to missed opportunities",
              },
              {
                number: "3)",
                title: "Unknown customer demographics",
                description: "Marketing targets the wrong audience spend is wasted on poor segments",
              },
              {
                number: "4)",
                title: "Slow, manual reporting cycles",
                description: "Decisions are made days after the data is relevant, costing sales",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(249, 115, 22, 0.15)" }}
                className="bg-white border border-gray-200 rounded-3xl p-8 hover:border-violet-300 transition-all"
              >
                <h3 className="text-xl mb-3 text-yellow-500">{item.number} {item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Cost-of-blindness visualization */}
          <RetailProblemViz />
        </div>
      </section>

      {/* Key Features Section */}
      <section id="features" className="py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-12 md:mb-20"
          >
            <div className="inline-flex items-center gap-2 bg-yellow-500 text-white rounded-full px-5 py-2.5 mb-6 shadow-lg shadow-yellow-500/50">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold uppercase tracking-wide">People Counting Solutions</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 font-black leading-tight px-4 uppercase tracking-tight">
              One Platform.{" "}
              <span className="bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
                Many Insights.
              </span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed px-4">
              AI-powered footfall analytics embedded with deep learning and 3D stereo vision—the most
              complete retail traffic counter available.
            </p>
          </motion.div>

          {/* Vibrant Bento Grid Layout — auto-rows removed so each card sizes to its own content (no forced equal-height stretching) */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-6 items-start">
            {/* Large Feature - Real-Time with Chart */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -12, scale: 1.02 }}
              className="md:col-span-3 md:row-span-2 bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100 rounded-3xl p-8 text-gray-900 relative overflow-hidden group cursor-pointer shadow-2xl shadow-yellow-200/50 hover:shadow-yellow-300/70 transition-all duration-500 border border-yellow-200"
            >
              <motion.div
                className="absolute top-0 right-0 w-64 h-64 bg-yellow-200/20 rounded-full blur-3xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-200/20 rounded-full blur-3xl" />

              {/* Shimmer effect */}
              <div className="absolute inset-0 shimmer-effect opacity-10" />

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="w-12 h-12 bg-yellow-400/30 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-yellow-300 shadow-inner"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      <Activity className="w-6 h-6 text-amber-700" />
                    </motion.div>
                    <div className="inline-flex items-center gap-1.5 bg-white/70 backdrop-blur-sm border border-yellow-200 rounded-full px-2.5 py-1">
                      <motion.span
                        className="w-1.5 h-1.5 rounded-full bg-amber-500"
                        animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.6, repeat: Infinity }}
                      />
                      <span className="text-[10px] font-black uppercase tracking-widest text-amber-700">Live</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                    Today · 09:00 — 21:00
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-black mb-2 uppercase text-gray-900 leading-tight">Real-Time Footfall Counter</h3>
                <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-5">
                  Track today, yesterday, weekly and monthly footfall with live updates.
                </p>

                {/* KPI tiles */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    { label: "Today", value: "2,847", delta: "+23%", up: true },
                    { label: "Yesterday", value: "2,314", delta: "Mon", up: null },
                    { label: "Peak hour", value: "2–3 PM", delta: "247 ppl", up: true },
                  ].map((k) => (
                    <div key={k.label} className="bg-white/70 backdrop-blur-sm border border-yellow-200 rounded-xl px-3 py-2">
                      <p className="text-[9px] font-black uppercase tracking-widest text-gray-500">{k.label}</p>
                      <p className="text-base md:text-lg font-black text-gray-900 tabular-nums leading-tight">{k.value}</p>
                      <p
                        className={`text-[10px] font-bold tabular-nums ${
                          k.up === true ? "text-amber-600" : k.up === false ? "text-rose-600" : "text-gray-500"
                        }`}
                      >
                        {k.up === true ? "↑ " : k.up === false ? "↓ " : ""}{k.delta}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Recharts area chart */}
                <div className="h-[200px] md:h-[220px] -mx-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={[
                        { h: "9A", v: 42 },
                        { h: "10A", v: 78 },
                        { h: "11A", v: 124 },
                        { h: "12P", v: 168 },
                        { h: "1P", v: 192 },
                        { h: "2P", v: 247 },
                        { h: "3P", v: 215 },
                        { h: "4P", v: 178 },
                        { h: "5P", v: 156 },
                        { h: "6P", v: 198 },
                        { h: "7P", v: 142 },
                        { h: "8P", v: 86 },
                      ]}
                      margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="rtFootfall" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#EAB308" stopOpacity={0.7} />
                          <stop offset="100%" stopColor="#EAB308" stopOpacity={0.02} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="#FDE68A" strokeDasharray="3 3" vertical={false} />
                      <XAxis
                        dataKey="h"
                        tick={{ fontSize: 10, fill: "#92400e", fontWeight: 700 }}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis hide />
                      <Tooltip
                        contentStyle={{ borderRadius: 12, border: "1px solid #FDE68A", fontSize: 12, boxShadow: "0 8px 24px rgba(245,158,11,0.15)" }}
                        labelStyle={{ fontWeight: 700, color: "#92400e" }}
                        formatter={(v: number) => [`${v} visitors`, "Footfall"]}
                      />
                      <Area
                        type="monotone"
                        dataKey="v"
                        stroke="#A16207"
                        strokeWidth={2.5}
                        fill="url(#rtFootfall)"
                        isAnimationActive
                        animationDuration={1400}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* 7-day mini bars */}
                <div className="mt-4 pt-4 border-t border-yellow-200/70">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Last 7 days</p>
                    <p className="text-[10px] font-black text-amber-700">+12.4% vs prev week</p>
                  </div>
                  <div className="flex items-end gap-1.5 h-10">
                    {[
                      { d: "M", v: 58 },
                      { d: "T", v: 72 },
                      { d: "W", v: 65 },
                      { d: "T", v: 81 },
                      { d: "F", v: 92 },
                      { d: "S", v: 100 },
                      { d: "S", v: 84 },
                    ].map((b, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <motion.div
                          initial={{ height: 0 }}
                          whileInView={{ height: `${b.v}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                          className="w-full bg-gradient-to-t from-amber-500 to-yellow-400 rounded-md"
                        />
                        <span className="text-[8px] font-bold uppercase text-gray-500">{b.d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Multi-Location */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -12, scale: 1.02 }}
              className="md:col-span-3 bg-white border-2 border-yellow-200 rounded-3xl p-8 hover:shadow-2xl hover:shadow-yellow-500/30 hover:border-yellow-400 transition-all duration-500 group cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-full blur-2xl opacity-50" />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-yellow-500/30">
                    <MapPin className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Network total</p>
                    <p className="text-2xl font-black text-gray-900 tabular-nums leading-tight">12,847</p>
                    <p className="text-[10px] font-black text-amber-600">↑ 8.2% WoW</p>
                  </div>
                </div>
                <h3 className="text-2xl font-black mb-2">Multi-Location Footfall</h3>
                <p className="text-gray-600 leading-relaxed mb-5 text-sm">
                  Filter and compare in-store analytics across all your locations from one unified dashboard.
                </p>
                {/* Location list with sparklines */}
                <div className="space-y-2">
                  {[
                    { name: "Dubai Mall · Flagship", value: 4862, delta: "+14%", trend: [22, 28, 26, 34, 38, 44, 48], up: true },
                    { name: "Mall of the Emirates", value: 3214, delta: "+6%", trend: [18, 20, 24, 22, 28, 30, 32], up: true },
                    { name: "Abu Dhabi · Yas Mall", value: 2978, delta: "-2%", trend: [30, 28, 32, 26, 28, 24, 26], up: false },
                    { name: "Sharjah · City Centre", value: 1793, delta: "+11%", trend: [10, 14, 12, 18, 16, 22, 24], up: true },
                  ].map((loc, i) => (
                    <motion.div
                      key={loc.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, duration: 0.4 }}
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-yellow-50 transition-colors cursor-pointer border border-transparent hover:border-yellow-200"
                    >
                      <span className="w-1.5 h-8 rounded-full bg-gradient-to-b from-yellow-400 to-amber-500" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-black text-gray-900 truncate">{loc.name}</p>
                        <p className="text-[10px] font-bold text-gray-500 tabular-nums">{loc.value.toLocaleString()} visitors</p>
                      </div>
                      <div className="w-20 h-8 flex-shrink-0">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={loc.trend.map((v, idx) => ({ idx, v }))} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
                            <Line
                              type="monotone"
                              dataKey="v"
                              stroke={loc.up ? "#A16207" : "#f43f5e"}
                              strokeWidth={2}
                              dot={false}
                              isAnimationActive
                              animationDuration={1200}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                      <span
                        className={`text-[11px] font-black tabular-nums w-12 text-right ${
                          loc.up ? "text-amber-600" : "text-rose-600"
                        }`}
                      >
                        {loc.delta}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Smaller feature cards - make them stack on mobile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="md:col-span-2 bg-white border-2 border-amber-200 rounded-3xl p-8 hover:shadow-2xl hover:shadow-amber-500/20 hover:border-amber-400 transition-all group cursor-pointer relative overflow-hidden"
            >
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-amber-100 to-yellow-100 rounded-full blur-2xl opacity-60" />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-yellow-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-amber-500/30">
                    <ShoppingBag className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-black uppercase tracking-widest text-gray-500">Conversion</p>
                    <p className="text-2xl font-black bg-gradient-to-r from-amber-600 to-orange-700 bg-clip-text text-transparent tabular-nums leading-tight">24.8%</p>
                    <p className="text-[10px] font-black text-amber-600">↑ +3.2%</p>
                  </div>
                </div>
                <h3 className="text-xl font-black mb-2">POS Integration</h3>
                <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                  Sync Point of Sale with footfall counter to measure conversion rates.
                </p>
                {/* Funnel: visitors -> conversions */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-16 text-[10px] font-black uppercase tracking-wider text-gray-500">Visitors</span>
                    <div className="flex-1 h-5 bg-yellow-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full"
                      />
                    </div>
                    <span className="text-xs font-black text-gray-900 tabular-nums w-10 text-right">1,247</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-16 text-[10px] font-black uppercase tracking-wider text-gray-500">Entered</span>
                    <div className="flex-1 h-5 bg-yellow-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "62%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"
                      />
                    </div>
                    <span className="text-xs font-black text-gray-900 tabular-nums w-10 text-right">773</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-16 text-[10px] font-black uppercase tracking-wider text-gray-500">Bought</span>
                    <div className="flex-1 h-5 bg-yellow-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "25%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full bg-gradient-to-r from-amber-600 to-orange-600 rounded-full"
                      />
                    </div>
                    <span className="text-xs font-black text-gray-900 tabular-nums w-10 text-right">309</span>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider pt-2 border-t border-yellow-100">
                  <span className="text-gray-500">Avg basket</span>
                  <span className="text-amber-700 tabular-nums">AED 248</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="md:col-span-2 bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white rounded-3xl p-8 hover:shadow-2xl hover:shadow-yellow-500/30 transition-all group cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/20 rounded-full blur-2xl" />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-yellow-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform border border-yellow-500/30">
                    <Footprints className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-black uppercase tracking-widest text-gray-500">Capture rate</p>
                    <p className="text-2xl font-black text-yellow-400 tabular-nums leading-tight">27.6%</p>
                  </div>
                </div>
                <h3 className="text-xl font-black mb-2">Pass-By Traffic Counter</h3>
                <p className="text-gray-400 leading-relaxed text-sm mb-4">
                  Measure how many people walk past vs. enter.
                </p>
                <div className="h-20 -mx-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={[
                        { d: "M", passed: 720, entered: 198 },
                        { d: "T", passed: 760, entered: 215 },
                        { d: "W", passed: 690, entered: 188 },
                        { d: "T", passed: 820, entered: 242 },
                        { d: "F", passed: 910, entered: 278 },
                        { d: "S", passed: 940, entered: 292 },
                        { d: "S", passed: 847, entered: 234 },
                      ]}
                      margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="passedG" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#FACC15" stopOpacity={0.55} />
                          <stop offset="100%" stopColor="#FACC15" stopOpacity={0.05} />
                        </linearGradient>
                        <linearGradient id="enteredG" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10b981" stopOpacity={0.7} />
                          <stop offset="100%" stopColor="#10b981" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="d" tick={{ fontSize: 9, fill: "#6b7280", fontWeight: 700 }} tickLine={false} axisLine={false} />
                      <YAxis hide />
                      <Tooltip
                        contentStyle={{ background: "#0f172a", border: "1px solid #374151", borderRadius: 10, fontSize: 11 }}
                        labelStyle={{ color: "#FACC15", fontWeight: 700 }}
                      />
                      <Area type="monotone" dataKey="passed" stroke="#FACC15" strokeWidth={2} fill="url(#passedG)" />
                      <Area type="monotone" dataKey="entered" stroke="#10b981" strokeWidth={2} fill="url(#enteredG)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-3 flex gap-3">
                  <div className="flex-1 flex items-center gap-2 bg-yellow-500/10 rounded-xl px-3 py-2 border border-yellow-500/20">
                    <span className="w-2 h-2 rounded-full bg-yellow-400" />
                    <div className="flex-1">
                      <p className="text-[9px] font-black uppercase tracking-wider text-gray-500">Passed</p>
                      <p className="text-base font-black text-yellow-400 tabular-nums">847</p>
                    </div>
                  </div>
                  <div className="flex-1 flex items-center gap-2 bg-amber-500/10 rounded-xl px-3 py-2 border border-amber-500/20">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <div className="flex-1">
                      <p className="text-[9px] font-black uppercase tracking-wider text-gray-500">Entered</p>
                      <p className="text-base font-black text-amber-400 tabular-nums">234</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="md:col-span-2 bg-gradient-to-br from-yellow-50 to-yellow-50 border-2 border-yellow-200 rounded-3xl p-8 hover:shadow-2xl hover:shadow-yellow-400/20 hover:border-yellow-400 transition-all group cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-yellow-200 to-yellow-200 rounded-full blur-2xl opacity-50" />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-yellow-400/30">
                    <TrendingUp className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-black uppercase tracking-widest text-gray-500">Avg this week</p>
                    <p className="text-2xl font-black text-gray-900 tabular-nums leading-tight">24.5%</p>
                    <p className="text-[10px] font-black text-amber-600">↑ +2.8 pts</p>
                  </div>
                </div>
                <h3 className="text-xl font-black mb-2">Conversion Rate Analytics</h3>
                <p className="text-gray-700 leading-relaxed mb-3 text-sm">
                  Auto-calculate the % of visitors who become paying customers.
                </p>
                <div className="h-24 -mx-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { d: "Mon", v: 18.2 },
                        { d: "Tue", v: 22.4 },
                        { d: "Wed", v: 19.8 },
                        { d: "Thu", v: 26.1 },
                        { d: "Fri", v: 24.6 },
                        { d: "Sat", v: 31.4 },
                        { d: "Sun", v: 28.9 },
                      ]}
                      margin={{ top: 8, right: 4, left: 0, bottom: 0 }}
                      barCategoryGap={6}
                    >
                      <defs>
                        <linearGradient id="convBar" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#EAB308" />
                          <stop offset="100%" stopColor="#FACC15" />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="#FDE68A" strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="d" tick={{ fontSize: 9, fill: "#92400e", fontWeight: 700 }} tickLine={false} axisLine={false} />
                      <YAxis hide />
                      <Tooltip
                        cursor={{ fill: "rgba(251, 191, 36,0.1)" }}
                        contentStyle={{ borderRadius: 10, border: "1px solid #FDE68A", fontSize: 11 }}
                        formatter={(v: number) => [`${v}%`, "Conversion"]}
                      />
                      <Bar dataKey="v" fill="url(#convBar)" radius={[5, 5, 0, 0]} isAnimationActive animationDuration={1200} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex items-center justify-between mt-2 text-[10px] font-black uppercase tracking-wider">
                  <span className="text-gray-500">Peak · Sat</span>
                  <span className="text-amber-700 tabular-nums">31.4%</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="md:col-span-2 bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-3xl p-8 hover:shadow-2xl hover:shadow-amber-500/20 hover:border-amber-400 transition-all group cursor-pointer relative overflow-hidden"
            >
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-amber-200 to-yellow-200 rounded-full blur-2xl opacity-60" />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-amber-500/30">
                    <Clock className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-black uppercase tracking-widest text-gray-500">Peak hour</p>
                    <p className="text-2xl font-black text-gray-900 tabular-nums leading-tight">2–3 PM</p>
                    <p className="text-[10px] font-black text-amber-700">247 visitors</p>
                  </div>
                </div>
                <h3 className="text-xl font-black mb-2">Hourly Distribution</h3>
                <p className="text-gray-700 leading-relaxed mb-3 text-sm">
                  See footfall broken by hour to optimize staffing.
                </p>
                <div className="h-24 -mx-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { h: "9A", v: 42 },
                        { h: "10A", v: 78 },
                        { h: "11A", v: 124 },
                        { h: "12P", v: 168 },
                        { h: "1P", v: 192 },
                        { h: "2P", v: 247, peak: true },
                        { h: "3P", v: 215 },
                        { h: "4P", v: 178 },
                        { h: "5P", v: 156 },
                        { h: "6P", v: 198 },
                        { h: "7P", v: 142 },
                        { h: "8P", v: 86 },
                      ]}
                      margin={{ top: 6, right: 4, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="hourBar" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#A16207" />
                          <stop offset="100%" stopColor="#FDE68A" />
                        </linearGradient>
                        <linearGradient id="hourBarPeak" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#b45309" />
                          <stop offset="100%" stopColor="#EAB308" />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="#FDE68A" strokeDasharray="3 3" vertical={false} />
                      <XAxis
                        dataKey="h"
                        interval={1}
                        tick={{ fontSize: 8, fill: "#92400e", fontWeight: 700 }}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis hide />
                      <Tooltip
                        cursor={{ fill: "rgba(251, 191, 36,0.1)" }}
                        contentStyle={{ borderRadius: 10, border: "1px solid #FDE68A", fontSize: 11 }}
                        formatter={(v: number) => [`${v} ppl`, "Footfall"]}
                      />
                      <Bar dataKey="v" radius={[3, 3, 0, 0]} isAnimationActive animationDuration={1200}>
                        {[42, 78, 124, 168, 192, 247, 215, 178, 156, 198, 142, 86].map((v, i) => (
                          <Cell key={i} fill={v === 247 ? "url(#hourBarPeak)" : "url(#hourBar)"} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="md:col-span-3 bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100 rounded-3xl p-8 text-gray-900 hover:shadow-2xl hover:shadow-amber-200/50 transition-all group cursor-pointer relative overflow-hidden border border-yellow-200"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-200/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-200/20 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-yellow-400/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform border border-yellow-300">
                      <Users className="w-7 h-7 text-gray-900" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-gray-900 leading-tight">Demographics</h3>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Gender · Age · Groups</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Sampled</p>
                    <p className="text-xl font-black text-gray-900 tabular-nums leading-tight">2,847</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed text-sm mb-4">
                  Gender, age group, and group-visit segmentation for targeted insights.
                </p>

                {/* Donut + age breakdown */}
                <div className="grid grid-cols-5 gap-4 items-center">
                  <div className="col-span-2 relative h-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Female", value: 54, fill: "#A16207" },
                            { name: "Male", value: 40, fill: "#1f2937" },
                            { name: "Child", value: 6, fill: "#FACC15" },
                          ]}
                          dataKey="value"
                          innerRadius={36}
                          outerRadius={56}
                          paddingAngle={3}
                          isAnimationActive
                          animationDuration={1200}
                        >
                          <Cell fill="#A16207" />
                          <Cell fill="#1f2937" />
                          <Cell fill="#FACC15" />
                        </Pie>
                        <Tooltip
                          contentStyle={{ borderRadius: 10, border: "1px solid #FDE68A", fontSize: 11 }}
                          formatter={(v: number, n: string) => [`${v}%`, n]}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <p className="text-[8px] font-black uppercase tracking-widest text-gray-500">Female</p>
                      <p className="text-base font-black text-gray-900 tabular-nums leading-none">54%</p>
                    </div>
                  </div>

                  <div className="col-span-3">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Age groups</p>
                    <div className="space-y-1.5">
                      {[
                        { label: "18–24", v: 22 },
                        { label: "25–34", v: 38 },
                        { label: "35–44", v: 24 },
                        { label: "45–54", v: 11 },
                        { label: "55+", v: 5 },
                      ].map((a, i) => (
                        <div key={a.label} className="flex items-center gap-2">
                          <span className="w-10 text-[9px] font-black uppercase tracking-wider text-gray-600 tabular-nums">{a.label}</span>
                          <div className="flex-1 h-2.5 bg-white/60 rounded-full overflow-hidden border border-yellow-200">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${(a.v / 38) * 100}%` }}
                              viewport={{ once: true }}
                              transition={{ delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                              className="h-full bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full"
                            />
                          </div>
                          <span className="text-[10px] font-black text-gray-900 tabular-nums w-7 text-right">{a.v}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-4 pt-3 border-t border-yellow-200/70 text-[10px] font-black uppercase tracking-wider">
                  <span className="flex items-center gap-1 text-amber-700"><span className="w-2 h-2 rounded-full bg-amber-600" />F 54%</span>
                  <span className="flex items-center gap-1 text-gray-800"><span className="w-2 h-2 rounded-full bg-gray-900" />M 40%</span>
                  <span className="flex items-center gap-1 text-yellow-600"><span className="w-2 h-2 rounded-full bg-yellow-400" />C 6%</span>
                  <span className="ml-auto text-gray-500">Groups · 1.8 avg</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="md:col-span-2 bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-3xl p-8 hover:shadow-2xl hover:shadow-amber-500/20 hover:border-amber-400 transition-all group cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-200 to-yellow-200 rounded-full blur-2xl opacity-50" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-amber-500/30">
                  <UserX className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-black mb-3">Staff vs. Customer Filter</h3>
                <p className="text-gray-700 leading-relaxed mb-5">
                  AI distinguishes staff movements from customers.
                </p>
                {/* Split bar */}
                <div className="h-6 w-full rounded-full overflow-hidden bg-yellow-100 flex shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "82%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full bg-gradient-to-r from-amber-500 to-yellow-500 flex items-center justify-end pr-2"
                  >
                    <span className="text-[10px] font-black text-white">82%</span>
                  </motion.div>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "18%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full bg-gradient-to-r from-gray-400 to-gray-500 flex items-center justify-end pr-2"
                  >
                    <span className="text-[10px] font-black text-white">18%</span>
                  </motion.div>
                </div>
                <div className="flex items-center justify-between mt-2 text-[10px] font-black uppercase tracking-wider">
                  <span className="flex items-center gap-1 text-amber-700">
                    <span className="w-2 h-2 rounded-full bg-amber-500" /> Customers
                  </span>
                  <span className="flex items-center gap-1 text-gray-500">
                    <span className="w-2 h-2 rounded-full bg-gray-400" /> Staff (filtered)
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="md:col-span-4 bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl p-8 text-white hover:shadow-2xl hover:shadow-yellow-500/30 transition-all group cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 bg-yellow-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform border border-yellow-500/30">
                    <FileText className="w-7 h-7 text-yellow-400" />
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-yellow-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                    Auto-send active
                  </div>
                </div>
                <h3 className="text-2xl font-black mb-3">Automated Report Scheduling</h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Daily, weekly, or monthly email reports to stakeholders with comprehensive analytics.
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { period: "Daily", time: "08:00", count: "1.2k" },
                    { period: "Weekly", time: "Mon", count: "8.4k" },
                    { period: "Monthly", time: "1st", count: "36k" },
                  ].map((r, i) => (
                    <div
                      key={i}
                      className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-yellow-500/20 hover:bg-yellow-500/10 hover:border-yellow-500/40 transition-all cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm font-black text-white">{r.period}</div>
                        <div className="text-[9px] font-bold uppercase tracking-wider text-yellow-400">{r.time}</div>
                      </div>
                      <div className="text-xs font-bold text-gray-400 tabular-nums">{r.count} visits</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mall Analytics Section — network/tenant view */}
      <MallAnalytics />

      {/* In-Store Analytics Section */}
      <section id="analytics" className="py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-yellow-50 to-yellow-50 -z-10" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl -z-10" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 md:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-yellow-500 text-white rounded-full px-5 py-2.5 mb-6 shadow-lg shadow-yellow-500/50"
            >
              <Eye className="w-4 h-4" />
              <span className="text-sm font-bold uppercase tracking-wide">In-Store Analytics</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 font-black leading-tight px-4 uppercase tracking-tight"
            >
              See Every Customer.{" "}
              <span className="bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent">
                Know Your Store.
              </span>
            </motion.h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start mb-12 md:mb-20">
            <div className="space-y-4 md:space-y-6"
            >
              {[
                {
                  icon: Eye,
                  title: "3D Stereo Vision Detection",
                  description: "Filters out carts, shadows, mannequins with precision AI",
                },
                {
                  icon: Activity,
                  title: "Real-Time Footfall Counter",
                  description: "Live updates with zero delays for instant insights",
                },
                {
                  icon: BarChart3,
                  title: "Customer Journey Analytics",
                  description: "Track where they go and how long they dwell",
                },
                {
                  icon: MapPin,
                  title: "Multi-Unit Path Linking",
                  description: "Zero double-counting even in large multi-zone stores",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="flex gap-4 md:gap-5 bg-white rounded-2xl p-6 border-2 border-yellow-200 hover:shadow-xl hover:border-yellow-400 transition-all duration-300"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-yellow-500/30"
                  >
                    <item.icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <div>
                    <h4 className="text-xl mb-2 font-bold">{item.title}</h4>
                    <p className="text-base text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="relative w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-3xl shadow-2xl border border-yellow-200 overflow-hidden relative z-20"
              >
                {/* Dashboard Header */}
                <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 px-5 py-3 flex items-center justify-between border-b-2 border-yellow-500">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400" />
                    <span className="w-3 h-3 rounded-full bg-yellow-400" />
                    <span className="w-3 h-3 rounded-full bg-green-400" />
                    <span className="ml-3 text-[11px] font-black uppercase tracking-widest text-yellow-400 hidden sm:inline">
                      Store · Dubai Mall — Flagship
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-amber-400">
                    <motion.span
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.4, repeat: Infinity }}
                      className="w-1.5 h-1.5 rounded-full bg-amber-400"
                    />
                    Live
                  </div>
                </div>

                {/* Dashboard Body */}
                <div className="p-5 md:p-6 bg-gradient-to-br from-white via-amber-50/40 to-yellow-50/40 space-y-5">
                  {/* KPI strip */}
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { label: "Today", value: "1,247", delta: "+12%" },
                      { label: "Conv.", value: "24.8%", delta: "+3.2%" },
                      { label: "Dwell", value: "8:42", delta: "+0:24" },
                      { label: "Repeat", value: "31%", delta: "+4%" },
                    ].map((k) => (
                      <div key={k.label} className="bg-white border border-yellow-200 rounded-xl px-2.5 py-2 shadow-sm">
                        <p className="text-[9px] font-black uppercase tracking-widest text-gray-500">{k.label}</p>
                        <p className="text-base md:text-lg font-black text-gray-900 tabular-nums leading-tight">{k.value}</p>
                        <p className="text-[10px] font-black text-amber-600 tabular-nums">↑ {k.delta}</p>
                      </div>
                    ))}
                  </div>

                  {/* Day x Hour heatmap */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Day × hour heatmap</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-amber-700">Peak · Sat 2 PM</p>
                    </div>
                    <div className="grid grid-cols-[28px_repeat(7,minmax(0,1fr))] gap-1 items-center">
                      <div />
                      {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                        <div key={i} className="text-[9px] font-black uppercase tracking-wider text-gray-500 text-center">
                          {d}
                        </div>
                      ))}
                      {[
                        { time: "10A", row: [2, 3, 3, 4, 3, 5, 6] },
                        { time: "12P", row: [4, 5, 6, 5, 6, 7, 8] },
                        { time: "2P", row: [5, 6, 6, 7, 8, 9, 10] },
                        { time: "4P", row: [4, 5, 5, 6, 7, 8, 9] },
                        { time: "6P", row: [3, 4, 4, 5, 6, 7, 8] },
                      ].map(({ time, row }) => (
                        <React.Fragment key={time}>
                          <div className="text-[9px] font-black uppercase tracking-wider text-gray-500 text-right">{time}</div>
                          {row.map((v, c) => (
                            <motion.div
                              key={`${time}-${c}`}
                              initial={{ opacity: 0, scale: 0.6 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: c * 0.02, duration: 0.3 }}
                              whileHover={{ scale: 1.2 }}
                              className="aspect-square rounded-md cursor-pointer border border-amber-200/60"
                              style={{ backgroundColor: `rgba(217, 119, 6, ${0.08 + v / 12})` }}
                              title={`${v * 18} visitors`}
                            />
                          ))}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Footfall trend chart — multi-series amber */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Footfall vs sales · today</p>
                      <div className="flex items-center gap-2 text-[10px] font-bold">
                        <span className="flex items-center gap-1 text-amber-700">
                          <span className="w-2 h-0.5 bg-amber-600 rounded-full" />Footfall
                        </span>
                        <span className="flex items-center gap-1 text-amber-700">
                          <span className="w-2 h-0.5 bg-amber-600 rounded-full" />Sales
                        </span>
                      </div>
                    </div>
                    <div className="h-28 -mx-2">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={[
                            { h: "9A", footfall: 42, sales: 10 },
                            { h: "10A", footfall: 78, sales: 18 },
                            { h: "11A", footfall: 124, sales: 30 },
                            { h: "12P", footfall: 168, sales: 42 },
                            { h: "1P", footfall: 192, sales: 50 },
                            { h: "2P", footfall: 247, sales: 64 },
                            { h: "3P", footfall: 215, sales: 56 },
                            { h: "4P", footfall: 178, sales: 44 },
                            { h: "5P", footfall: 156, sales: 38 },
                            { h: "6P", footfall: 198, sales: 52 },
                            { h: "7P", footfall: 142, sales: 36 },
                            { h: "8P", footfall: 86, sales: 22 },
                          ]}
                          margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient id="ffG" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#EAB308" stopOpacity={0.55} />
                              <stop offset="100%" stopColor="#EAB308" stopOpacity={0.02} />
                            </linearGradient>
                            <linearGradient id="slG" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#10b981" stopOpacity={0.45} />
                              <stop offset="100%" stopColor="#10b981" stopOpacity={0.02} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid stroke="#FDE68A" strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="h" tick={{ fontSize: 9, fill: "#92400e", fontWeight: 700 }} tickLine={false} axisLine={false} />
                          <YAxis hide />
                          <Tooltip
                            contentStyle={{ borderRadius: 10, border: "1px solid #FDE68A", fontSize: 11 }}
                            labelStyle={{ fontWeight: 700, color: "#92400e" }}
                          />
                          <Area type="monotone" dataKey="footfall" stroke="#A16207" strokeWidth={2} fill="url(#ffG)" />
                          <Area type="monotone" dataKey="sales" stroke="#059669" strokeWidth={2} fill="url(#slG)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Zone dwell list */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Top zones by dwell</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">minutes</p>
                    </div>
                    <div className="space-y-1.5">
                      {[
                        { zone: "Window display", v: 0.4, m: "0:24" },
                        { zone: "New arrivals", v: 0.75, m: "3:12" },
                        { zone: "Fitting rooms", v: 0.95, m: "6:48" },
                        { zone: "Checkout", v: 0.55, m: "2:06" },
                      ].map((z, i) => (
                        <div key={z.zone} className="flex items-center gap-2">
                          <span className="w-24 text-[10px] font-black uppercase tracking-wider text-gray-700 truncate">{z.zone}</span>
                          <div className="flex-1 h-2.5 bg-amber-50 rounded-full overflow-hidden border border-amber-200/60">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${z.v * 100}%` }}
                              viewport={{ once: true }}
                              transition={{ delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                              className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full"
                            />
                          </div>
                          <span className="text-[10px] font-black text-gray-900 tabular-nums w-10 text-right">{z.m}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating accuracy badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
                whileInView={{ opacity: 1, scale: 1, rotate: -6 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="hidden md:flex absolute -top-3 -right-3 bg-gradient-to-br from-yellow-500 to-amber-600 text-white px-3 py-1.5 rounded-xl shadow-xl shadow-amber-500/30 items-center gap-1.5 z-30"
              >
                <Activity className="w-3.5 h-3.5" />
                <span className="text-[11px] font-black uppercase tracking-wider">98.4% accurate</span>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center bg-gradient-to-br from-white via-violet-50 to-amber-50 rounded-3xl p-12 border-2 border-yellow-200 shadow-2xl shadow-yellow-500/20 relative"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-400/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-yellow-500 text-white rounded-full px-6 py-2.5 mb-6 shadow-lg shadow-yellow-500/50">
                <BarChart3 className="w-5 h-5" />
                <span className="text-sm font-bold uppercase tracking-wide">Customizable</span>
              </div>
              <h3 className="text-3xl md:text-4xl lg:text-5xl mb-4 font-black uppercase">
                Footfall Analytics Your Way
              </h3>
              <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
                Customizable dashboards that show the metrics that matter most to your business. Build your
                perfect view in minutes.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hardware Section */}
      <section id="hardware" className="relative py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
        {/* Grid background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(234, 179, 8,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(234, 179, 8,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-12 md:mb-20"
          >
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-400/30 rounded-full px-4 py-2 mb-6">
              <Camera className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-violet-300 font-medium">Hardware</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6 text-white font-bold leading-tight px-4">
              High Accuracy Sensors{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
                That Power Every Insight
              </span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
              Advanced people counting sensors use 3D stereo vision and AI technology to capture precise
              customer movement.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16">
            {[
              {
                icon: Cpu,
                title: "3D AI-Powered Counting Technology",
                description: "Dual-lens stereo vision for depth-based detection.",
              },
              {
                icon: CheckCircle2,
                title: "Industry-Leading Accuracy",
                description: "98%+ accuracy with intelligent filtering.",
              },
              {
                icon: Users,
                title: "True Customer Detection",
                description: "Distinguish staff from customers, adults vs children, identify groups.",
              },
              {
                icon: Wifi,
                title: "Flexible Installation",
                description: "Supports multiple heights, Wi-Fi and BLE connectivity.",
              },
              {
                icon: Activity,
                title: "Real-Time Monitoring",
                description: "Device health alerts and remote diagnostics.",
              },
              {
                icon: Shield,
                title: "Privacy Compliant",
                description: "Anonymous tracking that respects customer privacy.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 hover:bg-white/10 hover:border-yellow-500/50 transition-all"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-yellow-500/50">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-xl text-white mb-3">{item.title}</h4>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            className="relative bg-gradient-to-br from-yellow-500 via-amber-500 to-yellow-500 rounded-3xl p-12 md:p-20 overflow-hidden shadow-2xl shadow-yellow-500/50"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl" />
            <div className="relative z-10 text-center">
              {/* Spatial coverage view — top-down, sensor-agnostic */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto mb-8">
                {/* Soft halo behind the spatial view */}
                <div className="absolute inset-0 rounded-full bg-white/10 blur-2xl" />

                {/* Static coverage rings */}
                <div className="absolute inset-0 rounded-full border border-white/35" />
                <div className="absolute inset-8 rounded-full border border-white/25" />
                <div className="absolute inset-16 rounded-full border border-white/20" />

                {/* Cross-hair guides */}
                <div className="absolute top-1/2 left-2 right-2 h-px bg-white/15" />
                <div className="absolute left-1/2 top-2 bottom-2 w-px bg-white/15" />

                {/* Outgoing pulse rings (radar sweep) */}
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={`pulse-${i}`}
                    className="absolute inset-[28%] rounded-full border-2 border-white/45"
                    animate={{ scale: [1, 2.6], opacity: [0.55, 0] }}
                    transition={{
                      duration: 2.8,
                      repeat: Infinity,
                      delay: i * 0.93,
                      ease: "easeOut",
                    }}
                  />
                ))}

                {/* Tracked-person dots scattered across the coverage zone */}
                {[
                  { x: 28, y: 32, color: "#EC4899", delay: 0 },
                  { x: 72, y: 30, color: "#3B82F6", delay: 0.3 },
                  { x: 62, y: 68, color: "#A855F7", delay: 0.6 },
                  { x: 32, y: 70, color: "#3B82F6", delay: 0.9 },
                  { x: 80, y: 58, color: "#EC4899", delay: 1.2 },
                  { x: 22, y: 52, color: "#A855F7", delay: 1.5 },
                ].map((p, i) => (
                  <motion.div
                    key={`dot-${i}`}
                    className="absolute w-2.5 h-2.5 md:w-3 md:h-3 rounded-full"
                    style={{
                      left: `${p.x}%`,
                      top: `${p.y}%`,
                      background: p.color,
                      boxShadow: `0 0 14px ${p.color}, 0 0 0 4px rgba(255,255,255,0.18)`,
                      transform: "translate(-50%, -50%)",
                    }}
                    animate={{ scale: [1, 1.35, 1], opacity: [0.75, 1, 0.75] }}
                    transition={{ duration: 2.2, repeat: Infinity, delay: p.delay }}
                  />
                ))}

                {/* Central abstract device */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-700 border border-white/50 shadow-2xl flex items-center justify-center"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="absolute inset-1.5 rounded-xl border border-white/15" />
                  <motion.span
                    className="relative w-2 h-2 rounded-full bg-emerald-400"
                    animate={{ opacity: [1, 0.4, 1], scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                    style={{ boxShadow: "0 0 12px rgba(52,211,153,0.9)" }}
                  />
                </motion.div>

                {/* Floating label */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[10px] md:text-xs font-bold uppercase tracking-[0.22em] text-white/85">
                  Coverage Zone
                </div>
              </div>

              <h3 className="text-3xl md:text-4xl text-white mb-4 font-black uppercase">
                Any Sensor. One Intelligent Platform.
              </h3>
              <p className="text-lg md:text-xl text-yellow-100 max-w-2xl mx-auto leading-relaxed">
                Beyond Traffic is hardware-agnostic by design. Plug into best-in-class sensors from our
                partner ecosystem &mdash; pick the tech that fits your space, and we&apos;ll turn its
                signals into actionable retail intelligence.
              </p>
              <div className="mt-8 flex justify-center gap-4 flex-wrap">
                {[
                  { value: "98%+", label: "Accuracy" },
                  { value: "Any", label: "Hardware" },
                  { value: "AI", label: "Powered" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/30 hover:bg-white/30 hover:border-white/50 transition-all duration-300 cursor-pointer relative overflow-hidden"
                  >
                    <div className="absolute inset-0 shimmer-effect opacity-20" />
                    <div className="text-2xl font-black text-white relative z-10">{stat.value}</div>
                    <div className="text-sm text-yellow-200 relative z-10">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Integrations Section */}
      <section id="integrations" className="relative py-20 md:py-28 lg:py-36 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-white via-yellow-50/30 to-white">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Sparkle lines + headline cluster */}
          <div className="relative">
            {/* top sparkle line */}
            <div className="hidden md:block absolute -top-2 left-0 right-0 h-3 stori-sparkle-line animate-sparkle opacity-90" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="text-center pt-12 md:pt-20"
            >
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-gray-700 mb-5 md:mb-7">
                Integrations Made Easy
              </p>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.05] tracking-tight px-4 mb-6 md:mb-10">
                <span className="block text-gray-900">Connect Beyond Traffic to</span>
                <span className="block stori-gradient">your existing retail tools</span>
              </h2>

              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
                Plug into the POS, CRM, BI and security systems you already use &mdash; no rip-and-replace, no data silos.
              </p>
            </motion.div>

            {/* middle sparkle line */}
            <div className="hidden md:block mt-10 mb-2 h-3 stori-sparkle-line animate-sparkle opacity-80" />
          </div>

          {/* Integration tiles grid */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 md:mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6"
          >
            {[
              { name: "Shopify POS", Icon: ShoppingBag, tint: "bg-[#DCEDC9]" },
              { name: "Square", Icon: CreditCard, tint: "bg-[#F4ECC2]" },
              { name: "Salesforce", Icon: Activity, tint: "bg-[#E5E5E0]" },
              { name: "Power BI", Icon: BarChart3, tint: "bg-[#FEF3C7]" },
              { name: "Tableau", Icon: TrendingUp, tint: "bg-[#EAE7DA]" },
              { name: "Slack", Icon: Sparkles, tint: "bg-[#DCEDC9]" },
              { name: "Camera CCTV", Icon: Camera, tint: "bg-[#F4ECC2]" },
              { name: "Wi-Fi Mesh", Icon: Wifi, tint: "bg-[#E5E5E0]" },
              { name: "Mall ERP", Icon: Building2, tint: "bg-[#FEF3C7]" },
              { name: "HubSpot", Icon: Users, tint: "bg-[#EAE7DA]" },
              { name: "Microsoft 365", Icon: Briefcase, tint: "bg-[#DCEDC9]" },
              { name: "Custom API", Icon: Cpu, tint: "bg-[#F4ECC2]" },
            ].map(({ name, Icon, tint }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                whileHover={{ y: -4, scale: 1.03 }}
                className={`${tint} rounded-2xl p-5 md:p-6 flex flex-col items-center justify-center gap-3 border border-black/5 shadow-sm hover:shadow-lg transition-shadow cursor-default`}
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/80 flex items-center justify-center backdrop-blur-sm">
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-gray-800" strokeWidth={2.2} />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-gray-900 text-center leading-tight">{name}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* bottom sparkle line */}
          <div className="hidden md:block mt-14 h-3 stori-sparkle-line animate-sparkle opacity-90" />

          {/* CTA pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 md:mt-16 flex justify-center"
          >
            <a
              href="#contact"
              className="stori-cta inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm md:text-base font-semibold transition-all hover:scale-[1.02]"
            >
              Talk to integrations team
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Industries Section */}
      <section id="industries" className="relative py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Retail scene strip — bottom */}
        <RetailSceneStripe className="absolute bottom-0 left-0 right-0 h-44 md:h-56" opacity={0.28} />
        {/* Detection corners */}
        <span className="hidden md:block absolute top-6 left-6 w-6 h-6 border-t-2 border-l-2 border-amber-400/40" />
        <span className="hidden md:block absolute top-6 right-6 w-6 h-6 border-t-2 border-r-2 border-amber-400/40" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-12 md:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6 font-bold leading-tight px-4">
              Built for{" "}
              <span className="bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent">
                Modern Retail
              </span>{" "}
              Environments
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-12 md:mb-16">
            <IndustryCard
              icon={Shirt}
              title="Fashion & Apparel Retail"
              challenge="High rent = high pressure to convert"
              focus="Conversion Tracking, Demographics, Multi-Location"
              delay={0}
              kpis={[
                { label: "Conv. lift", value: "+24%" },
                { label: "Avg dwell", value: "8m" },
                { label: "Stores", value: "120+" },
              ]}
              trend={[18, 22, 26, 24, 30, 34, 32, 38, 44, 48, 52, 58]}
              trendLabel="Conversion · 30d"
            />
            <IndustryCard
              icon={Building2}
              title="Shopping Malls & Retail Centres"
              focus="Zone Analytics, Occupancy Counter, Tenant Reports"
              delay={0.1}
              kpis={[
                { label: "Footfall", value: "1.2M+" },
                { label: "Tenants", value: "85" },
                { label: "Zones", value: "32" },
              ]}
              trend={[40, 55, 48, 62, 70, 78, 72, 85, 92, 98, 110, 122]}
              trendLabel="Daily footfall · 30d"
            />
            <IndustryCard
              icon={Gem}
              title="Jewellery & Luxury Retail"
              focus="Window-to-visit rate, sales conversion vs appointments, staff-to-customer ratio"
              delay={0.2}
              kpis={[
                { label: "Window→Visit", value: "31%" },
                { label: "Avg ticket", value: "AED 4.2k" },
                { label: "Appts", value: "+42%" },
              ]}
              trend={[10, 14, 12, 18, 22, 20, 26, 28, 32, 35, 41, 47]}
              trendLabel="Window→Visit · 30d"
            />
            <IndustryCard
              icon={UtensilsCrossed}
              title="Hospitality & F&B"
              focus="Live occupancy, queue analytics, group visit identification"
              delay={0.3}
              kpis={[
                { label: "Occupancy", value: "78%" },
                { label: "Queue time", value: "-38%" },
                { label: "Group %", value: "62" },
              ]}
              trend={[60, 68, 64, 72, 80, 76, 84, 88, 82, 90, 86, 78]}
              trendLabel="Avg occupancy · 30d"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl md:rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-6 font-bold">
                Ready to transform your retail operations?
              </h3>
              <p className="text-lg md:text-xl text-yellow-100 max-w-3xl mx-auto mb-6 md:mb-8 leading-relaxed">
                Tell us about your business and we'll show you exactly how Beyond Traffic works for your
                specific UAE context.
              </p>
              <div className="flex gap-3 md:gap-4 justify-center flex-wrap">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-yellow-500 px-6 md:px-8 py-3 md:py-4 rounded-2xl hover:shadow-2xl transition-all font-medium flex items-center gap-2 group"
                >
                  Get Industry Demo
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white px-6 md:px-8 py-3 md:py-4 rounded-2xl hover:bg-white/10 transition-all font-medium"
                >
                  Explore Features
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-50 -z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(234, 179, 8,0.15),transparent_70%)] -z-10" />
        {/* Retail scene strip — bottom */}
        <RetailSceneStripe className="absolute bottom-0 left-0 right-0 h-40 md:h-52 z-0" opacity={0.28} />
        {/* Detection corners */}
        <span className="hidden md:block absolute top-6 left-6 w-6 h-6 border-t-2 border-l-2 border-amber-400/50 z-10" />
        <span className="hidden md:block absolute top-6 right-6 w-6 h-6 border-t-2 border-r-2 border-amber-400/50 z-10" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-yellow-500 text-white rounded-full px-5 py-2.5 mb-6 shadow-lg shadow-yellow-500/50">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-bold uppercase tracking-wide">Pricing</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 font-black uppercase tracking-tight">
              <span className="block text-gray-900">Simple, Transparent</span>
              <span className="block bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent">Pricing</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Choose the perfect plan for your retail business
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white border-2 border-yellow-200 rounded-3xl p-8 hover:border-yellow-400 hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-10" />
              <div className="relative z-10">
                <h3 className="text-2xl font-black uppercase mb-4 text-gray-900">Starter</h3>
                <div className="mb-6">
                  <div className="text-5xl font-black bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent mb-2">Custom</div>
                  <div className="text-gray-600">per location/month</div>
                </div>
                <ul className="space-y-4 mb-8">
                  {[
                    "1-5 Locations",
                    "Real-time footfall tracking",
                    "Basic analytics dashboard",
                    "Email support",
                    "Monthly reports",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="block w-full bg-gradient-to-r from-yellow-500 to-amber-600 text-white text-center px-6 py-4 rounded-2xl font-bold hover:shadow-2xl hover:shadow-yellow-500/50 transition-all"
                >
                  Get Started
                </motion.a>
              </div>
            </motion.div>

            {/* Professional Plan - Featured */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white rounded-3xl p-8 shadow-2xl relative overflow-hidden group border-4 border-yellow-400"
            >
              <div className="absolute top-0 right-0 bg-yellow-400 text-gray-900 px-6 py-2 text-sm font-black uppercase rounded-bl-2xl">
                Popular
              </div>
              <div className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-10" />
              <div className="relative z-10 mt-6">
                <h3 className="text-2xl font-black uppercase mb-4 text-gray-900">Professional</h3>
                <div className="mb-6">
                  <div className="text-5xl font-black bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent mb-2">
                    Custom
                  </div>
                  <div className="text-gray-600">per location/month</div>
                </div>
                <ul className="space-y-4 mb-8">
                  {[
                    "6-20 Locations",
                    "Advanced analytics & AI insights",
                    "POS integration",
                    "Demographics tracking",
                    "Priority support",
                    "Custom reports",
                    "API access",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="block w-full bg-gradient-to-r from-yellow-500 to-amber-600 text-white text-center px-6 py-4 rounded-2xl font-bold hover:shadow-2xl hover:shadow-yellow-500/50 transition-all"
                >
                  Get Started
                </motion.a>
              </div>
            </motion.div>

            {/* Enterprise Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white border-2 border-yellow-200 rounded-3xl p-8 hover:border-yellow-400 hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-10" />
              <div className="relative z-10">
                <h3 className="text-2xl font-black uppercase mb-4 text-gray-900">Enterprise</h3>
                <div className="mb-6">
                  <div className="text-5xl font-black bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent mb-2">Custom</div>
                  <div className="text-gray-600">contact us</div>
                </div>
                <ul className="space-y-4 mb-8">
                  {[
                    "20+ Locations",
                    "Everything in Professional",
                    "Dedicated account manager",
                    "Custom integrations",
                    "24/7 phone support",
                    "On-site training",
                    "SLA guarantees",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="block w-full bg-gradient-to-r from-yellow-500 to-amber-600 text-white text-center px-6 py-4 rounded-2xl font-bold hover:shadow-2xl hover:shadow-yellow-500/50 transition-all"
                >
                  Contact Sales
                </motion.a>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 text-center bg-white/80 backdrop-blur-xl border-2 border-yellow-200 rounded-3xl p-8 shadow-xl"
          >
            <p className="text-gray-900 text-lg mb-2 font-bold">
              All plans include free hardware installation and setup
            </p>
            <p className="text-gray-600">
              Custom pricing available for unique requirements • No long-term contracts
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section — moved below pricing */}
      <section id="testimonials" className="py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-violet-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-12 md:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-4 font-bold leading-tight px-4">
              What{" "}
              <span className="bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent">
                Retailers Say
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600">Trusted Across Retail</p>
          </motion.div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
            {[
              {
                quote:
                  "Beyond Traffic transformed how we understand our store performance. The real-time data has been invaluable for optimizing our staff schedules and improving conversion rates.",
                name: "Sarah Al-Mansoori",
                role: "Retail Manager",
                company: "Fashion Retailer, Dubai",
                metric: "+32%",
                metricLabel: "Conversion uplift",
              },
              {
                quote:
                  "The accuracy is incredible. We finally have reliable data we can trust to make critical business decisions. ROI was visible within the first month.",
                name: "Ahmed Hassan",
                role: "Operations Director",
                company: "Luxury Mall, Abu Dhabi",
                metric: "30 days",
                metricLabel: "Time to ROI",
              },
              {
                quote:
                  "Installation was seamless and the dashboard is intuitive. Our team adapted immediately and we're seeing insights we never had access to before.",
                name: "Lisa Chen",
                role: "Store Owner",
                company: "Boutique Chain, Sharjah",
                metric: "98.4%",
                metricLabel: "Counting accuracy",
              },
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8 hover:shadow-2xl hover:border-violet-300 transition-all flex flex-col"
              >
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-500 text-lg md:text-xl">
                        ★
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-col items-end leading-tight">
                    <span className="text-2xl md:text-3xl font-black bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent tabular-nums">
                      {testimonial.metric}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                      {testimonial.metricLabel}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 mb-6 md:mb-8 text-base md:text-lg leading-relaxed flex-1">{testimonial.quote}</p>
                <div className="flex items-center gap-3 md:gap-4 pt-4 border-t border-gray-100">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/30">
                    <Users className="w-6 h-6 md:w-7 md:h-7 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-base md:text-lg">{testimonial.name}</div>
                    <div className="text-xs md:text-sm text-gray-500">{testimonial.role}</div>
                    <div className="text-xs md:text-sm text-gray-500">{testimonial.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            className="bg-gradient-to-br from-yellow-100 to-amber-100 border-2 border-violet-300 rounded-2xl md:rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl" />
            <div className="relative z-10">
              <Store className="w-16 h-16 md:w-20 md:h-20 text-yellow-500 mx-auto mb-4 md:mb-6" />
              <h3 className="text-2xl md:text-3xl lg:text-4xl mb-3 md:mb-4 font-bold">
                People Counting Camera for Small Businesses in UAE
              </h3>
              <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
                Affordable and easy-to-use for independent retailers, boutiques, and SMEs.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="relative py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <RetailSceneStripe className="absolute top-0 left-0 right-0 h-36 md:h-44" opacity={0.22} />
        <span className="hidden md:block absolute top-6 left-6 w-6 h-6 border-t-2 border-l-2 border-amber-400/40" />
        <span className="hidden md:block absolute top-6 right-6 w-6 h-6 border-t-2 border-r-2 border-amber-400/40" />
        <span className="hidden md:block absolute bottom-6 left-6 w-6 h-6 border-b-2 border-l-2 border-amber-400/40" />
        <span className="hidden md:block absolute bottom-6 right-6 w-6 h-6 border-b-2 border-r-2 border-amber-400/40" />
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-12 md:mb-20"
          >
            <div className="inline-flex items-center gap-2 bg-yellow-100 border border-yellow-200 rounded-full px-4 py-2 mb-6">
              <FileText className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-violet-700 font-medium">FAQ</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6 font-bold leading-tight px-4">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}>
            <FAQAccordion items={faqItems} />
          </motion.div>
        </div>
      </section>

      {/* Pricing & Contact Section */}
      <section id="contact" className="relative py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-violet-50 overflow-hidden">
        <RetailSceneStripe className="absolute bottom-0 left-0 right-0 h-36 md:h-44" opacity={0.2} />
        <span className="hidden md:block absolute top-6 left-6 w-6 h-6 border-t-2 border-l-2 border-amber-400/40" />
        <span className="hidden md:block absolute top-6 right-6 w-6 h-6 border-t-2 border-r-2 border-amber-400/40" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-12 md:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6 font-bold leading-tight px-4">
              Let's{" "}
              <span className="bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent">
                Get Started
              </span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            {/* Pricing */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <h3 className="text-3xl md:text-4xl mb-4 font-bold">Explore the Possibilities</h3>
              <p className="text-xl text-gray-600 mb-8">
                Estimate the Pricing for the Beyond Traffic subscription
              </p>
              <div className="bg-white border border-gray-200 rounded-3xl p-8 space-y-6 shadow-xl">
                <div>
                  <label className="block mb-3 text-lg">Number of Locations</label>
                  <input
                    type="number"
                    className="w-full px-5 py-4 rounded-2xl border border-gray-300 bg-gray-50 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all outline-none"
                    placeholder="1"
                  />
                </div>
                <div>
                  <label className="block mb-3 text-lg">Sensors per Location</label>
                  <input
                    type="number"
                    className="w-full px-5 py-4 rounded-2xl border border-gray-300 bg-gray-50 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all outline-none"
                    placeholder="2"
                  />
                </div>
                <div className="pt-6 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-700 text-lg">Estimated Monthly Cost</span>
                    <span className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent">
                      Contact Us
                    </span>
                  </div>
                  <p className="text-gray-600">Custom pricing tailored to your specific needs</p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <h3 className="text-3xl md:text-4xl mb-4 font-bold">Book Your Free Demo</h3>
              <p className="text-xl text-gray-600 mb-8">Get in touch with our team</p>
              <form onSubmit={handleSubmit} className="space-y-5 bg-white border border-gray-200 rounded-3xl p-8 shadow-xl">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block mb-2 text-sm">Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all outline-none"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm">Company</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all outline-none"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block mb-2 text-sm">Role</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all outline-none"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all outline-none"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block mb-2 text-sm">Phone</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all outline-none"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm">Number of Locations</label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all outline-none"
                      value={formData.locations}
                      onChange={(e) => setFormData({ ...formData, locations: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-2 text-sm">Industry</label>
                  <select
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all outline-none"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  >
                    <option value="">Select Industry</option>
                    <option value="fashion">Fashion & Apparel</option>
                    <option value="mall">Shopping Mall</option>
                    <option value="jewelry">Jewellery & Luxury</option>
                    <option value="hospitality">Hospitality & F&B</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm">Message</label>
                  <textarea
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all outline-none resize-none"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm">How did you hear about us?</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all outline-none"
                    value={formData.source}
                    onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 text-white px-8 py-4 rounded-2xl hover:shadow-xl hover:shadow-yellow-500/30 transition-all font-medium text-lg flex items-center justify-center gap-2 group"
                >
                  Submit Request
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-12 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-yellow-500/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-600/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12 mb-12 md:mb-16">
            <div className="col-span-2 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-500/30">
                  <Eye className="w-7 h-7 text-white" />
                </div>
                <span className="text-2xl font-semibold">Beyond Traffic</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed text-lg">
                The most accurate people counting system for retail in the UAE.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-yellow-500 transition-all"
                >
                  <span className="text-xs">ð•</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-yellow-500 transition-all"
                >
                  <span className="text-xs">in</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-yellow-500 transition-all"
                >
                  <span className="text-xs">f</span>
                </a>
              </div>
            </div>
            <div>
              <h4 className="mb-6 text-lg font-semibold">Platform</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors">
                    Footfall Counter
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-yellow-400 transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors">
                    People counting sensor
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-6 text-lg font-semibold">Industries</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#industries" className="hover:text-yellow-400 transition-colors">
                    Fashion
                  </a>
                </li>
                <li>
                  <a href="#industries" className="hover:text-yellow-400 transition-colors">
                    Malls
                  </a>
                </li>
                <li>
                  <a href="#industries" className="hover:text-yellow-400 transition-colors">
                    Hospitality
                  </a>
                </li>
                <li>
                  <a href="#industries" className="hover:text-yellow-400 transition-colors">
                    F&B
                  </a>
                </li>
                <li>
                  <a href="#industries" className="hover:text-yellow-400 transition-colors">
                    Jewelry
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-6 text-lg font-semibold">Resources</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#faq" className="hover:text-yellow-400 transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#testimonials" className="hover:text-yellow-400 transition-colors">
                    Testimonials
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-12 pb-8">
            <div className="max-w-lg">
              <h4 className="mb-3 md:mb-4 text-lg md:text-xl font-semibold">Subscribe to our newsletter</h4>
              <p className="text-gray-400 mb-4 md:mb-6 text-sm md:text-base">
                Get the latest insights on retail analytics and footfall tracking.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 md:px-5 py-3 md:py-4 rounded-xl md:rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/50 transition-all outline-none text-sm md:text-base"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl hover:shadow-xl hover:shadow-yellow-500/30 transition-all font-medium text-sm md:text-base"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 md:mt-12 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm md:text-base">
            <p className="text-center md:text-left">© 2026 Beyond Traffic. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm">
              <a href="#" className="hover:text-yellow-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-yellow-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-yellow-400 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}