import Image from "next/image";
import Container from "./Container";
import Button from "./Button";
import WhatsAppIcon from "./WhatsAppIcon";
import { photos } from "@/lib/images";
import { site, whatsappUrl } from "@/lib/site";

export default function Hero() {
  return (
    <section className="py-16 sm:py-20 lg:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Copy */}
          <div className="max-w-xl">
            <h1 className="text-4xl font-extrabold leading-tight text-brand-green sm:text-5xl lg:text-[3.25rem]">
              {/* Trusted <span className="text-[#c8a84b]">Car Hire</span> in Asaba,
              Delta State */}
              Nigeria&apos;s Trusted{" "}
              <span className="text-[#c8a84b]">Logistics &amp;</span> Transport
              Partner
            </h1>

            <p className="mt-4 text-lg font-medium text-text-primary">
              Clean, well-maintained vehicles and professional drivers for hire
              and long-term lease.
            </p>
            <p className="mt-4 leading-relaxed text-text-muted">
              {site.name} provides car hire, supply and delivery for government
              agencies, banks, hotels, NGOs and individuals. We&apos;re based in{" "}
              {site.address}.
            </p>
            <div className="mt-8">
              <Button
                href={whatsappUrl()}
                variant="primary"
                aria-label="Contact us on WhatsApp"
              >
                <WhatsAppIcon />
                Chat on WhatsApp
              </Button>
            </div>
          </div>

          {/* Illustration */}
          <div className="relative flex items-center justify-center">
            <Image
              src="/cars.png"
              alt="Fleet of well-maintained vehicles"
              width={600}
              height={440}
              priority
              className="h-auto w-full max-w-lg object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
