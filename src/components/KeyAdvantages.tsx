"use client";

import { useRef } from "react";
import Container from "./Container";
import RevealText from "./motion/RevealText";
import { usePinnedList } from "./motion/usePinnedList";
import { keyAdvantages } from "@/lib/about";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * "Our key advantages" on the About page: the same pinned, scrolling list as
 * the home page's Advantages, but with wide dark cards that pair a faded
 * number with one promise. On phones, and with reduced motion, the cards are
 * a plain column.
 */
export default function KeyAdvantages() {
  const section = useRef<HTMLElement>(null);
  const list = useRef<HTMLOListElement>(null);
  const fill = useRef<HTMLDivElement>(null);

  usePinnedList(section, list, fill);

  return (
    <section
      ref={section}
      data-pinned
      className="bg-white py-12 sm:py-20 motion-safe:lg:flex motion-safe:lg:h-screen motion-safe:lg:items-center motion-safe:lg:overflow-hidden motion-safe:lg:py-0"
    >
      <Container className="lg:flex lg:items-start lg:justify-between lg:gap-10">
        <div className="flex flex-col justify-between motion-safe:lg:h-[min(760px,calc(100vh-8rem))]">
          <RevealText
            as="h2"
            className="font-display max-w-[420px] text-[clamp(3rem,6vw,4.5rem)]"
          >
            Our key advantages
          </RevealText>
          <div
            className="mt-8 hidden h-0.5 w-full max-w-[730px] bg-brand-ink/15 motion-safe:lg:block"
            aria-hidden="true"
          >
            <div ref={fill} className="h-full w-[10%] bg-brand-green" />
          </div>
        </div>

        {/* A fixed-height frame on desktop so the list's full height never stretches the section. */}
        <div className="mt-10 lg:mt-0 lg:w-[min(915px,60%)] lg:shrink-0 motion-safe:lg:h-[min(760px,calc(100vh-8rem))]">
          <ol ref={list} className="flex flex-col gap-2.5">
            {keyAdvantages.map((item, i) => (
              <li
                key={item}
                className="flex flex-col items-start gap-5 rounded-[10px] bg-brand-ink px-8 py-10 text-white lg:min-h-[320px] lg:flex-row lg:items-center lg:gap-16 lg:px-16 lg:py-14"
              >
                <span
                  className="font-display text-[clamp(3.75rem,5vw,11.75rem)] leading-[0.8] tracking-[-0.03em] text-white/[0.06] lg:min-w-[150px]"
                  aria-hidden="true"
                >
                  {pad(i + 1)}
                </span>
                <p className="font-display max-w-[425px] text-[clamp(1.25rem,2vw,2.5rem)] leading-[0.9]">
                  <span className="sr-only">{pad(i + 1)}. </span>
                  {item}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
