import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * A single key cap.
 *
 * shadcn's kbd, restyled to the CRT register — the stock component is built on
 * `bg-muted` / `text-muted-foreground`, which do not exist in this palette.
 *
 * Hand-placed rather than pulled from the registry: kbd has no underlying
 * primitive, so the radix and base-ui variants are the same presentational
 * source, and there was no reason to add @base-ui-components/react to a
 * radix-configured project for it.
 */
function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "inline-flex h-5 min-w-5 select-none items-center justify-center",
        "rounded-sm border border-crt-line bg-crt-elevated px-1.5",
        "font-crt-mono text-[10px] uppercase tracking-[0.05em] text-crt-secondary",
        className
      )}
      {...props}
    />
  );
}

/** Keys pressed together, or a range — the caller supplies the separator. */
function KbdGroup({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="kbd-group"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  );
}

export { Kbd, KbdGroup };
