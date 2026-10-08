import Image from "next/image";
import Container from "./Container";
import Button from "./Button";
import FadeBlock from "./motion/FadeBlock";
import RevealText from "./motion/RevealText";
import ScaleBlock from "./motion/ScaleBlock";
import Ticker from "./motion/Ticker";
import { stayRide } from "@/lib/hotel";
import { photos } from "@/lib/images";
import { site } from "@/lib/site";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The dark panel that joins the hotel to the car service: what a stay looks
 * like when the same team also drives you. Built like the home page's
 * AboutPanel (header row, large title, oversized faded ticker), with the
 * three steps from `stayRide` in hotel.ts.
 */
export default function StayRide() {
  const photo = photos.hotelDoorway;

  return (
    <section className="py-12 sm:py-20" aria-labelledby="stay-ride-heading">
      <Container>
        <ScaleBlock className="overflow-hidden rounded-[20px] bg-brand-ink px-5 pb-4 pt-8 text-white sm:px-10 sm:pt-11">
          <FadeBlock className="flex items-center justify-between gap-6 border-b border-white/15 pb-3 font-display text-[15px] sm:text-[18px]">
            <span>Stay + Ride</span>
            <span className="text-right">{site.name}</span>
          </FadeBlock>

          <div className="grid gap-10 pt-12 sm:pt-16 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:items-end lg:gap-16">
            <div>
              <RevealText
                as="h2"
                id="stay-ride-heading"
                className="font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.85]"
              >
                The car meets you. The room is ready.
              </RevealText>
              <FadeBlock>
                <p className="mt-6 max-w-[540px] text-pretty text-lg leading-relaxed text-white/85">
                  Add a car to any stay. Your driver collects you from the
                  airport, brings you to the suite, and stays on call until
                  you fly out. One booking, one WhatsApp line, one team.
                </p>
                <div className="mt-9">
                  <Button href="#book" variant="light">
                    Book a stay with a pickup
                  </Button>
                </div>
              </FadeBlock>
            </div>
            <FadeBlock className="relative hidden aspect-[4/5] overflow-hidden rounded-[12px] bg-white/5 lg:block">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="380px"
                placeholder="blur"
                className="object-cover"
                style={{ objectPosition: photo.position }}
              />
            </FadeBlock>
          </div>

          <ol className="mt-14 grid border-t border-white/15 sm:mt-20 lg:grid-cols-3">
            {stayRide.map((step, i) => (
              <li
                key={step.title}
                className="border-b border-white/15 py-8 last:border-b-0 lg:border-b-0 lg:border-r lg:px-10 lg:py-12 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
              >
                <span className="font-display text-[clamp(3.5rem,6vw,5.5rem)] leading-none text-white/20" aria-hidden="true">
                  {pad(i + 1)}
                </span>
                <h3 className="mt-4 font-display text-[clamp(1.75rem,2.4vw,2.5rem)]">
                  <span className="sr-only">{pad(i + 1)}. </span>
                  {step.title}
                </h3>
                <p className="mt-3 max-w-[320px] text-[15px] leading-snug text-white/75">{step.detail}</p>
              </li>
            ))}
          </ol>

          <div className="hidden border-t border-white/15 pt-4 sm:block">
            <Ticker
              text="One booking. Car and room."
              className="font-display text-[clamp(6rem,12vw,14rem)] leading-none text-white/[0.06]"
            />
          </div>
        </ScaleBlock>
      </Container>
    </section>
  );
}
