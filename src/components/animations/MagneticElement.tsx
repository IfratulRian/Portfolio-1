import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

interface MagneticElementProps {
  children: React.ReactNode;
  className?: string;
  strength?: number; // 0.1 to 0.5 (default: 0.3 per ui-ux-pro-max guidelines)
  active?: boolean;
}

/**
 * MagneticElement
 * Implements Preset #3 (Hover Micro-interaction - Complex tier: Magnetic follow)
 * from nextlevelbuilder/ui-ux-pro-max-skill.
 *
 * Pulls smoothly towards cursor with elastic physics on hover,
 * clamps max displacement to prevent escaping hit box,
 * and resets with elastic spring on leave.
 * Respects prefers-reduced-motion.
 */
export default function MagneticElement({
  children,
  className = "",
  strength = 0.3,
  active = true,
}: MagneticElementProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;
    const el = containerRef.current;
    if (!el) return;

    // Accessibility check: Skip animation if reduced motion preferred
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    // Quick setters for high performance compositing
    const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power2.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power2.out" });

    const onPointerMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Distance from center
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      // Clamp max displacement so element never leaves its hit area
      const maxPull = 18;
      const pullX = Math.max(-maxPull, Math.min(maxPull, deltaX * strength));
      const pullY = Math.max(-maxPull, Math.min(maxPull, deltaY * strength));

      xTo(pullX);
      yTo(pullY);
    };

    const onPointerLeave = () => {
      // Elastic spring back to neutral
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1.2, 0.4)",
        overwrite: "auto",
      });
    };

    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerleave", onPointerLeave);

    return () => {
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerleave", onPointerLeave);
      gsap.killTweensOf(el);
    };
  }, [strength, active]);

  return (
    <div
      ref={containerRef}
      className={`magnetic-wrap inline-block will-change-transform ${className}`}
      style={{ display: "inline-block" }}
    >
      {children}
    </div>
  );
}
