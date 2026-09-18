"use client";

import Link from "next/link";
import { useRef } from "react";
import Container from "./Container";
import Button from "./Button";
import RevealText from "./motion/RevealText";
import { DESKTOP_MOTION } from "./motion/usePinnedList";
import { gsap, useGSAP } from "@/lib/gsap";
import { homeServices } from "@/lib/services";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The six numbered service cards. On wide screens they are stacked in one
 * frame: the section pins and, as you scroll, each card slides up over the
 * previous one while that one shrinks back. The bar beside the heading tracks
 * progress. On phones, and with reduced motion, they are a plain column.
 * Cards alternate pale and dark, as in the reference.
 */
export default function ServicesStack() {
  const section = useRef<HTMLElement>(null);
  const stack = useRef<HTMLUListElement>(null);
  const fill = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(DESKTOP_MOTION, () => {
        const items = gsap.utils.toArray<HTMLElement>(stack.current!.children);
        gsap.set(items, { x: 0, y: 0, xPercent: -50, yPercent: 100 });
        gsap.set(items[0], { yPercent: -50 });
        gsap.set(stack.current, { visibility: "visible" });

        const trigger = {
          trigger: section.current,
          start: "center center",
          end: () => `+=${(items.length - 1) * window.innerHeight * 0.8}`,
          scrub: true,
          invalidateOnRefresh: true,
          refreshPriority: 1,
        };
        const tl = gsap.timeline({ scrollTrigger: { ...trigger, pin: true } });
        items.forEach((item, i) => {
          if (i === 0) return;
          tl.to(items[i - 1], { scale: 0.8 }, i === 1 ? 0 : ">");
          tl.to(item, { yPercent: -50 }, "<");
        });
        gsap.to(fill.current, { width: "100%", ease: "none", scrollTrigger: trigger });
      });
      return () => mm.revert();
    },
    { scope: section }
  );

  return (
    <section ref={section} data-pinned className="bg-white py-20 sm:py-28">
      <Container className="lg:flex lg:gap-2.5 motion-safe:lg:h-[min(880px,calc(100vh-6rem))]">
        <div className="flex flex-col lg:w-[280px] lg:shrink-0 lg:justify-between">
          <RevealText as="h2" className="font-display text-[clamp(3rem,6vw,4.5rem)]">
            Our services
          </RevealText>
          <div className="mt-8 flex flex-col gap-8">
            <div>
              <Button href="/services" variant="light">
                All our services
              </Button>
            </div>
            <div className="hidden h-0.5 w-full bg-brand-ink/15 motion-safe:lg:block" aria-hidden="true">
              <div ref={fill} className="h-full w-[10%] bg-brand-green" />
            </div>
          </div>
        </div>

        <ul
          ref={stack}
          className="services-stack relative mt-10 grid gap-4 lg:mt-0 lg:flex-1 motion-safe:lg:block motion-safe:lg:h-full"
        >
          {homeServices.map((service, i) => {
            const accent = i % 2 === 1;
            return (
              <li
                key={service.title}
                className={`relative flex min-h-[360px] flex-col items-center justify-center rounded-[20px] px-8 pb-32 pt-12 text-center lg:px-12 lg:text-left motion-safe:lg:absolute motion-safe:lg:left-1/2 motion-safe:lg:top-1/2 motion-safe:lg:h-full motion-safe:lg:w-full motion-safe:lg:pb-12 ${
                  accent ? "bg-brand-ink text-brand-mist" : "bg-brand-mist text-text-primary"
                }`}
              >
                <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-24">
                  <span className="font-display text-[clamp(6rem,13vw,16rem)] leading-none tracking-[-0.02em]" aria-hidden="true">
                    {pad(i + 1)}
                  </span>
                  <div>
                    <h3 className="font-display text-[clamp(2.5rem,3.2vw,3.75rem)] leading-[0.9]">
                      <span className="sr-only">{pad(i + 1)}. </span>
                      {service.title}
                    </h3>
                    <p className={`mt-4 max-w-[300px] leading-snug ${accent ? "text-brand-mist/80" : "text-text-muted"}`}>
                      {service.tagline}
                    </p>
                  </div>
                </div>
                <Link
                  href={service.href}
                  aria-label={`${service.title}: read more`}
                  className={`absolute bottom-10 left-1/2 flex h-[72px] w-[72px] -translate-x-1/2 items-center justify-center rounded-[10px] transition-colors lg:h-[85px] lg:w-[85px] ${
                    accent
                      ? "bg-brand-mist text-brand-ink hover:bg-brand-green hover:text-white"
                      : "bg-brand-green text-white hover:bg-brand-ink"
                  }`}
                >
                  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
