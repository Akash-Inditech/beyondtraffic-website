import { useState, useEffect } from "react";
import { motion } from "motion/react";

/**
 * Hero backdrop: top-down spatial tracking view of a retail floor.
 *
 * Shows multiple people moving through the space along their own paths.
 * Each tracked person carries:
 *   - a persistent unique ID (T-####) and confidence %
 *   - an AI bounding-box rendered as four corner brackets
 *   - a small directional chevron showing heading
 *   - a faint dotted trail of where they've walked
 *
 * Floor plan includes:
 *   - outer building outline, inner shelves / checkout / dressing zones
 *   - two yellow ENTRY doorways at the bottom
 *   - four corner cameras with subtle circular coverage zones
 *   - a soft floor heatmap of higher-traffic clusters
 *   - a live VISITORS counter that ticks up, with a brief "+1" pop on every
 *     increment so the user clearly sees the tracking → counting → metric loop
 */

const stroke = "#cbd5e1"; // slate-300
const strokeDeep = "#94a3b8"; // slate-400
const ink = "#1a1a1a";
const amber = "#EAB308";
const amberDeep = "#A16207";

type WP = { x: number; y: number };
type Track = {
  id: string;
  confidence: number;
  waypoints: WP[];
  duration: number;
  delay: number;
};

// Hand-tuned paths that hug the edges of the canvas so the hero text in the
// centre stays clean. Each entry/browse/exit sequence ends back near a
// doorway so the loop feels coherent.
const TRACKS: Track[] = [
  {
    id: "T-2847",
    confidence: 98,
    waypoints: [
      { x: 220, y: 690 },
      { x: 260, y: 540 },
      { x: 200, y: 420 },
      { x: 180, y: 300 },
      { x: 230, y: 220 },
    ],
    duration: 14,
    delay: 0,
  },
  {
    id: "T-2902",
    confidence: 96,
    waypoints: [
      { x: 360, y: 700 },
      { x: 400, y: 560 },
      { x: 470, y: 420 },
      { x: 360, y: 320 },
      { x: 300, y: 230 },
    ],
    duration: 17,
    delay: 2.2,
  },
  {
    id: "T-2913",
    confidence: 99,
    waypoints: [
      { x: 80, y: 540 },
      { x: 160, y: 460 },
      { x: 280, y: 480 },
      { x: 420, y: 500 },
      { x: 540, y: 480 },
    ],
    duration: 19,
    delay: 1.1,
  },
  {
    id: "T-2941",
    confidence: 97,
    waypoints: [
      { x: 1220, y: 690 },
      { x: 1180, y: 540 },
      { x: 1240, y: 420 },
      { x: 1290, y: 300 },
      { x: 1230, y: 220 },
    ],
    duration: 13,
    delay: 0.6,
  },
  {
    id: "T-2966",
    confidence: 95,
    waypoints: [
      { x: 1360, y: 700 },
      { x: 1300, y: 560 },
      { x: 1180, y: 440 },
      { x: 1080, y: 320 },
      { x: 1140, y: 230 },
    ],
    duration: 16,
    delay: 3.0,
  },
  {
    id: "T-2978",
    confidence: 98,
    waypoints: [
      { x: 1380, y: 480 },
      { x: 1240, y: 460 },
      { x: 1120, y: 480 },
      { x: 1000, y: 500 },
      { x: 900, y: 510 },
    ],
    duration: 18,
    delay: 4.4,
  },
  {
    id: "T-2994",
    confidence: 99,
    waypoints: [
      { x: 220, y: 690 },
      { x: 300, y: 600 },
      { x: 400, y: 660 },
      { x: 480, y: 700 },
    ],
    duration: 11,
    delay: 5.8,
  },
];

function waypointsToPath(wp: WP[]) {
  return `M ${wp[0].x} ${wp[0].y} ` + wp.slice(1).map((p) => `L ${p.x} ${p.y}`).join(" ");
}

/** Direction chevron pointing along the heading from prev->curr waypoint. */
function bearingFromPath(wp: WP[]) {
  // Use the middle segment for a stable representative heading.
  const i = Math.floor(wp.length / 2);
  const a = wp[i - 1];
  const b = wp[i];
  return (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
}

/** A tracked person rendered at the origin — translated by the parent <motion.g>. */
function TrackedAvatar({ id, confidence, bearing }: { id: string; confidence: number; bearing: number }) {
  return (
    <g>
      {/* AI bounding-box corner brackets (16x16) */}
      <g stroke={amber} strokeWidth="1.8" fill="none" strokeLinecap="round">
        <path d="M -14 -14 L -14 -7 M -14 -14 L -7 -14" />
        <path d="M 14 -14 L 14 -7 M 14 -14 L 7 -14" />
        <path d="M -14 14 L -14 7 M -14 14 L -7 14" />
        <path d="M 14 14 L 14 7 M 14 14 L 7 14" />
      </g>

      {/* Soft floor halo so the dot reads against any background */}
      <circle cx="0" cy="0" r="11" fill={amber} fillOpacity="0.18" />

      {/* Person dot */}
      <circle cx="0" cy="0" r="5.5" fill="#0f172a" />
      <circle cx="0" cy="0" r="3.5" fill={amber} />

      {/* Heading chevron */}
      <g transform={`rotate(${bearing})`}>
        <path d="M 8 0 L 16 -3 L 14 0 L 16 3 Z" fill={amber} />
      </g>

      {/* ID chip above the bracket */}
      <g transform="translate(-32 -32)">
        <rect x="0" y="0" width="64" height="11" rx="2" fill={amber} fillOpacity="0.96" />
        <text x="4" y="8" fill={ink} fontSize="7" fontWeight="900" fontFamily="monospace" letterSpacing="0.4">
          {id} · {confidence}%
        </text>
      </g>
    </g>
  );
}

/** Top-right card showing live visitor count that ticks up. */
function LiveCounterCard() {
  const [count, setCount] = useState(12847);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const tick = () => {
      if (cancelled) return;
      setCount((c) => c + 1);
      setPulse((p) => p + 1);
      const delay = 1800 + Math.random() * 2400;
      setTimeout(tick, delay);
    };
    const initial = setTimeout(tick, 2500);
    return () => {
      cancelled = true;
      clearTimeout(initial);
    };
  }, []);

  return (
    <g transform="translate(1190 175)">
      <rect x="0" y="0" width="220" height="68" rx="14" fill="white" stroke={amber} strokeOpacity="0.45" strokeWidth="1.3" />
      <text x="14" y="20" fill={strokeDeep} fontSize="9" fontWeight="900" letterSpacing="2" fontFamily="sans-serif">
        VISITORS · TODAY
      </text>
      <text x="14" y="50" fill="#0f172a" fontSize="26" fontWeight="900" fontFamily="sans-serif">
        {count.toLocaleString()}
      </text>

      {/* live indicator */}
      <motion.circle
        cx="200"
        cy="20"
        r="4"
        fill="#ef4444"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.4, repeat: Infinity }}
      />

      {/* +1 pop on each tick */}
      <motion.g
        key={pulse}
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: [0, 1, 1, 0], y: [10, -4, -10, -24] }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      >
        <rect x="170" y="44" width="40" height="14" rx="7" fill="#16a34a" />
        <text x="190" y="54" textAnchor="middle" fill="white" fontSize="9" fontWeight="900" fontFamily="sans-serif">
          +1
        </text>
      </motion.g>
    </g>
  );
}

/** Static corner camera icon with a subtle circular coverage area. */
function CornerCamera({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r="120" fill={amber} fillOpacity="0.04" />
      <circle cx={x} cy={y} r="120" fill="none" stroke={amber} strokeOpacity="0.18" strokeWidth="0.7" strokeDasharray="3 5" />
      <rect x={x - 14} y={y - 8} width="28" height="16" rx="3" fill="white" stroke={amberDeep} strokeWidth="1.1" />
      <circle cx={x} cy={y} r="3" fill={amber} />
      <motion.circle
        cx={x - 8}
        cy={y}
        r="1.6"
        fill="#ef4444"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.6, repeat: Infinity }}
      />
      <g transform={`translate(${x + 18} ${y - 8})`}>
        <rect x="0" y="0" width="44" height="11" rx="2" fill="white" stroke={amberDeep} strokeOpacity="0.5" strokeWidth="0.6" />
        <text x="22" y="8" textAnchor="middle" fill={amberDeep} fontSize="6.5" fontWeight="800" letterSpacing="1" fontFamily="monospace">
          {label}
        </text>
      </g>
    </g>
  );
}

export function HeroBackdrop() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.62]">
      <svg viewBox="0 0 1440 760" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full">
        <defs>
          <radialGradient id="floorHeatmap" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.32" />
            <stop offset="55%" stopColor={amber} stopOpacity="0.22" />
            <stop offset="100%" stopColor={amber} stopOpacity="0" />
          </radialGradient>
          <linearGradient id="centerFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="38%" stopColor="white" stopOpacity="0.86" />
            <stop offset="82%" stopColor="white" stopOpacity="0.5" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <pattern id="floorGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill={strokeDeep} fillOpacity="0.35" />
          </pattern>
        </defs>

        {/* Floor grid (subtle dot grid for spatial feel) */}
        <rect x="40" y="160" width="1360" height="540" fill="url(#floorGrid)" />

        {/* Outer building outline */}
        <rect x="40" y="160" width="1360" height="540" fill="none" stroke={strokeDeep} strokeWidth="1.3" rx="6" />

        {/* Inner zone boundaries (shelves, dressing rooms, checkout) */}
        <g stroke={stroke} strokeWidth="0.8" fill="none" strokeDasharray="3 4">
          {/* Left fixtures */}
          <rect x="80" y="220" width="160" height="80" rx="3" />
          <rect x="80" y="330" width="160" height="80" rx="3" />
          <rect x="80" y="440" width="120" height="50" rx="3" />
          {/* Right fixtures */}
          <rect x="1200" y="220" width="160" height="80" rx="3" />
          <rect x="1200" y="330" width="160" height="80" rx="3" />
          <rect x="1240" y="440" width="120" height="50" rx="3" />
          {/* Central checkout island */}
          <rect x="640" y="540" width="160" height="40" rx="4" />
          {/* Dressing rooms */}
          <rect x="320" y="220" width="80" height="120" rx="3" />
          <rect x="1040" y="220" width="80" height="120" rx="3" />
        </g>

        {/* Zone labels */}
        <g fill={strokeDeep} fontSize="9" fontWeight="900" letterSpacing="2.5" fontFamily="sans-serif">
          <text x="160" y="266" textAnchor="middle">SHELVES · A</text>
          <text x="160" y="376" textAnchor="middle">SHELVES · B</text>
          <text x="1280" y="266" textAnchor="middle">SHELVES · C</text>
          <text x="1280" y="376" textAnchor="middle">SHELVES · D</text>
          <text x="720" y="564" textAnchor="middle">CHECKOUT</text>
          <text x="360" y="285" textAnchor="middle">FITTING</text>
          <text x="1080" y="285" textAnchor="middle">FITTING</text>
        </g>

        {/* Soft heatmap blobs in genuinely high-traffic spots */}
        <g>
          <circle cx="280" cy="500" r="90" fill="url(#floorHeatmap)" />
          <circle cx="1160" cy="500" r="90" fill="url(#floorHeatmap)" />
          <circle cx="720" cy="600" r="70" fill="url(#floorHeatmap)" />
        </g>

        {/* Entry/exit doorways at the bottom */}
        {[
          { x: 220, label: "ENTRY 01" },
          { x: 1220, label: "ENTRY 02" },
        ].map((d) => (
          <g key={d.x}>
            <line x1={d.x - 30} y1="700" x2={d.x + 30} y2="700" stroke={amber} strokeWidth="2.5" strokeDasharray="4 4" strokeOpacity="0.9" />
            <rect x={d.x - 32} y="708" width="64" height="13" rx="2" fill={amber} fillOpacity="0.95" />
            <text x={d.x} y="717" textAnchor="middle" fill={ink} fontSize="8" fontWeight="900" fontFamily="monospace" letterSpacing="1.2">
              {d.label}
            </text>
          </g>
        ))}

        {/* Corner cameras with circular coverage zones */}
        <CornerCamera x={120} y={200} label="CAM-01" />
        <CornerCamera x={1320} y={200} label="CAM-02" />
        <CornerCamera x={120} y={620} label="CAM-03" />
        <CornerCamera x={1320} y={620} label="CAM-04" />

        {/* Static dotted trails for every tracked person — shows the path */}
        {TRACKS.map((t) => (
          <path
            key={`trail-${t.id}`}
            d={waypointsToPath(t.waypoints)}
            fill="none"
            stroke={amber}
            strokeWidth="1.1"
            strokeDasharray="3 5"
            strokeOpacity="0.4"
            strokeLinecap="round"
          />
        ))}

        {/* Moving tracked people — each translated through its waypoints */}
        {TRACKS.map((t) => {
          const xs = t.waypoints.map((w) => w.x);
          const ys = t.waypoints.map((w) => w.y);
          const bearing = bearingFromPath(t.waypoints);
          // Even time distribution per segment.
          const times = t.waypoints.map((_, i) => i / (t.waypoints.length - 1));
          return (
            <motion.g
              key={t.id}
              initial={{ x: xs[0], y: ys[0], opacity: 0 }}
              animate={{ x: xs, y: ys, opacity: [0, 1, 1, 1, 0] }}
              transition={{
                duration: t.duration,
                ease: "linear",
                times,
                repeat: Infinity,
                repeatDelay: 0.3,
                delay: t.delay,
              }}
            >
              <TrackedAvatar id={t.id} confidence={t.confidence} bearing={bearing} />
            </motion.g>
          );
        })}

        {/* Status strip — bottom center */}
        <g transform="translate(580 660)">
          <rect x="0" y="0" width="280" height="28" rx="14" fill="white" stroke={amber} strokeOpacity="0.4" strokeWidth="1.1" />
          <motion.circle
            cx="16"
            cy="14"
            r="4"
            fill="#16a34a"
            animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.15, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
          <text x="30" y="18" fill={ink} fontSize="10" fontWeight="900" letterSpacing="1.6" fontFamily="sans-serif">
            TRACKING {TRACKS.length} ACTIVE
          </text>
          <text x="200" y="18" fill={strokeDeep} fontSize="9" fontWeight="800" letterSpacing="1" fontFamily="monospace">
            · 4 CAMS · 30 FPS
          </text>
        </g>

        {/* Live visitors counter card */}
        <LiveCounterCard />

        {/* Centre vignette to keep the hero headline crisp */}
        <rect x="200" y="180" width="1040" height="440" fill="url(#centerFade)" rx="40" />
      </svg>
    </div>
  );
}
