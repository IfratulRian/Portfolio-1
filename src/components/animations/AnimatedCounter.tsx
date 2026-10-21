import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

/**
 * AnimatedCounter
 * Smoothly animates numerical counters from 0 to value upon viewport entrance.
 * Uses GSAP power2.out interpolation.
 * Respects prefers-reduced-motion (renders final value immediately).
 */
export default function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 1.6,
  className = "",
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Accessibility check: immediately display final value
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayValue(value);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const target = { val: 0 };

          gsap.to(target, {
            val: value,
            duration,
            ease: "power2.out",
            onUpdate: () => {
              setDisplayValue(Math.floor(target.val));
            },
            onComplete: () => {
              setDisplayValue(value);
            },
          });
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [value, duration]);

  return (
    <span ref={elementRef} className={`counter-number tabular-nums ${className}`}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}
