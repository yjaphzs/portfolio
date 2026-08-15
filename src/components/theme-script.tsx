/**
 * Applies the stored theme to <html> before the browser's first paint.
 *
 * Every route is prerendered to static HTML at build time, and that HTML cannot
 * know the visitor's preference — so it ships with no theme class at all. Left
 * to `ThemeProvider`'s effect, the class would only land after the JS bundle
 * downloads, parses and hydrates, and a dark-mode visitor would stare at a full
 * white page until then. This is a blocking inline script in <head> for exactly
 * that reason: it must run before anything is painted, so it cannot be deferred
 * and it cannot be a module.
 *
 * The default is `dark` when nothing is stored and the OS has no opinion — the
 * design is dark-first and light is the port.
 *
 * Keep `storageKey` in sync with the value passed to ThemeProvider.
 */
export function ThemeScript({
  storageKey = "portfolio-theme",
}: {
  storageKey?: string;
}) {
  const js = `(function(){try{
var s=localStorage.getItem(${JSON.stringify(storageKey)});
var t=(s==="dark"||s==="light")?s:(window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");
var e=document.documentElement;
e.classList.remove("light","dark");
e.classList.add(t);
e.style.colorScheme=t;
}catch(e){}})();`;

  return (
    <script
      // The one place raw HTML injection is correct: the script has to be
      // inline and synchronous, and its content is a compile-time constant.
      dangerouslySetInnerHTML={{ __html: js }}
      suppressHydrationWarning
    />
  );
}
