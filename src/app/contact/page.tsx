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
        title="Contact us"
        subtitle="WhatsApp is the quickest way to reach us. Phone and email work too."
        image={photos.corporate}
      />

      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h2 className="font-display text-[clamp(2.75rem,5vw,4.5rem)] text-text-primary">
                Get in touch
              </h2>
              <p className="mt-4 leading-relaxed text-text-muted">
                We hire vehicles by the hour, the day, the week or longer. For a
                booking, send the pickup point, destination, dates and number of
                passengers and we will reply with a price.
              </p>

              <dl className="mt-8 divide-y divide-brand-line border-y border-brand-line">
                <div className="grid grid-cols-[6rem_1fr] gap-4 py-4">
                  <dt className="text-sm font-medium text-text-muted">Phone</dt>
                  <dd>
                    <a href={site.phoneHref} className="font-medium text-text-primary hover:text-brand-green">
                      {site.phoneDisplay}
                    </a>
                  </dd>
                </div>
                <div className="grid grid-cols-[6rem_1fr] gap-4 py-4">
                  <dt className="text-sm font-medium text-text-muted">Email</dt>
                  <dd>
                    <a
                      href={`mailto:${site.email}`}
                      className="break-all font-medium text-text-primary hover:text-brand-green"
                    >
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div className="grid grid-cols-[6rem_1fr] gap-4 py-4">
                  <dt className="text-sm font-medium text-text-muted">Address</dt>
                  <dd className="font-medium text-text-primary">{site.address}</dd>
                </div>
              </dl>
            </div>

            <div className="lg:col-span-7">
              <h2 className="text-lg font-semibold text-text-primary">Send a message</h2>
              <p className="mt-1 text-[15px] text-text-muted">
                This opens WhatsApp with your message filled in. Nothing is stored on this site.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
