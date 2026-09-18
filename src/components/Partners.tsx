import Image from "next/image";
import Container from "./Container";
import { partners } from "@/lib/partners";

/** The logo row on its own, for pages that supply their own heading. */
export function PartnerLogos({ className = "" }: { className?: string }) {
  return (
    <ul
      role="list"
      className={`flex flex-wrap items-center gap-x-10 gap-y-6 sm:gap-x-16 ${className}`}
    >
      {partners.map((partner) => (
        <li key={partner.name}>
          <a
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 items-center rounded-md grayscale transition-[filter] duration-300 hover:grayscale-0 focus-visible:grayscale-0 active:grayscale-0"
          >
            {partner.logo !== undefined ? (
              <Image
                src={partner.logo}
                alt={partner.name}
                width={partner.width}
                height={partner.height}
                className="h-8 w-auto sm:h-10"
              />
            ) : (
              <span className="text-lg font-semibold tracking-tight text-text-primary sm:text-xl">
                {partner.name}
              </span>
            )}
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function Partners() {
  return (
    <section aria-labelledby="partners-heading" className="border-b border-brand-line bg-white py-10">
      <Container className="flex flex-col gap-6 md:flex-row md:items-center md:gap-14">
        <h2 id="partners-heading" className="shrink-0 text-[15px] text-text-muted">
          Organisations we have worked with
        </h2>
        <PartnerLogos />
      </Container>
    </section>
  );
}
