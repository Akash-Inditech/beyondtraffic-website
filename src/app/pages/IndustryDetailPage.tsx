import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
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
import { getIndustryBySlug, INDUSTRIES, type Industry, type IndustryChart } from "../data/industries";

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
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Industry not found</h1>
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
      <IndustryHeader industry={industry} />
      <IndustryHero industry={industry} />
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

/* ─────────────────────────────  HEADER  ──────────────────────────── */

function IndustryHeader({ industry }: { industry: Industry }) {
  const Icon = industry.icon;
  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 md:h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center shadow-md shadow-yellow-500/30">
            <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </div>
          <span className="font-black text-base md:text-lg tracking-tight text-gray-900 group-hover:text-amber-700 transition-colors">
            Beyond Traffic
          </span>
        </Link>

        <div className="hidden sm:flex items-center gap-1.5 text-[11px] md:text-xs font-semibold tracking-wide text-gray-500">
          <Link to="/" className="hover:text-gray-900 transition-colors">
            Home
          </Link>
          <span aria-hidden>/</span>
          <Link to="/#industries" className="hover:text-gray-900 transition-colors">
            Industries
          </Link>
          <span aria-hidden>/</span>
          <span className="text-gray-900 inline-flex items-center gap-1.5">
            <Icon className={`w-3.5 h-3.5 ${industry.accent.text}`} />
            {industry.shortName}
          </span>
        </div>

        <Link
          to="/#contact"
          className={`hidden md:inline-flex items-center gap-2 bg-gradient-to-r ${industry.accent.grad} text-white px-4 py-2 rounded-full text-xs font-bold shadow-md hover:shadow-lg transition-shadow`}
        >
          Book Demo
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </header>
  );
}

/* ─────────────────────────────  HERO  ────────────────────────────── */

function IndustryHero({ industry }: { industry: Industry }) {
  const Icon = industry.icon;
  return (
    <section className={`relative overflow-hidden ${industry.accent.softBg}`}>
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-50 blur-3xl pointer-events-none"
        style={{ background: industry.accent.chart }}
      />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{ background: industry.accent.chart }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-16 pb-12 md:pb-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Beyond Traffic
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 mb-5"
        >
          <span
            className={`inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-900 rounded-full px-3.5 py-1.5 text-[11px] md:text-xs font-bold uppercase tracking-[0.18em]`}
          >
            <Icon className={`w-4 h-4 ${industry.accent.text}`} />
            {industry.hero.eyebrow}
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7 xl:col-span-7">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-black leading-[0.95] tracking-tight text-gray-900 mb-5"
            >
              {industry.hero.headline}{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${industry.accent.chart} 0%, #1F2937 100%)`,
                }}
              >
                {industry.hero.highlight}
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-base md:text-lg text-gray-700 max-w-2xl leading-relaxed"
            >
              {industry.hero.subhead}
            </motion.p>
          </div>

          <div className="lg:col-span-5 xl:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-3 gap-3 md:gap-4"
            >
              {industry.hero.stats.map((s, i) => (
                <div
                  key={i}
                  className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl px-3 py-4 md:py-5 text-center shadow-md"
                >
                  <div
                    className="text-xl md:text-2xl font-black tabular-nums leading-none"
                    style={{ color: industry.accent.chart }}
                  >
                    {s.value}
                  </div>
                  <div className="mt-2 text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-gray-600 leading-tight">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
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
        <p className={`text-xs font-bold uppercase tracking-[0.22em] ${industry.accent.text} mb-2`}>
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
            className="bg-white border border-gray-200 rounded-2xl p-4 md:p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <p className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-gray-500">
                {k.label}
              </p>
              {k.trend && <TrendBadge change={k.change} trend={k.trend} />}
            </div>
            <p
              className="text-2xl md:text-3xl font-black tabular-nums leading-none"
              style={{ color: industry.accent.chart }}
            >
              {k.value}
            </p>
            {k.caption && (
              <p className="mt-2 text-[11px] md:text-xs text-gray-500 leading-snug">{k.caption}</p>
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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 pb-12 md:pb-16">
      <div className="mb-6 md:mb-8">
        <p className={`text-xs font-bold uppercase tracking-[0.22em] ${industry.accent.text} mb-2`}>
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
            className={`bg-white border border-gray-200 rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow ${
              i === 0 ? "lg:col-span-2" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <h3 className="text-base md:text-lg font-black text-gray-900 leading-tight">
                  {chart.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-500 mt-0.5">{chart.subtitle}</p>
              </div>
              {chart.unit && (
                <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-gray-400 whitespace-nowrap">
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
                  <span key={s.key} className="inline-flex items-center gap-1.5 text-[11px] md:text-xs font-semibold text-gray-600">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
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
              <linearGradient key={s.key} id={`grad-${chart.id}-${s.key}`} x1="0" y1="0" x2="0" y2="1">
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

  // bar
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chart.data} margin={{ top: 8, right: 12, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
        <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} width={36} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "#F9FAFB" }} />
        {series.map((s) => (
          <Bar key={s.key} dataKey={s.key} fill={s.color} radius={[8, 8, 0, 0]} isAnimationActive animationDuration={1100} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

/* ─────────────────────────────  SCENARIOS  ───────────────────────── */

function IndustryScenarios({ industry }: { industry: Industry }) {
  return (
    <section className="bg-gray-50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="mb-8 md:mb-10 max-w-3xl">
          <p className={`text-xs font-bold uppercase tracking-[0.22em] ${industry.accent.text} mb-2`}>
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
              className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6 hover:shadow-md transition-shadow flex gap-4"
            >
              <div
                className={`w-10 h-10 md:w-11 md:h-11 rounded-xl bg-gradient-to-br ${industry.accent.grad} flex items-center justify-center flex-shrink-0 shadow-md`}
              >
                <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <h3 className="text-base md:text-lg font-black text-gray-900 mb-1.5 leading-tight">
                  {s.title}
                </h3>
                <p className="text-sm md:text-[15px] text-gray-600 leading-relaxed">{s.description}</p>
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
  const others = useMemo(() => INDUSTRIES.filter((i) => i.slug !== current), [current]);
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="mb-6 md:mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-gray-500 mb-2">
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
              className="group bg-white border border-gray-200 rounded-2xl p-4 md:p-5 hover:shadow-md transition-all hover:-translate-y-0.5"
            >
              <div
                className={`w-10 h-10 md:w-11 md:h-11 rounded-xl bg-gradient-to-br ${o.accent.grad} flex items-center justify-center mb-3 shadow-md`}
              >
                <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <p className="text-sm md:text-base font-black text-gray-900 leading-tight">{o.name}</p>
              <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-gray-500 group-hover:text-gray-900 transition-colors">
                View
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
          className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${industry.accent.grad} p-8 md:p-12 shadow-2xl`}
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
              <Link
                to="/"
                className="bg-white/10 backdrop-blur-sm text-white border border-white/30 px-5 py-3 md:px-6 md:py-3.5 rounded-full font-bold text-sm md:text-base hover:bg-white/20 transition-colors inline-flex items-center gap-2"
              >
                Platform overview
              </Link>
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
    <footer className="bg-gray-900 text-gray-400 py-10 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center shadow-md">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-white font-black text-lg leading-none">Beyond Traffic</p>
            <p className="text-xs mt-1">Real-time retail intelligence for the UAE.</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs md:text-sm font-semibold">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <Link to="/#features" className="hover:text-white transition-colors">Features</Link>
          <Link to="/#hardware" className="hover:text-white transition-colors">Hardware</Link>
          <Link to="/#pricing" className="hover:text-white transition-colors">Pricing</Link>
          <Link to="/#contact" className="hover:text-white transition-colors">Contact</Link>
        </div>
        <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} Beyond Traffic. All rights reserved.</p>
      </div>
    </footer>
  );
}
