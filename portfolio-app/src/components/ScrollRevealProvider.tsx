"use client";

import React, { useEffect, useRef } from "react";

/**
 * ScrollRevealProvider — modern-web-guidance/scroll-entry-exit-effects
 *
 * Wraps a child section and applies the CSS `scroll-reveal` class for native
 * scroll-driven animations in supported browsers (Chrome 115+, Safari 26+).
 *
 * For unsupported browsers (Firefox), falls back to IntersectionObserver-based
 * `.scroll-reveal-js` + `.is-visible` class toggling, as recommended by the guide.
 *
 * Respects `prefers-reduced-motion: reduce` — the CSS disables animations
 * and the JS path skips observer setup entirely.
 */
export default function ScrollRevealProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check if native scroll-driven animations are supported
    const supportsNative = CSS.supports(
      "(animation-timeline: view()) and (animation-range: entry)"
    );

    if (supportsNative) {
      // Native CSS handles everything via .scroll-reveal class
      el.classList.add("scroll-reveal");
      return;
    }

    // Check if user prefers reduced motion — if so, skip JS animation entirely
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Fallback: IntersectionObserver for .scroll-reveal-js
    el.classList.add("scroll-reveal-js");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            // Once revealed, stop observing (one-shot entrance)
            observer.unobserve(entry.target);
          }
        }
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.1,
      }
    );

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, []);

  return <div ref={ref}>{children}</div>;
}
