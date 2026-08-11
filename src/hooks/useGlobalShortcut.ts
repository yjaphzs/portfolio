import { useEffect, useRef } from "react";

/** True when the user is typing, so a bare letter must not act as a shortcut. */
function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
}

/**
 * Binds one app-wide key.
 *
 * Deliberately narrow: this is for keys that must work from anywhere on the
 * page. Anything directional stays scoped to its own component, so it cannot
 * hijack scrolling — see the note in `data/shortcuts.ts`.
 *
 * Ctrl/Cmd/Alt are rejected so browser and OS shortcuts always win, but Shift
 * is NOT — `?` is Shift+/ on most layouts, and rejecting it would make the help
 * key unreachable.
 *
 * The handler is held in a ref so callers do not have to memoise it to avoid
 * resubscribing a document listener on every render.
 */
export function useGlobalShortcut(
  key: string,
  handler: () => void,
  enabled = true
) {
  const saved = useRef(handler);

  useEffect(() => {
    saved.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!enabled) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (isTypingTarget(e.target)) return;
      if (e.key.toLowerCase() !== key.toLowerCase()) return;

      e.preventDefault();
      saved.current();
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [key, enabled]);
}
