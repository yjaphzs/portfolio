import { useCallback, useEffect, useRef, useState } from "react";

import { ensureAppCheck } from "@/lib/appCheck";
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
      await ensureAppCheck(app);
      const db = fs.getFirestore(app);

      const globalRef = fs.doc(db, "stats", "global");
      const dayRef = fs.doc(db, "stats", dayId());

      // Count this visitor once per session. sessionStorage rather than
      // localStorage on purpose: a persistent id would be a tracking cookie in
      // all but name, and this only needs to survive the tab.
      if (!counted.current && !sessionStorage.getItem(SESSION_KEY)) {
        counted.current = true;
        sessionStorage.setItem(SESSION_KEY, "1");
        // setDoc + merge, not updateDoc: the doc may not exist yet (first ever
        // visit, or first visit of the day), and updateDoc can never create
        // one — it carries an `exists: true` precondition and answers 404.
        //
        // Awaited, not fire-and-forget. firestore/lite has no local cache, so
        // reading in the same tick as the write always returned the
        // pre-increment value and the first panel open of a session showed a
        // stale number. Costs one round trip, once per session, behind the
        // sessionStorage guard above.
        //
        // Settled rather than all: a rejected write must cost a wrong number
        // and nothing else. Rules permit exactly +1 (or a fresh doc at its
        // first legitimate value), so a rejection means the rules and this
        // client disagree — worth a warning, never a blocked panel.
        const writes = await Promise.allSettled([
          fs.setDoc(
            globalRef,
            { totalVisits: fs.increment(1), updatedAt: fs.serverTimestamp() },
            { merge: true },
          ),
          fs.setDoc(
            dayRef,
            { visits: fs.increment(1), updatedAt: fs.serverTimestamp() },
            { merge: true },
          ),
        ]);

        // Silence here is what hid this bug for so long: the reads kept
        // succeeding, so the panel rendered a confident 0 instead of an error.
        for (const write of writes) {
          if (write.status === "rejected") {
            console.warn("[stats] counter write rejected:", write.reason);
          }
        }
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
        await ensureAppCheck(app);
        if (cancelled) return;

        const ref = fs.doc(fs.getFirestore(app), "stats", dayId());
        const snap = await fs.getDoc(ref);
        const current = (snap.data()?.peak as number) ?? 0;

        // Rules only allow peak to ratchet upward, so a stale read simply fails.
        // setDoc + merge, not updateDoc: the day doc may not exist yet.
        if (liveCount > current) {
          await fs.setDoc(
            ref,
            { peak: liveCount, updatedAt: fs.serverTimestamp() },
            { merge: true },
          );
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
