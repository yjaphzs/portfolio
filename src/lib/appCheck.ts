import type { FirebaseApp } from "firebase/app";

import { firebaseConfig, isFirebaseConfigured } from "@/lib/firebase";

/**
 * Attests requests to Realtime Database and Firestore with reCAPTCHA v3, so
 * that once enforcement is switched on for those products in the App Check
 * console, only this site's own client can read or write them.
 *
 * Optional like the rest of Firebase here: with no site key, this is a no-op
 * and every service behaves exactly as it did before App Check existed. It is
 * also idempotent per `FirebaseApp` — every hook that touches Firebase calls
 * this before it does anything else, and only the first call does real work.
 */
const initialized = new WeakSet<FirebaseApp>();
let pending: Promise<void> | null = null;

export function ensureAppCheck(app: FirebaseApp): Promise<void> {
  // Bound to a const so the guard below narrows it for the async closure too;
  // reading the property again inside would be `string | undefined` again.
  const siteKey = firebaseConfig.appCheckSiteKey;

  if (!isFirebaseConfigured || !siteKey) {
    return Promise.resolve();
  }
  if (initialized.has(app)) return Promise.resolve();

  if (!pending) {
    pending = (async () => {
      try {
        const { initializeAppCheck, ReCaptchaV3Provider } = await import(
          "firebase/app-check"
        );

        if (process.env.NODE_ENV !== "production") {
          // A fixed token registered under App Check → Apps → Manage debug
          // tokens, so local dev passes enforcement without reprovisioning a
          // new one every session. Falls back to `true`, which mints a fresh
          // token and logs it to the console for one-time registration.
          (self as unknown as Record<string, unknown>).FIREBASE_APPCHECK_DEBUG_TOKEN =
            firebaseConfig.appCheckDebugToken || true;
        }

        initializeAppCheck(app, {
          provider: new ReCaptchaV3Provider(siteKey),
          isTokenAutoRefreshEnabled: true,
        });
        initialized.add(app);
      } catch (error) {
        // A blocked script, ad blocker or misconfigured key must not take
        // down presence/stats — they simply go unattested.
        console.warn("[app-check] disabled:", error);
      }
    })();
  }

  return pending;
}
