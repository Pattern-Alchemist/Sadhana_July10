"use client";

import { useEffect, useRef } from "react";

/**
 * useScrollReveal — IntersectionObserver-based scroll reveal that triggers
 * the cinematic scroll-reveal CSS animation when elements enter the viewport.
 *
 * Usage:
 *   const ref = useScrollReveal<HTMLDivElement>();
 *   return <div ref={ref} className="scroll-reveal">...</div>
 *
 * Or on a container with multiple children:
 *   const ref = useScrollReveal<HTMLDivElement>();
 *   return <div ref={ref} className="scroll-reveal">{children}</div>
 *
 * The element starts with animation-play-state: paused (invisible).
 * When it enters the viewport, .is-visible is added, which runs the animation.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: { threshold?: number; rootMargin?: string } = {}
) {
  const { threshold = 0.1, rootMargin = "0px 0px -60px 0px" } = options;
  const ref = useRef<T>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      node.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return ref;
}
