import type { Metadata } from "next";
import Container from "@/components/Container";
import PhotoBanner from "@/components/PhotoBanner";
import QuoteForm from "@/components/QuoteForm";
import { photos } from "@/lib/images";

export const metadata: Metadata = {
  title: "Request A Quote — D'Lexzyle Enterprises",
  description:
    "Request a car hire quote from D'Lexzyle Enterprises. Fill in your trip details and we'll get back to you.",
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
