/**
 * App Hub promo.
 *
 * v2's version used a hardcoded rainbow conic gradient
 * (#f97316 #ec4899 #8b5cf6 #3b82f6 #06b6d4), which directly contradicts the
 * design language's first rule: cyan is the only signal colour. Rebuilt from the
 * phosphor tokens so the rotating border still reads as "alive" without
 * introducing five competing hues.
 *
 * The rotation depends on the `@property --gradient-angle` registration in
 * index.css — a conic gradient cannot interpolate an unregistered custom
 * property and would jump 0→360 instead of sweeping.
 */
export function AppHubCard() {
  return (
    <div className="group relative rounded-xl p-px">
      <span
        aria-hidden
        className="crt-border-rotate absolute -inset-1 rounded-xl opacity-25 blur-lg transition-opacity duration-500 group-hover:opacity-50"
      />
      <span
        aria-hidden
        className="crt-border-rotate absolute inset-0 rounded-xl opacity-60 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative rounded-xl bg-crt-surface p-5">
        <p className="font-crt-mono text-[10px] uppercase tracking-[0.05em] text-crt-muted">
          App Hub
        </p>
        <p className="mt-2 text-[14px] text-crt-secondary">
          All my personal web apps in one place.
        </p>
        <a
          href="https://app-hub.yjaphzs.xyz"
          target="_blank"
          rel="noreferrer noopener"
          className="mt-3 inline-block font-crt-mono text-[11px] uppercase tracking-[0.05em] text-crt-accent no-underline transition-colors hover:text-crt-ink"
        >
          Visit App Hub ↗
        </a>
      </div>
    </div>
  );
}
