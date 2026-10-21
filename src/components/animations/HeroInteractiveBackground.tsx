import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * HeroInteractiveBackground
 * Implements Preset #13 & #14 (Parallax Scroll & Subtle Ambient Depth)
 * from nextlevelbuilder/ui-ux-pro-max-skill.
 *
 * Layers multiple orbital rings and decorative ambient glows that subtly shift
 * with mouse movement, creating multi-plane depth while respecting reduced motion.
 */
export default function HeroInteractiveBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbit1Ref = useRef<HTMLDivElement>(null);
  const orbit2Ref = useRef<HTMLDivElement>(null);
  const orbit3Ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const orbit1 = orbit1Ref.current;
    const orbit2 = orbit2Ref.current;
    const orbit3 = orbit3Ref.current;
    const glow = glowRef.current;

    if (!orbit1 || !orbit2 || !orbit3 || !glow) return;

    // QuickTo setters for smooth continuous tracking without GC churn
    const xTo1 = gsap.quickTo(orbit1, "x", { duration: 0.8, ease: "power2.out" });
    const yTo1 = gsap.quickTo(orbit1, "y", { duration: 0.8, ease: "power2.out" });

    const xTo2 = gsap.quickTo(orbit2, "x", { duration: 0.6, ease: "power2.out" });
    const yTo2 = gsap.quickTo(orbit2, "y", { duration: 0.6, ease: "power2.out" });

    const xTo3 = gsap.quickTo(orbit3, "x", { duration: 1.1, ease: "power1.out" });
    const yTo3 = gsap.quickTo(orbit3, "y", { duration: 1.1, ease: "power1.out" });

    const xGlow = gsap.quickTo(glow, "x", { duration: 0.9, ease: "power2.out" });
    const yGlow = gsap.quickTo(glow, "y", { duration: 0.9, ease: "power2.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const normY = (e.clientY / innerHeight - 0.5) * 2;

      // Multi-layer depth parallax (slowest to fastest)
      xTo1(normX * 18);
      yTo1(normY * 18);

      xTo2(normX * -28);
      yTo2(normY * -28);

      xTo3(normX * 12);
      yTo3(normY * 12);

      xGlow(normX * 35);
      yGlow(normY * 35);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="hero-interactive-bg absolute inset-0 overflow-hidden pointer-events-none select-none z-0"
      aria-hidden="true"
    >
      {/* Ambient gradient aura */}
      <div
        ref={glowRef}
        className="hero-ambient-glow absolute -top-20 -right-20 w-[550px] h-[550px] rounded-full blur-[90px] opacity-25"
        style={{
          background:
            "radial-gradient(circle, var(--accent) 0%, var(--mint) 65%, transparent 80%)",
        }}
      />

      {/* Orbit 1: Outer delicate ring */}
      <div
        ref={orbit1Ref}
        className="hero-orbit orbit-one will-change-transform"
      />

      {/* Orbit 2: Inner soft mint translucent disc */}
      <div
        ref={orbit2Ref}
        className="hero-orbit orbit-two will-change-transform"
      />

      {/* Orbit 3: Subtle geometric dashed satellite ring */}
      <div
        ref={orbit3Ref}
        className="hero-orbit orbit-three will-change-transform"
      />
    </div>
  );
}
