import { useCallback, useEffect, useRef, useState } from "react";

import { firebaseConfig, isFirebaseConfigured } from "@/lib/firebase";

export type VisitorStats = {
  totalVisits: number;
  visitsToday: number;
  peakToday: number;
};

/** One increment per browser session, not per route change. */
const SESSION_KEY = "yjaphzs:counted";

/** UTC day key, so the rollover is the same for every visitor regardless of zone. */
const dayId = () => `day-${new Date().toISOString().slice(0, 10)}`;

/**
 * Durable visitor aggregates in Firestore.
 *
 * Split of responsibilities: Realtime Database owns the LIVE count because it is
 * the only Firebase product with server-side `onDisconnect`. Firestore owns the
 * durable totals, which is what it is actually good at. Two products, one
 * `initializeApp`.
 *
 * Uses `firebase/firestore/lite` — the panel opens on click and reads once, so
 * realtime listeners would be dead weight. Lite still provides getDoc, updateDoc
 * and increment, and is markedly smaller than the full SDK.
 *
 * Everything is lazy: nothing here is imported until `load()` is called, so
 * Firestore never reaches the entry chunk.
 */
export function useVisitorStats() {
  const [stats, setStats] = useState<VisitorStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const counted = useRef(false);

  const load = useCallback(async () => {
    if (!isFirebaseConfigured) {
      setError(true);
      return;
    }

    setLoading(true);
    try {
      const [{ initializeApp, getApps }, fs] = await Promise.all([
        import("firebase/app"),
        import("firebase/firestore/lite"),
      ]);

      const app = getApps()[0] ?? initializeApp(firebaseConfig);
      const db = fs.getFirestore(app);

      const globalRef = fs.doc(db, "stats", "global");
      const dayRef = fs.doc(db, "stats", dayId());

      // Count this visitor once per session. sessionStorage rather than
      // localStorage on purpose: a persistent id would be a tracking cookie in
      // all but name, and this only needs to survive the tab.
      if (!counted.current && !sessionStorage.getItem(SESSION_KEY)) {
        counted.current = true;
        sessionStorage.setItem(SESSION_KEY, "1");
        // Fire and forget. Rules permit exactly +1 on one field, so a rejected
        // write costs a wrong number and nothing else — never block the panel.
        void fs
          .updateDoc(globalRef, {
            totalVisits: fs.increment(1),
            updatedAt: fs.serverTimestamp(),
          })
          .catch(() => {});
        void fs
          .updateDoc(dayRef, {
            visits: fs.increment(1),
            updatedAt: fs.serverTimestamp(),
          })
          .catch(() => {});
      }

      const [globalSnap, daySnap] = await Promise.all([
        fs.getDoc(globalRef),
        fs.getDoc(dayRef),
      ]);

      setStats({
        totalVisits: globalSnap.data()?.totalVisits ?? 0,
        visitsToday: daySnap.data()?.visits ?? 0,
        peakToday: daySnap.data()?.peak ?? 0,
      });
    } catch (e) {
      // A missing document, blocked network or rejected rule must not take the
      // page down — the panel shows an unavailable state instead.
      console.warn("[stats] unavailable:", e);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  return { stats, loading, error, load };
}

/**
 * Raises today's recorded peak when the live count exceeds it.
 *
 * Separate from the reader above because it is driven by the RTDB presence
 * count, which changes independently of anyone opening the panel.
 */
export function usePeakReporter(liveCount: number, enabled: boolean) {
  const reported = useRef(0);

  useEffect(() => {
    if (!enabled || !isFirebaseConfigured) return;
    if (liveCount <= reported.current || liveCount < 2) return;

    reported.current = liveCount;
    let cancelled = false;

    (async () => {
      try {
        const [{ initializeApp, getApps }, fs] = await Promise.all([
          import("firebase/app"),
          import("firebase/firestore/lite"),
        ]);
        if (cancelled) return;

        const app = getApps()[0] ?? initializeApp(firebaseConfig);
        const ref = fs.doc(fs.getFirestore(app), "stats", dayId());
        const snap = await fs.getDoc(ref);
        const current = (snap.data()?.peak as number) ?? 0;

        // Rules only allow peak to ratchet upward, so a stale read simply fails.
        if (liveCount > current) {
          await fs.updateDoc(ref, {
            peak: liveCount,
            updatedAt: fs.serverTimestamp(),
          });
        }
      } catch {
        // Peak tracking is best-effort; never surface it.
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [liveCount, enabled]);
}
