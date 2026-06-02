import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, HelpCircle, Calculator, Sparkles } from "lucide-react";
import { Link } from "react-router";

/**
 * Plan-your-deployment calculator.
 *
 * Takes a mounting height, entrance width, and sensor model and produces a
 * rough sizing + price estimate that the prospect can use to start a sales
 * conversation. The numbers are intentionally rounded — the proposal step
 * (Book Demo) tunes them on-site.
 */

type Product = {
  id: string;
  name: string;
  fov: number; // total field of view, degrees
  /** Effective entrance-counting coverage as a multiplier of mounting height (m per metre). */
  entranceCoverageK: number;
  /** Effective in-store analytics coverage radius as a multiplier of mounting height. */
  areaCoverageK: number;
  /** One-time hardware cost in AED. */
  unitPriceAed: number;
  /** Per-device per-month subscription in AED. */
  monthlyPerDeviceAed: number;
  recommended?: boolean;
};

const PRODUCTS: Product[] = [
  {
    id: "bt-3d-pro-160",
    name: "BT 3D Pro 160° (Preferred)",
    fov: 160,
    entranceCoverageK: 1.7,
    areaCoverageK: 1.55,
    unitPriceAed: 2500,
    monthlyPerDeviceAed: 89,
    recommended: true,
  },
  {
    id: "bt-3d-std-120",
    name: "BT 3D Standard 120°",
    fov: 120,
    entranceCoverageK: 1.15,
    areaCoverageK: 1.05,
    unitPriceAed: 1800,
    monthlyPerDeviceAed: 79,
  },
  {
    id: "bt-compact-95",
    name: "BT Compact 95°",
    fov: 95,
    entranceCoverageK: 0.85,
    areaCoverageK: 0.78,
    unitPriceAed: 1400,
    monthlyPerDeviceAed: 69,
  },
];

const SETUP_PER_DEVICE_AED = 250;

type Estimate = {
  entranceUnits: number;
  entranceCoveragePerDevice: number;
  areaPerDevice: number;
  hardware: number;
  setup: number;
  monthly: number;
  yearly: number;
};

function computeEstimate(
  mountingHeight: number,
  entranceWidth: number,
  product: Product,
): Estimate {
  const safeHeight = Math.max(2, Math.min(mountingHeight, 6));
  const safeWidth = Math.max(0.5, Math.min(entranceWidth, 40));

  const entranceCoveragePerDevice = product.entranceCoverageK * safeHeight;
  const entranceUnits = Math.max(
    1,
    Math.ceil(safeWidth / entranceCoveragePerDevice),
  );

  const areaRadius = product.areaCoverageK * safeHeight;
  const areaPerDevice = Math.PI * areaRadius * areaRadius;

  const hardware = entranceUnits * product.unitPriceAed;
  const setup = entranceUnits * SETUP_PER_DEVICE_AED;
  const monthly = entranceUnits * product.monthlyPerDeviceAed;
  const yearly = monthly * 12;

  return {
    entranceUnits,
    entranceCoveragePerDevice,
    areaPerDevice,
    hardware,
    setup,
    monthly,
    yearly,
  };
}

const formatAed = (v: number) =>
  `AED ${v.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

export function DeviceEstimator() {
  const [mountingHeight, setMountingHeight] = useState(3.5);
  const [entranceWidth, setEntranceWidth] = useState(5);
  const [productId, setProductId] = useState(PRODUCTS[0].id);
  const [calculated, setCalculated] = useState(false);

  const product = useMemo(
    () => PRODUCTS.find((p) => p.id === productId) ?? PRODUCTS[0],
    [productId],
  );

  const estimate = useMemo(
    () => computeEstimate(mountingHeight, entranceWidth, product),
    [mountingHeight, entranceWidth, product],
  );

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
            Tell us your entrance dimensions and we&apos;ll estimate the
            sensors required and what your monthly subscription would look
            like. Final pricing is tuned during the on-site survey.
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
                  Device Estimator
                </p>
                <h3 className="text-lg md:text-xl font-black text-gray-900 leading-tight">
                  Configure your entrance
                </h3>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              Enter the mounting height and entrance width. We&apos;ll estimate:
            </p>
            <ul className="mb-6 space-y-2 text-sm">
              <li className="flex items-start gap-2 text-gray-700">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                <span>
                  <span className="font-bold text-gray-900">Entrance counting</span> &mdash;
                  sized to the door width.
                </span>
              </li>
              <li className="flex items-start gap-2 text-gray-700">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                <span>
                  <span className="font-bold text-gray-900">In-store analytics</span> &mdash;
                  coverage area per sensor.
                </span>
              </li>
            </ul>

            <div className="space-y-5">
              <Field
                label="Mounting Height (metres)"
                hint="Typical ceiling height is 2.5–4 m. Min 2, max 6."
              >
                <input
                  type="number"
                  step={0.1}
                  min={2}
                  max={6}
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
                  max={40}
                  value={entranceWidth}
                  onChange={(e) =>
                    setEntranceWidth(parseFloat(e.target.value) || 0)
                  }
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-base font-semibold tabular-nums focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition"
                />
              </Field>

              <Field label="Product Type" hint="Wider FOV covers more per device.">
                <select
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition appearance-none cursor-pointer"
                >
                  {PRODUCTS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
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
                      {product.name}
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
                    value={`${estimate.entranceUnits}`}
                    sub={`for the ${entranceWidth} m entrance`}
                    highlight
                  />
                  <ResultTile
                    label="Coverage / sensor"
                    value={`${estimate.entranceCoveragePerDevice.toFixed(1)} m`}
                    sub="entrance width"
                  />
                  <ResultTile
                    label="In-store area / sensor"
                    value={`${estimate.areaPerDevice.toFixed(0)} m²`}
                    sub="effective analytics zone"
                  />
                  <ResultTile
                    label="Field of view"
                    value={`${product.fov}°`}
                    sub="total horizontal FOV"
                  />
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 md:p-5 mb-4">
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <LineItem
                      label={`Hardware × ${estimate.entranceUnits}`}
                      value={formatAed(estimate.hardware)}
                    />
                    <LineItem
                      label="Installation"
                      value={formatAed(estimate.setup)}
                    />
                    <LineItem
                      label="Monthly subscription"
                      value={formatAed(estimate.monthly)}
                      strong
                    />
                    <LineItem
                      label="Annual subscription"
                      value={formatAed(estimate.yearly)}
                    />
                  </div>
                </div>

                <p className="text-[11px] md:text-xs text-gray-400 leading-relaxed mb-5">
                  <span className="font-bold text-gray-200">Estimate only.</span>{" "}
                  Final pricing depends on entrance layout, light conditions,
                  network setup, and contract length. Multi-site, multi-year, and
                  enterprise volume discounts are not reflected above.
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
                    to="/pricing"
                    className="bg-white/10 backdrop-blur-sm text-white border border-white/30 px-5 py-3 md:px-6 md:py-3.5 rounded-full font-bold text-sm md:text-base hover:bg-white/20 transition-colors inline-flex items-center gap-2"
                  >
                    See full pricing
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
      {hint && (
        <p className="mt-1.5 text-[11px] text-gray-500 leading-snug">{hint}</p>
      )}
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

function LineItem({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div>
      <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-gray-400 leading-tight mb-1">
        {label}
      </p>
      <p
        className={`tabular-nums leading-none ${
          strong
            ? "text-lg md:text-xl font-black text-yellow-300"
            : "text-base md:text-lg font-bold text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
