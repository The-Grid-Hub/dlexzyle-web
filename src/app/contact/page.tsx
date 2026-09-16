import type { Metadata } from "next";
import Container from "@/components/Container";
import Button from "@/components/Button";
import ContactForm from "@/components/ContactForm";
import PhotoBanner from "@/components/PhotoBanner";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { photos } from "@/lib/images";
import { site, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Our Asaba Car Hire Team",
  description:
    "Call, email or WhatsApp D'Lexzyle Enterprise in Asaba, Delta State for car hire enquiries, bookings and support.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PhotoBanner
        as="h1"
        title="Contact Us"
        subtitle="Call, email or send us a WhatsApp message."
        image={photos.heroDriver}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact details */}
            <div>
              <h2 className="text-2xl font-bold text-brand-green">
                Get In Touch
              </h2>
              <p className="mt-4 leading-relaxed text-text-muted">
                We hire vehicles by the day, the week or longer.
              </p>

              <dl className="mt-8 space-y-5 text-sm">
                <div>
                  <dt className="font-semibold text-text-primary">Phone</dt>
                  <dd className="mt-1 text-text-muted">
                    <a href={site.phoneHref} className="text-brand-green hover:underline">
                      {site.phoneDisplay}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-text-primary">Email</dt>
                  <dd className="mt-1 text-text-muted">
                    <a href={`mailto:${site.email}`} className="text-brand-green hover:underline">
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-text-primary">Address</dt>
                  <dd className="mt-1 text-text-muted">{site.address}</dd>
                </div>
              </dl>

              <div className="mt-8">
                <Button
                  href={whatsappUrl()}
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
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
