"use client";

import { useEffect, useRef } from "react";

/**
 * useReveal — IntersectionObserver hook for scroll-triggered reveal animations.
 *
 * Attach the returned ref to any element with the `.reveal` CSS class.
 * The hook observes the element and adds the `.is-visible` class when it
 * enters the viewport, triggering the CSS transition defined in globals.css.
 *
 * Usage:
 *   const ref = useReveal<HTMLDivElement>();
 *   return <div ref={ref} className="reveal">...</div>;
 *
 * Or for a container of multiple `.reveal` children:
 *   const ref = useReveal<HTMLDivElement>({ childSelector: ".reveal" });
 *   return <div ref={ref}>
 *     <div className="reveal">...</div>
 *     <div className="reveal">...</div>
 *   </div>;
 *
 * The observer disconnects after the element becomes visible (one-shot).
 * Falls back to immediately visible if IntersectionObserver is unavailable.
 */

interface UseRevealOptions {
  /** If provided, observes all `.reveal` descendants of the attached element. */
  childSelector?: string;
  /** Viewport ratio that triggers reveal. Default 0.15 (15% visible). */
  threshold?: number;
  /** Root margin — pull reveal earlier/later. Default: reveal 80px before entry. */
  rootMargin?: string;
  /** If true, stays observed (reveals can re-trigger on scroll back). Default false. */
  persistent?: boolean;
}

export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseRevealOptions = {}
) {
  const { childSelector, threshold = 0.15, rootMargin = "0px 0px -80px 0px", persistent = false } = options;
  const ref = useRef<T>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Fallback: if IntersectionObserver is unavailable, just add is-visible.
    if (typeof IntersectionObserver === "undefined") {
      if (childSelector) {
        node.querySelectorAll(childSelector).forEach((el) => el.classList.add("is-visible"));
      } else {
        node.classList.add("is-visible");
      }
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            if (!persistent) {
              observer.unobserve(entry.target);
            }
          } else if (persistent) {
            entry.target.classList.remove("is-visible");
          }
        }
      },
      { threshold, rootMargin }
    );

    if (childSelector) {
      const children = node.querySelectorAll(childSelector);
      children.forEach((child) => observer.observe(child));
      // Also observe the container itself if it has .reveal
      if (node.classList.contains("reveal")) observer.observe(node);
    } else {
      observer.observe(node);
    }

    return () => observer.disconnect();
  }, [childSelector, threshold, rootMargin, persistent]);

  return ref;
}
