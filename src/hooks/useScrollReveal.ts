import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface ScrollRevealOptions {
  itemSelector?: string;
  stagger?: number;
  yOffset?: number;
  threshold?: number;
  duration?: number;
  ease?: string;
  scale?: number;
}

/**
 * useScrollReveal
 * Implements Preset #5 (Scroll Reveal - Standard) & Preset #8 (Stagger List - Standard: Bento wave stagger)
 * from nextlevelbuilder/ui-ux-pro-max-skill.
 *
 * Staggers items in upon entering the viewport with back.out spring easing.
 * Respects prefers-reduced-motion.
 */
export function useScrollReveal<T extends HTMLElement>({
  itemSelector = "> *",
  stagger = 0.07,
  yOffset = 22,
  threshold = 0.12,
  duration = 0.45,
  ease = "back.out(1.3)",
  scale = 0.97,
}: ScrollRevealOptions = {}) {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const items = container.querySelectorAll(itemSelector);
    if (!items.length) return;

    // Set initial state
    gsap.set(items, {
      opacity: 0,
      y: yOffset,
      scale: scale,
    });

    let hasTriggered = false;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasTriggered) {
          hasTriggered = true;

          gsap.to(items, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration,
            stagger: {
              each: stagger,
              from: "start",
            },
            ease,
            clearProps: "transform,opacity", // keep clean DOM styling after entrance
          });

          observer.unobserve(container);
        }
      },
      { threshold }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      gsap.killTweensOf(items);
    };
  }, [itemSelector, stagger, yOffset, threshold, duration, ease, scale]);

  return containerRef;
}
