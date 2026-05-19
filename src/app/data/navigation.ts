/**
 * Shared site navigation config — used by both the home-page header
 * (App.tsx) and the industry detail pages (IndustryDetailPage.tsx) so
 * the nav stays in sync without duplicating link lists.
 *
 * All hrefs are real paths now. Paths that point to a section on the
 * home page (e.g. "/hardware") are handled by routes in main.tsx that
 * render the App and let App's pathname-scroll effect bring the
 * matching `id` into view. This keeps URLs clean (/hardware) instead
 * of relying on URL hashes (#hardware).
 */

export type NavItem = { name: string; href: string };
export type NavDropdown = { label: string; items: NavItem[] };

/** Home-page section ids that have a corresponding clean URL route. */
export const SECTION_ROUTES = [
  "dashboard",
  "features",
  "mall-analytics",
  "analytics",
  "hardware",
  "integrations",
  "industries",
  "pricing",
  "testimonials",
  "faq",
  "contact",
] as const;

export const NAV_DROPDOWNS: NavDropdown[] = [
  {
    label: "Platform",
    items: [
      { name: "Live Dashboard", href: "/dashboard" },
      { name: "Key Features", href: "/features" },
      { name: "Mall Analytics", href: "/mall-analytics" },
      { name: "In-Store Analytics", href: "/analytics" },
      { name: "Hardware & Sensors", href: "/hardware" },
      { name: "Integrations", href: "/integrations" },
    ],
  },
  {
    label: "Industry",
    items: [
      { name: "Fashion & Apparel", href: "/industries/fashion-apparel" },
      { name: "Shopping Malls", href: "/industries/shopping-malls" },
      { name: "Jewellery & Luxury", href: "/industries/jewellery-luxury" },
      { name: "Hospitality & F&B", href: "/industries/hospitality-fnb" },
      { name: "Airports & Terminals", href: "/industries/airports" },
    ],
  },
  {
    label: "Resources",
    items: [
      { name: "FAQ", href: "/faq" },
      { name: "Testimonials", href: "/testimonials" },
      { name: "Contact", href: "/contact" },
    ],
  },
];

export const MOBILE_NAV_LINKS: NavItem[] = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Features", href: "/features" },
  { name: "Mall Analytics", href: "/mall-analytics" },
  { name: "In-Store Analytics", href: "/analytics" },
  { name: "Hardware", href: "/hardware" },
  { name: "Industries", href: "/industries" },
  { name: "Pricing", href: "/pricing" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "FAQ", href: "/faq" },
];

/**
 * Normalise legacy nav hrefs (`#section`) and pass-through real routes
 * (`/foo`). Returned value is suitable for react-router's <Link to=...>.
 */
export function hrefToLinkTo(href: string): string {
  if (href.startsWith("#")) return "/" + href.slice(1);
  return href;
}
