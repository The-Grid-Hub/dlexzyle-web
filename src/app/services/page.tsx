import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import WhatsAppIcon from "@/components/WhatsAppIcon";

export const metadata: Metadata = {
  title: "Services — D'Lexzyle Enterprises",
  description:
    "Explore our car hire and vehicle leasing services for corporate, institutional, and private clients across Nigeria.",
};

const serviceCategories = [
  {
    title: "Corporate & Institutional Car Hire",
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
      "Clean, comfortable saloon cars ideal for executive travel, airport runs, and day-to-day movement.",
  },
  {
    title: "Sienna Space Buses",
    description:
      "Spacious Toyota Sienna buses perfect for family trips, group travel, and airport transfers.",
  },
  {
    title: "6/7-Seater Passenger Vehicles",
    description:
      "Versatile multi-passenger vehicles suited for team transport, event shuttles, and large group movement.",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Page hero */}
      <section className="bg-brand-light py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Car Hire & Vehicle Leasing"
            subtitle="Dependable fleet solutions tailored for every need — corporate, institutional, or private."
          />
        </Container>
      </section>

      {/* Service categories */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            {serviceCategories.map((cat) => (
              <div
                key={cat.title}
                className="rounded-[12px] border border-gray-100 bg-white p-8 shadow-sm"
              >
                <h3 className="text-xl font-bold text-brand-green">
                  {cat.title}
                </h3>
                <ul className="mt-4 list-inside list-disc space-y-2 text-text-muted">
                  {cat.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Fleet */}
      <section className="bg-brand-light py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Our Fleet"
            subtitle="A selection of well-maintained vehicles ready to serve you."
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {fleet.map((v) => (
              <div
                key={v.title}
                className="rounded-[12px] bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-brand-green">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {v.description}
                </p>
              </div>
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
              Get in touch with us today. We&apos;ll match you with the right
              vehicle for your needs.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/contact" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-green">
                Contact Us
              </Button>
              <Button href="https://wa.me/2348065575378" variant="primary" aria-label="Chat on WhatsApp">
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
