import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";

interface SpotlightTiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // max tilt in degrees (default: 5)
  spotlight?: boolean;
  scale?: number; // scale on hover (default: 1.015)
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

/**
 * SpotlightTiltCard
 * Implements Preset #2 (Hover Micro-interaction - Standard tier: Card scale, tilt & feedback)
 * from nextlevelbuilder/ui-ux-pro-max-skill.
 *
 * Uses 3D perspective, interactive mouse tracking with smooth damping,
 * and a dynamic spotlight beam that follows the pointer.
 * Adheres to accessibility and prefers-reduced-motion.
 */
export default function SpotlightTiltCard({
  children,
  className = "",
  maxTilt = 4.5,
  scale = 1.015,
  spotlight = true,
  onClick,
  ...rest
}: SpotlightTiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0, opacity: 0 });
  const isReducedMotion = useRef(false);

  useEffect(() => {
    isReducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isReducedMotion.current || e.pointerType === "touch") return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation (-maxTilt to +maxTilt)
    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    gsap.to(card, {
      rotateX,
      rotateY,
      scale,
      duration: 0.25,
      ease: "power2.out",
      transformPerspective: 1000,
      transformOrigin: "center center",
      overwrite: "auto",
    });

    if (spotlight) {
      setSpotlightPos({ x, y, opacity: 1 });
    }
  };

  const handlePointerLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.45,
      ease: "power2.out",
      overwrite: "auto",
    });

    if (spotlight) {
      setSpotlightPos((prev) => ({ ...prev, opacity: 0 }));
    }
  };

  return (
    <div
      ref={cardRef}
      className={`spotlight-tilt-card relative overflow-hidden transition-colors ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={onClick}
      style={{
        transformStyle: "preserve-3d",
      }}
      {...rest}
    >
      {/* Dynamic Cursor Spotlight Beam */}
      {spotlight && (
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            opacity: spotlightPos.opacity,
            background: `radial-gradient(circle 280px at ${spotlightPos.x}px ${spotlightPos.y}px, var(--spotlight-color, rgba(255, 95, 61, 0.08)), transparent 80%)`,
          }}
          aria-hidden="true"
        />
      )}
      <div className="relative z-10 w-full h-full flex flex-col">{children}</div>
    </div>
  );
}
