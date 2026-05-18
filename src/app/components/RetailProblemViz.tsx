import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { TrendingDown, TrendingUp, AlertTriangle, Eye } from "lucide-react";

const comparisonData = [
  { metric: "Conversion", blind: 14, withBT: 28 },
  { metric: "Avg Basket", blind: 62, withBT: 84 },
  { metric: "Staff Util.", blind: 51, withBT: 88 },
  { metric: "Repeat Visit", blind: 22, withBT: 41 },
  { metric: "Marketing ROI", blind: 1.4, withBT: 3.8 },
];

const lostRevenueByHour = [
  { h: "9A", lost: 12 },
  { h: "11A", lost: 28 },
  { h: "1P", lost: 41 },
  { h: "3P", lost: 67 },
  { h: "5P", lost: 54 },
  { h: "7P", lost: 38 },
  { h: "9P", lost: 18 },
];

export function RetailProblemViz() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setInView(true),
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-5 gap-5"
    >
      {/* Left: Comparison bar chart */}
      <div className="lg:col-span-3 rounded-3xl bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-6 md:p-8 relative overflow-hidden shadow-2xl shadow-amber-500/10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-1">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-3 py-1">
              <AlertTriangle className="w-3.5 h-3.5 text-yellow-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-yellow-400">
                Operating Blind vs Beyond Traffic
              </span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Avg UAE retail · 90 days
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mt-3 mb-1">
            The blind-spot{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
              tax
            </span>
          </h3>
          <p className="text-sm text-gray-400 mb-5 max-w-md">
            What stores gain across five core KPIs once footfall + conversion are measured.
          </p>

          <div className="h-64 md:h-72 -ml-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={comparisonData}
                margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                barGap={4}
                barCategoryGap={20}
              >
                <defs>
                  <linearGradient id="barBlind" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#475569" />
                    <stop offset="100%" stopColor="#1e293b" />
                  </linearGradient>
                  <linearGradient id="barBT" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FACC15" />
                    <stop offset="100%" stopColor="#A16207" />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#1f2937" vertical={false} />
                <XAxis
                  dataKey="metric"
                  tick={{ fontSize: 10, fill: "#9ca3af" }}
                  tickLine={false}
                  axisLine={{ stroke: "#1f2937" }}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "#9ca3af" }}
                  tickLine={false}
                  axisLine={false}
                  width={28}
                />
                <Tooltip
                  cursor={{ fill: "rgba(251, 191, 36,0.06)" }}
                  contentStyle={{
                    background: "#0f172a",
                    border: "1px solid #374151",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                  labelStyle={{ color: "#FACC15", fontWeight: 700 }}
                />
                <Legend
                  iconType="circle"
                  wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
                  formatter={(v) => (
                    <span style={{ color: "#9ca3af", fontWeight: 700 }}>{v}</span>
                  )}
                />
                <Bar
                  dataKey="blind"
                  name="Operating blind"
                  fill="url(#barBlind)"
                  radius={[6, 6, 0, 0]}
                  isAnimationActive={inView}
                  animationDuration={1200}
                />
                <Bar
                  dataKey="withBT"
                  name="With Beyond Traffic"
                  fill="url(#barBT)"
                  radius={[6, 6, 0, 0]}
                  isAnimationActive={inView}
                  animationDuration={1400}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Right: Lost revenue + impact tiles */}
      <div className="lg:col-span-2 flex flex-col gap-5">
        <div className="rounded-3xl bg-white border border-gray-200 p-6 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <div className="inline-flex items-center gap-1.5 text-rose-600">
              <TrendingDown className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Missed conversions / hour
              </span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
              Without analytics
            </span>
          </div>
          <p className="text-3xl font-black text-gray-900 mb-3 tabular-nums">
            ~258{" "}
            <span className="text-sm font-bold text-gray-500">visitors / day</span>
          </p>
          <div className="h-28 -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={lostRevenueByHour} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="lostGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#f43f5e" stopOpacity={0.4} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="h"
                  tick={{ fontSize: 9, fill: "#9ca3af" }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  cursor={{ fill: "rgba(244,63,94,0.08)" }}
                  contentStyle={{
                    borderRadius: 10,
                    border: "1px solid #e5e7eb",
                    fontSize: 11,
                  }}
                  formatter={(v: number) => [`${v} lost`, "Visitors"]}
                />
                <Bar
                  dataKey="lost"
                  fill="url(#lostGrad)"
                  radius={[4, 4, 0, 0]}
                  isAnimationActive={inView}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[10px] text-gray-500 mt-2 leading-relaxed">
            Peaks at 3–5 PM go unstaffed when traffic isn't measured — every
            uncounted visitor is an unconverted sale.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <ImpactTile
            icon={<Eye className="w-4 h-4" />}
            label="Visibility"
            blind="0%"
            withBT="100%"
            note="Real-time"
          />
          <ImpactTile
            icon={<TrendingUp className="w-4 h-4" />}
            label="Decision lag"
            blind="3–7 days"
            withBT="<5 sec"
            note="Live dashboard"
            invert
          />
        </div>
      </div>
    </motion.div>
  );
}

function ImpactTile({
  icon,
  label,
  blind,
  withBT,
  note,
  invert,
}: {
  icon: React.ReactNode;
  label: string;
  blind: string;
  withBT: string;
  note: string;
  invert?: boolean;
}) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="rounded-2xl bg-white border border-gray-200 p-4 shadow-sm"
    >
      <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">
        <span className="text-amber-600">{icon}</span>
        {label}
      </div>
      <div className="flex items-baseline justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-rose-500">
            Blind
          </p>
          <p className="text-lg font-black text-gray-900 leading-tight tabular-nums">
            {blind}
          </p>
        </div>
        <span className={`text-2xl ${invert ? "text-rose-400" : "text-gray-300"}`}>→</span>
        <div className="text-right">
          <p className="text-[10px] font-bold uppercase tracking-wider text-amber-600">
            Beyond
          </p>
          <p className="text-lg font-black bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent leading-tight tabular-nums">
            {withBT}
          </p>
        </div>
      </div>
      <p className="text-[10px] text-gray-500 mt-2">{note}</p>
    </motion.div>
  );
}
