/**
 * Shared site navigation config — used by both the home-page header
 * (App.tsx) and the industry detail pages (IndustryDetailPage.tsx) so
 * the nav stays in sync without duplicating link lists.
 */

export type NavItem = { name: string; href: string };
export type NavDropdown = { label: string; items: NavItem[] };

export const NAV_DROPDOWNS: NavDropdown[] = [
  {
    label: "Platform",
    items: [
      { name: "Live Dashboard", href: "#dashboard" },
      { name: "Key Features", href: "#features" },
      { name: "Mall Analytics", href: "#mall-analytics" },
      { name: "In-Store Analytics", href: "#analytics" },
      { name: "Hardware & Sensors", href: "#hardware" },
      { name: "Integrations", href: "#integrations" },
    ],
  },
  {
    label: "Industry",
    items: [
      { name: "Fashion & Apparel", href: "#/industries/fashion-apparel" },
      { name: "Shopping Malls", href: "#/industries/shopping-malls" },
      { name: "Jewellery & Luxury", href: "#/industries/jewellery-luxury" },
      { name: "Hospitality & F&B", href: "#/industries/hospitality-fnb" },
      { name: "Airports & Terminals", href: "#/industries/airports" },
    ],
  },
  {
    label: "Resources",
    items: [
      { name: "FAQ", href: "#faq" },
      { name: "Testimonials", href: "#testimonials" },
      { name: "Contact", href: "#contact" },
    ],
  },
];

export const MOBILE_NAV_LINKS: NavItem[] = [
  { name: "Dashboard", href: "#dashboard" },
  { name: "Features", href: "#features" },
  { name: "Mall Analytics", href: "#mall-analytics" },
  { name: "In-Store Analytics", href: "#analytics" },
  { name: "Hardware", href: "#hardware" },
  { name: "Industries", href: "#industries" },
  { name: "Pricing", href: "#pricing" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "FAQ", href: "#faq" },
];

/**
 * Convert a navigation `href` string into a value suitable for react-router's
 * <Link to=...>.
 *
 * Three classes of href exist in the nav data:
 *   1. `#/foo/bar` — HashRouter route (strip the leading `#`).
 *   2. `#section`  — an anchor on the home page (navigate to `/`,
 *                    deliver `#section` so the home page can scroll).
 *   3. Anything else — leave as-is.
 *
 * Pair with `useScrollToHash()` on the home page to actually scroll when
 * the hash arrives.
 */
export function hrefToLinkTo(href: string):
  | string
  | { pathname: string; hash?: string } {
  if (href.startsWith("#/")) return href.slice(1);
  if (href.startsWith("#")) return { pathname: "/", hash: href };
  return href;
}
