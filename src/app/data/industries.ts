import {
  Shirt,
  Building2,
  Gem,
  UtensilsCrossed,
  Plane,
  type LucideIcon,
} from "lucide-react";

export type IndustryKpi = {
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "flat";
  caption?: string;
};

export type IndustryScenario = {
  title: string;
  description: string;
};

export type IndustryChart = {
  id: string;
  title: string;
  subtitle: string;
  type: "area" | "bar" | "line";
  unit?: string;
  data: { label: string; value: number; value2?: number }[];
  series?: { key: "value" | "value2"; label: string; color: string }[];
};

export type Industry = {
  slug: string;
  name: string;
  shortName: string;
  icon: LucideIcon;
  accent: {
    /** Tailwind classes for the hero/CTA gradient — e.g. "from-yellow-500 to-amber-600" */
    grad: string;
    /** Tailwind text class for the accent color — e.g. "text-yellow-600" */
    text: string;
    /** Tailwind bg class for a tinted background — e.g. "bg-yellow-50" */
    softBg: string;
    /** Chart color (hex) */
    chart: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    highlight: string;
    subhead: string;
    stats: { value: string; label: string }[];
  };
  /** Live-style hero panel content (right column of the hero) */
  live: {
    sceneName: string;
    primary: { value: string; label: string };
    delta: { value: string; trend: "up" | "down" | "flat" };
    sparkline: number[];
    miniStats: { value: string; label: string }[];
  };
  intro: string;
  kpis: IndustryKpi[];
  charts: IndustryChart[];
  scenarios: IndustryScenario[];
  cta: {
    title: string;
    description: string;
  };
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "fashion-apparel",
    name: "Fashion & Apparel",
    shortName: "Fashion",
    icon: Shirt,
    accent: {
      grad: "from-pink-500 to-rose-600",
      text: "text-pink-600",
      softBg: "bg-pink-50",
      chart: "#EC4899",
    },
    hero: {
      eyebrow: "Industry · Fashion & Apparel",
      headline: "Turn window shoppers into",
      highlight: "loyal buyers.",
      subhead:
        "Measure capture rate, dwell time, and fitting-room conversion across every store. Know exactly when to add staff and which displays earn their floor space.",
      stats: [
        { value: "+24%", label: "Avg. capture lift" },
        { value: "95%", label: "Counting accuracy" },
        { value: "40+", label: "UAE stores live" },
      ],
    },
    live: {
      sceneName: "All Stores · Live",
      primary: { value: "1,284", label: "Walk-ins today" },
      delta: { value: "+18.2%", trend: "up" },
      sparkline: [28, 46, 84, 102, 96, 118, 134, 162, 186, 173, 142, 98],
      miniStats: [
        { value: "27.8%", label: "Conv. rate" },
        { value: "8m 42s", label: "Avg. dwell" },
        { value: "61%", label: "Fit-room conv." },
      ],
    },
    intro:
      "Fashion retail is won at the window and the fitting room. Beyond Traffic helps apparel brands attribute traffic to display performance, measure how long shoppers actually engage, and track conversion at the moments that matter — fitting room visits, queue length at checkout, and time-of-day staffing.",
    kpis: [
      { label: "Capture rate", value: "32.4%", change: "+4.1 pts", trend: "up", caption: "Window passers entering store" },
      { label: "Avg. dwell time", value: "8m 42s", change: "+1m 12s", trend: "up", caption: "Time spent in-store" },
      { label: "Fitting-room conversion", value: "61%", change: "+6%", trend: "up", caption: "Trial → purchase" },
      { label: "Sales conversion", value: "27.8%", change: "+3.2 pts", trend: "up", caption: "Walk-ins → buyers" },
      { label: "Staff utilisation", value: "1 : 14", change: "Balanced", trend: "flat", caption: "Staff to active shopper" },
      { label: "Peak hour load", value: "186 / hr", change: "Sat 18:00", trend: "up", caption: "Highest hourly footfall" },
    ],
    charts: [
      {
        id: "hourly-footfall",
        title: "Hourly footfall vs. capture",
        subtitle: "Today · all UAE stores",
        type: "area",
        unit: "visitors",
        data: [
          { label: "10a", value: 28, value2: 11 },
          { label: "11a", value: 46, value2: 17 },
          { label: "12p", value: 84, value2: 28 },
          { label: "1p", value: 102, value2: 36 },
          { label: "2p", value: 96, value2: 33 },
          { label: "3p", value: 118, value2: 41 },
          { label: "4p", value: 134, value2: 47 },
          { label: "5p", value: 162, value2: 58 },
          { label: "6p", value: 186, value2: 71 },
          { label: "7p", value: 173, value2: 64 },
          { label: "8p", value: 142, value2: 49 },
          { label: "9p", value: 98, value2: 32 },
        ],
        series: [
          { key: "value", label: "Walk-ins", color: "#EC4899" },
          { key: "value2", label: "Purchases", color: "#A855F7" },
        ],
      },
      {
        id: "fitting-room",
        title: "Fitting-room queue length",
        subtitle: "Average wait, last 7 days",
        type: "bar",
        unit: "min",
        data: [
          { label: "Mon", value: 2.1 },
          { label: "Tue", value: 1.8 },
          { label: "Wed", value: 2.4 },
          { label: "Thu", value: 3.2 },
          { label: "Fri", value: 5.6 },
          { label: "Sat", value: 6.8 },
          { label: "Sun", value: 4.4 },
        ],
      },
      {
        id: "conversion-funnel",
        title: "Conversion funnel",
        subtitle: "Window → walk-in → trial → buyer",
        type: "bar",
        unit: "%",
        data: [
          { label: "Passers", value: 100 },
          { label: "Walk-ins", value: 32 },
          { label: "Engaged", value: 21 },
          { label: "Tried on", value: 13 },
          { label: "Bought", value: 9 },
        ],
      },
    ],
    scenarios: [
      {
        title: "Window display ROI",
        description: "Attribute capture lift to specific window changes so visual merchandising decisions are backed by data.",
      },
      {
        title: "Peak-hour staffing alerts",
        description: "Get a notification 20 minutes before the next peak so floor leads can reposition staff to the busiest zones.",
      },
      {
        title: "Fitting-room intelligence",
        description: "Detect when fitting rooms queue beyond a threshold and route staff to assist with sizes, reducing abandonment.",
      },
      {
        title: "Collection engagement",
        description: "Compare dwell time across collections to know which lines are pulling weight on the floor.",
      },
    ],
    cta: {
      title: "Built for apparel teams who measure every square metre.",
      description:
        "See how Beyond Traffic turns your store footprint into a daily P&L — capture rate, dwell, conversion, and staffing — across every UAE location.",
    },
  },

  {
    slug: "shopping-malls",
    name: "Shopping Malls",
    shortName: "Malls",
    icon: Building2,
    accent: {
      grad: "from-yellow-500 to-amber-600",
      text: "text-amber-600",
      softBg: "bg-amber-50",
      chart: "#F59E0B",
    },
    hero: {
      eyebrow: "Industry · Shopping Malls",
      headline: "Every tenant. Every entrance.",
      highlight: "One mall-wide view.",
      subhead:
        "Track footfall by entrance, zone, anchor store and food court. Benchmark tenant performance, justify rent reviews, and optimise common-area programming with data the mall ops team trusts.",
      stats: [
        { value: "3D", label: "Multi-zone tracking" },
        { value: "12+", label: "Mall deployments" },
        { value: "95%", label: "Anchor capture accuracy" },
      ],
    },
    live: {
      sceneName: "Mall-Wide · Live",
      primary: { value: "48,712", label: "Visitors today" },
      delta: { value: "+9.4%", trend: "up" },
      sparkline: [1240, 2380, 3920, 4810, 4220, 4640, 5180, 5740, 6320, 5810, 4720, 3140, 1860],
      miniStats: [
        { value: "41.2%", label: "Anchor capture" },
        { value: "1h 18m", label: "Avg. dwell" },
        { value: "85", label: "Tenants live" },
      ],
    },
    intro:
      "Mall operators need to know more than total footfall. Beyond Traffic gives mall management granular visibility into entrance flow, anchor-store capture, food-court occupancy, and zone-level dwell — the data points that drive tenant negotiations, leasing decisions, and common-area programming.",
    kpis: [
      { label: "Today's footfall", value: "48,712", change: "+9.4%", trend: "up", caption: "vs. last Friday" },
      { label: "Anchor capture", value: "41.2%", change: "+2.6 pts", trend: "up", caption: "Mall visitors → anchor" },
      { label: "Avg. mall dwell", value: "1h 18m", change: "+8m", trend: "up", caption: "Per visitor" },
      { label: "Food court peak", value: "92%", change: "Sat 13:30", trend: "up", caption: "Seat occupancy" },
      { label: "Tenant variance", value: "±34%", change: "Top vs bottom", trend: "flat", caption: "Conversion spread" },
      { label: "Weekend lift", value: "+62%", change: "vs weekday", trend: "up", caption: "Footfall increase" },
    ],
    charts: [
      {
        id: "mall-hourly",
        title: "Mall-wide hourly footfall",
        subtitle: "All entrances · today",
        type: "area",
        unit: "visitors",
        data: [
          { label: "10a", value: 1240 },
          { label: "11a", value: 2380 },
          { label: "12p", value: 3920 },
          { label: "1p", value: 4810 },
          { label: "2p", value: 4220 },
          { label: "3p", value: 4640 },
          { label: "4p", value: 5180 },
          { label: "5p", value: 5740 },
          { label: "6p", value: 6320 },
          { label: "7p", value: 5810 },
          { label: "8p", value: 4720 },
          { label: "9p", value: 3140 },
          { label: "10p", value: 1860 },
        ],
      },
      {
        id: "tenant-compare",
        title: "Top tenants — capture rate",
        subtitle: "% of mall visitors entering",
        type: "bar",
        unit: "%",
        data: [
          { label: "Tenant A", value: 41 },
          { label: "Tenant B", value: 34 },
          { label: "Tenant C", value: 29 },
          { label: "Tenant D", value: 24 },
          { label: "Tenant E", value: 18 },
          { label: "Tenant F", value: 14 },
        ],
      },
      {
        id: "zone-dwell",
        title: "Dwell by zone",
        subtitle: "Average time spent, minutes",
        type: "bar",
        unit: "min",
        data: [
          { label: "Food Court", value: 38 },
          { label: "Anchor", value: 22 },
          { label: "Luxury", value: 17 },
          { label: "Fashion", value: 14 },
          { label: "Electronics", value: 12 },
          { label: "Kids", value: 24 },
        ],
      },
    ],
    scenarios: [
      {
        title: "Tenant performance dashboards",
        description: "Give each tenant a real-time view of how their store converts mall footfall — backed by independent third-party data.",
      },
      {
        title: "Rent review benchmarking",
        description: "Use 12-month footfall trends to anchor lease negotiations and justify rent positioning by zone.",
      },
      {
        title: "Common-area programming",
        description: "Decide where to place pop-ups, kiosks, and events based on actual dwell zones — not opinions.",
      },
      {
        title: "Crowd flow alerts",
        description: "Detect overcrowding in food courts, entrances or emergency egress paths and notify ops in real time.",
      },
    ],
    cta: {
      title: "From entrance counts to tenant insight — one mall, one platform.",
      description:
        "Built for the operations, leasing, and marketing teams running modern shopping centres in the UAE and the wider region.",
    },
  },

  {
    slug: "jewellery-luxury",
    name: "Jewellery & Luxury",
    shortName: "Luxury",
    icon: Gem,
    accent: {
      grad: "from-violet-500 to-purple-600",
      text: "text-violet-600",
      softBg: "bg-violet-50",
      chart: "#8B5CF6",
    },
    hero: {
      eyebrow: "Industry · Jewellery & Luxury",
      headline: "Every guest is high-intent.",
      highlight: "Treat them that way.",
      subhead:
        "Detect serious browsers from casual walk-ins, route VIPs to senior staff, and measure which displays actually convert. Built for boutiques where a single conversation is worth thousands.",
      stats: [
        { value: "100%", label: "Privacy-compliant" },
        { value: "<3s", label: "VIP detection" },
        { value: "95%", label: "Group identification" },
      ],
    },
    live: {
      sceneName: "Boutique · Live",
      primary: { value: "28", label: "Engaged consultations" },
      delta: { value: "+6", trend: "up" },
      sparkline: [12, 18, 24, 31, 28, 34, 41, 48, 52, 44, 32],
      miniStats: [
        { value: "47s", label: "Window dwell" },
        { value: "14m 22s", label: "Interaction" },
        { value: "1 : 3", label: "Staff : guest" },
      ],
    },
    intro:
      "In luxury retail, every interaction is high-stakes. Beyond Traffic helps boutique managers distinguish serious shoppers from window browsers, optimise staff-to-guest ratios, and surface which displays drive real engagement — all without storing any personally identifiable information.",
    kpis: [
      { label: "Window engagement", value: "47s", change: "+12s", trend: "up", caption: "Avg. window dwell" },
      { label: "Interaction time", value: "14m 22s", change: "+2m", trend: "up", caption: "In-store consultation" },
      { label: "Group visits", value: "38%", change: "+5 pts", trend: "up", caption: "Of total visits" },
      { label: "Repeat rate", value: "22%", change: "+3 pts", trend: "up", caption: "Returning within 30d" },
      { label: "Staff : guest", value: "1 : 3", change: "Within target", trend: "flat", caption: "Active staffing ratio" },
      { label: "Conversion", value: "18.4%", change: "+2.1 pts", trend: "up", caption: "High-net-worth segment" },
    ],
    charts: [
      {
        id: "engagement-by-display",
        title: "Engagement by display",
        subtitle: "Avg. dwell time per display, today",
        type: "bar",
        unit: "sec",
        data: [
          { label: "High Jewellery", value: 78 },
          { label: "Watches", value: 64 },
          { label: "Bridal", value: 92 },
          { label: "Gifting", value: 41 },
          { label: "Heritage", value: 56 },
          { label: "New In", value: 38 },
        ],
      },
      {
        id: "browser-segments",
        title: "Visitor segmentation",
        subtitle: "Window vs. engaged vs. consultation",
        type: "area",
        unit: "visitors",
        data: [
          { label: "10a", value: 12, value2: 4 },
          { label: "11a", value: 18, value2: 7 },
          { label: "12p", value: 24, value2: 11 },
          { label: "1p", value: 31, value2: 14 },
          { label: "2p", value: 28, value2: 12 },
          { label: "3p", value: 34, value2: 17 },
          { label: "4p", value: 41, value2: 22 },
          { label: "5p", value: 48, value2: 28 },
          { label: "6p", value: 52, value2: 31 },
          { label: "7p", value: 44, value2: 26 },
          { label: "8p", value: 32, value2: 18 },
        ],
        series: [
          { key: "value", label: "Window browsers", color: "#C4B5FD" },
          { key: "value2", label: "Engaged consultations", color: "#8B5CF6" },
        ],
      },
      {
        id: "staff-allocation",
        title: "Staff allocation vs. demand",
        subtitle: "Live staffing index by hour",
        type: "line",
        unit: "index",
        data: [
          { label: "10a", value: 60, value2: 55 },
          { label: "12p", value: 75, value2: 70 },
          { label: "2p", value: 82, value2: 78 },
          { label: "4p", value: 91, value2: 90 },
          { label: "6p", value: 95, value2: 96 },
          { label: "8p", value: 78, value2: 80 },
        ],
        series: [
          { key: "value", label: "Demand", color: "#8B5CF6" },
          { key: "value2", label: "Staffing", color: "#10B981" },
        ],
      },
    ],
    scenarios: [
      {
        title: "Serious browser detection",
        description: "Surface guests who linger at a display for 30+ seconds so senior staff can intervene with a personal consultation.",
      },
      {
        title: "VIP service alerts",
        description: "Identify repeat group visits and notify the floor manager to deliver a tailored, white-glove experience.",
      },
      {
        title: "Display performance",
        description: "Rank cabinets and vitrines by engagement so visual merchandising decisions are anchored in real data.",
      },
      {
        title: "Discreet security awareness",
        description: "Detect unusual crowd density or group patterns at high-value displays and notify security without disrupting guests.",
      },
    ],
    cta: {
      title: "Quiet, accurate intelligence for boutique retail.",
      description:
        "Beyond Traffic respects the discretion luxury demands — anonymous, on-device tracking with the precision your floor managers need.",
    },
  },

  {
    slug: "hospitality-fnb",
    name: "Hospitality & F&B",
    shortName: "Hospitality",
    icon: UtensilsCrossed,
    accent: {
      grad: "from-emerald-500 to-teal-600",
      text: "text-emerald-600",
      softBg: "bg-emerald-50",
      chart: "#10B981",
    },
    hero: {
      eyebrow: "Industry · Hospitality & F&B",
      headline: "Shorter queues. Faster tables.",
      highlight: "Happier guests.",
      subhead:
        "Real-time visibility into queue length, table turnover, and peak-hour occupancy across every venue. Built for restaurant groups, hotel F&B teams, and quick-service brands operating at scale.",
      stats: [
        { value: "-38%", label: "Avg. wait reduction" },
        { value: "+0.4", label: "Table turns / day" },
        { value: "24/7", label: "Venue monitoring" },
      ],
    },
    live: {
      sceneName: "All Venues · Live",
      primary: { value: "94%", label: "Peak occupancy now" },
      delta: { value: "Fri 20:00", trend: "up" },
      sparkline: [42, 78, 65, 38, 24, 32, 58, 86, 94, 89, 72, 48],
      miniStats: [
        { value: "9", label: "In queue" },
        { value: "6m 12s", label: "Avg. wait" },
        { value: "3.8x", label: "Table turns" },
      ],
    },
    intro:
      "F&B operations live and die by throughput. Beyond Traffic gives venue managers a live pulse on queue length, table turn-time, peak occupancy, and group size — so kitchens get prep-warnings, hosts seat guests faster, and ops teams staff every shift right.",
    kpis: [
      { label: "Live queue", value: "9 guests", change: "Manageable", trend: "flat", caption: "At entrance" },
      { label: "Avg. wait time", value: "6m 12s", change: "-1m 48s", trend: "down", caption: "vs. last week" },
      { label: "Table turnover", value: "3.8x", change: "+0.4", trend: "up", caption: "Daily turns" },
      { label: "Peak occupancy", value: "94%", change: "Fri 20:00", trend: "up", caption: "Saturation point" },
      { label: "Avg. group size", value: "2.7", change: "+0.2", trend: "up", caption: "Guests per cover" },
      { label: "Repeat guests", value: "31%", change: "+4 pts", trend: "up", caption: "Within 30 days" },
    ],
    charts: [
      {
        id: "seat-occupancy",
        title: "Hourly seat occupancy",
        subtitle: "Today vs. last week",
        type: "area",
        unit: "%",
        data: [
          { label: "12p", value: 42, value2: 38 },
          { label: "1p", value: 78, value2: 71 },
          { label: "2p", value: 65, value2: 60 },
          { label: "3p", value: 38, value2: 35 },
          { label: "4p", value: 24, value2: 22 },
          { label: "5p", value: 32, value2: 28 },
          { label: "6p", value: 58, value2: 51 },
          { label: "7p", value: 86, value2: 80 },
          { label: "8p", value: 94, value2: 88 },
          { label: "9p", value: 89, value2: 84 },
          { label: "10p", value: 72, value2: 68 },
          { label: "11p", value: 48, value2: 44 },
        ],
        series: [
          { key: "value", label: "Today", color: "#10B981" },
          { key: "value2", label: "Last week", color: "#9CA3AF" },
        ],
      },
      {
        id: "queue-trend",
        title: "Queue length — last 12 hours",
        subtitle: "Guests waiting at entrance",
        type: "line",
        unit: "guests",
        data: [
          { label: "12p", value: 4 },
          { label: "1p", value: 11 },
          { label: "2p", value: 7 },
          { label: "3p", value: 2 },
          { label: "4p", value: 1 },
          { label: "5p", value: 3 },
          { label: "6p", value: 8 },
          { label: "7p", value: 18 },
          { label: "8p", value: 24 },
          { label: "9p", value: 19 },
          { label: "10p", value: 9 },
          { label: "11p", value: 3 },
        ],
      },
      {
        id: "turn-time",
        title: "Table turn-time by section",
        subtitle: "Minutes from seat → bill",
        type: "bar",
        unit: "min",
        data: [
          { label: "Patio", value: 68 },
          { label: "Bar", value: 42 },
          { label: "Main", value: 74 },
          { label: "Booths", value: 81 },
          { label: "Private", value: 96 },
        ],
      },
    ],
    scenarios: [
      {
        title: "Queue-overflow alerts",
        description: "Notify the host stand when queue length crosses a threshold so kitchen prep ramps before service hits a wall.",
      },
      {
        title: "Live table turnover",
        description: "See which tables have been occupied longest and proactively offer dessert, the bill, or a follow-up to speed turns gracefully.",
      },
      {
        title: "Peak-hour staffing model",
        description: "Forecast each shift's headcount need from 30-day demand patterns — front-of-house, kitchen, and bar.",
      },
      {
        title: "Group-size optimisation",
        description: "Spot trends in party size to right-size table mixes and floor layout for what guests actually book.",
      },
    ],
    cta: {
      title: "Cut wait times. Lift covers. Keep guests coming back.",
      description:
        "Live operational intelligence for hotel F&B, restaurant groups, and quick-service brands — across every venue.",
    },
  },

  {
    slug: "airports",
    name: "Airports",
    shortName: "Airports",
    icon: Plane,
    accent: {
      grad: "from-blue-500 to-indigo-600",
      text: "text-blue-600",
      softBg: "bg-blue-50",
      chart: "#3B82F6",
    },
    hero: {
      eyebrow: "Industry · Airports",
      headline: "Move passengers faster.",
      highlight: "Spend smarter.",
      subhead:
        "Real-time passenger flow across security, check-in, gates, retail, and lounges. Built for airport operators, ground handlers, and concessionaires who need to predict throughput, not just measure it.",
      stats: [
        { value: "<60s", label: "Queue alert latency" },
        { value: "95%", label: "Counting accuracy" },
        { value: "T1–T3", label: "Multi-terminal ready" },
      ],
    },
    live: {
      sceneName: "Terminal 1 · Live",
      primary: { value: "2,840", label: "Pax / hour now" },
      delta: { value: "Peak", trend: "up" },
      sparkline: [1240, 2640, 2840, 2480, 2920, 3120, 2780, 1860],
      miniStats: [
        { value: "11 min", label: "SEC queue" },
        { value: "78%", label: "Gate occ." },
        { value: "34.6%", label: "Retail capture" },
      ],
    },
    intro:
      "Airports are throughput-constrained at every chokepoint. Beyond Traffic gives operations, security, retail, and lounge teams a unified view of passenger flow — security queue lengths, check-in dwell, gate-area occupancy, and concession capture — so resources move ahead of the wave, not behind it.",
    kpis: [
      { label: "Security queue", value: "11 min", change: "-3 min", trend: "down", caption: "Avg. wait at SEC-A" },
      { label: "Check-in dwell", value: "6 min", change: "Normal", trend: "flat", caption: "Across all rows" },
      { label: "Gate occupancy", value: "78%", change: "Within target", trend: "flat", caption: "Avg. gate area" },
      { label: "Retail capture", value: "34.6%", change: "+2.8 pts", trend: "up", caption: "Pax → concession" },
      { label: "Lounge dwell", value: "1h 22m", change: "+11m", trend: "up", caption: "Avg. lounge stay" },
      { label: "Pax flow rate", value: "2,840 /hr", change: "Peak now", trend: "up", caption: "Through SEC-A" },
    ],
    charts: [
      {
        id: "security-queue",
        title: "Security checkpoint queue — last 8 hours",
        subtitle: "SEC-A · live wait time",
        type: "area",
        unit: "min",
        data: [
          { label: "06a", value: 4 },
          { label: "07a", value: 9 },
          { label: "08a", value: 17 },
          { label: "09a", value: 22 },
          { label: "10a", value: 14 },
          { label: "11a", value: 8 },
          { label: "12p", value: 11 },
          { label: "1p", value: 19 },
          { label: "2p", value: 12 },
        ],
      },
      {
        id: "terminal-occupancy",
        title: "Terminal occupancy by zone",
        subtitle: "Live passenger density",
        type: "bar",
        unit: "%",
        data: [
          { label: "Check-in", value: 62 },
          { label: "Security", value: 84 },
          { label: "Duty Free", value: 71 },
          { label: "Gates A", value: 78 },
          { label: "Gates B", value: 56 },
          { label: "Lounges", value: 88 },
        ],
      },
      {
        id: "pax-flow",
        title: "Passenger flow vs. forecast",
        subtitle: "Today vs. 7-day model",
        type: "line",
        unit: "pax/hr",
        data: [
          { label: "06a", value: 1240, value2: 1180 },
          { label: "08a", value: 2640, value2: 2580 },
          { label: "10a", value: 2840, value2: 2710 },
          { label: "12p", value: 2480, value2: 2520 },
          { label: "2p", value: 2920, value2: 2840 },
          { label: "4p", value: 3120, value2: 3050 },
          { label: "6p", value: 2780, value2: 2820 },
          { label: "8p", value: 1860, value2: 1920 },
        ],
        series: [
          { key: "value", label: "Actual", color: "#3B82F6" },
          { key: "value2", label: "Forecast", color: "#94A3B8" },
        ],
      },
    ],
    scenarios: [
      {
        title: "Security lane scaling",
        description: "Detect rising queue length 15 minutes ahead and open additional lanes before passenger wait time crosses the SLA.",
      },
      {
        title: "Concession capture lift",
        description: "Show retailers exactly how many passengers pass their storefront vs. enter — by airline, time, and dwell.",
      },
      {
        title: "Gate area crowd alerts",
        description: "Notify ground handlers when a gate area exceeds safe density so boarding sequencing and seating can adapt.",
      },
      {
        title: "Lounge experience tuning",
        description: "Track dwell, occupancy, and turnover in premium lounges to balance capacity with member satisfaction.",
      },
    ],
    cta: {
      title: "From kerb to gate — one operational lens.",
      description:
        "Beyond Traffic is built to scale across terminals, multiple operators, and airport-grade reliability requirements.",
    },
  },
];

export function getIndustryBySlug(slug: string | undefined): Industry | undefined {
  if (!slug) return undefined;
  return INDUSTRIES.find((i) => i.slug === slug);
}
