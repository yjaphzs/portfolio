import { useEffect, useState } from "react";

/**
 * Probes for a usable WebGL context.
 *
 * This runs BEFORE the lazy import of the 3D canvas on purpose: `<Canvas fallback>`
 * only catches context-creation failure after three.js has already been downloaded,
 * which wastes ~260KB on a machine that can never render it.
 *
 * Returns `null` while undetermined so callers can hold off rather than flashing
 * the fallback UI on the first paint.
 */
function detect(): boolean {
  let ctx: WebGLRenderingContext | WebGL2RenderingContext | null = null;
  try {
    const canvas = document.createElement("canvas");
    ctx = (canvas.getContext("webgl2") ??
      canvas.getContext("webgl")) as
      | WebGLRenderingContext
      | WebGL2RenderingContext
      | null;
    return !!ctx;
  } catch {
    return false;
  } finally {
    /*
     * Release the probe context immediately.
     *
     * Browsers cap live WebGL contexts (~16 in Chrome) and drop the oldest when
     * the cap is hit. A probe left open counts against that cap — doubled by
     * StrictMode's double-invoked effects, and once more on every HMR reload —
     * so a long dev session would eventually starve the real canvas and fall
     * back to the plain switcher with no obvious cause.
     */
    ctx?.getExtension("WEBGL_lose_context")?.loseContext();
  }
}

export function useWebGLSupport(): boolean | null {
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    setSupported(detect());
  }, []);

  return supported;
}
