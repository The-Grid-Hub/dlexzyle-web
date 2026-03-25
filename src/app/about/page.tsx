import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "About Us — D'Lexzyle Enterprises",
  description:
    "Learn about D'Lexzyle Enterprises and our commitment to reliable car hire across Nigeria.",
};

export default function AboutPage() {
  return (
    <>
      {/* Page hero */}
      <section className="bg-brand-light py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="About Us"
            subtitle="Get to know D'Lexzyle Enterprises — your trusted car hire partner in Nigeria."
          />
        </Container>
      </section>

      {/* Content */}
      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          <h3 className="text-2xl font-bold text-brand-green">Who We Are</h3>
          <p className="mt-4 leading-relaxed text-text-muted">
            D&apos;Lexzyle Enterprises is a leading car hire and vehicle leasing
            company based in Nigeria. We provide dependable transportation
            solutions for individuals, corporate organisations, government
            agencies, and NGOs across the country.
          </p>

          <h3 className="mt-10 text-2xl font-bold text-brand-green">
            Our Mission
          </h3>
          <p className="mt-4 leading-relaxed text-text-muted">
            To deliver safe, comfortable, and timely car hire services with
            professional drivers you can trust — every time, everywhere in
            Nigeria.
          </p>

          <h3 className="mt-10 text-2xl font-bold text-brand-green">
            Why Choose Us
          </h3>
          <ul className="mt-4 list-inside list-disc space-y-2 text-text-muted">
            <li>Well-maintained fleet of vehicles</li>
            <li>Professional and vetted drivers</li>
            <li>Punctual and reliable service</li>
            <li>Flexible hire options for short &amp; long-term needs</li>
            <li>Trusted by corporate, government, and private clients</li>
          </ul>
        </Container>
      </section>
    </>
  );
}
