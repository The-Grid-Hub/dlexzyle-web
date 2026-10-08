"use client";

import Image from "next/image";
import { useRef } from "react";
import Container from "./Container";
import Button from "./Button";
import RevealText from "./motion/RevealText";
import { DESKTOP_MOTION } from "./motion/usePinnedList";
import { gsap, useGSAP } from "@/lib/gsap";
import { suite } from "@/lib/hotel";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The suite as a walk-through: one tall card per room, in the order you
 * enter them, ending on a booking card. On wide screens the section pins and
 * the row slides left as you scroll (the horizontal cousin of
 * `usePinnedList`), with the bar under the heading tracking progress; the
 * cards leave past the edge of the screen, which the section clips. On
 * phones, and with reduced motion, the row is a snap-scroll strip.
 */
export default function SuiteTour() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const fill = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(DESKTOP_MOTION, () => {
        const row = track.current!;
        // Slide until the last card's right edge meets the container's.
        const distance = () => Math.max(0, row.scrollWidth - row.parentElement!.clientWidth);
        gsap
          .timeline({
            scrollTrigger: {
              trigger: section.current,
              start: "top top",
              end: () => `+=${Math.max(distance(), window.innerHeight * 0.6)}`,
              pin: true,
              scrub: true,
              invalidateOnRefresh: true,
              refreshPriority: 1,
            },
          })
          .to(row, { x: () => -distance(), ease: "none" }, 0)
          .to(fill.current, { width: "100%", ease: "none" }, 0);
      });
      return () => mm.revert();
    },
    { scope: section }
  );

  return (
    <section
      ref={section}
      id="suite"
      data-pinned
      className="scroll-mt-24 overflow-hidden bg-white py-20 sm:py-28 motion-safe:lg:flex motion-safe:lg:h-screen motion-safe:lg:flex-col motion-safe:lg:justify-center motion-safe:lg:py-0"
      aria-labelledby="suite-heading"
    >
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <RevealText as="h2" id="suite-heading" className="font-display text-[clamp(3rem,6vw,4.5rem)]">
              Inside the {suite.name}
            </RevealText>
            <p className="mt-4 max-w-[460px] text-pretty leading-relaxed text-text-muted">
              A lounge, a bedroom and a bathroom behind one door. Walk through them in the order you would arrive.
            </p>
          </div>
          <div className="hidden h-0.5 w-[min(420px,35%)] bg-brand-ink/15 motion-safe:lg:block" aria-hidden="true">
            <div ref={fill} className="h-full w-[10%] bg-brand-green" />
          </div>
        </div>

        <div className="mt-10 lg:mt-14">
          <ol
            ref={track}
            className="flex snap-x snap-mandatory gap-2.5 overflow-x-auto pb-4 [scrollbar-width:none] sm:gap-5 motion-safe:lg:overflow-visible motion-safe:lg:pb-0"
          >
            {suite.spaces.map((space, i) => (
              <li key={space.name} className="w-[78vw] shrink-0 snap-start sm:w-[340px] lg:w-[min(27vw,380px)]">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[12px] bg-brand-light motion-safe:lg:aspect-auto motion-safe:lg:h-[min(52vh,500px)]">
                  <Image
                    src={space.photo.src}
                    alt={space.photo.alt}
                    fill
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 340px, 78vw"
                    placeholder="blur"
                    className="object-cover"
                    style={{ objectPosition: space.photo.position }}
                  />
                  <span className="absolute left-4 top-4 rounded-[6px] bg-brand-mist px-2.5 pb-1 pt-1.5 font-display text-[20px] text-brand-ink" aria-hidden="true">
                    {pad(i + 1)}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-[clamp(2rem,2.6vw,2.75rem)] text-text-primary">
                  <span className="sr-only">{pad(i + 1)}. </span>
                  {space.name}
                </h3>
                <p className="mt-2 max-w-[340px] text-[15px] leading-snug text-text-muted">{space.detail}</p>
              </li>
            ))}

            <li className="w-[78vw] shrink-0 snap-start sm:w-[340px] lg:w-[min(27vw,380px)]">
              <div className="flex aspect-[4/5] flex-col justify-between rounded-[12px] bg-brand-ink p-7 text-white motion-safe:lg:aspect-auto motion-safe:lg:h-[min(52vh,500px)]">
                <span className="font-display text-[22px] text-white/50" aria-hidden="true">
                  {pad(suite.spaces.length + 1)}
                </span>
                <div>
                  <h3 className="font-display text-[clamp(2.5rem,3.4vw,3.75rem)]">Your turn</h3>
                  <p className="mt-3 max-w-[260px] text-[15px] leading-snug text-white/75">
                    Send your dates and we will hold the suite for you.
                  </p>
                  <div className="mt-7">
                    <Button href="#book" variant="light">
                      Book a stay
                    </Button>
                  </div>
                </div>
              </div>
            </li>
          </ol>
        </div>
      </Container>
    </section>
  );
}
