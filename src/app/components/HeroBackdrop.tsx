import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * Hero backdrop: AI people-counting visualization that cycles through three
 * scenes every ~4.5 seconds.
 *
 *   Scene 1 — Mall storefronts (STORE 01 / STORE 02) with shoppers walking past
 *   Scene 2 — Single store entrance with a person walking through the doorway
 *             (live ENTRY threshold + "+1" counter pop when they cross)
 *   Scene 3 — Wide mall corridor with multiple people moving in different
 *             directions (criss-cross paths, multi-camera detection, heatmap)
 *
 * All scenes share the 1440×760 viewBox + amber palette + AI bounding-box
 * brackets so the visual language stays consistent between transitions.
 */

const stroke = "#cbd5e1";
const strokeDeep = "#94a3b8";
const amber = "#EAB308";
const amberDeep = "#A16207";

function SharedDefs() {
  return (
    <defs>
      <radialGradient id="sensorGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={amber} stopOpacity="0.55" />
        <stop offset="60%" stopColor={amber} stopOpacity="0.15" />
        <stop offset="100%" stopColor={amber} stopOpacity="0" />
      </radialGradient>
      <radialGradient id="floorDot" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={amber} stopOpacity="0.6" />
        <stop offset="100%" stopColor={amber} stopOpacity="0" />
      </radialGradient>
      <linearGradient id="centerFade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="white" stopOpacity="0" />
        <stop offset="40%" stopColor="white" stopOpacity="0.85" />
        <stop offset="80%" stopColor="white" stopOpacity="0.55" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="coneGrad" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor={amber} stopOpacity="0.18" />
        <stop offset="100%" stopColor={amber} stopOpacity="0" />
      </linearGradient>
      <radialGradient id="heatmap" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4" />
        <stop offset="60%" stopColor={amber} stopOpacity="0.25" />
        <stop offset="100%" stopColor={amber} stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

/** Reusable AI detection corner brackets around a person at origin (0,0). */
function DetectionBrackets({ w = 56, h = 100, topOffset = -44 }: { w?: number; h?: number; topOffset?: number }) {
  const hw = w / 2;
  const top = topOffset;
  const bot = top + h;
  return (
    <g stroke={amber} strokeWidth="1.6" fill="none">
      <path d={`M ${-hw} ${top} L ${-hw} ${top + 10} M ${-hw} ${top} L ${-hw + 10} ${top}`} />
      <path d={`M ${hw} ${top} L ${hw} ${top + 10} M ${hw} ${top} L ${hw - 10} ${top}`} />
      <path d={`M ${-hw} ${bot} L ${-hw} ${bot - 10} M ${-hw} ${bot} L ${-hw + 10} ${bot}`} />
      <path d={`M ${hw} ${bot} L ${hw} ${bot - 10} M ${hw} ${bot} L ${hw - 10} ${bot}`} />
    </g>
  );
}

/** Reusable ID + confidence chip above a person. */
function IdChip({ id, confidence = 98, flip = false }: { id: string; confidence?: number; flip?: boolean }) {
  return (
    <g transform={`scale(${flip ? -1 : 1} 1) translate(-28 -54)`}>
      <rect x="0" y="0" width="56" height="9" rx="1.5" fill={amber} fillOpacity="0.95" />
      <text x="3" y="6.5" fill="#1a1a1a" fontSize="6.5" fontWeight="900" fontFamily="monospace" letterSpacing="0.5">
        {id} · {confidence}%
      </text>
    </g>
  );
}

/** Reusable person silhouette (head + body + legs). */
function PersonSilhouette({ bag = false, gait = 0 }: { bag?: boolean; gait?: number }) {
  return (
    <g>
      <circle cx="0" cy="78" r="26" fill="url(#floorDot)" />
      <circle cx="0" cy="78" r="3" fill={amber} fillOpacity="0.8" />
      <g stroke={strokeDeep} strokeWidth="1.3" fill="white" strokeLinecap="round">
        <circle cx="0" cy="-30" r="10" />
        <path d="M -16 -8 Q 0 -18 16 -8 L 20 48 L -20 48 Z" />
        <line x1="-8" y1="48" x2={gait ? "-11" : "-6"} y2="76" />
        <line x1="8" y1="48" x2={gait ? "11" : "10"} y2="76" />
        <line x1="-16" y1="-2" x2="-22" y2="26" />
      </g>
      {bag && (
        <g transform="translate(24, 26)">
          <path d="M -3 -7 Q 0 -12 3 -7" fill="none" stroke={strokeDeep} strokeWidth="0.9" />
          <rect x="-7" y="-7" width="14" height="18" rx="1" fill="white" stroke={amberDeep} strokeOpacity="0.7" strokeWidth="0.9" />
        </g>
      )}
    </g>
  );
}

/** Ceiling-mounted AI camera with detection cone. */
function CeilingCamera({ cx, cyCam = 138, coneSpread = 90, coneBottom = 500, label, recordDelay = 0 }: {
  cx: number; cyCam?: number; coneSpread?: number; coneBottom?: number; label: string; recordDelay?: number;
}) {
  return (
    <g>
      <path
        d={`M ${cx - coneSpread} ${coneBottom} L ${cx} ${cyCam + 2} L ${cx + coneSpread} ${coneBottom} Z`}
        fill="url(#coneGrad)"
        stroke={amber}
        strokeOpacity="0.4"
        strokeWidth="0.9"
        strokeDasharray="4 6"
      />
      <motion.path
        d={`M ${cx - coneSpread} ${coneBottom} L ${cx} ${cyCam + 2} L ${cx + coneSpread} ${coneBottom} Z`}
        fill={amber}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.18, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, delay: recordDelay, ease: "easeInOut" }}
      />
      <circle cx={cx} cy={cyCam} r="36" fill="url(#sensorGlow)" />
      <rect x={cx - 18} y={cyCam - 10} width="36" height="12" rx="3" fill="white" stroke={amberDeep} strokeWidth="1.1" />
      <circle cx={cx} cy={cyCam - 4} r="2.5" fill={amber} />
      <motion.circle
        cx={cx - 10}
        cy={cyCam - 4}
        r="1.5"
        fill="#ef4444"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.6, repeat: Infinity, delay: recordDelay }}
      />
      <g transform={`translate(${cx + 22} ${cyCam - 10})`}>
        <rect x="0" y="0" width="44" height="12" rx="2" fill="white" stroke={amberDeep} strokeOpacity="0.5" strokeWidth="0.7" />
        <text x="22" y="9" textAnchor="middle" fill={amberDeep} fontSize="7" fontWeight="800" letterSpacing="1" fontFamily="monospace">
          {label}
        </text>
      </g>
    </g>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SCENE 1 — Mall storefronts (the original scene)
// ─────────────────────────────────────────────────────────────────────────────
function SceneStorefronts() {
  const people = [
    { x: 140, y: 470, bag: true, id: "P-021", delay: 0.2, flip: false },
    { x: 260, y: 490, flip: true, id: "P-014", delay: 0.6 },
    { x: 1160, y: 470, bag: true, flip: true, id: "P-038", delay: 0.4 },
    { x: 1280, y: 490, id: "P-042", delay: 0.9, flip: false },
    { x: 410, y: 530, bag: true, flip: true, id: "P-008", delay: 0.7 },
    { x: 1010, y: 530, id: "P-031", delay: 0.3, flip: false },
  ];

  return (
    <svg viewBox="0 0 1440 760" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full">
      <SharedDefs />

      {/* Ceiling */}
      <line x1="0" y1="120" x2="1440" y2="120" stroke={strokeDeep} strokeWidth="1.2" />
      <line x1="0" y1="138" x2="1440" y2="138" stroke={stroke} strokeWidth="0.6" strokeDasharray="8 10" />
      {[80, 280, 480, 720, 960, 1160, 1360].map((x) => (
        <rect key={x} x={x - 28} y="118" width="56" height="6" fill="none" stroke={stroke} strokeWidth="0.9" rx="1.5" />
      ))}

      {/* LEFT storefront */}
      <g>
        <rect x="20" y="155" width="380" height="395" fill="none" stroke={stroke} strokeWidth="1.1" rx="8" />
        <line x1="20" y1="197" x2="400" y2="197" stroke={stroke} strokeWidth="0.9" />
        <text x="210" y="184" textAnchor="middle" fill={strokeDeep} fontSize="13" fontWeight="900" letterSpacing="6" fontFamily="sans-serif">
          STORE · 01
        </text>
        {[115, 210, 305].map((x) => (
          <line key={x} x1={x} y1="197" x2={x} y2="550" stroke={stroke} strokeWidth="0.7" />
        ))}
        <line x1="50" y1="240" x2="370" y2="240" stroke={stroke} strokeWidth="1" />
        {[90, 150, 210, 270, 330].map((x, i) => (
          <g key={x}>
            <line x1={x} y1="240" x2={x} y2="252" stroke={stroke} strokeWidth="0.5" />
            <path d={`M ${x - 14} 252 L ${x + 14} 252 L ${x + (i % 2 ? 10 : 12)} 320 L ${x - (i % 2 ? 10 : 12)} 320 Z`} fill="none" stroke={stroke} strokeWidth="0.7" />
          </g>
        ))}
        {[370, 420, 470].map((y) => (
          <line key={y} x1="50" y1={y} x2="370" y2={y} stroke={stroke} strokeWidth="0.7" />
        ))}
        {[370, 420, 470].map((y) =>
          [90, 170, 250, 330].map((x) => (
            <rect key={`${x}-${y}`} x={x - 22} y={y - 22} width="44" height="18" rx="2" fill="none" stroke={stroke} strokeWidth="0.5" />
          ))
        )}
      </g>

      {/* RIGHT storefront */}
      <g>
        <rect x="1040" y="155" width="380" height="395" fill="none" stroke={stroke} strokeWidth="1.1" rx="8" />
        <line x1="1040" y1="197" x2="1420" y2="197" stroke={stroke} strokeWidth="0.9" />
        <text x="1230" y="184" textAnchor="middle" fill={strokeDeep} fontSize="13" fontWeight="900" letterSpacing="6" fontFamily="sans-serif">
          STORE · 02
        </text>
        {[1135, 1230, 1325].map((x) => (
          <line key={x} x1={x} y1="197" x2={x} y2="550" stroke={stroke} strokeWidth="0.7" />
        ))}
        {[245, 275, 305].map((y) => (
          <line key={y} x1="1080" y1={y} x2="1380" y2={y} stroke={stroke} strokeWidth="0.7" />
        ))}
        {[245, 275].map((y) =>
          [1110, 1170, 1230, 1290, 1350].map((x) => (
            <rect key={`${x}-${y}`} x={x - 18} y={y - 18} width="36" height="14" fill="none" stroke={stroke} strokeWidth="0.5" />
          ))
        )}
        <rect x="1080" y="360" width="300" height="10" fill="none" stroke={stroke} strokeWidth="0.9" rx="2" />
        {[1130, 1190, 1250, 1310].map((x) => (
          <rect key={x} x={x - 18} y="335" width="36" height="25" fill="none" stroke={stroke} strokeWidth="0.6" rx="2" />
        ))}
        <rect x="1080" y="455" width="180" height="40" fill="none" stroke={stroke} strokeWidth="0.9" rx="3" />
        <rect x="1100" y="438" width="32" height="18" fill="none" stroke={stroke} strokeWidth="0.6" rx="2" />
      </g>

      {/* Center escalator silhouette */}
      <g opacity="0.7">
        <g transform="translate(460, 260)">
          <path d="M 0 280 L 180 60 L 230 60 L 50 280 Z" fill="none" stroke={stroke} strokeWidth="0.9" />
          {[...Array(9)].map((_, i) => (
            <line key={i} x1={i * 18 + 10} y1={280 - i * 26} x2={i * 18 + 60} y2={280 - i * 26} stroke={stroke} strokeWidth="0.5" />
          ))}
        </g>
      </g>

      {/* Floor */}
      <line x1="0" y1="600" x2="1440" y2="600" stroke={strokeDeep} strokeWidth="1.2" />
      <line x1="0" y1="620" x2="1440" y2="620" stroke={stroke} strokeWidth="0.5" strokeDasharray="5 7" />

      {/* Ceiling cameras */}
      {[230, 720, 1210].map((cx, i) => (
        <CeilingCamera key={cx} cx={cx} label={`CAM-${String(i + 1).padStart(2, "0")}`} recordDelay={i * 0.3} />
      ))}

      {/* People with detection brackets */}
      {people.map((p, i) => (
        <g key={i} transform={`translate(${p.x} ${p.y}) scale(${p.flip ? -1 : 1} 1)`}>
          <DetectionBrackets />
          <IdChip id={p.id} flip={p.flip} />
          <PersonSilhouette bag={p.bag} gait={i % 2} />

          <motion.g
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 1, 1, 0], y: [-30, -54, -60, -68] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: p.delay + 1.6, repeatDelay: 4 }}
          >
            <g transform={`scale(${p.flip ? -1 : 1} 1)`}>
              <rect x="-12" y="-80" width="24" height="13" rx="6.5" fill="#16a34a" />
              <text x="0" y="-71" textAnchor="middle" fill="white" fontSize="8" fontWeight="900" fontFamily="sans-serif">+1</text>
            </g>
          </motion.g>
        </g>
      ))}

      {/* Customer journey path */}
      <motion.path
        d="M 60 700 Q 220 640 380 600 Q 540 580 700 590 Q 880 600 1060 580 Q 1240 560 1380 640"
        fill="none"
        stroke={amber}
        strokeWidth="1.8"
        strokeDasharray="7 9"
        strokeLinecap="round"
        strokeOpacity="0.7"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.7 }}
        transition={{ duration: 3, delay: 0.4, ease: "easeInOut" }}
      />

      {/* Doorway entry-counting lines */}
      {[100, 1340].map((x) => (
        <g key={x}>
          <line x1={x} y1="540" x2={x} y2="600" stroke={amber} strokeWidth="2" strokeDasharray="3 4" strokeOpacity="0.8" />
          <rect x={x - 22} y="608" width="44" height="11" rx="2" fill={amber} fillOpacity="0.92" />
          <text x={x} y="616" textAnchor="middle" fill="#1a1a1a" fontSize="7.5" fontWeight="900" fontFamily="monospace" letterSpacing="0.8">ENTRY</text>
        </g>
      ))}

      <rect x="200" y="180" width="1040" height="440" fill="url(#centerFade)" rx="40" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SCENE 2 — Person walking through a store doorway (single entrance close-up)
// ─────────────────────────────────────────────────────────────────────────────
function SceneEntrance() {
  return (
    <svg viewBox="0 0 1440 760" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full">
      <SharedDefs />

      {/* Ceiling */}
      <line x1="0" y1="120" x2="1440" y2="120" stroke={strokeDeep} strokeWidth="1.2" />
      <line x1="0" y1="138" x2="1440" y2="138" stroke={stroke} strokeWidth="0.6" strokeDasharray="8 10" />

      {/* Centered storefront with prominent doorway */}
      <g>
        <rect x="380" y="155" width="680" height="455" fill="none" stroke={stroke} strokeWidth="1.2" rx="10" />
        <line x1="380" y1="210" x2="1060" y2="210" stroke={stroke} strokeWidth="0.9" />
        <text x="720" y="195" textAnchor="middle" fill={strokeDeep} fontSize="16" fontWeight="900" letterSpacing="10" fontFamily="sans-serif">
          BEYOND TRAFFIC · STORE
        </text>

        {/* Glass mullions on each side of the doorway */}
        {[460, 540, 620, 820, 900, 980].map((x) => (
          <line key={x} x1={x} y1="210" x2={x} y2="610" stroke={stroke} strokeWidth="0.6" />
        ))}

        {/* Doorway frame (open) */}
        <line x1="680" y1="210" x2="680" y2="610" stroke={strokeDeep} strokeWidth="1.4" />
        <line x1="760" y1="210" x2="760" y2="610" stroke={strokeDeep} strokeWidth="1.4" />
        <line x1="680" y1="210" x2="760" y2="210" stroke={strokeDeep} strokeWidth="1.4" />

        {/* Interior product display (faint) */}
        {[260, 290, 320].map((y) =>
          [410, 480, 870, 940, 1010].map((x) => (
            <rect key={`${x}-${y}`} x={x - 20} y={y - 16} width="40" height="14" fill="none" stroke={stroke} strokeWidth="0.5" rx="1.5" />
          ))
        )}
        <line x1="400" y1="500" x2="640" y2="500" stroke={stroke} strokeWidth="0.7" />
        <line x1="800" y1="500" x2="1040" y2="500" stroke={stroke} strokeWidth="0.7" />
      </g>

      {/* Floor */}
      <line x1="0" y1="610" x2="1440" y2="610" stroke={strokeDeep} strokeWidth="1.2" />
      <line x1="0" y1="630" x2="1440" y2="630" stroke={stroke} strokeWidth="0.5" strokeDasharray="5 7" />

      {/* Camera above the doorway */}
      <CeilingCamera cx={720} cyCam={170} coneSpread={70} coneBottom={580} label="CAM-01" />

      {/* ENTRY counting line at the doorway threshold */}
      <line x1="680" y1="600" x2="760" y2="600" stroke={amber} strokeWidth="2.5" strokeDasharray="4 4" strokeOpacity="0.85" />
      <rect x="680" y="612" width="80" height="14" rx="2" fill={amber} fillOpacity="0.95" />
      <text x="720" y="623" textAnchor="middle" fill="#1a1a1a" fontSize="9" fontWeight="900" fontFamily="monospace" letterSpacing="1.5">ENTRY ZONE</text>

      {/* Person walking from left toward the doorway, then through */}
      <motion.g
        initial={{ x: 100, opacity: 0 }}
        animate={{
          x: [100, 720, 720, 720],
          opacity: [0, 1, 1, 0],
        }}
        transition={{ duration: 4, ease: "linear", times: [0, 0.65, 0.85, 1], repeat: Infinity }}
      >
        <g transform="translate(0 500)">
          <DetectionBrackets />
          <IdChip id="P-1247" />
          <PersonSilhouette bag />
        </g>
      </motion.g>

      {/* +1 ENTRY pop when person crosses the threshold */}
      <motion.g
        animate={{
          opacity: [0, 0, 1, 1, 0],
          y: [0, 0, -20, -30, -40],
          scale: [0.6, 0.6, 1.2, 1, 0.9],
        }}
        transition={{ duration: 4, ease: "easeInOut", times: [0, 0.6, 0.7, 0.85, 1], repeat: Infinity }}
      >
        <g transform="translate(820 490)">
          <rect x="-22" y="-12" width="44" height="20" rx="10" fill="#16a34a" />
          <text x="0" y="2" textAnchor="middle" fill="white" fontSize="11" fontWeight="900" fontFamily="sans-serif">+1 ENTRY</text>
        </g>
      </motion.g>

      {/* Live counter chip top-right */}
      <g transform="translate(1180 220)">
        <rect x="0" y="0" width="200" height="58" rx="12" fill="white" stroke={amber} strokeWidth="1.2" strokeOpacity="0.4" />
        <text x="12" y="20" fill={strokeDeep} fontSize="9" fontWeight="900" letterSpacing="2" fontFamily="sans-serif">VISITORS · TODAY</text>
        <motion.text
          x="12" y="46" fill="#0f172a" fontSize="24" fontWeight="900" fontFamily="sans-serif"
          animate={{ opacity: [1, 1, 0.4, 1] }}
          transition={{ duration: 4, times: [0, 0.7, 0.78, 0.85], repeat: Infinity }}
        >
          12,847
        </motion.text>
        <motion.circle
          cx="180" cy="20" r="4" fill="#ef4444"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        />
      </g>

      {/* Approach guidelines on floor (subtle) */}
      <motion.path
        d="M 100 580 Q 350 575 620 580"
        fill="none"
        stroke={amber}
        strokeWidth="1.6"
        strokeDasharray="6 8"
        strokeOpacity="0.6"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
      />

      <rect x="200" y="180" width="1040" height="440" fill="url(#centerFade)" rx="40" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SCENE 3 — Wide mall corridor with multiple people in different directions
// ─────────────────────────────────────────────────────────────────────────────
function SceneCorridor() {
  return (
    <svg viewBox="0 0 1440 760" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full">
      <SharedDefs />

      {/* Top wall (storefronts) */}
      <line x1="0" y1="120" x2="1440" y2="120" stroke={strokeDeep} strokeWidth="1.2" />
      <line x1="0" y1="138" x2="1440" y2="138" stroke={stroke} strokeWidth="0.6" strokeDasharray="8 10" />
      {[
        { x: 30, label: "RETAIL" },
        { x: 370, label: "FASHION" },
        { x: 740, label: "F&B" },
        { x: 1080, label: "JEWEL" },
      ].map((s) => (
        <g key={s.x}>
          <rect x={s.x} y="160" width="300" height="120" fill="none" stroke={stroke} strokeWidth="0.9" rx="4" />
          <line x1={s.x} y1="195" x2={s.x + 300} y2="195" stroke={stroke} strokeWidth="0.7" />
          <text x={s.x + 150} y="184" textAnchor="middle" fill={strokeDeep} fontSize="11" fontWeight="900" letterSpacing="5" fontFamily="sans-serif">
            {s.label}
          </text>
          {[230, 250, 270].map((y) => (
            <line key={y} x1={s.x + 20} y1={y} x2={s.x + 280} y2={y} stroke={stroke} strokeWidth="0.5" />
          ))}
        </g>
      ))}

      {/* Bottom wall (storefronts) */}
      <line x1="0" y1="610" x2="1440" y2="610" stroke={strokeDeep} strokeWidth="1.2" />
      {[
        { x: 30, label: "BEAUTY" },
        { x: 370, label: "TECH" },
        { x: 740, label: "SPORTS" },
        { x: 1080, label: "HOME" },
      ].map((s) => (
        <g key={s.x}>
          <rect x={s.x} y="610" width="300" height="40" fill="none" stroke={stroke} strokeWidth="0.9" rx="4" />
          <text x={s.x + 150} y="635" textAnchor="middle" fill={strokeDeep} fontSize="10" fontWeight="900" letterSpacing="5" fontFamily="sans-serif">
            {s.label}
          </text>
        </g>
      ))}

      {/* Floor grid lines (perspective hint) */}
      {[330, 400, 470, 540].map((y) => (
        <line key={y} x1="0" y1={y} x2="1440" y2={y} stroke={stroke} strokeWidth="0.3" strokeDasharray="2 12" opacity="0.6" />
      ))}

      {/* Floor heatmap clusters (high-traffic zones) */}
      <g opacity="0.9">
        <circle cx="460" cy="430" r="80" fill="url(#heatmap)" />
        <circle cx="980" cy="470" r="100" fill="url(#heatmap)" />
        <circle cx="720" cy="380" r="60" fill="url(#heatmap)" />
      </g>
      <g transform="translate(20 660)">
        <rect x="0" y="0" width="120" height="18" rx="3" fill="white" stroke={amberDeep} strokeWidth="0.7" strokeOpacity="0.6" />
        <text x="60" y="12" textAnchor="middle" fill={amberDeep} fontSize="9" fontWeight="800" fontFamily="monospace" letterSpacing="1">HEATMAP · LIVE</text>
      </g>

      {/* Ceiling cameras across the corridor */}
      {[260, 600, 940, 1280].map((cx, i) => (
        <CeilingCamera key={cx} cx={cx} coneSpread={75} coneBottom={460} label={`CAM-${String(i + 1).padStart(2, "0")}`} recordDelay={i * 0.25} />
      ))}

      {/* Person 1: walking right along upper floor */}
      <motion.g
        initial={{ x: -100 }}
        animate={{ x: 1540 }}
        transition={{ duration: 6, ease: "linear", repeat: Infinity }}
      >
        <g transform="translate(0 360)">
          <DetectionBrackets />
          <IdChip id="P-2103" />
          <PersonSilhouette bag />
        </g>
      </motion.g>

      {/* Person 2: walking left along middle floor */}
      <motion.g
        initial={{ x: 1540 }}
        animate={{ x: -100 }}
        transition={{ duration: 7, ease: "linear", repeat: Infinity, delay: 0.5 }}
      >
        <g transform="translate(0 450)">
          <g transform="scale(-1 1)">
            <DetectionBrackets />
            <IdChip id="P-2118" flip />
            <PersonSilhouette gait={1} />
          </g>
        </g>
      </motion.g>

      {/* Person 3: walking right along lower floor, slightly slower */}
      <motion.g
        initial={{ x: -100 }}
        animate={{ x: 1540 }}
        transition={{ duration: 8, ease: "linear", repeat: Infinity, delay: 1.2 }}
      >
        <g transform="translate(0 510)">
          <DetectionBrackets />
          <IdChip id="P-2094" />
          <PersonSilhouette />
        </g>
      </motion.g>

      {/* Person 4: standing still browsing a storefront (top-right) */}
      <g transform="translate(1150 470)">
        <DetectionBrackets />
        <IdChip id="P-2127" />
        <PersonSilhouette bag />
        <motion.g
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, 1, 1, 0], y: [-30, -54, -60, -68] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: 2, repeatDelay: 3 }}
        >
          <rect x="-14" y="-80" width="28" height="13" rx="6.5" fill={amber} />
          <text x="0" y="-71" textAnchor="middle" fill="#1a1a1a" fontSize="8" fontWeight="900" fontFamily="sans-serif">DWELL</text>
        </motion.g>
      </g>

      {/* Path arrows across the corridor */}
      <motion.path
        d="M 80 410 Q 400 380 740 400 Q 1080 420 1380 410"
        fill="none"
        stroke={amber}
        strokeWidth="1.6"
        strokeDasharray="6 8"
        strokeOpacity="0.55"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, ease: "easeInOut" }}
      />
      <motion.path
        d="M 1380 490 Q 1080 510 740 490 Q 400 470 80 490"
        fill="none"
        stroke={amber}
        strokeWidth="1.6"
        strokeDasharray="6 8"
        strokeOpacity="0.55"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3.5, ease: "easeInOut", delay: 0.3 }}
      />

      {/* Live aggregate counter top-right */}
      <g transform="translate(1190 180)">
        <rect x="0" y="0" width="220" height="58" rx="12" fill="white" stroke={amber} strokeWidth="1.2" strokeOpacity="0.4" />
        <text x="12" y="20" fill={strokeDeep} fontSize="9" fontWeight="900" letterSpacing="2" fontFamily="sans-serif">CORRIDOR · NOW</text>
        <text x="12" y="46" fill="#0f172a" fontSize="24" fontWeight="900" fontFamily="sans-serif">412 ppl</text>
        <motion.circle cx="200" cy="20" r="4" fill="#ef4444" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.4, repeat: Infinity }} />
      </g>

      <rect x="200" y="180" width="1040" height="440" fill="url(#centerFade)" rx="40" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main component — cycles through scenes
// ─────────────────────────────────────────────────────────────────────────────
const SCENES = [SceneStorefronts, SceneEntrance, SceneCorridor];
const SCENE_LABELS = ["Mall walk-by", "Store entrance", "Mall corridor"];
const SCENE_DURATION_MS = 5000;

export function HeroBackdrop() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SCENES.length);
    }, SCENE_DURATION_MS);
    return () => clearInterval(id);
  }, []);

  const Scene = SCENES[index];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.62]">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <Scene />
        </motion.div>
      </AnimatePresence>

      {/* Scene indicator dots (bottom-center, very subtle) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {SCENES.map((_, i) => (
          <span
            key={i}
            className={`block h-1.5 rounded-full transition-all duration-500 ${
              i === index ? "w-8 bg-yellow-500" : "w-1.5 bg-yellow-500/30"
            }`}
            title={SCENE_LABELS[i]}
          />
        ))}
      </div>
    </div>
  );
}
