"use client";

import { useRef } from "react";
import { gsap, pinnedContainerOf, reducedMotion, useGSAP } from "@/lib/gsap";

/**
 * A panel that grows from 70% to full size as it scrolls into view, tied to
 * the scroll position (the reference's `scale-block`). It settles at full size
 * once its centre reaches the middle of the viewport and stays there.
 */
export default function ScaleBlock({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current || reducedMotion()) return;
      gsap.fromTo(
        ref.current,
        { scale: 0.7 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "center center",
            scrub: true,
            once: true,
            pinnedContainer: pinnedContainerOf(ref.current),
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={`origin-center will-change-transform ${className}`}>
      {children}
    </div>
  );
}
