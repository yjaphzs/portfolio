/**
 * CSS stand-in shown until the WebGL TV has actually painted a frame.
 *
 * Covers the whole gap, not just part of it: the dormant period before the
 * chunk is requested, the ~264KB download, and the model decode. Previously the
 * corner went empty the moment loading began, because the placeholder was tied
 * to "has loading started" rather than "is the TV on screen".
 *
 * Proportioned to land roughly where the rendered model does, so the crossfade
 * reads as the set warming up rather than one object swapping for another.
 */
export function TVPlaceholder({ ready }: { ready: boolean }) {
  return (
    <span
      aria-hidden
      data-tv-placeholder={ready ? "hidden" : "visible"}
      className={`pointer-events-none absolute inset-[19%] rounded-md border border-white/10 bg-[#3a3d42] shadow-lg transition-opacity duration-500 ${
        ready ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Tube */}
      <span className="absolute inset-x-[8%] top-[8%] bottom-[26%] overflow-hidden rounded-sm bg-[#11161c] shadow-[inset_0_0_12px_rgba(159,220,255,0.25)]">
        {!ready && (
          <>
            {/* Reuses the same turbulence noise as the channel guide. */}
            <span className="crt-noise absolute -inset-[10%] opacity-30" />
            <span className="tv-tune-sweep absolute inset-x-0 top-0 h-1/3 bg-linear-to-b from-transparent via-sky-200/40 to-transparent" />
          </>
        )}
      </span>

      {/* Control strip */}
      <span className="absolute inset-x-[8%] bottom-[8%] h-[12%] rounded-[2px] bg-[#26292e]" />

      {/* Standby lamp — pulses while tuning, steady once the set is live */}
      <span
        className={`absolute bottom-[10%] right-[12%] h-[4%] w-[4%] rounded-full bg-sky-300 ${
          ready ? "opacity-30" : "tv-standby-pulse"
        }`}
      />
    </span>
  );
}
