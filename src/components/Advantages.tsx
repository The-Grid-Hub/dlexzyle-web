"use client";

import { useRef } from "react";
import Container from "./Container";
import RevealText from "./motion/RevealText";
import { advantages } from "@/lib/advantages";
import { usePinnedList } from "./motion/usePinnedList";

export { DESKTOP_MOTION } from "./motion/usePinnedList";

/**
 * "Why book with us": on wide screens the section pins for about a screen's
 * worth of scrolling while the list of eight cards slides up through it and
 * the bar under the heading fills. On phones, and when motion is reduced, the
 * cards are a horizontal snap-scroll row. The About page's KeyAdvantages
 * shares the pin through `usePinnedList`.
 */
export default function Advantages() {
  const section = useRef<HTMLElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const fill = useRef<HTMLDivElement>(null);

  usePinnedList(section, list, fill);

  return (
    <section
      ref={section}
      data-pinned
      className="bg-white py-20 motion-safe:lg:flex motion-safe:lg:h-screen motion-safe:lg:items-center motion-safe:lg:overflow-hidden motion-safe:lg:py-0"
    >
      <Container className="lg:flex lg:items-start lg:justify-between lg:gap-10">
        <div className="flex flex-col justify-between motion-safe:lg:h-[min(760px,calc(100vh-8rem))]">
          <RevealText
            as="h2"
            className="font-display max-w-[420px] text-[clamp(3rem,6vw,4.5rem)]"
          >
            Why book with us
          </RevealText>
          <div
            className="mt-8 hidden h-0.5 w-full max-w-[730px] bg-brand-ink/15 motion-safe:lg:block"
            aria-hidden="true"
          >
            <div ref={fill} className="h-full w-[10%] bg-brand-green" />
          </div>
        </div>

        {/* A fixed-height frame on desktop so the list's full height never stretches the section. */}
        <div className="mt-10 lg:mt-0 lg:w-[min(730px,52%)] lg:shrink-0 motion-safe:lg:h-[min(760px,calc(100vh-8rem))]">
          <ul
            ref={list}
            className="flex snap-x snap-mandatory gap-2.5 overflow-x-auto pb-4 [scrollbar-width:none] motion-safe:lg:flex-col motion-safe:lg:overflow-visible motion-safe:lg:pb-0"
          >
            {advantages.map((item) => (
              <li
                key={item.heading}
                className="flex w-[300px] shrink-0 snap-start flex-col justify-center gap-4 rounded-[10px] bg-brand-mist px-8 py-10 sm:w-[335px] motion-safe:lg:min-h-[min(320px,calc(50vh-5rem))] motion-safe:lg:w-full motion-safe:lg:flex-row motion-safe:lg:items-center motion-safe:lg:justify-between motion-safe:lg:px-16"
              >
                <h3 className="font-display max-w-[260px] text-[clamp(2.25rem,3.2vw,3.75rem)] leading-[0.85] text-text-primary">
                  {item.heading}
                </h3>
                <p className="max-w-[240px] text-[15px] leading-snug text-text-muted lg:text-base">
                  {item.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
