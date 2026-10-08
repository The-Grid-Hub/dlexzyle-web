import type { Metadata } from "next";
import Container from "@/components/Container";
import HotelHero from "@/components/HotelHero";
import SectionHeading from "@/components/SectionHeading";
import StayForm from "@/components/StayForm";
import StayRide from "@/components/StayRide";
import SuiteTour from "@/components/SuiteTour";
import FadeBlock from "@/components/motion/FadeBlock";
import ReadingText from "@/components/motion/ReadingText";
import RevealText from "@/components/motion/RevealText";
import { amenities, hotelLocation, hotelStatement, stayBookingSteps } from "@/lib/hotel";
import { site, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: `Hotel Stays in ${hotelLocation}`,
  description: `Book a suite with ${site.name} in ${hotelLocation}: a separate lounge, a king-size bed and an en-suite shower, with an airport pickup and a driver on call if you want one.`,
  alternates: { canonical: "/hotel" },
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The hotel arm of the business. In order: the hero over the walkthrough
 * video, a statement read word by word, the suite tour (pinned, sliding
 * sideways), what is in the suite, the Stay + Ride panel that ties the stay
 * to the car service, and the booking form. Copy lives in lib/hotel.ts.
 */
export default function HotelPage() {
  return (
    <>
      <HotelHero />

      {/* Statement */}
      <section className="py-20 sm:py-32" aria-label="Why stay with us">
        <Container>
          <ReadingText className="font-display mx-auto flex max-w-[1200px] flex-col gap-5 text-[clamp(1.75rem,4.2vw,5rem)] leading-[0.9] text-text-primary sm:gap-14 lg:text-center">
            {hotelStatement.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </ReadingText>
        </Container>
      </section>

      <SuiteTour />

      {/* Amenities */}
      <section className="py-16 sm:py-24" aria-labelledby="amenities-heading">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <RevealText as="h2" id="amenities-heading" className="font-display text-[clamp(3rem,6vw,4.5rem)]">
              What&apos;s included
            </RevealText>
            <FadeBlock>
              <p className="mt-4 max-w-[340px] text-pretty leading-relaxed text-text-muted">
                Everything on this list is in the walkthrough. Need something
                else? Ask on{" "}
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-brand-green underline underline-offset-4"
                >
                  WhatsApp
                </a>
                .
              </p>
            </FadeBlock>
          </div>
          <FadeBlock className="lg:col-span-8">
            <ul className="grid border-t border-brand-line sm:grid-cols-2 sm:gap-x-10">
              {amenities.map((item, i) => (
                <li key={item} className="flex items-baseline gap-5 border-b border-brand-line py-4">
                  <span className="font-display w-7 shrink-0 text-[18px] tabular-nums text-brand-green" aria-hidden="true">
                    {pad(i + 1)}
                  </span>
                  <span className="font-display text-[clamp(1.5rem,2.2vw,2.25rem)] text-text-primary">{item}</span>
                </li>
              ))}
            </ul>
          </FadeBlock>
        </Container>
      </section>

      <StayRide />

      {/* Booking */}
      <section id="book" className="scroll-mt-24 py-16 sm:py-24" aria-label="Book a stay">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHeading
                title="Book a stay"
                subtitle="Send your dates and we reply on WhatsApp with availability and the nightly rate."
              />
              <div className="mt-10">
                <StayForm />
              </div>
            </div>

            <aside className="lg:col-span-4 lg:col-start-9 lg:pt-4">
              <h2 className="text-lg font-semibold text-text-primary">What happens next</h2>
              <ol className="mt-4 divide-y divide-brand-line border-y border-brand-line">
                {stayBookingSteps.map((step, i) => (
                  <li key={step.title} className="grid grid-cols-[2rem_1fr] gap-3 py-4">
                    <span className="font-display text-[18px] tabular-nums text-brand-green">{i + 1}</span>
                    <div>
                      <p className="font-medium text-text-primary">{step.title}</p>
                      <p className="mt-1 text-[15px] leading-relaxed text-text-muted">{step.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <h2 className="mt-10 text-lg font-semibold text-text-primary">Prefer to talk?</h2>
              <ul className="mt-3 space-y-1.5 text-[15px]">
                <li>
                  <a href={site.phoneHref} className="font-medium text-text-primary hover:text-brand-green">
                    {site.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${site.email}`} className="font-medium text-text-primary hover:text-brand-green">
                    {site.email}
                  </a>
                </li>
              </ul>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
