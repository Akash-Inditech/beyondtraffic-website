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

const detectedPeople = [
  { id: 1, x: 18, y: 62, delay: 0, conf: 98 },
  { id: 2, x: 42, y: 48, delay: 0.6, conf: 96 },
  { id: 3, x: 68, y: 70, delay: 1.2, conf: 99 },
  { id: 4, x: 82, y: 55, delay: 1.8, conf: 94 },
];

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
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-yellow-400 mb-1">
                      Sensor 01 · Main Entrance
                    </p>
                    <p className="text-xs text-gray-400 flex items-center gap-1.5">
                      <Wifi className="w-3 h-3" /> 3D Stereo Vision · 1080p
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-red-400 uppercase">
                    <motion.span
                      animate={{ opacity: [1, 0.2, 1] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                      className="w-1.5 h-1.5 rounded-full bg-red-500"
                    />
                    Rec
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

                  {/* Detected people with bounding boxes */}
                  {detectedPeople.map((p) => (
                    <motion.div
                      key={p.id}
                      className="absolute"
                      style={{ left: `${p.x}%`, top: `${p.y}%` }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: [0, 1, 1, 0],
                        scale: [0.8, 1, 1, 0.9],
                        y: [-4, 0, -2, -6],
                      }}
                      transition={{
                        duration: 4,
                        delay: p.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <div className="relative w-12 h-16 -translate-x-1/2 -translate-y-full">
                        <div className="absolute inset-0 border-2 border-yellow-400 rounded-md shadow-[0_0_12px_rgba(251, 191, 36,0.6)]" />
                        <div className="absolute -top-5 left-0 bg-yellow-400 text-black text-[8px] font-bold px-1.5 py-0.5 rounded whitespace-nowrap uppercase tracking-wider">
                          Person · {p.conf}%
                        </div>
                        {/* corner brackets */}
                        <span className="absolute -top-0.5 -left-0.5 w-2 h-2 border-t-2 border-l-2 border-yellow-300" />
                        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 border-t-2 border-r-2 border-yellow-300" />
                        <span className="absolute -bottom-0.5 -left-0.5 w-2 h-2 border-b-2 border-l-2 border-yellow-300" />
                        <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 border-b-2 border-r-2 border-yellow-300" />
                      </div>
                    </motion.div>
                  ))}

                  {/* HUD corners */}
                  <span className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-yellow-400/60" />
                  <span className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-yellow-400/60" />
                  <span className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-yellow-400/60" />
                  <span className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-yellow-400/60" />

                  <div className="absolute bottom-2 right-2 text-[9px] font-mono text-yellow-300/80 bg-black/40 px-1.5 py-0.5 rounded">
                    98.4% ACC
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
              98%+ Accuracy
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
