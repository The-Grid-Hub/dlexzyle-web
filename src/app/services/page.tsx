import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import PhotoBanner from "@/components/PhotoBanner";
import PhotoCard from "@/components/PhotoCard";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { photos } from "@/lib/images";
import { whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services — D'Lexzyle Enterprises",
  description:
    "Explore our car hire and vehicle leasing services for corporate, institutional, and private clients across Nigeria.",
};

const serviceCategories = [
  {
    title: "Corporate & Institutional Car Hire",
    image: photos.corporate,
    bullets: [
      "Government agencies",
      "Banks & financial institutions",
      "Hotels & hospitality",
      "NGOs & international organisations",
      "Corporate teams & events",
    ],
  },
  {
    title: "Private Car Hire",
    image: photos.airportVan,
    bullets: [
      "Personal travel",
      "Family movement",
      "Airport transfers",
      "Short trips within cities",
      "Long-distance trips across states",
    ],
  },
];

const fleet = [
  {
    title: "Toyota Saloon Vehicles",
    description:
      "Clean, comfortable saloon cars for executive travel, airport runs and day-to-day movement.",
    image: photos.fleetSaloon,
  },
  {
    title: "Sienna Space Buses",
    description:
      "Toyota Sienna buses for family trips, group travel and airport transfers.",
    image: photos.fleetSienna,
  },
  {
    title: "6/7-Seater Passenger Vehicles",
    description:
      "Six- and seven-seat vehicles for team transport, event shuttles and larger groups.",
    image: photos.fleetSeater,
  },
];

export default function ServicesPage() {
  return (
    <>
      <PhotoBanner
        as="h1"
        title="Car Hire & Vehicle Leasing"
        subtitle="Vehicles with professional drivers for corporate, institutional and private clients."
        image={photos.roadAbuja}
      />

      {/* Service categories */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            {serviceCategories.map((cat) => (
              <PhotoCard
                key={cat.title}
                title={cat.title}
                image={cat.image}
                sizes="(min-width: 768px) 560px, 100vw"
              >
                <ul className="mt-4 list-inside list-disc space-y-2 text-text-muted">
                  {cat.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </PhotoCard>
            ))}
          </div>
        </Container>
      </section>

      {/* Fleet */}
      <section className="bg-brand-light py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Our Fleet"
            subtitle="Three vehicle types to match your group size."
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {fleet.map((v) => (
              <PhotoCard key={v.title} title={v.title} image={v.image}>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {v.description}
                </p>
              </PhotoCard>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA banner */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="rounded-[12px] bg-brand-green px-8 py-12 text-center text-white sm:px-12">
            <h2 className="text-3xl font-bold">Ready to Book a Vehicle?</h2>
            <p className="mx-auto mt-3 max-w-md text-white/80">
              Tell us where you&apos;re going and how many people are
              travelling, and we&apos;ll suggest a vehicle.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/contact" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-green">
                Contact Us
              </Button>
              <Button href={whatsappUrl()} variant="primary" aria-label="Chat on WhatsApp">
                <WhatsAppIcon />
                Chat on WhatsApp
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
