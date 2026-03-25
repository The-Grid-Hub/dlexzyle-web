import Container from "./Container";
import SectionHeading from "./SectionHeading";
import Button from "./Button";

const services = [
  {
    title: "Corporate & Institutional Car Hire",
    description:
      "Reliable fleet solutions for government agencies, banks, hotels, NGOs, and corporate teams.",
  },
  {
    title: "Private Car Hire",
    description:
      "Comfortable vehicles for personal travel, family movement, airport transfers, and short or long trips.",
  },
  {
    title: "Vehicle Leasing",
    description:
      "Flexible vehicle leasing options tailored to your organisation's needs, with full maintenance support.",
  },
];

export default function ServicesPreview() {
  return (
    <section className="bg-brand-light py-16 sm:py-20">
      <Container>
        <SectionHeading
          title="Our Services"
          subtitle="We deliver safe, comfortable, and timely transportation solutions across Nigeria."
        />

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-[12px] bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-brand-green">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                {service.description}
              </p>
            </div>
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
