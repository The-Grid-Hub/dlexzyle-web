import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/Container";
import PhotoBanner from "@/components/PhotoBanner";
import { photos } from "@/lib/images";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us — D'Lexzyle Enterprises",
  description:
    "D'Lexzyle Enterprises is a car hire and vehicle leasing company based in Asaba, Delta State.",
};

export default function AboutPage() {
  return (
    <>
      <PhotoBanner
        as="h1"
        title="About Us"
        subtitle="A car hire company based in Asaba, Delta State."
        image={photos.driverPortrait}
      />

      {/* Content */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-2xl font-bold text-brand-green">Who We Are</h2>
              <p className="mt-4 leading-relaxed text-text-muted">
                {site.name} is a car hire and vehicle leasing company based in
                Asaba, Delta State, serving individuals, companies, government
                agencies and NGOs across the South-South and South-East.
              </p>

              <h2 className="mt-10 text-2xl font-bold text-brand-green">
                Our Mission
              </h2>
              <p className="mt-4 leading-relaxed text-text-muted">
                Get every client to their destination safely and on time, in a
                clean vehicle with a professional driver.
              </p>

              <h2 className="mt-10 text-2xl font-bold text-brand-green">
                Why Choose Us
              </h2>
              <ul className="mt-4 list-inside list-disc space-y-2 text-text-muted">
                <li>Well-maintained fleet of vehicles</li>
                <li>Professional and vetted drivers</li>
                <li>Punctual and reliable service</li>
                <li>Flexible hire options for short &amp; long-term needs</li>
                <li>Trusted by corporate, government, and private clients</li>
              </ul>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-brand-light lg:order-first lg:aspect-[4/5]">
              <Image
                src={photos.highwayLagos.src}
                alt={photos.highwayLagos.alt}
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                placeholder="blur"
                className="object-cover"
                style={{ objectPosition: photos.highwayLagos.position }}
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
