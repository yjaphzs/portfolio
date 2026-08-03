import { useCallback, useRef, useState } from "react";

import { TVPlaceholder } from "./TVPlaceholder";
import type { TVDriver } from "./driver";

type Props = {
  driver: React.RefObject<TVDriver>;
  reducedMotion: boolean;
  onOpen: () => void;
  /** True once the WebGL TV has painted. Until then the CSS stand-in covers the gap. */
  ready: boolean;
  /** The lazy 3D canvas. Kept as a prop so this file stays free of three imports. */
  children: React.ReactNode;
};

/**
 * The TV widget: light rays and glow in DOM, the set itself in WebGL.
 *
 * Positioning is the caller's job — TimeMachine places this inline at the foot
 * of the page, or pinned to the corner on the scroll-locked archived layout.
 *
 * The canvas is `pointer-events-none` and purely decorative — a real <button>
 * wraps it and carries the label, click handling, and native Enter/Space
 * keyboard support. R3F pointer events would be invisible to keyboards and
 * screen readers, so they are not used for the trigger.
 */
export function TVTrigger({
  driver,
  reducedMotion,
  onOpen,
  ready,
  children,
}: Props) {
  const btn = useRef<HTMLButtonElement>(null);
  const [active, setActive] = useState(false);

  const engage = useCallback(() => {
    setActive(true);
    driver.current.power = 1;
  }, [driver]);

  const disengage = useCallback(() => {
    setActive(false);
    driver.current.power = 0;
    driver.current.px = 0;
    driver.current.py = 0;
  }, [driver]);

  // Written straight into the driver ref — never React state. A setState here
  // would re-render the canvas tree on every mousemove.
  const trackPointer = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      const el = btn.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      driver.current.px = ((e.clientX - r.left) / r.width) * 2 - 1;
      driver.current.py = ((e.clientY - r.top) / r.height) * 2 - 1;
    },
    [driver]
  );

  const handleClick = useCallback(() => {
    driver.current.power = 1.6; // brief over-bright flash as the tube kicks
    onOpen();
    window.setTimeout(() => {
      if (driver.current) driver.current.power = active ? 1 : 0;
    }, 180);
  }, [driver, onOpen, active]);

  return (
      <button
        ref={btn}
        type="button"
        aria-label="Open portfolio time machine — browse previous versions"
        aria-busy={!ready}
        onClick={handleClick}
        onPointerEnter={engage}
        onPointerLeave={disengage}
        onPointerMove={trackPointer}
        onFocus={engage}
        onBlur={disengage}
        // The model fills ~63% of this box by design — the rest is the margin
        // that keeps the tilt from clipping, so the TV reads smaller than the box.
        className="group relative block h-32 w-32 cursor-pointer rounded-xl outline-none sm:h-40 sm:w-40"
      >
        {/* Ray fan. `.tv-rays` owns the centring transform, so no Tailwind
            translate utilities here — the spin keyframe would overwrite them. */}
        <span
          aria-hidden
          className={`tv-rays pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[210%] w-[210%] transition-opacity duration-500 ${
            reducedMotion ? "" : "tv-rays-spin"
          } ${active ? "opacity-70" : "opacity-0"}`}
        />

        {/* Soft radial bleed onto the page */}
        <span
          aria-hidden
          className={`tv-bleed pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[150%] w-[150%] rounded-full blur-xl transition-opacity duration-500 ${
            active ? "opacity-60" : "opacity-25"
          }`}
        />

        {/* Held until the canvas has painted, then crossfaded out. The button
            and the channel guide are fully usable throughout — nothing here is
            gated on the 3D arriving. */}
        <TVPlaceholder ready={ready} />

        {/* The canvas. Decorative — the button owns interaction. */}
        <span className="pointer-events-none absolute inset-0 block">
          {children}
        </span>

        {/* Focus ring, since the button itself has no visible box */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-xl ring-2 ring-transparent transition-colors group-focus-visible:ring-sky-300/80"
        />
      </button>
  );
}
