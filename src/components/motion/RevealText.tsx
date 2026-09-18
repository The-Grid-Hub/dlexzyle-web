"use client";

import { useRef } from "react";
import { gsap, pinnedContainerOf, reducedMotion, SplitText, useGSAP } from "@/lib/gsap";

type Tag = "h1" | "h2" | "h3" | "p" | "span" | "div";

interface RevealTextProps {
  as?: Tag;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

/**
 * Splits its text into characters and springs each one up from a flat line as
 * the element scrolls into view (the reference's `animated-text`). The text is
 * hidden by CSS until the split is ready so nothing flashes; with JavaScript
 * off or reduced motion on it simply shows. Headings that must animate on page
 * load instead use `data-intro="chars"` and are driven by SiteMotion.
 */
export default function RevealText({ as = "span", children, className = "", id }: RevealTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Typed as "div" so one ref type serves every allowed tag.
  const Tag = as as "div";

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (reducedMotion()) {
        gsap.set(el, { visibility: "visible" });
        return;
      }
      const split = SplitText.create(el, {
        type: "chars,words",
        charsClass: "char",
        wordsClass: "word",
        autoSplit: true,
        onSplit: (self) => {
          gsap.set(el, { visibility: "visible" });
          return gsap.fromTo(
            self.chars,
            { scaleY: 0, opacity: 0, yPercent: 30 },
            {
              scaleY: 1,
              opacity: 1,
              yPercent: 0,
              ease: "back.out(1.4)",
              duration: 1,
              stagger: 0.03,
              scrollTrigger: { trigger: el, start: "center bottom-=5%", pinnedContainer: pinnedContainerOf(el) },
            }
          );
        },
      });
      return () => split.revert();
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} id={id} className={className} data-reveal="">
      {children}
    </Tag>
  );
}
