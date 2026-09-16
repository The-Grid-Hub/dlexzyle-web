import Container from "./Container";
import SectionHeading from "./SectionHeading";
import Button from "./Button";
import PhotoCard from "./PhotoCard";
import { photos, type Photo } from "@/lib/images";

const services = [
  {
    title: "Corporate & Institutional Car Hire",
    description:
      "Vehicles and drivers for government agencies, banks, hotels, NGOs and corporate teams.",
    image: photos.corporate,
  },
  {
    title: "Private Car Hire",
    description:
      "Comfortable vehicles for personal travel, family movement, airport transfers, and short or long trips.",
    image: [photos.privateMinivan, photos.privateSuv] satisfies [Photo, Photo],
  },
  {
    title: "Vehicle Leasing",
    description:
      "Long-term vehicle leases for organisations, with maintenance included.",
    image: photos.roadAbuja,
  },
];

export default function ServicesPreview() {
  return (
    <section className="bg-brand-light py-16 sm:py-20">
      <Container>
        <SectionHeading
          title="Our Services"
          subtitle="Short trips, long-distance travel and long-term leasing."
        />

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <PhotoCard key={service.title} title={service.title} image={service.image}>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                {service.description}
              </p>
            </PhotoCard>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button href="/services" variant="primary">
            View All Services
          </Button>
        </div>
      </Container>
    </section>
  );
}
