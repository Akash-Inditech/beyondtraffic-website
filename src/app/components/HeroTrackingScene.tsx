import { useEffect, useState } from "react";
import { motion } from "motion/react";

/**
 * Right-column visual for the hero — a dark camera-tracking scene with
 * stylized human silhouettes inside category-coloured bounding boxes.
 *
 * Modern twist vs. a static stock photo:
 *  - perspective floor grid with a vanishing-point hint
 *  - constantly travelling scan line
 *  - animated corner brackets + soft glow on every box
 *  - per-person LIVE classification label (ADULT FEMALE / ADULT MALE /
 *    KID / STAFF) in its own colour
 *  - HUD overlays: live indicator, FPS, detected count, visitor ticker
 *  - subtle floor-halo + sway per person so the scene feels alive
 */

type Category = "female" | "male" | "kid" | "staff";

const CATEGORY: Record<
  Category,
  { primary: string; glow: string; label: string }
> = {
  female: { primary: "#EC4899", glow: "rgba(236,72,153,0.55)", label: "ADULT FEMALE" },
  male: { primary: "#3B82F6", glow: "rgba(59,130,246,0.55)", label: "ADULT MALE" },
  kid: { primary: "#A855F7", glow: "rgba(168,85,247,0.55)", label: "KID" },
  staff: { primary: "#10B981", glow: "rgba(16,185,129,0.6)", label: "STAFF" },
};

type Subject = {
  id: string;
  category: Category;
  variant: 0 | 1 | 2 | 3;
  leftPct: number;
  bottomPct: number;
  widthPct: number;
  heightPct: number;
  sway: number;
  delay: number;
};

const SUBJECTS: Subject[] = [
  // From left to right: female (with bag), female (coat), male (backpack), staff
  { id: "T-2847", category: "female", variant: 0, leftPct: 6, bottomPct: 6, widthPct: 19, heightPct: 78, sway: 1.5, delay: 0.1 },
  { id: "T-2902", category: "female", variant: 1, leftPct: 30, bottomPct: 8, widthPct: 18, heightPct: 80, sway: 1.2, delay: 0.3 },
  { id: "T-2913", category: "male", variant: 2, leftPct: 53, bottomPct: 4, widthPct: 22, heightPct: 86, sway: 1.8, delay: 0.5 },
  { id: "T-2941", category: "staff", variant: 3, leftPct: 79, bottomPct: 7, widthPct: 18, heightPct: 80, sway: 1.4, delay: 0.7 },
];

/** Stylized "from behind" silhouettes — flat dark fill with category-colour rim glow. */
function PersonSilhouette({ variant, rim }: { variant: 0 | 1 | 2 | 3; rim: string }) {
  const fill = "#0a0a0a";
  const inner = "#1a1a1a";

  if (variant === 0) {
    // Adult female with shoulder bag
    return (
      <svg viewBox="0 0 80 200" className="h-full w-auto" preserveAspectRatio="xMidYMax meet">
        {/* Hair shape (slightly past shoulders) */}
        <path d="M 20 14 Q 40 -2 60 14 L 64 50 L 16 50 Z" fill={fill} />
        {/* Face/neck */}
        <ellipse cx="40" cy="22" rx="14" ry="16" fill={inner} />
        {/* Coat */}
        <path d="M 10 54 Q 40 46 70 54 L 72 138 L 8 138 Z" fill={fill} />
        <path d="M 10 54 Q 40 46 70 54 L 72 138 L 8 138 Z" fill="none" stroke={rim} strokeOpacity="0.25" strokeWidth="0.8" />
        {/* Shoulder bag */}
        <line x1="20" y1="58" x2="6" y2="80" stroke={fill} strokeWidth="2.5" />
        <rect x="-2" y="78" width="16" height="26" rx="2" fill={fill} />
        {/* Legs */}
        <rect x="18" y="138" width="18" height="62" fill={fill} />
        <rect x="44" y="138" width="18" height="62" fill={fill} />
      </svg>
    );
  }
  if (variant === 1) {
    // Adult female in a long coat with hood
    return (
      <svg viewBox="0 0 80 200" className="h-full w-auto" preserveAspectRatio="xMidYMax meet">
        {/* Hood + head */}
        <path d="M 18 10 Q 40 -4 62 10 L 64 48 L 16 48 Z" fill={fill} />
        <ellipse cx="40" cy="24" rx="13" ry="14" fill={inner} />
        {/* Long coat */}
        <path d="M 8 50 Q 40 42 72 50 L 70 160 L 10 160 Z" fill={fill} />
        <path d="M 40 50 L 40 160" stroke={inner} strokeWidth="0.6" />
        {/* Legs */}
        <rect x="18" y="160" width="18" height="40" fill={fill} />
        <rect x="44" y="160" width="18" height="40" fill={fill} />
      </svg>
    );
  }
  if (variant === 2) {
    // Adult male with backpack
    return (
      <svg viewBox="0 0 80 200" className="h-full w-auto" preserveAspectRatio="xMidYMax meet">
        {/* Head */}
        <ellipse cx="40" cy="20" rx="13" ry="15" fill={fill} />
        {/* Shoulders broad */}
        <path d="M 8 50 Q 40 40 72 50 L 74 130 L 6 130 Z" fill={fill} />
        {/* Backpack (humping out the back, wider than body) */}
        <rect x="14" y="48" width="52" height="58" rx="4" fill={inner} stroke={rim} strokeOpacity="0.18" strokeWidth="0.7" />
        <line x1="20" y1="48" x2="20" y2="106" stroke="#000" strokeWidth="1" />
        <line x1="60" y1="48" x2="60" y2="106" stroke="#000" strokeWidth="1" />
        {/* Body lower */}
        <rect x="14" y="130" width="52" height="14" fill={fill} />
        {/* Legs (slightly apart - walking) */}
        <rect x="18" y="144" width="18" height="56" fill={fill} />
        <rect x="44" y="144" width="18" height="56" fill={fill} />
      </svg>
    );
  }
  // variant 3 — Staff with hi-vis badge
  return (
    <svg viewBox="0 0 80 200" className="h-full w-auto" preserveAspectRatio="xMidYMax meet">
      {/* Head */}
      <ellipse cx="40" cy="22" rx="13" ry="15" fill={fill} />
      {/* Uniform top */}
      <path d="M 12 52 Q 40 44 68 52 L 70 132 L 10 132 Z" fill={fill} />
      {/* High-vis staff badge on chest */}
      <rect x="32" y="72" width="16" height="6" rx="0.8" fill="#fbbf24" />
      <rect x="32" y="80" width="16" height="2" rx="0.5" fill="#fbbf24" opacity="0.85" />
      {/* Pants */}
      <rect x="14" y="132" width="52" height="14" fill={inner} />
      <rect x="18" y="146" width="18" height="54" fill={fill} />
      <rect x="44" y="146" width="18" height="54" fill={fill} />
    </svg>
  );
}

/** Small ticking counter — increments +1 every 1.8–4.2s, displayed in the HUD. */
function VisitorTicker({ start = 12420 }: { start?: number }) {
  const [count, setCount] = useState(start);
  useEffect(() => {
    let cancelled = false;
    const tick = () => {
      if (cancelled) return;
      setCount((c) => c + 1);
      const delay = 1800 + Math.random() * 2400;
      setTimeout(tick, delay);
    };
    const initial = setTimeout(tick, 2000);
    return () => {
      cancelled = true;
      clearTimeout(initial);
    };
  }, []);
  return <span>{count.toLocaleString()}</span>;
}

export function HeroTrackingScene() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative aspect-[16/12] md:aspect-[5/4] rounded-2xl md:rounded-[28px] overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-black border border-slate-800/60 shadow-2xl shadow-slate-900/30"
    >
      {/* Top vignette */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/60 to-transparent pointer-events-none z-10" />

      {/* Bottom vignette */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none z-10" />

      {/* Subtle perspective floor grid */}
      <svg viewBox="0 0 400 300" preserveAspectRatio="none" className="absolute inset-0 w-full h-full opacity-30 pointer-events-none">
        <defs>
          <linearGradient id="gridFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FACC15" stopOpacity="0" />
            <stop offset="50%" stopColor="#FACC15" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#FACC15" stopOpacity="0.7" />
          </linearGradient>
        </defs>
        {/* Horizontal floor lines, denser near bottom */}
        {[170, 188, 208, 232, 260].map((y, i) => (
          <line
            key={`h${i}`}
            x1="0"
            y1={y}
            x2="400"
            y2={y}
            stroke="url(#gridFade)"
            strokeWidth="0.6"
          />
        ))}
        {/* Vanishing-point lines */}
        {Array.from({ length: 11 }).map((_, i) => {
          const x = 200;
          const spread = (i - 5) * 36;
          return (
            <line
              key={`v${i}`}
              x1={x + spread}
              y1="300"
              x2={x + spread * 0.18}
              y2="160"
              stroke="url(#gridFade)"
              strokeWidth="0.5"
            />
          );
        })}
      </svg>

      {/* Faint cyan ambient glow at horizon */}
      <div className="absolute inset-x-0 top-1/3 h-20 bg-gradient-radial from-cyan-500/10 to-transparent pointer-events-none" />

      {/* Traveling scan line */}
      <motion.div
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-yellow-400/70 to-transparent pointer-events-none z-20"
        animate={{ top: ["10%", "92%", "10%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />

      {/* People with bounding boxes */}
      {SUBJECTS.map((s) => {
        const c = CATEGORY[s.category];
        return (
          <motion.div
            key={s.id}
            className="absolute z-10"
            style={{
              left: `${s.leftPct}%`,
              bottom: `${s.bottomPct}%`,
              width: `${s.widthPct}%`,
              height: `${s.heightPct}%`,
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{
              opacity: 1,
              y: 0,
              x: [-s.sway, s.sway, -s.sway],
            }}
            transition={{
              opacity: { duration: 0.6, delay: s.delay },
              y: { duration: 0.6, delay: s.delay, ease: [0.16, 1, 0.3, 1] },
              x: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            {/* Floor halo under person */}
            <div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[120%] h-3 rounded-[50%] blur-md opacity-50"
              style={{ background: c.glow }}
            />

            {/* Category label above bounding box */}
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: s.delay + 0.3 }}
              className="absolute left-1/2 -translate-x-1/2 -top-8 whitespace-nowrap"
            >
              <div
                className="text-[9px] md:text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-[0.16em] text-white shadow-lg"
                style={{
                  background: c.primary,
                  boxShadow: `0 6px 20px ${c.glow}`,
                }}
              >
                {c.label}
              </div>
              {/* small notch pointing down to box */}
              <div
                className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-0 h-0"
                style={{
                  borderLeft: "4px solid transparent",
                  borderRight: "4px solid transparent",
                  borderTop: `4px solid ${c.primary}`,
                }}
              />
            </motion.div>

            {/* Bounding box */}
            <motion.div
              className="absolute inset-0 rounded-md"
              style={{
                border: `1.5px solid ${c.primary}`,
                boxShadow: `0 0 32px ${c.glow}, inset 0 0 16px ${c.glow}`,
              }}
              animate={{ opacity: [0.85, 1, 0.85] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Corner brackets */}
            {[
              "top-[-3px] left-[-3px] border-t-2 border-l-2",
              "top-[-3px] right-[-3px] border-t-2 border-r-2",
              "bottom-[-3px] left-[-3px] border-b-2 border-l-2",
              "bottom-[-3px] right-[-3px] border-b-2 border-r-2",
            ].map((pos) => (
              <span key={pos} className={`absolute w-2.5 h-2.5 ${pos}`} style={{ borderColor: c.primary }} />
            ))}

            {/* Bottom ID + confidence chip */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-6 text-[8px] font-bold tracking-wider text-white/85 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded font-mono whitespace-nowrap">
              {s.id} · 98%
            </div>

            {/* The actual person silhouette inside the box */}
            <div className="absolute inset-0 flex items-end justify-center overflow-hidden">
              <div className="h-[95%]">
                <PersonSilhouette variant={s.variant} rim={c.primary} />
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* HUD: TOP-LEFT — LIVE indicator + sensor */}
      <div className="absolute top-3 left-3 md:top-4 md:left-4 z-30">
        <div className="flex items-center gap-2 bg-black/55 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/10">
          <motion.span
            className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
          <span className="text-[10px] font-black uppercase tracking-[0.18em] text-white">
            LIVE · SENSOR 01
          </span>
        </div>
      </div>

      {/* HUD: TOP-RIGHT — FPS + REC */}
      <div className="absolute top-3 right-3 md:top-4 md:right-4 z-30 flex items-center gap-2">
        <div className="text-[10px] font-mono text-yellow-400/90 bg-black/55 backdrop-blur-md px-2 py-1.5 rounded-lg border border-white/10">
          30 FPS · 1080p
        </div>
        <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-red-400 bg-black/55 backdrop-blur-md px-2 py-1.5 rounded-lg border border-white/10">
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-red-500"
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
          REC
        </div>
      </div>

      {/* HUD: BOTTOM-LEFT — visitors today */}
      <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 z-30">
        <p className="text-[9px] font-black uppercase tracking-[0.18em] text-white/55 mb-0.5">
          Visitors today
        </p>
        <p className="text-xl md:text-2xl font-black text-white tabular-nums leading-none">
          <VisitorTicker start={12587} />
        </p>
        <p className="text-[9px] font-bold text-emerald-400 mt-0.5">↑ +18.2% vs yesterday</p>
      </div>

      {/* HUD: BOTTOM-RIGHT — detection summary */}
      <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 z-30 text-right">
        <p className="text-[9px] font-black uppercase tracking-[0.18em] text-white/55 mb-0.5">
          Detected
        </p>
        <p className="text-xl md:text-2xl font-black text-yellow-400 tabular-nums leading-none">4</p>
        <p className="text-[9px] font-bold text-white/60 mt-0.5">98.4% accuracy</p>
      </div>

      {/* Subtle outer rim highlight */}
      <div className="absolute inset-0 rounded-2xl md:rounded-[28px] pointer-events-none ring-1 ring-inset ring-white/5" />
    </motion.div>
  );
}
