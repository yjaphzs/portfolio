/**
 * Keyboard shortcuts — the legend and the keys themselves, in one place.
 *
 * The panel renders `shortcutGroups`, and the handlers import `GLOBAL_KEYS`, so
 * a documented key and a bound key cannot drift apart. Anything listed here has
 * to actually work: a legend that lies is worse than no legend.
 *
 * Scoped keys (arrows in the rail, the gear deck, the gallery) stay bound in
 * their own components — they only fire when focus is already inside, which is
 * what stops them fighting the page's own scrolling.
 */

/** Keys bound app-wide, via useGlobalShortcut. */
export const GLOBAL_KEYS = {
  help: "?",
  timeMachine: "t",
} as const;

export type Shortcut = {
  keys: string[];
  label: string;
  /** Rendered between key caps. "/" reads as "or", "–" as a range. */
  joiner?: string;
};

export type ShortcutGroup = {
  title: string;
  items: Shortcut[];
};

export const shortcutGroups: ShortcutGroup[] = [
  {
    title: "Anywhere",
    items: [
      { keys: ["?"], label: "Show this legend" },
      { keys: ["T"], label: "Open the time machine" },
      { keys: ["Esc"], label: "Close whatever is open" },
    ],
  },
  {
    title: "Channel dial",
    items: [
      { keys: ["↑", "↓"], label: "Tune between channels" },
      { keys: ["1", "9"], label: "Jump straight to a channel", joiner: "–" },
      { keys: ["⏎"], label: "Open the tuned channel" },
    ],
  },
  {
    title: "Desk setup",
    items: [
      { keys: ["←", "→"], label: "Step through the gear" },
      { keys: ["⏎"], label: "Flip a card for its full specs" },
    ],
  },
  {
    title: "Gallery",
    items: [
      { keys: ["←", "→"], label: "Previous / next image" },
      { keys: ["Esc"], label: "Leave fullscreen" },
    ],
  },
];
