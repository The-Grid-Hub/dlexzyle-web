import Image from "next/image";
import Container from "./Container";
import Button from "./Button";
import WhatsAppIcon from "./WhatsAppIcon";

export default function Hero() {
  return (
    <section className="py-16 sm:py-20 lg:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Copy */}
          <div className="max-w-xl">
            <h1 className="text-4xl font-extrabold leading-tight text-brand-green sm:text-5xl lg:text-[3.25rem]">
              Nigeria&apos;s Trusted{" "}
              <span className="text-[#c8a84b]">Logistics &amp;</span> Transport
              Partner
            </h1>
            <p className="mt-4 text-lg font-medium text-text-primary">
              Comfortable, well-maintained vehicles with professional drivers
              you can trust.
            </p>
            <p className="mt-4 leading-relaxed text-text-muted">
              D&apos;lexzyle Enterprise delivers reliable car hire, supply &amp;
              delivery services across the South-South and South-East regions —
              serving government agencies, banks, hotels, NGOs and individuals.
            </p>
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
