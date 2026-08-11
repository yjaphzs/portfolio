import { Suspense, lazy, useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";

import { knownPaths } from "@/data/versions";
import { GLOBAL_KEYS } from "@/data/shortcuts";
import { useGlobalShortcut } from "@/hooks/useGlobalShortcut";
import { useVersionFavicon } from "@/hooks/useVersionFavicon";
import { useWebGLSupport } from "@/hooks/useWebGLSupport";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { VersionSwitcher } from "@/components/VersionSwitcher";

import { TVTrigger } from "./TVTrigger";
import { ChannelGuide } from "./ChannelGuide";
import { CanvasErrorBoundary } from "./CanvasErrorBoundary";
import { createDriver } from "./driver";
import type { TVDriver } from "./driver";

/*
 * Nothing in this file's static import graph may touch three/@react-three/*.
 * The canvas is reached only through this lazy() call, which is what keeps
 * ~180KB gzip out of the entry chunk.
 */
const RetroTVCanvas = lazy(() => import("./RetroTVCanvas"));

/**
 * Bottom-right portfolio version switcher.
 *
 * Renders a 3D retro TV that opens a fullscreen CRT channel guide. Falls back to
 * the original button-and-dialog switcher when WebGL is unavailable or the canvas
 * fails at runtime. Also owns favicon swapping for archived routes, which is
 * why it must stay mounted on every route.
 */
export function TimeMachine() {
  useVersionFavicon();

  const location = useLocation();
  const webgl = useWebGLSupport();
  const reducedMotion = usePrefersReducedMotion();
  const driver = useRef<TVDriver>(createDriver());

  const [open, setOpen] = useState(false);
  const [canvasFailed, setCanvasFailed] = useState(false);
  const [load3D, setLoad3D] = useState(false);
  const [saveData, setSaveData] = useState(false);
  // "Painted", not "imported" — see ReadySignal in RetroTVCanvas.
  const [ready, setReady] = useState(false);
  const handleReady = useCallback(() => setReady(true), []);

  // A channel change unmounts the guide; make sure any other navigation does too.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  /*
   * Defer the three.js chunk until the browser is idle.
   *
   * The TV is pinned to the corner, so it is on screen from the first paint and
   * there is no scroll position to wait for. Idle time keeps the ~264KB off the
   * critical path instead; the trigger and the channel guide are pure DOM and
   * work in full before the canvas arrives, so nothing is gated on it.
   */
  useEffect(() => {
    if (webgl !== true || load3D) return;

    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    if (connection?.saveData) {
      setSaveData(true);
      return;
    }

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(() => setLoad3D(true), {
        timeout: 2500,
      });
      return () => window.cancelIdleCallback?.(id);
    }

    const timer = window.setTimeout(() => setLoad3D(true), 1200);
    return () => window.clearTimeout(timer);
  }, [webgl, load3D]);

  /*
   * Say out loud why the plain switcher was chosen. Without this, a fallback is
   * indistinguishable from a broken 3D canvas — the corner just quietly shows a
   * button and there is nothing to go on.
   */
  useEffect(() => {
    if (webgl === null) return;
    const reason = !webgl
      ? "no usable WebGL context (hardware acceleration disabled, or the browser's context limit is exhausted — try closing other WebGL tabs)"
      : saveData
        ? "Data Saver is enabled"
        : canvasFailed
          ? "the 3D canvas threw at runtime (see the error above)"
          : null;

    if (reason) {
      console.info(
        `[time-machine] Showing the fallback version switcher: ${reason}.`
      );
    }
  }, [webgl, saveData, canvasFailed]);

  /*
   * `T` opens the guide from anywhere — until now the only way in was to find
   * and click the tube.
   *
   * The enabled flag mirrors the early returns below rather than living after
   * them, because hooks cannot be called conditionally. Without it the key
   * would appear to do nothing on a route with no TV, or when the fallback
   * switcher is showing and `open` drives nothing.
   */
  const guideAvailable =
    knownPaths.includes(location.pathname) &&
    webgl === true &&
    !saveData &&
    !canvasFailed;

  useGlobalShortcut(
    GLOBAL_KEYS.timeMachine,
    () => setOpen((o) => !o),
    guideAvailable
  );

  // Hidden on 404 and any route not part of a portfolio version.
  if (!knownPaths.includes(location.pathname)) return null;

  // `null` means detection hasn't run yet — render nothing for one tick rather
  // than flashing the fallback button before the canvas can take over.
  if (webgl === null) return null;

  // No WebGL, an explicit data-saver preference, or a canvas that died at
  // runtime all land on the original button-and-dialog switcher.
  if (!webgl || saveData || canvasFailed) return <VersionSwitcher />;

  const trigger = (
    <TVTrigger
      driver={driver}
      reducedMotion={reducedMotion}
      onOpen={() => setOpen(true)}
      ready={ready}
    >
      {load3D && (
        <CanvasErrorBoundary onError={() => setCanvasFailed(true)}>
          <Suspense fallback={null}>
            <RetroTVCanvas
              driver={driver}
              reducedMotion={reducedMotion}
              onReady={handleReady}
            />
          </Suspense>
        </CanvasErrorBoundary>
      )}
    </TVTrigger>
  );

  return (
    <>
      {/* Pinned bottom-right on every route, matching the archived v1 layout. */}
      <div className="fixed bottom-1 right-1 z-10001 sm:bottom-3 sm:right-3 print:hidden">
        {trigger}
      </div>

      <AnimatePresence>
        {open && (
          <ChannelGuide
            reducedMotion={reducedMotion}
            onClose={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
