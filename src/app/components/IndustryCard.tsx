import { motion } from "motion/react";
import { Link } from "react-router";
import { LucideIcon, TrendingUp, Activity, ArrowRight } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

interface IndustryKpi {
  label: string;
  value: string;
}

interface IndustryCardProps {
  icon: LucideIcon;
  title: string;
  challenge?: string;
  focus: string;
  delay?: number;
  kpis?: IndustryKpi[];
  trend?: number[];
  trendLabel?: string;
  /** If provided, the card becomes a router Link to this destination */
  to?: string;
}

const defaultTrend = [12, 18, 14, 22, 28, 24, 34, 41, 38, 47, 52, 58];

export function IndustryCard({
  icon: Icon,
  title,
  challenge,
  focus,
  delay = 0,
  kpis,
  trend,
  trendLabel = "30-day trend",
  to,
}: IndustryCardProps) {
  const gradients = [
    { bg: "from-yellow-50 via-amber-50 to-yellow-100", shadow: "shadow-yellow-200/50", text: "text-gray-900" },
    { bg: "from-amber-50 via-yellow-50 to-amber-100", shadow: "shadow-amber-200/50", text: "text-gray-900" },
    { bg: "from-yellow-100 via-amber-50 to-yellow-50", shadow: "shadow-yellow-200/50", text: "text-gray-900" },
    { bg: "from-amber-100 via-yellow-100 to-amber-50", shadow: "shadow-amber-200/50", text: "text-gray-900" },
  ];
  const gradientIndex = title.length % gradients.length;
  const gradient = gradients[gradientIndex];

  const chartData = (trend ?? defaultTrend).map((v, i) => ({ i, v }));

  const cardClasses = `group block bg-gradient-to-br ${gradient.bg} rounded-3xl p-8 md:p-10 hover:shadow-2xl ${gradient.shadow} transition-all cursor-pointer ${gradient.text} relative overflow-hidden border border-yellow-200`;

  const Inner = (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={cardClasses}
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-200/20 rounded-full blur-3xl" />
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="w-16 h-16 bg-yellow-400/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg border border-yellow-300 flex-shrink-0">
            <Icon className="w-8 h-8 text-gray-900" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-amber-700 mb-1">
              <Activity className="w-3 h-3" />
              {trendLabel}
            </div>
            <div className="h-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id={`spark-${gradientIndex}-${title.length}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#A16207" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#A16207" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="v"
                    stroke="#b45309"
                    strokeWidth={2}
                    fill={`url(#spark-${gradientIndex}-${title.length})`}
                    isAnimationActive
                    animationDuration={1400}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <h3 className="text-2xl md:text-3xl mb-4 font-black uppercase text-gray-900">{title}</h3>

        {kpis && kpis.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mb-4">
            {kpis.map((k) => (
              <div
                key={k.label}
                className="bg-white/70 backdrop-blur-sm border border-yellow-200 rounded-xl px-2.5 py-2 text-center"
              >
                <p className="text-sm md:text-base font-black bg-gradient-to-r from-yellow-600 to-amber-700 bg-clip-text text-transparent tabular-nums leading-none">
                  {k.value}
                </p>
                <p className="text-[9px] font-bold uppercase tracking-wider text-gray-600 mt-1 leading-tight">
                  {k.label}
                </p>
              </div>
            ))}
          </div>
        )}

        {challenge && (
          <p className="text-gray-700 mb-4 leading-relaxed bg-white/50 rounded-2xl p-4 backdrop-blur-sm border border-yellow-200">
            <span className="font-bold">Challenge:</span> {challenge}
          </p>
        )}
        <p className="text-gray-700 leading-relaxed bg-white/50 rounded-2xl p-4 backdrop-blur-sm border border-yellow-200">
          <span className="font-bold">Focus:</span> {focus}
        </p>

        <div className="flex items-center justify-between mt-4 gap-3">
          <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-amber-700">
            <TrendingUp className="w-3 h-3" />
            Beyond Traffic deployments active
          </div>
          {to && (
            <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-widest text-amber-700 group-hover:gap-2 transition-all">
              Explore
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );

  if (to) {
    return (
      <Link to={to} className="block">
        {Inner}
      </Link>
    );
  }
  return Inner;
}
