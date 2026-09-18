/**
 * One place that registers the GSAP plugins, so every motion component imports
 * from here rather than registering its own copy. All of these plugins are in
 * the public `gsap` package since 3.13; nothing here needs a Club licence.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, useGSAP);
  // For inspecting triggers from the browser console: `__gsap.ScrollTrigger.getAll()`.
  (window as Window & { __gsap?: unknown }).__gsap = { gsap, ScrollTrigger, ScrollSmoother };
}

export { gsap, ScrollTrigger, ScrollSmoother, SplitText, useGSAP };

/** True when the visitor has asked the OS for less motion. Motion components then render static. */
export function reducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * ScrollTrigger measures an element inside a pinned section wrongly unless it
 * is told about the pin. Pinned sections carry `data-pinned`; pass the result
 * of this as `pinnedContainer` on any trigger that might sit inside one.
 */
export function pinnedContainerOf(el: Element) {
  return el.closest<HTMLElement>("[data-pinned]") ?? undefined;
}

/** Offset used when scrolling to an in-page anchor, so the fixed header doesn't cover it. */
export const ANCHOR_OFFSET = "top 110px";
