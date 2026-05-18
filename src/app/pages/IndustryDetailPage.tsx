import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  ChevronDown,
  Menu,
  Minus,
  CheckCircle2,
  Eye,
  Activity,
  Radio,
  X,
} from "lucide-react";
import { NAV_DROPDOWNS, MOBILE_NAV_LINKS } from "../data/navigation";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  getIndustryBySlug,
  INDUSTRIES,
  type Industry,
  type IndustryChart,
} from "../data/industries";

export function IndustryDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const industry = getIndustryBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!industry) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-white">
        <div className="text-center max-w-md">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
            Industry not found
          </h1>
          <p className="text-gray-600 mb-6">
            We couldn&apos;t find the industry you&apos;re looking for. Browse our other industries below.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-amber-600 text-white px-6 py-3 rounded-full font-bold shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Beyond Traffic
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <SiteHeader />
      <IndustryHero industry={industry} />
      <IndustryTodayPulse industry={industry} />
      <IndustryIntro industry={industry} />
      <IndustryKpiGrid industry={industry} />
      <IndustryCharts industry={industry} />
      <IndustryScenarios industry={industry} />
      <IndustryOtherSwitcher current={industry.slug} />
      <IndustryCta industry={industry} />
      <IndustryFooter />
    </div>
  );
}

/* ─────────────────────  utility — in-page scroll  ─────────────────── */

function scrollToDashboard() {
  document
    .getElementById("industry-dashboard")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ─────────────────────────────  HEADER  ──────────────────────────── */

/**
 * Shared site header used on the industry pages. Matches the home-page
 * header one-to-one (logo + Platform/Industry/Resources dropdowns +
 * Pricing + Book Demo + mobile menu) so the navigation feels identical
 * across the whole site.
 */
function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
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
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
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
        </Link>

        {/* Desktop nav */}
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

        {/* Right actions */}
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
            <motion.div animate={{ rotate: mobileMenuOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
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
  );
}

/* ─────────────────────────────  HERO  ────────────────────────────── */

function IndustryHero({ industry }: { industry: Industry }) {
  return (
    <section className="relative overflow-hidden bg-white pt-8 md:pt-12 pb-12 md:pb-16 px-4 sm:px-6 lg:px-8">
      {/* Soft yellow ambient orbs — consistent with landing page */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-yellow-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-gray-600 hover:text-yellow-700 transition-colors mb-6 uppercase tracking-wide"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Beyond Traffic
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="mb-4 md:mb-5"
        >
          <span className="stori-label">{industry.hero.eyebrow}</span>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-start">
          {/* LEFT — headline + subhead + CTAs + stats */}
          <div className="lg:col-span-6 xl:col-span-7">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black leading-[0.95] tracking-tight mb-5 md:mb-6"
            >
              <span className="text-gray-900">{industry.hero.headline}</span>{" "}
              <span className="stori-gradient">{industry.hero.highlight}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg text-gray-700 max-w-2xl leading-relaxed font-medium"
            >
              {industry.hero.subhead}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-7 md:mt-8 flex flex-wrap gap-3"
            >
              <Link
                to="/#contact"
                className="group bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-500 text-white px-6 py-3 md:px-7 md:py-3.5 rounded-full shadow-2xl shadow-yellow-500/40 hover:shadow-yellow-500/60 transition-shadow duration-300 flex items-center gap-2 text-sm md:text-base font-semibold"
              >
                <span>Book a Demo</span>
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>
              <button
                type="button"
                onClick={scrollToDashboard}
                className="text-gray-800 px-5 py-3 md:px-6 md:py-3.5 rounded-full border-2 border-gray-200 hover:border-yellow-400 hover:text-yellow-700 transition-colors flex items-center gap-2 text-sm md:text-base font-semibold"
              >
                See Live Dashboard
              </button>
            </motion.div>

            {/* Hero stat strip under the CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 md:mt-10 grid grid-cols-3 gap-3 md:gap-4 max-w-lg"
            >
              {industry.hero.stats.map((s, i) => (
                <div
                  key={i}
                  className="bg-white/85 backdrop-blur-sm border border-yellow-200/70 rounded-2xl px-3 py-3 md:py-4 text-center shadow-sm shadow-yellow-200/40"
                >
                  <div className="text-lg md:text-xl font-black tabular-nums leading-none bg-gradient-to-r from-yellow-600 to-amber-700 bg-clip-text text-transparent">
                    {s.value}
                  </div>
                  <div className="mt-1.5 text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-gray-600 leading-tight">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — live dashboard panel */}
          <div className="lg:col-span-6 xl:col-span-5">
            <IndustryLiveDashboard industry={industry} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────  LIVE DASHBOARD HERO PANEL  ───────────────────── */

function IndustryLiveDashboard({ industry }: { industry: Industry }) {
  const Icon = industry.icon;
  const sparkData = industry.live.sparkline.map((v, i) => ({ i, v }));
  const TrendIcon =
    industry.live.delta.trend === "up"
      ? ArrowUpRight
      : industry.live.delta.trend === "down"
        ? ArrowDownRight
        : Minus;
  const trendColor =
    industry.live.delta.trend === "up"
      ? "#059669"
      : industry.live.delta.trend === "down"
        ? "#DC2626"
        : "#6B7280";

  // Live ticking clock for HUD authenticity
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const clock = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative bg-white rounded-2xl md:rounded-[24px] border border-gray-200/80 shadow-2xl shadow-yellow-300/20 overflow-hidden"
    >
      {/* Top status bar */}
      <div className="flex items-center justify-between px-4 md:px-5 py-3 border-b border-gray-100 bg-gradient-to-r from-yellow-50/60 via-white to-amber-50/60">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
          </span>
          <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.16em] text-gray-900">
            Live · {industry.live.sceneName}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] md:text-[11px] font-mono font-semibold text-gray-600 tabular-nums">
            {clock}
          </span>
          <div className="flex items-center gap-1 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5">
            <Radio className="w-3 h-3 text-emerald-600" />
            <span className="text-[9px] font-black uppercase tracking-wider text-emerald-700">
              OK
            </span>
          </div>
        </div>
      </div>

      {/* Primary metric */}
      <div className="px-4 md:px-6 pt-5 md:pt-6 pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.18em] text-gray-500 mb-2">
              {industry.live.primary.label}
            </p>
            <p className="text-4xl md:text-5xl xl:text-6xl font-black tabular-nums leading-none bg-gradient-to-r from-yellow-600 via-amber-600 to-yellow-700 bg-clip-text text-transparent">
              {industry.live.primary.value}
            </p>
            <div
              className="mt-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold"
              style={{ background: `${trendColor}14`, color: trendColor }}
            >
              <TrendIcon className="w-3.5 h-3.5" />
              <span>{industry.live.delta.value}</span>
              <span className="text-gray-400 font-semibold">vs yesterday</span>
            </div>
          </div>
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center shadow-md shadow-yellow-500/30 flex-shrink-0">
            <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
          </div>
        </div>
      </div>

      {/* Sparkline */}
      <div className="px-4 md:px-6 pb-3">
        <div className="h-24 md:h-28">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sparkData} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={`live-spark-${industry.slug}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={industry.accent.chart} stopOpacity={0.55} />
                  <stop offset="100%" stopColor={industry.accent.chart} stopOpacity={0.03} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="v"
                stroke={industry.accent.chart}
                strokeWidth={2.5}
                fill={`url(#live-spark-${industry.slug})`}
                isAnimationActive
                animationDuration={1400}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-between text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-gray-400 -mt-1">
          <span className="inline-flex items-center gap-1">
            <Activity className="w-3 h-3" />
            Last 12 hours
          </span>
          <span>Auto-refresh · 30s</span>
        </div>
      </div>

      {/* Mini stat tiles */}
      <div className="grid grid-cols-3 border-t border-gray-100 bg-gradient-to-b from-white to-gray-50/40">
        {industry.live.miniStats.map((s, i) => (
          <div
            key={s.label}
            className={`px-3 md:px-4 py-3 md:py-4 text-center ${
              i !== industry.live.miniStats.length - 1 ? "border-r border-gray-100" : ""
            }`}
          >
            <p className="text-sm md:text-base font-black tabular-nums leading-tight text-gray-900">
              {s.value}
            </p>
            <p className="mt-1 text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-gray-500 leading-tight">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ────────────────────────  TODAY'S PULSE  ────────────────────────── */

function IndustryTodayPulse({ industry }: { industry: Industry }) {
  return (
    <section className="bg-gradient-to-b from-white via-yellow-50/40 to-white border-y border-yellow-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex items-center justify-between mb-4 md:mb-6 flex-wrap gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-700 mb-1">
              Today&apos;s pulse
            </p>
            <h3 className="text-lg md:text-xl font-black text-gray-900 tracking-tight">
              How {industry.shortName.toLowerCase()} is performing right now.
            </h3>
          </div>
          <span className="inline-flex items-center gap-2 bg-white border border-yellow-200 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-700 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Live · sample data
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <PulseTile
            label={industry.live.primary.label}
            value={industry.live.primary.value}
            delta={industry.live.delta.value}
            trend={industry.live.delta.trend}
            accentColor={industry.accent.chart}
            sparkline={industry.live.sparkline}
          />
          {industry.live.miniStats.map((s) => (
            <PulseTile
              key={s.label}
              label={s.label}
              value={s.value}
              accentColor={industry.accent.chart}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PulseTile({
  label,
  value,
  delta,
  trend,
  accentColor,
  sparkline,
}: {
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down" | "flat";
  accentColor: string;
  sparkline?: number[];
}) {
  const TrendIcon = trend === "up" ? ArrowUpRight : trend === "down" ? ArrowDownRight : Minus;
  const trendColor =
    trend === "up" ? "#059669" : trend === "down" ? "#DC2626" : "#6B7280";
  const sparkData = (sparkline ?? []).map((v, i) => ({ i, v }));
  return (
    <div className="bg-white border border-yellow-200/70 rounded-2xl p-4 md:p-5 shadow-sm">
      <div className="flex items-start justify-between gap-2 mb-2">
        <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-gray-500 leading-tight">
          {label}
        </p>
        {delta && trend && (
          <span
            className="inline-flex items-center gap-1 text-[10px] font-bold rounded-full px-1.5 py-0.5"
            style={{ background: `${trendColor}14`, color: trendColor }}
          >
            <TrendIcon className="w-3 h-3" />
            {delta}
          </span>
        )}
      </div>
      <p className="text-xl md:text-2xl font-black tabular-nums leading-none bg-gradient-to-r from-yellow-600 to-amber-700 bg-clip-text text-transparent">
        {value}
      </p>
      {sparkline && sparkline.length > 0 && (
        <div className="h-9 -mx-1 mt-3">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sparkData} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={`pulse-${label.replace(/\s+/g, "")}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={accentColor} stopOpacity={0.45} />
                  <stop offset="100%" stopColor={accentColor} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="v"
                stroke={accentColor}
                strokeWidth={2}
                fill={`url(#pulse-${label.replace(/\s+/g, "")})`}
                isAnimationActive
                animationDuration={1200}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────  INTRO  ───────────────────────────── */

function IndustryIntro({ industry }: { industry: Industry }) {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 pb-2">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="text-lg md:text-xl text-gray-700 leading-relaxed"
      >
        {industry.intro}
      </motion.p>
    </section>
  );
}

/* ─────────────────────────────  KPI GRID  ────────────────────────── */

function IndustryKpiGrid({ industry }: { industry: Industry }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-14 pb-6">
      <div className="mb-6 md:mb-8">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-700 mb-2">
          Live KPIs · sample data
        </p>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-gray-900">
          The metrics this industry actually moves on.
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {industry.kpis.map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.35, delay: i * 0.04 }}
            className="bg-white border border-yellow-200/70 rounded-2xl p-4 md:p-5 hover:shadow-md hover:shadow-yellow-200/40 transition-shadow"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <p className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-gray-500">
                {k.label}
              </p>
              {k.trend && <TrendBadge change={k.change} trend={k.trend} />}
            </div>
            <p className="text-2xl md:text-3xl font-black tabular-nums leading-none bg-gradient-to-r from-yellow-600 to-amber-700 bg-clip-text text-transparent">
              {k.value}
            </p>
            {k.caption && (
              <p className="mt-2 text-[11px] md:text-xs text-gray-500 leading-snug">
                {k.caption}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function TrendBadge({
  change,
  trend,
}: {
  change?: string;
  trend: "up" | "down" | "flat";
}) {
  const Icon = trend === "up" ? ArrowUpRight : trend === "down" ? ArrowDownRight : Minus;
  const color =
    trend === "up" ? "#059669" : trend === "down" ? "#DC2626" : "#6B7280";
  return (
    <div
      className="inline-flex items-center gap-1 text-[10px] md:text-[11px] font-bold rounded-full px-2 py-0.5"
      style={{ background: `${color}14`, color }}
    >
      <Icon className="w-3 h-3" />
      <span>{change ?? ""}</span>
    </div>
  );
}

/* ─────────────────────────────  CHARTS  ──────────────────────────── */

function IndustryCharts({ industry }: { industry: Industry }) {
  return (
    <section
      id="industry-dashboard"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 pb-12 md:pb-16 scroll-mt-24"
    >
      <div className="mb-6 md:mb-8">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-700 mb-2">
          Dashboard preview
        </p>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-gray-900">
          What you see in the Beyond Traffic dashboard.
        </h2>
      </div>
      <div className="grid lg:grid-cols-2 gap-4 md:gap-6">
        {industry.charts.map((chart, i) => (
          <motion.div
            key={chart.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className={`bg-white border border-yellow-200/70 rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-md hover:shadow-yellow-200/40 transition-shadow ${
              i === 0 ? "lg:col-span-2" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <h3 className="text-base md:text-lg font-black text-gray-900 leading-tight">
                  {chart.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-500 mt-0.5">
                  {chart.subtitle}
                </p>
              </div>
              {chart.unit && (
                <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-amber-700 whitespace-nowrap bg-yellow-50 border border-yellow-200 rounded-full px-2 py-0.5">
                  {chart.unit}
                </span>
              )}
            </div>
            <div className="h-52 md:h-64">
              <ChartBody chart={chart} accent={industry.accent.chart} />
            </div>
            {chart.series && (
              <div className="mt-3 flex items-center gap-4 flex-wrap">
                {chart.series.map((s) => (
                  <span
                    key={s.key}
                    className="inline-flex items-center gap-1.5 text-[11px] md:text-xs font-semibold text-gray-600"
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: s.color }}
                    />
                    {s.label}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ChartBody({ chart, accent }: { chart: IndustryChart; accent: string }) {
  const series = chart.series ?? [{ key: "value", label: "Value", color: accent }];
  const tooltipStyle = {
    borderRadius: 10,
    border: "1px solid #E5E7EB",
    fontSize: 12,
    fontWeight: 600,
  };

  if (chart.type === "area") {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chart.data} margin={{ top: 8, right: 12, left: -16, bottom: 0 }}>
          <defs>
            {series.map((s) => (
              <linearGradient
                key={s.key}
                id={`grad-${chart.id}-${s.key}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor={s.color} stopOpacity={0.42} />
                <stop offset="100%" stopColor={s.color} stopOpacity={0.02} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
          <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} width={36} />
          <Tooltip contentStyle={tooltipStyle} />
          {series.map((s) => (
            <Area
              key={s.key}
              type="monotone"
              dataKey={s.key}
              stroke={s.color}
              strokeWidth={2.5}
              fill={`url(#grad-${chart.id}-${s.key})`}
              isAnimationActive
              animationDuration={1200}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  if (chart.type === "line") {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chart.data} margin={{ top: 8, right: 12, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
          <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} width={36} />
          <Tooltip contentStyle={tooltipStyle} />
          {series.map((s) => (
            <Line
              key={s.key}
              type="monotone"
              dataKey={s.key}
              stroke={s.color}
              strokeWidth={2.5}
              dot={{ r: 3, fill: s.color }}
              activeDot={{ r: 5 }}
              isAnimationActive
              animationDuration={1200}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chart.data} margin={{ top: 8, right: 12, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
        <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} width={36} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "#FFFBEB" }} />
        {series.map((s) => (
          <Bar
            key={s.key}
            dataKey={s.key}
            fill={s.color}
            radius={[8, 8, 0, 0]}
            isAnimationActive
            animationDuration={1100}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

/* ─────────────────────────────  SCENARIOS  ───────────────────────── */

function IndustryScenarios({ industry }: { industry: Industry }) {
  return (
    <section className="bg-gradient-to-b from-white via-yellow-50/40 to-white border-y border-yellow-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="mb-8 md:mb-10 max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-700 mb-2">
            Operational use cases
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-gray-900">
            How {industry.shortName.toLowerCase()} teams put this data to work.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {industry.scenarios.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="bg-white border border-yellow-200/70 rounded-2xl p-5 md:p-6 hover:shadow-md hover:shadow-yellow-200/40 transition-shadow flex gap-4"
            >
              <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center flex-shrink-0 shadow-md shadow-yellow-500/30">
                <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <h3 className="text-base md:text-lg font-black text-gray-900 mb-1.5 leading-tight">
                  {s.title}
                </h3>
                <p className="text-sm md:text-[15px] text-gray-600 leading-relaxed">
                  {s.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────  EXPLORE OTHER INDUSTRIES  ────────────────── */

function IndustryOtherSwitcher({ current }: { current: string }) {
  const others = useMemo(
    () => INDUSTRIES.filter((i) => i.slug !== current),
    [current],
  );
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="mb-6 md:mb-8">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-700 mb-2">
          Other industries we serve
        </p>
        <h2 className="text-xl md:text-2xl font-black tracking-tight text-gray-900">
          Explore the rest of the Beyond Traffic platform
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {others.map((o) => {
          const Icon = o.icon;
          return (
            <Link
              key={o.slug}
              to={`/industries/${o.slug}`}
              className="group bg-white border border-yellow-200/70 rounded-2xl p-4 md:p-5 hover:shadow-md hover:shadow-yellow-200/40 transition-all hover:-translate-y-0.5"
            >
              <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center mb-3 shadow-md shadow-yellow-500/30">
                <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <p className="text-sm md:text-base font-black text-gray-900 leading-tight">
                {o.name}
              </p>
              <span className="mt-2 inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest text-amber-700 group-hover:gap-2 transition-all">
                Explore
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

/* ─────────────────────────────  CTA  ─────────────────────────────── */

function IndustryCta({ industry }: { industry: Industry }) {
  return (
    <section className="px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-yellow-500 via-amber-500 to-yellow-500 p-8 md:p-12 shadow-2xl shadow-yellow-500/40"
        >
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/15 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-black/15 rounded-full blur-3xl" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-black text-white leading-tight mb-2">
                {industry.cta.title}
              </h3>
              <p className="text-sm md:text-base text-white/90 leading-relaxed max-w-2xl">
                {industry.cta.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/#contact"
                className="bg-white text-gray-900 px-5 py-3 md:px-6 md:py-3.5 rounded-full font-bold text-sm md:text-base shadow-lg hover:shadow-xl transition-shadow inline-flex items-center gap-2"
              >
                Book Demo
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={scrollToDashboard}
                className="bg-white/10 backdrop-blur-sm text-white border border-white/30 px-5 py-3 md:px-6 md:py-3.5 rounded-full font-bold text-sm md:text-base hover:bg-white/20 transition-colors inline-flex items-center gap-2"
              >
                See Live Dashboard
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────  FOOTER  ──────────────────────────── */

function IndustryFooter() {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-10 md:py-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-yellow-500/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-600/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-500/30">
            <Eye className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-white font-black text-lg leading-none">
              Beyond Traffic<span className="text-yellow-500">.</span>
            </p>
            <p className="text-xs mt-1 text-gray-400">
              Real-time retail intelligence for the UAE.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs md:text-sm font-semibold text-gray-400 uppercase tracking-wide">
          <Link to="/" className="hover:text-yellow-400 transition-colors">
            Home
          </Link>
          <Link to="/#features" className="hover:text-yellow-400 transition-colors">
            Features
          </Link>
          <Link to="/#hardware" className="hover:text-yellow-400 transition-colors">
            Hardware
          </Link>
          <Link to="/#pricing" className="hover:text-yellow-400 transition-colors">
            Pricing
          </Link>
          <Link to="/#contact" className="hover:text-yellow-400 transition-colors">
            Contact
          </Link>
        </div>

        <p className="text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Beyond Traffic. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
