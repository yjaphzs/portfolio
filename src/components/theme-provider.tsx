"use client";

import { useEffect, useMemo, useState } from "react";
import { ThemeProviderContext, type Theme, type ThemeProviderState } from "@/hooks/useTheme";

type ThemeProviderProps = {
    children: React.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
};

function isTheme(value: unknown): value is Theme {
    return value === "dark" || value === "light" || value === "system";
}

/**
 * Theme state, resolved in two passes.
 *
 * Both `useState` initialisers are deliberately pure constants rather than
 * reads of `localStorage` / `matchMedia`. Those globals do not exist while the
 * pages are prerendered to HTML at build time, and reading them during render
 * would both crash the build and desync the first client render from the
 * server's markup. The stored preference is adopted in an effect instead, so
 * server and first client render agree exactly and React only commits the real
 * theme on the pass after mount.
 *
 * That leaves one frame where React believes the theme is `light`. The page is
 * not actually light during it — `components/theme-script.tsx` sets the class on
 * <html> before first paint — so this is invisible except to JS that reads
 * `resolvedTheme` synchronously on mount.
 */
export function ThemeProvider({
    children,
    defaultTheme = "system",
    storageKey = "portfolio-theme",
    ...props
}: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(defaultTheme);
    const [systemTheme, setSystemTheme] = useState<"dark" | "light">("light");

    // Adopt the stored choice and the OS preference, then follow OS changes.
    useEffect(() => {
        let stored: string | null = null;
        try {
            stored = localStorage.getItem(storageKey);
        } catch {
            // Storage can be blocked (private mode, embedded contexts).
            // The default theme is a fine answer when it is.
        }
        if (isTheme(stored)) setTheme(stored);

        const mq = window.matchMedia("(prefers-color-scheme: dark)");
        setSystemTheme(mq.matches ? "dark" : "light");

        const handler = (e: MediaQueryListEvent) =>
            setSystemTheme(e.matches ? "dark" : "light");
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, [storageKey]);

    const resolvedTheme = theme === "system" ? systemTheme : theme;

    // Apply class to <html>
    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(resolvedTheme);
        // Keeps form controls, scrollbars and the UA's own surfaces in step.
        root.style.colorScheme = resolvedTheme;
    }, [resolvedTheme]);

    const value = useMemo<ThemeProviderState>(
        () => ({
            theme,
            resolvedTheme,
            setTheme: (next: Theme) => {
                try {
                    localStorage.setItem(storageKey, next);
                } catch {
                    // Non-persisted is better than a thrown click handler.
                }
                setTheme(next);
            },
        }),
        [theme, resolvedTheme, storageKey]
    );

    return (
        <ThemeProviderContext.Provider {...props} value={value}>
            {children}
        </ThemeProviderContext.Provider>
    );
}
