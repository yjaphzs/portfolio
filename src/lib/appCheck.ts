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
  if (!isFirebaseConfigured || !firebaseConfig.recaptchaSiteKey) {
    return Promise.resolve();
  }
  if (initialized.has(app)) return Promise.resolve();

  if (!pending) {
    pending = (async () => {
      try {
        const { initializeAppCheck, ReCaptchaV3Provider } = await import(
          "firebase/app-check"
        );

        if (import.meta.env.DEV) {
          // Registered per-browser under App Check → Apps → Manage debug
          // tokens, so local dev passes enforcement without a real challenge.
          (self as unknown as Record<string, unknown>).FIREBASE_APPCHECK_DEBUG_TOKEN =
            true;
        }

        initializeAppCheck(app, {
          provider: new ReCaptchaV3Provider(firebaseConfig.recaptchaSiteKey),
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
