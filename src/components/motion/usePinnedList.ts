"use client";

import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** Desktop layout with motion allowed: pinned sections pin and their lists scroll inside them. */
export const DESKTOP_MOTION =
  "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

/**
 * Pins `section` for as long as it takes to scroll `list` up through its
 * clipping frame (the list's parent), filling `fill` to full width as it
 * goes. Only active under `DESKTOP_MOTION`; elsewhere the section is static
 * and the caller's phone layout applies. The section must carry `data-pinned`.
 */
export function usePinnedList(
  section: RefObject<HTMLElement | null>,
  list: RefObject<HTMLElement | null>,
  fill: RefObject<HTMLElement | null>
) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(DESKTOP_MOTION, () => {
        const ul = list.current!;
        // The list's clipping frame is its parent; scroll the list up by
        // however much of it does not fit in that frame.
        const frame = ul.parentElement!;
        const distance = Math.max(0, ul.scrollHeight - frame.offsetHeight);
        gsap
          .timeline({
            scrollTrigger: {
              trigger: section.current,
              start: "top top",
              end: () => `+=${Math.max(distance, window.innerHeight)}`,
              pin: true,
              scrub: true,
              invalidateOnRefresh: true,
              refreshPriority: 1,
            },
          })
          .to(ul, { y: -distance, ease: "none" }, 0)
          .to(fill.current, { width: "100%", ease: "none" }, 0);
      });
      return () => mm.revert();
    },
    { scope: section }
  );
}
