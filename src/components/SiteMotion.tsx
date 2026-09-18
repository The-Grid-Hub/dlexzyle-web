"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Container from "./Container";
import { gsap, reducedMotion, ScrollSmoother, SplitText, useGSAP } from "@/lib/gsap";
import { site } from "@/lib/site";

/**
 * Runs the page-load sequence and the curtain wipe between pages.
 *
 * On the first load of a session (`<html data-intro="full">`, decided by the
 * inline script in layout.tsx) the preloader counts 0 to 100% while the hero
 * video grows from a small tile; then the intro plays. Later hard loads skip
 * straight to the intro. Client-side navigations bring the curtain down,
 * change route, lift it and play the intro for the new page.
 *
 * The intro animates elements by `data-intro` attribute: "chars" (split and
 * spring up), "header", "line", "fade", "rise", "slide" and "video". Their
 * starting states are CSS in globals.css so nothing flashes before hydration.
 */
export default function SiteMotion() {
  const pathname = usePathname();
  const router = useRouter();
  const root = useRef<HTMLDivElement>(null);
  const splits = useRef<SplitText[]>([]);
  const firstRender = useRef(true);
  const navigating = useRef(false);

  function playIntro(full: boolean) {
    splits.current.forEach((s) => s.revert());
    splits.current = [];

    const tl = gsap.timeline({ defaults: { ease: "power4.inOut" } });
    const video = document.querySelector('[data-intro="video"]');

    if (full) {
      const text = root.current!.querySelector(".preloader__text")!;
      const number = root.current!.querySelector<HTMLElement>(".preloader__number")!;
      const split = SplitText.create(text, { type: "chars,words", charsClass: "char", wordsClass: "word" });
      splits.current.push(split);
      gsap.set(text, { visibility: "visible" });
      tl.fromTo(
        split.chars,
        { scaleY: 0, opacity: 0, yPercent: 30 },
        { scaleY: 1, opacity: 1, yPercent: 0, ease: "back.out(1.4)", stagger: 0.03, duration: 1 },
        0
      )
        .to(".preloader__line", { width: "100%", duration: 2.6, ease: "power1.inOut" }, 0)
        .to(number, { textContent: 100, snap: { textContent: 1 }, duration: 2.4, ease: "power1.in" }, 0.2);
      if (video) {
        tl.to(video, { top: "50%", yPercent: -50, xPercent: -50, scale: 1, rotation: 0, duration: 2 }, 0.8);
      }
      tl.to(split.chars, { yPercent: 110, opacity: 0, stagger: 0.015, duration: 0.6 }, ">-0.2")
        .to(".preloader__progress", { yPercent: 110, opacity: 0, duration: 0.6 }, "<")
        .set(".preloader", { display: "none" });
    } else if (video) {
      gsap.set(video, { top: "50%", yPercent: -50, xPercent: -50, scale: 1, rotation: 0 });
    }

    const at = full ? ">-0.3" : 0;
    document.querySelectorAll<HTMLElement>('[data-intro="chars"]').forEach((el, i) => {
      const split = SplitText.create(el, { type: "chars,words", charsClass: "char", wordsClass: "word" });
      splits.current.push(split);
      gsap.set(el, { visibility: "visible" });
      tl.fromTo(
        split.chars,
        { scaleY: 0, opacity: 0, yPercent: 30 },
        { scaleY: 1, opacity: 1, yPercent: 0, ease: "back.out(1.4)", stagger: 0.03, duration: 1 },
        i === 0 ? at : "<0.1"
      );
    });
    const has = (kind: string) => document.querySelector(`[data-intro="${kind}"]`) !== null;
    tl.to('[data-intro="header"]', { y: 0, duration: 1 }, "<");
    if (has("line")) tl.to('[data-intro="line"]', { width: "100%", duration: 1.6 }, "<");
    if (has("rise")) tl.to('[data-intro="rise"]', { y: 0, duration: 1 }, "<0.2");
    if (has("slide")) tl.to('[data-intro="slide"]', { x: 0, duration: 1.2 }, "<");
    if (has("fade")) tl.to('[data-intro="fade"]', { opacity: 1, duration: 1 }, "<0.3");
    return tl;
  }

  // Hard load: preloader (first visit in the session) then the intro.
  useGSAP(
    () => {
      if (reducedMotion()) {
        gsap.set('[data-intro="video"]', { top: "50%", yPercent: -50, xPercent: -50, scale: 1, rotation: 0 });
        return;
      }
      // Replace the CSS resting transform with GSAP's own, so later tweens
      // use the same units.
      gsap.set(".plug", { y: 0, yPercent: -105 });
      const full = document.documentElement.dataset.intro === "full";
      let tl: gsap.core.Timeline | undefined;
      document.fonts.ready.then(() => {
        tl = playIntro(full);
      });
      return () => {
        tl?.kill();
        splits.current.forEach((s) => s.revert());
        splits.current = [];
      };
    },
    { scope: root }
  );

  // Client-side navigation: lift the curtain and play the intro for the new page.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (reducedMotion()) return;
    const wasNavigating = navigating.current;
    navigating.current = false;
    const tl = gsap.timeline({ defaults: { ease: "power4.inOut" } });
    if (wasNavigating) {
      tl.set(".plug__inner", { top: "auto", bottom: 0 })
        .to(".plug__inner", { height: "0%", duration: 0.8 })
        .to(".plug", { yPercent: 105, duration: 0.5 }, "-=0.2")
        .set(".plug", { yPercent: -105 })
        .set(".plug__inner", { top: 0, bottom: "auto", height: 0 });
    }
    const intro = playIntro(false);
    tl.add(intro, wasNavigating ? 0.5 : 0);
    return () => {
      tl.kill();
    };
  }, [pathname]);

  // Intercept internal links so the curtain can come down before the route changes.
  useEffect(() => {
    if (reducedMotion()) return;
    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      const href = anchor.getAttribute("href") ?? "";
      if (!href.startsWith("/") || href.startsWith("//")) return;
      const url = new URL(href, window.location.origin);
      if (url.pathname === window.location.pathname) return; // same page: hash or no-op
      if (navigating.current) {
        event.preventDefault();
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      navigating.current = true;
      ScrollSmoother.get()?.paused(true);
      gsap
        .timeline({ defaults: { ease: "power4.inOut" } })
        .set(".plug", { yPercent: 0 })
        .to(".plug__inner", { height: "100%", duration: 0.7 })
        .add(() => {
          ScrollSmoother.get()?.paused(false);
          router.push(url.pathname + url.search + url.hash);
        });
      // If the route never changes (e.g. the push fails), lift the curtain anyway.
      window.setTimeout(() => {
        if (navigating.current) {
          navigating.current = false;
          gsap.to(".plug", { yPercent: -105, duration: 0.5 });
          gsap.set(".plug__inner", { height: 0 });
        }
      }, 5000);
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  return (
    <div ref={root}>
      <div className="preloader pointer-events-none fixed inset-0 z-[70] flex items-end pb-8 text-text-primary" aria-hidden="true">
        <Container>
          <div className="relative flex items-end justify-between pb-3 font-display text-[22px] sm:text-[30px]">
            <span className="preloader__text">{site.name}</span>
            <span className="preloader__progress tabular-nums">
              <span className="preloader__number">0</span>%
            </span>
            <span className="preloader__line absolute bottom-0 left-0 h-px w-0 bg-brand-ink/20" />
          </div>
        </Container>
      </div>
      <div className="plug fixed inset-0 z-[60] bg-brand-mist" aria-hidden="true">
        <div className="plug__inner absolute left-0 top-0 h-0 w-full bg-brand-ink" />
      </div>
    </div>
  );
}
