import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";

type Props = {
  /** Pixel-font OSD title, rendered after the ▐ marker, lowercase as authored. */
  title: string;
  /** Accessible name for the dialog. Falls back to the title. */
  label?: string;
  /** Panel measure — stats readouts are narrow, the key legend needs more. */
  width?: string;
  /** Small print below a rule, in the 9px mono register. */
  footer?: ReactNode;
  onClose: () => void;
  children: ReactNode;
};

/**
 * Shared chrome and behaviour for the v3 on-screen displays.
 *
 * Portalled into <body>, which is not incidental — it is the fix for two bugs
 * the panels hit while mounted where they were declared:
 *
 *  1. `.crt-reveal` animates `transform` with `animation-fill-mode: forwards`,
 *     so the wrapper keeps an animated transform indefinitely and becomes the
 *     containing block for `position: fixed` descendants. A panel opened from
 *     the masthead was therefore centred on the masthead rather than the
 *     viewport — on a phone that pushed its top half off-screen.
 *  2. `<main>` is `relative z-10`, a stacking context that the mobile channel
 *     bar (z-40, a sibling of main) sits above. z-10002 inside it counted for
 *     nothing, so the bar painted over the panel.
 *
 * Both disappear once the panel is a child of <body>. It lands after #root, so
 * it also clears the retro TV (z-10001) and the tuning static (z-10002).
 */
export function OsdPanel({
  title,
  label,
  width = "max-w-sm",
  footer,
  onClose,
  children,
}: Props) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  // Move focus in, and hand it back to the trigger on close. preventScroll
  // matters on the way out: the trigger can be anywhere in a long page, and
  // a focus-driven jump would look like the page moved on its own.
  useEffect(() => {
    const trigger = document.activeElement as HTMLElement | null;
    panelRef.current?.focus({ preventScroll: true });
    return () => trigger?.focus?.({ preventScroll: true });
  }, []);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={label ?? title}
      className="fixed inset-0 z-10002 print:hidden"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-crt-bg/85 backdrop-blur-sm"
      />

      {/* Centred against the *visible* viewport: 100dvh excludes the mobile
          browser chrome, which inset-0 does not. The backdrop above keeps
          inset-0 so it still covers the full layout viewport.
          pointer-events-none lets a tap in the empty margin reach that
          backdrop; the panel itself takes its events back. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex h-dvh items-center justify-center p-4 sm:p-6">
        <div
          ref={panelRef}
          tabIndex={-1}
          className={`pointer-events-auto relative flex max-h-full w-full flex-col overflow-hidden rounded-xl border border-crt-line bg-crt-surface outline-none ${width}`}
        >
          {/* .crt-scanlines paints pure-black lines, which read as texture on
              a dark panel and as heavy banding on a light one — hence the
              per-theme step. Sits on the panel, not the scroller, so it can't
              scroll away from the content it textures. */}
          <span
            aria-hidden
            className="crt-scanlines pointer-events-none absolute inset-0 opacity-[0.12] dark:opacity-40"
          />

          <div className="relative flex min-h-0 flex-col p-5 sm:p-6">
            <div className="flex shrink-0 items-baseline justify-between gap-4 border-b border-crt-line pb-3">
              <p className="font-pixel text-sm lowercase text-crt-muted">
                ▐ {title}
              </p>
              {/* [Esc] is a keyboard hint and means nothing on a phone, so
                  touch widths get the glyph. The negative margin buys a 40px
                  target without moving the label off its baseline. */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="-m-2 cursor-pointer p-2 font-crt-mono text-[10px] uppercase tracking-[0.05em] text-crt-muted transition-colors hover:text-crt-accent focus-visible:text-crt-accent focus-visible:outline-none"
              >
                <span className="hidden sm:inline">[Esc]</span>
                <span className="sm:hidden">[×]</span>
              </button>
            </div>

            <div className="min-h-0 overflow-y-auto overscroll-contain pt-4">
              {children}
            </div>

            {footer && (
              <p className="mt-5 shrink-0 border-t border-crt-line pt-3 font-crt-mono text-[9px] leading-relaxed text-crt-muted">
                {footer}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
