import { motion } from "motion/react";

/**
 * Hero backdrop: modern top-down spatial tracking view of a retail floor.
 *
 * Tracks seven people simultaneously, each classified into one of four
 * categories with its own colour:
 *
 *   Female (pink)    · Male (blue)    · Kid (violet)    · Staff (emerald)
 *
 * Per-person elements rendered:
 *   - soft category-coloured glow ring (radar-blip feel)
 *   - tiny top-down body silhouette (shoulder shadow + head circle)
 *   - directional bearing chevron pointing along the heading
 *   - four AI bounding-box corner brackets in the category colour
 *   - persistent ID chip: "T-####  ·  CATEGORY  ·  XX%"
 *   - periodic floating "+1 FEMALE · 28" / "+1 STAFF · MGR" demographic
 *     pop that drifts upward and fades, so the user literally sees the
 *     model classifying age + gender + employee status in real time
 *
 * Plus: four corner cameras with circular coverage zones, soft heatmap
 * blobs at the busiest spots, persistent dotted trails behind every
 * track, and a bottom-centre demographics legend card showing the live
 * percentage breakdown by category.
 */

const stroke = "#cbd5e1";
const strokeDeep = "#94a3b8";
const ink = "#1a1a1a";
const amber = "#EAB308";
const amberDeep = "#A16207";

type Category = "female" | "male" | "kid" | "staff";

const CATEGORY: Record<
  Category,
  { primary: string; ring: string; label: string; symbol: string }
> = {
  female: { primary: "#EC4899", ring: "rgba(236,72,153,0.22)", label: "FEMALE", symbol: "F" },
  male: { primary: "#3B82F6", ring: "rgba(59,130,246,0.22)", label: "MALE", symbol: "M" },
  kid: { primary: "#A855F7", ring: "rgba(168,85,247,0.22)", label: "KID", symbol: "K" },
  staff: { primary: "#10B981", ring: "rgba(16,185,129,0.22)", label: "STAFF", symbol: "S" },
};

type WP = { x: number; y: number };
type Track = {
  id: string;
  category: Category;
  meta: string; // age (e.g. "28") or role (e.g. "MGR-04")
  confidence: number;
  waypoints: WP[];
  duration: number;
  delay: number;
  popDelay: number; // when in the loop the demographic pop appears
};

const TRACKS: Track[] = [
  {
    id: "T-2847",
    category: "female",
    meta: "28",
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
    popDelay: 2.0,
  },
  {
    id: "T-2902",
    category: "male",
    meta: "34",
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
    popDelay: 4.0,
  },
  {
    id: "T-2913",
    category: "kid",
    meta: "8",
    confidence: 94,
    waypoints: [
      { x: 80, y: 540 },
      { x: 160, y: 460 },
      { x: 280, y: 480 },
      { x: 420, y: 500 },
      { x: 540, y: 480 },
    ],
    duration: 19,
    delay: 1.1,
    popDelay: 5.5,
  },
  {
    id: "T-2941",
    category: "staff",
    meta: "MGR-04",
    confidence: 99,
    waypoints: [
      { x: 720, y: 580 },
      { x: 820, y: 500 },
      { x: 920, y: 460 },
      { x: 1040, y: 480 },
      { x: 1140, y: 540 },
    ],
    duration: 13,
    delay: 0.6,
    popDelay: 1.8,
  },
  {
    id: "T-2966",
    category: "female",
    meta: "41",
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
    popDelay: 6.0,
  },
  {
    id: "T-2978",
    category: "male",
    meta: "26",
    confidence: 97,
    waypoints: [
      { x: 1380, y: 480 },
      { x: 1240, y: 460 },
      { x: 1120, y: 480 },
      { x: 1000, y: 500 },
      { x: 900, y: 510 },
    ],
    duration: 18,
    delay: 4.4,
    popDelay: 3.5,
  },
  {
    id: "T-2994",
    category: "staff",
    meta: "CASHIER-02",
    confidence: 99,
    waypoints: [
      { x: 700, y: 560 },
      { x: 720, y: 580 },
      { x: 740, y: 560 },
      { x: 720, y: 580 },
    ],
    duration: 11,
    delay: 5.8,
    popDelay: 4.5,
  },
];

function waypointsToPath(wp: WP[]) {
  return `M ${wp[0].x} ${wp[0].y} ` + wp.slice(1).map((p) => `L ${p.x} ${p.y}`).join(" ");
}

function bearingFromPath(wp: WP[]) {
  const i = Math.floor(wp.length / 2);
  const a = wp[i - 1];
  const b = wp[i];
  return (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
}

/** A tracked person rendered at the origin — translated by the parent <motion.g>. */
function TrackedAvatar({
  id,
  category,
  meta,
  confidence,
  bearing,
  popDelay,
}: {
  id: string;
  category: Category;
  meta: string;
  confidence: number;
  bearing: number;
  popDelay: number;
}) {
  const c = CATEGORY[category];

  return (
    <g>
      {/* Pulsing detection halo — the "radar blip" */}
      <motion.circle
        cx="0"
        cy="0"
        r="18"
        fill={c.ring}
        animate={{ scale: [1, 1.35, 1], opacity: [0.9, 0.5, 0.9] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <circle cx="0" cy="0" r="11" fill={c.ring} />

      {/* AI bounding box corner brackets in category colour */}
      <g stroke={c.primary} strokeWidth="2" fill="none" strokeLinecap="round">
        <path d="M -15 -15 L -15 -7 M -15 -15 L -7 -15" />
        <path d="M 15 -15 L 15 -7 M 15 -15 L 7 -15" />
        <path d="M -15 15 L -15 7 M -15 15 L -7 15" />
        <path d="M 15 15 L 15 7 M 15 15 L 7 15" />
      </g>

      {/* Top-down body silhouette: shoulder shadow + head */}
      <ellipse cx="0" cy="2" rx="7" ry="3.6" fill="#0f172a" opacity="0.32" />
      <circle cx="0" cy="0" r="5.2" fill={c.primary} stroke="white" strokeWidth="1.6" />

      {/* Direction chevron */}
      <g transform={`rotate(${bearing})`}>
        <path d="M 9 0 L 18 -3.5 L 15.5 0 L 18 3.5 Z" fill={c.primary} />
      </g>

      {/* Category badge dot (small letter) on the head */}
      <text x="0" y="2" textAnchor="middle" fill="white" fontSize="6.5" fontWeight="900" fontFamily="sans-serif">
        {c.symbol}
      </text>

      {/* ID chip above the bracket */}
      <g transform="translate(-44 -34)">
        <rect x="0" y="0" width="88" height="11" rx="2" fill={c.primary} fillOpacity="0.96" />
        <text x="4" y="8" fill="white" fontSize="6.5" fontWeight="900" fontFamily="monospace" letterSpacing="0.3">
          {id} · {c.label} · {confidence}%
        </text>
      </g>

      {/* Floating demographic +1 pop that drifts up and fades, looped */}
      <motion.g
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: [0, 1, 1, 0], y: [-32, -50, -58, -72] }}
        transition={{
          duration: 2.4,
          ease: "easeOut",
          delay: popDelay,
          repeat: Infinity,
          repeatDelay: 5,
        }}
      >
        <rect x="-44" y="-62" width="88" height="14" rx="7" fill={c.primary} />
        <text x="0" y="-52" textAnchor="middle" fill="white" fontSize="8" fontWeight="900" fontFamily="sans-serif" letterSpacing="0.4">
          +1 {c.label} · {meta}
        </text>
      </motion.g>
    </g>
  );
}

function CornerCamera({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r="120" fill={amber} fillOpacity="0.04" />
      <circle
        cx={x}
        cy={y}
        r="120"
        fill="none"
        stroke={amber}
        strokeOpacity="0.18"
        strokeWidth="0.7"
        strokeDasharray="3 5"
      />
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
        <text
          x="22"
          y="8"
          textAnchor="middle"
          fill={amberDeep}
          fontSize="6.5"
          fontWeight="800"
          letterSpacing="1"
          fontFamily="monospace"
        >
          {label}
        </text>
      </g>
    </g>
  );
}

export function HeroBackdrop() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.7]">
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

        {/* Floor grid (dot grid for spatial feel) */}
        <rect x="40" y="160" width="1360" height="540" fill="url(#floorGrid)" />

        {/* Outer building outline */}
        <rect x="40" y="160" width="1360" height="540" fill="none" stroke={strokeDeep} strokeWidth="1.3" rx="6" />

        {/* Inner zone boundaries */}
        <g stroke={stroke} strokeWidth="0.8" fill="none" strokeDasharray="3 4">
          <rect x="80" y="220" width="160" height="80" rx="3" />
          <rect x="80" y="330" width="160" height="80" rx="3" />
          <rect x="80" y="440" width="120" height="50" rx="3" />
          <rect x="1200" y="220" width="160" height="80" rx="3" />
          <rect x="1200" y="330" width="160" height="80" rx="3" />
          <rect x="1240" y="440" width="120" height="50" rx="3" />
          <rect x="640" y="540" width="160" height="40" rx="4" />
          <rect x="320" y="220" width="80" height="120" rx="3" />
          <rect x="1040" y="220" width="80" height="120" rx="3" />
        </g>

        <g fill={strokeDeep} fontSize="9" fontWeight="900" letterSpacing="2.5" fontFamily="sans-serif">
          <text x="160" y="266" textAnchor="middle">SHELVES · A</text>
          <text x="160" y="376" textAnchor="middle">SHELVES · B</text>
          <text x="1280" y="266" textAnchor="middle">SHELVES · C</text>
          <text x="1280" y="376" textAnchor="middle">SHELVES · D</text>
          <text x="720" y="564" textAnchor="middle">CHECKOUT</text>
          <text x="360" y="285" textAnchor="middle">FITTING</text>
          <text x="1080" y="285" textAnchor="middle">FITTING</text>
        </g>

        {/* Soft heatmap blobs at high-traffic spots */}
        <g>
          <circle cx="280" cy="500" r="90" fill="url(#floorHeatmap)" />
          <circle cx="1160" cy="500" r="90" fill="url(#floorHeatmap)" />
          <circle cx="720" cy="600" r="70" fill="url(#floorHeatmap)" />
        </g>

        {/* Entry doorways */}
        {[
          { x: 220, label: "ENTRY 01" },
          { x: 1220, label: "ENTRY 02" },
        ].map((d) => (
          <g key={d.x}>
            <line
              x1={d.x - 30}
              y1="700"
              x2={d.x + 30}
              y2="700"
              stroke={amber}
              strokeWidth="2.5"
              strokeDasharray="4 4"
              strokeOpacity="0.9"
            />
            <rect x={d.x - 32} y="708" width="64" height="13" rx="2" fill={amber} fillOpacity="0.95" />
            <text x={d.x} y="717" textAnchor="middle" fill={ink} fontSize="8" fontWeight="900" fontFamily="monospace" letterSpacing="1.2">
              {d.label}
            </text>
          </g>
        ))}

        {/* Corner cameras */}
        <CornerCamera x={120} y={200} label="CAM-01" />
        <CornerCamera x={1320} y={200} label="CAM-02" />
        <CornerCamera x={120} y={620} label="CAM-03" />
        <CornerCamera x={1320} y={620} label="CAM-04" />

        {/* Persistent dotted trails (per-category coloured) */}
        {TRACKS.map((t) => (
          <path
            key={`trail-${t.id}`}
            d={waypointsToPath(t.waypoints)}
            fill="none"
            stroke={CATEGORY[t.category].primary}
            strokeWidth="1.1"
            strokeDasharray="3 5"
            strokeOpacity="0.32"
            strokeLinecap="round"
          />
        ))}

        {/* Moving tracked people — translated through waypoints */}
        {TRACKS.map((t) => {
          const xs = t.waypoints.map((w) => w.x);
          const ys = t.waypoints.map((w) => w.y);
          const bearing = bearingFromPath(t.waypoints);
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
              <TrackedAvatar
                id={t.id}
                category={t.category}
                meta={t.meta}
                confidence={t.confidence}
                bearing={bearing}
                popDelay={t.popDelay}
              />
            </motion.g>
          );
        })}

        {/* Centre vignette keeps the headline crisp */}
        <rect x="200" y="180" width="1040" height="440" fill="url(#centerFade)" rx="40" />
      </svg>
    </div>
  );
}
