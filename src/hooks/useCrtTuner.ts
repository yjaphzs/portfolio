import { useCallback, useEffect, useRef, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** Static burst when stepping one place. */
export const STEP_MS = 160;
/** Longer burst for a deliberate jump, matching CrtGallery's channel change. */
export const TUNE_MS = 380;

/**
 * The channel-change state machine: a burst of static that hides an index swap.
 *
 * Lifted out of CrtGallery so the gear deck reuses the vocabulary rather than
 * adding a third copy of it. The one subtle rule, learned there: decode the
 * incoming image BEFORE starting the burst. Skip that and the static hides a
 * blank frame, which inverts the illusion into static, nothing, then a pop.
 *
 * `sources` must be referentially stable — memoise it, or `tuneTo` changes
 * identity on every render and any effect depending on it will thrash.
 */
export function useCrtTuner(sources: string[]) {
  const [index, setIndex] = useState(0);
  const [tuning, setTuning] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const timer = useRef<number | undefined>(undefined);

  const total = sources.length;

  const tuneTo = useCallback(
    (next: number, duration: number = STEP_MS) => {
      if (total === 0) return;
      const target = ((next % total) + total) % total;
      if (target === index) return;

      if (reducedMotion) {
        setIndex(target);
        return;
      }

      // Callers may pass "" for an entry with no image, to keep this index
      // aligned with their own list. Assigning that to src would resolve
      // against the page URL and fetch the document.
      if (sources[target]) {
        const img = new Image();
        img.src = sources[target];
      }

      setTuning(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => {
        setIndex(target);
        setTuning(false);
      }, duration);
    },
    [index, total, sources, reducedMotion]
  );

  const step = useCallback(
    (delta: number) => tuneTo(index + delta, STEP_MS),
    [index, tuneTo]
  );

  useEffect(() => () => window.clearTimeout(timer.current), []);

  // Warm the neighbours so stepping stays instant on a cold cache.
  useEffect(() => {
    if (total < 2) return;
    [(index + 1) % total, (index - 1 + total) % total].forEach((i) => {
      if (!sources[i]) return;
      const img = new Image();
      img.src = sources[i];
    });
  }, [index, sources, total]);

  return { index, tuning, tuneTo, step, total };
}
