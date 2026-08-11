import { useEffect, useState } from "react";

import { ensureAppCheck } from "@/lib/appCheck";
import { firebaseConfig, isFirebaseConfigured } from "@/lib/firebase";

export type Presence = {
  count: number;
  /** True once a real backend is reporting. False keeps the UI honest. */
  live: boolean;
};

/**
 * Live viewer count, backed by Firebase Realtime Database.
 *
 * RTDB is the only Firebase product with server-side disconnect detection, which
 * is the whole reason it wins here: `onDisconnect` is registered on the server,
 * so a killed tab, a dropped connection or a force-quit still cleans up.
 * `beforeunload` does not fire reliably and cannot be used. Firestore has no
 * equivalent — its documented workaround routes through RTDB plus a Cloud
 * Function, which is not on the free tier.
 *
 * The SDK is dynamically imported so its ~48KB gzip never reaches the entry
 * chunk — that is roughly React's own weight, spent on a decorative widget.
 *
 * With no config in `.env`, this returns `live: false` and the UI renders
 * nothing rather than inventing a number.
 */
export function usePresence(): Presence {
  const [count, setCount] = useState(0);
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (!isFirebaseConfigured) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      try {
        const [{ initializeApp, getApps }, db] = await Promise.all([
          import("firebase/app"),
          import("firebase/database"),
        ]);
        if (cancelled) return;

        const app = getApps()[0] ?? initializeApp(firebaseConfig);
        await ensureAppCheck(app);
        if (cancelled) return;

        const database = db.getDatabase(app);
        const presenceRef = db.ref(database, "presence");
        const connectedRef = db.ref(database, ".info/connected");

        let myRef: ReturnType<typeof db.push> | null = null;

        const offConnected = db.onValue(connectedRef, (snap) => {
          if (snap.val() !== true) return;
          myRef = db.push(presenceRef);
          // Registered BEFORE the write, so the server removes the node even if
          // this client never gets another chance to speak.
          db.onDisconnect(myRef).remove();
          db.set(myRef, { at: db.serverTimestamp() });
        });

        const offCount = db.onValue(presenceRef, (snap) => {
          if (cancelled) return;
          setCount(snap.size);
          setLive(true);
        });

        cleanup = () => {
          offConnected();
          offCount();
          if (myRef) db.remove(myRef);
        };
      } catch (error) {
        // A missing database, blocked network or bad rules must not take the
        // page down — the widget just stays hidden.
        console.warn("[presence] disabled:", error);
      }
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return { count, live };
}
