import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import PhotoBanner from "@/components/PhotoBanner";
import VehicleCard from "@/components/VehicleCard";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { fleet, type Vehicle } from "@/lib/fleet";
import { photos, type Photo } from "@/lib/images";
import { whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Car Hire & Vehicle Leasing Services",
  description:
    "Safe, reliable car hire and vehicle leasing in Asaba for corporate, institutional and private clients: government agencies, banks, hotels and NGOs across the South-South and South-East, and across Nigeria.",
  alternates: { canonical: "/services" },
};

/**
 * The ids are linked from the home page (homeServices in lib/services.ts) and from the
 * sitemap-facing nav, so keep them stable.
 */
const serviceCategories = [
  {
    id: "corporate",
    title: "Corporate and institutional hire",
    intro:
      "Vehicles and vetted drivers for organisations, booked by the day or for weeks at a time. We invoice organisations and can keep a vehicle on standby for visiting staff.",
    image: photos.corporate,
    listTitle: "Who books this",
    bullets: [
      "Government ministries and agencies",
      "Banks and financial institutions",
      "Hotels and hospitality groups",
      "NGOs and international organisations",
      "Project teams, conferences and events",
    ],
  },
  {
    id: "private",
    title: "Private hire",
    intro:
      "A clean car and a driver who knows the road and gets you there safely, for trips of an hour or a week. Airport pickups include flight tracking, so a delay does not leave you waiting.",
    image: [photos.privateMinivan, photos.privateSuv] satisfies [Photo, Photo],
    listTitle: "Typical trips",
    bullets: [
      "Airport pickups and drop-offs",
      "Family travel and ceremonies",
      "Trips within Asaba and neighbouring towns",
      "Interstate journeys across the thirty-six states in Nigeria, including FCT",
      "Lagos and Abuja runs, by arrangement",
    ],
  },
  {
    id: "leasing",
    title: "Vehicle leasing",
    intro:
      "A vehicle for your office or project without buying one. One invoice a month covers the car, servicing and insurance, and you hand it back when the work ends.",
    image: photos.roadAbuja,
    listTitle: "What a lease includes",
    bullets: [
      "Scheduled servicing, with records kept",
      "Comprehensive insurance and roadworthiness papers",
      "A replacement vehicle if yours develops a fault",
      "A driver, if you need one",
      "Terms from three months to several years",
    ],
  },
];

/** Stock stand-ins shown until a vehicle in fleet.ts has a real `photo`. */
const stockPhotos: Record<Vehicle["id"], Photo> = {
  saloon: photos.fleetSaloon,
  sienna: photos.fleetSienna,
  seater: photos.fleetSeater,
};

function CategoryPhoto({ image }: { image: Photo | [Photo, Photo] }) {
  const sizes = "(min-width: 1024px) 640px, 100vw";
  if (Array.isArray(image)) {
    return (
      <div className="grid aspect-[3/2] grid-cols-2 gap-0.5 overflow-hidden rounded-[12px] bg-brand-light">
        {image.map((photo) => (
          <div key={photo.src.src} className="relative">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 1024px) 320px, 50vw"
              placeholder="blur"
              className="object-cover"
              style={{ objectPosition: photo.position }}
            />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="relative aspect-[3/2] overflow-hidden rounded-[12px] bg-brand-light">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        placeholder="blur"
        className="object-cover"
        style={{ objectPosition: image.position }}
      />
    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
      <PhotoBanner
        as="h1"
        title="Car hire and vehicle leasing"
        subtitle="Three ways to work with us, each with a vetted driver from our own team."
        image={photos.roadAbuja}
      />

      <section className="py-16 sm:py-24">
        <Container>
          <div className="space-y-20 sm:space-y-28">
            {serviceCategories.map((category, i) => (
              <article
                key={category.id}
                id={category.id}
                className="grid scroll-mt-24 items-center gap-8 lg:grid-cols-12 lg:gap-12"
              >
                <div className={`lg:col-span-7 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <CategoryPhoto image={category.image} />
                </div>
                <div className="lg:col-span-5">
                  <h2 className="font-display text-[clamp(2.75rem,5vw,4.5rem)] text-text-primary">
                    {category.title}
                  </h2>
                  <p className="mt-4 text-pretty leading-relaxed text-text-muted">{category.intro}</p>
                  <h3 className="mt-7 text-sm font-semibold text-text-primary">{category.listTitle}</h3>
                  <ul className="mt-3 divide-y divide-brand-line border-y border-brand-line text-[15px] text-text-primary">
                    {category.bullets.map((item) => (
                      <li key={item} className="py-2.5">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="fleet" className="scroll-mt-24 bg-brand-light py-16 sm:py-24">
        <Container>
          <SectionHeading
            title="The fleet"
            subtitle="Every vehicle is air-conditioned, serviced on schedule and inspected before it leaves the yard, so every trip is a safe one."
          />
          <ul role="list" className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {fleet.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} photo={vehicle.photo ?? stockPhotos[vehicle.id]} />
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-8 rounded-[12px] bg-brand-ink px-8 py-12 text-white sm:px-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <h2 className="font-display text-[clamp(2.75rem,5vw,4.5rem)]">
                Not sure which vehicle you need?
              </h2>
              <p className="mt-4 max-w-xl text-pretty text-lg text-white/80">
                Tell us where you are going and how many people are travelling.
                We will suggest one and send a price the same working day.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
              <Button href="/request-quote" variant="inverse">
                Request a quote
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
