"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Sun, Moon } from "lucide-react";

/**
 * ThemeToggle — modern-web-guidance/dark-mode-toggle
 * 
 * Two-state toggle following the recommended storage divergence protocol:
 * 1. Compute the target scheme (opposite of current).
 * 2. If the target differs from the current system preference, store it.
 * 3. If the target matches the current system preference, remove stored value
 *    so the site follows the system again.
 * 4. Apply via data-theme attribute + meta theme-color.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  // Derive effective theme from storage + system on mount
  useEffect(() => {
    const stored = localStorage.getItem("theme-preference");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const effective = stored === "light" || stored === "dark" ? stored : (systemDark ? "dark" : "dark");
    applyTheme(effective);
    setTheme(effective);
    setMounted(true);

    // Listen for system preference changes when no stored override
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme-preference")) {
        const next = e.matches ? "dark" : "light";
        applyTheme(next);
        setTheme(next);
      }
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const applyTheme = (t: string) => {
    document.documentElement.setAttribute("data-theme", t);
    // Update meta theme-color for browser chrome
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", t === "dark" ? "#090d16" : "#f8fafc");
  };

  const toggleTheme = useCallback(() => {
    const target = theme === "dark" ? "light" : "dark";
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const systemTheme = systemPrefersDark ? "dark" : "light";

    // Storage divergence protocol per modern-web-guidance/dark-mode-toggle
    if (target === systemTheme) {
      localStorage.removeItem("theme-preference");
    } else {
      localStorage.setItem("theme-preference", target);
    }

    applyTheme(target);
    setTheme(target);
  }, [theme]);

  // Prevent hydration mismatch flash
  if (!mounted) return <div className="w-9 h-9" />;

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      aria-pressed={theme === "light"}
      className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-all"
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 text-amber-400" />
      ) : (
        <Moon className="w-4 h-4 text-sky-400" />
      )}
    </button>
  );
}
