import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Building2,
  Users,
  Clock,
  Store,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  MapPin,
} from "lucide-react";

const tenantData = [
  { name: "Apple Store", visits: 4820, delta: 12, anchor: true },
  { name: "Zara", visits: 3960, delta: 8, anchor: true },
  { name: "Sephora", visits: 3420, delta: 18, anchor: false },
  { name: "Carrefour", visits: 3180, delta: -3, anchor: true },
  { name: "H&M", visits: 2860, delta: 4, anchor: false },
  { name: "Nike", visits: 2540, delta: 22, anchor: false },
  { name: "Starbucks", visits: 2310, delta: 6, anchor: false },
  { name: "Lulu", visits: 2095, delta: -1, anchor: false },
];

const zones = [
  { id: "anchorA", x: 4, y: 8, w: 26, h: 28, name: "Anchor · West", intensity: 0.85, visitors: "18.4k" },
  { id: "core1", x: 32, y: 8, w: 18, h: 22, name: "Retail Core 1", intensity: 0.55, visitors: "9.2k" },
  { id: "core2", x: 52, y: 8, w: 18, h: 22, name: "Retail Core 2", intensity: 0.65, visitors: "11.6k" },
  { id: "anchorB", x: 72, y: 8, w: 24, h: 28, name: "Anchor · East", intensity: 0.78, visitors: "16.1k" },
  { id: "common", x: 32, y: 32, w: 38, h: 10, name: "Common · Mall Walk", intensity: 0.92, visitors: "42k" },
  { id: "food", x: 4, y: 44, w: 36, h: 24, name: "Food Court", intensity: 0.7, visitors: "13.8k" },
  { id: "retail", x: 42, y: 44, w: 28, h: 24, name: "Retail Cluster", intensity: 0.5, visitors: "7.4k" },
  { id: "entertainment", x: 72, y: 44, w: 24, h: 24, name: "Entertainment", intensity: 0.6, visitors: "9.6k" },
  { id: "entry1", x: 8, y: 70, w: 12, h: 6, name: "Entry · North", intensity: 0.95, visitors: "—" },
  { id: "entry2", x: 44, y: 70, w: 12, h: 6, name: "Entry · Main", intensity: 1.0, visitors: "—" },
  { id: "entry3", x: 80, y: 70, w: 12, h: 6, name: "Entry · South", intensity: 0.88, visitors: "—" },
];

const dayHourGrid = [
  // 7 days × 12 hours (9A → 8P)
  [12, 22, 35, 48, 52, 58, 54, 46, 38, 44, 30, 18],
  [14, 26, 40, 55, 60, 68, 62, 52, 44, 50, 36, 22],
  [10, 20, 32, 46, 50, 56, 50, 42, 36, 42, 28, 16],
  [18, 30, 48, 62, 70, 78, 72, 60, 52, 58, 42, 26],
  [22, 36, 56, 72, 82, 92, 88, 76, 66, 74, 56, 36],
  [28, 44, 64, 82, 94, 100, 96, 88, 78, 86, 68, 46],
  [24, 40, 58, 76, 86, 94, 88, 80, 70, 78, 60, 40],
];
const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const hourLabels = ["9A", "10A", "11A", "12P", "1P", "2P", "3P", "4P", "5P", "6P", "7P", "8P"];

function intensityToAmber(i: number) {
  return `rgba(217, 119, 6, ${0.08 + i * 0.85})`;
}

export function MallAnalytics() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setInView(true),
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="mall-analytics"
      ref={ref}
      className="relative py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-black"
    >
      {/* Background glows */}
      <div className="absolute top-0 left-1/4 w-[40rem] h-[40rem] bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[36rem] h-[36rem] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-yellow-500/15 border border-yellow-500/30 rounded-full px-5 py-2 mb-6 backdrop-blur-sm"
          >
            <Building2 className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-bold uppercase tracking-widest text-yellow-300">Mall Analytics</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 font-black leading-tight uppercase tracking-tight text-white"
          >
            Run your mall like{" "}
            <span className="bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
              an operating system.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            Network-wide footfall, zone heatmaps, tenant performance, anchor pull-through — every signal you need to manage tenants, leasing and operations.
          </motion.p>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
          {[
            { icon: <Users className="w-4 h-4" />, label: "Mall footfall today", value: "124,820", delta: "+8.2%", up: true },
            { icon: <Store className="w-4 h-4" />, label: "Active tenants", value: "85 / 92", delta: "92% live", up: true },
            { icon: <Clock className="w-4 h-4" />, label: "Avg visit duration", value: "47 min", delta: "+4 min", up: true },
            { icon: <Activity className="w-4 h-4" />, label: "Anchor pull-through", value: "38.4%", delta: "+2.1 pts", up: true },
          ].map((k, i) => (
            <motion.div
              key={k.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              whileHover={{ y: -3 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 hover:border-yellow-500/40 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="w-7 h-7 rounded-lg bg-yellow-500/15 text-yellow-400 flex items-center justify-center border border-yellow-500/30">
                  {k.icon}
                </span>
                <span
                  className={`text-[10px] font-black uppercase tracking-wider flex items-center gap-0.5 ${
                    k.up ? "text-amber-400" : "text-rose-400"
                  }`}
                >
                  {k.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {k.delta}
                </span>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{k.label}</p>
              <p className="text-xl md:text-2xl font-black text-white tabular-nums leading-tight">{k.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Main row: Floor heatmap + Tenant performance */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-6 mb-6 md:mb-8">
          {/* Floor heatmap */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-5 md:p-6 relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-yellow-400 mb-1">Live floor heatmap</p>
                <h3 className="text-lg md:text-xl font-black text-white">Mall layout · ground level</h3>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-amber-400">
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-amber-400"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                />
                Live · 11 zones
              </div>
            </div>

            <div className="relative aspect-[16/10] rounded-2xl border border-yellow-500/20 bg-gradient-to-br from-gray-950 to-black overflow-hidden">
              {/* Grid background */}
              <svg className="absolute inset-0 w-full h-full opacity-25" viewBox="0 0 100 80" preserveAspectRatio="none">
                {[...Array(20)].map((_, i) => (
                  <line key={`g-h-${i}`} x1={0} y1={i * 4} x2={100} y2={i * 4} stroke="#EAB308" strokeWidth="0.1" />
                ))}
                {[...Array(25)].map((_, i) => (
                  <line key={`g-v-${i}`} x1={i * 4} y1={0} x2={i * 4} y2={80} stroke="#EAB308" strokeWidth="0.1" />
                ))}
              </svg>

              {/* Zones */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 80" preserveAspectRatio="none">
                {zones.map((z, i) => (
                  <g key={z.id}>
                    <motion.rect
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.2 + i * 0.05, duration: 0.5 }}
                      x={z.x}
                      y={z.y}
                      width={z.w}
                      height={z.h}
                      rx="1.5"
                      fill={intensityToAmber(z.intensity)}
                      stroke="rgba(251, 191, 36, 0.6)"
                      strokeWidth="0.25"
                    />
                  </g>
                ))}
              </svg>

              {/* Zone labels — HTML positioned */}
              {zones.map((z, i) => (
                <motion.div
                  key={`label-${z.id}`}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.04, duration: 0.4 }}
                  className="absolute pointer-events-none"
                  style={{
                    left: `${z.x + z.w / 2}%`,
                    top: `${z.y + z.h / 2}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="text-center px-1.5 py-0.5 rounded bg-black/40 backdrop-blur-sm border border-yellow-500/20">
                    <p className="text-[8px] md:text-[9px] font-black uppercase tracking-wider text-yellow-300 leading-none whitespace-nowrap">
                      {z.name}
                    </p>
                    <p className="text-[9px] md:text-[10px] font-black text-white tabular-nums leading-tight">{z.visitors}</p>
                  </div>
                </motion.div>
              ))}

              {/* Pulsing entry markers */}
              {zones
                .filter((z) => z.id.startsWith("entry"))
                .map((z) => (
                  <motion.div
                    key={`pulse-${z.id}`}
                    className="absolute"
                    style={{
                      left: `${z.x + z.w / 2}%`,
                      top: `${z.y + z.h / 2}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <motion.div
                      animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-3 h-3 rounded-full bg-yellow-400"
                    />
                  </motion.div>
                ))}

              {/* Corner brackets */}
              <span className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-yellow-400/50" />
              <span className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-yellow-400/50" />
              <span className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-yellow-400/50" />
              <span className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-yellow-400/50" />
            </div>

            {/* Heatmap legend */}
            <div className="flex items-center justify-between mt-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                Sensor 01 → 32 · 30-day blended
              </span>
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mr-1">Low</span>
                {[0.15, 0.35, 0.55, 0.75, 0.95].map((i) => (
                  <span key={i} className="w-4 h-2.5 rounded-sm" style={{ background: intensityToAmber(i) }} />
                ))}
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">High</span>
              </div>
            </div>
          </motion.div>

          {/* Tenant performance */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-5 md:p-6 relative"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-yellow-400 mb-1">Top tenants</p>
                <h3 className="text-lg md:text-xl font-black text-white">Footfall · this week</h3>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">vs last week</span>
            </div>

            <div className="space-y-2.5">
              {tenantData.map((t, i) => {
                const maxVisits = tenantData[0].visits;
                const pct = (t.visits / maxVisits) * 100;
                const up = t.delta >= 0;
                return (
                  <motion.div
                    key={t.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    className="group cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-black text-white">{t.name}</span>
                        {t.anchor && (
                          <span className="text-[8px] font-black uppercase tracking-wider px-1 py-0.5 rounded bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                            Anchor
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-black text-white tabular-nums">{t.visits.toLocaleString()}</span>
                        <span
                          className={`text-[10px] font-black tabular-nums w-10 text-right ${
                            up ? "text-amber-400" : "text-rose-400"
                          }`}
                        >
                          {up ? "↑" : "↓"} {Math.abs(t.delta)}%
                        </span>
                      </div>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.06 + 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className={`h-full rounded-full ${
                          t.anchor
                            ? "bg-gradient-to-r from-yellow-500 to-amber-400"
                            : "bg-gradient-to-r from-amber-600 to-amber-500"
                        } group-hover:from-yellow-400 group-hover:to-amber-300 transition-all`}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Bottom row: Day x Hour heatmap + Zone dwell */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-6">
          {/* Day x hour heatmap */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-5 md:p-6"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-yellow-400 mb-1">Footfall heatmap</p>
                <h3 className="text-lg md:text-xl font-black text-white">Day × hour · mall-wide</h3>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Peak · Sat 2 PM</span>
            </div>

            <div className="overflow-x-auto">
              <div className="inline-flex flex-col gap-1.5 min-w-full">
                {/* Header row */}
                <div className="grid grid-cols-[40px_repeat(12,minmax(0,1fr))] gap-1 items-center">
                  <div />
                  {hourLabels.map((h) => (
                    <div key={h} className="text-center text-[9px] font-black uppercase tracking-wider text-gray-500">
                      {h}
                    </div>
                  ))}
                </div>
                {dayHourGrid.map((row, dayIdx) => (
                  <div key={dayLabels[dayIdx]} className="grid grid-cols-[40px_repeat(12,minmax(0,1fr))] gap-1 items-center">
                    <div className="text-[9px] font-black uppercase tracking-wider text-gray-400">{dayLabels[dayIdx]}</div>
                    {row.map((v, hourIdx) => {
                      const isPeak = dayIdx === 5 && hourIdx === 5;
                      return (
                        <motion.div
                          key={`${dayIdx}-${hourIdx}`}
                          initial={{ opacity: 0, scale: 0.6 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: (dayIdx * 12 + hourIdx) * 0.005, duration: 0.3 }}
                          whileHover={{ scale: 1.3, zIndex: 10 }}
                          className={`aspect-square rounded-md cursor-pointer relative group ${
                            isPeak ? "ring-2 ring-yellow-400" : ""
                          }`}
                          style={{ backgroundColor: intensityToAmber(v / 100) }}
                          title={`${dayLabels[dayIdx]} ${hourLabels[hourIdx]} · ${v * 18} ppl`}
                        >
                          <span className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-black border border-yellow-500/40 rounded text-[9px] font-black text-yellow-300 whitespace-nowrap transition-opacity pointer-events-none">
                            {v * 18} ppl
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Zone dwell ranking */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-5 md:p-6 flex flex-col"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-yellow-400 mb-1">Avg dwell</p>
                <h3 className="text-lg md:text-xl font-black text-white">By zone · minutes</h3>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">7-day avg</span>
            </div>
            <div className="flex-1 min-h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={[
                    { zone: "Food Court", dwell: 62 },
                    { zone: "Anchor · West", dwell: 48 },
                    { zone: "Entertainment", dwell: 44 },
                    { zone: "Anchor · East", dwell: 38 },
                    { zone: "Retail Core 2", dwell: 22 },
                    { zone: "Retail Core 1", dwell: 18 },
                    { zone: "Common Walk", dwell: 9 },
                  ]}
                  margin={{ top: 4, right: 28, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="dwellBar" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#b45309" />
                      <stop offset="100%" stopColor="#FACC15" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#1f2937" horizontal={false} />
                  <XAxis type="number" hide />
                  <YAxis
                    type="category"
                    dataKey="zone"
                    tick={{ fontSize: 10, fill: "#d4d4d8", fontWeight: 700 }}
                    tickLine={false}
                    axisLine={false}
                    width={100}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(251, 191, 36,0.06)" }}
                    contentStyle={{ background: "#0f172a", border: "1px solid #374151", borderRadius: 10, fontSize: 11 }}
                    formatter={(v: number) => [`${v} min`, "Dwell"]}
                  />
                  <Bar dataKey="dwell" radius={[0, 5, 5, 0]} isAnimationActive animationDuration={1300}>
                    {[62, 48, 44, 38, 22, 18, 9].map((_, i) => (
                      <Cell key={i} fill="url(#dwellBar)" />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/10 text-[10px] font-black uppercase tracking-widest text-gray-400">
              <MapPin className="w-3 h-3 text-yellow-400" />
              Food court drives the longest dwell · ideal for premium ad placement
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
