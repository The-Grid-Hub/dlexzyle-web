import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import WhatsAppIcon from "@/components/WhatsAppIcon";

export const metadata: Metadata = {
  title: "Contact Us — D'Lexzyle Enterprises",
  description:
    "Get in touch with D'Lexzyle Enterprises for car hire enquiries, bookings, and support.",
};

const inputBase =
  "w-full rounded-[10px] border border-gray-300 bg-white px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green";

const labelBase = "mb-1.5 block text-sm font-medium text-text-primary";

export default function ContactPage() {
  return (
    <>
      {/* Page hero */}
      <section className="bg-brand-light py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Contact Us"
            subtitle="Have a question or need to book a vehicle? Reach out to us."
          />
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact details */}
            <div>
              <h3 className="text-2xl font-bold text-brand-green">
                Get In Touch
              </h3>
              <p className="mt-4 leading-relaxed text-text-muted">
                Whether you need a vehicle for a day, a week, or longer —
                we&apos;re here to help. Reach us through any of the channels
                below.
              </p>

              <dl className="mt-8 space-y-5 text-sm">
                <div>
                  <dt className="font-semibold text-text-primary">Phone</dt>
                  <dd className="mt-1 text-text-muted"><a href="tel:+2348065575378" className="text-brand-green hover:underline">+234 806 557 5378</a></dd>
                </div>
                <div>
                  <dt className="font-semibold text-text-primary">Email</dt>
                  <dd className="mt-1 text-text-muted">
                    <a href="mailto:dlexzyleenterprise@gmail.com" className="text-brand-green hover:underline">
                      dlexzyleenterprise@gmail.com
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-text-primary">Address</dt>
                  <dd className="mt-1 text-text-muted">Asaba, Delta State, Nigeria</dd>
                </div>
              </dl>

              <div className="mt-8">
                <Button
                  href="https://wa.me/2348065575378"
                  variant="primary"
                  aria-label="Chat on WhatsApp"
                >
                  <WhatsAppIcon />
                  Chat on WhatsApp
                </Button>
              </div>
            </div>

            {/* Form */}
            <div>
              <form className="grid gap-6" aria-label="Contact form">
                <div>
                  <label htmlFor="contactName" className={labelBase}>
                    Name
                  </label>
                  <input
                    id="contactName"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    required
                    className={inputBase}
                  />
                </div>

                <div>
                  <label htmlFor="contactEmail" className={labelBase}>
                    Email
                  </label>
                  <input
                    id="contactEmail"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    className={inputBase}
                  />
                </div>

                <div>
                  <label htmlFor="contactMessage" className={labelBase}>
                    Message
                  </label>
                  <textarea
                    id="contactMessage"
                    name="message"
                    rows={5}
                    placeholder="How can we help you?"
                    required
                    className={inputBase}
                  />
                </div>

                <Button type="submit" variant="primary" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
