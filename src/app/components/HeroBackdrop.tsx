import { motion } from "motion/react";

/**
 * Hero backdrop: AI people-counting visualization of a retail floor.
 * - Two storefronts (line-art) with shoppers walking past
 * - Yellow AI detection corner brackets around each person (computer-vision style)
 * - Ceiling sensors with visible amber detection cones
 * - Live counter chips with +1 entry pops
 * - Animated customer-journey path along the floor
 * - Soft center vignette so the headline still reads crisp
 */
export function HeroBackdrop() {
  const stroke = "#cbd5e1";
  const strokeDeep = "#94a3b8";
  const amber = "#EAB308";
  const amberDeep = "#A16207";

  const people: Array<{
    x: number;
    y: number;
    s: number;
    bag?: boolean;
    flip?: boolean;
    id: string;
    delay: number;
  }> = [
    { x: 140, y: 470, s: 1.1, bag: true, id: "P-021", delay: 0.2 },
    { x: 260, y: 490, s: 1.0, flip: true, id: "P-014", delay: 0.6 },
    { x: 1160, y: 470, s: 1.1, bag: true, flip: true, id: "P-038", delay: 0.4 },
    { x: 1280, y: 490, s: 0.95, id: "P-042", delay: 0.9 },
    { x: 410, y: 530, s: 0.8, bag: true, flip: true, id: "P-008", delay: 0.7 },
    { x: 1010, y: 530, s: 0.8, id: "P-031", delay: 0.3 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.62]">
      <svg
        viewBox="0 0 1440 760"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
      >
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
        </defs>

        {/* Ceiling */}
        <line x1="0" y1="120" x2="1440" y2="120" stroke={strokeDeep} strokeWidth="1.2" />
        <line x1="0" y1="138" x2="1440" y2="138" stroke={stroke} strokeWidth="0.6" strokeDasharray="8 10" />
        {[80, 280, 480, 720, 960, 1160, 1360].map((x) => (
          <rect key={x} x={x - 28} y="118" width="56" height="6" fill="none" stroke={stroke} strokeWidth="0.9" rx="1.5" />
        ))}

        {/* LEFT storefront — STORE 01 */}
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
              <path
                d={`M ${x - 14} 252 L ${x + 14} 252 L ${x + (i % 2 ? 10 : 12)} 320 L ${x - (i % 2 ? 10 : 12)} 320 Z`}
                fill="none"
                stroke={stroke}
                strokeWidth="0.7"
              />
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

        {/* RIGHT storefront — STORE 02 */}
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

        {/* CENTER — escalator silhouette */}
        <g opacity="0.7">
          <g transform="translate(460, 260)">
            <path d="M 0 280 L 180 60 L 230 60 L 50 280 Z" fill="none" stroke={stroke} strokeWidth="0.9" />
            {[...Array(9)].map((_, i) => (
              <line
                key={i}
                x1={i * 18 + 10}
                y1={280 - i * 26}
                x2={i * 18 + 60}
                y2={280 - i * 26}
                stroke={stroke}
                strokeWidth="0.5"
              />
            ))}
          </g>
        </g>

        {/* Floor */}
        <line x1="0" y1="600" x2="1440" y2="600" stroke={strokeDeep} strokeWidth="1.2" />
        <line x1="0" y1="620" x2="1440" y2="620" stroke={stroke} strokeWidth="0.5" strokeDasharray="5 7" />
        {[0, 160, 320, 480, 960, 1120, 1280, 1440].map((x) => (
          <line key={x} x1={x} y1="760" x2={720} y2="600" stroke={stroke} strokeWidth="0.3" />
        ))}

        {/* CEILING SENSORS with VISIBLE detection cones (AI cameras) */}
        {[230, 720, 1210].map((cx, idx) => (
          <g key={cx}>
            {/* Detection cone — fill + dashed edges */}
            <path
              d={`M ${cx - 90} 500 L ${cx} 140 L ${cx + 90} 500 Z`}
              fill="url(#coneGrad)"
              stroke={amber}
              strokeOpacity="0.4"
              strokeWidth="0.9"
              strokeDasharray="4 6"
            />
            {/* Scan sweep inside the cone */}
            <motion.path
              d={`M ${cx - 90} 500 L ${cx} 140 L ${cx + 90} 500 Z`}
              fill={amber}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.18, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: idx * 0.7, ease: "easeInOut" }}
            />
            {/* Sensor halo */}
            <circle cx={cx} cy="138" r="36" fill="url(#sensorGlow)" />
            {/* Sensor body */}
            <rect x={cx - 18} y="128" width="36" height="12" rx="3" fill="white" stroke={amberDeep} strokeWidth="1.1" />
            <circle cx={cx} cy="134" r="2.5" fill={amber} />
            {/* Pulsing record dot */}
            <motion.circle
              cx={cx - 10}
              cy="134"
              r="1.5"
              fill="#ef4444"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.6, repeat: Infinity, delay: idx * 0.3 }}
            />
            {/* CAM-NN label chip */}
            <g transform={`translate(${cx + 22} 128)`}>
              <rect x="0" y="0" width="44" height="12" rx="2" fill="white" stroke={amberDeep} strokeOpacity="0.5" strokeWidth="0.7" />
              <text x="22" y="9" textAnchor="middle" fill={amberDeep} fontSize="7" fontWeight="800" letterSpacing="1" fontFamily="monospace">
                CAM-{String(idx + 1).padStart(2, "0")}
              </text>
            </g>
          </g>
        ))}

        {/* PEOPLE with AI bounding-box corners + ID labels */}
        {people.map((p, i) => (
          <g key={i} transform={`translate(${p.x} ${p.y}) scale(${p.flip ? -1 : 1} 1)`}>
            {/* Floor halo */}
            <circle cx="0" cy="78" r="26" fill="url(#floorDot)" />
            <circle cx="0" cy="78" r="3" fill={amber} fillOpacity="0.8" />

            {/* AI detection bounding box (corner brackets only, computer-vision style) */}
            <g stroke={amber} strokeWidth="1.6" fill="none">
              {/* TL */}
              <path d="M -28 -44 L -28 -34 M -28 -44 L -18 -44" />
              {/* TR */}
              <path d="M 28 -44 L 28 -34 M 28 -44 L 18 -44" />
              {/* BL */}
              <path d="M -28 56 L -28 46 M -28 56 L -18 56" />
              {/* BR */}
              <path d="M 28 56 L 28 46 M 28 56 L 18 56" />
            </g>

            {/* ID + confidence chip (anti-flip so text stays readable) */}
            <g transform={`scale(${p.flip ? -1 : 1} 1) translate(-26 -54)`}>
              <rect x="0" y="0" width="52" height="9" rx="1.5" fill={amber} fillOpacity="0.95" />
              <text x="3" y="6.5" fill="#1a1a1a" fontSize="6.5" fontWeight="900" fontFamily="monospace" letterSpacing="0.5">
                {p.id} · 98%
              </text>
            </g>

            {/* Person silhouette */}
            <g stroke={strokeDeep} strokeWidth="1.3" fill="white" strokeLinecap="round">
              <circle cx="0" cy="-30" r="10" />
              <path d="M -16 -8 Q 0 -18 16 -8 L 20 48 L -20 48 Z" />
              <line x1="-8" y1="48" x2={i % 2 ? "-11" : "-6"} y2="76" fill="none" />
              <line x1="8" y1="48" x2={i % 2 ? "11" : "10"} y2="76" fill="none" />
              <line x1="-16" y1="-2" x2="-22" y2="26" fill="none" />
            </g>
            {p.bag && (
              <g transform="translate(24, 26)">
                <path d="M -3 -7 Q 0 -12 3 -7" fill="none" stroke={strokeDeep} strokeWidth="0.9" />
                <rect x="-7" y="-7" width="14" height="18" rx="1" fill="white" stroke={amberDeep} strokeOpacity="0.7" strokeWidth="0.9" />
              </g>
            )}

            {/* +1 counter pop */}
            <motion.g
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, 1, 1, 0], y: [-30, -54, -60, -68] }}
              transition={{ duration: 2.2, repeat: Infinity, delay: p.delay + 1.6, repeatDelay: 4 }}
            >
              <g transform={`scale(${p.flip ? -1 : 1} 1)`}>
                <rect x="-12" y="-80" width="24" height="13" rx="6.5" fill="#16a34a" />
                <text x="0" y="-71" textAnchor="middle" fill="white" fontSize="8" fontWeight="900" fontFamily="sans-serif">
                  +1
                </text>
              </g>
            </motion.g>
          </g>
        ))}

        {/* CUSTOMER JOURNEY PATH — single subtle line */}
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
          transition={{ duration: 3, delay: 0.6, ease: "easeInOut" }}
        />

        {/* DOORWAY ENTRY-COUNTING LINES (the key counting trigger) */}
        {[
          { x1: 100, x2: 100, label: "ENTRY" },
          { x1: 1340, x2: 1340, label: "ENTRY" },
        ].map((d, i) => (
          <g key={i}>
            <line
              x1={d.x1}
              y1="540"
              x2={d.x2}
              y2="600"
              stroke={amber}
              strokeWidth="2"
              strokeDasharray="3 4"
              strokeOpacity="0.8"
            />
            <rect x={d.x1 - 22} y="608" width="44" height="11" rx="2" fill={amber} fillOpacity="0.92" />
            <text x={d.x1} y="616" textAnchor="middle" fill="#1a1a1a" fontSize="7.5" fontWeight="900" fontFamily="monospace" letterSpacing="0.8">
              {d.label}
            </text>
          </g>
        ))}

        {/* Soft center vignette to keep headline readable */}
        <rect x="200" y="180" width="1040" height="440" fill="url(#centerFade)" rx="40" />
      </svg>
    </div>
  );
}
