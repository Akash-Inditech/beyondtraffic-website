import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * Hero right-column visual: real-photo tracking demo that cycles between
 * two scenes every ~6 seconds. The detection boxes and labels are baked
 * into the source images themselves, so this component only renders the
 * surrounding HUD chrome (LIVE pill, FPS, REC, visitor ticker, detected
 * count, scene dots).
 *
 * To swap a photo: replace /public/family-hero.png or /public/bt-group.png
 * and update the matching `detectedCount` so the HUD number lines up.
 */

type Scene = {
  name: string;
  image: string;
  detectedCount: number;
};

const SCENES: Scene[] = [
  {
    name: "Family · CAM-01",
    image: `${import.meta.env.BASE_URL}family-hero.png`,
    detectedCount: 13,
  },
  {
    name: "Mall Group · CAM-02",
    image: `${import.meta.env.BASE_URL}bt-group.png`,
    detectedCount: 22,
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
      {/* Cross-fading image */}
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
              const filename = scene.image.split("/").pop() ?? "image.png";
              const fallback = FALLBACK_IMAGE(filename);
              if (e.currentTarget.src !== fallback) {
                e.currentTarget.src = fallback;
              }
            }}
          />
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
                {scene.detectedCount}
              </motion.p>
            </AnimatePresence>
            <p className="text-[10px] md:text-[11px] font-bold text-white/80 mt-1.5">95% accuracy</p>
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
