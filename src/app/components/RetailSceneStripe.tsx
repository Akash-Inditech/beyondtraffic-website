import { motion } from "motion/react";

/**
 * Thin reusable retail-mall scene strip — used as a horizontal accent across sections.
 * Shows shoppers walking, detection halos, ceiling sensors, customer paths and storefront hints.
 * Variants:
 *  - "light": gray lines on light section backgrounds
 *  - "dark": gray-blue lines on dark section backgrounds
 */
export function RetailSceneStripe({
  variant = "light",
  className = "",
  opacity = 0.35,
}: {
  variant?: "light" | "dark";
  className?: string;
  opacity?: number;
}) {
  const stroke = variant === "dark" ? "#475569" : "#cbd5e1";
  const strokeDeep = variant === "dark" ? "#64748b" : "#94a3b8";
  const amber = "#EAB308";
  const amberDeep = "#A16207";
  const bgWhite = variant === "dark" ? "#0f172a" : "#ffffff";

  // Shoppers walking the strip
  const people = [
    { x: 120, y: 130, bag: true },
    { x: 320, y: 145, bag: false, flip: true },
    { x: 540, y: 130, bag: true, flip: true },
    { x: 760, y: 145, bag: false },
    { x: 980, y: 130, bag: true },
    { x: 1200, y: 145, bag: true, flip: true },
    { x: 1380, y: 130, bag: false },
  ];

  return (
    <div
      className={`pointer-events-none ${className}`}
      style={{ opacity }}
      aria-hidden
    >
      <svg
        viewBox="0 0 1500 240"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
      >
        {/* Ceiling */}
        <line x1="0" y1="14" x2="1500" y2="14" stroke={strokeDeep} strokeWidth="1.4" />
        <line x1="0" y1="28" x2="1500" y2="28" stroke={stroke} strokeWidth="0.7" strokeDasharray="6 8" />
        {[140, 360, 580, 800, 1020, 1240, 1440].map((x) => (
          <rect key={x} x={x - 22} y="12" width="44" height="6" rx="1.5" fill="none" stroke={strokeDeep} strokeWidth="1" />
        ))}

        {/* Storefront hints (header bars) */}
        {[
          { x: 20, w: 180, label: "STORE A" },
          { x: 230, w: 180, label: "ZARA" },
          { x: 440, w: 180, label: "SEPHORA" },
          { x: 650, w: 200, label: "APPLE" },
          { x: 880, w: 180, label: "NIKE" },
          { x: 1090, w: 180, label: "H&M" },
          { x: 1300, w: 180, label: "STARBUCKS" },
        ].map((s, i) => (
          <g key={i}>
            <rect x={s.x} y="40" width={s.w} height="22" rx="3" fill="#FEF9C3" fillOpacity={variant === "dark" ? "0.08" : "0.4"} stroke={strokeDeep} strokeWidth="1" />
            <text x={s.x + s.w / 2} y="55" textAnchor="middle" fill={amberDeep} fontSize="10" fontWeight="900" letterSpacing="3" fontFamily="sans-serif">
              {s.label}
            </text>
          </g>
        ))}

        {/* Ceiling sensors with detection cones */}
        {[260, 720, 1180].map((cx) => (
          <g key={cx}>
            <defs>
              <radialGradient id={`stripeGlow-${cx}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={amber} stopOpacity="0.45" />
                <stop offset="100%" stopColor={amber} stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx={cx} cy="20" r="36" fill={`url(#stripeGlow-${cx})`} />
            <rect x={cx - 12} y="14" width="24" height="8" rx="2" fill={bgWhite} stroke={strokeDeep} strokeWidth="1.1" />
            <circle cx={cx} cy="18" r="2" fill={amber} />
            <path
              d={`M ${cx - 60} 180 L ${cx} 22 L ${cx + 60} 180 Z`}
              fill={amber}
              fillOpacity="0.04"
              stroke={amber}
              strokeOpacity="0.35"
              strokeWidth="0.7"
              strokeDasharray="3 4"
            />
          </g>
        ))}

        {/* Floor */}
        <line x1="0" y1="200" x2="1500" y2="200" stroke={strokeDeep} strokeWidth="1.4" />
        <line x1="0" y1="214" x2="1500" y2="214" stroke={stroke} strokeWidth="0.6" strokeDasharray="4 6" />

        {/* People */}
        {people.map((p, i) => (
          <g key={i} transform={`translate(${p.x} ${p.y}) scale(${p.flip ? -1 : 1} 1)`}>
            <defs>
              <radialGradient id={`stripeDot-${i}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={amber} stopOpacity="0.6" />
                <stop offset="100%" stopColor={amber} stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="0" cy="60" r="20" fill={`url(#stripeDot-${i})`} />
            <circle cx="0" cy="60" r="3" fill={amber} />
            <g stroke={strokeDeep} strokeWidth="1.2" fill={bgWhite} strokeLinecap="round">
              <circle cx="0" cy="-18" r="8" />
              <path d="M -12 -2 Q 0 -10 12 -2 L 16 36 L -16 36 Z" />
              <line x1="-7" y1="36" x2={i % 2 ? "-10" : "-5"} y2="58" fill="none" />
              <line x1="7" y1="36" x2={i % 2 ? "10" : "9"} y2="58" fill="none" />
              <line x1="-12" y1="2" x2="-18" y2="22" fill="none" />
            </g>
            {p.bag && (
              <g transform="translate(20, 22)">
                <path d="M -2 -6 Q 0 -10 2 -6" fill="none" stroke={strokeDeep} strokeWidth="1" />
                <rect x="-6" y="-6" width="12" height="16" rx="1" fill="#FEF9C3" stroke={amberDeep} strokeWidth="1.1" />
              </g>
            )}
          </g>
        ))}

        {/* Customer journey path */}
        <motion.path
          d="M 40 222 Q 220 198 420 208 Q 620 218 820 208 Q 1040 200 1240 215 Q 1380 222 1480 215"
          fill="none"
          stroke={amber}
          strokeWidth="1.6"
          strokeDasharray="6 7"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.85 }}
          viewport={{ once: true }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
