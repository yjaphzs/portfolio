---
name: retro-crt-design
description: Apply the Retro CRT design language — a dark-first, typography-driven aesthetic built on phosphor cyan, pixel-font section markers, tiny uppercase monospace labels, scanline and halftone texture, and hairline-bordered surfaces. Use whenever building or restyling any UI in this portfolio (page, section, component, card, nav) or when the user asks for something retro, CRT, terminal, phosphor, halftone, or "in the new portfolio style". Describes values, not code — works in Tailwind, plain CSS, or any stack.
paths: ["**/*.tsx", "**/*.jsx", "**/*.css", "**/*.html"]
---

# Retro CRT design language

A late-night terminal rendered with the care of a print magazine. Near-black ground,
one phosphor-cyan signal colour, structure carried entirely by type and hairlines.
The retro comes from *texture and typographic register* — scanlines, pixel numerals,
tiny mono labels — never from skeuomorphism. No fake bevels, no drop shadows imitating
plastic, no comic fonts.

Everything below is stated as values, not code. Translate them into whatever the file
you are editing already uses.

## Philosophy — read this first

1. **Cyan is signal, not decoration.** The accent marks exactly one thing per view:
   the live, the current, the interactive. If two things on screen are cyan, one of
   them is wrong. Everything else is the grey ramp. If you feel the urge to add a
   second hue, raise contrast or invert instead.
2. **Texture is seasoning.** Scanlines, halftone and glow appear in at most two places
   per page, always masked so they dissolve rather than stop at an edge. A page tiled
   edge-to-edge in scanlines is a costume, not a design.
3. **Dark is the design; light is a port.** Compose in dark and verify in light. Every
   token below has a light value and both must ship, but the identity lives in dark.
4. **Empty is correct.** Generous vertical rhythm is the point. If a screen feels
   sparse, stop — do not fill it.

## Colour

Stored as semantic roles, not raw values. Never hardcode a hex in a component.

| Role | Dark (primary) | Light | Use |
|---|---|---|---|
| `bg` | `#08090B` | `#FAFBFC` | page ground |
| `surface` | `#0F1216` | `#FFFFFF` | cards, panels |
| `elevated` | `#151A20` | `#F3F5F7` | hover state, inset wells |
| `line` | `#1F262F` | `#E4E8EC` | **all hairlines** — the default divider |
| `line-strong` | `#2B3540` | `#CFD6DD` | focused/active borders |
| `muted` | `#6E7A88` | `#6B7683` | micro-labels, meta, timestamps |
| `secondary` | `#94A1AF` | `#4A5560` | body copy that is not primary |
| `ink` | `#E6EDF3` | `#0B0E12` | headings, primary text |
| **`accent`** | **`#9FDCFF`** | **`#0E7490`** | the one signal colour |
| `accent-dim` | `#3E8FB8` | `#7FB8CC` | accent borders, inactive tabs |
| `amber` | `#FFB454` | `#B45309` | warnings and "archived" only |

Rules:
- Dark `accent` `#9FDCFF` is the same phosphor as the CRT screen shader — they must
  stay in sync. Light mode **cannot** use it (fails contrast on white); it drops to
  the deeper `#0E7490`.
- Borders are `line` at full opacity, never a translucent white. Translucency stacks
  unpredictably over texture.
- Emphasis comes from **inversion** (`bg: ink, text: bg`) or from `accent`, never from
  a heavier grey.
- Selection: `accent` background, `bg` foreground.
- `amber` is reserved for archived-version chrome so "you are viewing an old version"
  is never confused with "this is live".

## Typography

Four registers, each with one job. Mixing them is what makes the page read as a
technical document rather than a template.

| Register | Family | Fallback | Used for |
|---|---|---|---|
| Pixel | `Silkscreen` 400/700 | `ui-monospace, monospace` **uppercased** | section numerals, stat figures, presence count |
| Mono | `IBM Plex Mono` 400/500/600 | `ui-monospace, monospace` | micro-labels, metadata, code, dates, tags |
| Sans | `Inter` | `system-ui, sans-serif` | body, headings, UI |
| Serif | `EB Garamond` | `Georgia, serif` | long-form and the printable résumé only |

If Silkscreen is unavailable, fall back to mono in uppercase with `+0.1em` tracking.
**Never** substitute another decorative or "gamer" pixel face.

Scale:
- Section marker: **14px pixel, lowercase as authored**, colour `muted`.
- Micro-label: **10–11px mono, UPPERCASE, +0.05em tracking**, colour `muted`. This is
  the signature register — dates, categories, counts, "view all →". Used liberally.
- Body: **15px sans / 1.6** (not 16). Small **13px**.
- Headings: sans 600, tracking `-0.02em`. h1 ≈ 1.75rem, h2 ≈ 1.3rem, h3 ≈ 1.05rem.
- Display figures (stat numbers, big counts): pixel, 2–3rem, line-height 1.
- Links: no underline at rest; `accent` on hover with a 1px underline at 40% opacity.
  External links take a trailing `↗`, internal `→`.

## Layout and spacing

- Content column **max 720px**; grids may widen to **960px**. Centred, `24px` page
  padding (`16px` under 640px).
- Optional fixed left rail **224px** at ≥1024px, separated by a single `line` border.
  Below that it collapses to a top bar.
- **Section rhythm 56px top and bottom.** Header-to-content gap 24px.
- Card padding 20px. Component gaps 12px; grid gaps 12–24px.
- Grids: 2 columns from 640px, 3 from 1024px.
- Radii: cards **12px**, small surfaces 8px, inputs 6px, pills full. Nothing larger
  than 16px — big radii read soft and modern, which fights the aesthetic.
- **Shadows are near-absent.** Separation is done with `line` borders. The only
  permitted glow is `accent` at ≤20% alpha behind a genuinely live element.

## Texture

Three motifs. Reuse the existing CSS in `src/index.css` rather than reinventing —
`.crt-scanlines`, `.crt-noise`, `.tv-rays` are already defined there.

- **Scanlines** — horizontal 1px lines every 3–4px, `bg` at ~35% alpha. For screens,
  panels standing in for displays, and the channel guide.
- **Halftone** — radial dot, 1px radius on a 9px cell (dense 6px, wide 13px). `ink` at
  ~10% alpha in dark. For page-corner backdrops.
- **Phosphor glow** — a radial `accent` bleed at 12–20% alpha behind live elements.

Always mask texture so it fades out: a radial gradient from the corner it anchors to,
or a horizontal `transparent → black 30% → black 70% → transparent` band. Never let a
texture terminate on a hard edge.

## Motion

- Micro-interactions **200ms**. Hover lift **2px**, cards **6px**.
- Entrance: fade up from **12px over 700ms**, easing `cubic-bezier(0.16, 1, 0.3, 1)`,
  stagger **70ms**, capped at five steps.
- Live indicators pulse `1 → 0.25 → 1` over **1.8s**.
- Theme change crossfades over 500ms via a temporary class, removed afterwards so the
  global transition never interferes with hover.
- Every animation must be disabled under `prefers-reduced-motion: reduce`. Presence
  counts, contribution graphs and the TV remain visible — only their motion stops.

## Signature patterns

These five are the identity. Details, geometry and the presence backend contract live
in **[patterns.md](patterns.md)** — read it before implementing any of them.

1. **Numbered section header** — `NN — name` in lowercase pixel on the left, a mono
   uppercase action or handle on the right, baseline-aligned, 24px above the content.
2. **Dot-matrix contribution graph** — a halftone SVG where dot *radius* encodes
   intensity and opacity is binary. Exact geometry in `patterns.md`.
3. **Presence stack** — overlapping 19px avatars with a double-ring, plus a pixel-font
   count. Backed by Firebase Realtime Database.
4. **Gear grid** — the desk-setup showcase: image, mono category label, brand + model.
5. **Time machine** — the existing retro TV and CRT channel guide. Version chrome uses
   `amber`, never `accent`.

## Accessibility and quality bar

- Body text ≥ 4.5:1, micro-labels ≥ 4.5:1 against their own background. `muted` on
  `bg` is compliant in both themes — verify if you change either.
- Never encode meaning in colour alone: the contribution graph carries a text count,
  presence carries a number, "live" carries a label.
- Decorative texture and canvases are `aria-hidden` and `pointer-events: none`; the
  interactive element is always a real `<button>` or `<a>`.
- Visible focus ring: 2px `accent` at 80% alpha, 2px offset. Never remove it.
- Every interactive target ≥ 40px on touch.

## Applying this to a new page

1. Set the tokens first. Nothing else until the palette resolves in both themes.
2. Lay out the column and the 56px section rhythm before any content.
3. Number the sections. The numbering is structural — decide it early.
4. Fill with type only: sans body, mono micro-labels, pixel numerals. No colour yet.
5. Add `accent` to exactly one element per view.
6. Add at most two texture instances, masked.
7. Add motion last, then immediately verify with reduced-motion on.
8. Check light mode, then print (`/resume` must stay black-on-white).

Stop before it gets busy. If the page feels quiet, it is working.
