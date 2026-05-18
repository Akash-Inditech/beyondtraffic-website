import { useEffect, useState } from "react";
import { motion } from "motion/react";

/**
 * Hero right-column visual: a real photo of a family shopping, with clean
 * detection boxes overlaid on each person.
 *
 * The photo file lives in `/public/family-hero.jpg` so it ships as a static
 * asset and respects Vite's BASE_URL (works locally and at the GitHub Pages
 * `/beyondtraffic-website/` sub-path). If the file is missing the component
 * falls back to a neutral placeholder so the page never breaks.
 *
 * To swap the photo: drop a new file at /public/family-hero.jpg and adjust
 * each entry in DETECTIONS so its leftPct / topPct / widthPct / heightPct
 * line up over the people in your new image.
 */

const PHOTO_URL = `${import.meta.env.BASE_URL}family-hero.jpg`;
const PHOTO_FALLBACK =
  "https://placehold.co/1400x1120/F3F4F6/9CA3AF?text=Save+image+as+public%2Ffamily-hero.jpg";

type Category = "female" | "male" | "kid";

const CATEGORY: Record<Category, { primary: string; label: string }> = {
  female: { primary: "#EC4899", label: "Adult Female" },
  male: { primary: "#3B82F6", label: "Adult Male" },
  kid: { primary: "#A855F7", label: "Kid" },
};

type Detection = {
  id: string;
  category: Category;
  leftPct: number;
  topPct: number;
  widthPct: number;
  heightPct: number;
  confidence: number;
  age?: string;
};

// Positions tuned for the attached family-of-four shot:
//   dad (left) · boy (left-centre) · mom (centre-right) · girl (right)
const DETECTIONS: Detection[] = [
  { id: "T-2847", category: "male",   leftPct: 9,  topPct: 14, widthPct: 19, heightPct: 84, confidence: 99, age: "36" },
  { id: "T-2902", category: "kid",    leftPct: 27, topPct: 38, widthPct: 14, heightPct: 60, confidence: 96, age: "7"  },
  { id: "T-2913", category: "female", leftPct: 44, topPct: 14, widthPct: 22, heightPct: 84, confidence: 98, age: "34" },
  { id: "T-2941", category: "kid",    leftPct: 68, topPct: 30, widthPct: 17, heightPct: 68, confidence: 97, age: "9"  },
];

function VisitorTicker({ start = 12587 }: { start?: number }) {
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
      className="relative aspect-[4/3] md:aspect-[5/4] rounded-2xl md:rounded-[24px] overflow-hidden shadow-2xl shadow-gray-300/50 border border-gray-200/70 bg-gray-100"
    >
      {/* Family photo */}
      <img
        src={PHOTO_URL}
        alt="Family of four looking at a clothing storefront — demonstrating live people counting and demographic detection"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        onError={(e) => {
          if (e.currentTarget.src !== PHOTO_FALLBACK) {
            e.currentTarget.src = PHOTO_FALLBACK;
          }
        }}
      />

      {/* Top HUD bar */}
      <div className="absolute top-3 md:top-4 left-3 md:left-4 right-3 md:right-4 flex items-center justify-between z-30">
        <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md border border-white/70">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-gray-900">
            Live · Sensor 01
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <div className="bg-white/95 backdrop-blur-sm px-2.5 py-1.5 rounded-full shadow-md border border-white/70">
            <span className="text-[10px] font-mono font-semibold text-gray-700">30 FPS</span>
          </div>
          <div className="bg-white/95 backdrop-blur-sm px-2.5 py-1.5 rounded-full shadow-md border border-white/70 flex items-center gap-1.5">
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-red-500"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
            <span className="text-[9px] font-black uppercase tracking-wider text-red-600">REC</span>
          </div>
        </div>
      </div>

      {/* Detection boxes */}
      {DETECTIONS.map((d, idx) => {
        const c = CATEGORY[d.category];
        return (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7 + idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-20"
            style={{
              left: `${d.leftPct}%`,
              top: `${d.topPct}%`,
              width: `${d.widthPct}%`,
              height: `${d.heightPct}%`,
            }}
          >
            <div
              className="absolute inset-0 rounded-md"
              style={{
                border: `2px solid ${c.primary}`,
                boxShadow: "0 2px 12px rgba(0,0,0,0.18)",
              }}
            />

            <div
              className="absolute -top-[26px] left-0 px-2 py-0.5 md:py-1 rounded-md text-[10px] md:text-[11px] font-bold tracking-wide text-white whitespace-nowrap shadow-md"
              style={{ background: c.primary }}
            >
              {c.label}
              {d.age && <span className="font-mono opacity-80 ml-1.5">· {d.age}</span>}
            </div>

            <div className="absolute bottom-1 right-1 bg-white/92 backdrop-blur-sm px-1.5 py-0.5 rounded text-[8px] md:text-[9px] font-bold font-mono text-gray-800 shadow-sm">
              {d.id} · {d.confidence}%
            </div>
          </motion.div>
        );
      })}

      {/* Bottom stats HUD */}
      <div className="absolute inset-x-0 bottom-0 p-3 md:p-5 pt-12 md:pt-16 bg-gradient-to-t from-black/65 via-black/30 to-transparent z-30">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.16em] text-white/80 mb-0.5">
              Visitors today
            </p>
            <p className="text-2xl md:text-3xl font-black text-white tabular-nums leading-none">
              <VisitorTicker start={12587} />
            </p>
            <p className="text-[10px] md:text-[11px] font-bold text-emerald-400 mt-1.5">
              ↑ +18.2% vs yesterday
            </p>
          </div>

          <div className="text-right">
            <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.16em] text-white/80 mb-0.5">
              Detected
            </p>
            <p className="text-2xl md:text-3xl font-black text-yellow-400 tabular-nums leading-none">
              {DETECTIONS.length}
            </p>
            <p className="text-[10px] md:text-[11px] font-bold text-white/80 mt-1.5">98.4% accuracy</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
