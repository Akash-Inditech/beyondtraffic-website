import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";
import {
  Users,
  TrendingUp,
  Clock,
  Activity,
  Wifi,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
} from "lucide-react";

const hourlyData = [
  { hour: "9A", visitors: 42 },
  { hour: "10A", visitors: 78 },
  { hour: "11A", visitors: 124 },
  { hour: "12P", visitors: 168 },
  { hour: "1P", visitors: 192 },
  { hour: "2P", visitors: 247 },
  { hour: "3P", visitors: 215 },
  { hour: "4P", visitors: 178 },
  { hour: "5P", visitors: 156 },
  { hour: "6P", visitors: 198 },
  { hour: "7P", visitors: 142 },
  { hour: "8P", visitors: 86 },
];

const demographicData = [
  { name: "Female", value: 58, color: "#EAB308" },
  { name: "Male", value: 36, color: "#1f2937" },
  { name: "Child", value: 6, color: "#FACC15" },
];

type DetectedCategory = "female" | "male" | "kid" | "staff";

const CATEGORY: Record<
  DetectedCategory,
  { primary: string; glow: string; label: string }
> = {
  female: { primary: "#EC4899", glow: "rgba(236,72,153,0.55)", label: "FEMALE" },
  male: { primary: "#3B82F6", glow: "rgba(59,130,246,0.55)", label: "MALE" },
  kid: { primary: "#A855F7", glow: "rgba(168,85,247,0.55)", label: "KID" },
  staff: { primary: "#10B981", glow: "rgba(16,185,129,0.6)", label: "STAFF" },
};

const detectedPeople: {
  id: string;
  x: number;
  y: number;
  delay: number;
  conf: number;
  category: DetectedCategory;
  meta: string;
  sway: number; // horizontal sway amplitude in px
}[] = [
  { id: "T-2847", x: 14, y: 62, delay: 0, conf: 98, category: "female", meta: "28", sway: 3 },
  { id: "T-2902", x: 33, y: 48, delay: 0.6, conf: 96, category: "male", meta: "34", sway: 2 },
  { id: "T-2913", x: 50, y: 72, delay: 1.2, conf: 99, category: "kid", meta: "8", sway: 4 },
  { id: "T-2941", x: 70, y: 55, delay: 1.8, conf: 94, category: "staff", meta: "MGR-04", sway: 1.5 },
  { id: "T-2966", x: 86, y: 65, delay: 2.4, conf: 97, category: "female", meta: "41", sway: 2.5 },
];

/** Front-facing person silhouette — fills its bounding box. */
function PersonSilhouette({ color, isStaff }: { color: string; isStaff?: boolean }) {
  return (
    <svg viewBox="0 0 24 36" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {/* head */}
      <circle cx="12" cy="5.5" r="3.8" fill={color} />
      {/* neck */}
      <rect x="11" y="9" width="2" height="2" fill={color} opacity="0.7" />
      {/* shoulders + torso */}
      <path d="M 4 14 Q 12 11 20 14 L 21 28 L 3 28 Z" fill={color} />
      {/* arms hint */}
      <path d="M 4 14 L 2 24" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.85" />
      <path d="M 20 14 L 22 24" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.85" />
      {/* legs */}
      <rect x="7.5" y="28" width="3.4" height="7" fill={color} rx="0.6" />
      <rect x="13.1" y="28" width="3.4" height="7" fill={color} rx="0.6" />
      {/* staff: white badge on chest */}
      {isStaff && (
        <>
          <rect x="9.5" y="17" width="5" height="3" fill="white" rx="0.5" />
          <rect x="10.5" y="18" width="3" height="1" fill={color} />
        </>
      )}
    </svg>
  );
}

function useCountUp(target: number, durationMs = 1800, startWhen = true) {
  const [value, setValue] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (!startWhen || started.current) return;
    started.current = true;
    const start = performance.now();
    let frame: number;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, durationMs, startWhen]);
  return value;
}

export function LiveDashboardPreview() {
  const [inView, setInView] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [liveCount, setLiveCount] = useState(1247);
  const [clock, setClock] = useState(() => new Date());
  const [audioBars, setAudioBars] = useState<number[]>([0.3, 0.55, 0.8, 0.45, 0.6, 0.35]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setInView(true),
      { threshold: 0.25 }
    );
    if (wrapRef.current) obs.observe(wrapRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => {
      setLiveCount((c) => c + Math.floor(Math.random() * 3) + 1);
    }, 2200);
    return () => clearInterval(id);
  }, [inView]);

  // Live ticking clock for the camera HUD
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setClock(new Date()), 1000);
    return () => clearInterval(id);
  }, [inView]);

  // Audio / motion meter — small randomized levels every 200ms
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => {
      setAudioBars((prev) => prev.map(() => 0.2 + Math.random() * 0.8));
    }, 220);
    return () => clearInterval(id);
  }, [inView]);

  const clockText = clock.toLocaleTimeString([], { hour12: false });

  const totalVisitors = useCountUp(1846, 2000, inView);
  const conversion = useCountUp(248, 2000, inView);
  const dwell = useCountUp(842, 2000, inView);

  return (
    <section
      ref={wrapRef}
      className="relative px-4 sm:px-6 lg:px-8 pb-20 md:pb-28"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="absolute -inset-4 md:-inset-6 bg-gradient-to-br from-yellow-400/30 via-amber-400/20 to-violet-400/20 rounded-[2.5rem] blur-2xl pointer-events-none" />

          <div className="relative bg-white rounded-3xl shadow-2xl shadow-amber-500/10 border border-gray-200/80 overflow-hidden">
            {/* Browser-style chrome */}
            <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <Activity className="w-3.5 h-3.5 text-yellow-500" />
                Beyond Traffic — Live Store Analytics
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-green-600">
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-green-500"
                />
                Live
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
              {/* CAMERA / DETECTION VIEW */}
              <div className="lg:col-span-2 p-5 md:p-6 bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white relative overflow-hidden">
                <div className="flex items-start justify-between mb-4 gap-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-yellow-400 mb-1">
                      Sensor 01 · Main Entrance
                    </p>
                    <p className="text-xs text-gray-400 flex items-center gap-1.5">
                      <Wifi className="w-3 h-3" /> 3D Stereo Vision · 1080p · 30 FPS
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-red-400 uppercase">
                      <motion.span
                        animate={{ opacity: [1, 0.2, 1] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                        className="w-1.5 h-1.5 rounded-full bg-red-500"
                      />
                      Rec
                    </div>
                    <p className="text-[10px] font-mono text-yellow-300/80 tabular-nums">
                      {clockText} · UTC+4
                    </p>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-emerald-400">
                      {detectedPeople.length} detected
                    </p>
                  </div>
                </div>

                {/* Camera frame */}
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-gradient-to-b from-slate-800 via-slate-900 to-black">
                  {/* Scanline */}
                  <motion.div
                    className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-yellow-400/80 to-transparent"
                    animate={{ y: ["0%", "100%", "0%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  />

                  {/* Floor grid (perspective) */}
                  <svg
                    className="absolute inset-0 w-full h-full opacity-20"
                    viewBox="0 0 400 300"
                    preserveAspectRatio="none"
                  >
                    {[...Array(8)].map((_, i) => (
                      <line
                        key={`h${i}`}
                        x1={0}
                        y1={150 + i * 22}
                        x2={400}
                        y2={150 + i * 22}
                        stroke="#FACC15"
                        strokeWidth="0.6"
                      />
                    ))}
                    {[...Array(10)].map((_, i) => {
                      const x = 200;
                      const spread = i * 30;
                      return (
                        <line
                          key={`v${i}`}
                          x1={x - spread}
                          y1={300}
                          x2={x - spread * 0.2}
                          y2={150}
                          stroke="#FACC15"
                          strokeWidth="0.6"
                        />
                      );
                    })}
                    {[...Array(10)].map((_, i) => {
                      const x = 200;
                      const spread = i * 30;
                      return (
                        <line
                          key={`v2${i}`}
                          x1={x + spread}
                          y1={300}
                          x2={x + spread * 0.2}
                          y2={150}
                          stroke="#FACC15"
                          strokeWidth="0.6"
                        />
                      );
                    })}
                  </svg>

                  {/* Doorway */}
                  <div className="absolute top-[18%] left-1/2 -translate-x-1/2 w-[30%] h-[28%] border-2 border-yellow-400/40 rounded-t-xl bg-gradient-to-b from-yellow-400/5 to-transparent" />
                  <p className="absolute top-[14%] left-1/2 -translate-x-1/2 text-[8px] font-bold uppercase tracking-wider text-yellow-400/70">
                    Entry Zone
                  </p>

                  {/* Detected people: bounding box + silhouette + category chip */}
                  {detectedPeople.map((p) => {
                    const c = CATEGORY[p.category];
                    const isStaff = p.category === "staff";
                    return (
                      <motion.div
                        key={p.id}
                        className="absolute"
                        style={{ left: `${p.x}%`, top: `${p.y}%` }}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{
                          opacity: [0, 1, 1, 1, 0.85],
                          scale: [0.85, 1, 1.02, 1, 0.95],
                          x: [-p.sway, p.sway, -p.sway],
                          y: [-2, 0, -2],
                        }}
                        transition={{
                          duration: 5.5,
                          delay: p.delay,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <div className="relative w-12 h-[68px] -translate-x-1/2 -translate-y-full">
                          {/* Outer bounding box with category glow */}
                          <div
                            className="absolute inset-0 border-2 rounded-md"
                            style={{
                              borderColor: c.primary,
                              boxShadow: `0 0 14px ${c.glow}`,
                            }}
                          />
                          {/* Person silhouette inside */}
                          <div className="absolute inset-1 opacity-95">
                            <PersonSilhouette color={c.primary} isStaff={isStaff} />
                          </div>
                          {/* Category + age/role chip (top-left) */}
                          <div
                            className="absolute -top-[18px] left-0 text-[7.5px] font-black px-1.5 py-[1px] rounded whitespace-nowrap uppercase tracking-wider text-white"
                            style={{ background: c.primary }}
                          >
                            {c.label} · {p.meta}
                          </div>
                          {/* ID + confidence (bottom) */}
                          <div className="absolute -bottom-[14px] left-1/2 -translate-x-1/2 text-[7px] font-bold text-white/85 bg-black/60 px-1 py-[1px] rounded whitespace-nowrap font-mono tracking-wide">
                            {p.id} · {p.conf}%
                          </div>
                          {/* Corner brackets in category color */}
                          {[
                            "top-[-2px] left-[-2px] border-t-2 border-l-2",
                            "top-[-2px] right-[-2px] border-t-2 border-r-2",
                            "bottom-[-2px] left-[-2px] border-b-2 border-l-2",
                            "bottom-[-2px] right-[-2px] border-b-2 border-r-2",
                          ].map((pos) => (
                            <span
                              key={pos}
                              className={`absolute w-2 h-2 ${pos}`}
                              style={{ borderColor: c.primary }}
                            />
                          ))}
                          {/* Direction chevron at the bottom of the box */}
                          <span
                            className="absolute -bottom-[3px] left-1/2 -translate-x-1/2 w-0 h-0"
                            style={{
                              borderLeft: "4px solid transparent",
                              borderRight: "4px solid transparent",
                              borderTop: `5px solid ${c.primary}`,
                            }}
                          />
                        </div>
                      </motion.div>
                    );
                  })}

                  {/* HUD corners */}
                  <span className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-yellow-400/60" />
                  <span className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-yellow-400/60" />
                  <span className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-yellow-400/60" />
                  <span className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-yellow-400/60" />

                  {/* Audio / motion meter — vertical bars on the right edge */}
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col items-end gap-[3px]">
                    <span className="text-[7px] font-bold uppercase tracking-widest text-yellow-400/80 mb-1">
                      MOT
                    </span>
                    {audioBars.map((b, i) => (
                      <motion.span
                        key={i}
                        className="block bg-yellow-400 rounded-sm"
                        style={{
                          width: "8px",
                          height: `${Math.round(b * 22)}px`,
                          opacity: 0.4 + b * 0.6,
                        }}
                      />
                    ))}
                  </div>

                  {/* Entry threshold line at the bottom of the frame */}
                  <div className="absolute left-4 right-4 bottom-7 flex items-center gap-2">
                    <motion.span
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.4, repeat: Infinity }}
                      className="w-1.5 h-1.5 rounded-full bg-yellow-400"
                    />
                    <div className="flex-1 h-px border-t border-dashed border-yellow-400/60" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-yellow-400/80">
                      ENTRY LINE
                    </span>
                  </div>

                  <div className="absolute bottom-2 right-2 text-[9px] font-mono text-yellow-300/80 bg-black/40 px-1.5 py-0.5 rounded">
                    95% ACC
                  </div>
                </div>

                {/* Live count under camera */}
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                      Visitors right now
                    </p>
                    <div className="flex items-baseline gap-2">
                      <motion.span
                        key={liveCount}
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-4xl font-black text-white tabular-nums"
                      >
                        {liveCount.toLocaleString()}
                      </motion.span>
                      <span className="text-xs font-bold text-green-400 flex items-center gap-0.5">
                        <ArrowUpRight className="w-3 h-3" /> live
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                      In-store
                    </p>
                    <p className="text-2xl font-black text-yellow-400 tabular-nums">
                      {Math.floor(liveCount * 0.18)}
                    </p>
                  </div>
                </div>
              </div>

              {/* CHARTS / KPIs */}
              <div className="lg:col-span-3 p-5 md:p-6 bg-white">
                {/* KPI row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                  <Kpi
                    icon={<Users className="w-4 h-4" />}
                    label="Visitors today"
                    value={totalVisitors.toLocaleString()}
                    delta="+12.4%"
                    trend="up"
                  />
                  <Kpi
                    icon={<TrendingUp className="w-4 h-4" />}
                    label="Conversion"
                    value={`${(conversion / 10).toFixed(1)}%`}
                    delta="+3.2%"
                    trend="up"
                  />
                  <Kpi
                    icon={<Clock className="w-4 h-4" />}
                    label="Avg dwell"
                    value={`${Math.floor(dwell / 100)}:${String(dwell % 60).padStart(2, "0")}`}
                    delta="-0:18"
                    trend="down"
                  />
                  <Kpi
                    icon={<Eye className="w-4 h-4" />}
                    label="Peak hour"
                    value="2–3 PM"
                    delta="247 ppl"
                    trend="up"
                  />
                </div>

                {/* Chart + Donut */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 rounded-2xl border border-gray-100 p-4 bg-gradient-to-br from-amber-50/40 to-white">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                          Hourly footfall
                        </p>
                        <p className="text-sm font-black text-gray-900">
                          Today · Main Store
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
                        <span className="flex items-center gap-1 text-gray-700">
                          <span className="w-2 h-2 rounded-full bg-yellow-500" />
                          Visitors
                        </span>
                      </div>
                    </div>
                    <div className="h-40 -ml-2">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={hourlyData} margin={{ top: 6, right: 8, left: 0, bottom: 0 }}>
                          <defs>
                            <linearGradient id="vGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#EAB308" stopOpacity={0.85} />
                              <stop offset="100%" stopColor="#EAB308" stopOpacity={0.05} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid stroke="#f3f4f6" vertical={false} />
                          <XAxis
                            dataKey="hour"
                            tick={{ fontSize: 10, fill: "#6b7280" }}
                            tickLine={false}
                            axisLine={false}
                          />
                          <YAxis
                            tick={{ fontSize: 10, fill: "#6b7280" }}
                            tickLine={false}
                            axisLine={false}
                            width={28}
                          />
                          <Tooltip
                            contentStyle={{
                              borderRadius: 12,
                              border: "1px solid #e5e7eb",
                              fontSize: 12,
                              boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                            }}
                            labelStyle={{ fontWeight: 700, color: "#111827" }}
                          />
                          <Area
                            type="monotone"
                            dataKey="visitors"
                            stroke="#A16207"
                            strokeWidth={2.5}
                            fill="url(#vGrad)"
                            isAnimationActive={inView}
                            animationDuration={1500}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-gray-100 p-4 bg-gradient-to-br from-violet-50/40 to-white flex flex-col">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                      Demographics
                    </p>
                    <p className="text-sm font-black text-gray-900 mb-1">
                      Visitor mix
                    </p>
                    <div className="relative flex-1 min-h-[120px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={demographicData}
                            innerRadius={32}
                            outerRadius={50}
                            paddingAngle={3}
                            dataKey="value"
                            isAnimationActive={inView}
                            animationDuration={1200}
                          >
                            {demographicData.map((d) => (
                              <Cell key={d.name} fill={d.color} stroke="none" />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              borderRadius: 10,
                              border: "1px solid #e5e7eb",
                              fontSize: 11,
                            }}
                            formatter={(v: number, n: string) => [`${v}%`, n]}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <p className="text-[9px] font-bold uppercase tracking-widest text-gray-500">
                          Total
                        </p>
                        <p className="text-lg font-black text-gray-900 tabular-nums">
                          {totalVisitors.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 space-y-1">
                      {demographicData.map((d) => (
                        <div
                          key={d.name}
                          className="flex items-center justify-between text-[11px]"
                        >
                          <span className="flex items-center gap-1.5 text-gray-700 font-semibold">
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{ background: d.color }}
                            />
                            {d.name}
                          </span>
                          <span className="font-black text-gray-900 tabular-nums">
                            {d.value}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating badges around dashboard */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -6 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="hidden md:flex absolute -top-4 -left-4 bg-gradient-to-br from-yellow-500 to-amber-600 text-white px-4 py-2 rounded-2xl shadow-xl shadow-amber-500/30 items-center gap-2"
          >
            <Activity className="w-4 h-4" />
            <span className="text-xs font-black uppercase tracking-wider">
              95%+ Accuracy
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: 8 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 6 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="hidden md:flex absolute -bottom-4 -right-4 bg-white text-gray-900 px-4 py-2 rounded-2xl shadow-xl border border-gray-200 items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-wider">
              Real-time · 24/7
            </span>
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-xs md:text-sm font-bold uppercase tracking-widest text-gray-500 mt-8"
        >
          A glimpse of your store · Live dashboard preview
        </motion.p>
      </div>
    </section>
  );
}

function Kpi({
  icon,
  label,
  value,
  delta,
  trend,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down";
}) {
  const up = trend === "up";
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="rounded-2xl border border-gray-100 bg-white p-3 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-1">
        <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-yellow-100 to-amber-100 text-amber-700 flex items-center justify-center">
          {icon}
        </span>
        <span
          className={`text-[10px] font-black uppercase tracking-wider flex items-center gap-0.5 ${
            up ? "text-green-600" : "text-rose-600"
          }`}
        >
          {up ? (
            <ArrowUpRight className="w-3 h-3" />
          ) : (
            <ArrowDownRight className="w-3 h-3" />
          )}
          {delta}
        </span>
      </div>
      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
        {label}
      </p>
      <p className="text-lg md:text-xl font-black text-gray-900 tabular-nums leading-tight">
        {value}
      </p>
    </motion.div>
  );
}
