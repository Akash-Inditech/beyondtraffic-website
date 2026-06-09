import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, HelpCircle, Calculator, Sparkles } from "lucide-react";
import { Link } from "react-router";
import {
  type Lens,
  LENS_INFO,
  lookupCoverage,
} from "../data/td2000g2Coverage";

/**
 * Plan-your-deployment calculator for the TD2000G2 people-counting sensor.
 *
 * Coverage figures come straight from the manufacturer's TD2000G2 coverage
 * spec (see ../data/td2000g2Coverage). The visitor picks a lens and enters the
 * mounting height + entrance width; we look up the real floor coverage and
 * estimate how many sensors the entrance needs. Final layout is confirmed
 * during the on-site survey (Book Demo).
 */

type Estimate = {
  /** Coverage width per sensor at the floor (m). */
  coverageWidth: number;
  /** Coverage depth per sensor at the floor (m). */
  coverageDepth: number;
  /** Floor area covered per sensor (m²). */
  areaPerDevice: number;
  /** Sensors needed to span the entrance width. */
  sensorsNeeded: number;
  /** Mounting height actually used after clamping to the lens range. */
  usedHeight: number;
  /** Whether the entered height was within the lens's valid range. */
  inRange: boolean;
};

function computeEstimate(
  lens: Lens,
  mountingHeight: number,
  entranceWidth: number,
): Estimate {
  const { width, depth, usedHeight, inRange } = lookupCoverage(
    lens,
    mountingHeight,
  );
  const safeWidth = Math.max(0.5, Math.min(entranceWidth, 100));
  const sensorsNeeded = Math.max(1, Math.ceil(safeWidth / width));

  return {
    coverageWidth: width,
    coverageDepth: depth,
    areaPerDevice: width * depth,
    sensorsNeeded,
    usedHeight,
    inRange,
  };
}

const LENS_OPTIONS: Lens[] = ["2mm", "8mm"];

export function DeviceEstimator() {
  const [lens, setLens] = useState<Lens>("2mm");
  const [mountingHeight, setMountingHeight] = useState(3.5);
  const [entranceWidth, setEntranceWidth] = useState(5);
  const [calculated, setCalculated] = useState(false);

  const lensInfo = LENS_INFO[lens];

  const estimate = useMemo(
    () => computeEstimate(lens, mountingHeight, entranceWidth),
    [lens, mountingHeight, entranceWidth],
  );

  // Switching lens clamps the height into the new lens's supported range.
  const onLensChange = (next: Lens) => {
    setLens(next);
    const info = LENS_INFO[next];
    setMountingHeight((h) =>
      Math.max(info.minHeight, Math.min(h, info.maxHeight)),
    );
  };

  return (
    <section
      id="estimator"
      className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-yellow-50/40 to-white overflow-hidden scroll-mt-24"
    >
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-yellow-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4 }}
            className="inline-block mb-4"
          >
            <span className="stori-label">Estimator</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] md:leading-[1.1] mb-4 md:mb-5">
            <span className="block text-gray-900 pb-1">Plan your deployment in</span>
            <span className="block stori-gradient pb-2">under 30 seconds.</span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            Pick a TD2000G2 lens and enter your ceiling height and entrance
            width. We&apos;ll show the real sensor coverage and how many units
            you&apos;d need. Final layout is confirmed during the on-site survey.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 md:gap-8 items-stretch">
          {/* ─────────── INPUT FORM ─────────── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-5 bg-white border border-yellow-200/70 rounded-3xl p-6 md:p-8 shadow-md shadow-yellow-200/40"
          >
            <div className="flex items-center gap-3 mb-5 md:mb-6">
              <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center shadow-md shadow-yellow-500/30">
                <Calculator className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.18em] text-amber-700">
                  TD2000G2 Estimator
                </p>
                <h3 className="text-lg md:text-xl font-black text-gray-900 leading-tight">
                  Configure your entrance
                </h3>
              </div>
            </div>

            <div className="space-y-5">
              <Field label="Lens" hint="Wide-angle for low ceilings; long-range for high ceilings.">
                <div className="grid grid-cols-2 gap-2">
                  {LENS_OPTIONS.map((opt) => {
                    const info = LENS_INFO[opt];
                    const active = opt === lens;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => onLensChange(opt)}
                        className={`text-left rounded-xl border px-3.5 py-3 transition ${
                          active
                            ? "border-amber-400 bg-amber-50 ring-2 ring-yellow-400/40"
                            : "border-gray-200 bg-white hover:border-amber-300"
                        }`}
                      >
                        <span className="block text-sm font-black text-gray-900">
                          {info.label}
                        </span>
                        <span className="block text-[11px] text-gray-500 leading-snug mt-0.5">
                          {info.minHeight}–{info.maxHeight} m
                        </span>
                      </button>
                    );
                  })}
                </div>
                <p className="mt-2 text-[11px] text-gray-500 leading-snug">
                  {lensInfo.blurb}
                </p>
              </Field>

              <Field
                label="Mounting Height (metres)"
                hint={`Valid range for this lens: ${lensInfo.minHeight}–${lensInfo.maxHeight} m.`}
              >
                <input
                  type="number"
                  step={0.1}
                  min={lensInfo.minHeight}
                  max={lensInfo.maxHeight}
                  value={mountingHeight}
                  onChange={(e) =>
                    setMountingHeight(parseFloat(e.target.value) || 0)
                  }
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-base font-semibold tabular-nums focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition"
                />
              </Field>

              <Field
                label="Entrance Width (metres)"
                hint="Width of the doorway or counted zone."
              >
                <input
                  type="number"
                  step={0.5}
                  min={0.5}
                  max={100}
                  value={entranceWidth}
                  onChange={(e) =>
                    setEntranceWidth(parseFloat(e.target.value) || 0)
                  }
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-base font-semibold tabular-nums focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition"
                />
              </Field>

              <motion.button
                type="button"
                onClick={() => setCalculated(true)}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="w-full bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-500 text-white px-6 py-3.5 rounded-full font-bold text-base shadow-lg shadow-yellow-500/40 hover:shadow-yellow-500/60 transition-shadow flex items-center justify-center gap-2"
              >
                Calculate
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>

          {/* ─────────── RESULTS ─────────── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="h-full rounded-3xl bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-6 md:p-8 shadow-2xl shadow-yellow-300/20 overflow-hidden relative">
              <div className="absolute -top-16 -right-16 w-64 h-64 bg-yellow-500/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-5 md:mb-6">
                  <div>
                    <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.22em] text-yellow-300/90">
                      Your estimate
                    </p>
                    <h3 className="text-xl md:text-2xl font-black leading-tight mt-1">
                      TD2000G2 · {lensInfo.label}
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[10px] md:text-xs font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-300 border border-emerald-400/30 rounded-full px-2.5 py-1">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70 animate-ping" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    </span>
                    {calculated ? "Calculated" : "Live preview"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 md:gap-4 mb-5 md:mb-6">
                  <ResultTile
                    label="Sensors needed"
                    value={`${estimate.sensorsNeeded}`}
                    sub={`for the ${entranceWidth} m entrance`}
                    highlight
                  />
                  <ResultTile
                    label="Coverage width / sensor"
                    value={`${estimate.coverageWidth.toFixed(1)} m`}
                    sub={`at ${estimate.usedHeight.toFixed(1)} m mounting`}
                  />
                  <ResultTile
                    label="Coverage depth / sensor"
                    value={`${estimate.coverageDepth.toFixed(1)} m`}
                    sub="along the walking path"
                  />
                  <ResultTile
                    label="Floor area / sensor"
                    value={`${estimate.areaPerDevice.toFixed(1)} m²`}
                    sub="counting footprint"
                  />
                </div>

                {!estimate.inRange && (
                  <div className="bg-amber-500/10 border border-amber-400/30 rounded-2xl px-4 py-3 mb-4">
                    <p className="text-[12px] md:text-sm text-amber-200 leading-relaxed">
                      The {lensInfo.label} lens supports{" "}
                      {lensInfo.minHeight}–{lensInfo.maxHeight} m mounting
                      heights. We&apos;ve used the closest in-range value
                      ({estimate.usedHeight.toFixed(1)} m) — switch lens for
                      heights outside this range.
                    </p>
                  </div>
                )}

                <p className="text-[11px] md:text-xs text-gray-400 leading-relaxed mb-5">
                  <span className="font-bold text-gray-200">
                    Coverage from the TD2000G2 spec.
                  </span>{" "}
                  Figures are single-sensor floor coverage at the chosen
                  mounting height. Real layouts account for entrance shape,
                  overlap/merge spacing, lighting, and mounting constraints —
                  confirmed during the on-site survey.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/contact"
                    className="bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 px-5 py-3 md:px-6 md:py-3.5 rounded-full font-black text-sm md:text-base shadow-lg hover:shadow-xl transition-shadow inline-flex items-center gap-2"
                  >
                    Get an exact quote
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/contact"
                    className="bg-white/10 backdrop-blur-sm text-white border border-white/30 px-5 py-3 md:px-6 md:py-3.5 rounded-full font-bold text-sm md:text-base hover:bg-white/20 transition-colors inline-flex items-center gap-2"
                  >
                    Talk to sales
                    <Sparkles className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────  PIECES  ────────────────────────────── */

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs md:text-sm font-bold text-gray-800 mb-1.5">
        {label}
        {hint && (
          <span title={hint} className="text-gray-400 hover:text-amber-600 transition-colors cursor-help">
            <HelpCircle className="w-3.5 h-3.5" />
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

function ResultTile({
  label,
  value,
  sub,
  highlight,
}: {
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl px-4 py-4 md:py-5 ${
        highlight
          ? "bg-gradient-to-br from-yellow-400/20 to-amber-500/15 border border-yellow-300/40"
          : "bg-white/5 border border-white/10"
      }`}
    >
      <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-gray-400 leading-tight mb-1">
        {label}
      </p>
      <p
        className={`text-2xl md:text-3xl font-black tabular-nums leading-none ${
          highlight ? "text-yellow-300" : "text-white"
        }`}
      >
        {value}
      </p>
      {sub && (
        <p className="mt-1.5 text-[11px] text-gray-400 leading-tight">{sub}</p>
      )}
    </div>
  );
}
