"use client";

import { useRef } from "react";
import { gsap, pinnedContainerOf, reducedMotion, SplitText, useGSAP } from "@/lib/gsap";

interface ReadingTextProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Large copy that is "read" as you scroll: every word starts faint and turns
 * solid in order, tied to the scroll position, so scrolling back dims it
 * again (the reference's `reading-block`). Wrap the paragraphs in one
 * ReadingText so the reading runs continuously across them. The text is
 * hidden until the split is ready; with reduced motion it simply shows.
 */
export default function ReadingText({ children, className = "" }: ReadingTextProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (reducedMotion()) {
        gsap.set(el, { visibility: "visible" });
        return;
      }
      const split = SplitText.create(el, {
        type: "words",
        wordsClass: "word",
        autoSplit: true,
        onSplit: (self) => {
          gsap.set(el, { visibility: "visible" });
          return gsap.fromTo(
            self.words,
            { opacity: 0.15 },
            {
              opacity: 1,
              ease: "none",
              stagger: 0.05,
              scrollTrigger: {
                trigger: el,
                start: "top 75%",
                end: "bottom 45%",
                scrub: true,
                pinnedContainer: pinnedContainerOf(el),
              },
            }
          );
        },
      });
      return () => split.revert();
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className} data-reveal="">
      {children}
    </div>
  );
}
