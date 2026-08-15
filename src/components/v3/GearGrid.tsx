import setup from "@/data/setup";

import { GearCard } from "./GearCard";

/**
 * The whole desk at once — a specimen sheet, not a shopping list.
 *
 * Two columns rather than three: the cards carry a square illustration window
 * plus a spec line, so three across a 720px column would leave the names
 * wrapping every time. The homepage shows these one at a time via GearDeck.
 */
export function GearGrid() {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {setup.map((item, i) => (
        <li key={item.id}>
          <GearCard item={item} number={i + 1} />
        </li>
      ))}
    </ul>
  );
}
