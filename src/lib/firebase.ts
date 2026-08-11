/**
 * Firebase configuration, read from Vite env vars. See `.env.example`.
 *
 * Deliberately does NOT import the Firebase SDK — this module is safe to pull
 * into the eager bundle because it only reads strings. The ~48KB RTDB client is
 * dynamically imported by the presence hook when it is actually needed.
 *
 * Every value is public by design: Vite inlines VITE_* vars into the built
 * bundle, and the Firebase web API key is an identifier rather than a
 * credential. Access control lives in `database.rules.json`.
 */

/**
 * The only fields Realtime Database actually needs.
 *
 * `storageBucket` and `messagingSenderId` appear in the console's config block
 * and are accepted below, but they belong to Storage and Cloud Messaging —
 * neither of which this site uses. They are excluded from the readiness check on
 * purpose: requiring them would silently disable the presence counter for anyone
 * who filled in only what RTDB needs.
 */
const REQUIRED = [
  "apiKey",
  "authDomain",
  "projectId",
  "appId",
  "databaseURL",
] as const;

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  // App Check is opt-in on top of the above, not required by it — see
  // `lib/appCheck.ts`. The debug token is dev-only, never read in a build.
  appCheckSiteKey: import.meta.env.VITE_FIREBASE_APP_CHECK_SITE_KEY,
  appCheckDebugToken: import.meta.env.VITE_FIREBASE_APP_CHECK_DEBUG_TOKEN,
};

/**
 * True when every field RTDB needs is present.
 *
 * Presence is optional: with no config the site builds and runs normally and the
 * counter never appears. This is what keeps a fresh clone — and a CI build with
 * no repository variables set — working without a Firebase project.
 */
export const isFirebaseConfigured = REQUIRED.every(
  (key) => typeof config[key] === "string" && config[key].length > 0
);

/**
 * Config key → env var name. Written out rather than derived: a naive
 * camelCase-to-SNAKE_CASE conversion turns `databaseURL` into
 * `VITE_FIREBASE_DATABASE_U_R_L`, which would send anyone debugging a missing
 * variable looking for the wrong name.
 */
const ENV_NAME: Record<(typeof REQUIRED)[number], string> = {
  apiKey: "VITE_FIREBASE_API_KEY",
  authDomain: "VITE_FIREBASE_AUTH_DOMAIN",
  projectId: "VITE_FIREBASE_PROJECT_ID",
  appId: "VITE_FIREBASE_APP_ID",
  databaseURL: "VITE_FIREBASE_DATABASE_URL",
};

/** Names of any missing required vars, for a useful console warning. */
export const missingFirebaseKeys = REQUIRED.filter((key) => !config[key]).map(
  (key) => ENV_NAME[key]
);

export const firebaseConfig = config;
