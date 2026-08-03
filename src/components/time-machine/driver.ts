/**
 * Mutable state shared from the DOM trigger into the 3D scene.
 *
 * This is deliberately a ref-carried mutable object rather than React state or
 * props. Pointer movement and hover would otherwise re-render the canvas tree on
 * every mousemove; instead the trigger writes here and `useFrame` reads and lerps
 * toward it, so the scene animates with zero React renders.
 */
export type TVDriver = {
  /** Pointer position over the trigger, normalised to -1..1. */
  px: number;
  py: number;
  /** Target screen brightness: 0 idle, 1 hovered/focused, 1.6 during the click flash. */
  power: number;
};

export const createDriver = (): TVDriver => ({ px: 0, py: 0, power: 0 });
