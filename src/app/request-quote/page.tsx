import type { Metadata } from "next";
import Container from "@/components/Container";
import PhotoBanner from "@/components/PhotoBanner";
import QuoteForm from "@/components/QuoteForm";
import { photos } from "@/lib/images";

export const metadata: Metadata = {
  title: "Request a Car Hire Quote",
  description:
    "Request a car hire quote in Asaba, Delta State. Send your trip details to D'Lexzyle Enterprises and we'll get back to you.",
  alternates: { canonical: "/request-quote" },
};

export default function RequestQuotePage() {
  return (
    <>
      <PhotoBanner
        as="h1"
        title="Request A Quote"
        subtitle="Send your trip details and we'll get back to you with a quote."
        image={photos.airportVan}
      />

      {/* Form */}
      <section className="py-16 sm:py-20">
        <Container className="max-w-2xl">
          <QuoteForm />
        </Container>
      </section>
    </>
  );
}
