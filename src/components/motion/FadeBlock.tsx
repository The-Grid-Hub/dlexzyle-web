"use client";

import { useRef } from "react";
import { gsap, pinnedContainerOf, reducedMotion, useGSAP } from "@/lib/gsap";

/**
 * Fades its children in once they are most of the way into the viewport (the
 * reference's `opacity-block`). Use it for paragraphs and buttons that follow
 * a RevealText heading.
 */
export default function FadeBlock({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current || reducedMotion()) return;
      gsap.fromTo(
        ref.current,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 1,
          delay,
          ease: "power4.inOut",
          scrollTrigger: { trigger: ref.current, start: "center 92%", pinnedContainer: pinnedContainerOf(ref.current) },
        }
      );
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
