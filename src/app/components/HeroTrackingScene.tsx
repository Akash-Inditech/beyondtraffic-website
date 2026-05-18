import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * Hero right-column visual: real-photo tracking demo that cycles between
 * two scenes every ~6 seconds.
 *
 *   Scene 1 — family-hero.jpg    A family of four walking through a mall
 *   Scene 2 — bt-group.jpg       A crowded mall corridor with many people
 *
 * Each scene has its own image (in /public) and its own set of bounding-box
 * positions. The HUD overlays (LIVE, FPS, REC, visitor ticker, detected
 * count) stay constant across scenes; the detected count auto-updates from
 * the active scene's array length.
 *
 * Labels show the persistent unique tracking ID instead of an age estimate,
 * e.g. "Adult Female · T-2913".
 *
 * To swap a photo: replace /public/family-hero.jpg or /public/bt-group.jpg
 * and update the corresponding `detections` array so the percentages line
 * up over the new people.
 */

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
};

type Scene = {
  name: string;
  image: string;
  detections: Detection[];
};

const SCENES: Scene[] = [
  {
    // Scene 1 — family of four walking with shopping bags
    name: "Family · CAM-01",
    image: `${import.meta.env.BASE_URL}family-hero.jpg`,
    detections: [
      { id: "T-2847", category: "male",   leftPct: 22, topPct: 58, widthPct: 14, heightPct: 38, confidence: 99 },
      { id: "T-2902", category: "kid",    leftPct: 37, topPct: 65, widthPct: 11, heightPct: 31, confidence: 96 },
      { id: "T-2913", category: "kid",    leftPct: 47, topPct: 64, widthPct: 12, heightPct: 32, confidence: 97 },
      { id: "T-2941", category: "female", leftPct: 58, topPct: 58, widthPct: 14, heightPct: 40, confidence: 98 },
      { id: "T-2966", category: "female", leftPct: 75, topPct: 60, widthPct: 13, heightPct: 38, confidence: 95 },
    ],
  },
  {
    // Scene 2 — crowded mall corridor
    name: "Mall Group · CAM-02",
    image: `${import.meta.env.BASE_URL}bt-group.jpg`,
    detections: [
      { id: "T-3104", category: "male",   leftPct: 17, topPct: 55, widthPct: 11, heightPct: 42, confidence: 98 },
      { id: "T-3119", category: "male",   leftPct: 29, topPct: 41, widthPct: 11, heightPct: 47, confidence: 99 },
      { id: "T-3127", category: "female", leftPct: 47, topPct: 39, widthPct: 11, heightPct: 44, confidence: 96 },
      { id: "T-3142", category: "male",   leftPct: 62, topPct: 36, widthPct: 11, heightPct: 44, confidence: 97 },
      { id: "T-3158", category: "female", leftPct: 76, topPct: 50, widthPct: 10, heightPct: 38, confidence: 95 },
      { id: "T-3166", category: "female", leftPct: 86, topPct: 56, widthPct: 9,  heightPct: 36, confidence: 96 },
    ],
  },
];

const FALLBACK_IMAGE = (filename: string) =>
  `https://placehold.co/1400x1120/F3F4F6/9CA3AF?text=Save+image+as+public%2F${encodeURIComponent(filename)}`;

const SCENE_DURATION_MS = 6500;

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
  const [sceneIdx, setSceneIdx] = useState(0);

  // Cycle scenes
  useEffect(() => {
    const id = setInterval(() => {
      setSceneIdx((i) => (i + 1) % SCENES.length);
    }, SCENE_DURATION_MS);
    return () => clearInterval(id);
  }, []);

  // Preload all scene images on mount so the crossfade is instant
  useEffect(() => {
    SCENES.forEach((s) => {
      const img = new window.Image();
      img.src = s.image;
    });
  }, []);

  const scene = SCENES[sceneIdx];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative aspect-[4/3] md:aspect-[5/4] rounded-2xl md:rounded-[24px] overflow-hidden shadow-2xl shadow-gray-300/50 border border-gray-200/70 bg-gray-100"
    >
      {/* Cross-fading image + detection layer */}
      <AnimatePresence mode="sync">
        <motion.div
          key={sceneIdx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={scene.image}
            alt={`Live tracking demo — ${scene.name}`}
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            onError={(e) => {
              const filename = scene.image.split("/").pop() ?? "image.jpg";
              const fallback = FALLBACK_IMAGE(filename);
              if (e.currentTarget.src !== fallback) {
                e.currentTarget.src = fallback;
              }
            }}
          />

          {/* Detection boxes for this scene */}
          {scene.detections.map((d, idx) => {
            const c = CATEGORY[d.category];
            return (
              <motion.div
                key={`${sceneIdx}-${d.id}`}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.45,
                  delay: 0.25 + idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute"
                style={{
                  left: `${d.leftPct}%`,
                  top: `${d.topPct}%`,
                  width: `${d.widthPct}%`,
                  height: `${d.heightPct}%`,
                }}
              >
                {/* Clean bounding box */}
                <div
                  className="absolute inset-0 rounded-md"
                  style={{
                    border: `2px solid ${c.primary}`,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.18)",
                  }}
                />

                {/* Top-left pill: category + unique ID */}
                <div
                  className="absolute -top-[26px] left-0 px-2 py-0.5 md:py-1 rounded-md text-[10px] md:text-[11px] font-bold tracking-wide text-white whitespace-nowrap shadow-md"
                  style={{ background: c.primary }}
                >
                  {c.label}
                  <span className="font-mono opacity-85 ml-1.5">· {d.id}</span>
                </div>

                {/* Bottom-right: confidence */}
                <div className="absolute bottom-1 right-1 bg-white/92 backdrop-blur-sm px-1.5 py-0.5 rounded text-[8px] md:text-[9px] font-bold font-mono text-gray-800 shadow-sm">
                  {d.confidence}%
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* TOP HUD — stays constant across scenes */}
      <div className="absolute top-3 md:top-4 left-3 md:left-4 right-3 md:right-4 flex items-center justify-between z-30">
        <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md border border-white/70">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
          </span>
          <AnimatePresence mode="wait">
            <motion.span
              key={scene.name}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3 }}
              className="text-[10px] font-bold uppercase tracking-[0.16em] text-gray-900"
            >
              Live · {scene.name}
            </motion.span>
          </AnimatePresence>
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

      {/* BOTTOM HUD */}
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
            <AnimatePresence mode="wait">
              <motion.p
                key={sceneIdx}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="text-2xl md:text-3xl font-black text-yellow-400 tabular-nums leading-none"
              >
                {scene.detections.length}
              </motion.p>
            </AnimatePresence>
            <p className="text-[10px] md:text-[11px] font-bold text-white/80 mt-1.5">98.4% accuracy</p>
          </div>
        </div>
      </div>

      {/* Scene indicator dots */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-2 flex items-center gap-1.5 z-40">
        {SCENES.map((_, i) => (
          <span
            key={i}
            className={`block h-1 rounded-full transition-all duration-500 ${
              i === sceneIdx ? "w-8 bg-white/90" : "w-1.5 bg-white/35"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}
