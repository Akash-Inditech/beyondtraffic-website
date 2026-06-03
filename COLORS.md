# Beyond Traffic — Color Reference

The canonical palette lives in [`src/styles/theme.css`](src/styles/theme.css).
A gold/yellow brand (`#F5C518`) on white with near-black text.

## Brand / Core (Light mode)

| Token | Hex | Role |
|---|---|---|
| `--primary` / `--ring` | `#F5C518` | Brand gold (buttons, accents) |
| `--accent` | `#FDE047` | Bright yellow accent |
| `--secondary` | `#FEF9C3` | Pale yellow |
| `--background` | `#FFFFFF` | Page white |
| `--foreground` | `#1A1A1A` | Near-black text |
| `--muted` | `#F8F8F4` | Off-white panels |
| `--muted-foreground` | `#5C5C5C` | Gray text |
| `--destructive` | `#EF4444` | Red (errors) |
| `--border` | `rgba(26,26,26,0.08)` | Hairline borders |
| `--switch-background` | `#D1D5DB` | Gray toggle |

## Chart palette (both modes)

| Token | Hex |
|---|---|
| `--chart-1` | `#EAB308` |
| `--chart-2` | `#FACC15` |
| `--chart-3` | `#FDE047` |
| `--chart-4` | `#B8E986` (green) |
| `--chart-5` | `#FDE68A` |

## Soft card pastels

| Token | Hex |
|---|---|
| `--card-mint` | `#DCEDC9` |
| `--card-cream` | `#F4ECC2` |
| `--card-sand` | `#EAE7DA` |
| `--card-stone` | `#E5E5E0` |
| `--sidebar-border` | `#EEEDE5` |

## Dark mode

| Token | Hex |
|---|---|
| `--background` | `#1F2937` |
| `--foreground` | `#F9FAFB` |
| `--card` / `--popover` | `#374151` |
| `--secondary` / `--muted` / `--border` / `--input` | `#4B5563` |
| `--muted-foreground` | `#D1D5DB` |
| `--accent` | `#FACC15` |
| `--sidebar` | `#111827` |
| `--primary` (unchanged) | `#F5C518` |

## Gradients & decorative

- **Gold gradient text** (`.stori-gradient`): `#6B5A0F → #B8861B → #F5C518`
- **CTA button** (`.stori-cta`): `#FBE26A → #F5C518 → #D4A613`; hover `#F5C518 → #D4A613 → #A47A0D`
- **Eyebrow label** (`.stori-label`): text `#1F2937`, gold dot `#F5C518 → #B8861B`
