import type { Metadata } from "next";
import Container from "@/components/Container";
import PhotoBanner from "@/components/PhotoBanner";
import QuoteForm from "@/components/QuoteForm";
import { bookingSteps } from "@/lib/about";
import { photos } from "@/lib/images";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request a Car Hire Quote",
  description:
    "Request a car hire quote in Asaba, Delta State. Send your trip details to D'Lexzyle Enterprise and we'll get back to you.",
  alternates: { canonical: "/request-quote" },
};

export default function RequestQuotePage() {
  return (
    <>
      <PhotoBanner
        as="h1"
        title="Request a quote"
        subtitle="Send your trip details and we reply with a price and the vehicle we recommend, usually the same working day."
        image={photos.airportVan}
      />

      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <QuoteForm />
            </div>

            <aside className="lg:col-span-4 lg:col-start-9">
              <h2 className="text-lg font-semibold text-text-primary">What happens next</h2>
              <ol className="mt-4 divide-y divide-brand-line border-y border-brand-line">
                {bookingSteps.slice(1).map((step, i) => (
                  <li key={step.title} className="grid grid-cols-[2rem_1fr] gap-3 py-4">
                    <span className="font-display text-[18px] tabular-nums text-brand-green">
                      {i + 1}
                    </span>
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
                  <a
                    href={`mailto:${site.email}`}
                    className="font-medium text-text-primary hover:text-brand-green"
                  >
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
