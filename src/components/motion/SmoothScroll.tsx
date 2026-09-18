"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ANCHOR_OFFSET, gsap, reducedMotion, ScrollSmoother, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Wraps the scrolling part of the page in GSAP's ScrollSmoother. The fixed
 * header, preloader and page curtain live outside it in the layout. On every
 * route change it jumps to the top (or to the URL hash) and recalculates the
 * scroll-driven animations for the new page's height. In-page anchor links are
 * routed through the smoother too, because a native jump would fight it.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useGSAP(() => {
    if (reducedMotion()) return;
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.2,
      effects: false,
      normalizeScroll: false,
    });
    return () => smoother.kill();
  }, []);

  useEffect(() => {
    const smoother = ScrollSmoother.get();
    const hash = window.location.hash;
    const settle = () => {
      ScrollTrigger.refresh();
      if (hash && document.querySelector(hash)) {
        if (smoother) smoother.scrollTo(hash, false, ANCHOR_OFFSET);
        else document.querySelector(hash)?.scrollIntoView();
      } else if (smoother) {
        smoother.scrollTop(0);
      } else {
        window.scrollTo(0, 0);
      }
    };
    // Two frames so the new page has painted and its images have reserved space.
    const id = requestAnimationFrame(() => requestAnimationFrame(settle));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor || anchor.getAttribute("href") === "#") return;
      const target = document.querySelector(anchor.getAttribute("href")!);
      if (!target) return;
      const smoother = ScrollSmoother.get();
      if (!smoother) return;
      event.preventDefault();
      smoother.scrollTo(target, true, ANCHOR_OFFSET);
      history.replaceState(null, "", anchor.getAttribute("href"));
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    // Videos and fonts change the page height after first paint.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    return () => window.removeEventListener("load", refresh);
  }, []);

  // Keep gsap in scope so tree-shaking never drops the plugin registration.
  void gsap;

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
