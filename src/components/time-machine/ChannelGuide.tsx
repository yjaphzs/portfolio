import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "motion/react";

import { versions } from "@/data/versions";

type Props = {
  reducedMotion: boolean;
  onClose: () => void;
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Fullscreen CRT on-screen display listing every portfolio version as a channel.
 *
 * DOM rather than a texture rendered onto the 3D screen: text stays selectable,
 * searchable, and reachable by screen readers, and the type stays crisp at any
 * viewport instead of being resampled onto curved glass.
 */
export function ChannelGuide({ reducedMotion, onClose }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const container = useRef<HTMLDivElement>(null);

  const currentIndex = Math.max(
    0,
    versions.findIndex((v) => v.path === location.pathname)
  );
  const [cursor, setCursor] = useState(currentIndex);
  const [tuning, setTuning] = useState(false);

  const select = useCallback(
    (path: string) => {
      if (tuning) return;
      if (path === location.pathname) {
        onClose();
        return;
      }
      // Burst of static, then change channel.
      setTuning(true);
      window.setTimeout(
        () => {
          navigate(path);
          onClose();
        },
        reducedMotion ? 0 : 380
      );
    },
    [tuning, location.pathname, navigate, onClose, reducedMotion]
  );

  // Keyboard: arrows tune, Enter selects, Escape exits, Tab is trapped.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        setCursor((c) => {
          const next = e.key === "ArrowDown" ? c + 1 : c - 1;
          return (next + versions.length) % versions.length;
        });
        return;
      }
      if (e.key === "Tab") {
        const nodes = container.current?.querySelectorAll<HTMLElement>(
          "button:not([disabled])"
        );
        if (!nodes || nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  // Lock background scroll while the guide owns the screen.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Keep DOM focus on the tuned channel so keyboard and pointer agree.
  useEffect(() => {
    const nodes = container.current?.querySelectorAll<HTMLElement>(
      "button[data-channel]"
    );
    nodes?.[cursor]?.focus();
  }, [cursor]);

  const sweep = reducedMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 0 } }
    : {
        initial: { scaleX: 0, scaleY: 0.006, opacity: 1 },
        animate: {
          scaleX: [0, 1, 1],
          scaleY: [0.006, 0.006, 1],
          opacity: [1, 1, 0],
        },
      };

  return (
    <div
      ref={container}
      role="dialog"
      aria-modal="true"
      aria-label="Portfolio time machine"
      className="fixed inset-0 z-10002 overflow-hidden print:hidden"
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-[#05070a]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reducedMotion ? 0.15 : 0.25 }}
      />

      {/* CRT power-on sweep: a hairline that snaps wide, then opens vertically */}
      <motion.div
        aria-hidden
        className="absolute inset-0 origin-center bg-white"
        {...sweep}
        transition={{
          duration: 0.55,
          times: [0, 0.35, 1],
          ease: "easeOut",
        }}
      />

      <div aria-hidden className="crt-scanlines absolute inset-0" />
      <div
        aria-hidden
        className={`crt-noise absolute -inset-[6%] transition-opacity duration-200 ${
          tuning ? "opacity-70" : "opacity-[0.07]"
        }`}
      />

      {/* Content */}
      <motion.div
        className="relative flex h-full flex-col px-5 py-6 sm:px-10 sm:py-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: tuning ? 0.15 : 1 }}
        transition={{
          duration: reducedMotion ? 0.15 : 0.3,
          delay: reducedMotion ? 0 : 0.34,
        }}
      >
        <header className="flex items-center justify-between border-b border-sky-300/25 pb-3">
          <p className="crt-text font-mono text-[11px] uppercase tracking-[0.3em] text-sky-200 sm:text-xs">
            ▐ Time Machine
          </p>
          <button
            type="button"
            onClick={onClose}
            className="crt-text cursor-pointer font-mono text-[11px] uppercase tracking-[0.2em] text-sky-300/70 transition-colors hover:text-sky-100 focus-visible:text-sky-100 focus-visible:outline-none sm:text-xs"
          >
            [Esc] Close
          </button>
        </header>

        <div className="flex min-h-0 flex-1 flex-col justify-center">
          <ul className="mx-auto w-full max-w-2xl space-y-1">
            {versions.map((v, i) => {
              const isCurrent = v.path === location.pathname;
              const isCursor = i === cursor;
              return (
                <li key={v.id}>
                  <button
                    type="button"
                    data-channel={v.channel}
                    onClick={() => select(v.path)}
                    onPointerEnter={() => setCursor(i)}
                    className={`group flex w-full cursor-pointer items-baseline gap-3 rounded-sm border-l-2 px-3 py-3 text-left transition-colors focus-visible:outline-none sm:gap-5 sm:px-4 ${
                      isCursor
                        ? "border-sky-300 bg-sky-300/10"
                        : "border-transparent hover:bg-sky-300/5"
                    }`}
                  >
                    <span className="crt-text shrink-0 font-mono text-[11px] tracking-widest text-sky-400/80 sm:text-sm">
                      CH {pad(v.channel)}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="crt-text block font-mono text-sm uppercase tracking-[0.15em] text-sky-50 sm:text-lg">
                        {isCursor && (
                          <span className="mr-1 text-sky-300">▸</span>
                        )}
                        {v.label}
                      </span>
                      <span className="mt-1 block font-mono text-[11px] leading-snug text-sky-200/50 sm:text-xs">
                        {v.description}
                      </span>
                    </span>
                    <span className="crt-text shrink-0 font-mono text-[11px] tracking-widest text-sky-300/70 sm:text-sm">
                      {v.year}
                    </span>
                    {isCurrent && (
                      <span className="shrink-0 rounded-sm bg-sky-300/20 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-sky-100">
                        On Air
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <footer className="border-t border-sky-300/25 pt-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-sky-300/45 sm:text-[11px]">
          ↑↓ Select &nbsp;·&nbsp; ⏎ Tune In &nbsp;·&nbsp; Esc Exit
          <span className="crt-caret ml-2 inline-block">▌</span>
        </footer>
      </motion.div>
    </div>
  );
}
