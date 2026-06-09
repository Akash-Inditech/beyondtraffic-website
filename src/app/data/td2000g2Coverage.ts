/**
 * TD2000G2 people-counting sensor — coverage footprint by mounting height.
 *
 * Source: TD2000G2_Coverage_v1.31 (manufacturer spec, primary coverage sheet).
 * Each entry is [coverageWidth_m, coverageHeight_m] measured at the floor for
 * the given mounting height, in 0.1 m steps. Two lens options:
 *   - 2 mm wide-angle : valid 2.2–8.0 m mounting height (low / standard ceilings)
 *   - 8 mm long-range : valid 5.0–18.0 m mounting height (high ceilings)
 *
 * Multi-sensor "merge distance" tiling figures from the spec are not modelled
 * here — this drives a single-sensor coverage + headcount estimate only.
 */

export type Lens = "2mm" | "8mm";

type CoverageTable = {
  /** Lowest supported mounting height (m). */
  minHeight: number;
  /** Highest supported mounting height (m). */
  maxHeight: number;
  /** Row spacing in metres. */
  step: number;
  /** [coverageWidth_m, coverageHeight_m] starting at minHeight. */
  data: [number, number][];
};

export const TD2000G2_COVERAGE: Record<Lens, CoverageTable> = {
  "2mm": {
    minHeight: 2.2,
    maxHeight: 8.0,
    step: 0.1,
    data: [
      [1.7, 0.8], [2.0, 1.0], [2.4, 1.2], [2.8, 1.3], [3.2, 1.5], [3.5, 1.7],
      [3.9, 1.9], [4.3, 2.1], [4.7, 2.2], [5.0, 2.4], [5.4, 2.6], [5.8, 2.8],
      [6.1, 2.9], [6.2, 3.1], [6.3, 3.3], [6.4, 3.5], [6.5, 3.6], [6.5, 3.7],
      [6.6, 3.7], [6.6, 3.7], [6.7, 3.8], [6.7, 3.8], [6.8, 3.8], [6.8, 3.8],
      [6.9, 3.9], [6.9, 3.9], [6.9, 3.9], [7.0, 3.9], [7.0, 3.9], [7.0, 4.0],
      [7.1, 4.0], [7.1, 4.0], [7.1, 4.0], [7.1, 4.0], [7.2, 4.0], [7.2, 4.0],
      [7.2, 4.1], [7.2, 4.1], [7.3, 4.1], [7.3, 4.1], [7.3, 4.1], [7.3, 4.1],
      [7.3, 4.1], [7.3, 4.1], [7.4, 4.1], [7.4, 4.1], [7.4, 4.2], [7.4, 4.2],
      [7.4, 4.2], [7.4, 4.2], [7.4, 4.2], [7.5, 4.2], [7.5, 4.2], [7.5, 4.2],
      [7.5, 4.2], [7.5, 4.2], [7.5, 4.2], [7.5, 4.2], [7.5, 4.2],
    ],
  },
  "8mm": {
    minHeight: 5.0,
    maxHeight: 18.0,
    step: 0.1,
    data: [
      [2.3, 1.3], [2.4, 1.4], [2.5, 1.4], [2.6, 1.4], [2.6, 1.5], [2.7, 1.5],
      [2.8, 1.6], [2.8, 1.6], [2.9, 1.6], [3.0, 1.7], [3.1, 1.7], [3.1, 1.8],
      [3.2, 1.8], [3.3, 1.8], [3.4, 1.9], [3.4, 1.9], [3.5, 2.0], [3.6, 2.0],
      [3.6, 2.1], [3.7, 2.1], [3.8, 2.1], [3.9, 2.2], [3.9, 2.2], [4.0, 2.3],
      [4.1, 2.3], [4.1, 2.3], [4.2, 2.4], [4.3, 2.4], [4.4, 2.5], [4.4, 2.5],
      [4.5, 2.5], [4.6, 2.6], [4.6, 2.6], [4.7, 2.7], [4.8, 2.7], [4.9, 2.7],
      [4.9, 2.8], [5.0, 2.8], [5.1, 2.9], [5.2, 2.9], [5.2, 2.9], [5.3, 3.0],
      [5.4, 3.0], [5.4, 3.1], [5.5, 3.1], [5.6, 3.1], [5.7, 3.2], [5.7, 3.2],
      [5.8, 3.3], [5.9, 3.3], [5.9, 3.3], [6.0, 3.4], [6.1, 3.4], [6.2, 3.5],
      [6.2, 3.5], [6.3, 3.5], [6.4, 3.6], [6.4, 3.6], [6.5, 3.7], [6.6, 3.7],
      [6.7, 3.8], [6.7, 3.8], [6.8, 3.8], [6.9, 3.9], [7.0, 3.9], [7.0, 4.0],
      [7.1, 4.0], [7.2, 4.0], [7.2, 4.1], [7.3, 4.1], [7.4, 4.2], [7.5, 4.2],
      [7.5, 4.2], [7.6, 4.3], [7.7, 4.3], [7.7, 4.4], [7.8, 4.4], [7.9, 4.4],
      [7.9, 4.5], [7.9, 4.5], [7.9, 4.5], [7.9, 4.5], [7.9, 4.5], [7.9, 4.5],
      [7.9, 4.5], [7.9, 4.5], [7.9, 4.5], [7.9, 4.5], [7.9, 4.5], [8.0, 4.5],
      [8.0, 4.5], [8.0, 4.5], [8.0, 4.5], [8.0, 4.5], [8.0, 4.5], [8.0, 4.5],
      [8.0, 4.5], [8.0, 4.5], [8.0, 4.5], [8.0, 4.5], [8.0, 4.5], [8.0, 4.5],
      [8.0, 4.5], [8.0, 4.5], [8.0, 4.5], [8.0, 4.5], [8.0, 4.5], [8.0, 4.5],
      [8.0, 4.5], [8.0, 4.5], [8.0, 4.5], [8.0, 4.5], [8.0, 4.5], [8.0, 4.5],
      [8.0, 4.5], [8.0, 4.5], [8.0, 4.5], [8.0, 4.5], [8.0, 4.5], [8.0, 4.5],
      [8.0, 4.5], [8.0, 4.5], [8.0, 4.5], [8.0, 4.5], [8.0, 4.5], [8.0, 4.5],
      [8.0, 4.5], [8.0, 4.5], [8.0, 4.5], [8.0, 4.5], [8.0, 4.5],
    ],
  },
};

export const LENS_INFO: Record<
  Lens,
  { label: string; blurb: string; minHeight: number; maxHeight: number }
> = {
  "2mm": {
    label: "2 mm wide-angle",
    blurb: "Low & standard ceilings (2.2–8 m). Widest floor coverage per unit.",
    minHeight: 2.2,
    maxHeight: 8.0,
  },
  "8mm": {
    label: "8 mm long-range",
    blurb: "High ceilings (5–18 m). For warehouses, malls & atriums.",
    minHeight: 5.0,
    maxHeight: 18.0,
  },
};

export type CoverageResult = {
  /** Coverage width at floor (m). */
  width: number;
  /** Coverage depth/height at floor (m). */
  depth: number;
  /** Height actually used after clamping to the lens range. */
  usedHeight: number;
  /** False when the requested height fell outside the lens's valid range. */
  inRange: boolean;
};

/** Look up the TD2000G2 floor coverage for a lens at a given mounting height. */
export function lookupCoverage(lens: Lens, height: number): CoverageResult {
  const t = TD2000G2_COVERAGE[lens];
  const usedHeight = Math.max(t.minHeight, Math.min(height, t.maxHeight));
  const idx = Math.round((usedHeight - t.minHeight) / t.step);
  const safeIdx = Math.max(0, Math.min(idx, t.data.length - 1));
  const [width, depth] = t.data[safeIdx];
  return {
    width,
    depth,
    usedHeight,
    inRange: height >= t.minHeight && height <= t.maxHeight,
  };
}
