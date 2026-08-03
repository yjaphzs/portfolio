# Signature patterns

Implementation detail for the five set pieces named in [SKILL.md](SKILL.md). Geometry
here is measured, not invented — deviating from it is what makes a copy look like a
copy. Token names (`accent`, `muted`, `line`, `ink`, `bg`) refer to the colour table
in SKILL.md.

---

## 1. Numbered section header

Two typographic registers deliberately disagreeing — that disagreement is the effect.

```
01 — about                                        VIEW ALL →
└ pixel, 14px, lowercase, muted                   └ mono, 11px, UPPERCASE, +0.05em, muted
```

- Wrapper: flex, `align-items: baseline`, `justify-content: space-between`, **24px**
  below the header before content starts.
- Left: zero-padded number, space, **em dash U+2014**, space, lowercase word. Never
  title-case, never a colon.
- Right: optional. A link, handle, or count. Trailing `↗` for external, `→` for
  internal. Hover goes `muted → accent`.
- Numbering is structural: assign it once per page in reading order and don't reshuffle
  for aesthetics. A section without a number isn't a section — it's a sub-block.

---

## 2. Dot-matrix contribution graph

A print halftone, not a heatmap. **Dot radius carries intensity; opacity is nearly
binary.** That inversion is the whole trick — empty days become near-invisible
pinpricks and the year reads as a texture.

### Geometry

| Property | Value |
|---|---|
| Cell pitch | 13 × 13 units (`blockSize` 10–11 + `blockMargin` 3) |
| Grid | 53 columns × 7 rows |
| Shape | `<circle>`, `fill="currentColor"`, no stroke |
| Radius ramp | `1.1` → `2.7` → `3.8` → `4.8` → `5.7` (decelerating) |
| Opacity | `0.12` for zero, `0.92` for every non-zero level |
| Colour | `accent` in dark, `ink` in light |
| Caption | 11px mono UPPERCASE `+0.05em` `muted`, 16px below |

Caption text: `N CONTRIBUTIONS IN THE LAST YEAR`. It must exist — the graph carries no
meaning to a screen reader otherwise.

### Implementation

The project already has `react-github-calendar` (v5), and its underlying
`react-activity-calendar` exposes a `renderBlock` escape hatch that passes straight
through. **No fork, no bespoke SVG.**

```ts
renderBlock?: (block: BlockElement, activity: Activity) => ReactElement
// Activity = { date: string; count: number; level: number }
```

Four things that will bite:

1. **`block.props.x` is always `0`.** Horizontal position comes from the parent week
   `<g transform>`. Inside `renderBlock` you only get `y` — use `cx={BLOCK / 2}`.
2. **Scale radius by `Math.sqrt(count)`, never `count`.** Circle area grows with r², so
   a linear map makes a busy day look ~3× busier than it is. This is the single most
   common mistake in dot-matrix graphs.
3. Drive size from `activity.count` (continuous), not `activity.level` (bucketed 0–4).
   Using `level` reproduces GitHub's own banding and defeats the point.
4. `renderColorLegend` has the same signature and is **not** overridden automatically —
   set `showColorLegend={false}` or you get squares in the legend and circles in the
   grid. Also keep max radius ≤ `blockSize / 2`; the current wrapper is `overflow-hidden`
   and will clip anything larger.

Tooltips still work — `renderBlock`'s return value is what gets wrapped.

### Data source — a real risk

`react-github-calendar` fetches from `github-contributions-api.jogruber.de`, a
third-party endpoint run by the package author that scrapes public profile HTML. No
token, no CORS problem, 1-hour server cache — but it is **one person's free service and
a single point of failure on the homepage**. Always pass `errorMessage` so it degrades.

Preferred long-term: fetch at build time instead. The deploy workflow already runs on
push, so add a step that queries GitHub's GraphQL `contributionsCollection` with a
fine-grained PAT (repo secret, `read:user`), writes `public/contributions.json`, and add
a daily `schedule:` trigger so it doesn't go stale. The client then reads a static file —
no runtime dependency, no rate limit. GraphQL requires auth on every request, so this
*must* happen at build time; a token can never ship in a static bundle.

---

## 3. Presence stack

Overlapping avatars plus a live count.

### Visual

- Avatar **19px**, `border-radius: 50%`, overlap **−6px** on all but the first.
- The ring is a **double box-shadow, not a border**: `0 0 0 1.5px bg` (a page-coloured
  gap) then `0 0 0 2.5px line`. This is what makes the stack read crisply against
  texture — a plain border does not.
- Overflow chip: pill, `min-width: 19px`, height 19px, `elevated` fill, `line-strong`
  ring, 9px/600 `muted`, same −6px overlap. Shown as `+N`.
- Label below: pixel font, count in `ink`, the rest `muted`. Pluralise properly —
  "1 person viewing now" / "3 people viewing now".
- Show at most 3 avatars, then the chip.

### Backend — Firebase Realtime Database

RTDB is the only Firebase product with **server-side disconnect detection**, which is
why it wins here. Register `onDisconnect` *before* writing, so a killed tab or dropped
connection still cleans up — `beforeunload` does not fire reliably and must not be
relied on.

```
.info/connected → true
  con = push(ref(db, "presence"))
  onDisconnect(con).remove()        // BEFORE the set
  set(con, { at: serverTimestamp() })
count = snapshot.size on "presence"
```

Rules — public read of the count, write only your own node, timestamp only:

```json
{ "rules": { "presence": {
    ".read": true,
    "$conn": {
      ".write": "!data.exists() || !newData.exists()",
      ".validate": "newData.hasChildren(['at']) && newData.child('at').isNumber()"
    }
} } }
```

Constraints to design around:

- **Lazy-load it.** The tree-shaken Firebase RTDB client is ~48 kB gzip — about the
  weight of React, for a decorative widget. Dynamic-import when the component scrolls
  into view; render a static placeholder until it resolves. This codebase already has
  the pattern in `src/components/time-machine/TimeMachine.tsx`.
- The web API key **is** meant to be public; Security Rules are the access control. An
  Admin SDK service-account key must never ship.
- Spark free tier: **100 simultaneous connections**, and it physically cannot generate a
  bill. Fine for a portfolio; the cap is also a natural DoS ceiling whose blast radius is
  a broken widget.
- Do **not** use Firestore for this. It has no `onDisconnect`; Google's own workaround
  routes through RTDB plus a Cloud Function, and Cloud Functions are not on the free tier.

### Avatars — there is no real source

Visitors are anonymous. Generate a deterministic identicon from a UUID minted per tab and
held **in memory only**. Not `localStorage` — a persistent visitor ID is a tracking cookie
in all but name, regardless of intent. `boring-avatars` (~2 kB) or a locally-drawn shape
both work; a pixel-art style suits the aesthetic.

Do not use IP-derived country flags. That is processing personal data, and with two
viewers online it is actively deanonymising.

### The failure mode to design for

On a quiet portfolio this reads **"1 person viewing now"** almost always — which
advertises an empty room and looks worse than having no widget. Decide the behaviour
before building. Either hide the component entirely below 2 viewers, or reframe it as a
rolling window ("14 visitors today"), which RTDB can track just as cheaply.

---

## 4. Gear grid — desk setup showcase

A specimen sheet, not a shopping list.

- Grid: 2 columns from 640px, 3 from 1024px, 16px gaps.
- Card: `surface` fill, `line` border, 12px radius, 20px padding. No shadow.
- Image sits in a 4:3 well with `elevated` background and 8px radius, `object-contain`
  with breathing room — hardware shot on a plain ground, never bled to the edge.
- Below the image, in order:
  - **Category** — 10px mono UPPERCASE `muted` (`LAPTOP`, `KEYBOARD`, `MOUSE`, `DISPLAY`).
  - **Brand + model** — 15px sans, `ink`, weight 500.
  - **Spec** — 13px `secondary`, one line, the detail that matters (switch type, chip,
    resolution). Optional.
- Hover: 2px lift, border `line → line-strong`. Only if the card links somewhere.
- Data belongs in `src/data/setup.ts` as `{ category, brand, model, spec?, image, url? }`,
  following the existing `src/data/` convention. Images go in `src/assets/` and are
  re-exported through the assets barrel, not imported directly by components.
- Placeholders: keep the 4:3 well and render a halftone fill with the category label
  centred, so the layout is final before real photography lands.

---

## 5. Time machine and version chrome

Already built — `src/components/time-machine/`. Two standing rules:

- Version chrome is **`amber`, never `accent`**. Cyan means "live"; conflating them
  makes an archived version look current.
- The retro TV's screen shader tint and the `accent` token are the same phosphor. If one
  changes, change the other.

When a version is archived, its channel entry moves to `category: "archived"` in
`src/data/versions.ts`. Three things do **not** update themselves and must be handled by
hand:

1. `knownPaths` hardcodes the *current* version's sub-page literals — archived sub-pages
   need adding or the switcher vanishes on them.
2. `useVersionFavicon` hardcodes `/v1` for any path starting `/archived`, so a second
   archived version silently inherits v1's favicons. Needs a per-version prefix.
3. There is no `404.html`, so GitHub Pages 404s on any deep link before React Router
   runs. More routes multiplies existing exposure.
